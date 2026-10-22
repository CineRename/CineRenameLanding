"use client";
import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  FolderTree,
  Server,
  Film,
  Tv,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Download,
  Share2,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { trackEvent } from "@/lib/tracking";

export interface GuideSection {
  id: string;
  title: string;
  content: string;
  examples?: Array<{
    bad: string;
    good: string;
    explanation: string;
  }>;
  codeBlocks?: Array<{
    title: string;
    code: string;
    language?: string;
  }>;
  callout?: {
    type: "tip" | "warning" | "info";
    title: string;
    text: string;
  };
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface GuidePageProps {
  slug: string;
  categoryBadge: string;
  categoryIcon?: "plex" | "nas" | "anime";
  title: string;
  subtitle: string;
  readTime: string;
  lastUpdated: string;
  authorName: string;
  sections: GuideSection[];
  faq: GuideFaqItem[];
  nextGuide?: {
    slug: string;
    title: string;
    category: string;
  };
  prevGuide?: {
    slug: string;
    title: string;
    category: string;
  };
}

export default function GuidePage({
  slug,
  categoryBadge,
  categoryIcon = "plex",
  title,
  subtitle,
  readTime,
  lastUpdated,
  authorName,
  sections,
  faq,
  nextGuide,
  prevGuide,
}: GuidePageProps) {
  const currentLocale = useLocale();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({ 0: true });

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    trackEvent("copier_guide_code", { guide: slug, id: identifier });
    setCopiedText(identifier);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const homeLabel =
    currentLocale === "fr"
      ? "Accueil"
      : currentLocale === "es"
      ? "Inicio"
      : currentLocale === "zh"
      ? "首页"
      : "Home";

  const guidesLabel =
    currentLocale === "fr"
      ? "Guides"
      : currentLocale === "es"
      ? "Guías"
      : currentLocale === "zh"
      ? "指南"
      : "Guides";

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Header */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-gradient-to-b from-surface/60 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">
                  {homeLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/40">/</li>
              <li>
                <Link href="/guides" className="hover:text-primary-400 transition-colors">
                  {guidesLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/40">/</li>
              <li className="text-primary-400 font-medium truncate max-w-[240px] sm:max-w-md" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          {/* Badge & Meta */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-semibold uppercase tracking-wider">
              {categoryIcon === "nas" ? (
                <Server className="w-3.5 h-3.5" />
              ) : categoryIcon === "anime" ? (
                <Tv className="w-3.5 h-3.5" />
              ) : (
                <Film className="w-3.5 h-3.5" />
              )}
              {categoryBadge}
            </span>
            <span className="text-xs text-muted-foreground/80 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {readTime}
            </span>
            <span className="text-xs text-muted-foreground/60">•</span>
            <span className="text-xs text-muted-foreground/80">
              {currentLocale === "fr" ? "Mis à jour le" : currentLocale === "es" ? "Actualizado el" : currentLocale === "zh" ? "更新于" : "Updated on"} {lastUpdated}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-6">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold">
                SD
              </div>
              <div>
                <span className="font-semibold text-foreground">{authorName}</span>
                <span className="block text-xs text-muted-foreground/70">
                  {currentLocale === "fr" ? "Auteur & Concepteur CineRename" : currentLocale === "es" ? "Autor y Creador de CineRename" : currentLocale === "zh" ? "作者与 CineRename 创作者" : "Author & CineRename Creator"}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title, url: window.location.href });
                } else {
                  copyToClipboard(window.location.href, "share");
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 hover:bg-surface text-muted-foreground hover:text-foreground transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedText === "share" ? (currentLocale === "fr" ? "Lien copié !" : "Link copied!") : (currentLocale === "fr" ? "Partager" : "Share")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content & TOC Layout */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Quick Jump Table of Contents */}
          <div className="mb-12 p-6 rounded-2xl bg-surface/70 border border-border shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-primary-400" />
              <span>{currentLocale === "fr" ? "Sommaire du guide" : currentLocale === "es" ? "Índice de la guía" : currentLocale === "zh" ? "指南目录" : "Table of Contents"}</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {sections.map((sec, idx) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="text-muted-foreground hover:text-primary-400 flex items-center gap-2 py-1 transition-colors group"
                  >
                    <span className="text-xs font-mono text-primary-500/70 group-hover:text-primary-400">{String(idx + 1).padStart(2, "0")}.</span>
                    <span className="truncate">{sec.title}</span>
                  </a>
                </li>
              ))}
              {faq.length > 0 && (
                <li>
                  <a
                    href="#faq"
                    className="text-muted-foreground hover:text-primary-400 flex items-center gap-2 py-1 transition-colors group"
                  >
                    <span className="text-xs font-mono text-primary-500/70 group-hover:text-primary-400">{String(sections.length + 1).padStart(2, "0")}.</span>
                    <span>FAQ</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Guide Sections */}
          <div className="space-y-16">
            {sections.map((sec, secIdx) => (
              <article key={sec.id} id={sec.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary-500/10 text-primary-400 font-mono text-xs font-bold border border-primary-500/20">
                    {secIdx + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    {sec.title}
                  </h2>
                </div>

                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 mb-6">
                  {sec.content.split("\n\n").map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-base text-gray-300 leading-relaxed whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Examples (Bad vs Good) */}
                {sec.examples && sec.examples.length > 0 && (
                  <div className="my-6 space-y-4">
                    {sec.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="rounded-xl border border-border overflow-hidden bg-surface/50 text-sm"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                          {/* Bad Example */}
                          <div className="p-4 bg-red-950/20">
                            <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-2 text-xs uppercase tracking-wider">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{currentLocale === "fr" ? "À éviter (Échec d'indexation)" : "Avoid (Mismatch risk)"}</span>
                            </div>
                            <code className="block p-2.5 rounded bg-black/40 text-red-300 font-mono text-xs break-all border border-red-900/40">
                              {ex.bad}
                            </code>
                          </div>

                          {/* Good Example */}
                          <div className="p-4 bg-emerald-950/20">
                            <div className="flex items-center justify-between gap-1.5 mb-2">
                              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{currentLocale === "fr" ? "Recommandé (100 % reconnu)" : "Recommended (100% matched)"}</span>
                              </div>
                              <button
                                onClick={() => copyToClipboard(ex.good, `ex-${secIdx}-${exIdx}`)}
                                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                                title="Copy"
                              >
                                {copiedText === `ex-${secIdx}-${exIdx}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                            <code className="block p-2.5 rounded bg-black/40 text-emerald-300 font-mono text-xs break-all border border-emerald-900/40">
                              {ex.good}
                            </code>
                          </div>
                        </div>
                        {ex.explanation && (
                          <div className="px-4 py-2.5 bg-surface text-xs text-muted-foreground border-t border-border/40">
                            💡 {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Code Blocks */}
                {sec.codeBlocks && sec.codeBlocks.length > 0 && (
                  <div className="my-6 space-y-4">
                    {sec.codeBlocks.map((cb, cbIdx) => (
                      <div
                        key={cbIdx}
                        className="rounded-xl border border-border overflow-hidden bg-black/60"
                      >
                        <div className="px-4 py-2 bg-surface/80 border-b border-border/40 flex items-center justify-between text-xs text-muted-foreground font-mono">
                          <span>{cb.title}</span>
                          <button
                            onClick={() => copyToClipboard(cb.code, `cb-${secIdx}-${cbIdx}`)}
                            className="flex items-center gap-1 hover:text-foreground transition-colors py-0.5 px-2 rounded bg-surface border border-border/60"
                          >
                            {copiedText === `cb-${secIdx}-${cbIdx}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">{currentLocale === "fr" ? "Copié !" : "Copied!"}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{currentLocale === "fr" ? "Copier" : "Copy"}</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-gray-200 overflow-x-auto leading-relaxed">
                          <code>{cb.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {/* Callout Box */}
                {sec.callout && (
                  <div
                    className={`my-6 p-4 rounded-xl border flex items-start gap-3 text-sm ${
                      sec.callout.type === "warning"
                        ? "bg-amber-950/20 border-amber-900/50 text-amber-200"
                        : sec.callout.type === "tip"
                        ? "bg-primary-950/20 border-primary-900/50 text-primary-200"
                        : "bg-surface border-border text-muted-foreground"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {sec.callout.type === "warning" ? (
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-primary-400" />
                      )}
                    </div>
                    <div>
                      <strong className="block font-semibold text-foreground mb-1">
                        {sec.callout.title}
                      </strong>
                      <p className="text-xs sm:text-sm leading-relaxed">{sec.callout.text}</p>
                    </div>
                  </div>
                )}
              </article>
            ))}

            {/* FAQ Section */}
            {faq.length > 0 && (
              <article id="faq" className="scroll-mt-24 pt-8 border-t border-border">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-primary-400" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    {currentLocale === "fr" ? "Questions Fréquentes" : currentLocale === "es" ? "Preguntas Frecuentes" : currentLocale === "zh" ? "常见问题" : "Frequently Asked Questions"}
                  </h2>
                </div>

                <div className="space-y-3">
                  {faq.map((item, fIdx) => (
                    <div
                      key={fIdx}
                      className="rounded-xl border border-border bg-surface/40 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(fIdx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-surface/60 transition-colors"
                      >
                        <span className="font-semibold text-foreground text-sm sm:text-base">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
                            openFaq[fIdx] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFaq[fIdx] && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-gray-300 leading-relaxed border-t border-border/30 pt-3">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>

          {/* CTA Banner: Automate with CineRename */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary-950/40 via-surface to-amber-950/20 border border-primary-500/30 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLocale === "fr" ? "Ne renommez plus rien à la main" : "Stop manual renaming"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {currentLocale === "fr"
                ? "Appliquez ces conventions en 1 clic avec CineRename"
                : currentLocale === "es"
                ? "Aplica estas convenciones en 1 clic con CineRename"
                : currentLocale === "zh"
                ? "使用 CineRename 一键应用这些命名规范"
                : "Apply these conventions in 1 click with CineRename"}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6">
              {currentLocale === "fr"
                ? "CineRename intègre nativement ces structures de dossiers, résout les séries multi-épisodes, télécharge les sous-titres et surveille vos dossiers en continu."
                : currentLocale === "es"
                ? "CineRename integra de forma nativa estas estructuras de carpetas, resuelve episodios múltiples, descarga subtítulos y supervisa tus carpetas automáticamente."
                : currentLocale === "zh"
                ? "CineRename 原生内置这些文件夹结构，自动解析多集连播，匹配官方元数据，并下载对应字幕。"
                : "CineRename natively integrates these exact folder structures, resolves multi-episode files, downloads subtitles, and watches your incoming folders 24/7."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/download"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-amber-500 text-white font-semibold text-sm hover:from-primary-600 hover:to-amber-600 transition-all shadow-lg shadow-primary-500/25"
              >
                <Download className="w-4 h-4" />
                <span>{currentLocale === "fr" ? "Télécharger CineRename Gratuitement" : currentLocale === "es" ? "Descargar CineRename Gratis" : currentLocale === "zh" ? "免费下载 CineRename" : "Download CineRename Free"}</span>
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-foreground hover:bg-surface/80 text-sm font-semibold transition-all"
              >
                <span>{currentLocale === "fr" ? "Découvrir la version Pro" : "Explore Pro Features"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Next / Previous Guide Navigation */}
          <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevGuide ? (
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={`/guides/${prevGuide.slug}` as any}
                className="p-4 rounded-xl border border-border bg-surface/40 hover:bg-surface hover:border-primary-500/40 transition-all text-left group"
              >
                <span className="text-xs text-muted-foreground block mb-1">
                  ← {currentLocale === "fr" ? "Guide précédent" : "Previous guide"}
                </span>
                <span className="font-semibold text-foreground text-sm group-hover:text-primary-400 transition-colors">
                  {prevGuide.title}
                </span>
              </Link>
            ) : <div />}

            {nextGuide && (
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={`/guides/${nextGuide.slug}` as any}
                className="p-4 rounded-xl border border-border bg-surface/40 hover:bg-surface hover:border-primary-500/40 transition-all text-right group sm:col-start-2"
              >
                <span className="text-xs text-muted-foreground block mb-1">
                  {currentLocale === "fr" ? "Guide suivant" : "Next guide"} →
                </span>
                <span className="font-semibold text-foreground text-sm group-hover:text-primary-400 transition-colors">
                  {nextGuide.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
