import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparisonPage from "@/components/ComparisonPage";
import { getSeoMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const seo = getSeoMetadata(locale, "/vs-movie-renamer");

  const localeMap: Record<string, string> = {
    fr: "fr_FR",
    es: "es_ES",
    zh: "zh_CN",
    en: "en_US",
  };

  return {
    title: t("vsMovieRenamer.title"),
    description: t("vsMovieRenamer.description"),
    keywords: t("vsMovieRenamer.keywords"),
    alternates: seo.alternates,
    openGraph: {
      title: t("vsMovieRenamer.title"),
      description: t("vsMovieRenamer.description"),
      url: seo.url,
      locale: localeMap[locale] || "en_US",
      images: [
        {
          url: "/assets/img/screen-studio.png",
          width: 1200,
          height: 630,
          alt: t("vsMovieRenamer.title"),
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("vsMovieRenamer.title"),
      description: t("vsMovieRenamer.description"),
      images: ["/assets/img/screen-studio.png"],
    },
  };
}

export default async function VsMovieRenamerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "comparisonMovieRenamer",
  });
  const seo = getSeoMetadata(locale, "/vs-movie-renamer");
  const faqItems = (t.raw("faq.items") || []) as Array<{
    q: string;
    a: string;
  }>;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CineRename",
        item:
          locale === "en"
            ? "https://cinerename.app"
            : `https://cinerename.app/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("title"),
        item: seo.url,
      },
    ],
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        id="vs-movie-renamer-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="vs-movie-renamer-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-grow pt-16">
        <div className="w-full">
          <ComparisonPage namespace="comparisonMovieRenamer" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
