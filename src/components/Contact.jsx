import React, { forwardRef, useEffect, useRef } from "react";
import { Calendar, Sparkles } from "lucide-react";
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

  return (
    <motion.div
      className="w-[98vw] m-auto rounded-xl min-h-screen flex flex-col bg-gradient-to-bl from-purple-900/90 via-slate-900/95 items-center justify-center px-4 py-16 bg-black/60"
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
      <motion.div
        className="w-full max-w-3xl mx-auto text-center"
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
          className="space-y-8"
        >
          <div className="relative inline-block">
            <motion.h1
              className="text-5xl font-bold text-white mb-2"
              variants={titleVariants}
              initial={typeof window === "undefined" ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: false }}
            >
              {t("contact.title")}
            </motion.h1>
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-purple-300 to-purple-500"
              variants={glowVariants}
              initial={typeof window === "undefined" ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: false }}
              style={glowingLineStyle}
            />
          </div>

          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            variants={descriptionVariants}
            initial={typeof window === "undefined" ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: false }}
          >
            {t("contact.subtitle")}
          </motion.p>

          <motion.div
            className="flex justify-center items-center"
            initial={
              typeof window === "undefined" ? false : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group flex justify-center items-center"
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
                className="group relative w-[80vw] md:w-fit flex items-center gap-3 px-8 py-4 button font-medium transition-all "
                aria-label="Schedule a free consultation"
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

                <span className="text_button font-medium">
                  {t("footer.schedule_consultation")}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

export default Contact;
