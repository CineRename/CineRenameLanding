import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AlternativesHub from "@/components/AlternativesHub";
import { getSeoMetadata, getSocialMetadata, formatMetaTitle, getLastmodDate, getSimpleBreadcrumbJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

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
      type: "article",
      modifiedTime: getLastmodDate("/alternatives"),
    }),
  };
}

export default async function AlternativesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "alternativesPage" });
  const seo = getSeoMetadata(locale, "/alternatives");
  const faqItems = (t.raw("faq.items") as Array<{ q: string; a: string }>) || [];

  const breadcrumbJsonLd = getSimpleBreadcrumbJsonLd({
    locale,
    name: t("title"),
    currentUrl: seo.url,
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: locale,
    headline: t("title"),
    description: t("subtitle"),
    image: ["https://cinerename.app/assets/img/screen-studio.png"],
    author: {
      "@type": "Organization",
      "@id": "https://cinerename.app/#organization",
      name: "CineRename",
      url: "https://cinerename.app",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://cinerename.app/#organization",
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

  const siteUrl = getSiteUrl();
  const baseLocaleUrl = locale === "en" ? siteUrl : `${siteUrl}/${locale}`;
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("title"),
    description: t("subtitle"),
    itemListElement: [
      { position: 1, name: "CineRename", url: baseLocaleUrl },
      { position: 2, name: "FileBot", url: `${baseLocaleUrl}/vs-filebot` },
      { position: 3, name: "tinyMediaManager", url: `${baseLocaleUrl}/vs-tinymediamanager` },
      { position: 4, name: "Sonarr", url: `${baseLocaleUrl}/vs-sonarr` },
      { position: 5, name: "Radarr", url: `${baseLocaleUrl}/vs-radarr` },
      { position: 6, name: "RenameFlow", url: `${baseLocaleUrl}/vs-renameflow` },
      { position: 7, name: "mnamer", url: `${baseLocaleUrl}/vs-mnamer` },
      { position: 8, name: "MediaElch", url: `${baseLocaleUrl}/vs-mediaelch` },
      { position: 9, name: "Shoko Anime", url: `${baseLocaleUrl}/vs-shoko-anime` },
      { position: 10, name: "Rename My TV Series", url: `${baseLocaleUrl}/vs-rename-my-tv-series` },
      { position: 11, name: "TV Rename", url: `${baseLocaleUrl}/vs-tv-rename` },
      { position: 12, name: "Advanced Renamer", url: `${baseLocaleUrl}/vs-advanced-renamer` },
      { position: 13, name: "Bulk Rename Utility", url: `${baseLocaleUrl}/vs-bulk-rename-utility` },
      { position: 14, name: "Movie Renamer", url: `${baseLocaleUrl}/vs-movie-renamer` },
      { position: 15, name: "theRenamer", url: `${baseLocaleUrl}/vs-therenamer` },
    ].map((entry) => ({
      "@type": "ListItem",
      position: entry.position,
      name: entry.name,
      url: entry.url,
    })),
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
