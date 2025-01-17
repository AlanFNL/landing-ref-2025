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
      <div className="max-w-[1200px] p-2 md:p-8 m-auto" ref={heroHeaderRef}>
        <div className="flex flex-col justify-center items-center text-center p-12">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="text-3xl md:text-6xl font-bold text-white leading-relaxed"
          >
            {t("about.1")}
          </motion.h1>
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 0.3 }}
            className="text-lg md:text-2xl text-white mt-8"
          >
            {t("about.2")}
          </motion.h2>
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
