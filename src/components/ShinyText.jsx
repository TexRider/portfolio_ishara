// ShinyText.jsx
const ShinyText = ({ text, disabled = false, speed = 5, className = '', baseColor = "#414141c4" }) => {
  const animationDuration = `${speed}s`;

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Base text */}
      <span style={{ color: baseColor, opacity: 0.9 }}>
        {text}
      </span>
      
      {/* White shine layer */}
      {!disabled && (
        <span
          className="absolute top-0 left-0 animate-shine"
          style={{
            color: baseColor,
            backgroundImage:
              'linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(133, 133, 133, 0.98) 50%, rgba(255, 255, 255, 0) 70%)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animationDuration: animationDuration,
            animationDelay: '0s'
          }}
        >
          {text}
        </span>
      )}
      
      {/* Secondary glow layer for extra enhancement */}
      {!disabled && (
        <span
          className="absolute top-0 left-0 animate-shine"
          style={{
            color: baseColor,
            backgroundImage:
              'linear-gradient(120deg, rgba(126, 126, 126, 0.38) 40%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 60%)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animationDuration: animationDuration,
            animationDelay: '0.5s',
            filter: 'blur(1px)'
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default ShinyText;