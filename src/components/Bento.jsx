import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  Users,
  MousePointerClick,
  BarChart3,
  Target,
} from "./icons";

// Create a loading fallback for icons
const IconFallback = () => (
  <div className="w-6 h-6 bg-purple-700/50 animate-pulse rounded" />
);

export default function Bento({ scrollToSection }) {
  const [t] = useTranslation("global");

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="min-h-fit w-[98%] mx-auto mb-4 rounded-xl bg-[url('./assets/bento-bg.webp')] bg-no-repeat bg-cover p-6 md:p-10">
      <Suspense fallback={<IconFallback />}>
        <div className="mx-auto max-w-7xl h-fit md:h-[calc(100vh-5rem)]">
          <motion.div
            className="flex flex-col md:grid h-full gap-4 md:gap-6"
            style={{
              gridTemplateAreas: `
              "header stats roi"
              "convert main clients"
              "convert main clients"
              "cta cta cta"
            `,
              gridTemplateColumns: "1fr 1.5fr 1fr",
              gridTemplateRows: "1fr 1fr 1fr auto",
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Header Card */}
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-purple-800/50 to-purple-900/50 p-6 backdrop-blur-xl border border-[#ffffff52]"
              style={{ gridArea: "header" }}
              variants={fadeInUp}
            >
              <div className="flex items-start justify-between">
                <TrendingUp className="text-purple-300 w-6 h-6" />
                <span className="text-xs text-purple-200/80">
                  {t("bento.ytd_growth")}
                </span>
              </div>
              <h3 className="text-4xl font-bold text-white mt-4">+8.9M</h3>
              <p className="text-purple-200/90 mt-2">
                {t("bento.total_impressions")}
              </p>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="rounded-3xl min-h-fit bg-gradient-to-br from-purple-800/50 to-purple-900/50 p-8 backdrop-blur-sm border border-[#ffffff52] flex flex-col justify-center items-center text-center"
              style={{ gridArea: "main" }}
              variants={fadeInUp}
            >
              <h1 className="text-lg md:text-xl lg:text-2xl xl:text-5xl font-bold text-white mb-6">
                {t("bento.heading")}
              </h1>
              <p className="md:text-sm lg:text-lg text-violet-200/90">
                {t("bento.subheading")}
              </p>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-purple-800/50 to-purple-900/50 p-6 backdrop-blur-sm border border-[#ffffff52]"
              style={{ gridArea: "stats" }}
              variants={fadeInUp}
            >
              <div className="flex items-start justify-between">
                <MousePointerClick className="text-fuchsia-300 w-6 h-6" />
                <span className="text-xs text-fuchsia-200/80">
                  {t("bento.engagement")}
                </span>
              </div>
              <h3 className="text-4xl font-bold text-white mt-4">193.3K</h3>
              <p className="text-fuchsia-200/90 mt-2">
                {t("bento.total_clicks")}
              </p>
            </motion.div>

            {/* ROI Card */}
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-purple-800/50 to-purple-900/50 p-6 backdrop-blur-sm border border-[#ffffff52]"
              style={{ gridArea: "roi" }}
              variants={fadeInUp}
            >
              <div className="flex items-start justify-between">
                <BarChart3 className="text-pink-300 w-6 h-6" />
                <span className="text-xs text-pink-200/80">
                  {t("bento.performance")}
                </span>
              </div>
              <h3 className="text-4xl font-bold text-white mt-4">312%</h3>
              <p className="text-pink-200/90 mt-2">{t("bento.average_roi")}</p>
            </motion.div>

            {/* Conversion Rate Card (2 rows) */}
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-purple-800/50 to-purple-900/50 p-6 backdrop-blur-sm border border-[#ffffff52] flex flex-col justify-between"
              style={{ gridArea: "convert" }}
              variants={fadeInUp}
            >
              <div className="flex items-start justify-between">
                <Target className="text-purple-300 w-6 h-6" />
                <span className="text-xs text-purple-200/80">
                  {t("bento.success_rate")}
                </span>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-white mt-4">+28%</h3>
                <p className="text-purple-200/90 mt-2">
                  {t("bento.conversion_rate")}
                </p>
              </div>
            </motion.div>

            {/* Active Clients Card (2 rows) */}
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-purple-800/50 to-purple-900/50 p-6 backdrop-blur-sm border border-[#ffffff52] flex flex-col justify-between"
              style={{ gridArea: "clients" }}
              variants={fadeInUp}
            >
              <div className="flex items-start justify-between">
                <Users className="text-violet-300 w-6 h-6" />
                <span className="text-xs text-violet-200/80">
                  {t("bento.growth")}
                </span>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-white mt-4">10+</h3>
                <p className="text-violet-200/90 mt-2">
                  {t("bento.track_record")}
                </p>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-purple-800/50 to-purple-900/50 p-6 backdrop-blur-sm border border-[#ffffff52]"
              style={{ gridArea: "cta" }}
              variants={fadeInUp}
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="text-violet-300 w-6 h-6" />
                  <span className="text-lg font-semibold text-white">
                    {t("bento.cta")}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ ease: "easeInOut" }}
                  onClick={() => scrollToSection("contact")}
                  className="px-4 py-2 mt-4 w-full md:mt-0 md:w-[35%] bg-white text-purple-800 border-[#ffffff52] border text-xl rounded-lg hover:shadow-2xs hover:shadow-[#f5e5ff] transition-shadow"
                >
                  {t("bento.cta_button")}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Suspense>
    </section>
  );
}
