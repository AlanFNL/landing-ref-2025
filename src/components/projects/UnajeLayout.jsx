import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FloatingNav from "./FloatingNav";
import useScrollSpy from "../../hooks/useScrollSpy";
// Import Unaje images
import unaje1 from "../../assets/projects/unaje-1.webp";
import unaje2 from "../../assets/projects/unaje-2.webp";
import unaje3 from "../../assets/projects/unaje-3.webp";
import unaje4 from "../../assets/projects/unaje-4.webp";
import unaje5 from "../../assets/projects/unaje-5.webp";
import unaje6 from "../../assets/projects/unaje-6.webp";
import unaje7 from "../../assets/projects/unaje-7.webp";
import unaje8 from "../../assets/projects/unaje-8.webp";
import unaje9 from "../../assets/projects/unaje-9.webp";
import unaje10 from "../../assets/projects/unaje-10.webp";
import unajeResults1 from "../../assets/projects/unaje-results1.webp";
import unajeResults2 from "../../assets/projects/unaje-results2.webp";
import unajeResults3 from "../../assets/projects/unaje-results3.webp";

const UnajeLayout = ({
  project,
  currentSection,
  setCurrentSection,
  projectContent,
  relatedProjects,
  projectSlug,
  i18n,
}) => {
  // Define the sections for navigation
  const sections = [
    { id: "context", label: i18n.language === "en" ? "Context" : "Contexto" },
    {
      id: "challenge",
      label: i18n.language === "en" ? "Challenge" : "Desafío",
    },
    { id: "solution", label: i18n.language === "en" ? "Solution" : "Solución" },
    {
      id: "implementation",
      label: i18n.language === "en" ? "Implementation" : "Implementación",
    },
    { id: "results", label: i18n.language === "en" ? "Results" : "Resultados" },
  ];

  // Use the improved useScrollSpy hook with adjusted options for better detection
  const activeSection = useScrollSpy(
    sections.map((section) => section.id),
    { threshold: 0.05, rootMargin: "0px 0px -80% 0px" }
  );

  // State to track if we've reached the implementation section or beyond
  const [pastIntroSections, setPastIntroSections] = useState(false);

  // Update pastIntroSections based on active section
  useEffect(() => {
    const implementationIndex = sections.findIndex(
      (section) => section.id === "implementation"
    );
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );

    // If we're at implementation or beyond, disable the sticky behavior
    setPastIntroSections(currentIndex >= implementationIndex);
  }, [activeSection, sections]);

  // Make sure we update the parent component's currentSection state
  useEffect(() => {
    if (activeSection && setCurrentSection) {
      setCurrentSection(activeSection);
    }
  }, [activeSection, setCurrentSection]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-0 py-16">
      {/* Floating Navigation on the right */}
      <FloatingNav sections={sections} activeSection={activeSection} />

      {/* Header Section: Case Study Title, Pills, etc. */}
      <div className="mb-12">
        <div>
          <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-2">
            {i18n.language === "en" ? "CASE STUDY" : "CASO DE ESTUDIO"}
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {project.title}
          </h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.pills.map((pill, idx) => (
              <span
                key={idx}
                className="rounded-full bg-purple-600/30 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-sm"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column grid layout for intro sections with the sticky image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Left Column - Intro Sections (Context, Challenge, Solution) */}
        <motion.div
          className="md:col-span-7 space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Context Section - ID placed at the top */}
          <div className="pt-16">
            <div id="context" className="absolute -mt-24 invisible"></div>
            <motion.div
              className="space-y-6 min-h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                {i18n.language === "en" ? "About UNAJE" : "Sobre UNAJE"}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {projectContent.context}
              </p>
            </motion.div>
          </div>

          {/* Challenge Section - ID placed at the top */}
          <div className="pt-24">
            <div id="challenge" className="absolute -mt-24 invisible"></div>
            <motion.div
              className="space-y-6 min-h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                {i18n.language === "en" ? "Challenge" : "Reto"}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {projectContent.challenge}
              </p>
            </motion.div>
          </div>

          {/* Solution Section - ID placed at the top */}
          <div className="pt-24">
            <div id="solution" className="absolute -mt-24 invisible"></div>
            <motion.div
              className="space-y-6 min-h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                {i18n.language === "en"
                  ? "Solution Approach"
                  : "Enfoque de Solución"}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                {projectContent.solution}
              </p>
              <h4 className="text-xl font-medium mb-4 text-white">
                {i18n.language === "en"
                  ? "The project included:"
                  : "El proyecto incluyó:"}
              </h4>
              <ul className="space-y-4">
                {projectContent.project_included.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-start"
                  >
                    <span className="text-purple-400 mr-3 mt-1">•</span>
                    <p className="text-gray-300">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Featured Image with floating effect */}
        <motion.div
          className={`md:col-span-5 h-[500px] sticky top-24`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full rounded-xl overflow-hidden"
            animate={{
              y: [0, -10, 0],
              rotateZ: [0, 1, 0],
              rotateX: [0, 1, 0],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent z-10 rounded-xl" />
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Implementation Section - Full Width with ID at the top */}
      <div className="w-full pt-16 pb-16 min-h-[500px]">
        <div id="implementation" className="absolute -mt-24 invisible"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-purple-300">
            {i18n.language === "en" ? "Implementation" : "Implementación"}
          </h3>

          {/* Section 1: Social Media and Advertising */}
          <div className="space-y-12 mb-24">
            <div>
              <h4 className="text-xl font-medium mb-6 text-white">
                {i18n.language === "en"
                  ? "1. Social Media and Advertising"
                  : "1. Redes Sociales y Publicidad"}
              </h4>
              <ul className="space-y-4 mb-10">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Comprehensive management of social networks, including informative and promotional posts."
                      : "Gestión integral de redes sociales, incluyendo publicaciones informativas y promocionales."}
                  </p>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Advertising through Ads on social networks, achieving greater reach and visibility."
                      : "Publicidad mediante Ads en redes, logrando mayor alcance y visibilidad."}
                  </p>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Significant increase in views and followers."
                      : "Aumento significativo de visualizaciones y seguidores."}
                  </p>
                </motion.li>
              </ul>

              {/* Social Media Images - 3 images row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 lg:gap-10 w-full">
                <motion.div
                  className="col-span-1 rounded-lg overflow-hidden h-60 sm:h-72 md:h-96 lg:h-[450px] bg-gray-800"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={unaje3}
                    alt="UNAJE social media example 1"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="col-span-1 rounded-lg overflow-hidden h-60 sm:h-72 md:h-96 lg:h-[450px] bg-gray-800"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <img
                    src={unaje4}
                    alt="UNAJE social media example 2"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="col-span-1 rounded-lg overflow-hidden h-60 sm:h-72 md:h-96 lg:h-[450px] bg-gray-800"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <img
                    src={unaje5}
                    alt="UNAJE social media example 3"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Section 2: Key Events */}
            <div className="mt-20">
              <h4 className="text-xl font-medium mb-6 text-white">
                {i18n.language === "en" ? "2. Key Events" : "2. Eventos Clave"}
              </h4>

              <h5 className="text-lg font-medium mb-4 text-purple-300">
                {i18n.language === "en" ? "Leading Future" : "Liderando Futuro"}
              </h5>

              <ul className="space-y-4 mb-10">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Digital advertising: Reached 400,000 people with sold-out entries."
                      : "Publicidad digital: Alcance de 400,000 personas y entradas sold out."}
                  </p>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Design and production of: Giant screen graphics, vertical totems, and street signage."
                      : "Diseño y producción de: Piezas gráficas para pantalla gigante, Tótems verticales y cartelería de calle."}
                  </p>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Post-production of promotional videos and event coverage."
                      : "Postproducción de videos promocionales y del evento."}
                  </p>
                </motion.li>
              </ul>

              {/* Event Images - 3 images row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 lg:gap-10 w-full">
                <motion.div
                  className="col-span-1 rounded-lg overflow-hidden h-60 sm:h-72 md:h-96 lg:h-[450px] bg-gray-800"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={unaje1}
                    alt="UNAJE event example 1"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="col-span-1 rounded-lg overflow-hidden h-60 sm:h-72 md:h-96 lg:h-[450px] bg-gray-800"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <img
                    src={unaje2}
                    alt="UNAJE event example 2"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="col-span-1 rounded-lg overflow-hidden h-60 sm:h-72 md:h-96 lg:h-[450px] bg-gray-800"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <img
                    src={unaje3}
                    alt="UNAJE event example 3"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* PropAR Section */}
              <h5 className="text-lg font-medium mb-4 mt-12 text-purple-300">
                PropAR
              </h5>

              <ul className="space-y-4 mb-10">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Comprehensive coordination as the main agency."
                      : "Coordinación integral como agencia principal."}
                  </p>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Design and rebranding of animations for the main screen."
                      : "Diseño y rebranding de animaciones para pantalla principal."}
                  </p>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Production of visual material and video post-production."
                      : "Producción de material visual y postproducción de videos."}
                  </p>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start"
                >
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    {i18n.language === "en"
                      ? "Advertising and promotion on social networks."
                      : "Publicidad y promoción en redes sociales."}
                  </p>
                </motion.li>
              </ul>

              {/* PropAR Images - 3 images with one larger width */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 lg:gap-10 w-full">
                <motion.div
                  className="sm:col-span-2 md:col-span-3 rounded-lg overflow-hidden h-60 sm:h-72 md:h-96 lg:h-[450px] bg-gray-800"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={unaje6}
                    alt="PropAR main example"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="md:col-span-1 rounded-lg overflow-hidden h-60 sm:h-72 md:h-96 lg:h-[450px] bg-gray-800"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <img
                    src={unaje7}
                    alt="PropAR example 2"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="md:col-span-1 rounded-lg overflow-hidden h-60 sm:h-72 md:h-96 lg:h-[450px] bg-gray-800"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <img
                    src={unaje8}
                    alt="PropAR example 3"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Results Section - Full Width with ID at the top */}
      <div className="w-full pt-16 pb-16 min-h-[500px]">
        <div id="results" className="absolute -mt-24 invisible"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-semibold mb-8 text-purple-300">
            {i18n.language === "en" ? "Results" : "Resultados"}
          </h3>

          {/* Numbered Results List */}
          <ol className="space-y-6 list-decimal list-inside max-w-4xl">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-200"
            >
              {i18n.language === "en"
                ? "Increase in views and followers"
                : "Incremento de visualizaciones y seguidores"}
              <span className="text-gray-400 ml-2 text-lg">
                {i18n.language === "en"
                  ? "on social networks."
                  : "en redes sociales."}
              </span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200"
            >
              {i18n.language === "en"
                ? "Success in key events:"
                : "Éxito en eventos clave:"}
              <ul className="ml-8 mt-3 space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    <span className="font-medium">
                      {i18n.language === "en"
                        ? "Leading Future: "
                        : "Liderando Futuro: "}
                    </span>
                    {i18n.language === "en"
                      ? "Massive reach and sold-out tickets."
                      : "Alcance masivo y entradas agotadas."}
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <p className="text-gray-300">
                    <span className="font-medium">PropAR: </span>
                    {i18n.language === "en"
                      ? "Coordination and outstanding visual results."
                      : "Coordinación y resultados visuales destacados."}
                  </p>
                </li>
              </ul>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-200"
            >
              {i18n.language === "en"
                ? "Increased audience interaction"
                : "Mayor interacción con la audiencia"}
              <span className="text-gray-400 ml-2 text-lg">
                {i18n.language === "en"
                  ? "thanks to dynamic content and humanized strategies."
                  : "gracias a contenido dinámico y estrategias humanizadas."}
              </span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200"
            >
              {i18n.language === "en"
                ? "Consolidation of UNAJE as an active and modern brand"
                : "Consolidación de UNAJE como una marca activa y moderna"}
              <span className="text-gray-400 ml-2 text-lg">
                {i18n.language === "en"
                  ? "in the business ecosystem."
                  : "en el ecosistema empresarial."}
              </span>
            </motion.li>
          </ol>

          {/* Performance Metrics Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold mb-8 text-purple-300">
              {i18n.language === "en" ? "Performance" : "Performance"}
            </h3>

            <motion.div
              className="bg-gradient-to-br from-teal-500/10 to-purple-500/10 p-6 md:p-12 rounded-2xl backdrop-blur-sm border border-white/10 space-y-20 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Metrics Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                <div className="col-span-1">
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm p-4 md:p-8 rounded-lg border border-white/10 h-full flex flex-col justify-center items-center text-center"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="text-lg font-medium text-purple-300 mb-2">
                      {i18n.language === "en" ? "Reach" : "Alcance"}
                    </h4>
                    <p className="text-5xl font-bold text-white">175.8K</p>
                    <p className="text-green-400 text-sm mt-1">+7.2%</p>
                  </motion.div>
                </div>

                <div className="col-span-1">
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm p-4 md:p-8 rounded-lg border border-white/10 h-full flex flex-col justify-center items-center text-center"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="text-lg font-medium text-purple-300 mb-2">
                      {i18n.language === "en"
                        ? "Content Interactions"
                        : "Interacciones"}
                    </h4>
                    <p className="text-5xl font-bold text-white">2.3K</p>
                    <p className="text-green-400 text-sm mt-1">+9.5%</p>
                  </motion.div>
                </div>

                <div className="col-span-1">
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm p-4 md:p-8 rounded-lg border border-white/10 h-full flex flex-col justify-center items-center text-center"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="text-lg font-medium text-purple-300 mb-2">
                      {i18n.language === "en" ? "Followers" : "Seguidores"}
                    </h4>
                    <p className="text-5xl font-bold text-white">19.3K</p>
                    <p className="text-green-400 text-sm mt-1">+5.7%</p>
                  </motion.div>
                </div>
              </div>

              {/* Performance Charts */}
              <div className="space-y-20">
                {/* Chart 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-lg border border-white/10">
                    <h4 className="text-xl font-medium text-purple-300 mb-8">
                      {i18n.language === "en"
                        ? "Reach Analysis"
                        : "Análisis de Alcance"}
                    </h4>
                    <img
                      src={unajeResults1}
                      alt="UNAJE reach metrics"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </motion.div>

                {/* Chart 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-lg border border-white/10">
                    <h4 className="text-xl font-medium text-purple-300 mb-8">
                      {i18n.language === "en"
                        ? "Engagement Metrics"
                        : "Métricas de Interacción"}
                    </h4>
                    <img
                      src={unajeResults2}
                      alt="UNAJE engagement metrics"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </motion.div>

                {/* Chart 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-lg border border-white/10">
                    <h4 className="text-xl font-medium text-purple-300 mb-8">
                      {i18n.language === "en"
                        ? "Growth Trends"
                        : "Tendencias de Crecimiento"}
                    </h4>
                    <img
                      src={unajeResults3}
                      alt="UNAJE growth trends"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Related Projects / Footer */}
      <motion.div
        className="mt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-8">
          {i18n.language === "en" ? "Other Projects" : "Otros Proyectos"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedProjects.map((relatedProject, idx) => (
            <Link
              key={idx}
              to={`/projects/${relatedProject.id}`}
              className="group block"
              onClick={() => {
                localStorage.setItem("projectTransitionDirection", "0");
              }}
            >
              <motion.div
                className="relative h-48 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
                <img
                  src={relatedProject.cover}
                  alt={relatedProject.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-6">
                  <h4 className="text-2xl font-bold mb-2">
                    {relatedProject.title}
                  </h4>
                  <p className="text-gray-300 mb-4">
                    {relatedProject.subtitle}
                  </p>
                  <div className="flex items-center text-purple-400 text-sm font-medium">
                    <span>
                      {i18n.language === "en"
                        ? "View Case Study"
                        : "Ver Caso de Estudio"}
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UnajeLayout;
