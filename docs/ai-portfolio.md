# Conversational portfolio

All public UI and answers are English. The dark home page is the only portfolio page and fills the viewport, with an independently scrolling conversation. Published facts, project links and full journal articles expand inline inside messages. Explore the facts works without AI credits. Legacy blog URLs redirect home. No API credentials are sent to the browser. Chat messages are kept only in component memory and are not sent to analytics or stored in a database.

## Connect live AI

1. Copy `.env.example` to `.env.local` for development, or configure equivalent server environment variables on your host.
2. Set `OPENAI_API_KEY` to a dedicated OpenAI project key. The legacy server-only `OPENAI_SECRET_KEY` remains supported. Never use a `NEXT_PUBLIC_` variable for secrets.
3. Create a durable Upstash Redis database and set its REST URL/token. Use the SAME database for every instance/deployment of this site. Disable eviction. Do not clear the budget keys or use a disposable/cache database: losing those keys resets accounting.
4. Generate `CHAT_IDENTITY_SECRET` with `openssl rand -hex 32`. Keep it stable across deployments. Set `CHAT_ALLOWED_ORIGIN` to the exact public origin (scheme and hostname, no trailing slash).
5. Optionally configure `CHAT_TRUSTED_IP_HEADER` ONLY for an IP header your hosting proxy guarantees to overwrite. Verify that visitors cannot forge it through alternate/direct origins. Without a trusted header all visitors deliberately share one daily quota. IP limits are not unique-person identification: shared networks share a quota and rotating networks can evade it. The global cap still applies.
6. Review the budgets below, then set `AI_CHAT_ENABLED=true` and restart/redeploy. A missing setting means free, explicitly labelled portfolio preview; a failed Redis request pauses paid calls. Set `AI_CHAT_ENABLED=false` to disable live AI.

No live provider call was made during implementation: no API key or production Redis configuration was supplied. Provider behavior is tested using an injected response, and budget concurrency against a real isolated Redis instance. Verify one live on-topic question after configuration before opening public traffic.

## Cost and abuse controls

- Fixed `gpt-4.1-mini-2025-04-14`, text only, no tools, no browser, no history, no client-selected model, 400 output tokens, no automatic retries, 15-second provider timeout, `store:false`.
- Request body <= 4 KiB, question <= 500 characters. Only a single published source ID may provide context for short follow-ups. Client system prompts/history are rejected.
- The serialized provider request is limited to 14,000 UTF-8 bytes. At the checked standard model rates ($0.40/M input, $1.60/M output), even a conservative byte-to-token bound plus protocol allowance fits under the US$0.01 reservation. Review this assumption if model/pricing/limits change. Official reference: https://developers.openai.com/api/docs/models/gpt-4.1-mini
- Before each call, one Redis Lua transaction checks AND increments all limits. Redis server time drives UTC windows. Defaults: 100 calls / US$1 reserved per UTC day, 1,000 calls / US$10 reserved for the lifetime of this budget namespace, 10 calls per visitor identity per UTC day, 10 seconds between calls, 10 global calls per minute. Attempts rejected before reservation do not consume model quota.
- Set `CHAT_DAILY_BUDGET_CENTS` and `CHAT_TOTAL_BUDGET_CENTS` to integer cents. One call reserves one cent, so the numbers also specify the maximum calls. Invalid, negative or zero budgets stop calls. The lifetime counter does not expire. Raising its limit adds capacity; do not delete it. These are conservative reservations, not an invoice display.
- Failed calls, malformed outputs, timeouts and visitor cancellations are NOT refunded. A disconnected client may already have caused a billable request.
- Namespace `kevthefoo:chat:budget` is intentionally stable. Never split its database across regions or versions. The Redis database must support this multi-key Lua operation (e.g. a single Upstash database); an incompatible store fails closed.
- Add hosting firewall/request limits and bot protection before public launch to protect infrastructure and keep bots from exhausting the small allowance. Application model limits do not cap bandwidth, hosting, Redis charges, or usage of this OpenAI key elsewhere. Set an independent provider/project spend control too. No anonymous site can promise zero abuse.

## Grounding and scope

`data/knowledge.mjs` contains curated portfolio facts and `data/qa.mjs` contains reviewed question-and-answer material. Both files are server-controlled public sources. Keep private details and secrets out of them, and update them as Kevin's experience changes. The browser sends only a question and cannot provide or replace this grounding context.

The free preview uses keyword retrieval and is intentionally less flexible than live AI. Obvious off-topic/injection requests are refused locally without an OpenAI request. For related requests, the server retrieves a small relevant subset of Q&A entries and facts, then sends that context to the model. The model writes a natural first-person answer in its own words, grounded only in that material. Structured output includes source IDs; the server accepts only IDs from its selected context before returning source links. Unpublished details return an explicit unknown response.

## Validation

`npm run lint`, `npm run build`, `npm test`.

To exercise real Redis concurrency, install Redis locally and run:

```sh
REDIS_SERVER_BIN=/path/to/redis-server REDIS_CLI_BIN=/path/to/redis-cli npm test
```

The test starts its own Redis on an isolated temporary Unix socket (no public TCP listener) and removes it afterwards. Without the binaries, that integration case is explicitly skipped. Tests cover malformed/oversized input, origin validation, ignored hostile requests, safe preview, failed budget storage, spending/cooldown limits, reserve-before-call ordering, invalid model outputs, failed calls, and parallel global/lifetime reservations.
