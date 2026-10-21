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

export const PRODUCT_AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "4.9",
  reviewCount: "128",
  bestRating: "5",
  worstRating: "1",
} as const;

export const PRODUCT_SAMPLE_REVIEWS = [
  {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: "David M.",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    reviewBody:
      "CineRename processed my 1,400+ episodes library in less than 3 minutes. Perfect Plex matching without manual editing.",
  },
  {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: "Stéphane B.",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    reviewBody:
      "The automatic OpenSubtitles fingerprint lookup is amazing. It finds subtitles matching my exact release without out-of-sync audio.",
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
    aggregateRating: PRODUCT_AGGREGATE_RATING,
    review: [...PRODUCT_SAMPLE_REVIEWS],
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
      "Local-first file processing with 1-click Undo history",
    ],
  };
}

export function getSiteNavigationJsonLd({
  siteUrl,
  locale,
}: {
  siteUrl: string;
  locale: string;
}) {
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const isZh = locale === "zh";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SiteNavigationElement",
        name: isFr
          ? "Meilleures alternatives FileBot"
          : isEs
          ? "Mejores alternativas a FileBot"
          : isZh
          ? "FileBot 最佳替代方案"
          : "Best FileBot Alternatives",
        description: isFr
          ? "Comparatif des meilleures alternatives à FileBot en 2026"
          : isEs
          ? "Comparativa de las mejores alternativas a FileBot en 2026"
          : isZh
          ? "2026 年最佳 FileBot 替代方案对比"
          : "Comparison of the best FileBot alternatives in 2026",
        url: localizedUrl(siteUrl, locale, "/alternatives"),
      },
      {
        "@type": "SiteNavigationElement",
        name: isFr
          ? "Comment renommer ses films et séries"
          : isEs
          ? "Cómo renombrar películas y series"
          : isZh
          ? "如何重命名电影与剧集"
          : "How to Rename Media Files",
        description: isFr
          ? "Guide complet pour organiser sa médiathèque pour Plex et Jellyfin"
          : isEs
          ? "Guía completa para organizar tu biblioteca para Plex y Jellyfin"
          : isZh
          ? "为 Plex 和 Jellyfin 规范整理媒体库指南"
          : "Complete guide to organizing your media library for Plex and Jellyfin",
        url: localizedUrl(siteUrl, locale, "/how-to-rename"),
      },
      {
        "@type": "SiteNavigationElement",
        name: isFr ? "Tarifs et Licences" : isEs ? "Precios y Licencias" : isZh ? "价格与许可证" : "Pricing & Licenses",
        description: isFr
          ? "Tarifs de CineRename : essai gratuit, licence mensuelle, annuelle ou à vie"
          : isEs
          ? "Precios de CineRename: prueba gratis o licencia de por vida"
          : isZh
          ? "CineRename 价格：免费试用或终身许可"
          : "CineRename pricing: free trial, monthly or lifetime license",
        url: localizedUrl(siteUrl, locale, "/pricing"),
      },
      {
        "@type": "SiteNavigationElement",
        name: isFr ? "Foire Aux Questions" : isEs ? "Preguntas Frecuentes" : isZh ? "常见问题" : "Frequently Asked Questions",
        description: isFr
          ? "Toutes les réponses sur CineRename et son fonctionnement"
          : isEs
          ? "Todas las respuestas sobre CineRename"
          : isZh
          ? "关于 CineRename 的常见问题解答"
          : "All answers about CineRename and how it works",
        url: localizedUrl(siteUrl, locale, "/faq"),
      },
      {
        "@type": "SiteNavigationElement",
        name: isFr ? "Télécharger CineRename" : isEs ? "Descargar CineRename" : isZh ? "下载 CineRename" : "Download CineRename",
        description: isFr
          ? "Télécharger gratuitement CineRename pour Windows, Mac et Linux"
          : isEs
          ? "Descarga CineRename gratis para Windows, Mac y Linux"
          : isZh
          ? "免费下载 CineRename（支持 Windows、Mac 和 Linux）"
          : "Download CineRename free for Windows, Mac and Linux",
        url: localizedUrl(siteUrl, locale, "/download"),
      },
      {
        "@type": "SiteNavigationElement",
        name: isFr ? "Documentation" : isEs ? "Documentación" : isZh ? "官方文档" : "Documentation",
        description: isFr
          ? "Guides, documentation technique et raccourcis"
          : isEs
          ? "Guías y documentación técnica"
          : isZh
          ? "技术文档与使用指南"
          : "User guides, technical documentation and shortcuts",
        url: `${siteUrl}/docs/${locale === "en" ? "" : `${locale}/`}`,
      },
    ],
  };
}

