import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const mobileNumber = "+94 76 198-7997"; // Replace with your actual number

  const copyToClipboard = () => {
    navigator.clipboard.writeText('+' + mobileNumber.replace(/\D/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Color palette from your specification
  const colors = {
    primary: '#9A3F3F',    // Deep red
    secondary: '#C1856D',  // Muted terracotta
    accent: '#E6CFA9',     // Warm beige
    light: '#FBF9D1'       // Soft cream
  };

  return (
    <footer className="pt-12 pb-8 px-4 md:px-8" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-6xl mx-auto">
        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: colors.light }}>Let's Work Together</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center rounded-lg p-3 md:p-4 w-full md:w-auto justify-center"
              style={{ backgroundColor: colors.secondary }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.light }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-base md:text-lg font-medium" style={{ color: colors.light }}>{mobileNumber}</span>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="flex items-center rounded-lg px-4 py-3 transition-colors w-full md:w-auto justify-center mt-2 md:mt-0"
              style={{ backgroundColor: colors.accent }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span className="text-sm md:text-base" style={{ color: colors.primary }}>{copied ? 'Copied!' : 'Copy Number'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Social Links & Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <motion.h3 
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold mb-4 text-center md:text-left"
              style={{ color: colors.light }}
            >
              WebFolio Solutions
            </motion.h3>
            <p className="text-center md:text-left text-sm md:text-base" style={{ color: colors.accent }}>
              Crafting beautiful digital experiences that stand out.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>Quick Links</h4>
            <ul className="flex flex-col items-center gap-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="transition-colors hover:underline text-sm md:text-base"
                    style={{ color: colors.accent }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.light }}>Follow Me</h4>
            <div className="flex gap-3 md:gap-4">
              {[
                { name: 'GitHub', icon: 'G', url: '#' },
                { name: 'LinkedIn', icon: 'L', url: '#' },
                { name: 'Twitter', icon: 'T', url: '#' },
                { name: 'Instagram', icon: 'I', url: '#' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: colors.secondary, color: colors.light }}
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <div className="font-bold text-sm md:text-base">{social.icon}</div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Copyright & Back to Top */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t"
          style={{ borderColor: colors.secondary }}
        >
          <p className="text-xs md:text-sm mb-4 md:mb-0 text-center md:text-left" style={{ color: colors.accent }}>
            © {new Date().getFullYear()} Webfolio Solutions. All rights reserved.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center transition-colors text-sm md:text-base"
            style={{ color: colors.accent }}
          >
            Back to Top
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.accent }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;