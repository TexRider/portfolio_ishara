import { motion } from "framer-motion";

const ProjectsFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onCategoryChange("all")}
        className={`px-6 py-2 rounded-full font-medium transition-colors ${
          activeCategory === "all"
            ? "bg-[#9A3F3F] text-[#FBF9D1]"
            : "bg-[#E6CFA9] text-[#9A3F3F] hover:bg-[#C1856D] hover:text-[#FBF9D1]"
        }`}
      >
        All Projects
      </motion.button>

      {categories.map((category) => (
        <motion.button
          key={category}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeCategory === category
              ? "bg-[#9A3F3F] text-[#FBF9D1]"
              : "bg-[#E6CFA9] text-[#9A3F3F] hover:bg-[#C1856D] hover:text-[#FBF9D1]"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ProjectsFilter;