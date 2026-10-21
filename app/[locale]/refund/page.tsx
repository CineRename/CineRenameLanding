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
  const seo = getSeoMetadata(locale, "/refund");
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const isZh = locale === "zh";

  const title = isFr
    ? "Politique de Remboursement"
    : isEs
    ? "Política de Reembolso"
    : isZh
    ? "退款政策"
    : "Refund Policy";

  const description = isFr
    ? "Garantie satisfait ou remboursé de 14 jours pour CineRename Pro : modalités de demande et conditions."
    : isEs
    ? "Garantía de reembolso de 14 días para CineRename Pro."
    : isZh
    ? "CineRename Pro 14 天全额退款保证与申请流程说明。"
    : "14-day money-back guarantee policy for CineRename Pro licenses.";

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

export default async function RefundPage({ params }: Props) {
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
              {isFr ? "Remboursement" : "Refund Policy"}
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          {isFr ? "Politique de Remboursement" : "Refund Policy"}
        </h1>

        <p className="text-gray-400 mb-8">
          {isFr ? "Date d'effet : Avril 2026" : "Effective Date: April 2026"}
        </p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <p className="mb-6">
            {isFr
              ? "Nous voulons que vous achetiez votre licence CineRename Pro en toute sérénité."
              : "We want you to feel confident when purchasing a CineRename Pro license."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "Garantie satisfait ou remboursé de 14 jours" : "14-Day Money-Back Guarantee"}
          </h2>

          <ul className="list-disc list-inside mb-6 space-y-3">
            <li>
              {isFr
                ? "Vous pouvez demander un remboursement intégral dans les 14 jours suivant votre achat sans justification."
                : "You may request a full refund within 14 days of purchase if you are not satisfied."}
            </li>
            <li>
              {isFr
                ? "La demande de remboursement s'effectue simplement via le lien présent sur votre reçu LemonSqueezy."
                : "Refund requests must be sent through the LemonSqueezy receipt with your order details."}
            </li>
            <li>
              {isFr
                ? "Le remboursement est crédité sur votre moyen de paiement d'origine."
                : "Refunds will be issued to your original payment method."}
            </li>
            <li>
              {isFr
                ? "Au-delà de 14 jours, l'achat devient définitif."
                : "After 14 days, all sales are final."}
            </li>
          </ul>

          <p className="mb-6">
            {isFr
              ? "La version gratuite de CineRename reste toujours utilisable pour tester le logiciel avant de passer à une licence Pro."
              : "The free version of CineRename remains fully usable without a purchase, so you can always evaluate the app before considering a Pro license."}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {isFr ? "Contactez-nous" : "Contact Us"}
          </h2>
          <p className="mb-6">
            {isFr ? "Pour toute question relative aux remboursements, contactez-nous à " : "For any questions about refunds, contact us at "}
            <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
