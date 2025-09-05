import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SmoothMouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Variants for different cursor states
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      opacity: 0.7,
      backgroundColor: "#3b82f6", // Blue dot
    },
    text: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 2,
      opacity: 0.5,
      backgroundColor: "#ef4444", // Red when over text
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      opacity: 0.8,
      backgroundColor: "#10b981", // Green when clicking
    }
  };

  // Handle mouse enter/leave for text elements
  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference"
        }}
      />
      
      {/* Optional trailing dots for smoother effect */}
      <motion.div
        className="cursor-trail"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#6b7280",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0.5
        }}
      />
    </>
  );
};

export default SmoothMouseFollower;