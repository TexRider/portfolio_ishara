import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom smooth scroll function with ease-in-out
  const smoothScrollTo = (targetPosition, duration = 800) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Easing function: easeInOutCubic
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easeProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Smooth scroll to section with custom animation
  const handleLinkClick = (href) => {
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        // Use custom smooth scroll with easing
        smoothScrollTo(targetPosition, 1000); // 1000ms duration
      }
    }
  };

  // Navigation items - updated to match Home.jsx sections
  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FBF9D1]/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#hero");
              }}
              className="text-2xl font-bold bg-gradient-to-r from-[#9A3F3F] to-[#C1856D] bg-clip-text text-transparent cursor-pointer"
            >
              Portfolio
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="text-[#9A3F3F] hover:text-[#C1856D] font-medium transition-colors duration-300 relative group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C1856D] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Call to Action Button */}
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
              className="bg-gradient-to-r from-[#9A3F3F] to-[#C1856D] text-[#FBF9D1] px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col space-y-1.5 z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-[#9A3F3F] block"
            ></motion.span>
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-[#9A3F3F] block"
            ></motion.span>
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-[#9A3F3F] block"
            ></motion.span>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#FBF9D1]/95 backdrop-blur-lg rounded-lg mt-4 overflow-hidden shadow-xl"
            >
              <div className="flex flex-col space-y-4 py-6 px-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.href);
                      }}
                      className="block py-2 text-[#9A3F3F] hover:text-[#C1856D] font-medium transition-colors duration-300 cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4"
                >
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("#contact");
                    }}
                    className="block w-full text-center bg-gradient-to-r from-[#9A3F3F] to-[#C1856D] text-[#FBF9D1] px-6 py-3 rounded-full font-medium shadow-lg cursor-pointer"
                  >
                    Get in Touch
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;