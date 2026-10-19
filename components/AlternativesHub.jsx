"use client";
import React, { useState } from "react";
import {
  Sparkles,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  FolderSync,
  Subtitles,
  CopyX,
  RotateCcw,
  Plus,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { trackEvent } from "@/lib/tracking";

export default function AlternativesHub() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const tableRows = t.raw("alternativesPage.tableRows") || [];
  const tools = t.raw("alternativesPage.tools") || {};
  const faqs = t.raw("alternativesPage.faq.items") || [];

  const toggleFaq = (index) => {
    const isOpening = openFaqIndex !== index;
    trackEvent("alternatives_faq_clic", { index, action: isOpening ? "open" : "close" });
    setOpenFaqIndex(isOpening ? index : null);
  };

  const renderStatus = (val, isCineRename = false) => {
    if (!val) return null;

    if (isCineRename) {
      if (val === "Non" || val === "No") {
        return (
          <div className="flex items-center gap-1.5 text-rose-400 font-medium">
            <X className="h-4 w-4 flex-shrink-0" />
            <span>{val}</span>
          </div>
        );
      }
      if (val.startsWith("Oui") || val.startsWith("Yes")) {
        return (
          <div className="flex items-center gap-1.5 text-secondary-400 font-medium text-xs sm:text-sm">
            <Check className="h-4 w-4 flex-shrink-0 text-secondary-400" />
            <span>{val}</span>
          </div>
        );
      }
      return <span className="text-gray-100 font-medium text-xs sm:text-sm">{val}</span>;
    }

    if (val === "Oui" || val === "Yes") {
      return (
        <div className="flex items-center gap-1.5 text-secondary-400 font-medium">
          <Check className="h-4 w-4 flex-shrink-0" />
          <span>{val}</span>
        </div>
      );
    }
    if (val === "Non" || val === "No" || val.startsWith("Non (") || val.startsWith("No (")) {
      return (
        <div className="flex items-center gap-1.5 text-rose-400 font-medium text-xs">
          <X className="h-4 w-4 flex-shrink-0" />
          <span>{val}</span>
        </div>
      );
    }
    if (val.includes("Groovy") || val.includes("scripts") || val.includes("impossible") || val.includes("Payant") || val.includes("version Pro") || val.includes("Pro version") || val.includes("Basique") || val.includes("Basic")) {
      return (
        <div className="flex items-center gap-1.5 text-amber-400 text-xs">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span>{val}</span>
        </div>
      );
    }
    if (val.startsWith("Oui (") || val.startsWith("Yes (")) {
      return (
        <div className="flex items-center gap-1.5 text-gray-300 text-xs">
          <Check className="h-4 w-4 flex-shrink-0 text-gray-400" />
          <span>{val}</span>
        </div>
      );
    }
    return <span className="text-gray-300 text-xs sm:text-sm">{val}</span>;
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-gradient-to-b from-surface/50 to-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("alternativesPage.eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-6">
            {t("alternativesPage.title")}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("alternativesPage.subtitle")}
          </p>
        </div>
      </section>

      {/* Quick Highlights / Why Switch */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="p-2.5 w-fit rounded-xl bg-primary-500/10 text-primary-400 mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {currentLocale === "fr" ? "Fini la lourdeur de Java" : "No More Heavy Java"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentLocale === "fr"
                ? "FileBot et tinyMediaManager reposent sur Java, entraînant de la latence et une forte consommation mémoire. Les outils modernes comme CineRename sont codés en Rust natif pour une exécution instantanée."
                : "FileBot and tinyMediaManager rely on bulky Java environments. Modern tools like CineRename are compiled natively in Rust for instant execution and minimal RAM footprint."}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="p-2.5 w-fit rounded-xl bg-amber-500/10 text-amber-400 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {currentLocale === "fr" ? "Aperçu avant modification & Annulation" : "Safe Preview & Instant Undo"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentLocale === "fr"
                ? "Ne risquez plus de corrompre les noms de milliers de vidéos. Prévisualisez les pochettes et les correspondances avant d'agir, avec un historique d'annulation en un clic."
                : "Never risk corrupting thousands of files. Preview posters and metadata matches before touching disk, backed by 1-click transaction rollback."}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {currentLocale === "fr" ? "Tarif juste & Licence à vie" : "Fair Pricing & Lifetime License"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentLocale === "fr"
                ? "FileBot facture 80 $ US à vie et RenameFlow 69 €. CineRename propose un essai gratuit complet, puis 1 €/mois, 5 €/an ou une licence Pro à vie à seulement 30 € pour 20 appareils."
                : "FileBot charges $80 USD lifetime and RenameFlow asks €69. CineRename offers a full free trial, €1/mo, €5/yr, or €30 lifetime access for up to 20 devices."}
            </p>
          </div>
        </div>

        {/* Master Comparison Table */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {t("alternativesPage.tableCaption")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {currentLocale === "fr"
                ? "Comparatif direct des 5 solutions les plus populaires pour renommer films, séries et animes."
                : "Side-by-side comparison of the top 5 tools for movies, TV series, and anime."}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left border-collapse">
                <caption className="sr-only">{t("alternativesPage.tableCaption")}</caption>
                <thead>
                  <tr className="border-b-2 border-border bg-surface">
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-gray-300 w-[20%] text-xs uppercase tracking-wider">
                      {t("alternativesPage.tableHeaders.feature")}
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-bold text-center bg-primary-500/15 border-x-2 border-primary-500/40 w-[22%]">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="text-xs uppercase tracking-wider text-primary-300 font-semibold px-2 py-0.5 bg-primary-500/20 rounded-full">
                          {currentLocale === "fr" ? "Vainqueur 2026" : "Top Pick 2026"}
                        </span>
                        <span className="text-base sm:text-lg text-primary-200 font-bold">CineRename</span>
                      </div>
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-center text-gray-300 w-[14.5%]">
                      FileBot
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-center text-gray-300 w-[14.5%]">
                      tinyMediaManager
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-center text-gray-300 w-[14.5%]">
                      RenameFlow
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-center text-gray-300 w-[14.5%]">
                      Bulk Rename Utility
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tableRows.map((row) => (
                    <tr
                      key={row.key}
                      className={`transition-colors hover:bg-surface/60 ${row.highlight ? "bg-primary-500/[0.03]" : ""}`}
                    >
                      <th scope="row" className="p-4 sm:p-5 font-medium text-gray-300 text-xs sm:text-sm align-middle">
                        {row.label}
                      </th>
                      <td className="p-4 sm:p-5 border-x-2 border-primary-500/30 bg-primary-500/[0.06] text-center align-middle font-medium text-gray-100 text-xs sm:text-sm">
                        <div className="flex items-center justify-center">
                          {renderStatus(row.cinerename, true)}
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-center align-middle text-xs sm:text-sm text-gray-300">
                        <div className="flex items-center justify-center">
                          {renderStatus(row.filebot, false)}
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-center align-middle text-xs sm:text-sm text-gray-300">
                        <div className="flex items-center justify-center">
                          {renderStatus(row.tinymediamanager, false)}
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-center align-middle text-xs sm:text-sm text-gray-300">
                        <div className="flex items-center justify-center">
                          {renderStatus(row.renameflow, false)}
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-center align-middle text-xs sm:text-sm text-gray-300">
                        <div className="flex items-center justify-center">
                          {renderStatus(row.bulkrename, false)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown of Each Tool */}
        <div className="mb-20 space-y-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {currentLocale === "fr"
                ? "Analyse détaillée des 5 alternatives"
                : "Detailed Analysis of the 5 Alternatives"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {currentLocale === "fr"
                ? "Forces, faiblesses et public cible pour chaque logiciel."
                : "Strengths, weaknesses, and target audience for each tool."}
            </p>
          </div>

          {/* 1. CineRename */}
          <div className="rounded-3xl border-2 border-primary-500/50 bg-gradient-to-b from-primary-500/10 via-surface to-surface p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-500 text-primary-foreground">
                  {tools.cinerename?.badge}
                </span>
                <h3 className="text-2xl font-black text-foreground">1. CineRename</h3>
              </div>
              <Link
                href="/download"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-primary-foreground font-semibold text-xs transition-all shadow-md"
              >
                <span>{currentLocale === "fr" ? "Télécharger gratuitement" : "Download Free"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              {tools.cinerename?.description}
            </p>
            <div className="rounded-2xl border border-secondary-500/30 bg-secondary-500/10 p-5 sm:p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-400 mb-4 flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>
                  {currentLocale === "fr"
                    ? "Pourquoi choisir CineRename (Points forts & Atouts clés)"
                    : "Why Choose CineRename (Key Strengths & Advantages)"}
                </span>
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-200">
                {tools.cinerename?.pros?.map((pro, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-secondary-400 flex-shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. FileBot */}
          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface-elevated border border-border text-gray-300">
                  {tools.filebot?.badge}
                </span>
                <h3 className="text-xl font-bold text-foreground">2. FileBot</h3>
              </div>
              <Link
                href="/vs-filebot"
                className="text-xs text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>{currentLocale === "fr" ? "Voir le comparatif détaillé vs FileBot" : "See full vs FileBot comparison"}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {tools.filebot?.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-surface-elevated/40 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-400 mb-3">
                  {currentLocale === "fr" ? "Points forts" : "Strengths"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {tools.filebot?.pros?.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-secondary-400 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                  {currentLocale === "fr" ? "Limites" : "Limitations"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {tools.filebot?.cons?.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. tinyMediaManager */}
          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface-elevated border border-border text-gray-300">
                  {tools.tinymediamanager?.badge}
                </span>
                <h3 className="text-xl font-bold text-foreground">3. tinyMediaManager</h3>
              </div>
              <Link
                href="/vs-tinymediamanager"
                className="text-xs text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>{currentLocale === "fr" ? "Voir le comparatif vs tinyMediaManager" : "See vs tinyMediaManager comparison"}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {tools.tinymediamanager?.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-surface-elevated/40 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-400 mb-3">
                  {currentLocale === "fr" ? "Points forts" : "Strengths"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {tools.tinymediamanager?.pros?.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-secondary-400 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                  {currentLocale === "fr" ? "Limites" : "Limitations"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {tools.tinymediamanager?.cons?.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 4. RenameFlow */}
          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface-elevated border border-border text-gray-300">
                  {tools.renameflow?.badge}
                </span>
                <h3 className="text-xl font-bold text-foreground">4. RenameFlow</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {tools.renameflow?.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-surface-elevated/40 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-400 mb-3">
                  {currentLocale === "fr" ? "Points forts" : "Strengths"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {tools.renameflow?.pros?.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-secondary-400 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                  {currentLocale === "fr" ? "Limites" : "Limitations"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {tools.renameflow?.cons?.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 5. Bulk Rename Utility */}
          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface-elevated border border-border text-gray-300">
                  {tools.bulkrename?.badge}
                </span>
                <h3 className="text-xl font-bold text-foreground">5. Bulk Rename Utility</h3>
              </div>
              <Link
                href="/vs-bulk-rename-utility"
                className="text-xs text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>{currentLocale === "fr" ? "Voir le comparatif vs Bulk Rename Utility" : "See vs Bulk Rename Utility comparison"}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {tools.bulkrename?.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-surface-elevated/40 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-400 mb-3">
                  {currentLocale === "fr" ? "Points forts" : "Strengths"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {tools.bulkrename?.pros?.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-secondary-400 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                  {currentLocale === "fr" ? "Limites" : "Limitations"}
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {tools.bulkrename?.cons?.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="mb-20 rounded-3xl border border-primary-500/30 bg-gradient-to-r from-primary-500/10 via-amber-500/10 to-primary-500/10 p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {t("alternativesPage.verdict.title")}
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
            {t("alternativesPage.verdict.text")}
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-foreground font-bold text-base transition-all shadow-lg hover:shadow-primary-500/30"
          >
            <span>{t("alternativesPage.verdict.cta")}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-primary-500/10 border border-primary-500/30 rounded-xl mb-4">
              <HelpCircle className="h-6 w-6 text-primary-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t("alternativesPage.faq.title")}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-surface-elevated rounded-xl border border-border hover:border-primary-500/40 shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <h3 className="text-foreground font-medium pr-4 text-sm sm:text-base">
                    {faq.q}
                  </h3>
                  <div className={`transition-transform duration-300 ${openFaqIndex === index ? "rotate-45" : ""}`}>
                    <Plus className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  </div>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                    openFaqIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden px-6">
                    <p className="text-gray-300 text-sm leading-relaxed pb-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Links Directory */}
        <div className="border-t border-border pt-10 text-center">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            {currentLocale === "fr"
              ? "Toutes nos comparaisons individuelles"
              : "All Individual Software Comparisons"}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: "/vs-filebot", label: "vs FileBot" },
              { href: "/vs-tinymediamanager", label: "vs tinyMediaManager" },
              { href: "/vs-sonarr", label: "vs Sonarr" },
              { href: "/vs-radarr", label: "vs Radarr" },
              { href: "/vs-rename-my-tv-series", label: "vs Rename My TV Series" },
              { href: "/vs-tv-rename", label: "vs TV Rename" },
              { href: "/vs-advanced-renamer", label: "vs Advanced Renamer" },
              { href: "/vs-bulk-rename-utility", label: "vs Bulk Rename Utility" },
              { href: "/vs-mediaelch", label: "vs MediaElch" },
              { href: "/vs-shoko-anime", label: "vs Shoko Anime" },
              { href: "/vs-movie-renamer", label: "vs Movie Renamer" },
              { href: "/vs-therenamer", label: "vs theRenamer" },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="px-3 py-1.5 rounded-lg border border-border bg-surface text-xs text-gray-300 hover:text-primary-300 hover:border-primary-500/40 transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
