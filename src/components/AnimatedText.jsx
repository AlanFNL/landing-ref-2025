import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedText = ({
  text,
  className = "",
  delay = 1, // delay in seconds before animation starts
  lines = 1,
  lineDelay = 0.15, // delay between lines in seconds
  animationKey, // Add this prop
  highlightText = "", // Text to highlight with shimmer effect
}) => {
  const controls = useAnimation();
  const [isClient, setIsClient] = useState(false);

  // Ensure consistent client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset and restart animation when text or animationKey changes
  useEffect(() => {
    if (isClient) {
      controls.set("hidden");
      controls.start("visible");
    }
  }, [text, animationKey, controls, isClient]);

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

  // Shimmer effect variants for highlighted text
  const shimmerVariants = {
    shimmer: {
      backgroundPosition: ["-200% 0", "200% 0"],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4,
      },
    },
    paused: {
      backgroundPosition: ["-200% 0", "-200% 0"],
      transition: {
        duration: 0,
      },
    },
  };

  // Split text into lines and words, respecting the lines prop
  const textLines = text.split("\n").slice(0, lines);

  // Function to split text and highlight specific portion
  const renderTextWithHighlight = (line, lineIndex) => {
    if (!highlightText || !line.includes(highlightText)) {
      // No highlight needed, render normally
      return line.split(" ").map((word, wordIndex) => (
        <span
          key={`${wordIndex}-${animationKey}`}
          className="inline-block overflow-hidden mr-[0.25em]"
        >
          <motion.span className="inline-block" variants={whipInUp.child}>
            {word}
          </motion.span>
        </span>
      ));
    }

    // Split line by highlight text
    const parts = line.split(highlightText);
    const elements = [];

    parts.forEach((part, partIndex) => {
      if (part) {
        // Add regular text
        part.split(" ").forEach((word, wordIndex) => {
          if (word) {
            elements.push(
              <span
                key={`regular-${partIndex}-${wordIndex}-${animationKey}`}
                className="inline-block overflow-hidden mr-[0.25em]"
              >
                <motion.span className="inline-block" variants={whipInUp.child}>
                  {word}
                </motion.span>
              </span>
            );
          }
        });
      }

      if (partIndex < parts.length - 1) {
        // Add highlighted text with shimmer
        elements.push(
          <motion.span
            key={`highlight-${partIndex}-${animationKey}`}
            className="inline-block overflow-hidden mr-[0.25em] relative"
            variants={whipInUp.child}
          >
            <motion.span
              className="inline-block relative bg-gradient-to-r from-transparent via-purple-500/80 to-transparent bg-[length:200%_100%] bg-clip-text text-transparent"
              variants={shimmerVariants}
              animate="shimmer"
              whileInView="shimmer"
              viewport={{ once: false, margin: "-100px" }}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255) 50%, rgba(255,255,255,0.5) 100%)",
              }}
            >
              {highlightText}
            </motion.span>
          </motion.span>
        );
      }
    });

    return elements;
  };

  // On the server or before client hydration, render static text
  if (!isClient) {
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
          {renderTextWithHighlight(line, lineIndex)}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
