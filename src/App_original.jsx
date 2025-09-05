import React from 'react'
import { motion } from 'framer-motion'
import ParticleMouseBackground from './components/ParticleMouseBackground'

function App() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Combined Particle Background and Mouse Follower */}
      <ParticleMouseBackground />
      
      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl font-bold text-center text-gray-800 mb-8"
            onMouseEnter={() => document.querySelector('.cursor').style.mixBlendMode = 'normal'}
            onMouseLeave={() => document.querySelector('.cursor').style.mixBlendMode = 'difference'}
          >
            Welcome to My Portfolio
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-center text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Move your cursor around to interact with the particles and see the smooth animation.
          </motion.p>
          
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {['Design', 'Development', 'Animation'].map((item, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(219, 234, 254, 0.7)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-xl font-semibold text-blue-800">{item}</h3>
                <p className="mt-2 text-blue-600">Explore my {item.toLowerCase()} projects and skills.</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
              View My Work
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default App