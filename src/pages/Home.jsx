// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection.jsx";
import PortfolioPage from "./PortfolioPage.jsx";
import AboutUs from "./AboutUs.jsx";
import MusicPlayer from "../components/MusicPlayer.jsx";
import Gallery from "../components/Gallery"; // Import the Gallery component

const Home = () => {
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Content */}
      <motion.div
        id="hero"
        className="relative z-10"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        exit="exit"
      >
        <HeroSection />
      </motion.div>

      <motion.div
        id="portfolio"
        className="relative z-10"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        exit="exit"
      >
        <PortfolioPage />
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        id="gallery"
        className="relative z-10"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        exit="exit"
      >
        <Gallery />
      </motion.div>

      <motion.div
        id="about"
        className="relative z-10"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        exit="exit"
      >
        <AboutUs />
      </motion.div>

      {/* Music Player Component */}
      <MusicPlayer />
    </div>
  );
};

export default Home;
