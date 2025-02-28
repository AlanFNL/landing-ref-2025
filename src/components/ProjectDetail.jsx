import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ArrowRight, Globe } from "lucide-react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { ScrollContext } from "../main.jsx";
// Import project layout components
import UalaLayout from "./projects/UalaLayout";
import ChesterLayout from "./projects/ChesterLayout";
import UnajeLayout from "./projects/UnajeLayout";

// CSS for hiding scrollbars
const hideScrollbarStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

// Import project images
import ualaBg from "../assets/projects/uala-6.webp";
import unajeBg from "../assets/projects/unaje-cover.webp";
import chesterBg from "../assets/projects/cover-3.webp";
import uala1 from "../assets/projects/uala-1.webp";
import uala2 from "../assets/projects/uala-2.webp";
import uala3 from "../assets/projects/uala-3.webp";
import uala4 from "../assets/projects/uala-4.webp";
import uala5 from "../assets/projects/uala-5.webp";
import unaje1 from "../assets/projects/unaje-1.webp";
import unaje2 from "../assets/projects/unaje-2.webp";
import unaje3 from "../assets/projects/unaje-3.webp";
import unaje4 from "../assets/projects/unaje-4.webp";
import unaje5 from "../assets/projects/unaje-5.webp";
import unaje6 from "../assets/projects/unaje-6.webp";
import unaje7 from "../assets/projects/unaje-7.webp";
import unaje8 from "../assets/projects/unaje-8.webp";
import unaje9 from "../assets/projects/unaje-9.webp";
import unaje10 from "../assets/projects/unaje-10.webp";
import unajeResults1 from "../assets/projects/unaje-results1.webp";
import unajeResults2 from "../assets/projects/unaje-results2.webp";
import unajeResults3 from "../assets/projects/unaje-results3.webp";
import chester1 from "../assets/projects/chester-1.webp";
import chester2 from "../assets/projects/chester-2.webp";
import chester3 from "../assets/projects/chester-3.webp";
import chester4 from "../assets/projects/chester-4.webp";
import chester5 from "../assets/projects/chester-5.webp";
import chester6 from "../assets/projects/chester-6.webp";
import chester7 from "../assets/projects/chester-7.webp";
import chester8 from "../assets/projects/chester-8.webp";
import chester9 from "../assets/projects/chester-9.webp";

const ProjectDetail = () => {
  const { projectSlug } = useParams();
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [animationDirection, setAnimationDirection] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef(null);
  const { scrollToSection } = useContext(ScrollContext);
  const [currentSection, setCurrentSection] = useState("context");

  // Project data
  const projects = [
    {
      id: "uala",
      title: "Ualá",
      subtitle: "Metaverse Experience",
      cover: ualaBg,
      pills: ["Metaverse", "VR", "Event"],
      hasUniqueLayout: true,
      translations: {
        en: {
          context:
            "Ualá is an Argentine fintech founded in 2017 that offers digital financial solutions designed to simplify money management. Its main objective is to promote financial inclusion, providing access to services that, traditionally, would require a conventional bank account.",
          challenge:
            "Ualá users expressed interest in having the option to invest in cryptocurrencies, in addition to doing so in pesos, directly from the app. Ualá was looking to launch this new product in an innovative way, without losing the traditional essence of organizing an event to communicate it.",
          solution:
            "An immersive virtual reality (VR) experience was designed to make the official announcement of the new product in the metaverse. The strategy consisted of organizing an exclusive event, inviting 15 press representatives to participate in a VR experience designed to communicate and learn about the incorporation of cryptocurrencies into the app.",
          project_included: [
            "Metaverse Design: Interactive virtual spaces were developed that reflect Ualá's identity.",
            "Custom Character Creation: Each guest could select an avatar that represented their personal style.",
            "Educational Interaction: Attendees learned about the new product in an innovative environment, reinforcing the brand's message of modernity.",
          ],
        },
        es: {
          context:
            "Ualá es una fintech argentina fundada en 2017 que ofrece soluciones financieras digitales diseñadas para simplificar la gestión del dinero. Su principal objetivo es fomentar la inclusión financiera, proporcionando acceso a servicios que, tradicionalmente, requerirían una cuenta bancaria convencional.",
          challenge:
            "Los usuarios de Ualá expresaron interés en contar con la opción de invertir en criptomonedas, además de hacerlo en pesos, directamente desde la app. Ualá buscaba lanzar este nuevo producto de manera innovadora, sin perder la esencia tradicional de organizar un evento para comunicarlo.",
          solution:
            "Se diseñó una experiencia inmersiva en realidad virtual (VR) para realizar el anuncio oficial del nuevo producto en el metaverso. La estrategia consistió en organizar un evento exclusivo, invitando a 15 representantes de la prensa a participar en una experiencia VR diseñada para comunicar y aprender sobre la incorporación de criptomonedas a la app.",
          project_included: [
            "Diseño del metaverso: Se desarrollaron espacios virtuales interactivos que reflejan la identidad de Ualá.",
            "Creación de personajes personalizados: Cada invitado podía seleccionar un avatar que representara su estilo personal.",
            "Interacción educativa: Los asistentes aprendieron sobre el nuevo producto en un entorno innovador, reforzando el mensaje de modernidad de la marca.",
          ],
        },
      },
      gallery: [
        { type: "image", src: uala1, large: true },
        { type: "image", src: uala2, large: true },
        { type: "image", src: uala3, small: true },
        { type: "image", src: uala4, small: true },
        { type: "image", src: uala5, small: true },
      ],
    },
    {
      id: "unaje",
      title: "UNAJE",
      subtitle: "Social Media Strategy",
      cover: unajeBg,
      pills: ["Content Creation", "Social Media", "Strategy"],
      hasUniqueLayout: true,
      translations: {
        en: {
          context:
            "They support entrepreneurs under 45 from all over the country and from all industries who seek a space for learning, support, and networking to achieve better management of their companies. Through a diverse community with +400 entrepreneurs from Argentina where they share their experiences and learn from others. They empower young entrepreneurs to create MORE AND BETTER COMPANIES IN ARGENTINA.",
          challenge:
            "Communication challenges: Improve interaction and proximity with the audience. Outdated content: Excessive use of static content and low adoption of modern formats such as reels and current trends. Low interaction: Lack of strategies to humanize the brand and generate greater engagement with the audience.",
          solution:
            "Audit and analysis: We conducted a detailed analysis of UNAJE's digital platforms, evaluating visual assets, content strategies, and communication channels. We identified strengths and weaknesses compared to key competitors.",
          project_included: [
            "Graphic redesign: We adapted the existing brand manual to enhance the visual identity and increase coherence between publications.",
            "Dynamic content generation: We incorporated reels and attractive audiovisual formats.",
            "Brand humanization: Publications with success stories of members and coverage of events to generate proximity.",
            "Increased interaction: Creation of participatory dynamics on social networks to foster community.",
            "Centralization of communication: Unification of the strategy in the national account.",
            "Strategic calendar: Organization and planning of content to maintain continuity.",
          ],
        },
        es: {
          context:
            "Acompañan a los/as empresarios/as sub-45 de todo el país y de todas las industrias que buscan un espacio de aprendizaje, contención y vinculación para lograr una mejor gestión de sus empresas. A través de una diversa comunidad con +400 empresarios/as de Argentina en donde comparten sus experiencias y aprenden de las de los demás. Potencian al empresariado jóven para crear MAS Y MEJORES EMPRESAS EN ARGENTINA.",
          challenge:
            "Desafíos de comunicación: Mejorar la interacción y cercanía con el público. Contenido desactualizado: Uso excesivo de contenido estático y una baja adopción de formatos modernos como reels y tendencias actuales. Baja interacción: Falta de estrategias para humanizar la marca y generar mayor compromiso con la audiencia.",
          solution:
            "Auditoría y análisis: Realizamos un análisis detallado de las plataformas digitales de UNAJE. Evaluamos activos visuales, estrategias de contenido y canales de comunicación. Identificamos fortalezas y debilidades en comparación con competidores clave.",
          project_included: [
            "Rediseño gráfico: Adaptamos el manual de marca existente para potenciar la identidad visual y aumentar la coherencia entre publicaciones.",
            "Generación de contenido dinámico: Incorporamos reels y formatos audiovisuales atractivos.",
            "Humanización de la marca: Publicaciones con historias de éxito de socios y cobertura de eventos para generar cercanía.",
            "Incremento en la interacción: Creación de dinámicas participativas en redes sociales para fomentar comunidad.",
            "Centralización de la comunicación: Unificación de la estrategia en la cuenta nacional.",
            "Calendario estratégico: Organización y planificación del contenido para mantener una continuidad.",
          ],
        },
      },
      gallery: [
        { type: "image", src: unaje1, rowPosition: "first-row" },
        { type: "image", src: unaje2, rowPosition: "first-row" },
        { type: "image", src: unaje3, rowPosition: "first-row" },
        { type: "image", src: unaje4, rowPosition: "second-row" },
        { type: "image", src: unaje5, rowPosition: "second-row" },
        { type: "image", src: unaje6, rowPosition: "second-row" },
        { type: "image", src: unaje7, rowPosition: "third-row-large" },
        { type: "image", src: unaje8, rowPosition: "third-row" },
        { type: "image", src: unaje9, rowPosition: "third-row" },
        { type: "image", src: unaje10, rowPosition: "fourth-row" },
      ],
    },
    {
      id: "chester",
      title: "Chester",
      subtitle: "NFT Development",
      cover: chester9,
      pills: ["NFT", "Web Dev", "Blockchain"],
      hasUniqueLayout: true,
      translations: {
        en: {
          context:
            "Chester is an iconic mascot character of PepsiCo's brand Cheetos. As a beloved brand figure, Chester has been central to Cheetos' marketing strategy for decades.",
          challenge:
            "Front labeling laws in Latin American countries required Pepsi to remove character mascots from their product packaging. The challenge was to find a way to maintain Chester as part of the brand identity without violating these new regulations.",
          solution:
            "We immortalized Chester in the metaverse by creating a collection of digital assets on the Ethereum blockchain. This approach allowed the character to continue being part of the brand in digital spaces, regardless of packaging restrictions.",
          project_included: [
            "NFT Collection Development: Creation of unique digital collectibles featuring Chester.",
            "Blockchain Implementation: Secure and verifiable digital ownership on Ethereum.",
            "Marketing Strategy: Comprehensive plan to introduce the NFT collection to Cheetos fans.",
            "Web Platform: Development of a dedicated website for the NFT collection.",
          ],
        },
        es: {
          context:
            "La ley de etiquetado frontal en los países latinoamericanos obligó a Pepsi a eliminar sus personajes de los paquetes de sus productos.",
          challenge:
            "Lograr que sus personajes continúen siendo parte de la marca sin ir en contra de las leyes.",
          solution:
            "Inmortalizamos la imagen de Chester en el metaverso con una colección de activos digitales en la cadena de bloques Ethereum.",
          project_included: [
            "Desarrollo de Colección NFT: Creación de coleccionables digitales únicos con Chester.",
            "Implementación Blockchain: Propiedad digital segura y verificable en Ethereum.",
            "Estrategia de Marketing: Plan integral para presentar la colección NFT a los fans de Cheetos.",
            "Plataforma Web: Desarrollo de un sitio web dedicado para la colección NFT.",
          ],
        },
      },
      gallery: [
        { type: "image", src: chester4, large: true },
        { type: "image", src: chester5, large: true },
        { type: "image", src: chester6, small: true },
        { type: "image", src: chester7, small: true },
        { type: "image", src: chester8, small: true },
      ],
    },
  ];

  useEffect(() => {
    // Find current project
    const currentProject = projects.find((p) => p.id === projectSlug);
    if (currentProject) {
      setProject(currentProject);

      // Set related projects (all except current)
      setRelatedProjects(projects.filter((p) => p.id !== projectSlug));

      // Always use center animation
      setAnimationDirection(0);

      // Clean up any stored direction
      try {
        localStorage.removeItem("projectTransitionDirection");
      } catch (e) {
        // Ignore errors
      }
    }

    // Reset exiting state when new project loads
    setIsExiting(false);

    // Always reset to context section when changing projects
    setCurrentSection("context");

    // Scroll to top when project changes
    window.scrollTo(0, 0);
  }, [projectSlug, t]);

  const handleBackClick = () => {
    // Set exiting state for animation
    setIsExiting(true);

    // Store a flag to scroll to projects section after redirect
    sessionStorage.setItem("scrollToProjects", "true");

    // Delay navigation to allow exit animation to play
    setTimeout(() => {
      navigate("/");
    }, 400);
  };

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  // Animation variants based on direction
  const pageVariants = {
    initial: {
      opacity: 0,
      x: animationDirection * 300,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      x: animationDirection * -300, // Reverse direction on exit
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (!project) return null;

  // Content based on language
  const projectContent = project.hasUniqueLayout
    ? project.translations[i18n.language || "en"]
    : { paragraphs: project.paragraphs };

  // Render Ualá's unique layout
  const renderUalaLayout = () => {
    return (
      <>
        <div className="mb-8 md:mb-16">
          <div
            className="bg-cover bg-center h-[304px] md:h-[608px] w-full rounded-lg mb-2"
            style={{ backgroundImage: `url(${project.cover})` }}
          ></div>
          <div className="flex justify-between items-center">
            <p className="text-sm">
              {i18n.t("project.role")}: {project.role}
            </p>
            <p className="text-sm">
              {i18n.t("project.date")}: {project.date}
            </p>
          </div>
        </div>

        <div>
          <div className="relative mb-12 md:mb-16 mx-auto">
            {/* Left fade indicator */}
            <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"></div>

            {/* Right fade indicator */}
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>

            {/* Scrollable container */}
            <div className="overflow-x-auto hide-scrollbar md:flex md:justify-center">
              <div className="flex gap-4 pb-2 md:pb-0">
                <button
                  className={`whitespace-nowrap px-3 md:px-6 py-2 rounded-lg text-xs md:text-base font-semibold transition-all ${
                    currentSection === "context"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentSection("context")}
                >
                  {i18n.t("project.context")}
                </button>
                <button
                  className={`whitespace-nowrap px-3 md:px-6 py-2 rounded-lg text-xs md:text-base font-semibold transition-all ${
                    currentSection === "challenge"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentSection("challenge")}
                >
                  {i18n.t("project.challenge")}
                </button>
                <button
                  className={`whitespace-nowrap px-3 md:px-6 py-2 rounded-lg text-xs md:text-base font-semibold transition-all ${
                    currentSection === "solution"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentSection("solution")}
                >
                  {i18n.t("project.solution")}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-16">
            {currentSection === "context" && (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: projectContent[
                    `${i18n.languageCode}_context`
                  ].replaceAll("\n", "<br />"),
                }}
              />
            )}
            {currentSection === "challenge" && (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: projectContent[
                    `${i18n.languageCode}_challenge`
                  ].replaceAll("\n", "<br />"),
                }}
              />
            )}
            {currentSection === "solution" && (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: projectContent[
                    `${i18n.languageCode}_solution`
                  ].replaceAll("\n", "<br />"),
                }}
              />
            )}
          </div>
        </div>

        <div className="mb-12 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {i18n.t("project.related")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <div
                key={relatedProject.id}
                className="cursor-pointer"
                onClick={() =>
                  (window.location.href = `/projects/${relatedProject.id}`)
                }
              >
                <div
                  className="bg-cover bg-center h-[200px] w-full rounded-lg mb-2"
                  style={{ backgroundImage: `url(${relatedProject.cover})` }}
                ></div>
                <h3 className="text-lg font-semibold mb-1">
                  {i18n.languageCode === "es"
                    ? relatedProject.title_es
                    : relatedProject.title_en}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  // Render UNAJE's unique layout
  const renderUnajeLayout = () => {
    return (
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-0 py-16">
        {/* Section navigation pills - Now with an "implementation" tab */}
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
              {[
                "context",
                "challenge",
                "solution",
                "implementation",
                "results",
              ].map((section) => (
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
                    : section === "implementation"
                    ? "Implementación"
                    : "Resultados"}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
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

            {/* Dynamic content based on selected section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {currentSection === "context" && (
                  <motion.div>
                    <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                      {i18n.language === "en" ? "About UNAJE" : "Sobre UNAJE"}
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

                {currentSection === "implementation" && (
                  <motion.div>
                    <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                      {i18n.language === "en"
                        ? "Implementation"
                        : "Implementación"}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {i18n.language === "en"
                        ? "The implementation of the UNAJE platform involved several key strategic components:"
                        : "La implementación de la plataforma UNAJE involucró varios componentes estratégicos clave:"}
                    </p>

                    <div className="space-y-8">
                      {/* Implementation details would go here */}
                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "Technical Architecture"
                            : "Arquitectura Técnica"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Built a robust, scalable platform using modern web technologies and cloud infrastructure."
                            : "Construimos una plataforma robusta y escalable utilizando tecnologías web modernas e infraestructura en la nube."}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "User Experience Design"
                            : "Diseño de Experiencia de Usuario"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Created an intuitive, accessible interface optimized for both desktop and mobile users."
                            : "Creamos una interfaz intuitiva y accesible optimizada tanto para usuarios de escritorio como móviles."}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "Content Management"
                            : "Gestión de Contenido"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Developed a flexible CMS allowing administrators to easily update and maintain platform content."
                            : "Desarrollamos un CMS flexible que permite a los administradores actualizar y mantener fácilmente el contenido de la plataforma."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentSection === "results" && (
                  <motion.div>
                    <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                      {i18n.language === "en" ? "Results" : "Resultados"}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {i18n.language === "en"
                        ? "The UNAJE platform launch achieved significant results across multiple dimensions:"
                        : "El lanzamiento de la plataforma UNAJE logró resultados significativos en múltiples dimensiones:"}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "User Engagement"
                            : "Compromiso del Usuario"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Saw a 200% increase in active user participation within the first three months."
                            : "Vimos un aumento del 200% en la participación activa de los usuarios en los primeros tres meses."}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "Digital Transformation"
                            : "Transformación Digital"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Successfully transitioned 90% of member services to the digital platform."
                            : "Transición exitosa del 90% de los servicios para miembros a la plataforma digital."}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "Membership Growth"
                            : "Crecimiento de Membresía"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Attracted 5,000+ new members in the first year, exceeding targets by 25%."
                            : "Atrajo a más de 5,000 nuevos miembros en el primer año, superando los objetivos en un 25%."}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "Operational Efficiency"
                            : "Eficiencia Operativa"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Reduced administrative overhead by 40% through automation."
                            : "Reducción del 40% en los gastos administrativos mediante la automatización."}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={project.gallery[0].src}
                        alt="UNAJE Results"
                        className="w-full object-cover rounded-lg"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Featured Image with floating effect */}
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

              {/* Feature Indicators */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/50 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <span className="text-xs font-medium text-white">Digital</span>
              </motion.div>

              <motion.div
                className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/50 flex items-center justify-center"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              >
                <span className="text-xs font-medium text-white">
                  Innovation
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
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

            {/* Small Images (remaining) */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.gallery
                .filter((item) => item.small)
                .map((item, idx) => (
                  <motion.div
                    key={`small-${idx}`}
                    className="rounded-lg overflow-hidden bg-gray-800 aspect-square"
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

            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="rounded-lg overflow-hidden bg-gray-800 aspect-video"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.1,
                  duration: 0.6,
                }}
              >
                <img
                  src={project.gallery[5].src}
                  alt={`${project.title} gallery featured 1`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="rounded-lg overflow-hidden bg-gray-800 aspect-video"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2,
                  duration: 0.6,
                }}
              >
                <img
                  src={project.gallery[6].src}
                  alt={`${project.title} gallery featured 2`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="rounded-lg overflow-hidden bg-gray-800 aspect-video md:col-span-2"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.3,
                  duration: 0.6,
                }}
              >
                <img
                  src={project.gallery[7].src}
                  alt={`${project.title} gallery featured 3`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
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

  // Render Chester's unique layout
  const renderChesterLayout = () => {
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
              {["context", "challenge", "solution", "services"].map(
                (section) => (
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
                )
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
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

            {/* Dynamic content based on selected section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {currentSection === "context" && (
                  <motion.div>
                    <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                      {i18n.language === "en"
                        ? "About the Project"
                        : "Sobre el Proyecto"}
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
                    <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                      {i18n.language === "en"
                        ? "Services Provided"
                        : "Servicios Proporcionados"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "NFT Collection Development"
                            : "Desarrollo de Colección NFT"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Creation of unique digital collectibles featuring Chester with varying rarity levels and attributes."
                            : "Creación de coleccionables digitales únicos con Chester con diferentes niveles de rareza y atributos."}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "Blockchain Implementation"
                            : "Implementación Blockchain"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Secure and verifiable digital ownership on Ethereum with smart contract development and testing."
                            : "Propiedad digital segura y verificable en Ethereum con desarrollo y prueba de contratos inteligentes."}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "Marketing Strategy"
                            : "Estrategia de Marketing"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Comprehensive plan to introduce the NFT collection to Cheetos fans, including social media campaigns and influencer partnerships."
                            : "Plan integral para presentar la colección NFT a los fans de Cheetos, incluyendo campañas en redes sociales y asociaciones con influencers."}
                        </p>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-purple-800/30">
                        <h4 className="text-lg font-semibold mb-3 text-purple-300">
                          {i18n.language === "en"
                            ? "Web Platform Development"
                            : "Desarrollo de Plataforma Web"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {i18n.language === "en"
                            ? "Creation of a dedicated website for the NFT collection, including minting functionality and showcase gallery."
                            : "Creación de un sitio web dedicado para la colección NFT, incluyendo funcionalidad de acuñación y galería de exhibición."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Featured Image with floating effect */}
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

  // Render regular project layout
  const renderRegularLayout = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column - Case Study & Title */}
          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-2">
              {t("casestudy.1", "CASE STUDY")}
            </h3>
            <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
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
          </motion.div>

          {/* Right Column - Paragraphs */}
          <motion.div
            className="col-span-1 md:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {project.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {project.gallery.map((item, idx) => (
            <motion.div
              key={idx}
              className="rounded-lg overflow-hidden bg-gray-800 aspect-video"
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
        </motion.div>

        {/* Related Projects / Footer */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8">
            {t("projects.featured", "Other Projects")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          {t("projects.learn_more", "View Case Study")}
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

  // Choose the layout based on project ID
  const renderProjectLayout = () => {
    if (project.id === "uala") {
      return (
        <UalaLayout
          project={project}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          projectContent={projectContent}
          relatedProjects={relatedProjects}
          projectSlug={projectSlug}
          i18n={i18n}
        />
      );
    }
    if (project.id === "unaje") {
      return (
        <UnajeLayout
          project={project}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          projectContent={projectContent}
          relatedProjects={relatedProjects}
          projectSlug={projectSlug}
          i18n={i18n}
        />
      );
    }
    if (project.id === "chester") {
      return (
        <ChesterLayout
          project={project}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          projectContent={projectContent}
          relatedProjects={relatedProjects}
          projectSlug={projectSlug}
          i18n={i18n}
        />
      );
    }
    return renderRegularLayout();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={projectSlug}
        ref={containerRef}
        className="w-full bg-black text-white"
        initial="initial"
        animate={isExiting ? "exit" : "animate"}
        exit="exit"
        variants={pageVariants}
      >
        {/* Add style for hiding scrollbars */}
        <style>{hideScrollbarStyles}</style>

        {/* Navbar */}
        <NavBar scrollToSection={scrollToSection} />

        {/* Header Section with Background Image */}
        <div className="relative h-[50vh] w-full overflow-hidden mt-20">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <motion.img
            src={project.cover}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.h1
              className="text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {project.title}
            </motion.h1>
          </div>
          <motion.button
            onClick={handleBackClick}
            className="absolute top-8 left-8 z-[100] flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ChevronLeft className="h-5 w-5" />
            {i18n.language === "en" ? "Back" : "Volver"}
          </motion.button>
        </div>

        {/* Content Section - switch layouts based on project type */}
        {renderProjectLayout()}

        {/* Main Footer */}
        <Footer scrollToSection={scrollToSection} />
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;
