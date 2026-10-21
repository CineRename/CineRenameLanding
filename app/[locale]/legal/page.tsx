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
  const seo = getSeoMetadata(locale, "/legal");
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const isZh = locale === "zh";

  const title = isFr
    ? "Mentions Légales"
    : isEs
    ? "Aviso Legal"
    : isZh
    ? "法律声明"
    : "Legal Notice";

  const description = isFr
    ? "Mentions légales du site CineRename et informations sur l'éditeur."
    : isEs
    ? "Aviso legal e información sobre el editor de CineRename."
    : isZh
    ? "CineRename 网站法律声明及出版信息。"
    : "Legal notice and publisher information for CineRename.";

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

export default async function LegalPage({ params }: Props) {
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
              {isFr ? "Mentions Légales" : "Legal Notice"}
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          {isFr ? "Mentions Légales" : "Legal Notice"}
        </h1>

        <p className="text-gray-400 mb-8">
          {isFr ? "Date d'effet : Avril 2026" : "Effective Date: April 2026"}
        </p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "Éditeur du site" : "Website Editor"}
          </h2>

          <div className="mb-6 space-y-1">
            <p><strong>{isFr ? "Entreprise :" : "Company:"}</strong> Simon Deroche</p>
            <p><strong>{isFr ? "Statut juridique :" : "Legal status:"}</strong> Auto-entrepreneur (Artisan)</p>
            <p><strong>SIRET:</strong> 93150462500019</p>
            <p><strong>SIREN:</strong> 931504625</p>
            <p><strong>{isFr ? "Adresse professionnelle :" : "Professional Address:"}</strong> 56250 LA VRAIE CROIX, France</p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "Directeur de la publication" : "Publication Director"}
          </h2>

          <div className="mb-6 space-y-1">
            <p><strong>{isFr ? "Nom :" : "Name:"}</strong> Simon Deroche</p>
            <p><strong>Email:</strong> <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a></p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "Hébergement" : "Hosting"}
          </h2>

          <div className="mb-6 space-y-1">
            <p>{isFr ? `Le site ${siteUrl} est hébergé par :` : `The website ${siteUrl} is hosted on:`}</p>
            <p><strong>Cloudflare Workers</strong></p>
            <p>Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA</p>
            <p className="pt-2">{isFr ? "Les fichiers binaires du logiciel sont hébergés sur :" : "Software binaries are hosted on:"}</p>
            <p><strong>GitHub</strong></p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "Propriété intellectuelle" : "Intellectual Property"}
          </h2>

          <p className="mb-6">
            {isFr
              ? "L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive du projet CineRename, sauf mention contraire. Toute reproduction ou distribution sans autorisation écrite préalable est interdite."
              : "All content on this website, including text, images, graphics, and logos, is the exclusive property of the CineRename project unless otherwise stated. Any reproduction, distribution, or use of this content without prior written permission is strictly prohibited."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "Marques déposées" : "Trademarks"}
          </h2>

          <p className="mb-6">
            Plex, Jellyfin, Emby, TheTVDB, TVmaze and OpenSubtitles are trademarks of their respective owners. CineRename is an independent project and is not endorsed by, affiliated with, or sponsored by any of these companies.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Contact</h2>

          <p className="mb-6">
            {isFr ? "Pour toute question, contactez-nous à " : "For any inquiries, contact us at "}
            <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
