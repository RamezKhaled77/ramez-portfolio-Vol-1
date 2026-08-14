import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const titles = [
    "Front-End Developer",
    "React Specialist",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setHasStartedTyping(true);
    }, 2500);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!hasStartedTyping) return;

    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, hasStartedTyping]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-animated">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.1),transparent_50%)]" />
      </div>

      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-72 h-72 border-2 border-primary/20 rounded-full animate-spin-slow" />
        <div className="absolute top-1/3 right-[15%] w-96 h-96 border-2 border-accent/15 rotate-45 animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-[20%] w-48 h-48 border-2 border-primary/25 rounded-full animate-float" />
        <div
          className="absolute top-[15%] right-[25%] w-32 h-32 bg-primary/10 rounded-lg rotate-12 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-64 h-64 border border-accent/20 rotate-45 animate-spin-slow"
          style={{ animationDelay: "2s", animationDirection: "reverse" }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div
        className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-accent/20 blur-3xl animate-float-slow"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-primary/15 blur-2xl animate-pulse-slow"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container mx-auto px-6 relative z-10  pb-6">
        <div className="max-w-5xl mx-auto text-center ">
          {/* Main Content */}
          <div className="space-y-8  pb-3">
            <div className="inline-block animate-fade-in">
              <span className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4 block h-6">
                {displayText}
                <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle animate-blink" />
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tight mb-6">
              <span className="block text-heading">Ramez Khaled</span>
            </h1>

            {/* One-line descriptor */}
            <p
              className="text-base md:text-lg text-muted-foreground font-mono tracking-wide animate-fade-in pt-6"
              style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
            >
              Frontend Developer who thinks in systems, not screens.
            </p>

            <p
              className="text-lg md:text-xl lg:text-2xl text-body max-w-3xl mx-auto font-body leading-relaxed animate-fade-in pb-8"
              style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
            >
              Transforming ideas into beautiful,
              <span className="text-primary font-medium"> playful</span>, and
              <span className="text-primary font-medium">
                {" "}
                user-focused
              </span>{" "}
              web interfaces.
            </p>

            <div
              className="flex flex-row items-center justify-center gap-4 animate-fade-in "
              style={{ animationDelay: "1.8s", animationFillMode: "forwards" }}
            >
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base md:text-lg px-6 py-4 md:px-8 md:py-6 hover-lift"
              >
                View Projects
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                variant="outline"
                className="border-2 border-foreground hover:bg-foreground hover:text-background font-medium text-base md:text-lg px-6 py-4 md:px-8 md:py-6 hover-lift"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
