"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="flex h-screen items-center justify-center px-6">
      <div className="max-w-xl text-center">
        {/* Glitchy 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-6"
        >
          <h1 className="gradient-text select-none text-[10rem] font-black leading-none max-[496px]:text-[6rem]">
            404
          </h1>
          <motion.div
            className="gradient-text-secondary absolute inset-0 select-none text-[10rem] font-black leading-none opacity-30 max-[496px]:text-[6rem]"
            animate={{ x: [0, -4, 4, -2, 0], y: [0, 2, -2, 1, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
          >
            404
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4 text-2xl font-bold max-[496px]:text-xl dark:text-white"
        >
          Page not found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mb-8 text-lg text-gray-500 max-[496px]:text-base dark:text-gray-400"
        >
          Looks like this page wandered off into the void. Let&apos;s get you
          back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/"
            className="btn-gradient btn-pulse inline-block rounded-full px-8 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-blue-500/20 dark:bg-blue-400/20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
