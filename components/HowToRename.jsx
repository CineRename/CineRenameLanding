"use client";
import React, { useState } from "react";
import {
  FileText,
  CheckCircle2,
  Tv,
  Film,
  Clapperboard,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { trackEvent } from "@/lib/tracking";
import {
  Step1DropAnimation,
  Step2MetadataAnimation,
  Step2StudioAnimation,
  Step4ExecutionAnimation,
  Step3ReadyAnimation,
} from "./ProcessStepAnimations";

export default function HowToRename() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const [copiedKey, setCopiedKey] = useState(null);

  const steps = t.raw("howToRenamePage.steps") || [];
  const conventions = t.raw("howToRenamePage.conventions") || {};

  const copyExample = (key, text) => {
    navigator.clipboard.writeText(text);
    trackEvent("copier_convention", { type: key });
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const stepComponents = [
    <Step1DropAnimation key="step-1" />,
    <Step2MetadataAnimation key="step-2" />,
    <Step2StudioAnimation key="step-3" />,
    <Step4ExecutionAnimation key="step-4" />,
    <Step3ReadyAnimation key="step-5" />,
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Header / Hero */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-gradient-to-b from-surface/50 to-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <FileText className="h-3.5 w-3.5" />
            <span>{t("howToRenamePage.eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-6">
            {t("howToRenamePage.title")}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("howToRenamePage.subtitle")}
          </p>
        </div>
      </section>

      {/* 5 Steps Section with Live Interactive Animations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-3xl border border-border bg-surface ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-br from-primary-500 to-amber-500 text-white font-black text-lg mb-4 shadow-md">
                  {step.number}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {currentLocale === "fr"
                      ? "100% automatique et sans risque pour vos fichiers"
                      : "100% automated and non-destructive"}
                  </span>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                {stepComponents[index] || <Step1DropAnimation key={index} />}
              </div>
            </div>
          ))}
        </div>

        {/* Naming Conventions Cheat Sheet */}
        <div className="mt-20 rounded-3xl border border-border bg-surface p-8 sm:p-10 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {conventions.title}
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {currentLocale === "fr"
                ? "Ces conventions garantissent que vos serveurs Plex, Jellyfin, Emby et Kodi reconnaissent vos séries et films à 100% sans aucun raté."
                : "These conventions guarantee that Plex, Jellyfin, Emby and Kodi match your media with 100% accuracy."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Movies */}
            <div className="rounded-2xl border border-border bg-surface-elevated p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary-400 font-bold mb-3">
                  <Film className="h-5 w-5" />
                  <span>{conventions.movies?.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {currentLocale === "fr"
                    ? "Structure pour les longs métrages avec dossier dédié :"
                    : "Recommended folder structure for feature films:"}
                </p>
                <div className="p-3 rounded-xl bg-background border border-border font-mono text-xs text-gray-200 break-all select-all">
                  {conventions.movies?.example}
                </div>
              </div>
              <button
                onClick={() => copyExample("movies", conventions.movies?.example)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface/80 text-xs text-gray-300 transition-colors"
              >
                {copiedKey === "movies" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-secondary-400" />
                    <span>{currentLocale === "fr" ? "Copié !" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{currentLocale === "fr" ? "Copier le modèle" : "Copy template"}</span>
                  </>
                )}
              </button>
            </div>

            {/* TV Shows */}
            <div className="rounded-2xl border border-border bg-surface-elevated p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-3">
                  <Tv className="h-5 w-5" />
                  <span>{conventions.shows?.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {currentLocale === "fr"
                    ? "Structure pour les séries TV par saisons :"
                    : "Standard season hierarchy for television series:"}
                </p>
                <div className="p-3 rounded-xl bg-background border border-border font-mono text-xs text-gray-200 break-all select-all">
                  {conventions.shows?.example}
                </div>
              </div>
              <button
                onClick={() => copyExample("shows", conventions.shows?.example)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface/80 text-xs text-gray-300 transition-colors"
              >
                {copiedKey === "shows" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-secondary-400" />
                    <span>{currentLocale === "fr" ? "Copié !" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{currentLocale === "fr" ? "Copier le modèle" : "Copy template"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Anime */}
            <div className="rounded-2xl border border-border bg-surface-elevated p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-secondary-400 font-bold mb-3">
                  <Clapperboard className="h-5 w-5" />
                  <span>{conventions.anime?.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {currentLocale === "fr"
                    ? "Structure avec numérotation absolue pour animes :"
                    : "Absolute numbering convention for Japanese anime:"}
                </p>
                <div className="p-3 rounded-xl bg-background border border-border font-mono text-xs text-gray-200 break-all select-all">
                  {conventions.anime?.example}
                </div>
              </div>
              <button
                onClick={() => copyExample("anime", conventions.anime?.example)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface/80 text-xs text-gray-300 transition-colors"
              >
                {copiedKey === "anime" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-secondary-400" />
                    <span>{currentLocale === "fr" ? "Copié !" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{currentLocale === "fr" ? "Copier le modèle" : "Copy template"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl border border-primary-500/30 bg-gradient-to-r from-primary-500/10 via-amber-500/10 to-primary-500/10 p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {conventions.cta?.title || "Prêt à renommer vos médias ?"}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8">
            {currentLocale === "fr"
              ? "Téléchargez gratuitement CineRename et essayez le renommage automatique en 30 secondes."
              : "Download CineRename for free and try automated renaming in 30 seconds."}
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-foreground font-bold text-base transition-all shadow-lg hover:shadow-primary-500/30"
          >
            <span>{conventions.cta?.button || "Télécharger CineRename"}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
