import { getSiteUrl } from '@/lib/site';
import { routing } from '@/i18n/routing';

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
