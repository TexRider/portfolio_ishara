import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Linkedin, Github } from "lucide-react";
import CountUp from "../components/CountUp"; // Import the CountUp component

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Ishara Perera",
    role: "Owner",
    image: "/Ishara_Profile/Cosplay_2.jpg",
    description:
      "I am a passionate wooden props artisan dedicated to crafting unique, story-driven pieces that ignite creativity and elevate any setting. From theatrical productions and film sets to photo shoots and bespoke displays, my work blends traditional craftsmanship with artistic vision. Each prop is meticulously handcrafted, ensuring it embodies character, authenticity, and timeless beauty. For me, wood is not just a material—it's a canvas for imagination.",
    skills: ["Crafter", "Cosplayer"],
    // email: "sarah@company.com",
    // linkedin: "https://linkedin.com/in/sarahjohnson",
    // github: "https://github.com/sarahjohnson",
  },
  // Leave this to add more members to the portfolio
];

// Animation variants
const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow:
      "0 10px 25px -5px rgba(154, 63, 63, 0.3), 0 8px 10px -6px rgba(154, 63, 63, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#7a2f2f", // Use hex instead of Tailwind class
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

const skillVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#9A3F3F", // Use hex instead of Tailwind class
    color: "#FBF9D1", // Use hex instead of Tailwind class
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Team Member Modal Component
const TeamMemberModal = ({ member, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && member && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-75 z-[1000] flex items-center justify-center p-2 sm:p-4"
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
              >
                <X
                  size={18}
                  className="sm:size-6 text-gray-600 dark:text-gray-300"
                />
              </button>

              {/* Image Section - Full width square image */}
              <div className="lg:w-2/5 flex-shrink-0">
                <div className="w-full h-64 sm:h-80 lg:h-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover lg:rounded-l-xl"
                  />
                </div>
              </div>

              {/* Content Section - Right Side */}
              <div className="lg:w-3/5 flex flex-col overflow-y-auto p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h2>
                <p className="text-lg text-[#C1856D] dark:text-[#E6CFA9] font-medium mb-4">
                  {member.role}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-base sm:text-lg leading-relaxed">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-[#E6CFA9] dark:bg-[#C1856D] text-[#9A3F3F] dark:text-[#FBF9D1] rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {member.email && (
                    <motion.a
                      href={`mailto:${member.email}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-[#9A3F3F] text-[#FBF9D1] rounded-lg hover:bg-[#C1856D] transition-colors font-semibold text-sm sm:text-base"
                    >
                      <Mail size={18} />
                      <span>Email</span>
                    </motion.a>
                  )}
                  {member.linkedin && (
                    <motion.a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#005582] transition-colors font-semibold text-sm sm:text-base"
                    >
                      <Linkedin size={18} />
                      <span>LinkedIn</span>
                    </motion.a>
                  )}
                  {member.github && (
                    <motion.a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-semibold text-sm sm:text-base"
                    >
                      <Github size={18} />
                      <span>GitHub</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AboutUs = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <motion.section
      className="py-20 bg-[#FBF9D1] relative overflow-hidden min-h-screen"
      variants={fadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      exit="exit"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#E6CFA9] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C1856D] rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-[#9A3F3F] mb-4"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-[#9A3F3F] max-w-3xl mx-auto mb-8"
          >
            I am a passionate crafter, dedicated to create exceptional wooden
            props and equipments. All are hand-made with care for quality based
            design.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-[#C1856D] mx-auto"
          />
        </motion.div>

        {/* Stats Section - Updated with CountUp animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { number: 50, label: "Props crafted", suffix: "+" },
            { number: 4, label: "Years Experience", suffix: "+" },
            { number: 100, label: "Client Satisfaction", suffix: "%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 15px -3px rgba(154, 63, 63, 0.2), 0 4px 6px -4px rgba(154, 63, 63, 0.2)",
                transition: { duration: 0.3 },
              }}
              className="text-center p-6 bg-[#E6CFA9] rounded-lg shadow-lg border-2 border-[#9A3F3F] border-opacity-10 cursor-pointer"
            >
              <h3 className="text-4xl font-bold text-[#9A3F3F] mb-2">
                <CountUp
                  from={0}
                  to={stat.number}
                  duration={2}
                  delay={0.2 * index}
                  separator=","
                  className="count-up-text"
                />
                {stat.suffix}
              </h3>
              <p className="text-[#9A3F3F]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section - Enhanced hover effects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="space-y-12 mb-16"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
              className={`flex flex-col ${
                member.id % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              } bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#E6CFA9] transition-all duration-300 cursor-pointer`}
              onClick={() => handleMemberClick(member)}
            >
              {/* Image Section with enhanced hover */}
              <div className="md:w-2/5 h-80 flex items-center justify-center bg-gray-100 overflow-hidden relative">
                <motion.div
                  className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#E6CFA9] shadow-md"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Overlay effect on hover */}
                <AnimatePresence>
                  {hoveredMember === member.id && (
                    <motion.div
                      className="absolute inset-0 bg-[#9A3F3F] bg-opacity-20 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-white text-lg font-semibold bg-[#9A3F3F] bg-opacity-80 py-2 px-4 rounded-full"
                      >
                        View Profile
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Section */}
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <motion.h3
                  className="text-2xl font-bold text-[#9A3F3F] mb-2"
                  whileHover={{ color: "#7a2f2f" }}
                  transition={{ duration: 0.2 }}
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  className="text-lg text-[#C1856D] font-medium mb-4"
                  whileHover={{ color: "#9A3F3F" }}
                  transition={{ duration: 0.2 }}
                >
                  {member.role}
                </motion.p>
                <motion.p
                  className="text-gray-700 mb-6 leading-relaxed"
                  whileHover={{ color: "#5a5a5a" }}
                  transition={{ duration: 0.2 }}
                >
                  {member.description}
                </motion.p>

                <div className="mb-6">
                  <motion.h4
                    className="text-lg font-semibold text-[#9A3F3F] mb-3"
                    whileHover={{ color: "#7a2f2f" }}
                    transition={{ duration: 0.2 }}
                  >
                    Skills & Expertise
                  </motion.h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        variants={skillVariants}
                        whileHover="hover"
                        className="px-3 py-1 bg-[#E6CFA9] text-[#9A3F3F] rounded-full text-sm cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="self-start bg-[#9A3F3F] text-white py-2 px-6 rounded-lg font-medium transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMemberClick(member);
                  }}
                >
                  Contact {member.name.split(" ")[0]}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.3 },
          }}
          className="bg-[#9A3F3F] rounded-2xl p-8 md:p-12 text-center cursor-pointer"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold mb-6 text-[#FBF9D1]"
          >
            Our Mission
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#E6CFA9] leading-relaxed max-w-4xl mx-auto"
          >
            "Every grain of wood holds a story, and I bring that story to life.
            My mission is to transform raw timber into captivating props that
            whisper tales of imagination and wonder. Each creation is more than
            an object—it's a character, a mood, a spark of artistry crafted by
            hand, designed to enchant stages, sets, and souls alike."
          </motion.p>
        </motion.div>
      </div>

      {/* Team Member Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.section>
  );
};

export default AboutUs;