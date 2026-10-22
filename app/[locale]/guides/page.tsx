import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuidesHub from "@/components/GuidesHub";
import {
  getSeoMetadata,
  getSocialMetadata,
  formatMetaTitle,
  getLastmodDate,
  getSimpleBreadcrumbJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const seo = getSeoMetadata(locale, "/guides");

  return {
    title: formatMetaTitle(t("guides.title")),
    description: t("guides.description"),
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title: t("guides.title"),
      description: t("guides.description"),
      url: seo.url,
      type: "website",
      modifiedTime: getLastmodDate("/guides"),
    }),
  };
}

export default async function GuidesHubPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guidesHub" });
  const seo = getSeoMetadata(locale, "/guides");

  const breadcrumbJsonLd = getSimpleBreadcrumbJsonLd({
    locale,
    name: t("title"),
    currentUrl: seo.url,
  });

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    inLanguage: locale,
    name: t("title"),
    description: t("subtitle"),
    url: seo.url,
    publisher: {
      "@type": "Organization",
      "@id": "https://cinerename.app/#organization",
      name: "CineRename",
    },
    hasPart: [
      {
        "@type": "TechArticle",
        name: t("cards.plex.title"),
        description: t("cards.plex.description"),
        url: `${seo.url}/plex-jellyfin-naming-conventions`,
      },
      {
        "@type": "TechArticle",
        name: t("cards.nas.title"),
        description: t("cards.nas.description"),
        url: `${seo.url}/synology-qnap-nas-media-organization`,
      },
      {
        "@type": "TechArticle",
        name: t("cards.anime.title"),
        description: t("cards.anime.description"),
        url: `${seo.url}/anime-naming-absolute-vs-season`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        id="guides-hub-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="guides-hub-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Header />
      <main className="flex-grow pt-16">
        <GuidesHub />
      </main>
      <Footer />
    </div>
  );
}
