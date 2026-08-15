import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  context: string;
  problem: string;
  approach: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDecisions: () => void;
  compact?: boolean;
}

const ProjectCard = ({
  project,
  index,
  onViewDecisions,
  compact,
}: ProjectCardProps) => {
  // Full-card interaction state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  // rAF refs to throttle mouse updates
  const tiltRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const cursorRafRef = useRef<number | null>(null);
  const previewRef = useRef({ x: 0, y: 0 });
  const previewRafRef = useRef<number | null>(null);

  // Compact preview state
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const [showPreview, setShowPreview] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 8;

    tiltRef.current = { x: tiltX, y: tiltY };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        setTilt(tiltRef.current);
        rafRef.current = null;
      });
    }
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (cursorRafRef.current === null) {
      cursorRafRef.current = requestAnimationFrame(() => {
        setCursorPos(cursorRef.current);
        cursorRafRef.current = null;
      });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // track global client coordinates; motion.div will animate from these
    previewRef.current = { x: e.clientX, y: e.clientY };
    // throttle via rAF
    if (previewRafRef.current === null) {
      previewRafRef.current = requestAnimationFrame(() => {
        setPreviewPos({ x: previewRef.current.x, y: previewRef.current.y });
        previewRafRef.current = null;
      });
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (cursorRafRef.current) cancelAnimationFrame(cursorRafRef.current);
      if (previewRafRef.current) cancelAnimationFrame(previewRafRef.current);
    };
  }, []);

  const getProjectGradient = (imageId: string) => {
    const gradients: Record<string, string> = {
      project1: "linear-gradient(135deg, hsl(14, 90%, 53%), hsl(21, 90%, 48%))",
      project2:
        "linear-gradient(135deg, hsl(210, 100%, 56%), hsl(200, 100%, 60%))",
      project3:
        "linear-gradient(135deg, hsl(271, 76%, 53%), hsl(292, 76%, 48%))",
      project4: "linear-gradient(135deg, hsl(31, 90%, 51%), hsl(22, 82%, 39%))",
    };
    return gradients[imageId] || gradients.project1;
  };

  const getAccentColor = (imageId: string) => {
    const colors: Record<string, string> = {
      project1: "hsl(14, 90%, 53%)",
      project2: "hsl(210, 100%, 56%)",
      project3: "hsl(271, 76%, 53%)",
      project4: "hsl(31, 90%, 51%)",
    };
    return colors[imageId] || colors.project1;
  };

  const isReversed = index % 2 === 1;

  // Compact row layout (used in redesigned Projects list)
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        className="group relative"
      >
        <div
          id={`project-row-${index}`}
          role="button"
          tabIndex={0}
          onClick={onViewDecisions}
          onKeyDown={(e) => {
            if (e.key === "Enter") onViewDecisions();
          }}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setShowPreview(true)}
          onPointerLeave={() => setShowPreview(false)}
          className="w-full grid grid-cols-[64px_1fr_48px] items-center gap-4 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 bg-card hover:bg-primary/90 group border border-border/50 hover:border-primary/30 duration-300"
        >
          {/* Number */}
          <div className="text-sm font-medium text-muted-foreground text-right pr-3 transition-colors group-hover:text-background">
            0{index + 1}
          </div>

          {/* Title + context (hidden meta on mobile) */}
          <div className="min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-medium text-foreground transition-colors group-hover:text-background truncate">
                  {project.title}
                </div>
                <div className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-background/80 truncate md:block hidden">
                  {project.context}
                </div>
              </div>
              {/* Desktop meta area: show on md+ */}
              <div className="hidden md:flex md:items-center md:gap-4 md:ml-4">
                <div className="text-sm text-muted-foreground transition-colors group-hover:text-background/80">
                  {/* placeholder meta */}
                </div>
              </div>
            </div>
          </div>

          {/* Action arrow */}
          <div className="flex items-center justify-end space-x-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground transition-colors group-hover:text-background"
                aria-label="Open live preview"
              >
                <ExternalLink size={16} />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground transition-colors group-hover:text-background"
                aria-label="Open source repository"
              >
                <Github size={16} />
              </a>
            )}

            <div>
              <ArrowRight
                size={16}
                className="text-muted-foreground transition-colors group-hover:text-background"
              />
            </div>
          </div>

          {/* Cursor-following thumbnail preview (desktop only) */}
          {/* Render fixed preview so it can float freely over layout */}
          <motion.div
            aria-hidden
            className="pointer-events-none hidden md:block fixed z-50"
            // position at page origin and use x/y transforms for GPU-accelerated movement
            style={{ left: 0, top: 0, willChange: "transform, opacity" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              showPreview
                ? {
                    opacity: 1,
                    scale: 1,
                    x: previewPos.x + 40,
                    y: previewPos.y - 150,
                  }
                : {
                    opacity: 0,
                    scale: 0.95,
                    x: previewPos.x + 40,
                    y: previewPos.y - 150,
                  }
            }
            // smoother spring for a gentle, non-snappy follow
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
          >
            <div
              className="w-44 h-28 rounded-md overflow-hidden border border-border/30 shadow-2xl"
              style={{ background: getProjectGradient(project.image) }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Full, richer project card
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      {/* Main Card */}
      <div
        className={`relative flex flex-col lg:flex-row gap-6 lg:gap-10 p-6 md:p-8 rounded-3xl transition-all duration-500 ease-out
          bg-gradient-to-br from-card/60 via-card/40 to-card/20 backdrop-blur-xl
          border border-border/30 hover:border-primary/40 group-hover:bg-primary
          shadow-lg hover:shadow-2xl hover:shadow-primary/5
          ${isReversed ? "lg:flex-row-reverse" : ""}`}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x * 0.5}deg) rotateY(${tilt.y * 0.5}deg) translateY(-8px)`
            : "rotateX(0deg) rotateY(0deg) translateY(0px)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${isReversed ? "80%" : "20%"} 50%, ${getAccentColor(project.image)}10, transparent 40%)`,
          }}
        />

        {/* Border glow */}
        <div
          className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${getAccentColor(project.image)}30, transparent 50%, ${getAccentColor(project.image)}20)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* Project Visual - PRESERVED CURSOR INTERACTION */}
        <div className="lg:w-2/5 flex-shrink-0">
          <div
            className="relative h-56 md:h-64 lg:h-72 transition-transform duration-300 ease-out rounded-2xl overflow-hidden"
            style={{
              transform: isHovered
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
                : "rotateX(0deg) rotateY(0deg) scale(1)",
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleImageMouseMove}
            onMouseEnter={() => setShowCursor(true)}
            onMouseLeave={() => setShowCursor(false)}
          >
            {/* Custom Cursor - PRESERVED */}
            {showCursor && (
              <div
                className="pointer-events-none absolute z-50 flex items-center justify-center w-14 h-14 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
                style={{
                  left: cursorPos.x,
                  top: cursorPos.y,
                }}
              >
                <div className="w-full h-full rounded-full bg-primary backdrop-blur-sm flex items-center justify-center shadow-xl animate-scale-in border-2 border-primary-foreground/20">
                  <svg
                    className="w-5 h-5 text-primary-foreground rotate-[-45deg]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            )}

            {/* Background Gradient */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: getProjectGradient(project.image),
                cursor: showCursor ? "none" : "pointer",
              }}
            />

            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10" />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Project Number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="font-display font-bold text-white/30 text-7xl md:text-8xl blur-sm absolute">
                  0{index + 1}
                </span>
                <span className="font-display font-bold text-white/20 text-7xl md:text-8xl relative">
                  0{index + 1}
                </span>
              </div>
            </div>

            {/* Animated Corner Accents */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-white/60 rounded-tl-xl animate-pulse" />
              <div
                className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-white/60 rounded-tr-xl animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-white/60 rounded-bl-xl animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
              <div
                className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-white/60 rounded-br-xl animate-pulse"
                style={{ animationDelay: "0.6s" }}
              />
            </div>

            {/* Floating shadow */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-2xl transition-all duration-300"
              style={{
                background: getProjectGradient(project.image),
                opacity: isHovered ? 0.6 : 0.3,
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-center space-y-5 relative z-10">
          {/* Title & Context */}
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:text-background transition-colors duration-500">
              {project.title}
            </h3>
            <p className="text-muted-foreground mt-1 text-sm md:text-base group-hover:text-background/90">
              {project.context}
            </p>
          </div>

          {/* Problem & Approach */}
          <div className="space-y-4">
            <div className="bg-muted/20 rounded-xl p-4 border border-border/30 backdrop-blur-sm group-hover:border-primary/20 transition-colors duration-300 group-hover:bg-primary/5">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary/80 mb-2 block">
                The Problem
              </span>
              <p className="text-sm text-foreground/80 leading-relaxed group-hover:text-background/90">
                {project.problem}
              </p>
            </div>

            <div className="bg-muted/20 rounded-xl p-4 border border-border/30 backdrop-blur-sm group-hover:border-primary/20 transition-colors duration-300 group-hover:bg-primary/5">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary/80 mb-2 block">
                My Approach
              </span>
              <p className="text-sm text-foreground/80 leading-relaxed group-hover:text-background/90">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                const url = project.liveUrl || project.repoUrl;
                if (url) window.open(url, "_blank", "noopener,noreferrer");
              }}
              aria-label={
                project.liveUrl
                  ? "Open live project"
                  : project.repoUrl
                    ? "Open project repository"
                    : "View project"
              }
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            >
              <ExternalLink size={16} />
              View Project
            </button>
            <button
              onClick={onViewDecisions}
              className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-border/50 text-foreground rounded-full font-medium text-sm hover:border-primary/50 hover:text-primary transition-all duration-300 group/btn"
            >
              See how I solved this
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
