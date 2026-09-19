import { createHmac } from "node:crypto";
// All limits and the reservation happen atomically in the SAME durable Redis.
// Redis TIME prevents client clocks, instance clocks and parallel requests bypassing caps.
export const RESERVE_SCRIPT = `
local now = tonumber(redis.call('TIME')[1])
local day = math.floor(now / 86400)
local minute = math.floor(now / 60)
local base = KEYS[1]
local daily = base .. ':day:' .. day
local visitor = daily .. ':visitor:' .. ARGV[1]
local burst = base .. ':minute:' .. minute
local cooldown = base .. ':cooldown:' .. ARGV[1]
local total = base .. ':lifetime'
if tonumber(redis.call('GET', daily) or '0') >= tonumber(ARGV[2]) then return {0, 'daily', 86400 - now % 86400} end
if tonumber(redis.call('GET', total) or '0') >= tonumber(ARGV[3]) then return {0, 'budget', 86400} end
if tonumber(redis.call('GET', visitor) or '0') >= 10 then return {0, 'visitor', 86400 - now % 86400} end
if tonumber(redis.call('GET', burst) or '0') >= 10 then return {0, 'busy', 60 - now % 60} end
if redis.call('EXISTS', cooldown) == 1 then return {0, 'cooldown', redis.call('TTL', cooldown)} end
redis.call('INCR', daily)
redis.call('EXPIRE', daily, 172800)
local used = redis.call('INCR', visitor)
redis.call('EXPIRE', visitor, 172800)
redis.call('INCR', burst)
redis.call('EXPIRE', burst, 120)
redis.call('SET', cooldown, '1', 'EX', 10)
redis.call('INCR', total)
return {1, 10 - used, 0}
`;
export function liveConfigured(env = process.env) {
  return (
    env.AI_CHAT_ENABLED === "true" &&
    Boolean(env.OPENAI_API_KEY || env.OPENAI_SECRET_KEY) &&
    Boolean(
      env.UPSTASH_REDIS_REST_URL?.startsWith("https://") &&
      env.UPSTASH_REDIS_REST_TOKEN &&
      env.CHAT_IDENTITY_SECRET?.length >= 32 &&
      env.CHAT_ALLOWED_ORIGIN,
    )
  );
}
export function cents(value, fallback) {
  if (value === undefined || value === "") return fallback;
  const n = Number(value);
  return Number.isSafeInteger(n) && n >= 0 && n <= 10000 ? n : 0;
}
export async function reserve(request, env = process.env, fetcher = fetch) {
  // Only trust a header explicitly configured to be overwritten by your reverse proxy.
  // If absent, everyone shares one quota; never silently trust X-Forwarded-For.
  const ip = env.CHAT_TRUSTED_IP_HEADER
    ? request.headers.get(env.CHAT_TRUSTED_IP_HEADER)?.trim()
    : null;
  const identity = createHmac("sha256", env.CHAT_IDENTITY_SECRET)
    .update(ip?.slice(0, 200) || "shared-anonymous")
    .digest("hex");
  const result = await fetcher(env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      RESERVE_SCRIPT,
      "1",
      "kevthefoo:chat:budget",
      identity,
      String(cents(env.CHAT_DAILY_BUDGET_CENTS, 100)),
      String(cents(env.CHAT_TOTAL_BUDGET_CENTS, 1000)),
    ]),
    signal: AbortSignal.timeout(4000),
    cache: "no-store",
  });
  if (!result.ok) throw new Error("Budget unavailable");
  const payload = await result.json();
  const value = payload.result;
  if (
    payload.error ||
    !Array.isArray(value) ||
    value.length !== 3 ||
    ![0, 1].includes(value[0])
  )
    throw new Error("Invalid budget response");
  return {
    allowed: value[0] === 1,
    remaining:
      value[0] === 1 ? value[1] : value[1] === "visitor" ? 0 : undefined,
    reason: value[0] === 0 ? value[1] : null,
    retryAfter: Math.max(1, Number(value[2]) || 1),
  };
}
