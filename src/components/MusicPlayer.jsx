import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlayer = () => {
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

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.15);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMini, setIsMini] = useState(true);
  const [error, setError] = useState(null);
  const [audioData, setAudioData] = useState(new Array(15).fill(0));
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const audioRef = useRef(null);
  const animationRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Sound visualization animation
  const animateSoundBars = () => {
    if (!isPlaying) return;

    const newData = audioData.map(() => {
      return Math.random() * (isPlaying ? 100 : 10);
    });

    setAudioData(newData);
    animationRef.current = requestAnimationFrame(animateSoundBars);
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        cancelAnimationFrame(animationRef.current);
      } else {
        audioRef.current.play().catch((err) => {
          setError("Playback failed: " + err.message);
          console.error("Playback error:", err);
        });
        animationRef.current = requestAnimationFrame(animateSoundBars);
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      setError("Player error: " + err.message);
      console.error("Player error:", err);
    }
  };

  // Handle next track
  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  // Handle previous track
  const prevTrack = () => {
    const prevIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Handle seek
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Format time for display
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Auto-play next track when current ends
  const handleEnded = () => {
    nextTrack();
  };

  // Handle audio loading errors
  const handleAudioError = () => {
    setError(`Failed to load audio: ${currentTrack.src}`);
    console.error("Audio loading error for:", currentTrack.src);
  };

  // Load new track when index changes
  useEffect(() => {
    if (audioRef.current) {
      setError(null);
      audioRef.current.load();

      const playAudio = () => {
        if (isPlaying) {
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.play().catch((err) => {
                setError("Auto-play failed: " + err.message);
                console.error("Auto-play error:", err);
              });
              animationRef.current = requestAnimationFrame(animateSoundBars);
            }
          }, 100);
        }
      };

      audioRef.current.addEventListener("loadeddata", playAudio);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("loadeddata", playAudio);
        }
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, [currentTrackIndex, isPlaying]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`fixed z-50 ${
        isMobile ? "bottom-2 right-2" : "bottom-4 right-4"
      }`}
    >
      {/* Error message */}
      {error && (
        <div className="mb-2 p-2 bg-red-500 text-white text-sm rounded max-w-xs">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
        onError={handleAudioError}
      />

      {/* Mini player toggle - visible on all devices */}
      <button
        onClick={() => setIsMini(!isMini)}
        className={`${
          isMobile ? "w-7 h-7" : "w-8 h-8"
        } mb-2 rounded-full bg-[#9A3F3F] flex items-center justify-center text-[#FBF9D1] ml-auto shadow-md hover:bg-[#C1856D] transition-colors`}
      >
        {isMini ? "↑" : "↓"}
      </button>

      <AnimatePresence>
        {!isMini && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#9A3F3F] rounded-xl shadow-lg p-4 w-80 max-w-[90vw] backdrop-blur-sm bg-opacity-90 border border-[#C1856D]"
          >
            {/* Track info with sound visualization */}
            <div className="flex items-center mb-4">
              <div className="relative w-12 h-12 bg-gradient-to-br from-[#9A3F3F] to-[#C1856D] rounded-lg flex-shrink-0 shadow-md overflow-hidden">
                {/* Sound visualization bars */}
                <div className="absolute inset-0 flex items-end justify-center gap-0.5 p-1">
                  {audioData.map((height, index) => (
                    <motion.div
                      key={index}
                      className="w-0.5 bg-[#FBF9D1] rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
              </div>
              <div className="ml-3 overflow-hidden flex-1 min-w-0">
                <h3 className="text-[#FBF9D1] font-medium truncate text-sm sm:text-base">
                  {currentTrack.title}
                </h3>
                <p className="text-[#E6CFA9] text-xs sm:text-sm truncate">
                  {currentTrack.artist}
                </p>
              </div>
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="ml-2 text-[#E6CFA9] hover:text-[#FBF9D1] transition-colors"
              >
                {showPlaylist ? "▲" : "▼"}
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-[#C1856D] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FBF9D1]"
              />
              <div className="flex justify-between text-xs text-[#E6CFA9] mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevTrack}
                className="text-[#FBF9D1] p-2 hover:text-[#E6CFA9] transition-colors"
                aria-label="Previous track"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <motion.button
                onClick={togglePlayPause}
                className="bg-[#C1856D] rounded-full p-3 text-[#FBF9D1] hover:bg-[#9A3F3F] transition-colors shadow-md"
                whileTap={{ scale: 0.95 }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 极客时间 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                  </svg>
                )}
              </motion.button>

              <button
                onClick={nextTrack}
                className="text-[#FBF9D1] p-2 hover:text-[#E6CFA9] transition-colors"
                aria-label="Next track"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Volume control - different layout for mobile */}
              {!isMobile ? (
                <div className="flex items-center ml-4">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#E6CFA9] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                    />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-16 sm:w-20 h-1 bg-[#C1856D] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FBF9D1]"
                  />
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowVolumeControl(!showVolumeControl)}
                    className="text-[#FBF9D1] p-2"
                    aria-label="Volume control"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                      />
                    </svg>
                  </button>
                  {showVolumeControl && (
                    <motion.div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-[#9A3F3F] rounded-lg shadow-lg border border-[#C1856D] z-50 max-h-[80vh]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={(e) => e.stopPropagation()} // Prevent click propagation
                    >
                      {/* Container for the vertical slider */}
                      <div
                        className="h-16 flex items-center justify-center touch-none" // Added touch-none
                        onTouchStart={(e) => e.stopPropagation()} // Prevent touch propagation
                        onTouchMove={(e) => e.stopPropagation()} // Prevent touch propagation
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-2 bg-[#7A4F3F] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FBF9D1] touch-none" // Added touch-none
                          style={{
                            transform: "rotate(-90deg)",
                            transformOrigin: "center",
                            background: `linear-gradient(to right, #C1856D ${
                              volume * 100
                            }%, #7A4F3F ${volume * 100}%)`,
                          }}
                          onTouchStart={(e) => e.stopPropagation()} // Prevent touch propagation
                          onTouchMove={(e) => {
                            e.stopPropagation(); // Prevent touch propagation
                            // Prevent default to stop scrolling
                            if (e.cancelable) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      {/* Volume level indicator */}
                      <div className="text-center text-[#FBF9D1] text-xs mt-1">
                        {Math.round(volume * 100)}%
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Playlist */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="bg-[#C1856D] bg-opacity-80 rounded-lg p-2 max-h-40 overflow-y-auto">
                    {playlist.map((track, index) => (
                      <motion.li
                        key={track.id}
                        className={`p-2 rounded cursor-pointer flex items-center ${
                          index === currentTrackIndex
                            ? "bg-[#9A3F3F] text-[#FBF9D1]"
                            : "hover:bg-[#9A3F3F] hover:bg-opacity-30 text-[#E6CFA9]"
                        }`}
                        onClick={() => {
                          setCurrentTrackIndex(index);
                          if (isMobile) setShowPlaylist(false);
                        }}
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <span className="w-6">
                          {index === currentTrackIndex && isPlaying ? (
                            <svg
                              className="w-4 h-4 text-[#FBF9D1]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 极客时间 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : index === currentTrackIndex ? (
                            <svg
                              className="w-4 h-4 text-[#FBF9D1]"
                              fill="currentColor"
                              viewBox="0 0 20 极客时间"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 极客时间 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : null}
                        </span>
                        <span className="truncate ml-2 text-sm">
                          {track.title} - {track.artist}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini player view - for all devices */}
      <AnimatePresence>
        {isMini && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-[#9A3F3F] rounded-full shadow-lg p-3 flex items-center backdrop-blur-sm bg-opacity-90 border border-[#C1856D] w-48 h-12" // Fixed size
          >
            {/* Mini sound visualization */}
            <div className="flex items-end h-6 mr-2 gap-0.5">
              {audioData.slice(0, 3).map((height, index) => (
                <motion.div
                  key={index}
                  className="w-0.5 bg-[#FBF9D1] rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: isPlaying ? `${height / 3}px` : "2px" }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={togglePlayPause}
              className="bg-[#C1856D] rounded-full p-2 text-[#FBF9D1] hover:bg-[#9A3F3F] transition-colors shadow-md flex-shrink-0"
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                </svg>
              )}
            </motion.button>

            {/* Text reveal container with fixed width */}
            <div className="ml-2 mr-2 overflow-hidden flex-1 min-w-0">
              <motion.div
                className="text-[#FBF9D1] text-xs truncate"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                key={currentTrack.title} // Re-animate when track changes
              >
                {currentTrack.title}
              </motion.div>
            </div>

            <button
              onClick={nextTrack}
              className="text-[#FBF9D1] p-1 hover:text-[#E6CFA9] transition-colors flex-shrink-0"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;
