"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function BubbleReveal({
  children,
  className,
  onClick,
  delayTime = 0.5,
  xTranslate = 0,
  yTranslate = 150,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      className={className}
      onClick={onClick}
      ref={ref}
      variants={{
        hidden: { opacity: 0, x: "-50%", y: 44 },
        visible: { opacity: 1, x: "-50%", y: -56 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: delayTime }}
    >
      {children}
    </motion.div>
  );
}
