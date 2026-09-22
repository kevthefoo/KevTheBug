import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Public API Documentation",
  description:
    "Documentation for KevTheFoo's read-only portfolio API for developers.",
  alternates: { canonical: "/api/docs" },
};

const endpoints = [
  {
    id: "profile",
    path: "/api/v1/profile",
    summary: "Complete public profile",
    description:
      "Returns my profile, contact links, published facts, projects, articles, and answered questions in one request.",
  },
  {
    id: "facts",
    path: "/api/v1/facts",
    summary: "Published facts",
    description:
      "Returns the facts used to ground portfolio answers. Filter the collection with the optional group query parameter.",
    parameter: "?group=about",
  },
  {
    id: "fact",
    path: "/api/v1/facts/{id}",
    summary: "One fact",
    description: "Returns a single published fact by its stable ID.",
  },
  {
    id: "projects",
    path: "/api/v1/projects",
    summary: "All projects",
    description:
      "Returns my published portfolio projects with descriptions, links, and available media.",
  },
  {
    id: "project",
    path: "/api/v1/projects/{id}",
    summary: "One project",
    description: "Returns a single portfolio project by its stable ID.",
  },
  {
    id: "articles",
    path: "/api/v1/articles",
    summary: "All articles",
    description:
      "Returns the published journal index, including titles, excerpts, dates, tags, and article content.",
  },
  {
    id: "article",
    path: "/api/v1/articles/{slug}",
    summary: "One article",
    description: "Returns a single journal article by its URL slug.",
  },
  {
    id: "questions",
    path: "/api/v1/questions",
    summary: "Published Q&A",
    description:
      "Returns reviewed questions and answers from my public portfolio.",
  },
];

const exampleResponse = `{
  "apiVersion": "1.0",
  "lastUpdated": "2026-09-22",
  "data": {
    "id": "kevin-foo",
    "name": "Kevin Foo",
    "handle": "kevthefoo",
    "location": "Taiwan"
  }
}`;

export default function ApiDocumentation() {
  return (
    <div className="api-docs-shell">
      <header className="api-docs-header">
        <Link
          href="/"
          className="api-docs-brand"
          aria-label="Back to portfolio"
        >
          <Image src="/icon.svg" alt="" width={32} height={32} />
          <span>KevTheFoo</span>
        </Link>
        <nav aria-label="Documentation navigation">
          <a href="/api/v1" target="_blank" rel="noreferrer">
            JSON index ↗
          </a>
          <Link href="/">Back to portfolio</Link>
        </nav>
      </header>

      <div className="api-docs-layout">
        <aside className="api-docs-toc" aria-label="On this page">
          <p>Documentation</p>
          <a href="#overview">Overview</a>
          <a href="#quick-start">Quick start</a>
          <a href="#endpoints">Endpoints</a>
          <a href="#responses">Responses</a>
          <a href="#usage">Usage notes</a>
        </aside>

        <div className="api-docs-content">
          <section className="api-docs-hero" id="overview">
            <p className="api-docs-eyebrow">PUBLIC API · VERSION 1.0</p>
            <h1>Portfolio data for developers.</h1>
            <p>
              Read my public profile, projects, articles, and reviewed facts as
              structured JSON. The API is read-only, requires no API key, and
              supports cross-origin requests.
            </p>
            <div className="api-docs-badges" aria-label="API features">
              <span>GET only</span>
              <span>No authentication</span>
              <span>CORS enabled</span>
            </div>
          </section>

          <section className="api-docs-section" id="quick-start">
            <div className="api-docs-section-heading">
              <span>01</span>
              <div>
                <h2>Quick start</h2>
                <p>Request the complete public profile with any HTTP client.</p>
              </div>
            </div>
            <div className="api-code-block">
              <div>
                <span>cURL</span>
                <span>GET</span>
              </div>
              <pre>
                <code>curl https://www.kevthefoo.com/api/v1/profile</code>
              </pre>
            </div>
          </section>

          <section className="api-docs-section" id="endpoints">
            <div className="api-docs-section-heading">
              <span>02</span>
              <div>
                <h2>Endpoints</h2>
                <p>
                  Every endpoint returns JSON using the same response envelope.
                </p>
              </div>
            </div>
            <div className="api-endpoint-list">
              {endpoints.map((endpoint) => (
                <article className="api-endpoint" key={endpoint.id}>
                  <div className="api-endpoint-title">
                    <span>GET</span>
                    <code>{endpoint.path}</code>
                  </div>
                  <h3>{endpoint.summary}</h3>
                  <p>{endpoint.description}</p>
                  {endpoint.parameter && (
                    <p className="api-endpoint-parameter">
                      Example filter: <code>{endpoint.parameter}</code>
                    </p>
                  )}
                  {!endpoint.path.includes("{") && (
                    <a href={endpoint.path} target="_blank" rel="noreferrer">
                      Try endpoint ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="api-docs-section" id="responses">
            <div className="api-docs-section-heading">
              <span>03</span>
              <div>
                <h2>Response format</h2>
                <p>
                  Successful responses include the API version, data freshness,
                  and requested payload.
                </p>
              </div>
            </div>
            <div className="api-code-block">
              <div>
                <span>Example response</span>
                <span>200 OK</span>
              </div>
              <pre>
                <code>{exampleResponse}</code>
              </pre>
            </div>
            <p className="api-docs-error-note">
              Unknown IDs and slugs return <code>404</code> with an error inside
              the <code>data</code> property.
            </p>
          </section>

          <section className="api-docs-section" id="usage">
            <div className="api-docs-section-heading">
              <span>04</span>
              <div>
                <h2>Usage notes</h2>
                <p>Simple defaults for reliable public consumption.</p>
              </div>
            </div>
            <div className="api-usage-grid">
              <article>
                <h3>Authentication</h3>
                <p>No API key or account is required.</p>
              </article>
              <article>
                <h3>Methods</h3>
                <p>Use GET for data and OPTIONS for CORS preflight requests.</p>
              </article>
              <article>
                <h3>Caching</h3>
                <p>Responses may be cached and refreshed periodically.</p>
              </article>
              <article>
                <h3>Content type</h3>
                <p>All successful data responses use application/json.</p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
