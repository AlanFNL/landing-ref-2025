import React, { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

function Hero({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [slideX, setSlideX] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const [t, i18n] = useTranslation("global");
  useEffect(() => {
    // Check the browser's language and set the language accordingly
    const browserLang = navigator.language;
    if (browserLang.startsWith("es")) {
      i18n.changeLanguage("es");
    } else {
      i18n.changeLanguage("en");
    }
  }, [i18n]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.documentElement.style.overflow = "visible";
    };
  }, [isOpen]);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting) {
            // Reset scroll position when coming back into view
            setPrevScrollPos(window.scrollY);
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isInView) return;

      const currentScrollPos = window.scrollY;
      const scrollDelta = currentScrollPos - prevScrollPos;

      setSlideX((prev) => {
        const newX = prev - scrollDelta * 0.5;
        return Math.min(Math.max(newX, -2000), 2000);
      });

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, isInView]);

  const heroHeaderRef = useRef();

  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="w-screen min-h-fit h-screen bg-[url('./assets/gradient-1.webp')] bg-cover overflow-hidden flex flex-col"
    >
      <div
        className="max-w-[1200px] mt-16 md:mb-4 p-0 md:p-8 m-auto relative z-10"
        ref={heroHeaderRef}
      >
        <div className="flex flex-col justify-center items-center text-center mt-24 md:mt-0 p-4 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              {t("about.new")} ✨
            </span>
          </motion.div>

          <AnimatedText
            text={t("about.1")}
            className="text-3xl md:text-7xl font-bold text-white leading-tight"
            delay={0.1}
            lines={3}
            lineDelay={0.1}
          />

          <AnimatedText
            text={t("about.2")}
            className="text-sm md:text-3xl text-white/80 mt-8 max-w-3xl"
            delay={0.4}
            lines={2}
            lineDelay={0.05}
          />

          <motion.div
            className="flex gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.5,
              ease: [0.33, 1, 0.68, 1],
            }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-4 md:px-8 py-2 md:py-4 bg-white text-purple-500 font-bold border-[#ffffff52]  rounded-full  text-xs md:text-lg shadow-lg hover:shadow-xl transition-shadow group"
              onClick={() => scrollToSection("contact")}
            >
              <span className="inline-flex items-center gap-2">
                {t("about.cta")}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900/0 via-purple-900/50 to-purple-900/80 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="hero-slide"
        style={{
          x: slideX,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 40,
          mass: 0.2,
          restDelta: 0.001,
        }}
      />
    </motion.section>
  );
}

export default Hero;
