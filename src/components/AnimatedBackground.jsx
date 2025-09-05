import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  // Create a grid of dots
  const dots = [];
  const rows = 10;
  const cols = 10;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dots.push({
        id: `${i}-${j}`,
        x: (j / (cols - 1)) * 100,
        y: (i / (rows - 1)) * 100
      });
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {dots.map((dot) => (
          <motion.circle
            key={dot.id}
            cx={dot.x}
            cy={dot.y}
            r="0.5"
            fill="#3b82f6"
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Animated lines connecting dots */}
        <motion.path
          d="M0,0 L100,100"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M100,0 L0,100"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;