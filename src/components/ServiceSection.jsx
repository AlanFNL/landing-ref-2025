import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ServiceCard } from "./ServiceCard";
import { useTranslation } from "react-i18next";

import stock1 from "../assets/1.lottie";
import stock2 from "../assets/2.lottie";
import stock3 from "../assets/5.lottie";
import stock4 from "../assets/4.lottie";
import stock5 from "../assets/3.lottie";

export const ServicesSection = () => {
  const [t, i18n] = useTranslation("global");
  const containerRef = useRef();
  const titleRef = useRef();
  const isInView = useInView(titleRef, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);
  const [transformValue, setTransformValue] = useState(-2000);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Adjust breakpoint as needed
      setTransformValue(isMobile ? -1850 : -2000);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useTransform(scrollYProgress, [0.15, 0.8], [0, transformValue]);
  const scale2 = useTransform(scrollYProgress, [0.8, 1], ["1", "0.98"]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.2], [0, -10]);
  const y = useTransform(scrollYProgress, [0.1, 0.2], [0, -50]);
  const blur = useTransform(scrollYProgress, [0.1, 0.2], [0, 10]);
  const backgroundTextX = useTransform(
    scrollYProgress,
    [0.15, 0.8],
    [-1000, 1000]
  );
  const backgroundTextXx = useTransform(
    scrollYProgress,
    [0.15, 0.8],
    [1000, -1000]
  );
  const asteriskRotate = useTransform(scrollYProgress, [0.15, 0.8], [0, 720]);
  const backgroundTextOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.15, 0.8, 0.85],
    [0, 1, 1, 0]
  );

  const titleWords = "Digital Excellence".split(" ");
  const services = [
    {
      title: t("service1.1"),
      description: t("service1.2"),

      lottieUrl: stock1,
      ctaText: t("service1.9"),
      ctaUrl: "/services/content-creation",
    },
    {
      title: "Paid Media Ads",
      description: t("service2.2"),

      lottieUrl: stock2,
      ctaText: t("service2.10"),
      ctaUrl: "/services/paid-media",
    },
    {
      title: t("service3.1"),
      description: t("service3.2"),

      lottieUrl: stock3,
      ctaText: t("service3.8"),
      ctaUrl: "/services/vr-ar",
    },
    {
      title: t("service5.1"),
      description: t("service5.2"),

      lottieUrl: stock4,
      ctaText: t("service4.8"),
      ctaUrl: "/services/influencer-marketing",
    },
    {
      title: t("service4.1"),
      description: t("service4.2"),
      lottieUrl: stock5,
      ctaText: t("service4.8"),
      ctaUrl: "/services/web-development",
    },
  ];
  return (
    <div
      ref={containerRef}
      className="h-[400vh] relative bg-[url('./assets/services-bg3.webp')] bg-no-repeat bg-cover bg-fixed inset-0 sm:inset-4 rounded-xl mb-8 border border-[#ffffff52]/50"
      style={{ scale2 }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{
            opacity,
            scale,
            rotateX: rotate,
            y,
            filter: blur.toString().startsWith("0")
              ? "blur(0px)"
              : blur.toString().startsWith("10")
              ? "blur(10px)"
              : `blur(${blur}px)`,
          }}
          className="h-screen flex items-center justify-center"
        >
          <div
            ref={titleRef}
            className="text-center w-full max-w-6xl mx-auto px-4"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-white uppercase tracking-wider font-medium mb-4 sm:mb-8 block text-sm sm:text-base"
            >
              Welcome to
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative mb-4"
            >
              <div className="flex justify-center gap-x-2 sm:gap-x-4 backdrop-blur-lg p-2 sm:p-4 rounded-xl">
                {titleWords.map((word, wordIndex) => (
                  <div key={wordIndex} className="overflow-hidden">
                    <motion.div
                      initial={{ y: 100 }}
                      animate={isInView ? { y: 0 } : { y: 100 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + wordIndex * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <span className="text-4xl sm:text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600/90 animate-gradient inline-block">
                        {word}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute -bottom-2 sm:-bottom-4 left-0 right-0 h-[2px] sm:h-1"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #D946EF, transparent)",
                  boxShadow: "0 0 20px rgba(217, 70, 239, 0.5)",
                }}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4 sm:mt-8 px-4"
            >
              Transform your digital presence with our premium marketing
              services
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-8 sm:w-12 h-8 sm:h-12 rounded-full border-2 border-white flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{
            x: backgroundTextX,
            opacity: backgroundTextOpacity,
          }}
          className="absolute bottom-20 sm:bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        >
          <div className="flex items-center gap-4 opacity-10">
            <span className=" text-6xl md:text-[12vw] font-bold text-white whitespace-nowrap">
              Our Services
            </span>
            <motion.span
              style={{ rotate: asteriskRotate }}
              className="text-[6vw] text-white"
            >
              ✱
            </motion.span>
            <span className="text-6xl md:text-[12vw] font-bold text-white whitespace-nowrap">
              Our Services
            </span>
            <motion.span
              style={{ rotate: asteriskRotate }}
              className="text-[6vw] text-white"
            >
              ✱
            </motion.span>
            <span className="text-6xl md:text-[12vw] font-bold text-white whitespace-nowrap">
              Our Services
            </span>
            <motion.span
              style={{ rotate: asteriskRotate }}
              className="text-[6vw] text-white"
            >
              ✱
            </motion.span>
          </div>
        </motion.div>
        <motion.div
          style={{
            x: backgroundTextXx,
            opacity: backgroundTextOpacity,
          }}
          className="absolute top-20 sm:top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        >
          <div className="flex items-center gap-4 opacity-10">
            <span className=" text-6xl md:text-[12vw] font-bold text-white whitespace-nowrap">
              Our Services
            </span>
            <motion.span
              style={{ rotate: asteriskRotate }}
              className="text-[6vw] text-white"
            >
              ✱
            </motion.span>
            <span className="text-6xl md:text-[12vw] font-bold text-white whitespace-nowrap">
              Our Services
            </span>
            <motion.span
              style={{ rotate: asteriskRotate }}
              className="text-[6vw] text-white"
            >
              ✱
            </motion.span>
            <span className="text-6xl md:text-[12vw] font-bold text-white whitespace-nowrap">
              Our Services
            </span>
            <motion.span
              style={{ rotate: asteriskRotate }}
              className="text-[6vw] text-white"
            >
              ✱
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          style={{ x }}
          className="absolute top-0 left-full h-screen w-screen flex items-center"
        >
          <div className="flex gap-4 sm:gap-8 px-4 sm:px-24">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
