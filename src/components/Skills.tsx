import ScrollReveal from "./ScrollReveal";
import SkillCard from "./SkillCard";

const Skills = () => {
  // Core skills (highlighted)
  const coreSkills = [
    {
      name: "React",
      icon: "react",
      color: "hsl(193, 95%, 68%)",
      isCore: true,
    },
    {
      name: "JavaScript",
      icon: "javascript",
      color: "hsl(53, 93%, 54%)",
      isCore: true,
    },
    {
      name: "TypeScript",
      icon: "typescript",
      color: "hsl(211, 60%, 48%)",
      isCore: true,
    },
  ];

  // Supporting skills
  const supportingSkills = [
    {
      name: "HTML",
      icon: "html",
      color: "hsl(15, 100%, 55%)",
      isCore: false,
    },
    {
      name: "CSS",
      icon: "css",
      color: "hsl(210, 100%, 55%)",
      isCore: false,
    },
    {
      name: "Git & GitHub",
      icon: "git",
      color: "hsl(0, 0%, 20%)",
      isCore: false,
    },
    {
      name: "Tailwind",
      icon: "tailwind",
      color: "hsl(199, 89%, 48%)",
      isCore: false,
    },
    {
      name: "API Integration",
      icon: "api",
      color: "hsl(270, 80%, 60%)",
      isCore: false,
    },
    {
      name: "UI Implementation",
      icon: "ui",
      color: "hsl(340, 80%, 60%)",
      isCore: false,
    },
  ];

  const skills = [...coreSkills, ...supportingSkills];

  // Duplicate skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section
      id="skills"
      className="py-24 md:py-32 bg-section-alt relative overflow-hidden"
    >
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                What I Work With
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-heading">
                My <span className="text-gradient">Skills</span>
              </h2>

              {/* Core Skills Highlight */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {coreSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-5 py-2.5 rounded-full border-2 border-primary/40 bg-primary/10 flex items-center gap-2 hover:bg-primary/15 hover:border-primary/50 transition-colors"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="font-semibold text-primary">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Core Specializations
              </p>
            </div>
          </ScrollReveal>

          {/* Double Row Infinite Scroll Container */}
          <div className="relative overflow-hidden py-8 space-y-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-section-alt to-transparent z-10" />

            {/* First Row - Scrolling Right */}
            <div className="flex gap-4 animate-scroll-x ">
              {duplicatedSkills.map((skill, index) => (
                <SkillCard
                  key={`row1-${skill.name}-${index}`}
                  skill={skill}
                  index={index}
                />
              ))}
            </div>

            {/* Second Row - Scrolling Left */}
            <div className="flex gap-4 animate-scroll-x-reverse">
              {duplicatedSkills.map((skill, index) => (
                <SkillCard
                  key={`row2-${skill.name}-${index}`}
                  skill={skill}
                  index={index}
                />
              ))}
            </div>

            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-section-alt to-transparent z-10" />
          </div>

          <ScrollReveal delay={200}>
            <p className="text-center text-muted-foreground mt-8">
              Hover to pause • Scroll smoothly • Built with modern tech
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Skills;
