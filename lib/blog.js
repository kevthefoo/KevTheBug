import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        coverImage: data.coverImage || null,
        readTime: data.readTime || null,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export function getPostBySlug(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    tags: data.tags || [],
    coverImage: data.coverImage || null,
    readTime: data.readTime || null,
    content,
  };
}

export function getLatestPosts(count = 3) {
  return getAllPosts().slice(0, count);
}
