import Particles from "./Particles";

const EnhancedParticleBackground = () => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
};

export default EnhancedParticleBackground;