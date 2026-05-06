"use client";
import React, { useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  ArrowDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OptimizedImage from "./OptimizedImage";
import dynamic from "next/dynamic";
import { trackEvent } from "@/lib/tracking";

const AnimatedBackground = dynamic(
  () => import("../src/components/three/AnimatedBackground"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-500/20 via-primary-700/10 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="hidden sm:block absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-secondary-500/15 via-secondary-700/10 to-transparent rounded-full blur-3xl opacity-50"></div>
        <div className="hidden sm:block absolute top-1/3 left-0 w-[420px] h-[420px] bg-gradient-to-r from-primary-700/15 to-transparent rounded-full blur-2xl opacity-40"></div>
      </div>
    )
  }
);

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const rootRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    let splitInst1 = null;
    let splitInst2 = null;

    const ctx = gsap.context(() => {
      const badge = rootRef.current?.querySelector('[data-animate="hero-badge"]');
      const titleLine1 = rootRef.current?.querySelector('[data-animate="hero-title-line1"]');
      const titleLine2 = rootRef.current?.querySelector('[data-animate="hero-title-line2"]');
      const description = rootRef.current?.querySelector('[data-animate="hero-description"]');
      const buttons = rootRef.current?.querySelectorAll('[data-animate="hero-button"]');

      if (badge) {
        const icon = badge.querySelector('[data-animate="hero-badge-icon"]');
        gsap.set(badge, { opacity: 0, y: 20, scale: 0.9 });
        if (icon) gsap.set(icon, { rotate: -360, scale: 0 });

        gsap.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)", delay: 0.2 });
        if (icon) gsap.to(icon, { rotate: 0, scale: 1, duration: 1, ease: "back.out(2.5)", delay: 0.3 });
      }

      const animateTitle = async () => {
        try {
          const mod = await import("@activetheory/split-text");
          const SplitText = mod.default || mod;

          if (titleLine1) {
            splitInst1 = new SplitText(titleLine1, { type: "words" });
            const words1 = splitInst1.words;
            gsap.set(words1, { yPercent: 120, display: "inline-block", willChange: "transform", force3D: true });
            gsap.set(titleRef.current, { visibility: 'visible', y: 0 });
            gsap.to(words1, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.05, delay: 0.4 });
          }

          if (titleLine2) {
            splitInst2 = new SplitText(titleLine2, { type: "words" });
            const words2 = splitInst2.words;
            words2.forEach((word) => {
              word.classList.add(
                "bg-gradient-to-r",
                "from-primary-500",
                "to-primary-300",
                "bg-clip-text",
                "text-transparent"
              );
            });
            gsap.set(words2, { yPercent: 120, display: "inline-block", willChange: "transform", force3D: true });
            gsap.to(words2, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.05, delay: 0.6 });
          }
        } catch (e) {
          gsap.set(titleRef.current, { visibility: 'visible' });
          gsap.fromTo(titleLine1, { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "power4.out", delay: 0.4 });
          gsap.fromTo(titleLine2, { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "power4.out", delay: 0.6 });
        }
      };

      if (titleRef.current) {
        gsap.set(titleRef.current, { visibility: 'hidden' });
        animateTitle();
      }

      if (description) {
        gsap.set(description, { opacity: 0, y: 30 });
        gsap.to(description, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1 });
      }

      if (buttons.length) {
        gsap.set(buttons, { opacity: 0, y: 30, scale: 0.9 });
        gsap.to(buttons, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.5)", stagger: 0.1, delay: 1.2 });
      }

      const steps = gsap.utils.toArray(rootRef.current?.querySelectorAll('[data-animate="hero-step"]'));
      const arrows = gsap.utils.toArray(rootRef.current?.querySelectorAll('[data-animate="hero-arrow"]'));

      steps.forEach((step, i) => {
        const badge = step.querySelector('[data-animate="step-badge"]');
        const title = step.querySelector('[data-animate="step-title"]');
        const image = step.querySelector('[data-animate="step-image"]');
        const glow = step.querySelector('[data-animate="step-glow"]');

        gsap.set(step, { opacity: 0, y: 60 });
        if (badge) gsap.set(badge, { scale: 0, rotate: -180 });
        if (title) gsap.set(title, { x: -30, opacity: 0 });
        if (image) gsap.set(image, { opacity: 0, y: 20, filter: "blur(10px)" });
        if (glow) gsap.set(glow, { opacity: 0 });

        ScrollTrigger.create({
          trigger: step,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline({ delay: i === 0 ? 1.4 : 0 });
            tl.to(step, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
            if (badge) tl.to(badge, { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" }, "-=0.6");
            if (title) tl.to(title, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5");
            if (image) tl.to(image, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, "-=0.3");
            if (glow) tl.to(glow, { opacity: 0.5, duration: 1.2, ease: "power2.inOut" }, "-=0.8");
          },
        });

        if (arrows[i]) {
          gsap.set(arrows[i], { opacity: 0, y: -20, scale: 0 });
          ScrollTrigger.create({
            trigger: arrows[i],
            start: "top 90%",
            once: true,
            onEnter: () => {
              gsap.to(arrows[i], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
              gsap.to(arrows[i], { y: 10, duration: 1, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.5 });
            },
          });
        }
      });
    }, rootRef);

    return () => {
      try {
        splitInst1?.revert && splitInst1.revert();
        splitInst2?.revert && splitInst2.revert();
      } catch {}
      ctx.revert();
    };
  }, []);

  const stepImages = [
    { src: "/assets/img/screen-studio.png", alt: t("hero.images.rawFootage") },
    { src: "/assets/img/screen-settings.png", alt: t("hero.images.processing") },
    { src: "/assets/img/screen-licence.png", alt: t("hero.images.cleanTimeline") },
  ];

  const stepKeys = ["step1", "step2", "step3"];

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <AnimatedBackground />

      <div className="relative max-w-7xl mx-auto text-center">
        <div>
          <div
            data-animate="hero-badge"
            className="opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 mb-8"
          >
            <Sparkles
              data-animate="hero-badge-icon"
              className="w-4 h-4 text-primary-400"
            />
            <span className="text-sm font-medium text-primary-300">
              {t("hero.badge")}
            </span>
          </div>

          <h1
            ref={titleRef}
            data-animate="hero-title"
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight tracking-tight mx-auto"
            style={{ visibility: 'hidden' }}
          >
            <span className="block overflow-hidden">
              <span data-animate="hero-title-line1" className="inline-block">
                {t("hero.titleLine1")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-animate="hero-title-line2"
                className="inline-block bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent"
              >
                {t("hero.titleLine2")}
              </span>
            </span>
          </h1>

          <p
            data-animate="hero-description"
            className="opacity-0 mt-6 text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              data-animate="hero-button"
              href={`/${currentLocale}/download`}
              onClick={() => trackEvent("cta_clicked", { location: "hero", type: "download" })}
              className="opacity-0 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all"
            >
              <Zap className="w-4 h-4 mr-2" />
              {t("hero.cta.main")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>

            <a
              data-animate="hero-button"
              href="#demo"
              onClick={() => trackEvent("cta_clicked", { location: "hero", type: "watch_demo" })}
              className="opacity-0 inline-flex items-center justify-center px-6 py-3 bg-surface-elevated text-foreground font-medium rounded-lg hover:bg-gray-800 border border-border transition-all"
            >
              <Play className="w-4 h-4 mr-2" />
              {t("hero.cta.secondary")}
            </a>
          </div>
        </div>

        <div className="mt-20 relative">
          <h2 className="sr-only">How it works in three steps</h2>
          <div className="relative max-w-5xl mx-auto">
            <div className="space-y-12">
              {stepKeys.map((key, i) => (
                <React.Fragment key={key}>
                  <div data-animate="hero-step" className="opacity-0 space-y-4">
                    <div className="flex items-center gap-4">
                      <div
                        data-animate="step-badge"
                        className={`flex items-center justify-center w-10 h-10 ${
                          i === 0
                            ? "bg-gradient-to-br from-primary-500 to-primary-600"
                            : i === 1
                              ? "bg-gradient-to-br from-primary-400 to-primary-500"
                              : "bg-gradient-to-br from-secondary-500 to-secondary-600"
                        } text-white rounded-full font-bold shadow-lg`}
                      >
                        {i + 1}
                      </div>
                      <h3
                        data-animate="step-title"
                        className="text-lg text-foreground"
                      >
                        <span className="font-semibold">{t(`hero.steps.${key}.prefix`)}</span>{" "}
                        {t(`hero.steps.${key}.title`)}
                      </h3>
                    </div>
                    <div className="relative group">
                      <div
                        data-animate="step-glow"
                        className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
                      ></div>
                      <div className="relative bg-surface-elevated border border-border rounded-xl overflow-hidden shadow-2xl">
                        <OptimizedImage
                          data-animate="step-image"
                          src={stepImages[i].src}
                          alt={stepImages[i].alt}
                          className="w-full"
                          width={1400}
                          height={800}
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {i < stepKeys.length - 1 && (
                    <div
                      data-animate="hero-arrow"
                      className="opacity-0 flex justify-center items-center gap-3 my-4 relative z-10"
                    >
                      <ArrowDown
                        className={`w-8 h-8 ${i === 0 ? "text-primary-500" : "text-secondary-500"}`}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
