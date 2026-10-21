import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { formatMetaTitle, getSeoMetadata, getSocialMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = getSeoMetadata(locale, "/privacy");
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const isZh = locale === "zh";

  const title = isFr
    ? "Politique de confidentialité"
    : isEs
    ? "Política de privacidad"
    : isZh
    ? "隐私政策"
    : "Privacy Policy";

  const description = isFr
    ? "Politique de confidentialité de CineRename : traitement 100% local, aucun envoi de vos fichiers vidéo, respect strict de votre vie privée."
    : isEs
    ? "Política de privacidad de CineRename: procesamiento 100% local sin subida de archivos ni rastreo de datos personales."
    : isZh
    ? "CineRename 隐私政策：100% 本地安全处理，不上传或收集用户媒体文件及个人数据。"
    : "CineRename Privacy Policy: 100% local video processing, zero media uploads or personal data tracking.";

  return {
    title: formatMetaTitle(title),
    description,
    alternates: seo.alternates,
    ...getSocialMetadata({
      locale,
      title,
      description,
      url: seo.url,
    }),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 w-full">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary-300 transition-colors">
                {isFr ? "Accueil" : "Home"}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-600">/</li>
            <li className="text-primary-400 font-medium" aria-current="page">
              {isFr ? "Politique de confidentialité" : "Privacy Policy"}
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          {isFr ? "Politique de Confidentialité" : "Privacy Policy"}
        </h1>

        <p className="text-gray-400 mb-8">
          {isFr ? "Date d'effet : Avril 2026" : "Effective Date: April 2026"}
        </p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <p className="mb-6">
            {isFr
              ? "Nous respectons votre vie privée. Cette politique de confidentialité explique comment vos données sont traitées lors de l'utilisation du site web et du logiciel CineRename."
              : "We respect your privacy. This Privacy Policy explains how we handle your data when you use the CineRename Website and Software."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "1. Données collectées" : "1. Information We Collect"}
          </h2>

          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {isFr ? "Informations d'achat" : "Purchase Information"}
          </h3>
          <p className="mb-6">
            {isFr
              ? "Lorsque vous achetez une licence CineRename, notre processeur de paiement (LemonSqueezy) collecte votre nom, email et informations de paiement pour traiter la transaction. Nous ne stockons jamais vos coordonnées bancaires."
              : "When you buy a CineRename license, our payment processor (LemonSqueezy) collects your name, email, and payment details to process the transaction. We do not store your payment data."}
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {isFr ? "Télémétrie & Analyses anonymes" : "Analytics & Telemetry"}
          </h3>
          <p className="mb-6">
            {isFr
              ? "Nous utilisons PostHog (analytique respectueuse de la vie privée) pour analyser l'utilisation du site et de l'application desktop. L'application transmet des données d'usage basiques et anonymes (lancements de l'application, fonctionnalités utilisées, rapports de crash) pour nous aider à améliorer l'outil. Nous ne collectons et n'envoyons JAMAIS la moindre information sur vos fichiers vidéo, titres ou arborescences."
              : "We use PostHog (privacy-friendly product analytics) to understand how the website and desktop application are used. The application collects basic, anonymous usage telemetry (such as app launches, feature interactions, and errors) to help us improve the software. We do NOT track, collect, or upload any information about your media files or file paths. No personally identifiable information is sold to third parties."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "2. Données non collectées (Traitement local)" : "2. Information We Do Not Collect"}
          </h2>
          <p className="mb-6">
            {isFr
              ? "CineRename traite vos fichiers vidéo exclusivement sur votre ordinateur. Aucun fichier multimédia n'est transféré dans le cloud. L'application contacte uniquement les APIs publiques de métadonnées (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) pour récupérer les titres et sous-titres des œuvres que vous choisissez de renommer."
              : "CineRename processes your video files entirely on your computer. We do not upload, store, or access your media files. Other than the basic anonymous telemetry mentioned above, the application only contacts public metadata APIs (TheTVDB, TVmaze, AniList, Kitsu, Jikan, OpenSubtitles) to retrieve titles and subtitles for the files you choose to process."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "3. Utilisation de vos informations" : "3. How We Use Your Information"}
          </h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>{isFr ? "Pour vous transmettre votre clé de licence Pro et vous fournir du support technique." : "To deliver your license key and provide support."}</li>
            <li>{isFr ? "Pour vous notifier des mises à jour majeures du produit." : "To communicate important updates or product improvements."}</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "4. Vos droits" : "4. Your Choices"}
          </h2>
          <p className="mb-6">
            {isFr
              ? "Vous pouvez demander la suppression de vos données personnelles ou vous désinscrire de toute communication à tout moment en nous écrivant."
              : "You may request deletion of your personal data or unsubscribe from communications by contacting us."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "5. Contact" : "5. Contact"}
          </h2>
          <p className="mb-6">
            {isFr ? "Pour toute question relative à votre vie privée, contactez-nous à " : "If you have questions, contact us at "}
            <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
