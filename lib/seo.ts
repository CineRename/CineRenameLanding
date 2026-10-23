import { getSiteUrl } from '@/lib/site';
import { routing } from '@/i18n/routing';
import lastmodDates from '@/lib/lastmod.generated.json';

export function getLastmodDate(pathname: string): string {
  const iso = (lastmodDates as Record<string, string>)[pathname];
  return iso || '2026-10-20T00:00:00Z';
}

export function getSeoMetadata(locale: string, pathname: string) {
  const siteUrl = getSiteUrl();

  // Create alternates for all supported locales
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    const base = l === routing.defaultLocale ? siteUrl : `${siteUrl}/${l}`;
    languages[l] = pathname === '/' ? base : `${base}${pathname}`;
  });
  
  // x-default is usually the default locale (en)
  const defaultBase = siteUrl;
  languages['x-default'] = pathname === '/' ? defaultBase : `${defaultBase}${pathname}`;

  // Current canonical URL
  const canonicalBase = locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`;
  const canonical = pathname === '/' ? canonicalBase : `${canonicalBase}${pathname}`;

  return {
    alternates: {
      canonical,
      languages,
    },
    url: canonical, // For openGraph.url
  };
}

export const OG_LOCALE_MAP: Record<string, string> = {
  fr: 'fr_FR',
  es: 'es_ES',
  zh: 'zh_CN',
  en: 'en_US',
};

export const DEFAULT_SOCIAL_IMAGE = {
  url: '/assets/img/og-image.png',
  width: 1200,
  height: 630,
};

/**
 * Ensures title never duplicates "| CineRename" and never exceeds safe SERP length.
 * Returns an absolute title object so Next.js layout template does not blindly re-append.
 */
export function formatMetaTitle(rawTitle: string): { absolute: string } {
  const clean = rawTitle.replace(/\s*\|\s*CineRename\s*$/i, "").trim();
  const full = clean.includes("CineRename") ? clean : `${clean} | CineRename`;
  return { absolute: full };
}

/**
 * Next.js replaces (shallow-merges) the whole `openGraph` / `twitter` objects when a page defines
 * its own, so every page that overrides them must re-declare the image, siteName and type.
 * This helper keeps all pages consistent so `og:image` is never lost.
 */
export function getSocialMetadata({
  locale,
  title,
  description,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
}: {
  locale: string;
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}) {
  const currentOgLocale = OG_LOCALE_MAP[locale] || 'en_US';
  const alternateLocales = Object.values(OG_LOCALE_MAP).filter((l) => l !== currentOgLocale);

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: 'CineRename',
      locale: currentOgLocale,
      alternateLocale: alternateLocales,
      type,
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
      images: [{ ...DEFAULT_SOCIAL_IMAGE, alt: title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      site: '@CineRename',
      creator: '@CineRename',
      title,
      description,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    },
  };
}

export function getComparisonBreadcrumbJsonLd({
  locale,
  title,
  currentUrl,
}: {
  locale: string;
  title: string;
  currentUrl: string;
}) {
  const siteUrl = getSiteUrl();
  const homeUrl = locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`;
  const alternativesUrl =
    locale === routing.defaultLocale ? `${siteUrl}/alternatives` : `${siteUrl}/${locale}/alternatives`;
  const alternativesName =
    locale === 'fr'
      ? 'Alternatives'
      : locale === 'es'
      ? 'Alternativas'
      : locale === 'zh'
      ? '替代方案'
      : 'Alternatives';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'CineRename',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: alternativesName,
        item: alternativesUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: currentUrl,
      },
    ],
  };
}

export function getSimpleBreadcrumbJsonLd({
  locale,
  name,
  currentUrl,
}: {
  locale: string;
  name: string;
  currentUrl: string;
}) {
  const siteUrl = getSiteUrl();
  const homeUrl = locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'CineRename',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: currentUrl,
      },
    ],
  };
}
