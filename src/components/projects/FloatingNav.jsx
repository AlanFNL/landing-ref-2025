import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Portal from "../shared/Portal";

const FloatingNav = ({ sections, activeSection }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset for header
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Content to render in portal
  const navContent = (
    <motion.div
      className={`
        z-50 flex backdrop-blur-md
        ${
          isMobile
            ? "fixed left-1/2 bottom-6 -translate-x-1/2 flex-row items-center gap-3 bg-gray-900/90 p-3 rounded-full"
            : "fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6"
        }
      `}
      initial={{ opacity: 0, [isMobile ? "y" : "x"]: isMobile ? 20 : 20 }}
      animate={{ opacity: 1, [isMobile ? "y" : "x"]: 0 }}
      transition={{ delay: 0.5 }}
    >
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => handleClick(e, section.id)}
          className="group relative flex items-center"
          aria-label={`Navigate to ${section.label} section`}
        >
          {/* Desktop version with hoverable label */}
          {!isMobile && (
            <div className="relative flex items-center">
              {/* Label that appears on hover */}
              <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === section.id
                      ? "text-purple-300"
                      : "text-gray-500 group-hover:text-gray-300"
                  }`}
                >
                  {section.label}
                </span>
              </div>

              {/* Number indicator */}
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 
                ${
                  activeSection === section.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                    : "bg-gray-800/80 text-gray-400 group-hover:bg-gray-700 group-hover:text-gray-300"
                }`}
              >
                <span className="font-bold">{index + 1}</span>
              </div>
            </div>
          )}

          {/* Mobile version - just numbers */}
          {isMobile && (
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 
              ${
                activeSection === section.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                  : "bg-gray-800/80 text-gray-400 group-hover:bg-gray-700 group-hover:text-gray-300"
              }`}
            >
              <span className="font-bold text-xs">{index + 1}</span>
            </div>
          )}
        </a>
      ))}
    </motion.div>
  );

  // Render with portal
  return <Portal rootId="floating-nav-portal">{navContent}</Portal>;
};

export default FloatingNav;
