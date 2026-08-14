import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "code-ide", label: "Code" },
  { id: "quote", label: "Inspiration" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const SectionIndicator = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers = sections.map((section) => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        },
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${section.label}`}
          >
            {/* Label */}
            <span
              className={cn(
                "absolute right-full mr-4 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 origin-right",
                "bg-background/80 backdrop-blur-sm border border-border/50",
                isActive
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100",
              )}
            >
              {section.label}
            </span>

            {/* Dot */}
            <div
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300 border-2",
                isActive
                  ? "bg-primary border-primary scale-125 shadow-lg shadow-primary/50"
                  : "bg-background border-border/50 group-hover:border-primary/50 group-hover:scale-110",
              )}
            >
              {/* Inner glow for active state */}
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
              )}
            </div>

            {/* Connecting line */}
            {section.id !== "contact" && (
              <div
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 w-px h-4 transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-b from-primary to-transparent"
                    : "bg-border/30",
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SectionIndicator;
