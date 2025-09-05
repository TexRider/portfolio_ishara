import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <motion.img
          variants={imageVariants}
          whileHover="hover"
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-[#9A3F3F] bg-opacity-90 flex items-center justify-center gap-4"
        >
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-[#FBF9D1] text-[#9A3F3F] rounded-full hover:bg-[#E6CFA9] transition-colors"
            >
              <Eye size={20} />
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-[#FBF9D1] text-[#9A3F3F] rounded-full hover:bg-[#E6CFA9] transition-colors"
            >
              <Github size={20} />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-[#E6CFA9] dark:bg-[#C1856D] text-[#9A3F3F] dark:text-[#FBF9D1] text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-[#9A3F3F] text-[#FBF9D1] rounded-lg hover:bg-[#C1856D] transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 border border-[#E6CFA9] dark:border-[#C1856D] text-[#9A3F3F] dark:text-[#E6CFA9] rounded-lg hover:bg-[#FBF9D1] dark:hover:bg-[#9A3F3F] transition-colors"
            >
              <Github size={16} />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;