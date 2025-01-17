import React, { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

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
      initial={{
        maskImage:
          "radial-gradient(circle closest-side, black 0%, transparent 0%)",
      }}
      animate={{
        maskImage:
          "radial-gradient(circle closest-side, black 0%, transparent 250%)",
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="w-screen h-screen bg-[url('./assets/gradient-1.webp')] bg-cover overflow-hidden flex flex-col"
    >
      <div
        className="max-w-[1200px] p-2 md:p-8 m-auto relative z-10"
        ref={heroHeaderRef}
      >
        <div className="flex flex-col justify-center items-center text-center p-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              {t("about.new")} ✨
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="text-4xl md:text-7xl font-bold text-white leading-tight"
          >
            {t("about.1")}
          </motion.h1>

          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 0.3 }}
            className="text-xl md:text-3xl text-white/80 mt-8 max-w-3xl"
          >
            {t("about.2")}
          </motion.h2>

          <motion.div
            className="flex gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => scrollToSection("contact")}
            >
              {t("about.cta")}
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900/0 via-purple-900/50 to-purple-900/80 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
