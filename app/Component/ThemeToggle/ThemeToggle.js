"use client";

import { useState, useEffect } from "react";

import "./themetoggle.css";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    if (darkMode) {
      document.body.classList.add("dark");

      document.querySelectorAll(".pfp_image_dark").forEach((element) => {
        element.classList.remove("invisible", "opacity-0");
      });

      document.querySelectorAll(".pfp_image_light").forEach((element) => {
        element.classList.add("invisible", "opacity-0");
      });
    } else {
      document.body.classList.remove("dark");

      document.querySelectorAll(".pfp_image_light").forEach((element) => {
        element.classList.remove("invisible", "opacity-0");
      });

      document.querySelectorAll(".pfp_image_dark").forEach((element) => {
        element.classList.add("invisible", "opacity-0");
      });
    }
  }, [darkMode]);

  return (
    <>
      <input
        className="toggle_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <label className="toggle_label" htmlFor="darkmode-toggle"></label>
    </>
  );
}
