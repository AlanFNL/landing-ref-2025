import React, { useState, useRef, useEffect, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

// Placeholder images - replace with your actual project images
import ualaBg from "../assets/projects/cover-1.webp";
import unajeBg from "../assets/projects/cover-2.webp";
import chesterBg from "../assets/projects/cover-3.webp";

const ProjectCard = ({ project, index, isInView, t, onCardClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCardClick(project, index);
    }
  };

  const handleClick = () => {
    onCardClick(project, index);
  };

  // Optimized hover gradient for Safari - using a simpler approach with fewer transforms
  const background = useMotionTemplate`radial-gradient(
    400px circle at ${mouseX}px ${mouseY}px,
    rgba(168, 85, 247, 0.08),
    transparent 80%
  )`;

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm cursor-pointer will-change-transform"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 20,
        transition: {
          delay: Math.min(index * 0.05, 0.15),
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={t("projects.view", "View") + " " + project.title}
      style={{
        transform: "translateZ(0)",
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-0">
        {/* Simplified gradient overlay - less intensive */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
          <div className="absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        {/* Static image without hover animation */}
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="relative z-20 flex h-full flex-col justify-between p-6">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.pills.map((pill, idx) => (
              <span
                key={idx}
                className="rounded-full bg-purple-600/30 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-sm"
              >
                {pill}
              </span>
            ))}
          </div>
          <h3 className="mb-2 text-2xl font-bold text-white">
            {project.title}
          </h3>
        </div>

        <div className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-purple-300 transition-colors hover:text-white">
          {t("projects.learn_more", "Learn more")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = forwardRef((props, ref) => {
  const [t, i18n] = useTranslation("global");
  const [showCards, setShowCards] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [comingFromProjectDetail, setComingFromProjectDetail] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToSection } = props;

  const isInView = useInView(containerRef, {
    once: false,
    margin: "0px 0px -200px 0px",
  });

  const isAnimationInView = useInView(animationRef, {
    once: true,
    amount: 0.5,
  });

  const projects = [
    {
      id: "uala",
      title: "Ualá",
      pills: ["Metaverse"],
      image: ualaBg,
    },
    {
      id: "unaje",
      title: "UNAJE",
      pills: ["Content Creation", "Ads"],
      image: unajeBg,
    },
    {
      id: "chester",
      title: "Chester - PepsiCo",
      pills: ["NFT", "Web Dev", "Ads"],
      image: chesterBg,
    },
  ];

  useEffect(() => {
    const browserLang = navigator.language;
    i18n.changeLanguage(browserLang.startsWith("es") ? "es" : "en");
  }, [i18n]);

  useEffect(() => {
    const isReturning = sessionStorage.getItem("scrollToProjects");
    if (isReturning) {
      setComingFromProjectDetail(true);
      setAnimationComplete(true);
      setAnimationStarted(true);
      setShowCards(true);
      sessionStorage.removeItem("scrollToProjects");
    }
  }, []);

  useEffect(() => {
    if (isAnimationInView && !animationStarted && !comingFromProjectDetail) {
      setAnimationStarted(true);

      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAnimationInView, animationStarted, comingFromProjectDetail]);

  useEffect(() => {
    if (animationComplete || comingFromProjectDetail) {
      setShowCards(true);
    }
  }, [animationComplete, comingFromProjectDetail]);

  const handleCardClick = (project, index) => {
    localStorage.setItem("projectTransitionDirection", "0");

    // Set flag to indicate we're coming from projects page
    // This will be used to skip the animation when returning
    sessionStorage.setItem("scrollToProjects", "true");

    navigate(`/projects/${project.id}`);
  };

  const handleBackKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowCards(false);
    }
  };

  const handleExploreKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowCards(true);
    }
  };

  const introVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className="relative w-[98vw] m-auto min-h-screen flex items-center justify-center overflow-hidden bg-black py-20"
      id="projects-section"
    >
      <div
        ref={animationRef}
        className="absolute top-1/4 left-0 h-2 w-full opacity-0 pointer-events-none"
      />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black" />

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: animationComplete ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-[-10%] inset-x-0 h-[60%] w-full bg-gradient-to-b from-purple-800/10 via-indigo-600/5 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-purple-700/10 blur-[80px]" />
        </motion.div>

        {animationStarted && !animationComplete && (
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.6] }}
            transition={{ duration: 2, times: [0, 0.6, 1] }}
            onAnimationComplete={() => setAnimationComplete(true)}
            style={{
              transform: "translateZ(0)",
              willChange: "opacity",
            }}
          >
            <motion.div
              className="absolute top-0 -left-[30%] h-[120%] w-[160%] bg-gradient-to-r from-purple-900/10 via-purple-600/20 to-indigo-600/10 blur-[60px]"
              initial={{ x: "-100%", rotate: -5, scale: 0.8 }}
              animate={{ x: "50%", rotate: 0, scale: 1.1 }}
              transition={{
                duration: 2,
                ease: "easeOut",
              }}
              style={{
                transform: "translateZ(0)",
                willChange: "transform",
              }}
            />

            <motion.div
              className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-fuchsia-500/15 blur-[30px]"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.2, 1.2, 0.8],
                x: [0, 80, 40],
                y: [0, -40, -80],
              }}
              transition={{
                duration: 2,
                times: [0, 0.6, 1],
                ease: "easeOut",
              }}
              style={{
                transform: "translateZ(0)",
                willChange: "transform, opacity",
              }}
            />
          </motion.div>
        )}

        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.3 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 w-full">
        <motion.div
          layout
          transition={{
            layout: { duration: 0.35, ease: "easeOut" },
          }}
          className="relative"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <AnimatePresence mode="wait">
            {!showCards ? (
              <motion.div
                key="intro"
                className="mx-auto max-w-3xl text-center"
                variants={introVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  transform: "translateZ(0)",
                  willChange: "opacity, transform",
                }}
              >
                <motion.div
                  variants={itemVariants}
                  className="relative mb-6 inline-block"
                >
                  <h2 className="text-5xl font-bold text-white">
                    {t("projects.title", "Our Projects")}
                  </h2>
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(168, 85, 247, 0.3))",
                      transform: "translateZ(0)",
                      willChange: "width",
                    }}
                  />
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="mx-auto mb-8 max-w-2xl text-lg text-gray-300"
                >
                  {t(
                    "projects.description",
                    "We create immersive digital experiences that connect brands with their audiences. From virtual worlds to interactive web platforms, our projects deliver innovative solutions with measurable results."
                  )}
                </motion.p>

                <motion.div
                  className="flex flex-wrap justify-center gap-3 mb-10"
                  variants={itemVariants}
                >
                  {[
                    "Metaverse",
                    "Content Creation",
                    "NFTs",
                    "Web3",
                    "Digital Marketing",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full bg-purple-800/30 px-4 py-1.5 text-sm font-medium text-purple-100 backdrop-blur-sm border border-purple-500/30 hover:bg-purple-700/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  onClick={() => setShowCards(true)}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 font-medium text-white shadow-lg transition-all hover:bg-purple-700 hover:scale-[1.03] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                  tabIndex="0"
                  onKeyDown={handleExploreKeyDown}
                  aria-label="Explore our work"
                >
                  <span className="inline-block">
                    {t("projects.cta", "Explore Our Work")}
                  </span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                className="mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  transform: "translateZ(0)",
                  willChange: "opacity",
                }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <button
                    onClick={() => setShowCards(false)}
                    className="flex items-center gap-2 text-white/60 transition-colors hover:text-white hover:-translate-x-1"
                    tabIndex="0"
                    onKeyDown={handleBackKeyDown}
                    aria-label="Back to projects overview"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>
                  <h3 className="text-2xl font-bold text-white">
                    {t("projects.featured", "Featured Projects")}
                  </h3>
                  <div className="w-[76px]"></div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      isInView={isInView}
                      t={t}
                      onCardClick={handleCardClick}
                    />
                  ))}

                  {/* Coming Soon Card - Further Optimized for Safari */}
                  <motion.div
                    className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm md:col-span-3 min-h-[160px] my-2 md:my-4 will-change-transform"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : 20,
                      transition: {
                        delay: Math.min(projects.length * 0.05, 0.15),
                        duration: 0.25,
                        ease: "easeOut",
                      },
                    }}
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.2 },
                    }}
                    style={{
                      transform: "translateZ(0)",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/80 to-black/90" />

                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        animate={{
                          background: [
                            "linear-gradient(45deg, rgba(168, 85, 247, 0.2) 0%, rgba(80, 70, 230, 0.1) 100%)",
                            "linear-gradient(45deg, rgba(80, 70, 230, 0.1) 0%, rgba(168, 85, 247, 0.2) 100%)",
                            "linear-gradient(45deg, rgba(168, 85, 247, 0.2) 0%, rgba(80, 70, 230, 0.1) 100%)",
                          ],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
});

export default Projects;
