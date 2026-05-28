"use client";
import React from "react";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const ComparisonFilebot = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const tableData = [
    {
      label: t("comparisonFilebot.table.rows.ui.label"),
      cineRename: t("comparisonFilebot.table.rows.ui.cineRename"),
      filebot: t("comparisonFilebot.table.rows.ui.filebot"),
      filebotHas: false,
      highlight: true,
    },
    {
      label: t("comparisonFilebot.table.rows.setup.label"),
      cineRename: t("comparisonFilebot.table.rows.setup.cineRename"),
      filebot: t("comparisonFilebot.table.rows.setup.filebot"),
      filebotHas: false,
      highlight: false,
    },
    {
      label: t("comparisonFilebot.table.rows.subtitles.label"),
      cineRename: t("comparisonFilebot.table.rows.subtitles.cineRename"),
      filebot: t("comparisonFilebot.table.rows.subtitles.filebot"),
      filebotHas: true,
      highlight: true,
    },
    {
      label: t("comparisonFilebot.table.rows.duplicates.label"),
      cineRename: t("comparisonFilebot.table.rows.duplicates.cineRename"),
      filebot: t("comparisonFilebot.table.rows.duplicates.filebot"),
      filebotHas: true,
      highlight: false,
    },
    {
      label: t("comparisonFilebot.table.rows.auto.label"),
      cineRename: t("comparisonFilebot.table.rows.auto.cineRename"),
      filebot: t("comparisonFilebot.table.rows.auto.filebot"),
      filebotHas: true,
      highlight: true,
    },
    {
      label: t("comparisonFilebot.table.rows.perf.label"),
      cineRename: t("comparisonFilebot.table.rows.perf.cineRename"),
      filebot: t("comparisonFilebot.table.rows.perf.filebot"),
      filebotHas: false,
      highlight: false,
    },
    {
      label: t("comparisonFilebot.table.rows.platforms.label"),
      cineRename: t("comparisonFilebot.table.rows.platforms.cineRename"),
      filebot: t("comparisonFilebot.table.rows.platforms.filebot"),
      filebotHas: true,
      highlight: true,
    },
    {
      label: t("comparisonFilebot.table.rows.pricing.label"),
      cineRename: t("comparisonFilebot.table.rows.pricing.cineRename"),
      filebot: t("comparisonFilebot.table.rows.pricing.filebot"),
      filebotHas: false,
      highlight: false,
    }
  ];

  return (
    <section className="py-12 lg:py-16 2xl:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("comparisonFilebot.title")}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("comparisonFilebot.subtitle")}
          </p>
        </div>

        <div className="bg-surface-elevated rounded-2xl shadow-2xl overflow-hidden border border-border">
          <div className="grid grid-cols-3 bg-surface border-b-2 border-border">
            <div className="p-6 font-semibold text-gray-300">
              {t("comparisonFilebot.table.headers.feature")}
            </div>
            <div className="p-6 font-semibold text-center bg-primary-500/10 border-x-2 border-border">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-primary-400" />
                <span className="text-primary-300">CineRename</span>
              </div>
            </div>
            <div className="p-6 font-semibold text-center text-gray-400">
              FileBot
            </div>
          </div>

          {tableData.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 border-b border-border ${row.highlight ? "bg-primary-500/5" : ""}`}
            >
              <div className="p-6 font-medium text-gray-300 flex items-center">{row.label}</div>
              <div className="p-6 border-x-2 border-border bg-primary-500/5">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-secondary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{row.cineRename}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  {row.filebotHas ? (
                    <Check className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-gray-400">{row.filebot}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={`/${currentLocale}/download`}
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