import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [t] = useTranslation("global");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 h-fit pt-4 pb-20">
      <motion.div
        initial={{ opacity: 0, width: "40%" }}
        whileInView={{ opacity: 1, width: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute h-full max-w-4xl bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(circle at center 0%, black, transparent 70%)",
        }}
      />

      <motion.div className="text-center mb-16">
        <h2 className="text-4xl text-white font-bold mb-4 pt-16">
          {t("faq.title")}
        </h2>
        <p className="text-slate-400">{t("faq.subtitle")}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="space-y-4"
        viewport={{ once: true }}
      >
        {t("faq.items", { returnObjects: true }).map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border border-slate-800 rounded-lg overflow-hidden"
          >
            <motion.button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-xl text-white font-medium">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-purple-500"
              >
                ▼
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-800"
                >
                  <p className="p-6 text-slate-400">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default FAQ;
