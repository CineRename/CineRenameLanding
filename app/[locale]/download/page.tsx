import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Download from "@/components/Download";
import latestRelease from "@/public/releases/latest.json";

import { getSeoMetadata, getSocialMetadata, formatMetaTitle } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const seo = getSeoMetadata(locale, '/download');

  return {
    title: formatMetaTitle(t('download.title')),
    description: t('download.description'),
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title: t('download.title'),
      description: t('download.description'),
      url: seo.url,
    }),
  };
}

export default async function DownloadPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const seo = getSeoMetadata(locale, '/download');
  const homeUrl = locale === 'en' ? 'https://cinerename.app' : `https://cinerename.app/${locale}`;

  const breadcrumbJsonLd = {
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
        name: t('download.title'),
        item: seo.url,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        id="download-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main>
        <Download initialReleaseInfo={latestRelease} />
      </main>
      <Footer />
    </div>
  );
}
