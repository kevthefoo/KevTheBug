import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import "./contact.css";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-f-screen flex-col justify-start pb-16 pt-16"
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
            className="hover:shadow-3xl group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 dark:bg-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <MdEmail className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white">
                Email
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Send me a letter
              </p>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/kevthebug/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:shadow-3xl group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 dark:bg-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                <FaLinkedin className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white">
                LinkedIn
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Text me directly
              </p>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/kevthefoo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:shadow-3xl group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 dark:bg-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-lg">
                <FaGithub className="text-2xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white">
                GitHub
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Check out my projects
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
