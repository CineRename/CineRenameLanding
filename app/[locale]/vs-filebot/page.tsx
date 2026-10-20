import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparisonFilebot from "@/components/ComparisonFilebot";

import { getSeoMetadata, formatMetaTitle } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const seo = getSeoMetadata(locale, '/vs-filebot');

  const localeMap: Record<string, string> = {
    'fr': 'fr_FR',
    'es': 'es_ES',
    'zh': 'zh_CN',
    'en': 'en_US'
  };

  return {
    title: formatMetaTitle(t('vsFilebot.title')),
    description: t('vsFilebot.description'),
    alternates: seo.alternates,
    openGraph: {
      title: t('vsFilebot.title'),
      description: t('vsFilebot.description'),
      url: seo.url,
      locale: localeMap[locale] || 'en_US',
      images: [
        {
          url: '/assets/img/screen-studio.png',
          width: 1200,
          height: 630,
          alt: t('vsFilebot.title'),
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('vsFilebot.title'),
      description: t('vsFilebot.description'),
      images: ['/assets/img/screen-studio.png'],
    },
  };
}

export default async function VsFilebotPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'comparisonFilebot' });
  const seo = getSeoMetadata(locale, '/vs-filebot');
  const faqItems = t.raw('faq.items') as Array<{ q: string; a: string }>;
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'CineRename',
        item: locale === 'en' ? 'https://cinerename.app' : `https://cinerename.app/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('title'),
        item: seo.url,
      },
    ],
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('title'),
    description: t('subtitle'),
    author: {
      '@type': 'Organization',
      name: 'CineRename',
      url: 'https://cinerename.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CineRename',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cinerename.app/favicon-192x192.png',
      },
    },
    datePublished: '2026-01-15T00:00:00Z',
    dateModified: '2026-10-20T00:00:00Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': seo.url,
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        id="vs-filebot-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="vs-filebot-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        id="vs-filebot-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-grow pt-16">
        <div className="w-full">
          <ComparisonFilebot asHeading="h1" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
