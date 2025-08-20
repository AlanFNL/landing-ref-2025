import React, { forwardRef, useEffect, useRef } from "react";
import { Calendar, Sparkles, Zap, Users, Target, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";

const Contact = forwardRef((props, ref) => {
  const [t, i18n] = useTranslation("global");
  const contactRef = useRef(null);
  const { openCalendly = false, setOpenCalendly } = props;
  const isInView = useInView(contactRef, {
    margin: "100px 0px",
    once: false,
  });

  // Custom styles to override button text transparency

  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserLang = navigator.language;
      if (browserLang && browserLang.startsWith("es")) {
        i18n.changeLanguage("es");
      } else {
        i18n.changeLanguage("en");
      }
    }
  }, [i18n]);

  useEffect(() => {
    if (openCalendly) {
      // Find and click the Calendly button
      const calendlyButton = document.querySelector(
        '[data-url*="calendly.com"]'
      );
      if (calendlyButton) {
        calendlyButton.click();
        setOpenCalendly(false); // Reset the state
      }
    }
  }, [openCalendly, setOpenCalendly]);

  const glowVariants = {
    hidden: { width: "0%", left: "0%" },
    visible: {
      width: "100%",
      left: "0%",
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  const glowingLineStyle = {
    filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))",
    boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.6 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const benefitCards = [
    {
      icon: Shield,
      title: t("contact.benefits.free_consultation.title"),
      description: t("contact.benefits.free_consultation.description"),
    },
    {
      icon: Zap,
      title: t("contact.benefits.ai_powered.title"),
      description: t("contact.benefits.ai_powered.description"),
    },
    {
      icon: Target,
      title: t("contact.benefits.tailored.title"),
      description: t("contact.benefits.tailored.description"),
    },
    {
      icon: Users,
      title: t("contact.benefits.proven_track.title"),
      description: t("contact.benefits.proven_track.description"),
    },
  ];

  return (
    <motion.div
      className="w-[98vw] m-auto rounded-xl h-fit flex flex-col bg-gradient-to-bl from-purple-900/90 via-slate-900/95 items-center justify-center px-4 py-8 bg-black/60 relative overflow-hidden"
      initial={typeof window === "undefined" ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      ref={(node) => {
        contactRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
    >
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Single subtle gradient orb for performance */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/8 rounded-full blur-[80px]"
          animate={{
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Static grid pattern - no animation for performance */}
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

      <motion.div
        className="w-full max-w-4xl mx-auto text-center relative z-10"
        initial={typeof window === "undefined" ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          key="consultation"
          initial={
            typeof window === "undefined" ? false : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="relative inline-block">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight"
              variants={titleVariants}
              initial={typeof window === "undefined" ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: false }}
            >
              <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                {t("contact.title")}
              </span>
            </motion.h1>
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400"
              variants={glowVariants}
              initial={typeof window === "undefined" ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: false }}
              style={glowingLineStyle}
            />
          </div>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light"
            variants={descriptionVariants}
            initial={typeof window === "undefined" ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: false }}
          >
            {t("contact.subtitle")}
          </motion.p>
        </motion.div>

        {/* Benefit Cards Section - More Compact */}
        {typeof window === "undefined" ? (
          // Server: show static benefit cards for no-JS mode
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {benefitCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.title}
                  className="group relative rounded-2xl bg-black/30 p-5 backdrop-blur-sm border border-white/10 relative overflow-hidden h-full"
                >
                  {/* Static glow background */}
                  <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]" />

                  <div className="relative z-10">
                    <div className="mb-3 p-2 rounded-lg bg-black/30 backdrop-blur-sm w-fit">
                      <IconComponent className="text-white w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2">
                      {card.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Client: show animated benefit cards
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            {benefitCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.title}
                  custom={index}
                  variants={cardVariants}
                  className="group relative"
                >
                  <motion.div
                    className="rounded-2xl bg-black/30 p-5 backdrop-blur-sm border border-white/10 relative overflow-hidden h-full"
                    whileHover={{
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.25)",
                      scale: 1.01,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Simplified glow background */}
                    <motion.div
                      className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className="mb-3 p-2 rounded-lg bg-black/30 backdrop-blur-sm w-fit"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                      >
                        <IconComponent className="text-white w-5 h-5" />
                      </motion.div>

                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                        {card.title}
                      </h3>

                      <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>

      {typeof window === "undefined" ? (
        // Server: show static CTA button for no-JS mode
        <div className="flex justify-center items-center mt-8">
          <div className="group relative flex justify-center items-center">
            <a
              href="https://calendly.com/reforceinfinity-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="button font-medium transition-all text-base px-6 py-3"
              aria-label={t("about.cta")}
            >
              <div className="dots_border"></div>
              <div className="sparkle">
                <Sparkles className="w-5 h-5" style={{ color: "#9810fa" }} />
              </div>
              <span className="text_button font-medium text-base md:text-lg lg:text-xl">
                {t("about.cta")}
              </span>
            </a>
          </div>
        </div>
      ) : (
        // Client: show animated CTA button
        <motion.div
          className="flex justify-center items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group relative flex justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                window.open(
                  "https://calendly.com/reforceinfinity-info/30min",
                  "_blank"
                )
              }
              className="button font-medium transition-all text-base px-6 py-3"
              aria-label={t("about.cta")}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(
                    "https://calendly.com/reforceinfinity-info/30min",
                    "_blank"
                  );
                }
              }}
            >
              <div className="dots_border"></div>
              <div className="sparkle">
                <Sparkles className="w-5 h-5" style={{ color: "#9810fa" }} />
              </div>
              <span className="text_button font-medium text-base md:text-lg lg:text-xl">
                {t("about.cta")}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
});

export default Contact;
