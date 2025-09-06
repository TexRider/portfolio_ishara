// HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // Floating animation for the image
  const floatVariants = {
    animate: {
      y: ["0%", "-3%", "0%"],
      transition: {
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-white py-16 bg-transparent"
      variants={fadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      exit="exit"
    >
      {/* Remove the background gradient div */}
      <div className="container mx-auto px-4 z-10 mt-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              variants={textVariants}
            >
              Hi, I'm <span style={{ color: "#FBF9D1" }}>Ishara Perera</span>
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6"
              style={{ color: "#C1856D" }}
              variants={textVariants}
            >
              Wood Crafter and Cosplay Prop Designer
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl mb-8"
              style={{ color: "#9A3F3F" }}
              variants={textVariants}
            >
              I craft source-accurate props for cosplay, design and fashion purposes. My props are crafted with wood, and 3D printed crafting. 
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              variants={textVariants}
            >
              <button 
                className="px-6 py-3 font-semibold rounded-lg transition-colors shadow-lg"
                style={{ backgroundColor: "#FBF9D1", color: "#9A3F3F" }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#E6CFA9"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#FBF9D1"}
              >
                View My Work
              </button>
              <button 
                className="px-6 py-3 border-2 font-semibold rounded-lg transition-colors"
                style={{ borderColor: "#FBF9D1", color: "#FBF9D1" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#FBF9D1";
                  e.target.style.color = "#9A3F3F";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#FBF9D1";
                }}
              >
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* Image Container with floating animation */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
              variants={floatVariants}
              animate="animate"
            >
              <div 
                className="absolute inset-0 rounded-full shadow-2xl transform rotate-6"
                style={{ background: "linear-gradient(to bottom right, #C1856D, #9A3F3F)" }}
              ></div>
              <div 
                className="absolute inset-0 rounded-full shadow-2xl transform -rotate-6"
                style={{ background: "linear-gradient(to bottom right, #C1856D, #9A3F3F)" }}
              ></div>
              <div 
                className="relative rounded-full w-full h-full overflow-hidden border-4 shadow-xl"
                style={{ borderColor: "#FBF9D1", backgroundColor: "#9A3F3F" }}
              >
                {/* Profile Image */}
                <img 
                  src="/Ishara_Profile/Profile_Image.jpg" 
                  alt="Ishara Perera" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div 
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: "#FBF9D1" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-1 h-3 rounded-full mt-2"
            style={{ backgroundColor: "#FBF9D1" }}
          ></motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;