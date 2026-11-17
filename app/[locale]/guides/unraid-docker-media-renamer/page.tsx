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
  getGuideBreadcrumbJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const seo = getSeoMetadata(locale, "/guides/unraid-docker-media-renamer");

  return {
    title: formatMetaTitle(t("guideUnraidDocker.title")),
    description: t("guideUnraidDocker.description"),
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title: t("guideUnraidDocker.title"),
      description: t("guideUnraidDocker.description"),
      url: seo.url,
      type: "article",
      modifiedTime: getLastmodDate("/guides/unraid-docker-media-renamer"),
    }),
  };
}

export default async function GuideUnraidDockerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guideUnraidDocker" });
  const seo = getSeoMetadata(locale, "/guides/unraid-docker-media-renamer");

  const sections = (t.raw("sections") as GuideSection[]) || [];
  const faq = (t.raw("faq") as GuideFaqItem[]) || [];

  const breadcrumbJsonLd = getGuideBreadcrumbJsonLd({
    locale,
    title: t("title"),
    currentUrl: seo.url,
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    inLanguage: locale,
    headline: t("title"),
    description: t("subtitle"),
    image: ["https://cinerename.app/assets/img/screen-studio.png"],
    datePublished: "2026-11-17T00:00:00Z",
    dateModified: getLastmodDate("/guides/unraid-docker-media-renamer"),
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
        id="unraid-guide-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="unraid-guide-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faq.length > 0 && (
        <script
          id="unraid-guide-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Header />
      <main className="flex-grow pt-16">
        <GuidePage
          slug="unraid-docker-media-renamer"
          categoryBadge="Unraid & Docker"
          categoryIcon="nas"
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
            slug: "anime-naming-absolute-vs-season",
            title: t("nextGuideTitle"),
            category: "Anime & Fansubs",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
