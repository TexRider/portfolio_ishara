// PortfolioPage.jsx
import ProjectsGrid from '../components/ProjectGrid.jsx';
import ProjectsFilter from '../components/ProjectFilter.jsx';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

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

  const projects = [
    {
      id: 1,
      title: "Cosplay Weapon Props",
      description: "Ready-made, or custom-made props for all cosplays. Specialized in katanas and swords, but great in all weapon designs. All tools are wood crafted and not actual lethal weapons.",
      image: "/Ishara_Gallery/Portrait_KatanaSet_Image_1.jpg",
      technologies: ["Wood Designs", "Cosplay Props"],
      liveUrl: "https://www.vtrolly.com",
      githubUrl: null,
      category: "Crafts"
    },
    {
      id: 2,
      title: "Cosplay Gear Props",
      description: "Custom designs tailor-made for the requested characters. Specialized in designing weapon props, also available in props and accessories. Wood based props are specialized",
      image: "/Ishara_Profile/Cosplay_1.jpg",
      technologies: ["Wood Designs", "Cosplay Props"],
      liveUrl: "https://www.vtrolly.com",
      githubUrl: null,
      category: "Cosplay Designs"
    },
    // Add more projects...
  ];

  const categories = ['Crafts', 'Cosplay Designs'];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      exit="exit"
    >
      <ProjectsFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProjectsGrid
        projects={filteredProjects}
        title="My Portfolio"
        subtitle="Discover my latest projects and creative works"
      />
    </motion.div>
  );
};

export default PortfolioPage;