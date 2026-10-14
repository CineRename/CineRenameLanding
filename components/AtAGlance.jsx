import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { PRODUCT_VERSION } from '@/lib/product';

const COMPARISONS = [
  { href: '/vs-filebot', label: 'FileBot' },
  { href: '/vs-tinymediamanager', label: 'tinyMediaManager' },
  { href: '/vs-sonarr', label: 'Sonarr' },
  { href: '/vs-radarr', label: 'Radarr' },
  { href: '/vs-rename-my-tv-series', label: 'Rename My TV Series' },
  { href: '/vs-tv-rename', label: 'TV Rename' },
  { href: '/vs-advanced-renamer', label: 'Advanced Renamer' },
  { href: '/vs-bulk-rename-utility', label: 'Bulk Rename Utility' },
  { href: '/vs-mediaelch', label: 'MediaElch' },
  { href: '/vs-shoko-anime', label: 'Shoko Anime' },
  { href: '/vs-movie-renamer', label: 'Movie Renamer' },
  { href: '/vs-therenamer', label: 'theRenamer' },
];

/**
 * Factual, crawlable summary of the product (what it is, platforms, price, privacy).
 * Server-rendered plain text on purpose: it is the passage search engines and AI assistants
 * are most likely to quote, and it links every comparison page from the main content.
 */
export default function AtAGlance() {
  const t = useTranslations('atAGlance');
  const facts = t.raw('facts');

  return (
    <section
      id="at-a-glance"
      aria-labelledby="at-a-glance-title"
      className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-surface"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="at-a-glance-title"
          className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center"
        >
          {t('title')}
        </h2>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-10 text-center">
          {t('summary')}
        </p>

        <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-surface-elevated p-5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-primary-400 mb-1">
                {fact.label}
              </dt>
              <dd className="text-sm text-gray-300 leading-relaxed">
                {fact.value.replace('{version}', PRODUCT_VERSION)}
              </dd>
            </div>
          ))}
        </dl>

        <nav aria-label={t('compareTitle')} className="mt-10">
          <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
            {t('compareTitle')}
          </h3>
          <ul className="flex flex-wrap justify-center gap-2">
            {COMPARISONS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-primary-500/50 hover:text-primary-300"
                >
                  CineRename vs {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
