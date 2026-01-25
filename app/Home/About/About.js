"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import "./about.css";
import Popup from "@/app/Component/Popup/Popup";
import descriptionData from "./Description";

import BubbleReveal from "@/app/Component/Reveal/bubbleReveal";

export default function About() {
  const [popupContent, setPopupContent] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Preload all popup images when component mounts
  useEffect(() => {
    Object.values(descriptionData).forEach((item) => {
      if (item.icon?.src) {
        const img = new window.Image();
        img.src = item.icon.src;
      }
    });
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
    <section id="about" className="h-screen flex-col justify-start pt-16 dark:bg-neutral-800">
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

      {/* Hidden preload container for popup images */}
      <div className="hidden">
        {Object.values(descriptionData).map((item, index) => (
          <Image
            key={index}
            src={item.icon}
            alt=""
            width={150}
            height={150}
            priority
          />
        ))}
      </div>
    </section>
  );
}
