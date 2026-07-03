import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const SocialProof = dynamic(() => import("@/components/SocialProof"));
const ProcessSteps = dynamic(() => import("@/components/ProcessSteps"));
const PerksGrid = dynamic(() => import("@/components/PerksGrid"));
const ComparisonFilebot = dynamic(() => import("@/components/ComparisonFilebot"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FinalCTA = dynamic(() => import("@/components/FinalCTA"));
import { getSiteUrl } from "@/lib/site";

import { getSeoMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const seo = getSeoMetadata(locale, '/');

  const localeMap: Record<string, string> = {
    'fr': 'fr_FR',
    'es': 'es_ES',
    'zh': 'zh_CN',
    'en': 'en_US'
  };

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: seo.alternates,
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: seo.url,
      images: ["/assets/img/screen-studio.png"],
      locale: localeMap[locale] || 'en_US',
    },
  };
}

export default function Home() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CineRename",
    description:
      "CineRename aide à renommer films, séries et animes, trouver des sous-titres et nettoyer les doublons. Local-first, compatible Plex, Jellyfin et Emby.",
    image: [`${siteUrl}/assets/img/screen-studio.png`],
    brand: {
      "@type": "Brand",
      name: "CineRename",
    },
    url: siteUrl,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        description: "Free trial",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        price: "16.00",
        priceCurrency: "EUR",
        description: "Pro License",
        availability: "https://schema.org/InStock"
      }
    ]
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Sur quels systèmes CineRename fonctionne-t-il ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CineRename fonctionne nativement sur Windows, macOS et Linux grâce à Rust et Tauri v2.",
        },
      },
      {
        "@type": "Question",
        name: "CineRename est-il compatible avec Plex et Jellyfin ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. CineRename produit des noms et une arborescence pensés pour Plex, Jellyfin et Emby. Le pipeline automatique peut renommer puis déplacer vos fichiers vers votre bibliothèque finale.",
        },
      },
      {
        "@type": "Question",
        name: "Mes fichiers quittent-ils mon ordinateur ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non. Le traitement des fichiers reste local. Seules les requêtes vers les fournisseurs configurés comme TheTVDB, TVmaze, AniList, Kitsu ou OpenSubtitles sortent de votre machine, pour récupérer des métadonnées ou sous-titres publics.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je annuler un renommage ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. L'onglet Historique conserve la trace de chaque modification et permet d'annuler n'importe quel renommage en un clic, même plusieurs jours après.",
        },
      },
      {
        "@type": "Question",
        name: "CineRename gère-t-il les fichiers ZIP / RAR ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. CineRename lit à l'intérieur des archives ZIP et RAR pour en extraire les vidéos directement, sans étape manuelle.",
        },
      },
      {
        "@type": "Question",
        name: "Existe-t-il une CLI pour automatiser ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. CineRename expose les commandes preview / rename / organize / auto pour scripter vos pipelines NAS, Seedbox ou serveurs Plex.",
        },
      },
      {
        "@type": "Question",
        name: "CineRename est-il légal ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. CineRename est un outil de gestion de fichiers neutre. Nous n'hébergeons, ne fournissons, ne vendons ni ne distribuons de films, séries, animes ou autres médias protégés. Le logiciel aide uniquement à organiser des fichiers que vous avez déjà le droit légal d'utiliser.",
        },
      },
    ],
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        id="ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <ProcessSteps />
        <SocialProof />
        <PerksGrid />
        <ComparisonFilebot />
        <FAQ />
        <Testimonials />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
