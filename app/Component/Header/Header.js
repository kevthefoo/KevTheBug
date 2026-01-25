"use client";
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import ThemeToggle from "@/app/Component/ThemeToggle/ThemeToggle";
import Image from "next/image";
import logo from "@/asset/materials/logo/logo.png";

export default function Header() {
  const [active, setActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [active]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 flex h-16 w-full items-center justify-around border-b transition-all duration-300 ease-out max-md:justify-start ${
        scrolled
          ? "border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-md dark:border-gray-700/50 dark:bg-neutral-900/80"
          : "border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-neutral-900/95"
      } dark:text-white`}
    >
      <div className="flex h-full items-center justify-center gap-2 max-md:ml-5">
        <p className="select-none text-[26px] font-medium max-[992px]:text-xl">
          Kevin Foo
        </p>
      </div>
      <nav className="max-[992px]:text-sm max-md:hidden">
        <ul className="flex items-center justify-between gap-6 max-[992px]:gap-[14px]">
          <li>
            <a href="#about" className="nav-link py-1 transition-colors hover:text-blue-500">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link py-1 transition-colors hover:text-blue-500">
              Skills
            </a>
          </li>
          <li>
            <a href="#showcase" className="nav-link py-1 transition-colors hover:text-blue-500">
              Showcase
            </a>
          </li>
          <li>
            <a href="#services" className="nav-link py-1 transition-colors hover:text-blue-500">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link py-1 transition-colors hover:text-blue-500">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Social Media Icons and Theme Toggle Button */}
      <div
        className={
          active
            ? "max-[992px]:gap-4 max-md:absolute max-md:left-[50%] max-md:top-[200px] max-md:z-50 max-md:flex max-md:translate-x-[-50%] max-md:flex-col max-md:items-center max-md:justify-between"
            : "flex items-center justify-between gap-4 max-[992px]:gap-4 max-md:hidden"
        }
      >
        <ul className="flex items-center justify-between gap-3 text-2xl max-md:order-1">
          <li>
            <a
              href="https://github.com/kevthefoo"
              target="_blank"
              title="Github"
              className="icon-hover inline-block"
            >
              <FaGithubSquare />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/kevthebug/"
              target="_blank"
              title="Linkedin"
              className="icon-hover inline-block"
            >
              <FaLinkedin />
            </a>
          </li>
        </ul>
        <ThemeToggle />
      </div>

      {/* Mobile Menu Toggle Button*/}
      <div
        className="absolute right-8 top-4 z-50 hidden h-7 w-7 cursor-pointer flex-col justify-between max-md:flex"
        onClick={() => {
          handleActive();
        }}
      >
        <div
          className={
            active
              ? "absolute left-0 top-1/2 h-1 w-full rotate-45 bg-black transition ease-in-out dark:bg-white"
              : "h-1 w-full bg-black transition ease-in-out dark:bg-white"
          }
        ></div>
        <div
          className={
            active
              ? ""
              : "h-1 w-full bg-black transition delay-150 ease-in-out dark:bg-white"
          }
        ></div>
        <div
          className={
            active
              ? "absolute left-0 top-1/2 h-1 w-full rotate-[-45deg] bg-black transition ease-in-out dark:bg-white"
              : "h-1 w-full bg-black transition ease-in-out dark:bg-white"
          }
        ></div>
      </div>

      {/* Mobile Menu*/}
      <div
        className={
          active
            ? "fixed left-0 top-0 z-30 flex h-screen w-full flex-col items-center justify-start bg-white/95 pt-[300px] backdrop-blur-md transition duration-500 ease-out dark:bg-neutral-900/95 dark:text-white"
            : "fixed left-full top-0 z-30 flex h-screen w-full items-center justify-center bg-white/95 backdrop-blur-md transition duration-500 ease-out dark:bg-neutral-900/95 dark:text-white"
        }
      >
        <nav className={active ? "" : ""}>
          <ul className="flex flex-col justify-center gap-8 text-center">
            <li className="relative before:absolute before:right-[95px] before:top-[10px] before:h-[1px] before:w-16 before:bg-black before:content-[''] after:absolute after:left-[95px] after:top-[10px] after:h-[1px] after:w-16 after:bg-black after:content-[''] dark:before:bg-white dark:after:bg-white">
              <a href="#about" onClick={() => setActive(false)}>
                About
              </a>
            </li>
            <li className="relative before:absolute before:right-[95px] before:top-[10px] before:h-[1px] before:w-16 before:bg-black before:content-[''] after:absolute after:left-[95px] after:top-[10px] after:h-[1px] after:w-16 after:bg-black after:content-[''] dark:before:bg-white dark:after:bg-white">
              <a href="#skills" onClick={() => setActive(false)}>
                Skills
              </a>
            </li>
            <li className="relative before:absolute before:right-[95px] before:top-[10px] before:h-[1px] before:w-16 before:bg-black before:content-[''] after:absolute after:left-[95px] after:top-[10px] after:h-[1px] after:w-16 after:bg-black after:content-[''] dark:before:bg-white dark:after:bg-white">
              <a href="#showcase" onClick={() => setActive(false)}>
                Showcase
              </a>
            </li>
            <li className="relative before:absolute before:right-[95px] before:top-[10px] before:h-[1px] before:w-16 before:bg-black before:content-[''] after:absolute after:left-[95px] after:top-[10px] after:h-[1px] after:w-16 after:bg-black after:content-[''] dark:before:bg-white dark:after:bg-white">
              <a href="#services" onClick={() => setActive(false)}>
                Services
              </a>
            </li>
            <li className="relative before:absolute before:right-[95px] before:top-[10px] before:h-[1px] before:w-16 before:bg-black before:content-[''] after:absolute after:left-[95px] after:top-[10px] after:h-[1px] after:w-16 after:bg-black after:content-[''] dark:before:bg-white dark:after:bg-white">
              <a href="#contact" onClick={() => setActive(false)}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
