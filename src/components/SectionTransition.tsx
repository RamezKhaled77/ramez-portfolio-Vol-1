import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionContextType {
  isTransitioning: boolean;
  triggerTransition: (targetId: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  triggerTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = useCallback((targetId: string) => {
    setIsTransitioning(true);

    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, []);

  return (
    <TransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center"
          >
            {/* Vignette overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background/60"
            />

            {/* Center blur effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="w-32 h-32 rounded-full bg-primary/20 blur-3xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};

// Hook to handle smooth section navigation with transition effect
export const useSmoothNavigation = () => {
  const { triggerTransition } = useTransition();

  const navigateToSection = useCallback(
    (sectionId: string) => {
      triggerTransition(sectionId);
    },
    [triggerTransition],
  );

  return navigateToSection;
};
