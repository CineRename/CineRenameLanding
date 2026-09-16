"use client";
import React from "react";
import { ArrowRight, Check, X, AlertTriangle, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function ComparisonPage({ namespace }) {
  const t = useTranslations();
  const currentLocale = useLocale();
  const prefix = currentLocale === "en" ? "" : `/${currentLocale}`;

  const summaryCards = t.raw(`${namespace}.summary.cards`) || [];
  const chooseCards = t.raw(`${namespace}.choose.cards`) || [];
  const faqs = t.raw(`${namespace}.faq.items`) || [];
  const tableRows = t.raw(`${namespace}.table.rows`) || [];

  const renderCompetitorIcon = (tone) => {
    if (tone === "warning") {
      return (
        <AlertTriangle
          className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
      );
    }
    return (
      <X
        className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5"
        aria-hidden="true"
      />
    );
  };

  return (
    <section className="pt-12 lg:pt-16 pb-14 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-300 mb-4">
            {t(`${namespace}.eyebrow`)}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t(`${namespace}.title`)}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t(`${namespace}.subtitle`)}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-10">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="text-base font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-6">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <caption className="sr-only">
                {t(`${namespace}.table.caption`)}
              </caption>
              <thead className="bg-surface">
                <tr className="border-b-2 border-border">
                  <th
                    scope="col"
                    className="w-1/4 p-6 font-semibold text-gray-300"
                  >
                    {t(`${namespace}.table.headers.feature`)}
                  </th>
                  <th
                    scope="col"
                    className="w-[37.5%] p-6 font-semibold text-center bg-primary-500/10 border-x-2 border-border"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles
                        className="h-5 w-5 text-primary-400"
                        aria-hidden="true"
                      />
                      <span className="text-primary-300">
                        {t(`${namespace}.table.headers.cineRename`)}
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="w-[37.5%] p-6 font-semibold text-center text-gray-400"
                  >
                    {t(`${namespace}.table.headers.competitor`)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-border last:border-b-0 ${
                      row.highlight ? "bg-primary-500/5" : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className="p-6 font-medium text-gray-300 align-top"
                    >
                      {row.label}
                    </th>
                    <td className="p-6 border-x-2 border-border bg-primary-500/5 align-top">
                      <div className="flex items-start gap-3">
                        <Check
                          className="h-5 w-5 text-secondary-400 flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-gray-200 leading-6">
                          {row.cineRename}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 align-top">
                      <div className="flex items-start gap-3">
                        {renderCompetitorIcon(row.tone)}
                        <span className="text-gray-400 leading-6">
                          {row.competitor}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pros & Cons Cards */}
        <div className="grid gap-6 lg:grid-cols-2 mt-12">
          {chooseCards.map((card, idx) => (
            <div
              key={card.title}
              className={`rounded-2xl border p-6 ${
                idx === 0
                  ? "border-primary-500/30 bg-primary-500/5 shadow-lg"
                  : "border-border bg-surface"
              }`}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {card.title}
              </h3>
              <ul className="space-y-3">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground leading-6"
                  >
                    {idx === 0 ? (
                      <Check
                        className="h-4 w-4 text-secondary-400 flex-shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    ) : (
                      <X
                        className="h-4 w-4 text-rose-400 flex-shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Verdict Box */}
        <div className="mt-12 rounded-2xl border border-primary-500/30 bg-primary-500/10 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {t(`${namespace}.verdict.title`)}
          </h2>
          <p className="text-muted-foreground leading-7">
            {t(`${namespace}.verdict.description`)}
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            {t(`${namespace}.faq.title`)}
          </h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-border bg-surface p-5"
              >
                <summary className="cursor-pointer list-none font-semibold text-foreground flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-primary-300 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 text-sm text-muted-foreground leading-6">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href={`${prefix}/download`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t(`${namespace}.ctaButton`)}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
