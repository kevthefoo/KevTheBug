import assert from "node:assert/strict";
import test from "node:test";
import {
  API_VERSION,
  apiIndex,
  apiResponse,
  optionsResponse,
  publicFacts,
  publicProfile,
  publishedQuestions,
} from "./public-api.mjs";

test("publishes a complete, secret-free profile", () => {
  const profile = publicProfile([{ slug: "example", title: "Example" }]);
  assert.equal(profile.name, "Kevin Foo");
  assert.ok(profile.projects.length > 0);
  assert.ok(profile.facts.length > 0);
  assert.ok(profile.questions.length > 0);
  assert.equal(profile.articles[0].slug, "example");
  assert.ok(publicFacts.every((item) => !("keywords" in item)));
  assert.ok(publishedQuestions.every((item) => item.answer.trim()));
  assert.ok(publishedQuestions.every((item) => !("keywords" in item)));
});

test("builds absolute discovery links", () => {
  const index = apiIndex("https://kevthefoo.example");
  assert.equal(
    index.endpoints.profile,
    "https://kevthefoo.example/api/v1/profile",
  );
  assert.match(index.description, /AI agents/);
});

test("returns versioned JSON with cache and CORS headers", async () => {
  const response = apiResponse({ ok: true });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
  assert.match(response.headers.get("cache-control"), /s-maxage=3600/);
  assert.deepEqual(await response.json(), {
    apiVersion: API_VERSION,
    lastUpdated: "2026-09-22",
    data: { ok: true },
  });
  assert.equal(optionsResponse().status, 204);
});
