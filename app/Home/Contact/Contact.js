import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaArrowRight } from "react-icons/fa";

import "./contact.css";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-f-screen flex-col justify-start pb-16 pt-16 dark:bg-neutral-800"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1>Contact</h1>
          <span className="mb-12 text-xl text-gray-500">
            Get more infomration about me
          </span>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Email Card */}
          <a
            href="mailto:kevthebug@gmail.com"
            className="contact-card group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 dark:border-gray-700 dark:bg-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/30">
                <MdEmail className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white">
                Email
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Send me a letter
              </p>
              <FaArrowRight className="text-gray-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-blue-500" />
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/kevthebug/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 dark:border-gray-700 dark:bg-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-indigo-500/30">
                <FaLinkedin className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white">
                LinkedIn
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Text me directly
              </p>
              <FaArrowRight className="text-gray-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-indigo-500" />
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/kevthefoo"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 dark:border-gray-700 dark:bg-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-gray-500/30">
                <FaGithub className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white">
                GitHub
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Check out my projects
              </p>
              <FaArrowRight className="text-gray-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-gray-600" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
