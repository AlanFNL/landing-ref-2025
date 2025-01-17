import React, { Suspense } from "react";
import { motion } from "framer-motion";
import logo from "../assets/reflogo.webp";
// Import lazy loaded icons
import { Linkedin, Instagram, Send, Calendar } from "./icons";

// Create a loading fallback for icons
const IconFallback = () => (
  <div className="w-6 h-6 bg-slate-700 animate-pulse rounded" />
);

function Footer() {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 },
  };

  const navItems = ["About Us", "Services", "Clients"];

  return (
    <footer className="w-[98vw] rounded-xl mx-auto mt-8 mb-8 pt-12 pb-8 px-8 bg-gradient-to-br from-purple-900 via-slate-900 to-black z-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Logo and Description */}
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={fadeInUp}
          viewport={{ once: false, amount: 0.6 }}
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
          viewport={{ once: false, amount: 0.6 }}
          className="col-span-1 lg:col-span-1"
        >
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-slate-400 hover:text-white transition-colors w-fit"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={fadeInUp}
          viewport={{ once: false, amount: 0.3 }}
          className="col-span-1 lg:col-span-2"
        >
          <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#schedule"
              className="flex items-center gap-2 px-6 py-3  bg-purple-600 hover:bg-purple-700 text-white rounded-lg  shadow-lg hover:shadow-purple-500/25 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-4 h-4" />
              Schedule free consultation
            </motion.a>
            <motion.a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 border border-[#ffffff52] bg-[#ffffff5e]   text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              Send us a message
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800"
      >
        <p className="text-slate-400 text-sm">
          © Reforce Infinity 2025 All rights reserved
        </p>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Follow us on</span>
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
