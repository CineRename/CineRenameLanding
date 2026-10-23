import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';
import lastmodDates from '@/lib/lastmod.generated.json';

const LOCALES = ['en', 'fr', 'es', 'zh'] as const;
const DEFAULT_LOCALE = 'en';

// Google ignores <priority> and <changefreq>; only <lastmod> (when reliable) and hreflang matter.
const PAGES: Array<{ path: string }> = [
  { path: '/alternatives' },
  { path: '/how-to-rename' },
  { path: '/guides' },
  { path: '/guides/plex-jellyfin-naming-conventions' },
  { path: '/guides/synology-qnap-nas-media-organization' },
  { path: '/guides/anime-naming-absolute-vs-season' },
  { path: '/faq' },
  { path: '/download' },
  { path: '/pricing' },
  { path: '/vs-filebot' },
  { path: '/vs-tinymediamanager' },
  { path: '/vs-sonarr' },
  { path: '/vs-radarr' },
  { path: '/vs-rename-my-tv-series' },
  { path: '/vs-tv-rename' },
  { path: '/vs-advanced-renamer' },
  { path: '/vs-bulk-rename-utility' },
  { path: '/vs-mediaelch' },
  { path: '/vs-shoko-anime' },
  { path: '/vs-movie-renamer' },
  { path: '/vs-therenamer' },
  { path: '/legal' },
  { path: '/privacy' },
  { path: '/terms' },
  { path: '/refund' },
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
      alternates: alternatesFor('/'),
    });
  });

  LOCALES.forEach((locale) => {
    PAGES.forEach((page) => {
      entries.push({
        url: localizedUrl(locale, page.path),
        lastModified: lastModifiedFor(page.path),
        alternates: alternatesFor(page.path),
      });
    });
  });

  return entries;
}
