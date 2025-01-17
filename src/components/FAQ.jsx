import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "./icons";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: "How can emerging technologies improve our marketing strategy?",
      answer:
        "We integrate cutting-edge technologies like AI, blockchain, and AR/VR into your marketing strategy to create unique, engaging experiences. Our solutions help you stand out in the digital space while driving measurable results through innovative campaigns and enhanced customer interactions.",
    },
    {
      question: "What sets your digital marketing services apart?",
      answer:
        "Our unique blend of traditional digital marketing expertise and advanced technological integration sets us apart. We specialize in creating comprehensive strategies that combine content creation, paid media, and emerging technologies to deliver measurable business growth and innovative market positioning.",
    },
    {
      question: "How do you measure campaign success?",
      answer:
        "We implement robust analytics and tracking systems to measure key performance indicators (KPIs) across all campaigns. From impression tracking to conversion rates and ROI analysis, we provide transparent reporting and data-driven insights to demonstrate the impact of our strategies on your business goals.",
    },
  ];

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
    <div className="max-w-4xl mx-auto px-4 h-fit pb-20 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl text-white font-bold mb-4 pt-16">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400">
          Everything you need to know about our platform
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="space-y-4"
      >
        {faqItems.map((item, index) => (
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-16 space-y-6"
      ></motion.div>
    </div>
  );
}

export default FAQ;
