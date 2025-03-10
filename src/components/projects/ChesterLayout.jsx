import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
// Import Chester images
import chester1 from "../../assets/projects/chester-1.webp";
import chester2 from "../../assets/projects/chester-2.webp";
import chester3 from "../../assets/projects/chester-3.webp";
import chester4 from "../../assets/projects/chester-4.webp";
import chester5 from "../../assets/projects/chester-5.webp";
import chester6 from "../../assets/projects/chester-6.webp";
import chester7 from "../../assets/projects/chester-7.webp";
import chester8 from "../../assets/projects/chester-8.webp";
import chester9 from "../../assets/projects/chester-9.webp";
import FloatingNav from "./FloatingNav";
import useScrollSpy from "../../hooks/useScrollSpy";

const ChesterLayout = ({
  project,
  currentSection,
  setCurrentSection,
  projectContent,
  relatedProjects,
  projectSlug,
  i18n,
}) => {
  // Define sections for navigation
  const sections = [
    { id: "context", label: i18n.language === "en" ? "Context" : "Contexto" },
    {
      id: "challenge",
      label: i18n.language === "en" ? "Challenge" : "Desafío",
    },
    { id: "solution", label: i18n.language === "en" ? "Solution" : "Solución" },
    {
      id: "services",
      label: i18n.language === "en" ? "Services" : "Servicios",
    },
    { id: "gallery", label: i18n.language === "en" ? "Gallery" : "Galería" },
    {
      id: "related",
      label: i18n.language === "en" ? "Related" : "Relacionados",
    },
  ];

  // Track the active section based on scroll position - improved detection
  const activeSection = useScrollSpy(
    sections.map((section) => section.id),
    { threshold: 0.05, rootMargin: "0px 0px -80% 0px" }
  );

  // Update the current section in parent component when scrolling
  useEffect(() => {
    if (
      activeSection &&
      sections.some((section) => section.id === activeSection)
    ) {
      setCurrentSection(activeSection);
    }
  }, [activeSection, setCurrentSection, sections]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Floating Section Navigation */}
      <FloatingNav sections={sections} activeSection={activeSection} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
        {/* Left Column - Header and Content */}
        <motion.div
          className="md:col-span-7 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div>
            <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-2">
              {i18n.language === "en" ? "CASE STUDY" : "CASO DE ESTUDIO"}
            </h3>
            <h2 className="text-5xl font-bold mb-6">{project.title}</h2>
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

          {/* Context Section - ID at top for better detection */}
          <div className="pt-16">
            <div id="context" className="absolute -mt-24 invisible"></div>
            <motion.div
              className="space-y-6 min-h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                {i18n.language === "en" ? "About Chester" : "Sobre Chester"}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {projectContent.context}
              </p>
            </motion.div>
          </div>

          {/* Challenge Section - ID at top for better detection */}
          <div className="pt-24">
            <div id="challenge" className="absolute -mt-24 invisible"></div>
            <motion.div
              className="space-y-6 min-h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

          {/* Solution Section - ID at top for better detection */}
          <div className="pt-24">
            <div id="solution" className="absolute -mt-24 invisible"></div>
            <motion.div
              className="space-y-6 min-h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
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
          className="md:col-span-5 relative h-[500px] sticky top-24"
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
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
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

      {/* Services Section - Full width */}
      <div className="w-full pt-16 pb-16 min-h-[500px]">
        <div id="services" className="absolute -mt-24 invisible"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-purple-300">
            {i18n.language === "en" ? "Services" : "Servicios"}
          </h3>

          {/* Section 1: Text on left, image on right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-6 flex flex-col justify-center">
              <h4 className="text-xl font-medium mb-4 text-white">
                {i18n.language === "en"
                  ? "NFT Collection Design"
                  : "Diseño de Colección NFT"}
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {i18n.language === "en"
                  ? "Creation of a unique digital art collection that captures Chester's iconic mascot across different eras and styles, allowing collectors to own a piece of snack history on the blockchain."
                  : "Creación de una colección de arte digital única que captura la icónica mascota de Chester a través de diferentes épocas y estilos, permitiendo a los coleccionistas poseer una parte de la historia de snacks en la blockchain."}
              </p>
            </div>
            <div className="md:col-span-6">
              <motion.div
                className="rounded-lg overflow-hidden h-64 md:h-80 bg-gray-800"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={chester1}
                  alt="Chester NFT Collection"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Section 2: Text on right, image on left with CTA */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-6 md:order-2 flex flex-col justify-center">
              <h4 className="text-xl font-medium mb-4 text-white">
                {i18n.language === "en"
                  ? "Digital Marketplace"
                  : "Mercado Digital"}
              </h4>
              <p className="text-gray-300 leading-relaxed mb-6">
                {i18n.language === "en"
                  ? "Development of an exclusive digital marketplace for buying, selling, and trading Chester NFTs. Our platform ensures secure transactions and provides collectors with a dedicated space to showcase their unique digital assets."
                  : "Desarrollo de un mercado digital exclusivo para comprar, vender e intercambiar NFTs de Chester. Nuestra plataforma garantiza transacciones seguras y proporciona a los coleccionistas un espacio dedicado para mostrar sus activos digitales únicos."}
              </p>
            </div>
            <div className="md:col-span-6 md:order-1">
              <motion.div
                className="rounded-lg overflow-hidden h-64 md:h-80 bg-gray-800"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={chester2}
                  alt="Chester Digital Marketplace"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Section 3: Text on left, image on right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 flex flex-col justify-center">
              <h4 className="text-xl font-medium mb-4 text-white">
                {i18n.language === "en"
                  ? "Marketing Campaign"
                  : "Campaña de Marketing"}
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {i18n.language === "en"
                  ? "Strategic digital and social media marketing campaign to promote the Chester NFT collection. We created engaging content across multiple platforms to generate interest and excitement around this innovative blend of classic branding and modern digital collectibles."
                  : "Campaña estratégica de marketing digital y en redes sociales para promocionar la colección NFT de Chester. Creamos contenido atractivo en múltiples plataformas para generar interés y entusiasmo en torno a esta innovadora combinación de marca clásica y coleccionables digitales modernos."}
              </p>
            </div>
            <div className="md:col-span-6">
              <motion.div
                className="rounded-lg overflow-hidden h-64 md:h-80 bg-gray-800"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={chester3}
                  alt="Chester Marketing Campaign"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gallery Grid - Custom Layout */}
      <div className="w-full pt-16 pb-16 min-h-[500px]">
        <div id="gallery" className="absolute -mt-24 invisible"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-purple-300">
            {i18n.language === "en" ? "Gallery" : "Galería"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Images (first 2) */}
            <motion.div
              className="md:col-span-8 rounded-lg overflow-hidden bg-gray-800 aspect-video"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={chester4}
                alt={`${project.title} gallery 1`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="md:col-span-4 rounded-lg overflow-hidden bg-gray-800 aspect-square"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={chester5}
                alt={`${project.title} gallery 2`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Small Images (row 2) */}
            <motion.div
              className="md:col-span-4 rounded-lg overflow-hidden bg-gray-800 aspect-square"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <img
                src={chester6}
                alt={`${project.title} gallery 3`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="md:col-span-4 rounded-lg overflow-hidden bg-gray-800 aspect-square"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                src={chester7}
                alt={`${project.title} gallery 4`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="md:col-span-4 rounded-lg overflow-hidden bg-gray-800 aspect-square"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <img
                src={chester8}
                alt={`${project.title} gallery 5`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Related Projects / Footer */}
      <div className="w-full pt-16 pb-16">
        <div id="related" className="absolute -mt-24 invisible"></div>
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
            {/* Related projects rendering... */}
            {relatedProjects.map((relatedProject, idx) => {
              return (
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
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChesterLayout;
