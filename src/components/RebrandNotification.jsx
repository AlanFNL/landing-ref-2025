import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, ExternalLink } from "lucide-react";
import cavialogo from "../assets/cavialogo.jpg";

const RebrandNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation("global");

  // Handle client-side initialization to prevent SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log("RebrandNotification component mounted");

  useEffect(() => {
    // Only run this effect on the client side to prevent SSR hydration issues
    if (!isClient) return;

    // Check if user has already seen the notification
    const hasSeenNotification = localStorage.getItem("rebrandNotificationSeen");
    console.log(
      "Rebrand notification - hasSeenNotification:",
      hasSeenNotification
    );
    console.log("Rebrand notification - isDismissed:", isDismissed);

    if (!hasSeenNotification && !isDismissed) {
      console.log("Rebrand notification - showing notification");
      // Show notification after a short delay for better UX
      const timer = setTimeout(() => {
        console.log("Rebrand notification - setting isVisible to true");
        setIsVisible(true);
        // Prevent body scroll when modal is open
        if (typeof document !== "undefined") {
          document.body.style.overflow = "hidden";
        }
      }, 500); // Reduced delay for testing

      return () => clearTimeout(timer);
    } else {
      console.log(
        "Rebrand notification - not showing (already seen or dismissed)"
      );
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "visible";
      }
    };
  }, [isDismissed, isClient]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "visible";
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("rebrandNotificationSeen", "true");
    }
  };

  // Debug function to reset notification (temporary for testing)
  const resetNotification = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("rebrandNotificationSeen");
    }
    setIsDismissed(false);
    console.log("Rebrand notification reset");
  };

  // Make reset function available globally for testing
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.resetRebrandNotification = resetNotification;
    }

    // Cleanup function to remove global reference
    return () => {
      if (typeof window !== "undefined" && window.resetRebrandNotification) {
        delete window.resetRebrandNotification;
      }
    };
  }, []);

  const handleVisitNewSite = () => {
    if (typeof window !== "undefined") {
      window.open("https://cavia.agency", "_blank", "noopener,noreferrer");
    }
    handleDismiss();
  };

  const handleStayHere = () => {
    handleDismiss();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleDismiss();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleDismiss();
    }
  };

  useEffect(() => {
    if (isVisible && isClient && typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isVisible, isClient]);

  // Don't render anything on the server side to prevent hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at center, rgba(49, 86, 100, 0.1) 0%, rgba(49, 86, 100, 0.4) 70%, rgba(49, 86, 100, 0.6) 100%)`,
            backdropFilter: "blur(4px)", // Reduced for mobile performance
            WebkitBackdropFilter: "blur(4px)", // Reduced for mobile performance
          }}
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30, rotateX: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20, rotateX: 10 }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="relative mx-4 max-w-md rounded-2xl p-8"
            style={{
              background: `linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 50%, rgba(255, 255, 255, 0.95) 100%)`,
              backdropFilter: "blur(10px)", // Reduced for mobile performance
              WebkitBackdropFilter: "blur(10px)", // Reduced for mobile performance
              border: "1px solid rgba(214, 204, 188, 0.15)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 rounded-full p-2 transition-all duration-200 hover:scale-110"
              style={{
                color: "rgba(49, 86, 100, 0.5)",
                backgroundColor: "rgba(214, 204, 188, 0.08)",
                backdropFilter: "blur(6px)", // Reduced for mobile performance
                WebkitBackdropFilter: "blur(6px)", // Reduced for mobile performance
                border: "1px solid rgba(214, 204, 188, 0.1)",
              }}
              aria-label="Close notification"
            >
              <X size={20} />
            </button>

            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1],
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="mb-6 flex justify-center"
            >
              <div
                className="relative h-24 w-24 overflow-hidden rounded-xl shadow-lg"
                style={{
                  background: `radial-gradient(circle at 30% 30%, rgba(214, 204, 188, 0.4) 0%, rgba(214, 204, 188, 0.2) 50%, rgba(214, 204, 188, 0.1) 100%)`,
                  border: "2px solid rgba(49, 86, 100, 0.1)",
                }}
              >
                <img
                  src={cavialogo}
                  alt="Cavia Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="text-center"
            >
              <p
                className="mb-3 text-lg font-medium tracking-wide"
                style={{
                  color: "rgba(49, 86, 100, 0.75)",
                  fontSize: "0.875rem",
                }}
              >
                {t("rebrand.subtitle")}
              </p>
              <h2
                className="mb-4 text-2xl font-semibold tracking-tight"
                style={{
                  color: "#315664",
                  textShadow: "0 1px 2px rgba(49, 86, 100, 0.1)",
                }}
              >
                {t("rebrand.title")}
              </h2>

              <p
                className="mb-10 text-sm leading-relaxed"
                style={{
                  color: "rgba(49, 86, 100, 0.85)",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                }}
              >
                {t("rebrand.message")}
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(49, 86, 100, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVisitNewSite}
                  className="flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, #315664 0%, #4a6b7a 100%)`,
                    boxShadow: "0 4px 15px rgba(49, 86, 100, 0.2)",
                  }}
                >
                  {t("rebrand.visit_new_site")}
                  <ExternalLink size={16} />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 20px rgba(214, 204, 188, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStayHere}
                  className="rounded-full px-6 py-3 font-medium transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, #D6CCBC 0%, rgba(214, 204, 188, 0.9) 100%)`,
                    color: "#315664",
                    border: "1px solid rgba(49, 86, 100, 0.15)",
                    boxShadow: "0 2px 10px rgba(214, 204, 188, 0.2)",
                  }}
                >
                  {t("rebrand.stay_here")}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RebrandNotification;
