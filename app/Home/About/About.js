"use client";
import { useState, useEffect } from "react";
import NextImage from "next/image";

import "./about.css";
import Popup from "@/app/Component/Popup/Popup";
import descriptionData from "./Description";

import BubbleReveal from "@/app/Component/Reveal/bubbleReveal";

export default function About() {
  const [popupContent, setPopupContent] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Preload all images when component mounts
  useEffect(() => {
    const preloadImages = () => {
      Object.values(descriptionData).forEach((data) => {
        if (data.icon) {
          const img = new window.Image();
          img.src = data.icon.src;
          // Optional: Handle load/error events for debugging
          img.onload = () => console.log(`Preloaded: ${data.value}`);
          img.onerror = () => console.error(`Failed to preload: ${data.value}`);
        }
      });
    };

    preloadImages();
  }, []);

  const handleBubbleClick = (content) => {
    setPopupContent(content);
    setIsPopupVisible(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      id="about"
      className="h-screen flex-col justify-start pt-16 dark:bg-neutral-800"
    >
      {/* Preload images invisibly */}
      <div className="hidden">
        {Object.values(descriptionData).map((data, index) => (
          <NextImage
            key={`preload-${index}`}
            src={data.icon}
            alt=""
            width={150}
            height={150}
            priority={true}
            loading="eager"
          />
        ))}
      </div>

      <h1>About Me</h1>
      <span className="mb-12 text-xl text-gray-500">What I am made of</span>
      <div className="relative h-full w-full">
        {Object.keys(descriptionData).map((key, index) => (
          <BubbleReveal
            key={key}
            delayTime={index * 0.1}
            className={`bubble ${key} `}
            onClick={() => handleBubbleClick(descriptionData[key])}
          >
            {descriptionData[key].value}
          </BubbleReveal>
        ))}
      </div>
      {isPopupVisible && <Popup content={popupContent} onClose={closePopup} />}
    </section>
  );
}
