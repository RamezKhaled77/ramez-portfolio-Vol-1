import { useEffect, useRef, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scroller = (document.scrollingElement ||
      document.documentElement) as HTMLElement;

    const stateRef = { scrollTop: 0 } as { scrollTop: number };
    const rafRef = { id: 0 } as { id: number };

    const handleScroll = () => {
      const container = scroller || document.documentElement;
      stateRef.scrollTop = scroller?.scrollTop ?? window.scrollY;
      if (!rafRef.id) {
        rafRef.id = requestAnimationFrame(() => {
          const scrollHeight =
            (container.scrollHeight || document.documentElement.scrollHeight) -
            window.innerHeight;
          const scrollProgress =
            scrollHeight > 0 ? (stateRef.scrollTop / scrollHeight) * 100 : 0;
          setProgress(Math.min(scrollProgress, 100));
          rafRef.id = 0;
        });
      }
    };

    scroller?.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scroller?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.id) cancelAnimationFrame(rafRef.id);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-border/30">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary to-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect */}
      <div
        className="absolute top-0 h-full bg-primary/50 blur-sm transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
