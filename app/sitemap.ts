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
      priority: 0.9,
    },
  ];

  locales.forEach(locale => {
    entries.push({
      url: `${siteUrl}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    entries.push({
      url: `${siteUrl}/${locale}/download`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    entries.push({
      url: `${siteUrl}/${locale}/pricing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return entries;
}
