import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuidePage, { GuideSection, GuideFaqItem } from "@/components/GuidePage";
import {
  getSeoMetadata,
  getSocialMetadata,
  formatMetaTitle,
  getLastmodDate,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const seo = getSeoMetadata(locale, "/guides/anime-naming-absolute-vs-season");

  return {
    title: formatMetaTitle(t("guideAnimeNaming.title")),
    description: t("guideAnimeNaming.description"),
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title: t("guideAnimeNaming.title"),
      description: t("guideAnimeNaming.description"),
      url: seo.url,
      type: "article",
      modifiedTime: getLastmodDate("/guides/anime-naming-absolute-vs-season"),
    }),
  };
}

export default async function GuideAnimeNamingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guideAnimeNaming" });
  const seo = getSeoMetadata(locale, "/guides/anime-naming-absolute-vs-season");

  const sections = (t.raw("sections") as GuideSection[]) || [];
  const faq = (t.raw("faq") as GuideFaqItem[]) || [];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "fr" ? "Accueil" : "Home",
        item: `https://cinerename.app${locale === "en" ? "" : `/${locale}`}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fr" ? "Guides" : "Guides",
        item: `https://cinerename.app${locale === "en" ? "" : `/${locale}`}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("title"),
        item: seo.url,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    inLanguage: locale,
    headline: t("title"),
    description: t("subtitle"),
    image: ["https://cinerename.app/assets/img/screen-studio.png"],
    datePublished: "2026-10-20T00:00:00Z",
    dateModified: getLastmodDate("/guides/anime-naming-absolute-vs-season"),
    author: {
      "@type": "Person",
      name: "Simon Deroche",
      jobTitle: "Founder & Lead Developer",
      url: "https://github.com/Epikaigle",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://cinerename.app/#organization",
      name: "CineRename",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": seo.url,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        id="anime-guide-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="anime-guide-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faq.length > 0 && (
        <script
          id="anime-guide-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Header />
      <main className="flex-grow pt-16">
        <GuidePage
          slug="anime-naming-absolute-vs-season"
          categoryBadge="Anime & Fansubs"
          categoryIcon="anime"
          title={t("title")}
          subtitle={t("subtitle")}
          readTime={t("readTime")}
          lastUpdated={t("lastUpdated")}
          authorName="Simon Deroche"
          sections={sections}
          faq={faq}
          prevGuide={{
            slug: "synology-qnap-nas-media-organization",
            title: t("prevGuideTitle"),
            category: "NAS Architecture",
          }}
          nextGuide={{
            slug: "plex-jellyfin-naming-conventions",
            title: t("nextGuideTitle"),
            category: "Plex & Jellyfin",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
