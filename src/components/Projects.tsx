import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDecisionModal from "./ProjectDecisionModal";
import ScrollReveal from "./ScrollReveal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "E-Commerce Platform",
      context: "Modern online shopping experience with seamless checkout",
      problem:
        "Users were abandoning carts due to a confusing multi-step checkout process with slow load times and unclear error feedback.",
      approach:
        "Redesigned the checkout into a single-page flow with real-time validation, optimistic UI updates, and skeleton loading states for perceived performance.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      image: "project1",
      liveUrl: "https://example.com/e-commerce",
      repoUrl: "https://github.com/username/e-commerce",
      decisions: {
        title: "E-Commerce Platform",
        context:
          "This project required a scalable e-commerce solution that could handle high traffic during sales events while maintaining a smooth, frustration-free checkout experience.",
        decisions: [
          {
            title: "Single-Page Checkout",
            why: "Consolidated 4 steps into one scrollable page to reduce friction and keep users focused on completing their purchase.",
            alternatives:
              "Multi-step wizard with progress indicator, or accordion-style collapsible sections.",
          },
          {
            title: "Optimistic UI Updates",
            why: "Cart updates feel instant by updating the UI before server confirmation, then reconciling if needed.",
            alternatives: "Traditional request-response with loading spinners.",
          },
          {
            title: "Component-Based Architecture",
            why: "Built reusable product cards, cart items, and form elements to ensure consistency and speed up development.",
          },
        ],
        tradeoffs: [
          {
            gained:
              "Better perceived performance and smoother user experience with instant feedback.",
            sacrificed:
              "Added complexity in error handling and state reconciliation when server responses differ from optimistic updates.",
          },
          {
            gained:
              "Real-time cart synchronization across multiple tabs using WebSocket.",
            sacrificed:
              "Increased infrastructure costs and connection management overhead.",
          },
        ],
        challenges: [
          {
            title: "State Synchronization",
            description:
              "Managing cart state across multiple tabs required implementing a broadcast channel pattern with conflict resolution.",
          },
          {
            title: "Payment Integration",
            description:
              "Handling various payment failure scenarios while maintaining a smooth user experience required careful error boundary design.",
          },
        ],
        improvements: [
          "Implement server-side rendering for better SEO and initial load performance.",
          "Add predictive cart abandonment detection with smart re-engagement prompts.",
          "Optimize bundle size by implementing route-based code splitting.",
        ],
      },
    },
    {
      title: "Task Management App",
      context: "Productivity tool with real-time collaboration features",
      problem:
        "Existing tools were either too simple or overwhelmingly complex, causing teams to lose track of priorities and deadlines.",
      approach:
        "Created a Kanban-style interface with drag-and-drop, real-time sync, and smart notifications that surface only what matters.",
      tech: ["React", "API Integration", "UI Design"],
      image: "project2",
      liveUrl: "https://example.com/task-app",
      repoUrl: "https://github.com/username/task-app",
      decisions: {
        title: "Task Management App",
        context:
          "This project demanded real-time collaboration capabilities with minimal latency, clean state management, and an intuitive interface that doesn't overwhelm users.",
        decisions: [
          {
            title: "Kanban Over Lists",
            why: "Visual board layout provides better spatial awareness of work status compared to traditional lists.",
            alternatives:
              "Traditional list view, calendar view, or timeline/Gantt chart.",
          },
          {
            title: "Optimistic Drag & Drop",
            why: "Tasks move immediately on drag, with background sync to prevent jarring rollbacks.",
          },
          {
            title: "Smart Notifications",
            why: "AI-powered filtering to surface only relevant updates, reducing notification fatigue.",
            alternatives: "Simple rule-based filtering or no filtering at all.",
          },
        ],
        tradeoffs: [
          {
            gained:
              "Data integrity with proper conflict resolution for simultaneous edits.",
            sacrificed:
              "Increased complexity in the sync layer and potential edge cases.",
          },
          {
            gained:
              "Offline support allowing users to continue working without internet.",
            sacrificed:
              "Careful sync logic and storage management when reconnecting.",
          },
        ],
        challenges: [
          {
            title: "Drag Performance",
            description:
              "Optimized drag handlers to prevent jank by virtualizing long task lists and debouncing position updates.",
          },
          {
            title: "Real-time Cursors",
            description:
              "Showing collaborator cursors without overwhelming the UI or network required smart batching and visibility thresholds.",
          },
        ],
        improvements: [
          "Implement keyboard-first navigation for power users.",
          "Add customizable board templates for different workflow types.",
          "Integrate with popular tools like Slack, GitHub, and Google Calendar.",
        ],
      },
    },
    {
      title: "Portfolio Website",
      context: "Creative portfolio with immersive animations",
      problem:
        "Static portfolios fail to showcase interactive development skills and often feel generic and forgettable.",
      approach:
        "Built a scroll-driven narrative experience with micro-interactions, smooth transitions, and performance-conscious animations.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "project3",
      liveUrl: "https://example.com/portfolio",
      repoUrl: "https://github.com/username/portfolio",
      decisions: {
        title: "Portfolio Website",
        context:
          "The goal was to create a memorable, distinctive portfolio that demonstrates technical skill while remaining accessible and performant across all devices.",
        decisions: [
          {
            title: "Scroll-Driven Narrative",
            why: "Each scroll reveals content progressively, creating an engaging story rather than a static page.",
            alternatives:
              "Single page with sections, or multi-page traditional navigation.",
          },
          {
            title: "CSS-First Animations",
            why: "Used CSS animations where possible for better performance, reserving JS for complex sequences.",
          },
          {
            title: "Progressive Enhancement",
            why: "Core content works without JS; animations enhance but aren't required.",
          },
        ],
        tradeoffs: [
          {
            gained:
              "Accessibility compliance with reduced-motion support for users who prefer it.",
            sacrificed:
              "Additional development time and testing for multiple experience modes.",
          },
          {
            gained:
              "Full control over animations and smaller bundle size with custom implementation.",
            sacrificed:
              "Development time that could have been saved using established animation libraries.",
          },
        ],
        challenges: [
          {
            title: "Cross-Browser Consistency",
            description:
              "Ensuring smooth animations across Safari, Firefox, and Chrome required careful testing and strategic fallbacks.",
          },
          {
            title: "Mobile Performance",
            description:
              "Simplified animations on mobile to prevent battery drain and ensure 60fps scrolling on lower-powered devices.",
          },
        ],
        improvements: [
          "Add WebGL-powered 3D elements for hero sections.",
          "Implement view transitions API for smoother page navigations.",
          "Create a CMS integration for easier content updates.",
        ],
      },
    },
    {
      title: "Weather Dashboard",
      context: "Real-time weather visualization with forecasts",
      problem:
        "Weather apps overwhelm users with data, making it hard to quickly understand conditions and plan ahead.",
      approach:
        "Designed a glanceable dashboard with progressive disclosure — key info upfront, details on demand.",
      tech: ["React", "API Integration", "Tailwind"],
      image: "project4",
      liveUrl: "https://example.com/weather",
      repoUrl: "https://github.com/username/weather-dashboard",
      decisions: {
        title: "Weather Dashboard",
        context:
          "This project needed to balance information density with clarity, providing quick glanceable data while offering depth for users who want more details.",
        decisions: [
          {
            title: "Glanceable Design",
            why: "Current conditions visible in under 2 seconds; detailed forecasts expand on interaction.",
            alternatives: "Dense data tables or paginated detailed views.",
          },
          {
            title: "Geolocation First",
            why: "Auto-detect location on load, with search as secondary option for convenience.",
          },
          {
            title: "Visual Weather Icons",
            why: "Custom animated icons that immediately communicate conditions better than text.",
            alternatives: "Static icons or text-only weather descriptions.",
          },
        ],
        tradeoffs: [
          {
            gained: "Cost efficiency by staying within free API tier limits.",
            sacrificed:
              "Slightly less fresh data due to aggressive caching strategy.",
          },
          {
            gained:
              "Focused user experience based on actual decision-making needs.",
            sacrificed:
              "Some granular data options that power users might want.",
          },
        ],
        challenges: [
          {
            title: "Location Permissions",
            description:
              "Gracefully handling denied permissions with clear fallback to manual location entry and helpful prompts.",
          },
          {
            title: "Offline Resilience",
            description:
              "Showing cached data when offline with clear staleness indicators so users know the data age.",
          },
        ],
        improvements: [
          "Add weather alerts with push notifications.",
          "Implement weather-based outfit and activity recommendations.",
          "Add support for multiple saved locations with quick switching.",
        ],
      },
    },
  ];

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
