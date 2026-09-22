import { knowledge } from "../data/knowledge.mjs";
import { publicProjects } from "../data/public-projects.mjs";
import { qaData } from "../data/qa.mjs";

export const API_VERSION = "1.0";
export const LAST_UPDATED = "2026-09-22";

export const publishedQuestions = qaData
  .filter(({ answer }) => typeof answer === "string" && answer.trim())
  .map(({ keywords: _keywords, sourceId: _sourceId, ...item }) => item);

export const publicFacts = knowledge.map(
  ({ keywords: _keywords, ...fact }) => fact,
);

export function apiHeaders(extra = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type",
    "Cache-Control":
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    ...extra,
  };
}

export function apiResponse(data, init = {}) {
  return Response.json(
    { apiVersion: API_VERSION, lastUpdated: LAST_UPDATED, data },
    { ...init, headers: apiHeaders(init.headers) },
  );
}

export function notFound(resource) {
  return apiResponse(
    { error: `${resource} not found` },
    { status: 404, headers: { "Cache-Control": "no-store" } },
  );
}

export function optionsResponse() {
  return new Response(null, { status: 204, headers: apiHeaders() });
}

export function apiIndex(origin) {
  const endpoint = (path) => `${origin}/api/v1${path}`;
  return {
    name: "KevTheFoo Public API",
    description: "Read-only public portfolio data for people and AI agents.",
    documentation: `${origin}/api/v1`,
    endpoints: {
      profile: endpoint("/profile"),
      facts: endpoint("/facts"),
      fact: endpoint("/facts/{id}"),
      projects: endpoint("/projects"),
      project: endpoint("/projects/{id}"),
      articles: endpoint("/articles"),
      article: endpoint("/articles/{slug}"),
      questions: endpoint("/questions"),
    },
  };
}

export function publicProfile(articles = []) {
  return {
    id: "kevin-foo",
    name: "Kevin Foo",
    handle: "kevthefoo",
    headline:
      "Software developer from Taiwan building for the web and exploring blockchain and AI.",
    location: "Taiwan",
    contact: {
      email: "kevthefoo@gmail.com",
      github: "https://github.com/kevthefoo",
      linkedin: "https://www.linkedin.com/in/kevthefoo/",
      x: "https://x.com/kevthefoo",
    },
    facts: publicFacts,
    projects: publicProjects,
    articles,
    questions: publishedQuestions,
  };
}
