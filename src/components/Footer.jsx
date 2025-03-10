import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../assets/reflogo.webp";
// Import lazy loaded icons
import { Linkedin, Instagram, Send, Calendar } from "./icons";

// Create a loading fallback for icons
const IconFallback = () => (
  <div className="w-6 h-6 bg-slate-700 animate-pulse rounded" />
);

function Footer({ scrollToSection }) {
  const [t] = useTranslation("global");

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 },
  };

  const navItems = [
    { key: "about", section: "aboutUs" },
    { key: "services", section: "services" },
    { key: "clients", section: "clients" },
  ];

  const handleContactClick = (type) => {
    if (type === "consultation") {
      scrollToSection("contact", "options", true); // Will open Calendly after delay
    } else if (type === "message") {
      scrollToSection("contact", "form", false); // Will open form after delay
    }
  };

  return (
    <footer className="w-[98vw] rounded-xl mx-auto mt-8 mb-8 pt-12 pb-8 px-8 bg-gradient-to-br from-purple-900 via-slate-900 to-black z-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Logo and Description */}
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.6 }}
          className="col-span-1 lg:col-span-1"
        >
          <img
            src={logo}
            alt="Reforce Infinity"
            className="h-16 md:h-32 mb-4"
          />
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.6 }}
          className="col-span-1 lg:col-span-1"
        >
          <h3 className="text-white font-semibold mb-4">
            {t("footer.quick_links")}
          </h3>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => scrollToSection(item.section)}
                className="text-slate-400 hover:text-white transition-colors w-fit"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t(`footer.nav_items.${item.key}`)}
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.3 }}
          className="col-span-1 lg:col-span-2"
        >
          <h3 className="text-white font-semibold mb-4">
            {t("footer.get_in_touch")}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={() =>
                window.open(
                  "https://calendly.com/reforce/web3-marketing-call",
                  "_blank"
                )
              }
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg hover:shadow-purple-500/25 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-4 h-4" />
              {t("footer.schedule_consultation")}
            </motion.button>
            <motion.button
              onClick={() => handleContactClick("message")}
              className="flex items-center gap-2 px-6 py-3 border border-[#ffffff52] bg-white text-purple-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              {t("footer.send_message")}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800"
      >
        <p className="text-slate-400 text-sm">{t("footer.copyright")}</p>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">{t("footer.follow_us")}</span>
          <Suspense fallback={<IconFallback />}>
            <motion.a
              href="https://uk.linkedin.com/company/reforce-infinity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          </Suspense>
          <Suspense fallback={<IconFallback />}>
            <motion.a
              href="https://www.instagram.com/reforce_infinity/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </motion.a>
          </Suspense>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
