"use client";
import React from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";
import { trackEvent } from "@/lib/tracking";

const AnimatedBackground = dynamic(
  () => import("./three/AnimatedBackground"),
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

const Hero = () => {
  const t = useTranslations();

  return (
    <section
      className="relative flex items-center justify-center pt-32 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 overflow-clip"
    >
      <AnimatedBackground />

      <div className="relative max-w-7xl mx-auto text-center">
        <div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 mb-8"
          >
            <Sparkles
              className="w-4 h-4 text-primary-400"
            />
            <span className="text-sm font-medium text-primary-300">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-bold text-foreground leading-tight tracking-tight mx-auto">
            <span className="block">
              {t("hero.titleLine1")}
            </span>
            <span className="block bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
              {t("hero.titleLine2")}
            </span>
          </h1>

          <p
            className="mt-6 text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/download"
              onClick={() => trackEvent("clic_bouton_hero", { cta: "download" })}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all"
            >
              <Zap className="w-4 h-4 mr-2" />
              {t("hero.cta.main")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
