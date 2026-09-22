import Link from "next/link";
import StructuredData from "@/app/Component/StructuredData";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, blogStructuredData } from "@/lib/seo.mjs";

const socialImage = absoluteUrl("/opengraph-image");

export const metadata = {
  title: "Journal",
  description:
    "Read Kevin Foo's notes on software engineering, blockchain development and practical AI tools for developers.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Kevin Foo's Journal",
    description:
      "Notes on software engineering, blockchain development and practical AI tools.",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Kevin Foo's Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Foo's Journal",
    description:
      "Notes on software engineering, blockchain development and practical AI tools.",
    images: [socialImage],
  },
};

export default function Blog() {
  const posts = getAllPosts();
  return (
    <div className="journal-shell">
      <StructuredData data={blogStructuredData(posts)} />
      <header className="journal-header">
        <Link href="/" className="journal-brand" aria-label="Back to portfolio">
          <span>K</span> KevTheFoo
        </Link>
        <Link href="/">Back to portfolio</Link>
      </header>
      <div className="journal-index">
        <p className="journal-eyebrow">NOTES FROM THE JOURNEY</p>
        <h1>Journal</h1>
        <p className="journal-intro">
          Thoughts on software engineering, blockchain development and the AI
          tools changing how I work.
        </p>
        <div className="journal-list">
          {posts.map((post) => (
            <article key={post.slug} className="journal-card">
              <div className="journal-card-meta">
                <time dateTime={post.date}>{post.date}</time>
                {post.readTime && <span>{post.readTime}</span>}
              </div>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <div className="journal-card-footer">
                <div aria-label="Topics">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`}>Read article →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
