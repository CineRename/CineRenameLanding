import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowToRename from "@/components/HowToRename";
import { getSeoMetadata, getSocialMetadata, formatMetaTitle, getLastmodDate, getSimpleBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const seo = getSeoMetadata(locale, "/how-to-rename");

  return {
    title: formatMetaTitle(t("howToRename.title")),
    description: t("howToRename.description"),
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title: t("howToRename.title"),
      description: t("howToRename.description"),
      url: seo.url,
      type: "article",
      modifiedTime: getLastmodDate("/how-to-rename"),
    }),
  };
}

export default async function HowToRenamePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howToRenamePage" });
  const seo = getSeoMetadata(locale, "/how-to-rename");
  const rawSteps = (t.raw("steps") as Array<{ number: string; title: string; description: string }>) || [];

  const breadcrumbJsonLd = getSimpleBreadcrumbJsonLd({
    locale,
    name: t("title"),
    currentUrl: seo.url,
  });

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: locale,
    name: t("title"),
    description: t("subtitle"),
    totalTime: "PT2M",
    image: "https://cinerename.app/assets/img/screen-studio.png",
    tool: [
      {
        "@type": "HowToTool",
        name: "CineRename",
      },
    ],
    supply: [
      {
        "@type": "HowToSupply",
        name: "Video files (MKV, MP4, AVI)",
      },
    ],
    step: rawSteps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.title,
      text: step.description,
      url: `${seo.url}#step-${idx + 1}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        id="how-to-rename-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="how-to-rename-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Header />
      <main className="flex-grow pt-16">
        <HowToRename />
      </main>
      <Footer />
    </div>
  );
}
