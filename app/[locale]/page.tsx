import { Metadata } from "next";
import Script from "next/script";
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

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

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
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ["/assets/img/screen-studio.png"],
      locale: localeMap[locale] || 'en_US',
    },
  };
}

export default function Home() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "CineRename",
    description:
      "CineRename renomme automatiquement vos films, séries et animes, télécharge les sous-titres et nettoie les doublons. 100% local, compatible Plex, Jellyfin et Emby.",
    image: [`${siteUrl}/assets/img/screen-studio.png`],
    brand: {
      "@type": "Brand",
      name: "CineRename",
    },
    url: siteUrl,
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
          text: "Oui. CineRename produit des noms et une arborescence parfaitement compatibles avec Plex, Jellyfin et Emby. Le mode automatique peut même renommer puis déplacer vos fichiers vers votre bibliothèque finale.",
        },
      },
      {
        "@type": "Question",
        name: "Mes fichiers quittent-ils mon ordinateur ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non. Tout le traitement est 100% local. Seules les requêtes vers TheTVDB, TVmaze et OpenSubtitles sortent de votre machine, et uniquement pour récupérer des métadonnées et sous-titres publics.",
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
    ],
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Script
        id="ld-product"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
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
