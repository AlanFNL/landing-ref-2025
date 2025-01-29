import React, { forwardRef, useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import logo7 from "../assets/logo7.png";
import logo8 from "../assets/logo8.png";
import logo9 from "../assets/logo14.png";
import logo10 from "../assets/logo13.png";
import logo11 from "../assets/logo15.png";
import logo12 from "../assets/logo9.png";

import { useTranslation } from "react-i18next";

const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo11,
  logo9,
  logo10,
  logo12,
  logo8,
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeLogos = (allLogos, columnCount) => {
  const shuffled = shuffleArray(allLogos);
  const columns = Array.from({ length: columnCount }, () => []);

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  const maxLength = Math.max(...columns.map((col) => col.length));
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  });

  return columns;
};

const LogoColumn = React.memo(({ logos, index, currentTime, isInView }) => {
  const cycleInterval = 3000;
  const columnDelay = index * 200;
  const currentIndex = useMemo(() => {
    if (!isInView) return 0;
    const adjustedTime =
      (currentTime + columnDelay) % (cycleInterval * logos.length);
    return Math.floor(adjustedTime / cycleInterval);
  }, [currentTime, columnDelay, cycleInterval, logos.length, isInView]);

  const animationProps = isInView
    ? {
        initial: { y: "10%", opacity: 0 },
        animate: {
          y: "0%",
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 1,
            bounce: 0.2,
          },
        },
        exit: {
          y: "-20%",
          opacity: 0,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        },
      }
    : {
        initial: false,
        animate: { y: "0%", opacity: 1 },
        exit: false,
      };

  return (
    <motion.div
      className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`logo-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          {...animationProps}
        >
          <img
            loading="lazy"
            src={logos[currentIndex]}
            alt={`logo-${currentIndex}`}
            className="h-20 w-20 max-h-[80%] max-w-[80%] object-contain md:h-32 md:w-32 brightness-0 invert opacity-80"
            style={{
              willChange: isInView ? "transform" : "auto",
              transform: isInView ? "translateZ(0)" : "none",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

const BrandCarousel = forwardRef(({ clientsRef }, ref) => {
  const [t, i18n] = useTranslation("global");
  const [logoSets, setLogoSets] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const columnCount = 4;
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.3,
    margin: "100px",
  });

  const distributedLogos = useMemo(() => {
    return distributeLogos(logos, columnCount);
  }, []);

  useEffect(() => {
    setLogoSets(distributedLogos);
  }, [distributedLogos]);

  useEffect(() => {
    let lastUpdate = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const updateTime = (timestamp) => {
      if (!isInView) {
        animationRef.current = null;
        return;
      }

      if (!lastUpdate || timestamp - lastUpdate >= interval) {
        setCurrentTime((prevTime) => prevTime + interval);
        lastUpdate = timestamp;
      }

      animationRef.current = requestAnimationFrame(updateTime);
    };

    if (isInView) {
      animationRef.current = requestAnimationFrame(updateTime);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isInView]);

  useEffect(() => {
    const browserLang = navigator.language;
    i18n.changeLanguage(browserLang.startsWith("es") ? "es" : "en");
  }, [i18n]);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-20"
      ref={containerRef}
      id="carousel-section"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, width: "40%" }}
          whileInView={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute h-full bg-gradient-to-b from-purple-500/30 via-transparent to-transparent blur-3xl"
          style={{
            maskImage:
              "radial-gradient(circle at center 0%, black, transparent 70%)",
            willChange: isInView ? "transform, opacity" : "auto",
            transform: isInView ? "translateZ(0)" : "none",
          }}
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        viewport={{ once: true }}
        className="relative z-10 text-center text-4xl font-bold text-white mb-16"
      >
        {t("services.7")}
      </motion.h1>

      <div className="relative z-10 flex justify-center space-x-4">
        {logoSets.map((columnLogos, index) => (
          <LogoColumn
            key={index}
            logos={columnLogos}
            index={index}
            currentTime={currentTime}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
});

export default BrandCarousel;
