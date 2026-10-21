import { NextResponse } from 'next/server';
import historyData from '@/public/releases/history.json';
import { getSiteUrl } from '@/lib/site';

export const dynamic = 'force-static';
export const revalidate = 86400;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const releases =
    (
      historyData as {
        releases?: Array<{
          version: string;
          title: string;
          publishedAt: string;
          releaseUrl: string;
          items?: string[];
        }>;
      }
    ).releases || [];

  const lastBuildDate = releases[0]?.publishedAt
    ? new Date(releases[0].publishedAt).toUTCString()
    : new Date().toUTCString();

  const itemsXml = releases
    .map((rel) => {
      const pubDate = new Date(rel.publishedAt).toUTCString();
      const description = (rel.items || [])
        .map((item) => `<li>${escapeXml(item)}</li>`)
        .join('');
      const fullDescription = `<ul>${description}</ul>`;
      const link = `${siteUrl}/download`;

      return `    <item>
      <title>${escapeXml(rel.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${siteUrl}/releases/${rel.version}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${fullDescription}]]></description>
    </item>`;
    })
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CineRename Releases</title>
    <link>${siteUrl}</link>
    <description>New releases and changelogs for CineRename, the local-first media renamer and organizer.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
