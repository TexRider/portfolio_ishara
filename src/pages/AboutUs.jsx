// AboutUs.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Team member data
const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'With over 10 years of experience in the industry, Sarah leads our team with vision and passion. She believes in creating products that make a difference in people\'s lives.',
    skills: ['Leadership', 'Strategy', 'Innovation']
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Michael is a full-stack developer with expertise in modern web technologies. He enjoys solving complex problems and building scalable applications.',
    skills: ['JavaScript', 'React', 'Node.js']
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Emily creates intuitive and beautiful user experiences. She believes good design should be both functional and delightful for users.',
    skills: ['UI/UX Design', 'User Research', 'Prototyping']
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'David develops comprehensive marketing strategies that drive growth and engagement. He is passionate about building brand identity.',
    skills: ['Digital Marketing', 'SEO', 'Brand Strategy']
  },
  {
    id: 5,
    name: 'Alex Turner',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Alex oversees product development from conception to launch, ensuring our solutions meet market needs and user expectations.',
    skills: ['Product Strategy', 'Agile', 'Market Research']
  }
];

// Animation variants
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(154, 63, 63, 0.3), 0 8px 10px -6px rgba(154, 63, 63, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#7a2f2f",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

const skillVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#9A3F3F",
    color: "#FBF9D1",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const AboutUs = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);

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
            About Our Team
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-[#9A3F3F] max-w-3xl mx-auto mb-8"
          >
            We're a passionate team dedicated to creating exceptional digital experiences that make a difference.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-[#C1856D] mx-auto"
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '15+', label: 'Years Experience' },
            { number: '100%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(154, 63, 63, 0.2), 0 4px 6px -4px rgba(154, 63, 63, 0.2)",
                transition: { duration: 0.3 }
              }}
              className="text-center p-6 bg-[#E6CFA9] rounded-lg shadow-lg border-2 border-[#9A3F3F] border-opacity-10 cursor-pointer"
            >
              <h3 className="text-4xl font-bold text-[#9A3F3F] mb-2">{stat.number}</h3>
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
              className={`flex flex-col ${member.id % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#E6CFA9] transition-all duration-300 cursor-pointer`}
              onClick={() => setSelectedMember(member)}
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
                    setSelectedMember(member);
                  }}
                >
                  Contact {member.name.split(' ')[0]}
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
            transition: { duration: 0.3 }
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
            We believe in the power of technology to transform businesses and improve lives. 
            Our mission is to deliver innovative solutions that exceed expectations and 
            create lasting value for our clients and their customers.
          </motion.p>
        </motion.div>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "#E6CFA9" }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 text-[#9A3F3F] bg-[#FBF9D1] rounded-full p-2 z-10"
                  onClick={() => setSelectedMember(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
                
                {/* Modal Image */}
                <div className="h-64 w-full flex items-center justify-center bg-gray-100">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#E6CFA9] shadow-md">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#9A3F3F] mb-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-lg text-[#C1856D] font-medium mb-4">{selectedMember.role}</p>
                  <p className="text-gray-700 mb-6">{selectedMember.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-[#9A3F3F] mb-3">Skills & Expertise</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedMember.skills.map((skill, index) => (
                        <motion.span 
                          key={index}
                          whileHover={{ scale: 1.05, backgroundColor: "#9A3F3F", color: "#FBF9D1" }}
                          className="px-3 py-1 bg-[#E6CFA9] text-[#9A3F3F] rounded-full text-sm cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-4 border-t border-gray-200">
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "#7a2f2f" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-[#9A3F3F] text-white py-2 rounded-lg font-medium"
                    >
                      Contact {selectedMember.name.split(' ')[0]}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default AboutUs;