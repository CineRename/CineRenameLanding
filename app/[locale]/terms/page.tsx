import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";
import { formatMetaTitle, getSeoMetadata, getSocialMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = getSeoMetadata(locale, "/terms");
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const isZh = locale === "zh";

  const title = isFr
    ? "Conditions Générales d'Utilisation"
    : isEs
    ? "Términos y Condiciones"
    : isZh
    ? "服务条款"
    : "Terms and Conditions";

  const description = isFr
    ? "Conditions générales d'utilisation du logiciel et du site CineRename : licence, garantie, utilisation légale."
    : isEs
    ? "Términos y condiciones de uso de CineRename: licencias, garantía y uso legal."
    : isZh
    ? "CineRename 软件与网站使用服务条款：许可范围、退款政策与合法使用说明。"
    : "Terms and conditions for CineRename: licensing, refund policy, and legal usage.";

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

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
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
              {isFr ? "Conditions Générales" : "Terms and Conditions"}
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          {isFr ? "Conditions Générales d'Utilisation" : "Terms and Conditions"}
        </h1>

        <p className="text-gray-400 mb-8">
          {isFr ? "Date d'effet : Avril 2026" : "Effective Date: April 2026"}
        </p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <p className="mb-6">
            {isFr
              ? `Ces Conditions Générales régissent votre utilisation du site web situé à ${siteUrl} et du logiciel CineRename. En accédant au site ou en utilisant le logiciel, vous acceptez ces conditions.`
              : `These Terms and Conditions ("Terms") govern your use of the website located at ${siteUrl} (the "Website") and the CineRename software (the "Software"). By accessing the Website or using the Software, you agree to comply with these Terms.`}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "1. Licence d'utilisation" : "1. License"}
          </h2>
          <p className="mb-6">
            {isFr
              ? "Lorsque vous achetez une licence CineRename Pro, vous recevez une licence personnelle et non transférable pour installer et utiliser le logiciel sur un maximum de 20 appareils personnels. Vous ne pouvez ni redistribuer, ni revendre la licence sans accord écrit préalable. La version d'évaluation gratuite reste utilisable sous les mêmes conditions."
              : "When you purchase a CineRename Pro license, you receive a personal, non-transferable license to install and use the Software on up to 20 devices (unless otherwise specified). You may not redistribute, resell, or sublicense the Software without our written consent. The free version of CineRename remains available without a license under the same usage terms."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "2. Politique de remboursement (14 jours)" : "2. Refund Policy"}
          </h2>
          <p className="mb-6">
            {isFr
              ? "CineRename Pro inclut une garantie satisfait ou remboursé de 14 jours. Si vous n'êtes pas satisfait, vous pouvez demander un remboursement intégral dans les 14 jours suivant votre achat via le reçu LemonSqueezy."
              : "CineRename Pro comes with a 14-day money-back guarantee. If you are not satisfied, you may request a refund within 14 days of purchase through the LemonSqueezy support channel."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "3. Sources de métadonnées tierces" : "3. Third-Party Data Sources"}
          </h2>
          <p className="mb-6">
            {isFr
              ? "CineRename interroge des APIs tierces (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) pour récupérer les métadonnées et sous-titres. L'utilisation de ces données est soumise aux conditions de chaque fournisseur. CineRename est un projet indépendant non affilié à Plex, Jellyfin ou Emby."
              : "CineRename queries third-party APIs (TheTVDB, TVmaze, OpenSubtitles) to retrieve metadata and subtitles. The use of this data is subject to the respective providers' terms of use. CineRename is not affiliated with Plex, Jellyfin, Emby, or any of these metadata providers."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "4. Utilisation légale et propriété intellectuelle" : "4. Legal Use and Copyright"}
          </h2>
          <p className="mb-6">
            {isFr
              ? "CineRename est exclusivement destiné à aider les utilisateurs à organiser leurs sauvegardes personnelles légalement acquises. Le logiciel ne promeut ni n'encourage le piratage. Vous êtes seul responsable des fichiers que vous traitez."
              : "CineRename is designed strictly to help users organize their legally acquired personal backups of media files. The Software does not condone, facilitate, or promote copyright infringement or digital piracy. By using the Software, you agree that you are solely responsible for ensuring you have the legal right to possess and modify the files you process."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "5. Loi applicable et contact" : "5. Governing Law and Contact"}
          </h2>
          <p className="mb-6">
            {isFr
              ? "Ces conditions sont régies par le droit français. Pour toute question, écrivez-nous à "
              : "These Terms are governed by French law. For any questions, contact us at "}
            <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
