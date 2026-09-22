import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo.mjs";

export default function sitemap() {
  const posts = getAllPosts();
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date("2026-09-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(posts[0]?.date || "2026-09-22"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.7,
    })),
  ];
}
