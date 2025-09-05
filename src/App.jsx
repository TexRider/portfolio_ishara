// App.jsx
import React from "react";
import { motion } from "framer-motion";
import EnhancedParticleBackground from "./components/Background"; 
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Particle Background - Full Screen */}
      <div className="fixed inset-0 z-0">
        <EnhancedParticleBackground />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <Navbar />

        {/* Home Page Content */}
        <Home />
      </div>
    </div>
  );
}

export default App;