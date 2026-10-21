"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  HelpCircle,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { trackEvent } from "@/lib/tracking";

function renderFormattedAnswer(text, currentLocale = "en") {
  if (!text || typeof text !== "string" || !text.includes("[")) return text;
  const parts = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isDocLink = href.startsWith("/docs");

    if (isDocLink) {
      // Direct <a> to avoid next-intl prefixing /fr/docs/... which causes a 404
      let targetHref = href;
      const isAlreadyLocalized = /^\/docs\/(fr|es|zh)\b/.test(href);
      if (!isAlreadyLocalized && currentLocale !== "en") {
        targetHref = `/docs/${currentLocale}/${href.replace(/^\/docs\/?/, "")}`;
      }
      parts.push(
        <a
          key={`${match.index}-${href}`}
          href={targetHref}
          className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors font-medium"
        >
          {label}
        </a>
      );
    } else {
      parts.push(
        <Link
          key={`${match.index}-${href}`}
          href={href}
          className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors font-medium"
        >
          {label}
        </Link>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

const FAQ = ({ asHeading = "h2" }) => {
  const QuestionHeading = asHeading === "h1" ? "h2" : "h3";
  const t = useTranslations();
  const currentLocale = useLocale();
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
        {asHeading === "h1" && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-primary-300 transition-colors">
                  {currentLocale === "fr" ? "Accueil" : currentLocale === "es" ? "Inicio" : currentLocale === "zh" ? "首页" : "Home"}
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-600">/</li>
              <li className="text-primary-400 font-medium" aria-current="page">
                {t("faq.title")}
              </li>
            </ol>
          </nav>
        )}

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary-500/10 border border-primary-500/30 rounded-xl mb-4">
            <HelpCircle className="h-6 w-6 text-primary-400" />
          </div>
          {asHeading === "h1" ? (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              {t("faq.title")}
            </h1>
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              {t("faq.title")}
            </h2>
          )}
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
                <QuestionHeading className="text-foreground font-medium pr-4">
                  {faq.q}
                </QuestionHeading>
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
                    {renderFormattedAnswer(faq.a, currentLocale)}
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
