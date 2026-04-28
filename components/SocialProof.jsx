'use client';

import React from 'react';
import { Shield, Zap, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function SocialProof() {
  const t = useTranslations();

  return (
    <section aria-label="Trust signals" className="py-10 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm text-primary-300">
            <Zap className="h-4 w-4 text-primary-400" />
            <span>{t('socialProof.stats.faster')}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary-500/30 bg-secondary-500/10 px-4 py-2 text-sm text-secondary-300">
            <Clock className="h-4 w-4 text-secondary-400" />
            <span>{t('socialProof.stats.timeSaved')}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm text-gray-300">
            <Shield className="h-4 w-4 text-gray-400" />
            <span>{t('socialProof.stats.localPrivate')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
