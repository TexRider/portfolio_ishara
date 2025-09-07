import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const playlist = [
  {
    id: 1,
    title: "Deltarune - Chill Buster",
    artist: "NyxTheShield",
    src: "/music/Deltarune - Chill Buster [lofi Remix by NyxTheShield].mp3",
  },
  {
    id: 2,
    title: "Undertale - Hope and Dreams (Lo-Fi hip-hop)",
    artist: "KaatuWaves",
    src: "/music/Undertale - Hopes and Dreams (lo-fi hip-hop)  KaatuWaves.mp3",
  },
  {
    id: 3,
    title: "Undertale Sans Theme Nitro (Lo-Fi)",
    artist: "Nick Nitro",
    src: "/music/Undertale Sans. Theme NITRO (Lo-Fi) Mini-Remix.mp3",
  },
  {
    id: 4,
    title: "Asgore Theme Lo-fi Remix",
    artist: "Marco Elienberg",
    src: "/music/Asgore Theme Lo-fi Remix.mp3",
  },
];

const MiniMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  
  const audioRef = useRef(null);
  const volumeTimeoutRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current.play(), 100);
    }
  };

  const handlePrev = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current.play(), 100);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    audioRef.current.currentTime = audioRef.current.duration * clickPosition;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (showPlaylist) setShowPlaylist(false);
    if (showVolumeControl) setShowVolumeControl(false);
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
    if (showVolumeControl) setShowVolumeControl(false);
  };

  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
    if (showPlaylist) setShowPlaylist(false);
    
    // Auto-hide volume control after 3 seconds
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    
    if (!showVolumeControl) {
      volumeTimeoutRef.current = setTimeout(() => {
        setShowVolumeControl(false);
      }, 3000);
    }
  };

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current.play(), 100);
    }
    setShowPlaylist(false);
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 md:bottom-4 md:left-4 md:right-auto md:max-w-xs">
      <audio ref={audioRef} src={currentTrack.src} preload="metadata" />
      
      {/* Mini Player */}
      <motion.div 
        className="rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundColor: '#9A3F3F' }}
        layout
        transition={{ duration: 0.3 }}
      >
        {/* Progress Bar */}
        <div 
          className="h-1 w-full bg-gray-700 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full transition-all duration-300"
            style={{ width: `${progress}%`, backgroundColor: '#FBF9D1' }}
          />
        </div>

        {/* Player Controls */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={toggleExpand}
                className="rounded-lg overflow-hidden flex-shrink-0"
              >
                <div 
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ backgroundColor: '#C1856D' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FBF9D1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              </button>
            </motion.div>

            <div className="min-w-0 flex-1">
              <p 
                className="text-sm font-medium truncate"
                style={{ color: '#FBF9D1' }}
              >
                {currentTrack.title}
              </p>
              <p 
                className="text-xs truncate"
                style={{ color: '#E6CFA9' }}
              >
                {currentTrack.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Volume Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleVolumeControl}
              className="p-1 rounded-full hidden sm:block"
              style={{ color: '#FBF9D1' }}
              aria-label="Volume control"
            >
              {volume === 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" strokeLinecap="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : volume < 0.5 ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" strokeLinecap="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 14c1.5 1 1.5 3 0 4" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12m-6.414-3.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586z" />
                </svg>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="p-2 rounded-full"
              style={{ color: '#FBF9D1' }}
              aria-label="Previous track"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="p-2 rounded-full"
              style={{ backgroundColor: '#C1856D', color: '#FBF9D1' }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="p-2 rounded-full"
              style={{ color: '#FBF9D1' }}
              aria-label="Next track"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Volume Control - appears below the player */}
        <AnimatePresence>
          {showVolumeControl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-3 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: '#FBF9D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12m-6.414-3.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586z" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: '#FBF9D1' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Expanded Player */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25 }}
            className="rounded-xl shadow-lg mt-2 overflow-hidden"
            style={{ backgroundColor: '#9A3F3F' }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: '#FBF9D1' }}>Now Playing</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleExpand}
                  className="p-1 rounded-full"
                  style={{ color: '#FBF9D1' }}
                  aria-label="Close expanded view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="flex flex-col items-center mb-6">
                <div 
                  className="w-40 h-40 rounded-lg mb-4 flex items-center justify-center shadow-md"
                  style={{ backgroundColor: '#C1856D' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="#FBF9D1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h2 
                  className="text-xl font-bold text-center mb-1 px-2 truncate w-full"
                  style={{ color: '#FBF9D1' }}
                >
                  {currentTrack.title}
                </h2>
                <p 
                  className="text-sm mb-4"
                  style={{ color: '#E6CFA9' }}
                >
                  {currentTrack.artist}
                </p>
              </div>

              <div className="mb-6">
                <div 
                  className="h-2 w-full bg-gray-700 rounded-full cursor-pointer mb-1"
                  onClick={handleProgressClick}
                >
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ width: `${progress}%`, backgroundColor: '#FBF9D1' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between text-xs" style={{ color: '#E6CFA9' }}>
                  <span>
                    {audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}
                  </span>
                  <span>
                    {audioRef.current && audioRef.current.duration ? 
                      formatTime(audioRef.current.duration) : '0:00'
                    }
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center space-x-6 mb-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="p-2 rounded-full"
                  style={{ color: '#FBF9D1' }}
                  aria-label="Previous track"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="p-4 rounded-full shadow-md"
                  style={{ backgroundColor: '#C1856D', color: '#FBF9D1' }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="p-2 rounded-full"
                  style={{ color: '#FBF9D1' }}
                  aria-label="Next track"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#FBF9D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m-2.828 2.828a9 9 0 010-12.728" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-3/4 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#FBF9D1' }}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: '#FBF9D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m-2.828 2.828a9 9 0 010-12.728" />
                </svg>
              </div>

              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVolumeControl}
                  className="px-4 py-2 rounded-full flex items-center space-x-2"
                  style={{ backgroundColor: showVolumeControl ? '#E6CFA9' : '#C1856D', color: '#9A3F3F' }}
                >
                  <span>Volume</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m-2.828 2.828a9 9 0 010-12.728" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlaylist}
                  className="px-4 py-2 rounded-full flex items-center space-x-2"
                  style={{ backgroundColor: showPlaylist ? '#E6CFA9' : '#C1856D', color: '#9A3F3F' }}
                >
                  <span>Playlist</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Playlist */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-700 pt-3 pb-4">
                    <h3 className="px-4 text-md font-semibold mb-2" style={{ color: '#FBF9D1' }}>Playlist</h3>
                    <div className="max-h-60 overflow-y-auto">
                      {playlist.map((track, index) => (
                        <motion.div
                          key={track.id}
                          whileHover={{ backgroundColor: '#C1856D' }}
                          className={`px-4 py-2 cursor-pointer flex items-center space-x-3 ${currentTrackIndex === index ? 'bg-opacity-20' : ''}`}
                          style={{ backgroundColor: currentTrackIndex === index ? '#C1856D' : 'transparent' }}
                          onClick={() => selectTrack(index)}
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-md overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#9A3F3F' }}>
                            {currentTrackIndex === index && isPlaying ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: '#FBF9D1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              </svg>
                            ) : (
                              <span style={{ color: '#FBF9D1' }}>{index + 1}</span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm truncate" style={{ color: '#FBF9D1' }}>{track.title}</p>
                            <p className="text-xs truncate" style={{ color: '#E6CFA9' }}>{track.artist}</p>
                          </div>
                          <div className="text-xs" style={{ color: '#E6CFA9' }}>
                            {index === currentTrackIndex && audioRef.current && audioRef.current.duration ? 
                              formatTime(audioRef.current.duration) : '1:30'
                            }
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiniMusicPlayer;