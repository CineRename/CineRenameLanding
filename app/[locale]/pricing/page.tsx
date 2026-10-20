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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        <Pricing asHeading="h1" />
      </main>
      <Footer />
    </div>
  );
}
