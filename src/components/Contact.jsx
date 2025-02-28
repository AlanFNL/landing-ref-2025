import React, { forwardRef, useEffect, useState, useRef } from "react";

import { ArrowRight, CheckCircle } from "lucide-react";

import { useTranslation } from "react-i18next";
import { PopupButton } from "react-calendly";
import { motion, useInView, AnimatePresence } from "framer-motion";

const Contact = forwardRef((props, ref) => {
  const [t, i18n] = useTranslation("global");
  const contactRef = useRef(null);
  const {
    initialView = "options",
    openCalendly = false,
    setOpenCalendly,
  } = props;
  const isInView = useInView(contactRef, {
    margin: "100px 0px",
    once: false,
  });

  useEffect(() => {
    const browserLang = navigator.language;
    if (browserLang.startsWith("es")) {
      i18n.changeLanguage("es");
    } else {
      i18n.changeLanguage("en");
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

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(initialView === "form");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("https://testserverrenderrfce.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormStatus(data.message);
        setIsSubmitting(false);
        setFormData({ email: "", name: "", message: "" });
        setTimeout(() => {
          setFormStatus("");
        }, 2500);
      })
      .catch((error) => {
        console.error("Error:", error);
        setFormStatus("Failed to send email");
        setIsSubmitting(false);
        setTimeout(() => {
          setFormStatus("");
        }, 2000);
      });
  };

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
      initial={{ opacity: 0 }}
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -40,
                transition: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="relative inline-block">
                <motion.h1
                  className="text-5xl font-bold text-white mb-2"
                  variants={titleVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  {t("contact.title")}
                </motion.h1>
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-purple-300 to-purple-500"
                  variants={glowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  style={glowingLineStyle}
                />
              </div>

              <motion.p
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                variants={descriptionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {t("contact.subtitle")}
              </motion.p>

              <motion.div
                className="flex flex-col md:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group flex justify-center items-center"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500" />

                  <PopupButton
                    className="relative flex w-[80vw] md:w-fit items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-all shadow-lg hover:shadow-purple-500/25"
                    text={t("contact.schedule_button")}
                    url="https://calendly.com/reforce/reforce-discovery-call"
                    rootElement={document.getElementById("root")}
                  >
                    {t("contact.schedule_button")}
                  </PopupButton>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowForm(true)}
                  className="group relative w-[80vw] md:w-fit flex items-center gap-3 px-8 py-4 bg-white text-purple-800  backdrop-blur-sm rounded-xl  font-medium transition-all border border-white/20"
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  {t("contact.message_button")}
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
                transition: { duration: 0.3 },
              }}
              className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-purple-400/5 to-transparent"
                initial={{ opacity: 0, y: "100%" }}
                animate={{
                  opacity: 1,
                  y: "0%",
                  transition: { duration: 0.8 },
                }}
              />

              <motion.button
                onClick={() => setShowForm(false)}
                className="relative z-10 mb-6 text-white/60 hover:text-white transition-colors flex items-center gap-2"
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                {t("contact.back")}
              </motion.button>

              <motion.div
                className="relative z-10 space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  {t("contact.form.title")}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    {
                      name: "email",
                      type: "email",
                      placeholder: t("contact.form.email"),
                    },
                    {
                      name: "name",
                      type: "text",
                      placeholder: t("contact.form.name"),
                    },
                    {
                      name: "message",
                      type: "textarea",
                      placeholder: t("contact.form.message"),
                      className: "min-h-[150px]",
                    },
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          },
                        },
                      }}
                    >
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          placeholder={field.placeholder}
                          required
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={`w-full p-4 bg-black/20 rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                            field.className || ""
                          }`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          required
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="w-full p-4 bg-black/20 rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                      )}
                    </motion.div>
                  ))}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-all"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : formStatus === "Email sent successfully" ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <>
                        {t("contact.form.send")}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Contact;
