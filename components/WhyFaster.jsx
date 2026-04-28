"use client";
import React from "react";
import { Check, X, Zap, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const WhyFaster = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const tableData = [
    {
      label: t("whyFaster.table.rows.import.label"),
      autoTrim: t("whyFaster.table.rows.import.autoTrim"),
      otherTools: t("whyFaster.table.rows.import.otherTools"),
      highlight: false,
    },
    {
      label: t("whyFaster.table.rows.processing.label"),
      autoTrim: t("whyFaster.table.rows.processing.autoTrim"),
      otherTools: t("whyFaster.table.rows.processing.otherTools"),
      highlight: true,
    },
    {
      label: t("whyFaster.table.rows.result.label"),
      autoTrim: t("whyFaster.table.rows.result.autoTrim"),
      otherTools: t("whyFaster.table.rows.result.otherTools"),
      highlight: false,
    },
    {
      label: t("whyFaster.table.rows.speed.label"),
      autoTrim: t("whyFaster.table.rows.speed.autoTrim"),
      otherTools: t("whyFaster.table.rows.speed.otherTools"),
      highlight: true,
    },
    {
      label: t("whyFaster.table.rows.aiCost.label"),
      autoTrim: t("whyFaster.table.rows.aiCost.autoTrim"),
      otherTools: t("whyFaster.table.rows.aiCost.otherTools"),
      highlight: false,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12">
          {t("whyFaster.title")}
        </h2>

        <div className="bg-surface-elevated rounded-2xl shadow-2xl overflow-hidden border border-border">
          <div className="grid grid-cols-3 bg-surface border-b-2 border-border">
            <div className="p-6 font-semibold text-gray-300">
              {t("whyFaster.table.headers.feature")}
            </div>
            <div className="p-6 font-semibold text-center bg-primary-500/10 border-x-2 border-border">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-5 w-5 text-primary-400" />
                <span className="text-primary-300">{t("whyFaster.table.headers.autoTrim")}</span>
              </div>
            </div>
            <div className="p-6 font-semibold text-center text-gray-400">
              {t("whyFaster.table.headers.otherTools")}
            </div>
          </div>

          {tableData.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 border-b border-border ${row.highlight ? "bg-primary-500/5" : ""}`}
            >
              <div className="p-6 font-medium text-gray-300">{row.label}</div>
              <div className="p-6 border-x-2 border-border bg-primary-500/5">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-secondary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{row.autoTrim}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">{row.otherTools}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 mb-6">{t("whyFaster.cta")}</p>
          <a
            href={`/${currentLocale}/download`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t("whyFaster.ctaButton")}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyFaster;
