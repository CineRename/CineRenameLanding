"use client";
import React, { useState } from "react";
import { Clock, ChevronDown, Activity, Zap } from "lucide-react";
import { useTranslations } from 'next-intl';

const TimeSavings = () => {
  const t = useTranslations('timeSavings');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const barsData = [
    {
      label: t('methods.manual.name'),
      subtitle: t('methods.manual.description'),
      timeLabel: t('methods.manual.time'),
      seconds: 50 * 60,
      color: "from-gray-600 to-gray-700",
      Icon: Clock,
      speed: t('methods.manual.speed'),
      percentage: 100,
    },
    {
      label: t('methods.otherTools.name'),
      subtitle: t('methods.otherTools.description'),
      timeLabel: t('methods.otherTools.time'),
      seconds: 10 * 60,
      color: "from-primary-500 to-primary-600",
      Icon: Activity,
      speed: t('methods.otherTools.speed'),
      percentage: 20,
    },
    {
      label: t('methods.cineRename.name'),
      subtitle: t('methods.cineRename.description'),
      timeLabel: t('methods.cineRename.time'),
      seconds: 60,
      color: "from-secondary-500 to-secondary-600",
      Icon: Zap,
      speed: t('methods.cineRename.speed'),
      percentage: 2,
      highlight: true,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-clip">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-primary-500/10 border border-primary-500/30 rounded-2xl">
              <Clock className="h-8 w-8 text-primary-400" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-foreground mx-auto mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative grid gap-6">
            {barsData.map((d) => {
              const max = Math.max(...barsData.map((b) => b.seconds));
              const pct = Math.max(4, (d.seconds / max) * 100);

              return (
                <div key={d.label} className="relative">
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-surface-elevated border ${
                      d.highlight
                        ? "border-secondary-500/50 ring-1 ring-secondary-500/40 shadow-2xl"
                        : "border-border shadow-xl"
                    }`}
                  >
                    <div className="relative p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl bg-surface ${d.highlight ? "ring-1 ring-secondary-500/40" : "ring-1 ring-border"}`}>
                            <d.Icon className={`w-6 h-6 ${d.highlight ? "text-secondary-400" : "text-gray-300"}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              {d.label}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              {d.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className={`text-2xl font-black ${d.highlight ? "text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-500" : "text-foreground"}`}>
                            {d.timeLabel}
                          </div>
                          <div className={`text-sm font-medium mt-1 ${d.highlight ? "text-secondary-400" : "text-gray-400"}`}>
                            {d.speed}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="w-full h-2 rounded-full bg-surface overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r ${d.color}`} style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">0 min</span>
                          <span className={`text-xs font-semibold ${d.highlight ? "text-secondary-400" : "text-gray-400"}`}>
                            {d.percentage}{t('percentManual')}
                          </span>
                          <span className="text-xs text-gray-500">50 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-xs text-gray-400 text-center relative">
            <button
              type="button"
              className="mx-auto inline-flex items-center gap-2 hover:text-foreground transition-colors"
              aria-expanded={isAccordionOpen}
              aria-controls="ts-accordion"
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              <span>{t('realCase.title')}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isAccordionOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {isAccordionOpen && (
            <div id="ts-accordion" className="mt-4 max-w-3xl mx-auto text-left" aria-hidden={!isAccordionOpen}>
              <div className="bg-surface-elevated border border-border rounded-xl p-4 sm:p-6 text-gray-200">
                <div className="space-y-3">
                  <div className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                    {t('realCase.test.title')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-lg border border-border bg-surface px-3 py-2">
                      <div className="text-[11px] text-gray-400">{t('realCase.test.singleFile')}</div>
                      <div className="text-sm font-semibold text-foreground">{t('realCase.test.duration')}</div>
                    </div>
                    <div className="rounded-lg border border-border bg-surface px-3 py-2">
                      <div className="text-[11px] text-gray-400">{t('realCase.test.manualRename')}</div>
                      <div className="text-sm font-semibold text-foreground">{t('realCase.test.manualTime')}</div>
                    </div>
                    <div className="rounded-lg border border-border bg-surface px-3 py-2">
                      <div className="text-[11px] text-gray-400">{t('realCase.test.cineRenameLabel')}</div>
                      <div className="text-sm font-semibold text-foreground">{t('realCase.test.cineRenameTime')}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-secondary-300 bg-secondary-500/10 border border-secondary-500/30 rounded-md px-3 py-2 inline-block">
                    {t('realCase.test.result')}
                  </div>
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <div className="space-y-4">
                  <div className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                    {t('realCase.scenario.title')}
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                    <li>{t('realCase.scenario.description')}</li>
                    <li>{t('realCase.scenario.manualCalc')}</li>
                    <li>{t('realCase.scenario.cineRenameCalc')}</li>
                  </ul>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-lg border border-border bg-surface px-3 py-2">
                      <div className="text-[11px] text-gray-400">{t('realCase.scenario.manualTotal')}</div>
                      <div className="text-sm font-semibold text-foreground">{t('realCase.scenario.manualTotalTime')}</div>
                    </div>
                    <div className="rounded-lg border border-border bg-surface px-3 py-2">
                      <div className="text-[11px] text-gray-400">{t('realCase.scenario.cineRenameTotal')}</div>
                      <div className="text-sm font-semibold text-foreground">{t('realCase.scenario.cineRenameTotalTime')}</div>
                    </div>
                    <div className="rounded-lg border border-border bg-surface px-3 py-2">
                      <div className="text-[11px] text-gray-400">{t('realCase.scenario.timeSaved')}</div>
                      <div className="text-sm font-semibold text-foreground">{t('realCase.scenario.timeSavedAmount')}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-200">
                    {t('realCase.scenario.reduction')}
                  </div>
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <div className="space-y-4">
                  <div className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                    {t('realCase.vsOtherTools.title')}
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                    <li>{t('realCase.vsOtherTools.similarSpeed')}</li>
                    <li>{t('realCase.vsOtherTools.noParallel')}</li>
                    <li>{t('realCase.vsOtherTools.oneXmlPerClip')}</li>
                  </ul>
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/10 px-3 py-3 text-primary-200 text-sm">
                    {t('realCase.vsOtherTools.sequential')}
                    <br />
                    {t('realCase.vsOtherTools.cineRenameBetter')}
                    <br />
                    {t('realCase.vsOtherTools.gain')}
                  </div>
                </div>

                <p className="mt-6 text-[11px] text-gray-500">
                  {t('realCase.notes')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TimeSavings;
