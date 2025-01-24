import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

import Hero from "./components/Hero";
import Bento from "./components/Bento";
import { ServicesSection } from "./components/ServiceSection";
import Contact from "./components/Contact";
import BrandCarousel from "./components/BrandCarousel";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ReactLenis } from "lenis/dist/lenis-react";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";

function App() {
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const clientsRef = useRef(null);
  const [contactView, setContactView] = useState("options");
  const [openCalendly, setOpenCalendly] = useState(false);

  const smoothScroll = (target, duration = 1000) => {
    const targetPosition =
      target === 0 ? 0 : target.getBoundingClientRect().top;
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

  const scrollToSection = (ref, view, openCalendlyPopup = false) => {
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
  };

  return (
    <>
      <motion.div className="w-screen h-fit overflow-clip bg-black">
        <ReactLenis
          root
          options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
        >
          <NavBar scrollToSection={scrollToSection} />
          <Hero scrollToSection={scrollToSection} />
          <BrandCarousel />
          <div ref={servicesRef}>
            <ServicesSection scrollToSection={scrollToSection} />
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
          <FAQ />
          <Footer scrollToSection={scrollToSection} />
        </ReactLenis>
      </motion.div>
    </>
  );
}

export default App;
