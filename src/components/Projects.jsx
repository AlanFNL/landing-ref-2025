import React, { useState, useRef, useEffect, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  motion,
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

  const background = useMotionTemplate`radial-gradient(
    400px circle at ${mouseX}px ${mouseY}px,
    rgba(168, 85, 247, 0.08),
    transparent 80%
  )`;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[600px] md:h-[500px] lg:h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-sm cursor-pointer will-change-transform"
      initial={{ opacity: 0, y: 60 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 60,
        transition: {
          delay: index * 0.2,
          duration: 0.8,
          ease: [0.32, 0.72, 0, 1],
        },
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: {
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1],
          scale: {
            duration: 0.3,
            ease: [0.32, 0.72, 0, 1],
          },
          y: {
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
          },
        },
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

      {/* Mobile: Stacked layout, Desktop: Side-by-side */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Image section - 50% width on desktop, full width on mobile */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-0">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Text content section - 50% width on desktop, full width on mobile */}
        <div className="relative z-20 flex flex-col justify-between p-6 md:p-8 lg:p-12 w-full md:w-1/2 h-1/2 md:h-full">
          <div>
            {/* Project pills */}
            <div className="mb-4 md:mb-6 lg:mb-8 flex flex-wrap gap-2 md:gap-3">
              {project.pills.map((pill, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white/90"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Project title */}
            <h3 className="mb-3 md:mb-4 lg:mb-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              {project.title}
            </h3>

            {/* Project description */}
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-white/80 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Call to action */}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = forwardRef((props, ref) => {
  const [t, i18n] = useTranslation("global");
  const [comingFromProjectDetail, setComingFromProjectDetail] = useState(false);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToSection } = props;

  const isInView = useInView(containerRef, {
    once: false,
    margin: "0px 0px -200px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values for the title scroll effect
  const titleY = useTransform(scrollYProgress, [0, 0.7], [0, 100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 1]);

  const projects = [
    {
      id: "uala",
      title: t("projects.uala.title"),
      description: t("projects.uala.description"),
      pills: t("projects.uala.pills", { returnObjects: true }),
      image: ualaBg,
    },
    {
      id: "unaje",
      title: t("projects.unaje.title"),
      description: t("projects.unaje.description"),
      pills: t("projects.unaje.pills", { returnObjects: true }),
      image: unajeBg,
    },
    {
      id: "chester",
      title: t("projects.chester.title"),
      description: t("projects.chester.description"),
      pills: t("projects.chester.pills", { returnObjects: true }),
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
      sessionStorage.removeItem("scrollToProjects");
    }
  }, []);

  const handleCardClick = (project, index) => {
    localStorage.setItem("projectTransitionDirection", "0");
    sessionStorage.setItem("scrollToProjects", "true");
    navigate(`/projects/${project.id}`);
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
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black" />

        {/* Single animated gradient sweep from left to right */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.div
            className="absolute top-0 -left-[30%] h-[120%] w-[160%] bg-gradient-to-r from-purple-900/20 via-purple-600/30 to-indigo-600/20 blur-[60px]"
            initial={{ x: "-100%", rotate: -5, scale: 0.8 }}
            animate={{ x: "50%", rotate: 0, scale: 1.1 }}
            transition={{
              duration: 2.5,
              ease: [0.32, 0.72, 0, 1],
              delay: 0.8,
            }}
          />
        </motion.div>

        {/* Top border line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 w-full">
        <div className="relative">
          {/* Title section with scroll effect */}
          <motion.div
            ref={titleRef}
            className="text-center mb-20 md:mb-24"
            style={{
              y: titleY,
              opacity: titleOpacity,
            }}
          >
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("projects.title", "Case Study")}
            </motion.h2>
            <motion.p
              className="mx-auto max-w-4xl text-xl md:text-2xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t(
                "projects.description",
                "Our success stories showcase how we transform brands through innovative digital experiences. Each project represents a unique journey of creativity, technology, and measurable results."
              )}
            </motion.p>
          </motion.div>

          {/* Projects grid - one per row */}
          <div className="space-y-12 md:space-y-16">
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
          </div>
        </div>
      </div>
    </div>
  );
});

export default Projects;
