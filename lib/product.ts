import { routing } from "@/i18n/routing";
import latestRelease from "@/public/releases/latest.json";

type LatestRelease = {
  version?: string;
  publishedAt?: string;
};

const release = latestRelease as LatestRelease;

export const PRODUCT_NAME = "CineRename";
export const PRODUCT_VERSION = release.version ?? "0.5.0";
export const PRODUCT_RELEASE_DATE =
  release.publishedAt?.slice(0, 10) ?? "2026-06-30";

export const PRODUCT_OFFERS = [
  {
    id: "free",
    price: "0",
    priceCurrency: "EUR",
    description: "Free trial",
  },
  {
    id: "monthly",
    price: "1",
    priceCurrency: "EUR",
    description: "Pro monthly license",
  },
  {
    id: "annual",
    price: "5",
    priceCurrency: "EUR",
    description: "Pro annual license",
  },
  {
    id: "lifetime",
    price: "30",
    priceCurrency: "EUR",
    description: "Pro lifetime license",
  },
] as const;

function localizedUrl(siteUrl: string, locale: string, pathname: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${pathname}`;
}

export function getSoftwareApplicationJsonLd({
  siteUrl,
  locale,
  description,
}: {
  siteUrl: string;
  locale: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: PRODUCT_NAME,
    brand: {
      "@type": "Brand",
      name: PRODUCT_NAME,
    },
    applicationCategory: "MultimediaApplication",
    operatingSystem: "macOS, Windows, Linux",
    description,
    url: siteUrl,
    downloadUrl: localizedUrl(siteUrl, locale, "/download"),
    image: [`${siteUrl}/assets/img/screen-studio.png`],
    screenshot: `${siteUrl}/assets/img/screen-studio.png`,
    softwareVersion: PRODUCT_VERSION,
    datePublished: PRODUCT_RELEASE_DATE,
    offers: PRODUCT_OFFERS.map((offer) => ({
      "@type": "Offer",
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      description: offer.description,
      availability: "https://schema.org/InStock",
    })),
    featureList: [
      "Bulk renaming for movies, TV shows and anime",
      "Metadata-assisted media recognition",
      "Subtitle search and preview through OpenSubtitles",
      "Multi-quality duplicate detection",
      "Local-first file processing",
    ],
  };
}
