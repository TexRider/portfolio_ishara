import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Track actual page loading progress
    const updateProgress = () => {
      // Simulate loading process (replace with actual resource tracking if needed)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsComplete(true);
            setTimeout(() => onLoadingComplete(), 500);
            return 100;
          }
          
          // Accelerate progress at the beginning, slow down at the end
          let increment = 1;
          if (prev > 80) increment = 0.5;
          if (prev > 90) increment = 0.3;
          if (prev > 95) increment = 0.2;
          
          return prev + increment;
        });
      }, 30);
      
      return () => clearInterval(interval);
    };

    // Start loading when component mounts
    const loadingTimer = setTimeout(updateProgress, 1000);
    
    return () => clearTimeout(loadingTimer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-[#FBF9D1] mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              WebFolio Solutions
            </motion.h1>
            <motion.p 
              className="text-[#E6CFA9]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let your portfolio become your infobase
            </motion.p>
          </div>
          
          <div className="w-64 md:w-80 h-2 bg-[#2a2a2a] rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-[#9A3F3F] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          
          <motion.div 
            className="text-[#E6CFA9] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.div>

          <motion.div 
            className="absolute bottom-8 text-[#C1856D] text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {progress < 30 && "Initializing..."}
            {progress >= 30 && progress < 60 && "Loading assets..."}
            {progress >= 60 && progress < 90 && "Finalizing..."}
            {progress >= 90 && progress < 95 && "Almost ready..."}
            {progress >= 95 && "Loading Complete"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;