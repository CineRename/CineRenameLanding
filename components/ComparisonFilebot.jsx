"use client";
import React from "react";
import { ArrowRight, Check, Info, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const ComparisonFilebot = () => {
  const t = useTranslations();
  const currentLocale = useLocale();
  const prefix = currentLocale === 'en' ? '' : `/${currentLocale}`;

  const summaryCards = t.raw("comparisonFilebot.summary.cards");
  const chooseCards = t.raw("comparisonFilebot.choose.cards");
  const faqs = t.raw("comparisonFilebot.faq.items");

  const tableRows = [
    { key: "ui", filebotTone: "limited", highlight: true },
    { key: "workflow", filebotTone: "neutral", highlight: false },
    { key: "matching", filebotTone: "strong", highlight: true },
    { key: "templates", filebotTone: "strong", highlight: false },
    { key: "subtitles", filebotTone: "strong", highlight: true },
    { key: "duplicates", filebotTone: "limited", highlight: false },
    { key: "automation", filebotTone: "strong", highlight: true },
    { key: "nas", filebotTone: "strong", highlight: false },
    { key: "pricing", filebotTone: "neutral", highlight: true },
  ].map((row) => ({
    ...row,
    label: t(`comparisonFilebot.table.rows.${row.key}.label`),
    cineRename: t(`comparisonFilebot.table.rows.${row.key}.cineRename`),
    filebot: t(`comparisonFilebot.table.rows.${row.key}.filebot`),
  }));

  const renderFilebotIcon = (tone) => {
    if (tone === "strong") {
      return <Check className="h-5 w-5 text-secondary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />;
    }

    return <Info className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" aria-hidden="true" />;
  };

  return (
    <section className="pt-12 lg:pt-16 pb-14 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-300 mb-4">
            {t("comparisonFilebot.eyebrow")}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("comparisonFilebot.title")}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("comparisonFilebot.subtitle")}
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto mt-4">
            {t("comparisonFilebot.disclaimer")}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-10">
          {summaryCards.map((card) => (
            <div key={card.title} className="rounded-xl border border-border bg-surface p-5">
              <h2 className="text-base font-semibold text-foreground mb-2">{card.title}</h2>
              <p className="text-sm text-muted-foreground leading-6">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <caption className="sr-only">{t("comparisonFilebot.table.caption")}</caption>
              <thead className="bg-surface">
                <tr className="border-b-2 border-border">
                  <th scope="col" className="w-1/4 p-6 font-semibold text-gray-300">
                    {t("comparisonFilebot.table.headers.feature")}
                  </th>
                  <th scope="col" className="w-[37.5%] p-6 font-semibold text-center bg-primary-500/10 border-x-2 border-border">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary-400" aria-hidden="true" />
                      <span className="text-primary-300">{t("comparisonFilebot.table.headers.cineRename")}</span>
                    </div>
                  </th>
                  <th scope="col" className="w-[37.5%] p-6 font-semibold text-center text-gray-400">
                    {t("comparisonFilebot.table.headers.filebot")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.key} className={`border-b border-border last:border-b-0 ${row.highlight ? "bg-primary-500/5" : ""}`}>
                    <th scope="row" className="p-6 font-medium text-gray-300 align-top">
                      {row.label}
                    </th>
                    <td className="p-6 border-x-2 border-border bg-primary-500/5 align-top">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-secondary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-200 leading-6">{row.cineRename}</span>
                      </div>
                    </td>
                    <td className="p-6 align-top">
                      <div className="flex items-start gap-3">
                        {renderFilebotIcon(row.filebotTone)}
                        <span className="text-gray-400 leading-6">{row.filebot}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mt-12">
          {chooseCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">{card.title}</h2>
              <ul className="space-y-3">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-6">
                    <Check className="h-4 w-4 text-primary-300 flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary-500/30 bg-primary-500/10 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-3">{t("comparisonFilebot.verdict.title")}</h2>
          <p className="text-muted-foreground leading-7">{t("comparisonFilebot.verdict.description")}</p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            {t("comparisonFilebot.faq.title")}
          </h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="group rounded-xl border border-border bg-surface p-5">
                <summary className="cursor-pointer list-none font-semibold text-foreground flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-primary-300 transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-3 text-sm text-muted-foreground leading-6">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href={`${prefix}/download`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t("comparisonFilebot.ctaButton")}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonFilebot;
