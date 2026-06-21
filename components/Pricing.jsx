"use client";
import React, { useLayoutEffect, useEffect, useRef, Suspense, useState } from "react";
import {
  Check,
  Shield,
  Zap,
  Download,
  Flame,
  Gem,
  FlaskConical,
  Lock,
  BadgeDollarSign,
  Calendar,
  Crown,
  Mail,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAttribution } from "@/hooks/useAttribution";
import { trackEvent } from "@/lib/tracking";
import posthog from "posthog-js";

gsap.registerPlugin(ScrollTrigger);

// Inner component that uses hooks
const PricingContent = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const { buildLemonSqueezyUrl } = useAttribution();
  const rootRef = useRef(null);
  const titleRef = useRef(null);

  const [dynamicPrices, setDynamicPrices] = useState(null);

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setDynamicPrices(data);
      })
      .catch(console.error);
  }, []);

  const formatPrice = (baseString, dynamicPrice) => {
    if (!dynamicPrice) return baseString;
    const localizedPrice = ["fr", "es"].includes(currentLocale)
      ? dynamicPrice.replace(".", ",")
      : dynamicPrice;
    return baseString.replace(/[\d.,]+/, localizedPrice);
  };

  const freePlan = {
    name: t("pricing.plans.free.title"),
    price: t("pricing.plans.free.price"),
    period: t("pricing.plans.free.period"),
    description: t("pricing.plans.free.billing"),
    features: t.raw("pricing.plans.free.features") || [],
    limitation: t("pricing.plans.free.limitation"),
  };

  const plans = [
    {
      id: "monthly",
      name: t("pricing.plans.monthly.title"),
      icon: Calendar,
      price: formatPrice(t("pricing.plans.monthly.price"), dynamicPrices?.monthly),
      period: t("pricing.plans.monthly.period"),
      description: t("pricing.plans.monthly.billing"),
      features: t.raw("pricing.plans.monthly.features") || [],
      popular: false,
    },
    {
      id: "annual",
      name: t("pricing.plans.annual.title"),
      icon: Gem,
      price: formatPrice(t("pricing.plans.annual.price"), dynamicPrices?.annual),
      period: t("pricing.plans.annual.period"),
      description: t("pricing.plans.annual.billing"),
      features: t.raw("pricing.plans.annual.features") || [],
      popular: false,
      discountBadge: "-58 %",
    },
    {
      id: "lifetime",
      name: t("pricing.plans.lifetime.title"),
      icon: Crown,
      price: formatPrice(t("pricing.plans.lifetime.price"), dynamicPrices?.lifetime),
      originalPrice: t("pricing.plans.lifetime.originalPrice"),
      period: t("pricing.plans.lifetime.period"),
      description: t("pricing.plans.lifetime.earlyBird"),
      features: t.raw("pricing.plans.lifetime.features") || [],
      popular: true,
      badge: t("pricing.plans.lifetime.badge"),
    },
  ];

  useLayoutEffect(() => {
    let splitInst = null;

    const ctx = gsap.context(() => {
      const title = rootRef.current?.querySelector(
        '[data-animate="pricing-title"]'
      );
      const subtitle = rootRef.current?.querySelector(
        '[data-animate="pricing-subtitle"]'
      );
      const cards = gsap.utils.toArray(
        rootRef.current?.querySelectorAll('[data-animate="pricing-card"]')
      );
      const badges = gsap.utils.toArray(
        rootRef.current?.querySelectorAll('[data-animate="pricing-badge-item"]')
      );
      const trustIndicators = gsap.utils.toArray(
        rootRef.current?.querySelectorAll('[data-animate="pricing-trust"]')
      );

      // Title animation with SplitText
      if (title && titleRef.current) {
        gsap.set(titleRef.current, { y: 30 });

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
          onEnter: async () => {
            try {
              const mod = await import("@activetheory/split-text");
              const SplitText = mod.default || mod;
              splitInst = new SplitText(title, { type: "words" });
              const words = splitInst.words;

              gsap.set(words, {
                yPercent: 130,
                display: "inline-block",
                willChange: "transform",
                force3D: true,
              });

              gsap.set(titleRef.current, { opacity: 1, y: 0 });

              gsap.to(words, {
                yPercent: 0,
                duration: 0.9,
                ease: "power4.out",
                stagger: { each: 0.06, from: "start" },
              });
            } catch (e) {
              // Fallback animation
              gsap.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
              });
            }
          },
        });
      }

      // Subtitle animation
      if (subtitle) {
        gsap.set(subtitle, { y: 20, opacity: 0 });
        gsap.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            once: true,
          },
          delay: 0.3,
        });
      }

      // Badges animation
      if (badges.length) {
        gsap.set(badges, { opacity: 0, y: 15, scale: 0.9 });
        gsap.to(badges, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Cards animation
      cards.forEach((card, i) => {
        const badge = card.querySelector('[data-animate="pricing-badge"]');
        const icon = card.querySelector('[data-animate="pricing-icon"]');
        const price = card.querySelector('[data-animate="pricing-price"]');
        const originalPrice = card.querySelector(
          '[data-animate="pricing-original"]'
        );
        const period = card.querySelector('[data-animate="pricing-period"]');
        const description = card.querySelector('[data-animate="pricing-desc"]');
        const features = card.querySelectorAll(
          '[data-animate="pricing-feature"]'
        );
        const button = card.querySelector('[data-animate="pricing-button"]');
        const subtext = card.querySelector('[data-animate="pricing-subtext"]');

        // Initial states
        gsap.set(card, { opacity: 0, y: 40, scale: 0.95 });
        if (badge) gsap.set(badge, { opacity: 0, scale: 0, y: -10 });
        if (icon) gsap.set(icon, { opacity: 0, rotate: -180 });
        if (price) gsap.set(price, { opacity: 0, scale: 0.8 });
        if (originalPrice) gsap.set(originalPrice, { opacity: 0, x: 20 });
        if (period) gsap.set(period, { opacity: 0, y: 10 });
        if (description) gsap.set(description, { opacity: 0, y: 10 });
        if (features.length) gsap.set(features, { opacity: 0, x: -20 });
        if (button) gsap.set(button, { opacity: 0, y: 20 });
        if (subtext) gsap.set(subtext, { opacity: 0 });

        const baseDelay = i * 0.1;

        // Card entrance
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: baseDelay + 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });

        // Badge animation
        if (badge) {
          gsap.to(badge, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "back.out(1.7)",
            delay: baseDelay + 0.3,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        }

        // Icon animation
        if (icon) {
          gsap.to(icon, {
            opacity: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power3.out",
            delay: baseDelay + 0.35,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        }

        // Price animation
        if (price) {
          gsap.to(price, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.3)",
            delay: baseDelay + 0.4,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        }

        // Original price animation
        if (originalPrice) {
          gsap.to(originalPrice, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power3.out",
            delay: baseDelay + 0.45,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        }

        // Period and description animation
        const textElements = [period, description].filter(Boolean);
        if (textElements.length) {
          gsap.to(textElements, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out",
            stagger: 0.05,
            delay: baseDelay + 0.5,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        }

        // Features animation
        if (features.length) {
          gsap.to(features, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power3.out",
            stagger: 0.04,
            delay: baseDelay + 0.55,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        }

        // Button animation
        if (button) {
          gsap.to(button, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
            delay: baseDelay + 0.7,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        }

        // Subtext animation
        if (subtext) {
          gsap.to(subtext, {
            opacity: 1,
            duration: 0.3,
            ease: "power3.out",
            delay: baseDelay + 0.75,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        }
      });

      // Trust indicators animation
      if (trustIndicators.length) {
        gsap.set(trustIndicators, { opacity: 0, y: 20 });
        gsap.to(trustIndicators, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: trustIndicators[0],
            start: "top 90%",
            once: true,
          },
        });
      }
    }, rootRef);

    return () => {
      try {
        splitInst?.revert && splitInst.revert();
      } catch {}
      ctx.revert();
    };
  }, []);

  // PostHog: track when pricing section becomes visible
  useEffect(() => {
    const section = rootRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            posthog.capture("pricing_viewed");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="pricing"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            data-animate="pricing-title"
            className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl mx-auto font-bold text-foreground mb-4 overflow-hidden"
            style={{ opacity: 0 }}
          >
            {t("pricing.title")}
          </h2>
          <p data-animate="pricing-subtitle" className="text-xl text-gray-300" style={{ opacity: 0 }}>
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div
            data-animate="pricing-badge-item"
            className="flex items-center gap-2 bg-secondary-500/10 text-secondary-300 px-4 py-2.5 rounded-full text-sm font-semibold border border-secondary-500/30"
            style={{ opacity: 0 }}
          >
            <FlaskConical className="w-4 h-4" />
            {t("pricing.benefits.freeTry")}
          </div>
          <div
            data-animate="pricing-badge-item"
            className="flex items-center gap-2 bg-primary-500/10 text-primary-300 px-4 py-2.5 rounded-full text-sm font-semibold border border-primary-500/30"
            style={{ opacity: 0 }}
          >
            <Lock className="w-4 h-4" />
            {t("pricing.benefits.payExport")}
          </div>
          <div
            data-animate="pricing-badge-item"
            className="flex items-center gap-2 bg-surface-elevated text-gray-200 px-4 py-2.5 rounded-full text-sm font-semibold border border-border"
            style={{ opacity: 0 }}
          >
            <BadgeDollarSign className="w-4 h-4" />
            {t("pricing.benefits.moneyBack")}
          </div>
        </div>

        {/* Free plan banner */}
        <div data-animate="pricing-card" className="mb-8 max-w-4xl mx-auto" style={{ opacity: 0 }}>
          <div className="bg-surface-elevated rounded-3xl shadow-xl border border-secondary-500/40 shadow-secondary-500/10 overflow-hidden">
            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="text-center md:text-left md:min-w-[160px]">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  <span className="inline-flex items-center gap-2">
                    <Download className="w-5 h-5 text-secondary-400" />
                    {freePlan.name}
                  </span>
                </h3>
                <span className="text-4xl font-black text-foreground">{freePlan.price}</span>
                <p className="text-gray-400 mt-1">{freePlan.period}</p>
                <p className="text-sm font-semibold text-secondary-400">{freePlan.description}</p>
              </div>

              <div className="flex-1 flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
                {freePlan.features.map((feature, idx) => (
                  <span key={idx} className="flex items-center text-gray-200">
                    <Check className="h-4 w-4 text-secondary-400 mr-2 flex-shrink-0" />
                    {feature}
                  </span>
                ))}
                {freePlan.limitation && (
                  <span className="flex items-center text-gray-500">
                    <Lock className="h-4 w-4 mr-2 flex-shrink-0" />
                    {freePlan.limitation}
                  </span>
                )}
              </div>

              <div className="text-center md:text-right shrink-0">
                <a
                  href={`/${currentLocale}/download`}
                  onClick={() => trackEvent("clic_bouton_prix", { plan: "free", action: "download_trial" })}
                  className="inline-block px-8 py-4 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-secondary-500 to-secondary-600 text-secondary-foreground hover:from-secondary-600 hover:to-secondary-700 hover:shadow-xl transition-all"
                >
                  {t("pricing.downloadFree")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Paid plans grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="relative" data-animate="pricing-card" style={{ opacity: 0 }}>
              {/* Badge */}
              {plan.badge && (
                <div
                  data-animate="pricing-badge"
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`bg-surface-elevated rounded-3xl shadow-xl border ${
                  plan.popular
                    ? "border-primary-500 shadow-primary-500/20"
                    : "border-border"
                } overflow-hidden h-full`}
              >
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      <span className="inline-flex flex-wrap items-center justify-center gap-2">
                        <plan.icon
                          data-animate="pricing-icon"
                          className={`w-5 h-5 ${
                            plan.popular ? "text-primary-400" : "text-gray-400"
                          }`}
                        />
                        {plan.name}
                        {plan.discountBadge && (
                          <span className="rounded-full bg-primary-500/12 px-2 py-0.5 text-[11px] font-black leading-none text-primary-300 ring-1 ring-primary-500/25">
                            {plan.discountBadge}
                          </span>
                        )}
                      </span>
                    </h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span
                        data-animate="pricing-price"
                        className="text-5xl font-black text-foreground"
                      >
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span
                          data-animate="pricing-original"
                          className="text-xl text-gray-500 line-through"
                        >
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                    <p
                      data-animate="pricing-period"
                      className="text-lg text-gray-400 mt-2"
                    >
                      {plan.period}
                    </p>
                    <p
                      data-animate="pricing-desc"
                      className={`text-sm font-semibold mt-1 ${
                        plan.popular ? "text-primary-400" : "text-gray-400"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        data-animate="pricing-feature"
                        className="flex items-center"
                      >
                        <Check className="h-5 w-5 text-secondary-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    data-animate="pricing-button"
                    href={`/${currentLocale}/download`}
                    onClick={() => trackEvent("clic_bouton_prix", { plan: plan.id, action: "download_trial" })}
                    className={`block w-full text-center py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground hover:from-primary-600 hover:to-primary-700 hover:shadow-xl"
                        : "bg-surface text-foreground hover:bg-gray-800 border border-border hover:shadow-lg"
                    }`}
                  >
                    {t("pricing.downloadTrial")}
                  </a>
                  <p
                    data-animate="pricing-subtext"
                    className="mt-3 text-center text-sm text-gray-400"
                  >
                    {t("pricing.alreadyTried")}{" "}
                    <a
                      href={buildLemonSqueezyUrl()}
                      onClick={() => trackEvent("clic_bouton_prix", { plan: plan.id, action: "buy_license" })}
                      className="text-primary-300 underline hover:no-underline"
                    >
                      {t("pricing.buyLicense")}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Note */}
        <div className="mt-12 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-gray-400 bg-surface-elevated/50 px-6 py-4 rounded-2xl border border-border">
          <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
          <p className="text-sm font-medium">{t("pricing.deliveryNote")}</p>
        </div>

        {/* Bottom CTA removed to reduce redundancy with freemium flow */}
      </div>
    </section>
  );
};

// Wrapper component with Suspense for useSearchParams
const Pricing = () => {
  return (
    <Suspense fallback={<PricingFallback />}>
      <PricingContent />
    </Suspense>
  );
};

// Fallback component while loading
const PricingFallback = () => {
  return (
    <section
      id="pricing"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-12 bg-surface-elevated rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-surface-elevated rounded w-96 mx-auto animate-pulse" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface-elevated rounded-3xl shadow-xl border border-border p-8">
              <div className="h-8 bg-surface rounded w-32 mx-auto mb-4 animate-pulse" />
              <div className="h-12 bg-surface rounded w-24 mx-auto mb-4 animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-5 bg-surface rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
