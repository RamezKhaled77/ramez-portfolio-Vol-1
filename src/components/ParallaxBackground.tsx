import { useEffect, useState } from "react";

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scroller = (document.scrollingElement ||
      document.documentElement) as HTMLElement;

    const scrollRef = { current: 0 } as { current: number };
    const rafRef = { id: 0 } as { id: number };

    const handleScroll = () => {
      scrollRef.current = scroller?.scrollTop ?? window.scrollY;
      if (!rafRef.id) {
        rafRef.id = requestAnimationFrame(() => {
          setScrollY(scrollRef.current);
          rafRef.id = 0;
        });
      }
    };

    scroller?.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setScrollY(0);
      return;
    }

    // initial read
    handleScroll();

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.id) cancelAnimationFrame(rafRef.id);
        rafRef.id = 0;
      } else {
        handleScroll();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      scroller?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.id) cancelAnimationFrame(rafRef.id);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const layers = [
    // Slow moving large shapes
    {
      speed: 0.02,
      elements: [
        { type: "circle", size: 400, x: -5, y: 10, opacity: 0.03 },
        { type: "circle", size: 300, x: 80, y: 60, opacity: 0.04 },
        { type: "circle", size: 500, x: 60, y: 150, opacity: 0.02 },
      ],
    },
    // Medium speed shapes
    {
      speed: 0.05,
      elements: [
        { type: "ring", size: 200, x: 15, y: 30, opacity: 0.05 },
        { type: "ring", size: 150, x: 75, y: 90, opacity: 0.04 },
        { type: "ring", size: 180, x: 30, y: 180, opacity: 0.03 },
      ],
    },
    // Fast moving small elements
    {
      speed: 0.1,
      elements: [
        { type: "dot", size: 8, x: 20, y: 20, opacity: 0.3 },
        { type: "dot", size: 6, x: 85, y: 45, opacity: 0.25 },
        { type: "dot", size: 10, x: 10, y: 70, opacity: 0.2 },
        { type: "dot", size: 7, x: 90, y: 120, opacity: 0.3 },
        { type: "dot", size: 5, x: 50, y: 160, opacity: 0.25 },
      ],
    },
    // Gradient blobs
    {
      speed: 0.03,
      elements: [
        { type: "blob", size: 600, x: -20, y: 50, opacity: 0.15 },
        { type: "blob", size: 500, x: 70, y: 130, opacity: 0.1 },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {layers.map((layer, layerIndex) => (
        <div
          key={layerIndex}
          className="absolute inset-0"
          style={{
            transform: `translateY(${-scrollY * layer.speed}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {layer.elements.map((el, elIndex) => {
            if (el.type === "circle") {
              return (
                <div
                  key={elIndex}
                  className="absolute rounded-full bg-primary"
                  style={{
                    width: el.size,
                    height: el.size,
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    opacity: el.opacity,
                    filter: "blur(60px)",
                  }}
                />
              );
            }
            if (el.type === "ring") {
              return (
                <div
                  key={elIndex}
                  className="absolute rounded-full border-2 border-primary"
                  style={{
                    width: el.size,
                    height: el.size,
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    opacity: el.opacity,
                  }}
                />
              );
            }
            if (el.type === "dot") {
              return (
                <div
                  key={elIndex}
                  className="absolute rounded-full bg-primary"
                  style={{
                    width: el.size,
                    height: el.size,
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    opacity: el.opacity,
                  }}
                />
              );
            }
            if (el.type === "blob") {
              return (
                <div
                  key={elIndex}
                  className="absolute bg-gradient-to-br from-primary/20 to-transparent rounded-full"
                  style={{
                    width: el.size,
                    height: el.size,
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    opacity: el.opacity,
                    filter: "blur(100px)",
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default ParallaxBackground;
