import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { getSeoMetadata, getSocialMetadata, formatMetaTitle } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const seo = getSeoMetadata(locale, "/faq");

  return {
    title: formatMetaTitle(t("faq.title")),
    description: t("faq.description"),
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title: t("faq.title"),
      description: t("faq.description"),
      url: seo.url,
    }),
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tPage = await getTranslations({ locale, namespace: "faqPage" });
  const seo = getSeoMetadata(locale, "/faq");
  const homeUrl = locale === "en" ? "https://cinerename.app" : `https://cinerename.app/${locale}`;

  const faqItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => ({
    "@type": "Question",
    name: tFaq(`questions.${idx}.q`),
    acceptedAnswer: {
      "@type": "Answer",
      text: tFaq(`questions.${idx}.a`),
    },
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CineRename",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tPage("title"),
        item: seo.url,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        id="faq-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-grow pt-16">
        <FAQ asHeading="h1" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
