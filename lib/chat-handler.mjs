import {
  classify,
  buildContext,
  localAnswer,
  unpublished,
  MAX_QUESTION,
  providerRequest,
} from "./chat-policy.mjs";
import { liveConfigured, reserve } from "./chat-budget.mjs";
import { knowledge } from "../data/knowledge.mjs";
const json = (data, status = 200, headers = {}) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
async function readBody(request) {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    throw new Error("JSON required");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Body required");
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 4096) throw new Error("Body too large");
      chunks.push(value);
    }
  } finally {
    await reader.cancel();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export async function handleChat(
  request,
  { env = process.env, reserveBudget = reserve, generate } = {},
) {
  const expected = env.CHAT_ALLOWED_ORIGIN || new URL(request.url).origin;
  if (request.headers.get("origin") !== expected)
    return json({ error: "Please ask from the portfolio website." }, 403);
  let body;
  try {
    body = await readBody(request);
  } catch {
    return json({ error: "Send a question of up to 500 characters." }, 400);
  }
  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).some((k) => !["userQuestion", "contextId"].includes(k)) ||
    typeof body.userQuestion !== "string" ||
    !body.userQuestion.trim() ||
    body.userQuestion.length > MAX_QUESTION ||
    (body.contextId !== undefined && typeof body.contextId !== "string")
  )
    return json({ error: "Send a question of up to 500 characters." }, 400);
  let question = body.userQuestion.trim();
  // Follow-ups can reference one published fact ID; never accept client chat/system history.
  if (
    /^(tell me more|more|what else|and that|why|how)[?.! ]*$/i.test(question) &&
    body.contextId
  )
    question = `Tell me more about ${body.contextId.slice(0, 30)}`;
  const records = classify(question);
  const context = buildContext(question, records);
  if (!context.length || unpublished(question))
    return json({ ...localAnswer(question), mode: "portfolio" });
  if (!liveConfigured(env))
    return json({ ...localAnswer(question), mode: "preview" });
  let limits;
  try {
    limits = await reserveBudget(request, env);
  } catch {
    return json(
      {
        error:
          "AI is temporarily paused. You can still explore the published facts below.",
      },
      503,
    );
  }
  if (!limits.allowed)
    return json(
      {
        error:
          limits.reason === "cooldown"
            ? "Please wait a few seconds before your next question."
            : "The question allowance has been reached. You can still explore the published facts below.",
        remaining: limits.remaining,
      },
      429,
      { "Retry-After": String(limits.retryAfter) },
    );
  try {
    // Reserve is intentionally NOT refunded on errors, disconnects or timeouts.
    const result = await generate(providerRequest(question, context));
    if (result.status !== "completed") throw new Error("Incomplete response");
    const generated = JSON.parse(result.output_text);
    if (
      typeof generated.answer !== "string" ||
      !generated.answer.trim() ||
      generated.answer.length > 1600 ||
      !Array.isArray(generated.sourceIds) ||
      generated.sourceIds.some(
        (id) =>
          typeof id !== "string" || !context.some((item) => item.id === id),
      )
    )
      throw new Error("Invalid response");
    const sources = [...new Set(generated.sourceIds)].map((id) => {
      const item = context.find((record) => record.id === id);
      const source = knowledge.find(
        (record) => record.id === (item.sourceId || item.id),
      );
      return source
        ? { id: source.id, title: source.title, href: source.href }
        : { id: item.id, title: item.title, href: "/" };
    });
    return json({
      answer: generated.answer.trim(),
      sources,
      mode: "ai",
      remaining: limits.remaining,
    });
  } catch {
    return json(
      {
        error:
          "The answer could not be loaded. Please explore the published facts or try again later.",
        remaining: limits.remaining,
      },
      502,
    );
  }
}
