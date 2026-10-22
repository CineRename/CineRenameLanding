import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';
import lastmodDates from '@/lib/lastmod.generated.json';

const LOCALES = ['en', 'fr', 'es', 'zh'] as const;
const DEFAULT_LOCALE = 'en';

type Freq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

const PAGES: Array<{ path: string; priority: number; changeFrequency: Freq }> = [
  { path: '/alternatives', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/how-to-rename', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/download', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/pricing', priority: 0.95, changeFrequency: 'monthly' },
  { path: '/vs-filebot', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-tinymediamanager', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-sonarr', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-radarr', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-rename-my-tv-series', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-tv-rename', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-advanced-renamer', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-bulk-rename-utility', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-mediaelch', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-shoko-anime', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-movie-renamer', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs-therenamer', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/legal', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/refund', priority: 0.3, changeFrequency: 'yearly' },
];

/**
 * Real "last modified" dates, generated from git history by scripts/generate-lastmod.mjs.
 * Never use `new Date()` here: a lastmod that changes on every request is ignored by Google.
 */
function lastModifiedFor(path: string): Date | undefined {
  const iso = (lastmodDates as Record<string, string>)[path];
  return iso ? new Date(iso) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const localizedUrl = (locale: string, path: string) => {
    const base = locale === DEFAULT_LOCALE ? siteUrl : `${siteUrl}/${locale}`;
    return path === '/' ? base : `${base}${path}`;
  };

  // hreflang alternates, including x-default (English)
  const alternatesFor = (path: string) => ({
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, localizedUrl(l, path)])),
      'x-default': localizedUrl(DEFAULT_LOCALE, path),
    },
  });

  const entries: MetadataRoute.Sitemap = [];

  // Home page, one entry per locale
  LOCALES.forEach((locale) => {
    entries.push({
      url: localizedUrl(locale, '/'),
      lastModified: lastModifiedFor('/'),
      changeFrequency: 'weekly',
      priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
      alternates: alternatesFor('/'),
      images: [`${siteUrl}/assets/img/screen-studio.png`],
    });
  });

  LOCALES.forEach((locale) => {
    PAGES.forEach((page) => {
      entries.push({
        url: localizedUrl(locale, page.path),
        lastModified: lastModifiedFor(page.path),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: alternatesFor(page.path),
        images: [`${siteUrl}/assets/img/screen-studio.png`],
      });
    });
  });

  return entries;
}
