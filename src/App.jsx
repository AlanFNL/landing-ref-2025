import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./App.css";

import Hero from "./components/Hero";
import Bento from "./components/Bento";
import { ServicesSection } from "./components/ServiceSection";
import Contact from "./components/Contact";
import BrandCarousel from "./components/BrandCarousel";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";

function App() {
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const clientsRef = useRef(null);

  const scrollToSection = (ref) => {
    switch (ref) {
      case "aboutUs":
        aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "services":
        servicesRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "projects":
        projectsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "clients":
        clientsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        contactRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <motion.div className="w-screen h-fit overflow-clip bg-black">
        <NavBar />
        <Hero />
        <BrandCarousel />
        <ServicesSection />
        <Bento />

        <BrandCarousel />
        <Contact />
        <Testimonials />
        <FAQ />

        <Footer />
      </motion.div>
    </>
  );
}

export default App;
