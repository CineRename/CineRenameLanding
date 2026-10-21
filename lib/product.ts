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

export const ORGANIZATION_SAME_AS = [
  "https://github.com/CineRename",
  "https://github.com/CineRename/CineRename-Releases",
  "https://x.com/CineRename",
  "https://apps.microsoft.com/detail/9N7JL6NXFVGW",
  "https://snapcraft.io/cinerename",
] as const;

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

export function getOrganizationJsonLd({
  siteUrl,
  description,
}: {
  siteUrl: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: PRODUCT_NAME,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/favicon-192x192.png`,
      width: 192,
      height: 192,
    },
    description,
    email: "cinerename@gmail.com",
    sameAs: [...ORGANIZATION_SAME_AS],
  };
}

export function getWebSiteJsonLd({
  siteUrl,
  locale,
}: {
  siteUrl: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: PRODUCT_NAME,
    inLanguage: locale,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
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
    "@id": `${siteUrl}/#software`,
    name: PRODUCT_NAME,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: ["en", "fr", "es", "zh"],
    brand: {
      "@type": "Brand",
      name: PRODUCT_NAME,
    },
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Video Renamer & Media Organizer",
    operatingSystem: "Windows 10, Windows 11, macOS, Linux",
    description,
    url: siteUrl,
    downloadUrl: localizedUrl(siteUrl, locale, "/download"),
    sameAs: [...ORGANIZATION_SAME_AS],
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
      "Automatic movie and TV series renaming with TheTVDB & TVmaze",
      "Bulk renaming for movies, TV shows and anime",
      "Plex, Jellyfin and Emby media library organization",
      "Subtitle search, preview and download with OpenSubtitles",
      "Multi-quality duplicate detection",
      "Automatic batch renaming with 100% local processing and 1-click Undo",
    ],
  };
}

