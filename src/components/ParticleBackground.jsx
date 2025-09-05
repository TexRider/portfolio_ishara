import React from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground = () => {
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#ffffff", // White background
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Particles repulse on hover
            },
            onClick: {
              enable: true,
              mode: "push", // Particles push away on click
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100, // Repulsion distance
              duration: 0.4,
            },
            push: {
              quantity: 4, // Number of particles to push
            },
          },
        },
        particles: {
          color: {
            value: "#3b82f6", // Blue particles (Tailwind blue-500)
          },
          links: {
            color: "#93c5fd", // Light blue links (Tailwind blue-300)
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80, // Number of particles
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 }, // Random size between 1-5
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;