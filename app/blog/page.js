"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowLeft, HiCalendar, HiClock, HiTag } from "react-icons/hi2";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allTags = [...new Set(posts.flatMap((p) => p.tags))];
  const filtered = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-5xl mx-auto">
      {/* Back to home */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors mb-8 group"
      >
        <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Link>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-3">
          <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
          Thoughts on development, technology, and things I&apos;m building.
        </p>
      </motion.div>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              !selectedTag
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTag === tag
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Posts Grid */}
      {!loading && (
        <div className="grid gap-6">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <Link href={`/blog/${post.slug}`}>
                <article className="group p-6 rounded-2xl border border-gray-200/60 bg-white/60 backdrop-blur-sm hover:border-blue-300/60 hover:bg-white/80 hover:shadow-lg transition-all duration-300 dark:border-neutral-700/60 dark:bg-neutral-900/60 dark:hover:border-blue-500/40 dark:hover:bg-neutral-800/80">
                  <div className="flex flex-col gap-3">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
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
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition-colors dark:text-gray-100 dark:group-hover:text-blue-400">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500 dark:bg-neutral-800 dark:text-gray-400"
                        >
                          <HiTag className="text-[10px]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}

          {filtered.length === 0 && !loading && (
            <p className="text-center text-gray-400 py-20">
              No posts found{selectedTag ? ` for "${selectedTag}"` : ""}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
