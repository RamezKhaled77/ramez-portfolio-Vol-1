import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const animationId = useRef<number>();

  // Lerp function for smooth interpolation
  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  // Single global animation loop
  useEffect(() => {
    if (prefersReduced) return;
    const animate = () => {
      // Smooth interpolation - dot follows faster, trail follows slower
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.2);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.2);

      trailPos.current.x = lerp(trailPos.current.x, mousePos.current.x, 0.08);
      trailPos.current.y = lerp(trailPos.current.y, mousePos.current.y, 0.08);

      // Apply transforms using refs (no state updates = no re-renders)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px, 0) scale(${isClicking.current ? 0.5 : 1})`;
        dotRef.current.style.opacity = isVisible.current ? "1" : "0";
      }

      if (trailRef.current) {
        const size = isHovering.current ? 60 : 40;
        const offset = size / 2;
        trailRef.current.style.transform = `translate3d(${trailPos.current.x - offset}px, ${trailPos.current.y - offset}px, 0)`;
        trailRef.current.style.width = `${size}px`;
        trailRef.current.style.height = `${size}px`;
        trailRef.current.style.opacity = isVisible.current ? "1" : "0";
        trailRef.current.style.borderColor = isHovering.current
          ? "hsl(var(--primary))"
          : "rgba(255, 255, 255, 0.5)";
      }

      animationId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [lerp, prefersReduced]);

  // Event listeners - update refs only, no state
  useEffect(() => {
    if (prefersReduced) return;
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      isVisible.current = true;

      // Check for interactive elements
      const target = e.target as HTMLElement;
      isHovering.current = !!(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".hover-lift") ||
        target.closest(".glass-card")
      );
    };

    const handleMouseDown = () => {
      isClicking.current = true;
    };
    const handleMouseUp = () => {
      isClicking.current = false;
    };
    const handleMouseLeave = () => {
      isVisible.current = false;
    };
    const handleMouseEnter = () => {
      isVisible.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [prefersReduced]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: 8,
          height: 8,
          backgroundColor: "white",
          borderRadius: "50%",
          mixBlendMode: "difference",
          opacity: 0,
        }}
      />

      {/* Trail circle */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border will-change-transform"
        style={{
          width: 40,
          height: 40,
          mixBlendMode: "difference",
          opacity: 0,
          transition:
            "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />
    </>
  );
};

export default CustomCursor;
