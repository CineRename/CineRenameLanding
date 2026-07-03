import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparisonFilebot from "@/components/ComparisonFilebot";

import { getSeoMetadata } from "@/lib/seo";

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
    title: t('vsFilebot.title'),
    description: t('vsFilebot.description'),
    keywords: t('vsFilebot.keywords'),
    alternates: seo.alternates,
    openGraph: {
      title: t('vsFilebot.title'),
      description: t('vsFilebot.description'),
      url: seo.url,
      locale: localeMap[locale] || 'en_US',
    },
  };
}

export default function VsFilebotPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-16 flex items-center">
        <div className="w-full">
          <ComparisonFilebot />
        </div>
      </main>
      <Footer />
    </div>
  );
}
