"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Popup({ content, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative flex h-1/2 w-[500px] flex-col items-start justify-start overflow-hidden rounded-2xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 max-md:h-[300px] max-md:w-[300px] dark:border-gray-700/50 dark:bg-slate-800/90 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient accent top border */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* Close button */}
        <button
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleClose}
        >
          &times;
        </button>

        <h1 className="mb-2 text-2xl font-bold text-gray-800 max-md:text-xl dark:text-white">
          {content.value}
        </h1>
        <p className="text-gray-600 max-md:text-[14px] max-md:leading-6 dark:text-gray-300">
          {content.description}
        </p>
        <Image
          src={content.icon}
          alt={content.value}
          unoptimized
          priority={true}
          loading="eager"
          className="absolute bottom-4 right-1/2 h-[150px] w-[150px] translate-x-1/2 drop-shadow-lg max-md:h-[100px] max-md:w-[100px]"
        />
      </div>
    </div>
  );
}
