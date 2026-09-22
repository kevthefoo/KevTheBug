# KevTheFoo Public API

The portfolio exposes public, read-only JSON under `/api/v1`. No API key is required. Responses include permissive CORS headers and may be cached for up to one hour by shared caches.

## Endpoints

| Endpoint                         | Description                                               |
| -------------------------------- | --------------------------------------------------------- |
| `GET /api/v1`                    | API discovery document with absolute endpoint URLs        |
| `GET /api/v1/profile`            | Complete public profile in one request                    |
| `GET /api/v1/facts`              | Published biographical, skill, contact and interest facts |
| `GET /api/v1/facts?group=Skills` | Facts filtered by group                                   |
| `GET /api/v1/facts/{id}`         | One fact by ID                                            |
| `GET /api/v1/projects`           | Published projects                                        |
| `GET /api/v1/projects/{id}`      | One project by ID                                         |
| `GET /api/v1/articles`           | Article metadata                                          |
| `GET /api/v1/articles/{slug}`    | One article including its Markdown body                   |
| `GET /api/v1/questions`          | Reviewed Q&A material; unanswered drafts are excluded     |

Every successful response uses this envelope:

```json
{
  "apiVersion": "1.0",
  "lastUpdated": "2026-09-22",
  "data": {}
}
```

Start with `/api/v1/profile` when an agent needs the complete public context. Use the collection and item endpoints when a smaller response is preferable. The `llms.txt` file at the site root advertises these endpoints to compatible crawlers and agents.
