// Gallery.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';

// Sample images data - replace with your actual images
const sampleImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Mountain Landscape',
    description: 'Beautiful mountain scenery at sunrise',
    type: 'landscape'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    title: 'Portrait Photography',
    description: 'Professional portrait with natural lighting',
    type: 'portrait'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    title: 'Fashion Model',
    description: 'Urban fashion photography',
    type: 'portrait'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    title: 'Mountain Range',
    description: 'Snow-capped mountain range',
    type: 'landscape'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2',
    title: 'Portrait Studio',
    description: 'Studio portrait with dramatic lighting',
    type: 'portrait'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    title: 'Lake Reflection',
    description: 'Calm lake with perfect mountain reflection',
    type: 'landscape'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604',
    title: 'Professional Headshot',
    description: 'Corporate headshot photography',
    type: 'portrait'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    title: 'Cliffside View',
    description: 'Dramatic cliffside overlooking the ocean',
    type: 'landscape'
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filter, setFilter] = useState('all'); // 'all', 'portrait', 'landscape'

  const portraitImages = sampleImages.filter(img => img.type === 'portrait');
  const landscapeImages = sampleImages.filter(img => img.type === 'landscape');
  
  // Filter images based on selection
  const filteredImages = filter === 'all' 
    ? sampleImages 
    : filter === 'portrait' 
      ? portraitImages 
      : landscapeImages;

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (lightboxIndex + 1) % filteredImages.length;
    } else {
      newIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setLightboxIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateImage('next');
    if (e.key === 'ArrowLeft') navigateImage('prev');
  };

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, lightboxIndex]);

  // Grid layout calculations
  const getGridClass = (image) => {
    if (viewMode === 'list') return 'col-span-1 md:col-span-3';
    
    // For grid view, portrait images take 1 column, landscape take 2
    return image.type === 'portrait' 
      ? 'col-span-1' 
      : 'col-span-1 md:col-span-2';
  };

  return (
    <div className="min-h-screen text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Gallery
        </motion.h1>
        
        <motion.p 
          className="text-gray-400 text-center mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A collection of my photography work showcasing both portrait and landscape compositions.
        </motion.p>

        {/* Controls */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex gap-2 bg-gray-800 p-2 rounded-lg">
            <button 
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button 
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
          
          <div className="flex gap-2 bg-gray-800 p-2 rounded-lg">
            <button 
              className={`px-3 py-1 rounded-md transition-colors ${filter === 'all' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 rounded-md transition-colors ${filter === 'portrait' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setFilter('portrait')}
            >
              Portrait
            </button>
            <button 
              className={`px-3 py-1 rounded-md transition-colors ${filter === 'landscape' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setFilter('landscape')}
            >
              Landscape
            </button>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''} gap-4`}>
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${getGridClass(image)}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox(image, index)}
              whileHover={{ scale: 1.02 }}
              layout // Animate layout changes
            >
              <motion.img
                src={image.src}
                alt={image.alt || image.title || ''}
                className={`w-full ${viewMode === 'list' ? 'h-48 md:h-64' : 'h-64'} object-cover group-hover:scale-110 transition-transform duration-500`}
                loading="lazy"
              />
              
              {/* Overlay with title */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-7xl max-h-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                  onClick={closeLightbox}
                >
                  <X size={32} />
                </button>

                {/* Navigation buttons */}
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 p-2 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 p-2 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                >
                  <ChevronRight size={32} />
                </button>

                {/* Image */}
                <motion.img
                  key={selectedImage.src}
                  src={selectedImage.src}
                  alt={selectedImage.alt || selectedImage.title || ''}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Image info */}
                <div className="absolute bottom-4 left-4 right-4 text-white bg-black bg-opacity-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-sm mt-2">{selectedImage.description}</p>
                  )}
                  <div className="text-xs opacity-75 mt-2">
                    {lightboxIndex + 1} / {filteredImages.length}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;