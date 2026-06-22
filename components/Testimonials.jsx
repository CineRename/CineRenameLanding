"use client";
import React, { useEffect, useRef } from "react";
import { Star, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

const Testimonials = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent("section_affichee", { section: "testimonials" });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      text: t("testimonials.quotes.0.text"),
      initials: "D",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      role: t("testimonials.quotes.0.role"),
      rating: 5,
    },
    {
      text: t("testimonials.quotes.1.text"),
      initials: "S",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
      role: t("testimonials.quotes.1.role"),
      rating: 5,
    },
    {
      text: t("testimonials.quotes.2.text"),
      initials: "M",
      image: "/avatar3.png",
      role: t("testimonials.quotes.2.role"),
      rating: 5,
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mx-auto font-bold text-foreground mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("testimonials.trustedBy")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-surface-elevated border border-border rounded-2xl p-8 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary-400 text-primary-400"
                      />
                    ))}
                  </div>
                  <MessageCircle className="h-6 w-6 text-primary-500/30" />
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed font-normal">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur-sm opacity-50" />
                    {testimonial.image ? (
                      <img src={testimonial.image} alt="Profile picture" loading="lazy" className="relative w-12 h-12 rounded-full border-2 border-border object-cover" />
                    ) : (
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 border-2 border-border flex items-center justify-center text-white font-bold">
                        {testimonial.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="flex flex-col items-center gap-6">
            <a
              href={`/${currentLocale}/download`}
              onClick={() => trackEvent("clic_bouton_action", { location: "testimonials", type: "download" })}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-2xl hover:shadow-primary-500/25 hover:scale-105 transition-all"
            >
              {t("testimonials.startTrial")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
