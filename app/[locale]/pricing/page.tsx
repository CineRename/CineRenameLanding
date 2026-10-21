import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";

import { getSeoMetadata, getSocialMetadata, formatMetaTitle, getSimpleBreadcrumbJsonLd } from "@/lib/seo";

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
  const breadcrumbJsonLd = getSimpleBreadcrumbJsonLd({
    locale,
    name: t('pricing.title'),
    currentUrl: seo.url,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        id="pricing-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="pt-16">
        <Pricing asHeading="h1" />
      </main>
      <Footer />
    </div>
  );
}
