"use client";

import React from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

const Hero = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-background px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(249,115,22,0.10),transparent_42%),linear-gradient(135deg,rgba(251,146,60,0.08),transparent_28%),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:auto,auto,64px_64px,64px_64px]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-background" />

      <div className="relative mx-auto max-w-7xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-primary-400" />
          <span className="text-sm font-medium text-primary-300">
            {t("hero.badge")}
          </span>
        </div>

        <h1 className="mx-auto text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl 2xl:text-7xl">
          <span className="block">{t("hero.titleLine1")}</span>
          <span className="block bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
            {t("hero.titleLine2")}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-gray-300 sm:text-xl">
          {t("hero.description")}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={`/${currentLocale}/download`}
            onClick={() => trackEvent("clic_bouton_hero", { cta: "download" })}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-colors hover:from-primary-600 hover:to-primary-700 hover:shadow-xl"
          >
            <Zap className="mr-2 h-4 w-4" />
            {t("hero.cta.main")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
