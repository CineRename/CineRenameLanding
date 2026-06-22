"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  HelpCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/tracking";

const FAQ = () => {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: t("faq.questions.0.q"), a: t("faq.questions.0.a") },
    { q: t("faq.questions.1.q"), a: t("faq.questions.1.a") },
    { q: t("faq.questions.2.q"), a: t("faq.questions.2.a") },
    { q: t("faq.questions.3.q"), a: t("faq.questions.3.a") },
    { q: t("faq.questions.4.q"), a: t("faq.questions.4.a") },
    { q: t("faq.questions.5.q"), a: t("faq.questions.5.a") },
    { q: t("faq.questions.6.q"), a: t("faq.questions.6.a") },
    { q: t("faq.questions.7.q"), a: t("faq.questions.7.a") },
    { q: t("faq.questions.8.q"), a: t("faq.questions.8.a") },
    { q: t("faq.questions.9.q"), a: t("faq.questions.9.a") },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent("section_affichee", { section: "faq" });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index) => {
    const isOpening = openIndex !== index;

    trackEvent("question_faq_ouverte", {
      question_index: index,
      question: faqs[index].q,
      action: isOpening ? "open" : "close",
    });

    setOpenIndex(isOpening ? index : null);
  };

  return (
    <section ref={sectionRef} id="faq" className="pt-12 pb-24 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary-500/10 border border-primary-500/30 rounded-xl mb-4">
            <HelpCircle className="h-6 w-6 text-primary-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            {t("faq.title")}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface-elevated rounded-xl border border-border hover:border-primary-500/40 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <h3 className="text-foreground font-medium pr-4">
                  {faq.q}
                </h3>
                <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  <Plus className="h-5 w-5 text-primary-400 flex-shrink-0" />
                </div>
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                  openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden px-6">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                  <div className="h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
