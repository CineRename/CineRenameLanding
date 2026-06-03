"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { Clock, Zap, ArrowRight, Brain, Hourglass, Check } from "lucide-react";
import { useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

// Inner component that uses hooks
const FinalCTAContent = () => {
  const t = useTranslations('finalCTA');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent("section_affichee", { section: "final_cta" });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 lg:py-16 2xl:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 flex justify-center">
            <Brain className="w-14 h-14 text-white/90" />
          </div>
          <h2 className="mx-auto text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-2">
            {t('title')}
          </h2>
        </div>

        {/* Time breakdown cards */}
        <div className="space-y-6 max-w-2xl mx-auto mb-12">
          {/* Current situation */}
          <div className="bg-surface-elevated backdrop-blur-sm rounded-2xl p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">
                <Hourglass className="w-7 h-7 text-gray-300" />
              </div>
              <div>
                <p className="text-lg text-gray-200">
                  {t('calculation.spending')}
                </p>
              </div>
            </div>
          </div>

          {/* With CineRename */}
          <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-500/30">
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">
                <Zap className="w-7 h-7 text-primary-400" />
              </div>
              <div>
                <p className="text-lg text-foreground font-semibold">
                  {t('calculation.withCineRename')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Value proposition */}
        <div className="text-center mb-12">
          <p className="text-2xl text-foreground font-bold mb-2">
            {t('question')}
          </p>
          <p className="text-gray-300">
            {t('atRate')}
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={`/${currentLocale}/download`}
            onClick={() => trackEvent("clic_bouton_bas_de_page", { cta: "download" })}
            className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-2xl hover:shadow-3xl transition-all duration-200"
          >
            {t('startNow')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-secondary-400" />
            <span>{t('badges.freeTrial')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-secondary-400" />
            <span>{t('badges.moneyBack')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-secondary-400" />
            <span>{t('badges.oneTime')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-secondary-400" />
            <span>{t('badges.localPrivate')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Wrapper component with Suspense for useSearchParams
const FinalCTA = () => {
  return (
    <Suspense fallback={<FinalCTAFallback />}>
      <FinalCTAContent />
    </Suspense>
  );
};

// Fallback component while loading
const FinalCTAFallback = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-4 flex justify-center">
            <Brain className="w-14 h-14 text-foreground/90" />
          </div>
          <div className="h-12 bg-surface-elevated rounded w-64 mx-auto mb-4 animate-pulse" />
        </div>
        <div className="space-y-6 max-w-2xl mx-auto mb-12">
          <div className="bg-surface-elevated rounded-2xl p-8 border border-border">
            <div className="h-16 bg-surface rounded animate-pulse" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="h-16 bg-surface-elevated rounded-xl w-48 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;