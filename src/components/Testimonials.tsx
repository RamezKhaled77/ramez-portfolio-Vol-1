import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechCorp",
      image: "testimonial1",
      content:
        "Working with Ramez was an absolute pleasure. His attention to detail and creative approach to web development exceeded our expectations.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager at StartupXYZ",
      image: "testimonial2",
      content:
        "Ramez delivered a stunning website that perfectly captured our brand identity. The animations and user experience are top-notch!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director at Creative Co",
      image: "testimonial3",
      content:
        "The level of professionalism and technical expertise Ramez brought to our project was remarkable. Highly recommended!",
      rating: 5,
    },
    {
      name: "David Thompson",
      role: "Founder at Digital Dreams",
      image: "testimonial4",
      content:
        "Ramez transformed our vision into reality with clean code and beautiful design. His communication throughout the project was excellent.",
      rating: 5,
    },
  ];

  const getTestimonialGradient = (imageId: string) => {
    const gradients: Record<string, string> = {
      testimonial1:
        "linear-gradient(135deg, hsl(260, 82%, 65%), hsl(290, 82%, 65%))",
      testimonial2:
        "linear-gradient(135deg, hsl(195, 92%, 62%), hsl(220, 92%, 62%))",
      testimonial3:
        "linear-gradient(135deg, hsl(340, 82%, 65%), hsl(10, 82%, 65%))",
      testimonial4:
        "linear-gradient(135deg, hsl(145, 70%, 60%), hsl(175, 70%, 60%))",
    };
    return gradients[imageId] || gradients.testimonial1;
  };

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Auto-play
    const autoplay = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, 5000);

    return () => {
      clearInterval(autoplay);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                Client Reviews
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold">
                What People <span className="text-gradient">Say</span>
              </h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Don't just take my word for it - hear from clients who've
                experienced the quality firsthand
              </p>
            </div>
          </ScrollReveal>

          {/* Carousel */}
          <ScrollReveal delay={200}>
            <div className="relative py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.name}
                      className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 px-2"
                    >
                      <div className="glass-card rounded-2xl p-8 md:p-10 h-full transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
                        {/* Quote Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-500 group-hover:rotate-12">
                          <Quote className="text-primary" size={32} />
                        </div>

                        {/* Content */}
                        <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-8 group-hover:text-foreground transition-colors">
                          "{testimonial.content}"
                        </p>

                        {/* Rating Stars */}
                        <div className="flex gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110"
                              style={{ transitionDelay: `${i * 50}ms` }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div
                            className="w-14 h-14 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center"
                            style={{
                              background: getTestimonialGradient(
                                testimonial.image,
                              ),
                            }}
                          >
                            <span className="text-2xl font-bold text-white">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>

                          {/* Name & Role */}
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`transition-all duration-500 rounded-full ${
                      index === selectedIndex
                        ? "w-12 h-3 bg-primary"
                        : "w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-125"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
