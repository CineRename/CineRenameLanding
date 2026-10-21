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

  const labels = {
    fr: {
      home: "Accueil",
      title: "Politique de Remboursement",
      effectiveDate: "Date d'effet : Avril 2026",
      intro: "Nous voulons que vous achetiez votre licence CineRename Pro en toute sérénité.",
      guaranteeTitle: "Garantie satisfait ou remboursé de 14 jours",
      g1: "Vous pouvez demander un remboursement intégral dans les 14 jours suivant votre achat sans justification.",
      g2: "La demande de remboursement s'effectue simplement via le lien présent sur votre reçu LemonSqueezy.",
      g3: "Le remboursement est crédité sur votre moyen de paiement d'origine.",
      g4: "Au-delà de 14 jours, l'achat devient définitif.",
      freeNote: "La version gratuite de CineRename reste toujours utilisable pour tester le logiciel avant de passer à une licence Pro.",
      contactTitle: "Contactez-nous",
      contactIntro: "Pour toute question relative aux remboursements, contactez-nous à ",
    },
    es: {
      home: "Inicio",
      title: "Política de Reembolso",
      effectiveDate: "Fecha de vigencia: Abril 2026",
      intro: "Queremos que adquieras tu licencia de CineRename Pro con total confianza y tranquilidad.",
      guaranteeTitle: "Garantía de reembolso de 14 días",
      g1: "Puedes solicitar un reembolso completo dentro de los 14 días posteriores a tu compra, sin necesidad de dar explicaciones.",
      g2: "La solicitud de reembolso se realiza directamente a través del enlace presente en tu recibo de LemonSqueezy.",
      g3: "El importe se devuelve íntegramente al mismo método de pago original.",
      g4: "Transcurridos los 14 días, la compra se considera definitiva.",
      freeNote: "La versión gratuita de CineRename sigue estando disponible en todo momento para probar las capacidades del software antes de adquirir una licencia Pro.",
      contactTitle: "Contáctanos",
      contactIntro: "Para cualquier pregunta sobre reembolsos o facturación, escríbenos a ",
    },
    zh: {
      home: "首页",
      title: "退款政策",
      effectiveDate: "生效日期：2026年4月",
      intro: "我们希望您在购买 CineRename Pro 专业版许可证时享有充分的保障与无忧体验。",
      guaranteeTitle: "14 天无条件全额退款保障",
      g1: "自购买之日起 14 天内，若产品未能满足您的预期，您均可申请全额退款，无需任何繁琐理由。",
      g2: "您只需通过 LemonSqueezy 订单确认邮件收据中的售后链接直接发起退款申请。",
      g3: "款项将按原路退还至您支付时使用的银行卡或支付渠道账户中。",
      g4: "超过 14 天后，订单即被视为最终成交。",
      freeNote: "CineRename 始终提供功能充裕的免费试用版本，您可在购买专业版许可证之前自由下载验证实际效果。",
      contactTitle: "联系支持",
      contactIntro: "如有关于退款或账单的任何问题，请发送邮件至 ",
    },
    en: {
      home: "Home",
      title: "Refund Policy",
      effectiveDate: "Effective Date: April 2026",
      intro: "We want you to feel confident when purchasing a CineRename Pro license.",
      guaranteeTitle: "14-Day Money-Back Guarantee",
      g1: "You may request a full refund within 14 days of purchase if you are not satisfied, no questions asked.",
      g2: "Refund requests can be submitted directly via the link on your LemonSqueezy receipt.",
      g3: "Refunds will be issued directly to your original payment method.",
      g4: "After 14 days, all sales are final.",
      freeNote: "The free version of CineRename remains fully usable without a purchase, so you can always evaluate the app before considering a Pro license.",
      contactTitle: "Contact Us",
      contactIntro: "For any questions about refunds, contact us at ",
    },
  }[locale as "fr" | "es" | "zh"] || {
    home: "Home",
    title: "Refund Policy",
    effectiveDate: "Effective Date: April 2026",
    intro: "We want you to feel confident when purchasing a CineRename Pro license.",
    guaranteeTitle: "14-Day Money-Back Guarantee",
    g1: "You may request a full refund within 14 days of purchase if you are not satisfied, no questions asked.",
    g2: "Refund requests can be submitted directly via the link on your LemonSqueezy receipt.",
    g3: "Refunds will be issued directly to your original payment method.",
    g4: "After 14 days, all sales are final.",
    freeNote: "The free version of CineRename remains fully usable without a purchase, so you can always evaluate the app before considering a Pro license.",
    contactTitle: "Contact Us",
    contactIntro: "For any questions about refunds, contact us at ",
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 w-full">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary-300 transition-colors">
                {labels.home}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-600">/</li>
            <li className="text-primary-400 font-medium" aria-current="page">
              {labels.title}
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          {labels.title}
        </h1>

        <p className="text-gray-400 mb-8">
          {labels.effectiveDate}
        </p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <p className="mb-6">
            {labels.intro}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.guaranteeTitle}
          </h2>

          <ul className="list-disc list-inside mb-6 space-y-3">
            <li>{labels.g1}</li>
            <li>{labels.g2}</li>
            <li>{labels.g3}</li>
            <li>{labels.g4}</li>
          </ul>

          <p className="mb-6">
            {labels.freeNote}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.contactTitle}
          </h2>
          <p className="mb-6">
            {labels.contactIntro}
            <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
