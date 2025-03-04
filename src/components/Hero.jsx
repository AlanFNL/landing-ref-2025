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
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Check the browser's language and set the language accordingly
    const browserLang = navigator.language;
    if (browserLang.startsWith("es")) {
      i18n.changeLanguage("es");
    } else {
      i18n.changeLanguage("en");
    }
    // Trigger animation reset when language changes
    setAnimationKey((prev) => prev + 1);
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

      // Throttle the animation updates
      window.requestAnimationFrame(() => {
        setSlideX((prev) => {
          // Reduce the movement range and make it smoother
          const newX = prev - scrollDelta * 0.15; // Reduced multiplier
          return Math.min(Math.max(newX, -500), 500); // Reduced range
        });
      });

      setPrevScrollPos(currentScrollPos);
    };

    // Throttle scroll events
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
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
        className="max-w-[1200px] md:mt-24 md:mb-4 p-0 md:p-2 m-auto relative z-10"
        ref={heroHeaderRef}
      >
        <div className="flex flex-col justify-center items-center text-center mt-24 md:mt-0 p-4 md:p-12">
          <motion.div
            key={`badge-${animationKey}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              {t("about.new")} ✨
            </span>
          </motion.div>

          <AnimatedText
            animationKey={animationKey}
            text={t("about.1")}
            className="text-4xl md:text-7xl font-bold text-white leading-tight max-w-rxl"
            delay={0.1}
            lines={3}
            lineDelay={0.1}
            style={{ minHeight: "calc(9rem * 3)" }}
          />

          <AnimatedText
            animationKey={animationKey}
            text={t("about.2")}
            className=" text-xl md:text-3xl text-white/80 font-bold mt-8 max-w-3xl"
            delay={0.4}
            lines={2}
            lineDelay={0.05}
            style={{ minHeight: "calc(4rem * 2)" }}
          />

          <motion.div
            animationKey={animationKey}
            className="flex gap-4 mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.5,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-8 py-4 bg-white text-purple-500 font-bold border-[#ffffff52]  rounded-full  text-sm md:text-lg shadow-lg hover:shadow-xl transition-shadow group"
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
