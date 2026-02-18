import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white py-8 transition duration-700 ease-linear dark:bg-neutral-900 dark:text-white">
      {/* Gradient top border */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

      <div className="mx-auto max-w-4xl px-4">
        {/* Social Links */}
        <div className="mb-6 flex items-center justify-center gap-6">
          <a
            href="https://github.com/kevthefoo"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-hover text-2xl text-gray-600 dark:text-gray-400"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/kevthebug/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-hover text-2xl text-gray-600 dark:text-gray-400"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://x.com/kevthefoo/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-hover text-2xl text-gray-600 dark:text-gray-400"
            title="X"
          >
            <FaSquareXTwitter />
          </a>

          <a
            href="mailto:kevthebug@gmail.com"
            className="icon-hover text-2xl text-gray-600 dark:text-gray-400"
            title="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Kevin Foo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
