import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";

import { getSeoMetadata, getSocialMetadata, formatMetaTitle } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const seo = getSeoMetadata(locale, '/pricing');

  return {
    title: formatMetaTitle(t('pricing.title')),
    description: t('pricing.description'),
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title: t('pricing.title'),
      description: t('pricing.description'),
      url: seo.url,
    }),
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const seo = getSeoMetadata(locale, '/pricing');
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
        name: t('pricing.title'),
        item: seo.url,
      },
    ],
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CineRename Pro',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows 10, Windows 11, macOS, Linux',
    description: t('pricing.description'),
    url: seo.url,
    image: 'https://cinerename.app/assets/img/screen-studio.png',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Trial',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Pro Monthly',
        price: '1',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Pro Annual',
        price: '5',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Pro Lifetime',
        price: '30',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        id="pricing-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="pricing-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Header />
      <main className="pt-16">
        <Pricing asHeading="h1" />
      </main>
      <Footer />
    </div>
  );
}
