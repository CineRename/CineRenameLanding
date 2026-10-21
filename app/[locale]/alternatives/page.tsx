import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AlternativesHub from "@/components/AlternativesHub";
import { getSeoMetadata, getSocialMetadata, formatMetaTitle, getLastmodDate } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const seo = getSeoMetadata(locale, "/alternatives");

  return {
    title: formatMetaTitle(t("alternatives.title")),
    description: t("alternatives.description"),
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title: t("alternatives.title"),
      description: t("alternatives.description"),
      url: seo.url,
    }),
  };
}

export default async function AlternativesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "alternativesPage" });
  const seo = getSeoMetadata(locale, "/alternatives");
  const homeUrl = locale === "en" ? "https://cinerename.app" : `https://cinerename.app/${locale}`;

  const faqItems = (t.raw("faq.items") as Array<{ q: string; a: string }>) || [];

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
        name: t("title"),
        item: seo.url,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("title"),
    description: t("subtitle"),
    author: {
      "@type": "Organization",
      name: "CineRename",
      url: "https://cinerename.app",
    },
    publisher: {
      "@type": "Organization",
      name: "CineRename",
      logo: {
        "@type": "ImageObject",
        url: "https://cinerename.app/favicon-192x192.png",
      },
    },
    datePublished: "2026-01-15T00:00:00Z",
    dateModified: getLastmodDate("/alternatives"),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": seo.url,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("title"),
    description: t("subtitle"),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CineRename",
        url: "https://cinerename.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FileBot",
        url: "https://www.filebot.net",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "tinyMediaManager",
        url: "https://www.tinymediamanager.org",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "RenameFlow",
        url: "https://renameflow.com",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Bulk Rename Utility",
        url: "https://www.bulkrenameutility.co.uk",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        id="alternatives-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="alternatives-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        id="alternatives-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        id="alternatives-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Header />
      <main className="flex-grow pt-16">
        <AlternativesHub />
      </main>
      <Footer />
    </div>
  );
}
