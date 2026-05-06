"use client";

import React, { useRef, useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import { Bug, Lightbulb, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackEvent } from "@/lib/tracking";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const t = useTranslations("contact");
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(rootRef.current?.querySelectorAll('[data-animate="contact-card"]'));
      
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 30 });
        
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
            });
          },
          once: true
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const contactMethods = [
    {
      id: "bug",
      icon: Bug,
      title: t("cards.bug.title"),
      description: t("cards.bug.description"),
      buttonText: t("cards.bug.button"),
      href: "https://github.com/Epikaigle/CineRename/issues/new",
      color: "text-red-400",
      bgHover: "hover:border-red-500/50 hover:shadow-red-500/10",
      action: "open_bug_report"
    },
    {
      id: "feature",
      icon: Lightbulb,
      title: t("cards.feature.title"),
      description: t("cards.feature.description"),
      buttonText: t("cards.feature.button"),
      href: "https://github.com/Epikaigle/CineRename/discussions/new?category=ideas",
      color: "text-yellow-400",
      bgHover: "hover:border-yellow-500/50 hover:shadow-yellow-500/10",
      action: "open_feature_request"
    },
    {
      id: "email",
      icon: Mail,
      title: t("cards.email.title"),
      description: t("cards.email.description"),
      buttonText: t("cards.email.button"),
      href: "mailto:contact@cinerename.com", // You may want to update this email
      color: "text-primary-400",
      bgHover: "hover:border-primary-500/50 hover:shadow-primary-500/10",
      action: "send_email"
    }
  ];

  return (
    <section ref={rootRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method) => (
            <div 
              key={method.id}
              data-animate="contact-card"
              className={`bg-surface-elevated border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300 ${method.bgHover}`}
            >
              <div className={`w-14 h-14 rounded-full bg-background flex items-center justify-center mb-6 shadow-inner ${method.color}`}>
                <method.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{method.title}</h3>
              <p className="text-gray-400 mb-8 flex-grow">{method.description}</p>
              
              <a
                href={method.href}
                target={method.id !== "email" ? "_blank" : undefined}
                rel={method.id !== "email" ? "noopener noreferrer" : undefined}
                onClick={() => trackEvent("contact_clicked", { type: method.id })}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-background border border-border text-foreground font-medium rounded-xl hover:bg-gray-800 transition-colors"
              >
                {method.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
