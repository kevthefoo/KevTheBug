"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HiArrowLeft, HiCalendar, HiClock, HiTag } from "react-icons/hi2";

export default function BlogPostContent({ post }) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-3xl mx-auto">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors mb-8 group"
      >
        <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <HiCalendar className="text-blue-400" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <HiClock className="text-purple-400" />
              {post.readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text leading-tight">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            >
              <HiTag className="text-[10px]" />
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700 mb-10" />

        {/* Content */}
        <div className="blog-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </motion.article>
    </div>
  );
}
