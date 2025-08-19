import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/reflogo.webp";
import { Globe, CircleArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const dropdownRef = useRef(null);
  const projectsDropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [t, i18n] = useTranslation("global");
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on a project detail page
  const isProjectDetailPage = location.pathname.startsWith("/projects/");

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      projectsDropdownRef.current &&
      !projectsDropdownRef.current.contains(event.target)
    ) {
      setIsProjectsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      if (window.innerWidth >= 768 && currentScrollPos > 0) {
        setIsNavbarHidden(isScrollingDown);
      } else {
        setIsNavbarHidden(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleMenuItemClick = (section) => {
    if (isProjectDetailPage) {
      // If on a project detail page, navigate to home first
      sessionStorage.setItem(
        section === "projects" ? "scrollToProjects" : `scrollTo${section}`,
        "true"
      );
      navigate("/");
    } else {
      // Otherwise, just scroll to the section
      scrollToSection(section);
    }
    setIsOpen(false);
  };

  const handleProjectClick = (projectId) => {
    localStorage.setItem("projectTransitionDirection", "0");
    sessionStorage.setItem("scrollToProjects", "true");
    navigate(`/projects/${projectId}`);
    setIsProjectsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const scrollToTop = () => {
    if (isProjectDetailPage) {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Animation variants for mobile menu items
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Project dropdown item variants for staggered animation
  const projectDropdownItemVariants = {
    hidden: { opacity: 0, y: -8, x: -4 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.25,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.15,
      },
    },
  };

  const hamburgerVariants = {
    closed: {
      rotate: 0,
      transition: { duration: 0.3 },
    },
    opened: {
      rotate: 180,
      transition: { duration: 0.3 },
    },
  };

  const projects = [
    { id: "uala", title: "Ualá" },
    { id: "unaje", title: "UNAJE" },
    { id: "chester", title: "Chester" },
  ];

  return (
    <div className="flex justify-center items-center">
      {/* Desktop Navbar */}
      <motion.nav
        initial={false}
        animate={{ y: isNavbarHidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full fixed top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-2 md:py-6 lg:px-8  bg-black/20 backdrop-blur-md border-b border-white/10 p-6 md:bg-black/0 md:border-none md:backdrop-blur-none">
          <div className="flex justify-between items-center h-16 md:h-20  md:bg-black/20 md:backdrop-blur-md md:border-b md:border-white/10 p-6 md:rounded-full">
            {/* Left side */}
            <div className="flex items-center space-x-8 font-bold justify-around w-fit md:w-[80%]">
              <img
                src={logo}
                className="w-[100px] h-[50px] cursor-pointer"
                alt="Reforce Infinity"
                onClick={scrollToTop}
              />
              <div className="hidden md:flex items-center justify-around w-[60%]">
                <button
                  onClick={scrollToTop}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("navbar.1")}
                </button>

                {/* Projects button with dropdown */}
                <div
                  className="relative"
                  ref={projectsDropdownRef}
                  onMouseEnter={() => setIsProjectsDropdownOpen(true)}
                  onMouseLeave={() => setIsProjectsDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleMenuItemClick("projects")}
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 group"
                    aria-expanded={isProjectsDropdownOpen}
                    aria-haspopup="true"
                  >
                    {t("navbar.2")}
                    <ChevronDown
                      className="w-4 h-4 transition-transform group-hover:text-white"
                      style={{
                        transform: isProjectsDropdownOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {isProjectsDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 mt-2 w-48 bg-black/60 backdrop-blur-md border border-white/10 rounded-md shadow-lg py-2 z-50"
                      >
                        {projects.map((project, index) => (
                          <motion.button
                            key={project.id}
                            custom={index}
                            variants={projectDropdownItemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={() => handleProjectClick(project.id)}
                            className="block px-4 py-2 text-sm text-white font-bold w-full text-left hover:bg-purple-600/30 transition-colors"
                            tabIndex={isProjectsDropdownOpen ? 0 : -1}
                          >
                            {project.title}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => handleMenuItemClick("services")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("navbar.3")}
                </button>
                <button
                  onClick={() => handleMenuItemClick("clients")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("navbar.4")}
                </button>
              </div>
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative" ref={dropdownRef}>
                <button
                  aria-label="Language"
                  onClick={toggleDropdown}
                  className="p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Globe className="w-6 h-6" />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-48 bg-black/40 backdrop-blur-md border border-white/10 rounded-md shadow-lg py-1"
                    >
                      <button
                        onClick={() => handleLanguageChange("es")}
                        className="block px-4 py-2 text-sm text-white font-bold hover:opacity-50 hover:cursor-pointer transition-opacity w-full text-left"
                      >
                        Español
                      </button>
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className="block px-4 py-2 text-sm text-white font-bold hover:opacity-50 hover:cursor-pointer transition-opacity w-full text-left"
                      >
                        English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                  className="button font-medium transition-all !px-6 !py-2 !text-sm w-fit whitespace-nowrap"
                >
                  <div className="dots_border"></div>

                  <span className="text_button font-medium">
                    {t("navbar.5")}
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu button and overlay */}
      <div className="md:hidden fixed top-0 right-0 z-50 p-4">
        <motion.button
          onClick={handleClick}
          className="relative z-50 p-2"
          animate={isOpen ? "opened" : "closed"}
          variants={hamburgerVariants}
        >
          <div className="relative w-8 h-8">
            <motion.span
              className="absolute top-4 left-0 w-8 h-0.5 bg-white"
              animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-4 left-0 w-8 h-0.5 bg-white"
              animate={isOpen ? { rotate: -45 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 1 }}
            />
            {!isOpen && (
              <motion.span
                className="absolute top-2 left-0 w-8 h-0.5 bg-white"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </motion.button>
      </div>

      {/* Mobile menu overlay with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0B0B1A] z-40"
          >
            <div className="flex flex-col h-full p-8">
              {/* Logo Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <img
                  src={logo}
                  className="w-[100px] h-[50px] opacity-0"
                  alt="Reforce Infinity"
                />
              </motion.div>

              {/* Menu Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between items-center mb-16"
              >
                <span className="text-white text-3xl font-medium">Menu</span>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="p-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Globe className="w-8 h-8" />
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                      >
                        <button
                          onClick={() => handleLanguageChange("es")}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Español
                        </button>
                        <button
                          onClick={() => handleLanguageChange("en")}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          English
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Menu items with cascade effect */}
              <div className="flex flex-col space-y-8 pr-2">
                {[
                  { text: t("navbar.1"), section: "aboutUs" },
                  { text: t("navbar.2"), section: "projects" },
                  { text: t("navbar.3"), section: "services" },
                  { text: t("navbar.4"), section: "clients" },
                ].map((item, i) => (
                  <motion.button
                    key={item.section}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => handleMenuItemClick(item.section)}
                    className="flex justify-between items-center text-white text-3xl font-medium hover:text-gray-300 transition-colors"
                  >
                    <span>{item.text}</span>
                    <CircleArrowRight className="w-8 h-8" />
                  </motion.button>
                ))}
              </div>

              {/* Projects submenu in mobile view */}
              <AnimatePresence>
                {isOpen && isProjectsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-8 mt-2 border-l-2 border-purple-500/30 pl-4"
                  >
                    {projects.map((project, index) => (
                      <motion.button
                        key={project.id}
                        custom={index}
                        variants={projectDropdownItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => handleProjectClick(project.id)}
                        className="block py-3 text-white text-xl font-medium hover:text-purple-300 transition-colors w-full text-left"
                      >
                        {project.title}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Let's Talk button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                    className="button font-medium transition-all w-full !px-4 !py-3 !text-sm whitespace-nowrap"
                  >
                    <div className="dots_border"></div>
                    <div className="sparkle">
                      <Sparkles
                        className="w-4 h-4"
                        style={{ color: "#9810fa" }}
                      />
                    </div>
                    <span className="text_button font-medium">
                      {t("navbar.5")}
                    </span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavBar;
