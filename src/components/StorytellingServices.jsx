import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";

export const StorytellingServices = ({ scrollToSection }) => {
  const { t } = useTranslation("global");
  const containerRef = useRef(null);
  const servicesListRef = useRef(null);
  const [transformDistance, setTransformDistance] = useState(-600);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create a spring-based scroll value for smooth animation
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 55,
    mass: 0.1,
  });

  // Calculate the actual transform distance needed based on list height
  useEffect(() => {
    if (servicesListRef.current) {
      const listHeight = servicesListRef.current.scrollHeight;
      const containerHeight = containerRef.current.clientHeight;
      // Calculate how much we need to move the list up to show the last item
      // Subtract container height to account for viewport
      const calculatedDistance = -(listHeight - containerHeight + 100); // Added extra padding
      setTransformDistance(calculatedDistance);
    }
  }, []);

  // Transform scroll value to list position with dynamic distance
  const listY = useTransform(smoothScroll, [0, 1], [0, transformDistance]);

  const services = [
    "Landing Pages",
    "Web Design",
    "Product Design",
    "Motion Graphics",
    "Development",
    "Pitch Decks",
    "Site Migration",
    "Social Media",
    "Design Systems",
    "Logos",
    "UI/UX Design",
    "Copywriting",
    "Brand Guides",
    "Ads Campaigns",
    "KOL",
  ];

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-[#0A0A0A] to-transparent text-white"
      ref={containerRef}
    >
      {/* Left side content */}
      <div className="w-full md:w-1/2 flex flex-col justify-start md:justify-center p-8 md:p-16 sticky top-0 md:h-screen bg-[#0A0A0A] md:bg-transparent h-fit z-[11]">
        <motion.div
          initial={
            typeof window === "undefined" ? false : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl mt-16 md:mt-0"
        >
          <h2 className="text-sm md:text-base uppercase tracking-wide text-white/70 mb-4">
            REFORCE INFINITY
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
            {t("services_section.title", "Complete Marketing Services")}
          </h2>

          <p className="text-2xl md:text-4xl text-white font-bold">
            {t(
              "services_section.description",
              "Swift. Strategic. Successful.s"
            )}
          </p>
        </motion.div>
      </div>{" "}
      {/* Right side with scrolling services */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 relative min-h-fit md:min-h-screen">
        {/* Top fade gradient */}
        <div className="absolute top-0 left-0 right-0 h-40 z-10 pointer-events-none"></div>

        {/* Services list container */}
        <motion.div
          ref={servicesListRef}
          className="flex flex-col items-start justify-start gap-10 py-20"
          style={{ y: listY }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-6"
              initial={
                typeof window === "undefined"
                  ? { opacity: 1 }
                  : { opacity: 0.3 }
              }
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-150px 0px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center shadow-lg shadow-purple-700/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
                {service}
              </h3>
            </motion.div>
          ))}
          {/* Add invisible spacer element to ensure proper scrolling to the end */}
          <div className="h-screen md:h-1/2 invisible"></div>
        </motion.div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default StorytellingServices;
