import ScrollReveal from "./ScrollReveal";
import StaggerItem from "./StaggerItem";
import { useState, useEffect } from "react";

const About = () => {
  const [counts, setCounts] = useState({ projects: 0, skills: 0, passion: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        projects: Math.floor(5 * progress),
        skills: Math.floor(9 * progress),
        passion: Math.floor(100 * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts({ projects: 3, skills: 9, passion: 100 });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-beige/40 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Title with Creative Layout */}
            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                    Get to Know Me
                  </span>
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-heading leading-tight">
                    About
                    <br />
                    <span className="text-gradient">Myself</span>
                  </h2>
                </div>

                {/* Decorative Shape - Interactive */}
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 bg-primary/20 rounded-3xl rotate-12 transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary/30 group-hover:scale-110 animate-float" />
                  <div className="absolute top-8 left-8 w-32 h-32 border-4 border-primary/30 rounded-3xl -rotate-12 transition-all duration-500 group-hover:-rotate-45 group-hover:border-primary/50 group-hover:scale-110" />
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Bio Content */}
            <ScrollReveal delay={200}>
              <div className="space-y-6">
                <div className="glass-card p-8 md:p-10 rounded-2xl hover-lift group cursor-pointer">
                  <p className="text-base md:text-lg leading-relaxed text-body transition-all duration-300 group-hover:text-foreground">
                    Hi, I'm{" "}
                    <span className="font-semibold text-primary group-hover:text-primary animate-pulse">
                      Ramez
                    </span>{" "}
                    , a passionate{" "}
                    <span className="font-semibold text-foreground">
                      Front-End Developer
                    </span>{" "}
                    who loves building clean, modern, memorable digital
                    interfaces, and thinking in a systems.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-body mt-4 transition-all duration-300 group-hover:text-foreground">
                    I focus on creating playful interactions, smooth animations,
                    and visually striking layouts that deliver a great user
                    experience.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-body mt-4 transition-all duration-300 group-hover:text-foreground">
                    I continuously experiment, learn, and refine my craft to
                    turn ideas into dynamic web experiences.
                  </p>

                  {/* What I Care About */}
                  <div className="mt-6 pt-6 border-t border-card-border">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                      What I Care About
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Clean Systems",
                        "Real-World Impact",
                        "Maintainable Code",
                      ].map((value) => (
                        <span
                          key={value}
                          className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/15 hover:border-primary/30 transition-colors"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats/Highlights - Animated Counters with Stagger */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: counts.projects, label: "Projects", suffix: "+" },
                    { value: counts.skills, label: "Skills", suffix: "+" },
                    { value: counts.passion, label: "Passion", suffix: "%" },
                  ].map((stat, index) => (
                    <StaggerItem
                      key={stat.label}
                      index={index}
                      staggerDelay={150}
                    >
                      <div className="text-center p-4 rounded-xl bg-card border border-card-border hover-lift transition-all duration-300 hover:bg-primary/5 hover:border-primary/30 cursor-pointer group">
                        <div className="text-3xl font-display font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                          {stat.value}
                          {stat.suffix}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 group-hover:text-primary transition-colors">
                          {stat.label}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
