import React, { forwardRef, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  logo6,
  logo4,
  logo3,
  logo5,
  logo7,
  logo11,
  logo9,
  logo10,
  logo8,
  logo12,
];

const BrandCarousel = forwardRef(({ clientsRef }, ref) => {
  const isServer = typeof window === "undefined";
  const [t, i18n] = useTranslation("global");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.3,
    margin: "100px",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserLang = navigator.language;
      i18n.changeLanguage(browserLang.startsWith("es") ? "es" : "en");
    }
  }, [i18n]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-16"
      ref={containerRef}
      id="carousel-section"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/8 rounded-full blur-[100px]"
          animate={{
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Static grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("services.7")}
          </motion.h2>
          <motion.div
            className="w-24 h-[2px] bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 mx-auto"
            initial={{ width: "0%" }}
            whileInView={{ width: "24" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Premium Partners Grid */}
        {isServer ? (
          // Server: show brand names as text for no-JS mode
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Uala",
              "pepsico",
              "unaje",
              "g20 young entrepreneurs alliance",
              "fuseai",
              "youshift",
              "hkstp partner",
              "the sandbox",
              "hrztl",
              "fije",
              "give&get",
              "charles taylor",
              "millenium group",
            ].map((name) => (
              <div
                key={name}
                className="text-center text-white/90 bg-black/30 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm"
              >
                {name}
              </div>
            ))}
          </div>
        ) : (
          // Client: show animated logo grid
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {logos.map((logo, index) => {
              // Identify wide logos that need object-contain to avoid cutoff
              const wideLogoIndexes = [1, 2, 5, 6, 8, 9, 10, 11]; // MileniumC, PEPSICO, HRZTL., ualá, give&get, Charles Taylor, Charles Taylor InsureTech
              const isWideLogo = wideLogoIndexes.includes(index);

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                >
                  <motion.div
                    className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-3 md:p-4 h-20 md:h-24 flex items-center justify-center overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.15)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Subtle glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    {/* Logo Container with Adaptive Object-Fit */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-1 md:p-0">
                      <img
                        loading="lazy"
                        src={logo}
                        alt={`partner-logo-${index}`}
                        className="w-full h-full brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: isWideLogo ? "contain" : "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
});

export default BrandCarousel;
