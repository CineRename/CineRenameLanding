import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const locales = ['en', 'fr', 'es', 'zh'];

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/docs/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  locales.forEach(locale => {
    // Skip the default locale because it's already handled at the root (siteUrl)
    const urlPath = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`;

    // Only add the base path if it's not 'en', because 'en' base is already added at the top
    if (locale !== 'en') {
      entries.push({
        url: urlPath,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    const pages = [
      { path: '/download', priority: 0.8, changeFrequency: 'weekly' as const },
      { path: '/pricing', priority: 0.95, changeFrequency: 'monthly' as const },
      { path: '/vs-filebot', priority: 0.8, changeFrequency: 'monthly' as const },
    ];

    pages.forEach(page => {
      entries.push({
        url: `${urlPath}${page.path}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    });
  });

  return entries;
}
