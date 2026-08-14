import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useSmoothNavigation } from "./SectionTransition";

const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mainContainer = document.querySelector(".snap-y");
    const sectionIds = ["hero", "about", "skills", "projects", "contact"];

    const handleScroll = () => {
      const scrollTop = mainContainer?.scrollTop || window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Scroll-spy: detect which section is in view
      let currentIndex = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if section is in the top half of viewport
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            currentIndex = i;
            break;
          }
          // Fallback: if section top is above center, it's likely the current section
          if (rect.top <= window.innerHeight / 3) {
            currentIndex = i;
          }
        }
      }
      setActiveIndex(currentIndex);
    };

    mainContainer?.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      mainContainer?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  }, [activeIndex]);

  const navigateToSection = useSmoothNavigation();

  const scrollToSection = (id: string, index: number) => {
    const sectionId = id === "Home" ? "hero" : id.toLowerCase();
    navigateToSection(sectionId);
    setActiveIndex(index);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("Home", 0)}
          className="text-2xl font-display font-bold hover:text-primary transition-colors"
        >
          RK<span className="text-primary">.</span>
        </button>

        {/* Centered Desktop Pill Navigation */}
        <div
          ref={navRef}
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center bg-background/40 backdrop-blur-2xl rounded-full p-1.5 border border-white/20 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20 ring-1 ring-white/10"
        >
          {/* Sliding Indicator */}
          <div
            className="absolute h-[calc(100%-12px)] bg-primary rounded-full"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              transform: "translateZ(0)",
              transition:
                "left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {navItems.map((item, index) => (
            <button
              key={item}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => scrollToSection(item, index)}
              className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                activeIndex === index
                  ? "text-primary-foreground"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <Button
            onClick={() => window.open("/RamezKhaled_CV.pdf", "_blank")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full"
          >
            Download CV
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground hover:text-primary transition-colors"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mx-6 mt-4 flex flex-col gap-2 bg-background/50 backdrop-blur-2xl rounded-2xl p-4 border border-white/20 dark:border-white/10 shadow-xl ring-1 ring-white/10 animate-slide-in-up">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item, index)}
              className={`text-left px-4 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {item}
            </button>
          ))}
          <div className="flex items-center gap-3 px-4 py-2">
            <span className="text-sm font-medium">Theme:</span>
            <ThemeToggle />
          </div>
          <Button
            onClick={() => window.open("/RamezKhaled_CV.pdf", "_blank")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium w-full rounded-full"
          >
            Download CV
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
