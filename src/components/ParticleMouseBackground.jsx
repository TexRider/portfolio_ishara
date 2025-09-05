import React, { useCallback, useEffect, useRef, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";

const ParticleMouseBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Track if particles are loaded
  const [particlesReady, setParticlesReady] = useState(false);
  const particlesLoaded = useCallback(async (container) => {
    setParticlesReady(true);
  }, []);

  // Create a reference for the particles container
  const particlesRef = useRef();

  // Mouse position state for the custom cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // Check if device is touch-enabled
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch devices on component mount
  useEffect(() => {
    const checkTouchDevice = () => {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    };
    
    setIsTouchDevice(checkTouchDevice());
  }, []);

  // Track mouse movement - only on non-touch devices
  useEffect(() => {
    if (isTouchDevice) return; // Exit if touch device
    
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      // Only interact with particles if they're loaded and available
      if (particlesRef.current && particlesReady) {
        // Add null checks for safety
        if (
          particlesRef.current.internal &&
          particlesRef.current.internal.interactivity
        ) {
          particlesRef.current.internal.interactivity.mouse.position = {
            x: e.clientX,
            y: e.clientY,
          };

          // Refresh particle interactions
          if (particlesRef.current.internal.particles) {
            particlesRef.current.internal.particles.autoPlay();
          }
        }
      }
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [particlesReady, isTouchDevice]);

  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      opacity: 0.7,
      backgroundColor: "#3b82f6",
      mixBlendMode: "difference",
    },
    text: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 2,
      opacity: 0.5,
      backgroundColor: "#ef4444",
      mixBlendMode: "difference",
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      opacity: 0.8,
      backgroundColor: "#10b981",
      mixBlendMode: "difference",
    },
  };

  return (
    <>
      {/* Particle Background with Mouse Interaction */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#000000",
              },
            },
            fpsLimit: 120,
            interactivity: {
              // Disable interactivity on touch devices
              events: {
                onHover: {
                  enable: !isTouchDevice,
                  mode: "bubble", // Particles will bubble around cursor
                },
                onClick: {
                  enable: !isTouchDevice,
                  mode: "push", // Click to push particles away
                },
              },
              modes: {
                bubble: {
                  distance: 100,
                  size: 6,
                  duration: 2,
                  opacity: 0.8,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 150,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#3b82f6", // Blue particles
              },
              links: {
                color: "#93c5fd", // Light blue links
                distance: 120,
                enable: true,
                opacity: 0.4,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 1.5, // Slower movement for smoother effect
                straight: false,
                attract: {
                  enable: true,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 20, // Reduced number for performance
              },
              opacity: {
                value: 0.5,
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1,
                  sync: false,
                },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 4 }, // Smaller size range
                animation: {
                  enable: true,
                  speed: 3,
                  minimumValue: 0.1,
                  sync: false,
                },
              },
              // Add lifetime configuration to limit particle duration to 2 seconds
              life: {
                duration: {
                  value: 2, // 2 seconds lifetime
                },
              },
            },
            detectRetina: true,
          }}
          ref={particlesRef}
        />
      </div>

      {/* Smooth Mouse Follower - only show on non-touch devices */}
      {!isTouchDevice && (
        <>
          <motion.div
            className="cursor"
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          />

          {/* Trailing dot for smoother effect */}
          <motion.div
            className="cursor-trail"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              pointerEvents: "none",
              zIndex: 9998,
              opacity: 0.5,
            }}
          />
        </>
      )}
    </>
  );
};

export default ParticleMouseBackground;