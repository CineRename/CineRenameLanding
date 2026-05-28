import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Geist_Mono } from "next/font/google";
import PostHogProvider from "./PostHogProvider";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CineRename – Renommez et organisez vos films, séries et animes",
  description:
    "CineRename renomme automatiquement vos films, séries et animes, télécharge les sous-titres et nettoie les doublons. 100% local. Compatible Plex, Jellyfin, Emby.",
  keywords: "cinerename, renommer films, renommer séries, renommer animes, plex, jellyfin, emby, sous-titres opensubtitles, thetvdb, tvmaze, organiser bibliothèque vidéo, media library, doublons vidéo, undo rename",
  authors: [{ name: "CineRename" }],
  creator: "CineRename",
  publisher: "CineRename",
  icons: {
    icon: [
      { url: "/favicon.ico?v=cinerename-20260429", sizes: "any" },
      { url: "/favicon.svg?v=cinerename-20260429", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=cinerename-20260429", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=cinerename-20260429", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=cinerename-20260429", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CineRename – Renommez et organisez vos films, séries et animes",
    description:
      "CineRename renomme automatiquement vos films, séries et animes, télécharge les sous-titres et nettoie les doublons. 100% local. Compatible Plex, Jellyfin, Emby.",
    url: "/",
    siteName: "CineRename",
    images: [
      {
        url: "/assets/img/screen-studio.png",
        width: 1200,
        height: 630,
        alt: "CineRename — application desktop pour renommer films, séries et animes",
      },
    ],
    locale: 'fr_FR',
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CineRename – Renommez et organisez vos films, séries et animes",
    description:
      "Renommage en masse, sous-titres automatiques, chasse aux doublons. 100% local, compatible Plex et Jellyfin.",
    images: ["/assets/img/screen-studio.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=cinerename-20260429" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=cinerename-20260429" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png?v=cinerename-20260429" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png?v=cinerename-20260429" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=cinerename-20260429" sizes="180x180" />

        <link rel="preload" href="/favicon.svg?v=cinerename-20260429" as="image" fetchPriority="high" />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${geistMono.variable} antialiased text-sm`}
      >
        {/* Schema.org structured data */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "CineRename",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "macOS, Windows, Linux",
              "description": "CineRename renomme automatiquement vos films, séries et animes, télécharge les sous-titres et nettoie les doublons. 100% local, compatible Plex, Jellyfin, Emby.",
              "url": siteUrl,
              "downloadUrl": `${siteUrl}/fr/download`,
              "screenshot": `${siteUrl}/assets/img/screen-studio.png`,
              "softwareVersion": "0.1.0",
              "datePublished": "2026-04-01",
              "offers": [
                {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "EUR",
                  "description": "Gratuit — version d'essai limitée à 2 fichiers par jour",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "price": "24.99",
                  "priceCurrency": "EUR",
                  "description": "Pro — abonnement annuel, toutes les fonctionnalités",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "price": "49.99",
                  "priceCurrency": "EUR",
                  "description": "Pro à vie — paiement unique, licence perpétuelle, mises à jour incluses",
                  "availability": "https://schema.org/InStock"
                }
              ],
              "featureList": [
                "Renommage automatique de films, séries et animes",
                "Reconnaissance intelligente des médias (films / épisodes / animes)",
                "Extraction des vidéos depuis archives ZIP/RAR",
                "Récupération des titres officiels via TheTVDB et TVmaze",
                "Téléchargement automatique des sous-titres via OpenSubtitles",
                "Détection des doublons multi-qualités (1080p, 4K, etc.)",
                "Historique avec annulation (undo) en un clic",
                "Mode automatique pour traitement en pipeline",
                "Traitement 100% local — aucune donnée envoyée dans le cloud",
                "Compatible Plex, Jellyfin, Emby",
                "CLI pour intégration NAS / Seedbox"
              ]
            })
          }}
        />

        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
