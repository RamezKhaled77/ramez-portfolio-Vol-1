import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ];

  const scrollToTop = () => {
    const scroller = (document.scrollingElement ||
      document.documentElement) as HTMLElement;
    scroller.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-section-alt border-t border-card-border">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Logo & Tagline */}
          <div className="text-center">
            <button
              onClick={scrollToTop}
              className="text-3xl font-display font-bold hover:text-primary transition-colors mb-2"
            >
              RK<span className="text-primary">.</span>
            </button>
            <p className="text-muted-foreground text-sm max-w-xs">
              Crafting digital experiences that inspire and engage.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative p-3 rounded-full bg-background/50 border border-card-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon
                    size={18}
                    className="text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300"
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Bottom Section */}
          <div className="flex items-center justify-center gap-4 w-full text-sm text-muted-foreground">
            <div>© {currentYear} Ramez Khaled. All rights reserved.</div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary hover:border-primary transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp
              size={18}
              className="text-primary group-hover:text-primary-foreground transition-colors"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
