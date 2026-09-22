"use client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LuArrowLeft, LuCalendar, LuClock } from "react-icons/lu";

export default function BlogPostContent({ post }) {
  return (
    <article className="journal-page">
      <Link href="/blog" className="text-link">
        <LuArrowLeft /> Back to the journal
      </Link>
      <div className="journal-meta">
        <time dateTime={post.date}>
          <LuCalendar />
          {post.date}
        </time>
        {post.readTime && (
          <span>
            <LuClock />
            {post.readTime}
          </span>
        )}
      </div>
      <h1>{post.title}</h1>
      <p className="journal-article-excerpt">{post.excerpt}</p>
      <div className="post-tags">
        {post.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="post-divider" />
      <div className="blog-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
      <div className="post-divider" />
      <Link href="/blog" className="text-link">
        <LuArrowLeft /> Explore more journal entries
      </Link>
    </article>
  );
}
