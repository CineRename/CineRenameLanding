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

    const isYes =
      val === "Oui" || val === "Yes" || val === "Sí" || val === "支持";
    const startsWithYes =
      val.startsWith("Oui") ||
      val.startsWith("Yes") ||
      val.startsWith("Sí") ||
      val.startsWith("支持");
    const isNo =
      val === "Non" || val === "No" || val === "不支持";
    const startsWithNo =
      isNo ||
      val.startsWith("Non (") ||
      val.startsWith("No (") ||
      val.startsWith("不支持（");

    if (isCineRename) {
      if (isNo) {
        return (
          <div className="flex items-center gap-1.5 text-rose-400 font-medium">
            <X className="h-4 w-4 flex-shrink-0" />
            <span>{val}</span>
          </div>
        );
      }
      if (startsWithYes) {
        return (
          <div className="flex items-center gap-1.5 text-secondary-400 font-medium text-xs sm:text-sm">
            <Check className="h-4 w-4 flex-shrink-0 text-secondary-400" />
            <span>{val}</span>
          </div>
        );
      }
      return <span className="text-gray-100 font-medium text-xs sm:text-sm">{val}</span>;
    }

    if (isYes) {
      return (
        <div className="flex items-center gap-1.5 text-secondary-400 font-medium">
          <Check className="h-4 w-4 flex-shrink-0" />
          <span>{val}</span>
        </div>
      );
    }
    if (startsWithNo) {
      return (
        <div className="flex items-center gap-1.5 text-rose-400 font-medium text-xs">
          <X className="h-4 w-4 flex-shrink-0" />
          <span>{val}</span>
        </div>
      );
    }
    const isWarning =
      val.includes("Groovy") ||
      val.includes("scripts") ||
      val.includes("脚本") ||
      val.includes("impossible") ||
      val.includes("Payant") ||
      val.includes("version Pro") ||
      val.includes("Pro version") ||
      val.includes("De pago") ||
      val.includes("收费") ||
      val.includes("Basique") ||
      val.includes("Basic") ||
      val.includes("básico") ||
      val.includes("基础");

    if (isWarning) {
      return (
        <div className="flex items-center gap-1.5 text-amber-400 text-xs">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span>{val}</span>
        </div>
      );
    }
    if (startsWithYes) {
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
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-primary-300 transition-colors">
                  {currentLocale === "fr" ? "Accueil" : currentLocale === "es" ? "Inicio" : currentLocale === "zh" ? "首页" : "Home"}
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-600">/</li>
              <li className="text-primary-400 font-medium" aria-current="page">
                {t("alternativesPage.title")}
              </li>
            </ol>
          </nav>

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
            <h2 className="text-lg font-bold text-foreground mb-2">
              {t("alternativesPage.ui.javaTitle")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("alternativesPage.ui.javaText")}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="p-2.5 w-fit rounded-xl bg-amber-500/10 text-amber-400 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">
              {t("alternativesPage.ui.previewTitle")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("alternativesPage.ui.previewText")}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">
              {t("alternativesPage.ui.pricingTitle")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("alternativesPage.ui.pricingText")}
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
              {t("alternativesPage.ui.tableIntro")}
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
                          {t("alternativesPage.ui.topPick")}
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
              {t("alternativesPage.ui.detailTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("alternativesPage.ui.detailIntro")}
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
                <span>{t("alternativesPage.ui.downloadFree")}</span>
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
                  {t("alternativesPage.ui.whyChoose")}
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
                <span>{t("alternativesPage.ui.seeFilebot")}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {tools.filebot?.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-surface-elevated/40 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-400 mb-3">
                  {t("alternativesPage.ui.strengths")}
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
                  {t("alternativesPage.ui.limitations")}
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
                <span>{t("alternativesPage.ui.seeTmm")}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {tools.tinymediamanager?.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-surface-elevated/40 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-400 mb-3">
                  {t("alternativesPage.ui.strengths")}
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
                  {t("alternativesPage.ui.limitations")}
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
                  {t("alternativesPage.ui.strengths")}
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
                  {t("alternativesPage.ui.limitations")}
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
                <span>{t("alternativesPage.ui.seeBru")}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {tools.bulkrename?.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-surface-elevated/40 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-400 mb-3">
                  {t("alternativesPage.ui.strengths")}
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
                  {t("alternativesPage.ui.limitations")}
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

        {/* Contextual Link to Renaming Guide */}
        <div className="mb-20 p-6 rounded-2xl border border-border bg-surface-elevated/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300">
            {t("alternativesPage.ui.howToText")}
          </p>
          <Link
            href="/how-to-rename"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary-500/40 bg-primary-500/10 hover:bg-primary-500/20 text-primary-300 font-semibold text-xs whitespace-nowrap transition-colors"
          >
            <span>{t("alternativesPage.ui.howToLink")}</span>
            <ArrowRight className="h-3.5 w-3.5" />
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
        <div className="border-t border-border pt-12">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-foreground mb-2">
              {t("alternativesPage.ui.allComparisons")}
            </h3>
            <p className="text-xs text-muted-foreground max-w-xl mx-auto">
              {currentLocale === "fr"
                ? "Consultez nos analyses comparatives détaillées face à chaque outil du marché pour choisir la solution adaptée à votre médiathèque."
                : currentLocale === "es"
                ? "Consulta nuestras comparativas detalladas frente a cada software para elegir la mejor herramienta para tu biblioteca."
                : currentLocale === "zh"
                ? "查看我们针对市面上各类重命名工具的深度对比分析，为您的媒体库挑选最适合的方案。"
                : "Explore our in-depth comparisons against every popular media organizer to find the right fit for your library."}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { href: "/vs-filebot", label: "vs FileBot", category: "Plex / Bulk" },
              { href: "/vs-tinymediamanager", label: "vs tinyMediaManager", category: "NFO / Kodi" },
              { href: "/vs-sonarr", label: "vs Sonarr", category: "TV Series" },
              { href: "/vs-radarr", label: "vs Radarr", category: "Movies" },
              { href: "/vs-shoko-anime", label: "vs Shoko Anime", category: "Anime" },
              { href: "/vs-tv-rename", label: "vs TV Rename", category: "Windows TV" },
              { href: "/vs-rename-my-tv-series", label: "vs Rename My TV Series", category: "TV Series" },
              { href: "/vs-advanced-renamer", label: "vs Advanced Renamer", category: "Batch Tool" },
              { href: "/vs-bulk-rename-utility", label: "vs Bulk Rename Utility", category: "Batch Tool" },
              { href: "/vs-mediaelch", label: "vs MediaElch", category: "NFO / Kodi" },
              { href: "/vs-movie-renamer", label: "vs Movie Renamer", category: "Movies" },
              { href: "/vs-therenamer", label: "vs theRenamer", category: "Legacy" },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group p-3 rounded-xl border border-border bg-surface hover:bg-surface-elevated hover:border-primary-500/40 transition-all text-center flex flex-col justify-between"
              >
                <span className="text-xs font-semibold text-gray-200 group-hover:text-primary-300 transition-colors">
                  {c.label}
                </span>
                <span className="mt-1 text-[10px] text-muted-foreground/80 uppercase tracking-wider font-mono">
                  {c.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
