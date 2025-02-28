import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

const ChesterLayout = ({
  project,
  currentSection,
  setCurrentSection,
  projectContent,
  relatedProjects,
  projectSlug,
  i18n,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Section navigation pills */}
      <motion.div
        className="relative mb-12 md:mb-16 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Left fade indicator for scrolling */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none md:hidden"></div>

        {/* Right fade indicator for scrolling */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none md:hidden"></div>

        {/* Scrollable container */}
        <div className="flex overflow-x-auto hide-scrollbar py-2 px-4 md:px-0 md:justify-center md:overflow-visible">
          <div className="flex space-x-2 md:space-x-4 px-4 md:px-0">
            {["context", "challenge", "solution", "services"].map((section) => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`whitespace-nowrap px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all flex-shrink-0 ${
                  currentSection === section
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {i18n.language === "en"
                  ? section.charAt(0).toUpperCase() + section.slice(1)
                  : section === "context"
                  ? "Contexto"
                  : section === "challenge"
                  ? "Desafío"
                  : section === "solution"
                  ? "Solución"
                  : section === "services"
                  ? "Servicios"
                  : ""}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column - Header and Content */}
        <motion.div
          className={`${
            currentSection === "services"
              ? "md:col-span-12 space-y-8"
              : "md:col-span-7 space-y-8"
          }`}
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

          {/* Dynamic content based on selected section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`${
                currentSection === "services"
                  ? "space-y-6 w-full max-w-none"
                  : "space-y-6"
              }`}
            >
              {currentSection === "context" && (
                <motion.div>
                  <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                    {i18n.language === "en" ? "About Chester" : "Sobre Chester"}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {projectContent.context}
                  </p>
                </motion.div>
              )}

              {currentSection === "challenge" && (
                <motion.div>
                  <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                    {i18n.language === "en" ? "Challenge" : "Reto"}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {projectContent.challenge}
                  </p>
                </motion.div>
              )}

              {currentSection === "solution" && (
                <motion.div>
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
              )}

              {currentSection === "services" && (
                <motion.div>
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
                        animate={{ opacity: 1, y: 0 }}
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
                        animate={{ opacity: 1, y: 0 }}
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
                        animate={{ opacity: 1, y: 0 }}
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
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right Column - Featured Image with floating effect */}
        {currentSection !== "services" && (
          <motion.div
            className="md:col-span-5 relative h-[500px]"
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

              {/* NFT Indicators */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/50 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <span className="text-xs font-medium text-white">NFT</span>
              </motion.div>

              <motion.div
                className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/50 flex items-center justify-center"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              >
                <span className="text-xs font-medium text-white">
                  Blockchain
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Gallery Grid - Custom Layout */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-8 text-purple-300">
          {i18n.language === "en" ? "Gallery" : "Galería"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Images (first 2) */}
          {project.gallery
            .filter((item) => item.large)
            .map((item, idx) => (
              <motion.div
                key={`large-${idx}`}
                className="md:col-span-6 rounded-lg overflow-hidden bg-gray-800 aspect-video"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.src}
                  alt={`${project.title} gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}

          {/* Small Images (remaining 3) */}
          {project.gallery
            .filter((item) => item.small)
            .map((item, idx) => (
              <motion.div
                key={`small-${idx}`}
                className="md:col-span-4 rounded-lg overflow-hidden bg-gray-800 aspect-square"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7 + idx * 0.1,
                  duration: 0.6,
                }}
              >
                <img
                  src={item.src}
                  alt={`${project.title} gallery ${idx + 3}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
        </div>
      </motion.div>

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
  );
};

export default ChesterLayout;
