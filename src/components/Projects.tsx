import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDecisionModal from "./ProjectDecisionModal";
import ScrollReveal from "./ScrollReveal";
import projectsData from "./projects-data.json";

interface ProjectData {
  title: string;
  context: string;
  problem: string;
  approach: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  decisions: {
    title: string;
    context: string;
    decisions: {
      title: string;
      why: string;
      alternatives?: string;
    }[];
    tradeoffs: {
      gained: string;
      sacrificed: string;
    }[];
    challenges: {
      title: string;
      description: string;
    }[];
    improvements: string[];
  };
}

const projects = projectsData as unknown as ProjectData[];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Transition */}
          <p className="text-center text-muted-foreground/70 text-sm font-medium tracking-wide mb-8">
            Thinking means nothing without execution.
          </p>

          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                Case Studies
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
                Problems I <span className="text-gradient">Solved</span>
              </h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Not just what I built, but how I thought through each challenge
              </p>
            </div>
          </ScrollReveal>

          {/* Projects - Single-column compact list */}
          <div className="space-y-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onViewDecisions={() => setSelectedProject(index)}
                compact
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decision Modal */}
      <ProjectDecisionModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={
          selectedProject !== null ? projects[selectedProject].decisions : null
        }
      />
    </section>
  );
};

export default Projects;
