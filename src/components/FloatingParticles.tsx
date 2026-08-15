import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "circle" | "square" | "triangle" | "diamond";
  opacity: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const types: Particle["type"][] = [
        "circle",
        "square",
        "triangle",
        "diamond",
      ];

      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * -20,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    if (prefersReduced) {
      // Reduced motion: don't create animated particles
      setParticles([]);
      return;
    }

    generateParticles();

    const onVisibilityChange = () => {
      if (!document.hidden) generateParticles();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const renderShape = (particle: Particle) => {
    const baseStyle = {
      width: particle.size,
      height: particle.size,
      opacity: particle.opacity,
    };

    switch (particle.type) {
      case "circle":
        return <div className="rounded-full bg-primary" style={baseStyle} />;
      case "square":
        return <div className="bg-primary rotate-45" style={baseStyle} />;
      case "triangle":
        return (
          <div
            className="border-l-transparent border-r-transparent border-b-primary"
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: particle.size / 2,
              borderRightWidth: particle.size / 2,
              borderBottomWidth: particle.size,
              opacity: particle.opacity,
            }}
          />
        );
      case "diamond":
        return (
          <div
            className="bg-primary"
            style={{
              ...baseStyle,
              transform: "rotate(45deg) scale(0.7)",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-float-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {renderShape(particle)}
        </div>
      ))}

      {/* Glowing orbs */}
      <div
        className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float-slow"
        style={{ left: "10%", top: "20%" }}
      />
      <div
        className="absolute w-48 h-48 rounded-full bg-primary/5 blur-3xl animate-float-slow"
        style={{ left: "70%", top: "60%", animationDelay: "-5s" }}
      />
      <div
        className="absolute w-56 h-56 rounded-full bg-primary/5 blur-3xl animate-float-slow"
        style={{ left: "50%", top: "80%", animationDelay: "-10s" }}
      />
    </div>
  );
};

export default FloatingParticles;
