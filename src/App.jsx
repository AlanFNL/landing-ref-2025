import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import "./App.css";
import { ScrollContext } from "./providers.jsx";

import Hero from "./components/Hero";
import Bento from "./components/Bento";
import { StorytellingServices } from "./components/StorytellingServices";
import Contact from "./components/Contact";
import BrandCarousel from "./components/BrandCarousel";
import Projects from "./components/Projects";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ReactLenis } from "lenis/dist/lenis-react";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import VideoShowcase from "./components/VideoShowcase.jsx";
import OurWork from "./components/OurWork.jsx";

// Export the smoothScroll function for use in other components
export const smoothScroll = (target, duration = 1000) => {
  const targetPosition = target === 0 ? 0 : target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
};

function App() {
  const isServer = typeof window === "undefined";
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const clientsRef = useRef(null);
  const projectsRef = useRef(null);
  const [contactView, setContactView] = useState("options");
  const [openCalendly, setOpenCalendly] = useState(false);
  const { setScrollFunction } = useContext(ScrollContext);

  const scrollToSection = useCallback(
    (ref, view, openCalendlyPopup = false) => {
      switch (ref) {
        case "aboutUs":
          smoothScroll(0);
          break;
        case "services":
          if (servicesRef.current) {
            smoothScroll(servicesRef.current);
          }
          break;
        case "clients":
          if (clientsRef.current) {
            smoothScroll(clientsRef.current);
          }
          break;
        case "projects":
          if (projectsRef.current) {
            smoothScroll(projectsRef.current);
          }
          break;
        case "contact":
          if (contactRef.current) {
            smoothScroll(contactRef.current);
            setTimeout(() => {
              setContactView(view);
              if (openCalendlyPopup) {
                setOpenCalendly(true);
              }
            }, 800);
          }
          break;
        default:
          break;
      }
    },
    [setContactView, setOpenCalendly] // servicesRef, contactRef etc. are stable from useRef
  );

  // Register the scrollToSection function with the context
  useEffect(() => {
    // setScrollFunction is the state setter from AppWrapper's useState, it's stable.
    // We pass the App's scrollToSection (which is wrapped in useCallback)
    setScrollFunction(scrollToSection);
  }, [setScrollFunction, scrollToSection]); // Add scrollToSection to dependencies

  // Check for scroll flags in sessionStorage
  useEffect(() => {
    // Check for any of our navigation flags
    const shouldScrollToProjects = sessionStorage.getItem("scrollToProjects");
    const shouldScrollToServices = sessionStorage.getItem("scrollToservices");
    const shouldScrollToClients = sessionStorage.getItem("scrollToclients");
    const shouldScrollToContact = sessionStorage.getItem("scrollTocontact");
    const shouldScrollToAboutUs = sessionStorage.getItem("scrollToaboutUs");

    // Add a small delay to ensure the page is fully loaded and rendered
    setTimeout(() => {
      if (shouldScrollToProjects === "true" && projectsRef.current) {
        sessionStorage.removeItem("scrollToProjects");
        smoothScroll(projectsRef.current);
      } else if (shouldScrollToServices === "true" && servicesRef.current) {
        sessionStorage.removeItem("scrollToservices");
        smoothScroll(servicesRef.current);
      } else if (shouldScrollToClients === "true" && clientsRef.current) {
        sessionStorage.removeItem("scrollToclients");
        smoothScroll(clientsRef.current);
      } else if (shouldScrollToContact === "true" && contactRef.current) {
        sessionStorage.removeItem("scrollTocontact");
        smoothScroll(contactRef.current);
      } else if (shouldScrollToAboutUs === "true") {
        sessionStorage.removeItem("scrollToaboutUs");
        smoothScroll(0);
      }
    }, 300);
  }, []);

  return (
    <>
      <motion.div className="w-screen h-fit overflow-clip bg-black">
        {isServer ? (
          <>
            <NavBar scrollToSection={scrollToSection} />
            <Hero scrollToSection={scrollToSection} />
            <BrandCarousel />
            <div ref={servicesRef}>
              <StorytellingServices scrollToSection={scrollToSection} />
            </div>
            <div ref={projectsRef}>
              <OurWork scrollToSection={scrollToSection} />
            </div>

            <Bento scrollToSection={scrollToSection} />
            <div ref={clientsRef}>
              <BrandCarousel />
            </div>

            <div ref={contactRef}>
              <Contact
                initialView={contactView}
                openCalendly={openCalendly}
                setOpenCalendly={setOpenCalendly}
              />
            </div>
            <Testimonials />
            <FAQ />

            <Footer scrollToSection={scrollToSection} />
          </>
        ) : (
          <ReactLenis
            root
            options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
          >
            <NavBar scrollToSection={scrollToSection} />
            <Hero scrollToSection={scrollToSection} />
            <BrandCarousel />
            <div ref={servicesRef}>
              <StorytellingServices scrollToSection={scrollToSection} />
            </div>
            <div ref={projectsRef}>
              <OurWork scrollToSection={scrollToSection} />
            </div>

            <Bento scrollToSection={scrollToSection} />
            <div ref={clientsRef}>
              <BrandCarousel />
            </div>

            <div ref={contactRef}>
              <Contact
                initialView={contactView}
                openCalendly={openCalendly}
                setOpenCalendly={setOpenCalendly}
              />
            </div>
            <Testimonials />
            <FAQ />

            <Footer scrollToSection={scrollToSection} />
          </ReactLenis>
        )}
      </motion.div>
    </>
  );
}

// Export App's scrollToSection function for use in other components
export const getScrollToSection = () => {
  const appInstance = document.getElementById("root");
  if (appInstance && appInstance._reactRootContainer) {
    return appInstance._reactRootContainer._internalRoot.current.child
      .memoizedState.refs.scrollToSection;
  }
  return null;
};

export default App;
