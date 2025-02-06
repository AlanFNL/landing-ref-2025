import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import testimonials1 from "../assets/testimonials1.webp";
import testimonials2 from "../assets/testimonials2.webp";
import { useTranslation } from "react-i18next";

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [t] = useTranslation("global");

  const testimonials = [
    {
      name: "Julián Losardo",
      role: "CEO",
      company: "Unaje",
      content: t("testimonials.1"),
      image: testimonials1,
    },
    {
      name: "Sebastián Otárola",
      role: "CMO",
      company: "Mosaikus",
      content: t("testimonials.2"),
      image: testimonials2,
    },
  ];

  useEffect(() => {
    if (!isInView) return; // Don't start timer if not in view

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isInView, testimonials.length]); // Add isInView to dependencies

  return (
    <div ref={ref} className="relative overflow-hidden pb-32">
      <motion.div
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute h-full w-[100%] bg-gradient-to-b from-purple-500/30 via-transparent to-transparent blur-3xl select-none pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(circle at center 0%, black, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white pt-16">
            {t("testimonials.title")}
          </h2>
          <p className="text-slate-400">{t("testimonials.subtitle")}</p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto min-h-64"
            >
              {/* Image */}
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full rounded-full object-cover border-4 border-purple-500/20 filter grayscale"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-xl text-slate-200 mb-6">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                <div>
                  <cite className="not-italic">
                    <span className="block text-purple-500 font-semibold">
                      {testimonials[currentIndex].name}
                    </span>
                    <span className="text-slate-400">
                      {testimonials[currentIndex].role}{" "}
                      {t("testimonials.role_at")}{" "}
                      {testimonials[currentIndex].company}
                    </span>
                  </cite>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "bg-purple-500 w-6"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
