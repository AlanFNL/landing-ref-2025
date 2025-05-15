import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, useAnimation } from "framer-motion";
import Projects from "./Projects";
import VideoShowcase from "./VideoShowcase";

const OurWork = () => {
  const { t } = useTranslation("global");
  const controls = useAnimation();
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });

  // Use proper case for main title and split into letters
  const mainTitle = "Our Work";
  const titleLetters = mainTitle.split("");

  // Trigger animations when in view
  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div className="bg-black text-white relative overflow-hidden">
      {/* SVG Filter for glow effects - browser compatible */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Enhanced Ripple Effect - uses SVG for better browser compatibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* First ripple circle */}
        <svg
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="0"
            stroke="rgba(168, 85, 247, 0.3)"
            strokeWidth="0.5"
            fill="none"
            initial={{ r: 0 }}
            animate={isInView ? { r: [0, 40], opacity: [0, 0.8, 0] } : {}}
            transition={{
              duration: 2.5,
              ease: "easeOut",
              delay: 0.2,
              times: [0, 0.5, 1],
            }}
          />
        </svg>

        {/* Second ripple circle */}
        <svg
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="0"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="0.3"
            fill="none"
            initial={{ r: 0 }}
            animate={isInView ? { r: [0, 45], opacity: [0, 0.6, 0] } : {}}
            transition={{
              duration: 3,
              ease: "easeOut",
              delay: 0.5,
              times: [0, 0.6, 1],
            }}
          />
        </svg>

        {/* Glowing center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-purple-500/10"
          style={{ filter: "url(#glow)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  scale: [0, 1.2, 1],
                  opacity: [0, 0.8, 0.4],
                }
              : {}
          }
          transition={{
            duration: 2,
            ease: "easeOut",
            times: [0, 0.5, 1],
          }}
        />

        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/5 to-transparent opacity-60" />
      </div>

      {/* Title Section with Refined Animation */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl mb-16 md:mb-24">
        <div className="relative" ref={titleRef}>
          {/* Main title with letter-by-letter animation */}
          <div className="relative z-10 flex justify-center items-center py-12 md:py-16">
            <div className="overflow-hidden">
              <div className="flex items-center justify-center">
                {titleLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold ${
                      letter === " " ? "mx-4" : "mx-[2px] md:mx-[4px]"
                    } text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-300`}
                    variants={{
                      hidden: {
                        y: 100,
                        opacity: 0,
                        filter: "blur(8px)",
                      },
                      visible: {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                    }}
                    initial="hidden"
                    animate={controls}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 + index * 0.05,
                      ease: [0.23, 1, 0.32, 1], // Apple-like cubic-bezier
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Elegant animated line */}
          <motion.div
            className="h-[2px] w-0 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            variants={{
              hidden: { width: 0, opacity: 0 },
              visible: { width: "180px", opacity: 1 },
            }}
            initial="hidden"
            animate={controls}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              boxShadow: "0 0 8px rgba(168, 85, 247, 0.4)",
            }}
          />

          {/* REFORCE INFINITY subtitle */}
          <motion.p
            className="text-center text-gray-400 mt-6 text-base md:text-lg font-light tracking-[0.2em]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 0.9, y: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            REFORCE INFINITY
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator - now positioned in the flow between title and content */}
      <motion.div
        className="relative flex flex-col items-center justify-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={
          isInView
            ? {
                opacity: [0, 0.8, 0.8, 0],
                y: [0, 0, 5, 0],
              }
            : {}
        }
        transition={{
          duration: 2.5,
          delay: 1.8,
          times: [0, 0.3, 0.9, 1],
          repeat: 2,
          repeatDelay: 0.5,
        }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1"
          initial={{ opacity: 0.7 }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-purple-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Case Studies Section (formerly Projects) */}
      <Projects />

      {/* Motion Graphics Section (formerly VideoShowcase) */}
      <div className="mt-16 md:mt-20">
        <VideoShowcase />
      </div>
    </div>
  );
};

// Add radial gradient utility for older browsers
const plugin = {
  handler: ({ addUtilities }) => {
    addUtilities({
      ".bg-gradient-radial": {
        "background-image": "radial-gradient(var(--tw-gradient-stops))",
      },
    });
  },
};

// This won't actually run, but shows how to extend Tailwind if needed
try {
  module.exports = plugin;
} catch (e) {
  // In browser context, this will just be ignored
}

export default OurWork;
