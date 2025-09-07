import React, { useState } from "react";
import HeroSection from "../components/HeroSection.jsx";
import PortfolioPage from "./PortfolioPage.jsx";
import AboutUs from "./AboutUs.jsx";
import ContactUs from "./ContactUs.jsx";
import MiniMusicPlayer from "../components/MusicPlayer.jsx";
import Gallery from "../components/Gallery";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "./Footer.jsx";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Ensure scrolling is enabled after loading
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      
      <div 
        className="min-h-screen relative overflow-hidden" 
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        {/* Content */}
        <div id="hero">
          <HeroSection />
        </div>

        <div id="portfolio">
          <PortfolioPage />
        </div>

        {/* Gallery Section */}
        <div id="gallery">
          <Gallery />
        </div>

        <div id="about">
          <AboutUs />
        </div>

        <div id="contact">
          <ContactUs />
        </div>

        <Footer />

        {/* Music Player Component */}
        <MiniMusicPlayer />
      </div>
    </>
  );
};

export default Home;