import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import DeveloperOS from "@/components/DeveloperOS";
import Projects from "@/components/Projects";
import CodeIDE from "@/components/CodeIDE";
import DesignCode from "@/components/DesignCode";
import ProductivityStack from "@/components/ProductivityStack";
import Quote from "@/components/Quote";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionIndicator from "@/components/SectionIndicator";
import FloatingActionButton from "@/components/FloatingActionButton";
import ParallaxBackground from "@/components/ParallaxBackground";
import FloatingParticles from "@/components/FloatingParticles";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import HowMyBrainWorks from "@/components/HowMyBrainWorks";
import CodeIDETwo from "@/components/CodeIDETwo";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <div
        className={`min-h-screen scroll-smooth overflow-x-hidden transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <ScrollProgress />
        <ParallaxBackground />
        <FloatingParticles />
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
        <SectionIndicator />
        <FloatingActionButton />
        <main>
          <section id="hero">
            <ScrollReveal variant="blur" duration={800}>
              <Hero />
            </ScrollReveal>
          </section>
          <section id="about">
            <ScrollReveal variant="fade-up" delay={100} duration={800}>
              <About />
            </ScrollReveal>
          </section>
          <section id="skills">
            <ScrollReveal variant="scale" delay={100} duration={700}>
              <Skills />
            </ScrollReveal>
          </section>
          <section id="developer-os">
            <ScrollReveal variant="fade-up" delay={100} duration={800}>
              <DeveloperOS />
            </ScrollReveal>
          </section>
          <section id="brain">
            <ScrollReveal variant="fade-up" delay={100} duration={800}>
              <HowMyBrainWorks />
            </ScrollReveal>
          </section>
          <section id="projects">
            <ScrollReveal variant="fade-left" delay={100} duration={800}>
              <Projects />
            </ScrollReveal>
          </section>
          <section id="code-ide">
            <ScrollReveal variant="fade-right" delay={100} duration={800}>
              <CodeIDE />
            </ScrollReveal>
          </section>
          <section id="design-code">
            <ScrollReveal variant="fade-up" delay={100} duration={800}>
              <DesignCode />
            </ScrollReveal>
          </section>
          <section id="productivity-stack">
            <ScrollReveal variant="fade-up" delay={100} duration={800}>
              <ProductivityStack />
            </ScrollReveal>
          </section>
          <section id="quote">
            <ScrollReveal variant="blur" delay={100} duration={900}>
              <Quote />
            </ScrollReveal>
          </section>
          <section id="testimonials">
            <ScrollReveal variant="scale" delay={100} duration={700}>
              <Testimonials />
            </ScrollReveal>
          </section>
          <section id="contact">
            <ScrollReveal variant="fade-up" delay={100} duration={800}>
              <Contact />
            </ScrollReveal>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
