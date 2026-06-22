import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from "next";
import PostHogProvider from "../PostHogProvider";
import { getSiteUrl } from "@/lib/site";

import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const siteUrl = getSiteUrl();

  // Create alternates for all supported locales
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = l === routing.defaultLocale ? siteUrl : `${siteUrl}/${l}`;
  });
  // x-default is usually the default locale (en)
  languages['x-default'] = siteUrl;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: '%s | CineRename',
      default: t('title'),
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: "CineRename" }],
    creator: "CineRename",
    publisher: "CineRename",
    icons: {
      icon: [
        { url: "/favicon.ico?v=cinerename-20260429", sizes: "any" },
        { url: "/favicon.svg?v=cinerename-20260429", type: "image/svg+xml" },
        { url: "/favicon-192x192.png?v=cinerename-20260429", sizes: "192x192", type: "image/png" },
        { url: "/favicon-48x48.png?v=cinerename-20260429", sizes: "48x48", type: "image/png" },
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
      canonical: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      siteName: "CineRename",
      images: [
        {
          url: "/assets/img/screen-studio.png",
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/assets/img/screen-studio.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  const validLocales = routing.locales as readonly string[];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();
  const siteUrl = getSiteUrl();
  const t = await getTranslations({ locale, namespace: 'seo' });
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=cinerename-20260429" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=cinerename-20260429" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png?v=cinerename-20260429" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png?v=cinerename-20260429" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=cinerename-20260429" sizes="180x180" />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased text-sm"
      >
        {/* Schema.org structured data */}
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "CineRename",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "macOS, Windows, Linux",
              "description": t('description'),
              "url": siteUrl,
              "downloadUrl": `${siteUrl}/${locale}/download`,
              "screenshot": `${siteUrl}/assets/img/screen-studio.png`,
              "softwareVersion": "0.1.0",
              "datePublished": "2026-04-01",
              "offers": [
                {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "EUR",
                  "description": "Gratuit — version d'essai",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "price": "24.99",
                  "priceCurrency": "EUR",
                  "description": "Pro — abonnement annuel",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "price": "49.99",
                  "priceCurrency": "EUR",
                  "description": "Pro à vie",
                  "availability": "https://schema.org/InStock"
                }
              ],
              "featureList": [
                "Renommage automatique de films, séries et animes",
                "Reconnaissance intelligente des médias",
                "Téléchargement automatique des sous-titres via OpenSubtitles",
                "Détection des doublons multi-qualités",
                "Traitement 100% local"
              ]
            })
          }}
        />

        <NextIntlClientProvider messages={messages}>
          <PostHogProvider posthogKey={posthogKey} posthogHost={posthogHost}>
            {children}
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
