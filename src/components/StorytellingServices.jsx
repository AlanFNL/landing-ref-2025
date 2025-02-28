import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Import Lottie animations
import stock1 from "../assets/1.lottie";
import stock2 from "../assets/2.lottie";
import stock3 from "../assets/5.lottie";
import stock4 from "../assets/4.lottie";
import stock5 from "../assets/3.lottie";

// Alternatively use GIFs if preferred
// import gif1 from "../assets/1.gif";
// import gif2 from "../assets/2.gif";
// import gif3 from "../assets/3.gif";
// import gif4 from "../assets/4.gif";
// import gif5 from "../assets/5.gif";

export const StorytellingServices = ({ scrollToSection }) => {
  const { t } = useTranslation("global");
  const containerRef = useRef(null);

  const services = [
    {
      id: "content-creation",
      title: t("service1.1"),
      description: t("service1.2"),
      animation: stock1,
      ctaText: t("service1.9"),
      color: "from-purple-600 to-pink-500",
      hue: "from-purple-600/30 to-transparent",
    },
    {
      id: "paid-media",
      title: "Paid Media Ads",
      description: t("service2.2"),
      animation: stock2,
      ctaText: t("service2.10"),
      color: "from-blue-600 to-purple-500",
      hue: "from-blue-600/30 to-transparent",
    },
    {
      id: "influencer",
      title: t("service5.1"),
      description: t("service5.2"),
      animation: stock4,
      ctaText: t("service5.3"),
      color: "from-pink-500 to-rose-400",
      hue: "from-pink-500/30 to-transparent",
    },
    {
      id: "web-design",
      title: t("service4.1"),
      description: t("service4.2"),
      animation: stock5,
      ctaText: t("service4.8"),
      color: "from-indigo-600 to-blue-400",
      hue: "from-indigo-600/30 to-transparent",
    },
  ];

  // Setup scroll progress for the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative bg-[url('./assets/services-bg3.webp')] bg-no-repeat bg-cover bg-fixed h-[530vh] overflow-hidden w-full mx-auto rounded-xl mb-4"
    >
      {/* No dark overlay - removed for cleaner design */}

      {/* Title Section */}
      <ServiceTitle scrollYProgress={scrollYProgress} />

      {/* Service Sections - One for each service */}
      {services.map((service, index) => (
        <ServiceStory
          key={service.id}
          service={service}
          index={index}
          totalServices={services.length}
          scrollYProgress={scrollYProgress}
          scrollToSection={scrollToSection}
        />
      ))}
    </div>
  );
};

// Component for the main services title section
const ServiceTitle = ({ scrollYProgress }) => {
  const { t } = useTranslation("global");
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false, amount: 0.5 });

  // Animations for the title section - more balanced timing
  const opacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]); // Slightly slower fade out
  const scale = useTransform(scrollYProgress, [0, 0.14], [1, 0.95]); // Smoother scale
  const titleWords = t("services_section.title").split(" ");

  // Add subtle floating animation to title
  const floatY = useTransform(scrollYProgress, [0, 0.1], [0, -10]); // More gradual movement

  return (
    <motion.div
      style={{ opacity, scale, y: floatY }}
      className="sticky top-0 h-screen flex items-center justify-center z-10"
    >
      <div
        ref={titleRef}
        className="text-center w-full max-w-6xl mx-auto px-4 z-10"
      >
        {/* Simpler decorative elements for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        ></motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white uppercase tracking-wider font-medium mb-6 block text-base relative z-10"
        >
          {t("services_section.welcome")}
        </motion.span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mb-4 z-10"
        >
          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-4 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10">
            {titleWords.map((word, wordIndex) => (
              <div key={wordIndex} className="overflow-hidden">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={
                    isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + wordIndex * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <span className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-sm inline-block">
                    {word}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #ffffff, transparent)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: "easeOut",
          }}
          className="text-gray-200 text-sm sm:text-base md:text-xl max-w-md md:max-w-2xl mx-auto font-bold mt-6 md:mt-8 px-4 relative z-10"
        >
          {t("services_section.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/50 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Component for each individual service story
const ServiceStory = ({
  service,
  index,
  totalServices,
  scrollYProgress,
  scrollToSection,
}) => {
  const serviceRef = useRef(null);
  const isInView = useInView(serviceRef, { once: false, amount: 0.3 }); // Lower threshold for mobile

  // Calculate the scroll range for this service
  // Each service takes up 1/5 of the scroll (minus the intro section)
  const scrollStart = 0.15 + index * (0.85 / totalServices);
  const scrollEnd = 0.15 + (index + 1) * (0.85 / totalServices);

  // Calculate the midpoint of this service's scroll section
  const scrollMid = (scrollStart + scrollEnd) / 2;

  // Calculate proportion for animation timing - balanced for better pacing
  const animProportion = (scrollEnd - scrollStart) * 0.32; // Balanced proportion (not too fast, not too slow)

  // Calculate specific timing points for more controlled animations
  const entryPoint = scrollStart + animProportion * 0.15; // Earlier entry point
  const fullVisibility = scrollStart + animProportion * 0.7; // More time before full visibility

  // Service visibility - appears slightly earlier and stays visible
  const opacity = useTransform(
    scrollYProgress,
    [scrollStart, entryPoint + animProportion * 0.2],
    [0, 1]
  );

  // Title animation - starts earlier but takes longer to fully appear
  const titleX = useTransform(
    scrollYProgress,
    [entryPoint, entryPoint + animProportion * 0.5],
    [-30, 0]
  );

  // Image animation - smoother scale up
  const imageScale = useTransform(
    scrollYProgress,
    [entryPoint, entryPoint + animProportion * 0.6],
    [0.95, 1]
  );

  const imageOpacity = useTransform(
    scrollYProgress,
    [entryPoint, entryPoint + animProportion * 0.6],
    [0.7, 1]
  );

  // Description appears after title animation is mostly complete
  const descriptionY = useTransform(
    scrollYProgress,
    [entryPoint + animProportion * 0.3, entryPoint + animProportion * 0.8],
    [15, 0]
  );

  const descriptionOpacity = useTransform(
    scrollYProgress,
    [entryPoint + animProportion * 0.3, entryPoint + animProportion * 0.8],
    [0, 1]
  );

  // CTA button appears last
  const ctaScale = useTransform(
    scrollYProgress,
    [entryPoint + animProportion * 0.5, fullVisibility],
    [0.9, 1]
  );

  const ctaOpacity = useTransform(
    scrollYProgress,
    [entryPoint + animProportion * 0.5, fullVisibility],
    [0, 1]
  );

  // Subtle background effect - more gradual appearance
  const bgOpacity = useTransform(
    scrollYProgress,
    [entryPoint, entryPoint + animProportion * 0.7],
    [0, 0.12]
  );

  return (
    <motion.div
      ref={serviceRef}
      style={{ opacity }}
      className="sticky top-0 h-screen w-full flex items-center justify-center z-10"
    >
      {/* Service-specific background gradient - very subtle */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className={`absolute inset-0 bg-gradient-radial ${service.hue} z-0`}
      />

      {/* Content container */}
      <div className="max-w-6xl mx-auto px-5 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-5 md:gap-16 z-10">
        {/* Left side - Animation - shows at bottom on mobile for better flow */}
        <motion.div
          style={{
            scale: imageScale,
            opacity: imageOpacity,
          }}
          className="w-full md:w-2/5 h-[180px] md:h-[350px] flex items-center justify-center relative perspective-1000 mt-3 md:mt-0"
        >
          {/* Animation background panel with glass effect */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl backdrop-blur-sm border border-white/10 overflow-hidden transform-style-3d">
            {/* Inner subtle glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-radial ${service.hue} opacity-20`}
            />

            {/* Subtle animated lines for a tech feel */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 6 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 1,
                  }}
                  className={`absolute h-px bg-gradient-to-r ${service.color} w-full`}
                  style={{
                    top: `${30 + i * 40}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* The actual animation */}
          <DotLottieReact
            src={service.animation}
            loop
            autoplay
            className="w-full h-full object-contain transform scale-110 p-4 md:p-6 relative z-10"
          />
        </motion.div>

        {/* Right side - Text content - shows at top on mobile */}
        <div className="w-full md:w-3/5 text-left z-10">
          <motion.h2
            style={{ x: titleX }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-5 tracking-tight text-white"
          >
            {service.title}
          </motion.h2>

          <motion.div
            style={{ y: descriptionY, opacity: descriptionOpacity }}
            className="mb-4 md:mb-8 backdrop-blur-sm rounded-xl p-3 md:p-7 border border-white/10"
          >
            <p className="text-xs sm:text-sm md:text-lg text-gray-100 leading-relaxed">
              {service.description}
            </p>
          </motion.div>

          <motion.div
            style={{ scale: ctaScale, opacity: ctaOpacity }}
            className="origin-left"
          >
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-gray-900 font-bold hover:bg-gray-100 border-white/20 border transition-all duration-300 px-5 md:px-8 py-2 md:py-3 rounded-full tracking-wide text-xs sm:text-sm md:text-base"
              aria-label={`${service.ctaText} for ${service.title}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && scrollToSection("contact")}
            >
              {service.ctaText}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(totalServices)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-white scale-110" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};
