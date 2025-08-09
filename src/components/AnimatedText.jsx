import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedText = ({
  text,
  className = "",
  delay = 1, // delay in seconds before animation starts
  lines = 1,
  lineDelay = 0.15, // delay between lines in seconds
  animationKey, // Add this prop
}) => {
  const controls = useAnimation();
  const isServer = typeof window === "undefined";

  // Reset and restart animation when text or animationKey changes
  useEffect(() => {
    controls.set("hidden");
    controls.start("visible");
  }, [text, animationKey, controls]);

  // Animation variants
  const whipInUp = {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: lineDelay,
          delayChildren: delay,
        },
      },
    },
    line: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.05,
        },
      },
    },
    child: {
      hidden: {
        y: "200%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.45 },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.5, -0.15, 0.25, 1.05],
          duration: 0.75,
        },
      },
    },
  };

  // Split text into lines and words, respecting the lines prop
  const textLines = text.split("\n").slice(0, lines);

  // On the server, render static text so SSG shows content without JS
  if (isServer) {
    return (
      <div className={className}>
        {textLines.map((line, lineIndex) => (
          <div key={`${lineIndex}-ssr`}>{line}</div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={whipInUp.container}
      initial="hidden"
      animate={controls}
      viewport={{ once: true, margin: "-50px" }}
    >
      {textLines.map((line, lineIndex) => (
        <motion.div
          key={`${lineIndex}-${animationKey}`}
          variants={whipInUp.line}
          className="overflow-hidden"
        >
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={`${wordIndex}-${animationKey}`}
              className="inline-block overflow-hidden mr-[0.25em]"
            >
              <motion.span className="inline-block" variants={whipInUp.child}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
