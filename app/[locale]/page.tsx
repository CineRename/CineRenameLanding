import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AtAGlance from "@/components/AtAGlance";

const SocialProof = dynamic(() => import("@/components/SocialProof"));
const ProcessSteps = dynamic(() => import("@/components/ProcessSteps"));
const PerksGrid = dynamic(() => import("@/components/PerksGrid"));
const ComparisonFilebot = dynamic(() => import("@/components/ComparisonFilebot"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FinalCTA = dynamic(() => import("@/components/FinalCTA"));

import { getSeoMetadata, getSocialMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const seo = getSeoMetadata(locale, '/');

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title: t('title'),
      description: t('description'),
      url: seo.url,
    }),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const tFaq = await getTranslations({ locale, namespace: 'faq' });

  const faqItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => ({
    "@type": "Question",
    name: tFaq(`questions.${idx}.q`),
    acceptedAnswer: {
      "@type": "Answer",
      text: tFaq(`questions.${idx}.a`),
    },
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <ProcessSteps />
        <SocialProof />
        <PerksGrid />
        <ComparisonFilebot />
        <AtAGlance />
        <FAQ />
        <Testimonials />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
