import assert from "node:assert/strict";
import test from "node:test";
import {
  absoluteUrl,
  articleStructuredData,
  blogStructuredData,
  homeStructuredData,
  SITE_URL,
} from "./seo.mjs";

const post = {
  slug: "example-post",
  title: "Example Post",
  excerpt: "An example description.",
  date: "2026-09-22",
  tags: ["Example"],
};

test("uses one HTTPS canonical origin", () => {
  assert.equal(SITE_URL, "https://www.kevthefoo.com");
  assert.equal(absoluteUrl("/blog"), "https://www.kevthefoo.com/blog");
  assert.equal(absoluteUrl("/"), "https://www.kevthefoo.com/");
});

test("builds linked ProfilePage, Person and WebSite schema", () => {
  const schema = homeStructuredData(
    [post],
    [{ name: "Project", url: "https://example.com", description: "Example" }],
  );
  const types = schema["@graph"].map((item) => item["@type"]);
  assert.deepEqual(types, ["WebSite", "ProfilePage", "Person"]);
  const profile = schema["@graph"].find(
    ({ "@type": type }) => type === "ProfilePage",
  );
  assert.equal(
    profile.mainEntity["@id"],
    "https://www.kevthefoo.com/#kevin-foo",
  );
  assert.equal(
    profile.hasPart[0].url,
    "https://www.kevthefoo.com/blog/example-post",
  );
});

test("builds complete Blog and BlogPosting schema", () => {
  const blog = blogStructuredData([post]);
  const articleGraph = articleStructuredData(post)["@graph"];
  const article = articleGraph.find(
    ({ "@type": type }) => type === "BlogPosting",
  );
  const breadcrumb = articleGraph.find(
    ({ "@type": type }) => type === "BreadcrumbList",
  );
  assert.equal(blog["@type"], "Blog");
  assert.equal(blog.blogPost[0].headline, post.title);
  assert.equal(article["@type"], "BlogPosting");
  assert.equal(
    article.mainEntityOfPage["@id"],
    absoluteUrl(`/blog/${post.slug}`),
  );
  assert.equal(article.author.name, "Kevin Foo");
  assert.equal(
    article.image,
    absoluteUrl(`/blog/${post.slug}/opengraph-image`),
  );
  assert.equal(breadcrumb.itemListElement.length, 3);
});
