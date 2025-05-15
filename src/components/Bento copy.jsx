import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TrendingUp, Users, BarChart3, Target } from "./icons";
import { Award, Calendar } from "lucide-react";

// Create a loading fallback for icons
const IconFallback = () => (
  <div className="w-8 h-8 bg-purple-700/50 animate-pulse rounded" />
);

export default function Bento({ scrollToSection }) {
  const [t] = useTranslation("global");

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeInOut" },
  };

  // Data for the four statistics cards
  const statsCardsData = [
    {
      icon: <Users className="w-8 h-8 text-fuchsia-300 mb-4" />,
      titleKey: "bento.engagement",
      value: "193.3K",
      subtitleKey: "bento.total_clicks",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-pink-300 mb-4" />,
      titleKey: "bento.performance",
      value: "312%",
      subtitleKey: "bento.average_roi",
    },
    {
      icon: <Target className="w-8 h-8 text-purple-300 mb-4" />,
      titleKey: "bento.success_rate",
      value: "+28%",
      subtitleKey: "bento.conversion_rate",
    },
    {
      icon: <Award className="w-8 h-8 text-violet-300 mb-4" />,
      titleKey: "bento.growth",
      value: "10+",
      subtitleKey: "bento.track_record",
    },
  ];

  return (
    <section className="min-h-fit w-[98%] mx-auto my-10 rounded-3xl bg-[url('./assets/bento-bg.webp')] bg-no-repeat bg-cover p-6 md:p-10 lg:p-16">
      <Suspense
        fallback={
          <div className="h-screen w-full flex justify-center items-center">
            <IconFallback />
          </div>
        }
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ animate: { transition: { staggerChildren: 0.2 } } }}
          className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-12"
        >
          {/* Section Header */}
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            {t("bento.section_header_new", "Our Proven Impact")}
          </motion.h2>

          {/* Top Row: YTD Growth + Descriptive Text */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start"
          >
            {/* Left Part (YTD Growth) - Spans 2 columns */}
            <div className="md:col-span-2 p-6 py-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-7 h-7 text-purple-300" />
                <span className="text-xs font-medium text-purple-200/80 uppercase tracking-wider">
                  {t("bento.ytd_growth")}
                </span>
              </div>
              <p className="text-5xl lg:text-6xl font-bold text-white mt-2 mb-1">
                +8.9M
              </p>
              <p className="text-base text-purple-200/90">
                {t("bento.total_impressions")}
              </p>
            </div>

            {/* Right Part (Descriptive Text) - Spans 3 columns */}
            <div className="md:col-span-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl h-full flex flex-col justify-center">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                {t(
                  "bento.intro_paragraph_new",
                  "We've helped our clients reach millions of new customers, building brand awareness through strategic digital marketing campaigns that deliver measurable results."
                )}
              </p>
            </div>
          </motion.div>

          {/* Middle Row: Four Stats Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {statsCardsData.map((card, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col items-start text-left h-full"
              >
                {card.icon}
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t(card.titleKey)}
                </h3>
                <p className="text-4xl md:text-5xl font-bold text-white mb-1">
                  {card.value}
                </p>
                <p className="text-sm text-gray-300">{t(card.subtitleKey)}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Row: CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center py-10 md:py-12 px-6 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              {t(
                "bento.cta_ready_title_new",
                "Ready to Elevate Your Digital Presence?"
              )}
            </h3>
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 0px 25px rgba(192, 132, 252, 0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="px-8 py-3 md:px-10 md:py-4 bg-purple-600 text-white font-semibold rounded-xl text-base md:text-lg shadow-lg hover:bg-purple-700 transition-colors duration-300 inline-flex items-center gap-3 group"
              onClick={() => scrollToSection("contact")}
              aria-label={t("bento.cta_button", "Schedule a free consultation")}
            >
              <Calendar className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-6" />
              <span>{t("bento.cta_button")}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </Suspense>
    </section>
  );
}
