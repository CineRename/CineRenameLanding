import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/downloads/'],
      },
      {
        // A crawler matching a specific group ignores the `*` group, so the Disallow
        // rules must be repeated here or these bots could fetch /api/ and /downloads/.
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended'],
        allow: '/',
        disallow: ['/api/', '/admin/', '/downloads/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/docs/sitemap.xml`,
    ],
  };
}
