import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  Users,
  MousePointerClick,
  BarChart3,
  Target,
  ChevronRight,
  Rocket,
} from "./icons";
import { Sparkles } from "lucide-react";

// Create a loading fallback for icons
const IconFallback = () => (
  <div className="w-6 h-6 bg-purple-700/50 animate-pulse rounded" />
);

// Optimized grid background pattern component
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-purple-400/10 to-transparent will-change-[opacity]"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.4,
            }}
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-400/10 to-transparent will-change-[opacity]"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.4,
            }}
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>
    </div>
  );
};

// Counting number animation component
const CountingNumber = ({ value, suffix = "", prefix = "", duration = 2 }) => {
  const [isClient, setIsClient] = useState(false);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Parse the numeric part only
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    if (!isInView) return;

    let startValue = 0;
    const endValue = numericValue;
    const steps = 40;
    const stepDuration = (duration * 1000) / steps;
    const increment = (endValue - startValue) / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      // Ease out curve for smoother ending
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + (endValue - startValue) * easedProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(endValue);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, numericValue, duration]);

  if (!isClient) {
    const serverFormatted = Number(numericValue).toLocaleString("en-US", {
      minimumFractionDigits: value.includes(".") ? 1 : 0,
      maximumFractionDigits: value.includes(".") ? 1 : 0,
    });
    return (
      <span ref={nodeRef} className="inline-flex items-baseline">
        {prefix}
        {serverFormatted}
        {suffix}
      </span>
    );
  }

  const formattedValue = displayValue.toLocaleString("en-US", {
    minimumFractionDigits: value.includes(".") ? 1 : 0,
    maximumFractionDigits: value.includes(".") ? 1 : 0,
  });

  return (
    <span ref={nodeRef} className="inline-flex items-baseline">
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, subtitle, delay = 0 }) => {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const opacity = useSpring(0, { stiffness: 60, damping: 20 });

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Extract prefix/suffix from value
  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.endsWith("%")
    ? "%"
    : value.endsWith("K")
    ? "K"
    : value.endsWith("M")
    ? "M"
    : value.endsWith("+")
    ? "+"
    : "";
  const numericValue = value.replace(/[^0-9.]/g, "");

  useEffect(() => {
    if (isInView) {
      opacity.set(1);
    }
  }, [isInView, opacity]);

  return (
    <motion.div
      ref={ref}
      className="rounded-3xl bg-black/50 p-5 backdrop-blur-sm border border-white/10 flex flex-col justify-between relative overflow-hidden group h-full"
      initial={!isClient ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        boxShadow: "0 0 20px rgba(168, 85, 247, 0.15)",
        borderColor: "rgba(255, 255, 255, 0.2)",
      }}
    >
      <motion.div
        className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
        initial={!isClient ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay + 0.2 }}
      />

      <div className="flex items-start justify-between">
        <motion.div
          initial={!isClient ? false : { scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          className="p-2 rounded-lg bg-black/30 backdrop-blur-sm"
        >
          <Icon className="text-purple-300 w-5 h-5" />
        </motion.div>
        <span className="text-xs text-gray-400">{title}</span>
      </div>

      <div>
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-white mt-4 flex items-baseline"
          style={!isClient ? { opacity: 1 } : { opacity }}
        >
          {value === "10+" ? (
            "10+"
          ) : (
            <CountingNumber
              value={numericValue}
              prefix={prefix}
              suffix={suffix}
            />
          )}
        </motion.h3>
        <p className="text-gray-400 mt-2 text-xl group-hover:text-gray-300 transition-colors">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export default function Bento({ scrollToSection }) {
  const [t] = useTranslation("global");
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  const mainCardRef = useRef(null);
  const isMainCardInView = useInView(mainCardRef, { once: true, amount: 0.3 });

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="min-h-fit w-full mx-auto py-20 relative bg-[#0A0A0A] overflow-hidden"
    >
      {/* Grid Background with subtle purple glow */}
      <GridBackground />

      {/* Purple Gradient Glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-64 bg-purple-500/20 rounded-full blur-[100px] will-change-transform"
        style={{
          y: backgroundY,
          scale: backgroundScale,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={!isClient ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        ></motion.div>

        <div className="grid gap-6">
          {/* Main Feature Card */}
          <motion.div
            ref={mainCardRef}
            className="rounded-3xl bg-black/50 p-8 md:p-10 backdrop-blur-md border border-white/10 relative overflow-hidden"
            initial={!isClient ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <motion.div
              className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />

            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
              <div className="flex-1">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 p-3 rounded-xl bg-black/40 backdrop-blur-sm w-fit"
                >
                  <TrendingUp className="text-purple-400 w-7 h-7" />
                </motion.div>
                <motion.h3
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={!isClient ? false : { opacity: 0, y: 20 }}
                  animate={isMainCardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {t("bento.heading") ||
                    "We've helped our clients reach millions of new customers"}
                </motion.h3>
                <motion.p
                  className="text-gray-400 md:text-lg"
                  initial={!isClient ? false : { opacity: 0 }}
                  animate={isMainCardInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {t("bento.subheading") ||
                    "Building brand awareness through strategic digital marketing campaigns."}
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col justify-center items-center text-center  rounded-2xl p-6 "
                initial={
                  typeof window === "undefined" ? false : { opacity: 0, x: 20 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="text-xl text-gray-400 mb-3">
                  {t("bento.ytd_growth") || "YTD Growth"}
                </h4>
                <div className="relative">
                  <motion.div
                    className="text-6xl md:text-7xl font-bold text-white flex items-baseline"
                    transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
                  >
                    +<CountingNumber value="17" />
                    <span className="text-4xl md:text-5xl ml-1">M</span>
                  </motion.div>
                </div>
                <p className="text-gray-500 mt-2 text-xl">
                  {t("bento.total_impressions") || "Total Impressions"}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Stat Cards - Row of 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={MousePointerClick}
              title={t("bento.engagement") || "ENGAGEMENT"}
              value="380.4K"
              subtitle={t("bento.total_clicks") || "Total Clicks"}
              delay={0.3}
            />

            <StatCard
              icon={BarChart3}
              title={t("bento.performance") || "PERFORMANCE"}
              value="312%"
              subtitle={t("bento.average_roi") || "Average ROI"}
              delay={0.4}
            />

            <StatCard
              icon={Target}
              title={t("bento.success_rate") || "SUCCESS RATE"}
              value="+29%"
              subtitle={t("bento.conversion_rate") || "Conversion Rate"}
              delay={0.5}
            />

            <StatCard
              icon={Users}
              title={t("bento.growth") || "GROWTH"}
              value="30+"
              subtitle={t("bento.track_record") || "Track Record"}
              delay={0.6}
            />
          </div>

          {/* CTA Card */}
          <motion.div
            className="rounded-3xl bg-black/50 p-8 backdrop-blur-sm border border-white/10 relative overflow-hidden"
            initial={
              typeof window === "undefined" ? false : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <motion.div
              className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
              initial={typeof window === "undefined" ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={
                    typeof window === "undefined" ? false : { opacity: 0 }
                  }
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="p-3 rounded-xl bg-black/40 backdrop-blur-sm"
                >
                  <Rocket className="text-purple-400 w-6 h-6" />
                </motion.div>
                <span className="text-lg md:text-xl font-semibold text-white">
                  {t("bento.cta") || "Ready to Elevate Your Digital Presence?"}
                </span>
              </div>

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
                  className="button font-medium transition-all !px-8 !py-3 w-fit whitespace-nowrap"
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
                    <Sparkles
                      className="w-5 h-5"
                      style={{ color: "#9810fa" }}
                    />
                  </div>
                  <span className="text_button font-medium">
                    {t("navbar.5")}
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
