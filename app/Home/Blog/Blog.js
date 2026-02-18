"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Reveal from "@/app/Component/Reveal/Reveal";
import { HiCalendar, HiClock, HiTag, HiArrowRight } from "react-icons/hi2";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="!flex-col !items-center py-16">
      <Reveal yTranslate={40}>
        <h1 className="text-center">
          <span className="gradient-text">Blog</span>
        </h1>
        <span className="mb-12 text-center text-xl text-gray-500">
          Latest thoughts and articles
        </span>
      </Reveal>

      <div className="grid w-full max-w-5xl gap-5 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} yTranslate={60} delayTime={0.15 * i}>
            <Link href={`/blog/${post.slug}`}>
              <article className="group flex h-full flex-col rounded-2xl border border-gray-200/60 bg-white/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-blue-300/60 hover:bg-white/80 hover:shadow-lg dark:border-neutral-700/60 dark:bg-neutral-900/60 dark:hover:border-blue-500/40 dark:hover:bg-neutral-800/80">
                {/* Date & Read Time */}
                <div className="mb-3 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <HiCalendar className="text-blue-400" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1">
                      <HiClock className="text-purple-400" />
                      {post.readTime}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors group-hover:text-blue-500 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-0.5 rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500 dark:bg-neutral-800 dark:text-gray-400"
                    >
                      <HiTag className="text-[9px]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* View All */}
      <Reveal yTranslate={30} delayTime={0.4}>
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110"
          >
            View All Posts
            <HiArrowRight />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
