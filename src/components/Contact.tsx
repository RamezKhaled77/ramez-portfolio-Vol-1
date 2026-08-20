import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import StaggerItem from "./StaggerItem";

const Contact = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/RamezKhaled77",
      color: "hsl(0, 0%, 20%)",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/ramez-khaled",
      color: "hsl(211, 60%, 48%)",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:ramezkhaled259@gmail.com",
      color: "hsl(0, 76%, 56%)",
    },
    {
      name: "WhatsApp",
      icon: Phone,
      url: "https://wa.me/1022069607",
      color: "hsl(142, 70%, 49%)",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-section-alt relative overflow-hidden"
    >
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                Let's Connect
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-heading mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Feel free to reach out for collaborations, opportunities, or
                just a friendly chat!
              </p>
            </div>
          </ScrollReveal>

          {/* Social Links Grid with Stagger */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {socialLinks.map((link, index) => (
              <StaggerItem key={link.name} index={index} staggerDelay={120}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="glass-card p-8 rounded-2xl hover-lift text-center">
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${link.color}15` }}
                    >
                      <link.icon
                        size={32}
                        style={{ color: link.color }}
                        className="transition-transform group-hover:rotate-12"
                      />
                    </div>
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </h3>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </div>

          {/* CTA Card */}
          <ScrollReveal delay={400}>
            <div className="glass-card p-8 md:p-12 rounded-3xl text-center">
              {/* Human inviting sentence */}
              <p className="text-lg text-muted-foreground/80 mb-4 font-medium">
                Got a problem worth solving? Let's talk.
              </p>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Ready to start a project?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                I'm always interested in hearing about new projects and
                opportunities. Let's bring your ideas to life!
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg px-8 py-6"
                onClick={() =>
                  (window.location.href = "mailto:ramezkhaled259@gmail.com")
                }
              >
                Send Me an Email
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
