"use client";
import React from "react";
import {
  Upload,
  Cpu,
  Sliders,
  Sparkles,
  Film,
  MonitorPlay,
  RefreshCcw,
  Globe,
  Zap,
  Star,
  ArrowUpRight,
  Link2,
  FileOutput,
  History,
  Terminal,
  Code,
} from "lucide-react";
import { useTranslations } from 'next-intl';

const PerksGrid = () => {
  const t = useTranslations('perksGrid');
  const perks = [
    { icon: Upload, key: 'dragDrop', featured: true },
    { icon: Sparkles, key: 'smartPresets', featured: false },
    { icon: Sliders, key: 'fineTune', featured: false },
    { icon: FileOutput, key: 'xmlExport', featured: true },
    { icon: Terminal, key: 'cli', featured: false },
    { icon: Code, key: 'quickJs', featured: true },
    { icon: MonitorPlay, key: 'localProcessing', featured: false },
    { icon: Cpu, key: 'parallelProcessing', featured: true },
    { icon: Link2, key: 'audioVideoSync', featured: true },
    { icon: RefreshCcw, key: 'repetitionRemover', featured: false },
    { icon: Globe, key: 'multilingual', featured: false },
    { icon: Zap, key: 'blazingPreview', featured: false },
    { icon: History, key: 'optimizedPro', featured: true },
  ];

  return (
    <section
      id="features"
      className="relative bg-background py-24 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-bold text-foreground mx-auto">
              {t('title')}
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="group relative bg-surface-elevated border border-border rounded-2xl p-6 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                {perk.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full text-xs font-bold text-white">
                      <Star className="h-3 w-3" fill="currentColor" />
                      <span>{t('badges.popular')}</span>
                    </div>
                  </div>
                )}

                <div className="relative h-full flex flex-col">
                  <div className="mb-5">
                    <div className="inline-flex p-3 rounded-xl bg-primary-500/10 border border-primary-500/30 group-hover:bg-primary-500/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary-400" strokeWidth={1.6} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary-300 transition-colors">
                    {t(`perks.${perk.key}.title`)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm flex-1">
                    {t(`perks.${perk.key}.description`)}
                  </p>

                  <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    <ArrowUpRight className="h-5 w-5 text-primary-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PerksGrid;
