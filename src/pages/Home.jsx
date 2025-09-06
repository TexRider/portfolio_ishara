import React, { useState } from "react";
import HeroSection from "../components/HeroSection.jsx";
import PortfolioPage from "./PortfolioPage.jsx";
import AboutUs from "./AboutUs.jsx";
import MusicPlayer from "../components/MusicPlayer.jsx";
import Gallery from "../components/Gallery";
import LoadingScreen from "../components/LoadingScreen";

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

        {/* Music Player Component */}
        <MusicPlayer />
      </div>
    </>
  );
};

export default Home;