import { useState, useEffect } from "react";
import { MessageCircle, Github, Linkedin, Mail, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MagneticWrapper from "@/components/MagneticWrapper";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/RamezKhaled77",
    label: "GitHub",
    color: "hover:bg-[#222] hover:text-white",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/ramez-khaled",
    label: "LinkedIn",
    color: "hover:bg-[#0077B5] hover:text-white",
  },
  {
    icon: Mail,
    href: "mailto:ramezkhaled259@gmail.com",
    label: "Email",
    color: "hover:bg-primary hover:text-white",
  },
  {
    icon: Phone,
    href: "https://wa.me/1022069607",
    label: "WhatsApp",
    color: "hover:bg-[#25D366] hover:text-white",
  },
];

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const scroller = (document.scrollingElement ||
      document.documentElement) as HTMLElement;

    const handleScroll = () => {
      const scrollTop = scroller?.scrollTop ?? window.scrollY;
      setIsVisible(scrollTop > 300);
    };

    scroller?.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      scroller?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed top-20 left-6 z-50 flex flex-col-reverse items-center gap-3 transition-all duration-500",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none",
      )}
    >
      {/* Social Links */}
      <div
        className={cn(
          "flex flex-col gap-2 transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        {socialLinks.map((link, index) => (
          <MagneticWrapper key={link.label} strength={0.4} radius={80}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border shadow-lg transition-all duration-300",
                link.color,
              )}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                transform: isOpen ? "scale(1)" : "scale(0)",
              }}
            >
              <link.icon className="w-5 h-5" />
              <span className="absolute left-full ml-3 px-2 py-1 text-xs font-medium bg-card border border-border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {link.label}
              </span>
            </a>
          </MagneticWrapper>
        ))}
      </div>

      {/* Main FAB Button */}
      <MagneticWrapper strength={0.25} radius={100}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className={cn(
            "w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110",
            isOpen
              ? "bg-destructive hover:bg-destructive/90 rotate-180"
              : "bg-primary hover:bg-primary/90",
          )}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </MagneticWrapper>
    </div>
  );
};

export default FloatingActionButton;
