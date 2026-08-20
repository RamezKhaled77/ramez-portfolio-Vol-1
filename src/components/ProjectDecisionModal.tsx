import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  X,
  Lightbulb,
  Scale,
  AlertTriangle,
  Rocket,
  FileText,
  ChevronRight,
} from "lucide-react";

interface ProjectDecision {
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
}

interface ProjectDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDecision | null;
}

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent my-8" />
);

const ProjectDecisionModal = ({
  isOpen,
  onClose,
  project,
}: ProjectDecisionModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Handle ESC key and lock background scrolling.
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Save previous overflow values so we can restore them exactly
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // focus the close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      // restore previous overflow values
      document.body.style.overflow = prevBodyOverflow || "";
      document.documentElement.style.overflow = prevHtmlOverflow || "";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Render modal into a portal to ensure it's positioned relative to the viewport
  // and unaffected by ancestor transforms or stacking contexts.
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-background/90 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal - centered in viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[80vh] bg-card/95 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 80px -20px hsl(var(--primary) / 0.15)",
          }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border/30 px-6 md:px-8 py-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary/80 mb-1 block">
                  Engineering Decisions
                </span>
                <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-all duration-300 hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="Close modal"
              >
                <X
                  size={18}
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </button>
            </div>
          </div>

          {/* Scrollable Content with custom scrollbar */}
          <div className="overflow-y-auto max-h-[calc(80vh-80px)] px-6 md:px-8 py-6 modal-scrollbar">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              {/* Context Section */}
              <motion.section variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Context
                  </h3>
                </div>
                <p className="text-foreground/90 leading-relaxed pl-12 text-base">
                  {project.context}
                </p>
              </motion.section>

              <SectionDivider />

              {/* Key Decisions Section */}
              <motion.section variants={itemVariants}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lightbulb size={18} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Key Decisions
                  </h3>
                </div>
                <div className="space-y-4 pl-12">
                  {project.decisions.map((decision, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group bg-muted/20 hover:bg-muted/40 rounded-xl p-4 border border-border/20 hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <ChevronRight
                          size={16}
                          className="text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                        />
                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground">
                            {decision.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="text-foreground/70 font-medium">
                              Why:
                            </span>{" "}
                            {decision.why}
                          </p>
                          {decision.alternatives && (
                            <p className="text-sm text-muted-foreground/80 leading-relaxed">
                              <span className="text-foreground/60 font-medium">
                                Alternatives considered:
                              </span>{" "}
                              {decision.alternatives}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <SectionDivider />

              <motion.section variants={itemVariants}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Scale size={18} className="text-destructive" />
                  </div>
                  <h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Trade-offs
                  </h3>
                </div>
                <div className="space-y-3 pl-12">
                  {project.tradeoffs.map((tradeoff, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-muted/20 rounded-xl p-4 border border-border/20"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-xs font-medium tracking-wider uppercase text-primary/70">
                            Gained
                          </span>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {tradeoff.gained}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground/70">
                            Sacrificed
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {tradeoff.sacrificed}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <SectionDivider />

              {/* Challenges Section */}
              <motion.section variants={itemVariants}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle size={18} className="text-destructive" />
                  </div>
                  <h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Challenges
                  </h3>
                </div>
                <div className="space-y-3 pl-12">
                  {project.challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive/50 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                          {challenge.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <SectionDivider />

              {/* What I'd Improve Section */}
              <motion.section variants={itemVariants}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Rocket size={18} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    What I'd Improve Next
                  </h3>
                </div>
                <div className="space-y-3 pl-12">
                  {project.improvements.map((improvement, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <span className="text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {improvement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Footer Note */}
              <motion.div
                variants={itemVariants}
                className="mt-10 pt-6 border-t border-border/20 text-center"
              >
                <p className="text-xs text-muted-foreground/60 italic">
                  These decisions reflect real engineering thinking — balancing
                  constraints, user needs, and technical excellence.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectDecisionModal;
