// components/Gallery.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Grid, List, AlertCircle, ExternalLink } from "lucide-react";

// Sample images data - replace with your actual images
const sampleImages = [
  {
    id: 1,
    src: "/Ishara_Gallery/Landscape_Katana_Image_1.jpg",
    title: "Katana",
    description: "Beautiful sword photography",
    type: "landscape",
  },
  {
    id: 2,
    src: "/Ishara_Gallery/Portrait_Greatsword_Image_1.jpg",
    title: "Greatsword",
    description: "The greatsowrd designed to perfection",
    type: "portrait",
  },
  {
    id: 3,
    src: "/Ishara_Gallery/Portrait_AlucardBlade_Image_1.jpg",
    title: "Alucard Blade",
    description: "Hellsong Alucard blade",
    type: "portrait",
  },
  {
    id: 4,
    src: "/Ishara_Gallery/Portrait_BladeSet_Image_1.jpg",
    title: "Crafted Blade Collection",
    description: "A simply arranged collection of the craftd ones",
    type: "portrait",
  },
  {
    id: 5,
    src: "/Ishara_Gallery/Portrait_DanteSword_Image_1.jpg",  // This path is incomplete
    title: "Dante Blade",
    description: "A longsword of Dante, from Devil May Cry",
    type: "portrait",
  },
  {
    id: 6,
    src: "/Ishara_Gallery/Portrait_Katana_Image_1.jpg",
    title: "Katana Blade",
    description: "Single blade, with the realistic edge",
    type: "portrait",
  },
  {
    id: 7,
    src: "/Ishara_Gallery/Portrait_Katana_Image_2.jpg",
    title: "Katana with Sheathe",
    description: "The pair together, with a great match",
    type: "portrait",
  },
  {
    id: 8,
    src: "/Ishara_Gallery/Portrait_Katana_Image_3.jpg",
    title: "Katana with Sheathe with designing",
    description: "Now with an upgrade with a beautiful styling",
    type: "portrait",
  },
  {
    id: 9,
    src: "/Ishara_Gallery/Portrait_KatanaSet_Image_1.jpg",
    title: "Katana Crafter Collection",
    description: "The full set so far, with the designs outed",
    type: "portrait",
  },
  {
    id: 10,
    src: "/Ishara_Gallery/Landscape_Longsword_Image_1.jpg",
    title: "Classic Longsword",
    description: "Medieval, dates unknown. Handcrafted in wood",
    type: "landscape",
  },
  {
    id: 11,
    src: "/Ishara_Gallery/Portrait_Longsword_Image_1.jpg",
    title: "Classic Longsword",
    description: "Medieval, dates unknown. Handcrafted in wood",
    type: "portrait",
  },
  {
    id: 12,
    src: "/Ishara_Gallery/Portrait_PetitoBlade_Image_1.jpg",
    title: "Petito Blade",
    description: "From Puss In Boots, The Last Wish. Commending the change of the legendary puss in boots",
    type: "portrait",
  },
  {
    id: 13,
    src: "/Ishara_Gallery/Portrait_Rapier_Image_1.jpg",
    title: "Rapier Blade",
    description: "Classical and stylish, with a tip of perfection",
    type: "portrait",
  },
  {
    id: 14,
    src: "/Ishara_Gallery/Portrait_Shortblade_Image_1.jpg",
    title: "Short Blade",
    description: "A handy one, yet a proper blade(ish)",
    type: "portrait",
  },
  {
    id: 15,
    src: "/Ishara_Gallery/Portrait_TorfinBlade_Image_1.jpg",
    title: "Torfin Blade",
    description: "From Vinland Saga, the war is not over",
    type: "portrait",
  },
  {
    id: 16,
    src: "/Ishara_Gallery/Portrait_TwinShortKatana_Image_1.jpg",
    title: "Twin Short Katana",
    description: "Why stop for one, when you can have two?",
    type: "portrait",
  },
  {
    id: 17,
    src: "/Ishara_Gallery/Landscape_TwinShortKatana_Image_1.jpg",
    title: "Twin Short Katana",
    description: "Why stop for one, when you can have two?",
    type: "landscape",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [imageStatus, setImageStatus] = useState({});
  const [showDebug, setShowDebug] = useState(false);

  // Normalize types to lowercase for consistent filtering
  const normalizedImages = sampleImages.map(img => ({
    ...img,
    type: img.type.toLowerCase()
  }));

  const portraitImages = normalizedImages.filter((img) => img.type === "portrait");
  const landscapeImages = normalizedImages.filter((img) => img.type === "landscape");

  // Filter images based on selection
  const filteredImages =
    filter === "all"
      ? normalizedImages
      : filter === "portrait"
      ? portraitImages
      : landscapeImages;

  // Check if images are loading correctly
  useEffect(() => {
    filteredImages.forEach(image => {
      const img = new Image();
      img.onload = () => {
        setImageStatus(prev => ({ ...prev, [image.id]: 'loaded' }));
      };
      img.onerror = () => {
        setImageStatus(prev => ({ ...prev, [image.id]: 'error' }));
        console.error(`Failed to load image: ${image.src}`);
      };
      img.src = image.src;
    });
  }, [filteredImages]);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === "next") {
      newIndex = (lightboxIndex + 1) % filteredImages.length;
    } else {
      newIndex =
        (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setLightboxIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") navigateImage("next");
    if (e.key === "ArrowLeft") navigateImage("prev");
  };

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage, lightboxIndex]);

  // Grid layout calculations
  const getGridClass = (image) => {
    if (viewMode === "list") return "col-span-1 md:col-span-3";

    // For grid view, portrait images take 1 column, landscape take 2
    return image.type === "portrait"
      ? "col-span-1"
      : "col-span-1 md:col-span-2";
  };

  // Add error handling for images
  const handleImageError = (e, id) => {
    console.error(`Error loading image with ID ${id}: ${e.target.src}`);
    e.target.src = "https://via.placeholder.com/300x200/9A3F3F/E6CFA9?text=Image+Not+Found";
    setImageStatus(prev => ({ ...prev, [id]: 'error' }));
  };

  return (
    <section id="gallery" className="min-h-screen py-20 px-4 bg-[#1a1a1a]">
      <div className="px-4 mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#FBF9D1]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Creations
        </motion.h2>

        <motion.p
          className="text-[#E6CFA9] text-center mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A collection of my crafts and designs on various franchises and cultures.
        </motion.p>

        {/* Debug toggle. Do not turn this on unless it is needed to check whether the images are not loading and it is needed to check. */}
        {/* <div className="flex justify-center mb-6">
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="px-4 py-2 bg-[#9A3F3F] hover:bg-[#8A2F2F] rounded-md text-[#FBF9D1] flex items-center gap-2 transition-colors"
          >
            <AlertCircle size={18} />
            {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
          </button>
        </div> */}

        {/* Debug info. Do not turn this on unless it is needed to check whether the images are not loading and it is needed to check. */}
        {/* {showDebug && (
          <div className="bg-[#2a2a2a] p-4 rounded-lg mb-6 border border-[#C1856D]">
            <h3 className="text-lg font-semibold text-[#FBF9D1] mb-2">Debug Information</h3>
            <p className="text-[#E6CFA9] mb-2">Image paths being used:</p>
            <ul className="text-sm text-[#E6CFA9] mb-4">
              {filteredImages.map(img => (
                <li key={img.id} className="mb-1 flex items-center">
                  <span className="w-8">ID {img.id}:</span> 
                  <code className="bg-[#3a3a3a] px-1 py-0.5 rounded flex-1 mx-2 text-[#C1856D]">{img.src}</code> 
                  <span className={`px-2 py-1 rounded text-xs ${imageStatus[img.id] === 'loaded' ? 'bg-[#2c5e2c] text-[#c8f5c8]' : 'bg-[#9A3F3F] text-[#FBF9D1]'}`}>
                    {imageStatus[img.id] || 'checking...'}
                  </span>
                  <a 
                    href={img.src} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 text-[#C1856D] hover:text-[#E6CFA9] transition-colors"
                    title="Open image in new tab"
                  >
                    <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[#E6CFA9]">
              If local images aren't loading, check that they're in the <code className="bg-[#3a3a3a] px-1 py-0.5 rounded text-[#C1856D]">public/Ishara_Gallery/</code> folder.
            </p>
          </div>
        )} */}

        {/* Controls */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex gap-2 bg-[#2a2a2a] p-2 rounded-lg border border-[#C1856D]">
            <button
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid" ? "bg-[#9A3F3F] text-[#FBF9D1]" : "text-[#E6CFA9] hover:bg-[#3a3a3a]"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list" ? "bg-[#9A3F3F] text-[#FBF9D1]" : "text-[#E6CFA9] hover:bg-[#3a3a3a]"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List size={20} />
            </button>
          </div>

          <div className="flex gap-2 bg-[#2a2a2a] p-2 rounded-lg border border-[#C1856D]">
            <button
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === "all" ? "bg-[#9A3F3F] text-[#FBF9D1]" : "text-[#E6CFA9] hover:bg-[#3a3a3a]"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === "portrait" ? "bg-[#9A3F3F] text-[#FBF9D1]" : "text-[#E6CFA9] hover:bg-[#3a3a3a]"
              }`}
              onClick={() => setFilter("portrait")}
            >
              Portrait
            </button>
            <button
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === "landscape" ? "bg-[#9A3F3F] text-[#FBF9D1]" : "text-[#E6CFA9] hover:bg-[#3a3a3a]"
              }`}
              onClick={() => setFilter("landscape")}
            >
              Landscape
            </button>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div
          className={`grid grid-cols-1 ${
            viewMode === "grid"
              ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : ""
          } gap-6`}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${getGridClass(
                image
              )}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox(image, index)}
              whileHover={{ scale: 1.03 }}
              layout
            >
              <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden bg-[#2a2a2a]">
                <motion.img
                  src={image.src}
                  alt={image.alt || image.title || ""}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => handleImageError(e, image.id)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                />
                
                {imageStatus[image.id] === 'error' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1a] bg-opacity-90 p-4">
                    <AlertCircle size={32} className="text-[#9A3F3F] mb-2" />
                    <span className="text-[#FBF9D1] text-sm text-center">Failed to load image</span>
                    <span className="text-[#C1856D] text-xs mt-1 text-center">Check console for details</span>
                  </div>
                )}
                
                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#9A3F3F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-4 text-[#FBF9D1] w-full">
                    <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#E6CFA9]">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-[#1a1a1a] bg-opacity-95 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-6xl max-h-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  className="absolute -top-12 right-0 text-[#FBF9D1] hover:text-[#E6CFA9] transition-colors z-10 p-2"
                  onClick={closeLightbox}
                >
                  <X size={32} />
                </button>

                {/* Navigation buttons */}
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FBF9D1] hover:text-[#E6CFA9] transition-colors z-10 bg-[#9A3F3F] bg-opacity-80 p-3 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#FBF9D1] hover:text-[#E6CFA9] transition-colors z-10 bg-[#9A3F3F] bg-opacity-80 p-3 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                >
                  <ChevronRight size={32} />
                </button>

                {/* Image */}
                <motion.img
                  key={selectedImage.src}
                  src={selectedImage.src}
                  alt={selectedImage.alt || selectedImage.title || ""}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x600/9A3F3F/E6CFA9?text=Image+Not+Found";
                  }}
                />

                {/* Image info */}
                <div className="absolute bottom-4 left-4 right-4 text-[#FBF9D1] bg-[#9A3F3F] bg-opacity-90 p-4 rounded-lg backdrop-blur-sm border border-[#C1856D]">
                  <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-sm mt-2 opacity-90 text-[#E6CFA9]">{selectedImage.description}</p>
                  )}
                  <div className="text-xs opacity-75 mt-2 text-[#FBF9D1]">
                    {lightboxIndex + 1} / {filteredImages.length}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;