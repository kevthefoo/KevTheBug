"use client";

import { motion } from "framer-motion";

export default function Error({ error, reset }) {
  return (
    <section className="flex h-screen items-center justify-center border-4 border-black px-6">
      <div className="max-w-xl text-center">
        {/* Bug icon */}
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-4 select-none text-[6rem] max-[496px]:text-[4rem]"
        >
          <span role="img" aria-label="bug">
            🐛
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="gradient-text mb-2 text-4xl font-black max-[496px]:text-2xl"
        >
          Something went wrong
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 text-lg text-gray-500 max-[496px]:text-base dark:text-gray-400"
        >
          A wild bug appeared! Don&apos;t worry, KevTheBug is on the case.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => reset()}
            className="btn-gradient btn-pulse inline-block cursor-pointer rounded-full px-8 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-block rounded-full border-2 border-blue-500 px-8 py-3 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white"
          >
            Go Home
          </a>
        </motion.div>
      </div>
    </section>
  );
}
