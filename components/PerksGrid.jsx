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
  ArrowUpRight,
  Link2,
  FileOutput,
  History,
  Terminal,
  Code,
  FileSpreadsheet,
  FolderSync,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

const PerksGrid = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [cols, setCols] = useState(3);
  const t = useTranslations('perksGrid');

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1024) setCols(3); // lg
      else if (window.innerWidth >= 640) setCols(2); // sm
      else setCols(1); // default
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);
  
  const perks = [
    { icon: Upload, key: 'dragDrop', image: '/assets/img/screen-studio.png' },
    { icon: Sparkles, key: 'smartPresets', image: '/assets/img/Template.png' },
    { icon: Sliders, key: 'fineTune', image: '/assets/img/Rename_direct.png' },
    { icon: FileOutput, key: 'xmlExport', image: '/assets/img/Automatic.png' },
    { icon: Terminal, key: 'cli', image: null },
    { icon: MonitorPlay, key: 'localProcessing', image: null },
    { icon: Cpu, key: 'parallelProcessing', image: null },
    { icon: Link2, key: 'audioVideoSync', image: '/assets/img/Subtitile2.png' },
    { icon: RefreshCcw, key: 'repetitionRemover', image: '/assets/img/Cleanup.png' },
    { icon: Globe, key: 'multilingual', image: null },
    { icon: Zap, key: 'blazingPreview', image: '/assets/img/Rename_direct.png' },
    { icon: History, key: 'optimizedPro', image: '/assets/img/Archive.png' },
    { icon: FileSpreadsheet, key: 'dryRunReport', image: null },
    { icon: FolderSync, key: 'watchFolders', image: '/assets/img/Watch_Folder.png' },
    { icon: ShieldCheck, key: 'checksums', image: '/assets/img/Checksum.png' },
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
            const isExpanded = expandedId === perk.key;
            
            const expandedIndex = perks.findIndex(p => p.key === expandedId);
            const expandedRow = Math.floor(expandedIndex / cols);
            const currentRow = Math.floor(index / cols);
            
            // Masquer uniquement les autres blocs de la même ligne
            if (expandedId && !isExpanded && currentRow === expandedRow) {
              return null;
            }

            return (
              <div
                key={index}
                onClick={() => !isExpanded && setExpandedId(perk.key)}
                className={`group relative bg-surface-elevated border rounded-2xl p-6 transition-all duration-300 transform-gpu ${
                  isExpanded 
                    ? "col-span-1 sm:col-span-2 lg:col-span-3 border-primary-500/50 shadow-2xl shadow-primary-500/10 cursor-default -translate-y-1" 
                    : "border-border cursor-pointer hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1"
                }`}
              >
                <div className={`relative flex flex-col ${isExpanded ? "lg:flex-row gap-8" : "h-full"}`}>
                  <div className={isExpanded ? "flex-1" : ""}>
                    <div className="mb-5 flex justify-between items-start">
                      <div className={`inline-flex p-3 rounded-xl border transition-colors ${isExpanded ? "bg-primary-500/20 border-primary-500/50" : "bg-primary-500/10 border-primary-500/30 group-hover:bg-primary-500/20"}`}>
                        <Icon className="w-7 h-7 text-primary-400" strokeWidth={1.6} />
                      </div>
                      {!isExpanded ? (
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                          <ArrowUpRight className="h-5 w-5 text-primary-400" />
                        </div>
                      ) : (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors border border-border bg-black/20"
                        >
                          <X className="w-5 h-5 text-gray-400 hover:text-white" />
                        </button>
                      )}
                    </div>

                    <h3 className={`font-bold text-foreground mb-3 transition-colors ${isExpanded ? "text-2xl text-primary-300" : "text-lg group-hover:text-primary-300"}`}>
                      {t(`perks.${perk.key}.title`)}
                    </h3>
                    <p className={`text-gray-400 leading-relaxed ${isExpanded ? "text-base mb-4" : "text-sm flex-1"}`}>
                      {t(`perks.${perk.key}.description`)}
                    </p>

                    {isExpanded && (
                      <div className="animate-in fade-in duration-300">
                        <div className="w-8 h-1 bg-primary-500/30 rounded-full mb-4"></div>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {t(`perks.${perk.key}.extendedDescription`)}
                        </p>
                      </div>
                    )}
                  </div>

                  {isExpanded && perk.image && (
                    <div className="flex-1 animate-in fade-in duration-300 flex items-center justify-center">
                      <div className="relative w-full rounded-xl overflow-hidden border border-border shadow-2xl">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={perk.image} alt={t(`perks.${perk.key}.title`)} className="w-full h-auto opacity-90" />
                         <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none"></div>
                      </div>
                    </div>
                  )}
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
