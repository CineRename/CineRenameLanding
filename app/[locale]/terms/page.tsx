import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";
import { formatMetaTitle, getSeoMetadata, getSocialMetadata, getSimpleBreadcrumbJsonLd } from "@/lib/seo";

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
    ? "Términos y Condiciones de Uso"
    : isZh
    ? "服务条款与软件许可协议"
    : "Terms and Conditions";

  const description = isFr
    ? "Conditions générales d'utilisation du logiciel et du site CineRename : licence, garantie, utilisation légale."
    : isEs
    ? "Términos y condiciones de uso de CineRename: licencias de por vida, política de reembolso y pautas de uso legal del software."
    : isZh
    ? "CineRename 软件与官方网站使用服务条款：详细了解个人终身许可证授权、退款保障规则、数据安全免责声明与合法合规使用指南。"
    : "Terms and conditions for CineRename: perpetual licensing, 14-day refund policy, and legal usage guidelines for our software.";

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

  const labels = {
    fr: {
      home: "Accueil",
      breadcrumb: "Conditions Générales",
      title: "Conditions Générales d'Utilisation",
      effectiveDate: "Date d'effet : Avril 2026",
      intro: `Ces Conditions Générales régissent votre utilisation du site web situé à ${siteUrl} et du logiciel CineRename. En accédant au site ou en utilisant le logiciel, vous acceptez ces conditions.`,
      s1Title: "1. Licence d'utilisation",
      s1Text: "Lorsque vous achetez une licence CineRename Pro, vous recevez une licence personnelle et non transférable pour installer et utiliser le logiciel sur un maximum de 20 appareils personnels. Vous ne pouvez ni redistribuer, ni revendre la licence sans accord écrit préalable. La version d'évaluation gratuite reste utilisable sous les mêmes conditions.",
      s2Title: "2. Politique de remboursement (14 jours)",
      s2Text: "CineRename Pro inclut une garantie satisfait ou remboursé de 14 jours. Si vous n'êtes pas satisfait, vous pouvez demander un remboursement intégral dans les 14 jours suivant votre achat via le reçu LemonSqueezy.",
      s3Title: "3. Sources de métadonnées tierces",
      s3Text: "CineRename interroge des APIs tierces (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) pour récupérer les métadonnées et sous-titres. L'utilisation de ces données est soumise aux conditions de chaque fournisseur. CineRename est un projet indépendant non affilié à Plex, Jellyfin ou Emby.",
      s4Title: "4. Utilisation légale et propriété intellectuelle",
      s4Text: "CineRename est exclusivement destiné à aider les utilisateurs à organiser leurs sauvegardes personnelles légalement acquises. Le logiciel ne promeut ni n'encourage le piratage. Vous êtes seul responsable des fichiers que vous traitez.",
      s5Title: "5. Loi applicable et contact",
      s5Text: "Ces conditions sont régies par le droit français. Pour toute question, écrivez-nous à ",
    },
    es: {
      home: "Inicio",
      breadcrumb: "Términos y Condiciones",
      title: "Términos y Condiciones de Uso",
      effectiveDate: "Fecha de vigencia: Abril 2026",
      intro: `Estos Términos y Condiciones regulan el uso del sitio web ubicado en ${siteUrl} y del software CineRename. Al acceder al sitio o utilizar el software, aceptas estos términos.`,
      s1Title: "1. Licencia de uso",
      s1Text: "Al adquirir una licencia de CineRename Pro, recibes una licencia personal e intransferible para instalar y utilizar el software en hasta 20 dispositivos de uso personal. No está permitido revender ni redistribuir la licencia sin consentimiento por escrito. La versión gratuita de evaluación se rige por las mismas condiciones de uso.",
      s2Title: "2. Política de reembolso (14 días)",
      s2Text: "CineRename Pro incluye una garantía de reembolso de 14 días. Si no quedas satisfecho, puedes solicitar el reembolso completo dentro de los 14 días posteriores a la compra a través del enlace de soporte en tu recibo de LemonSqueezy.",
      s3Title: "3. Fuentes de metadatos de terceros",
      s3Text: "CineRename consulta APIs externas (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) para obtener información de títulos y subtítulos. El uso de estos datos está sujeto a los términos de cada proveedor. CineRename es un proyecto independiente sin afiliación con Plex, Jellyfin o Emby.",
      s4Title: "4. Uso legal y propiedad intelectual",
      s4Text: "CineRename está diseñado estrictamente para ayudar a los usuarios a organizar copias de seguridad de archivos multimedia obtenidos legalmente. El software no promueve ni facilita la infracción de derechos de autor. Eres el único responsable de los archivos que procesas.",
      s5Title: "5. Ley aplicable y contacto",
      s5Text: "Estos términos se rigen por la legislación francesa. Para cualquier consulta, contáctanos en ",
    },
    zh: {
      home: "首页",
      breadcrumb: "服务条款",
      title: "软件与网站服务条款",
      effectiveDate: "生效日期：2026年4月",
      intro: `本服务条款规定了您访问和使用位于 ${siteUrl} 的网站以及 CineRename 桌面端软件时的权利与义务。访问本网站或使用本软件即表示您同意遵守本条款。`,
      s1Title: "1. 软件许可授权",
      s1Text: "购买 CineRename Pro 专业版许可证后，您将获得一份专属、非排他且不可转让的许可，允许您在多达 20 台个人所有的设备上安装和激活该软件。未经书面许可，严禁分发、转售或转授权。免费试用版本在相同规范下受权使用。",
      s2Title: "2. 14 天退款保障",
      s2Text: "CineRename Pro 提供自购买起 14 天内的无条件全额退款保障。如需申请退款，您只需通过 LemonSqueezy 订单确认收据中的售后支持链接提出申请即可。",
      s3Title: "3. 第三方元数据与字幕源声明",
      s3Text: "CineRename 通过公共 API 接口（TheTVDB、TVmaze、AniList、Kitsu、OpenSubtitles）检索影视标题和字幕数据。该等数据的使用受各提供商独立条款的约束。CineRename 为独立研发工具，与 Plex、Jellyfin、Emby 或各大影视库无投资或隶属关系。",
      s4Title: "4. 合法合规使用与版权守则",
      s4Text: "CineRename 专为帮助用户规范整理合法取得的个人影视与媒体文件归档而设计。软件严禁并绝不提倡任何形式的侵权盗版行为。用户对通过本工具处理、重命名及存储的所有文件内容负全部法律责任。",
      s5Title: "5. 适用法律与联系渠道",
      s5Text: "本条款受法国现行法律管辖。如有任何条款解读或商业合作疑问，请致信 ",
    },
    en: {
      home: "Home",
      breadcrumb: "Terms and Conditions",
      title: "Terms and Conditions",
      effectiveDate: "Effective Date: April 2026",
      intro: `These Terms and Conditions ("Terms") govern your use of the website located at ${siteUrl} (the "Website") and the CineRename software (the "Software"). By accessing the Website or using the Software, you agree to comply with these Terms.`,
      s1Title: "1. License",
      s1Text: "When you purchase a CineRename Pro license, you receive a personal, non-transferable license to install and use the Software on up to 20 devices. You may not redistribute, resell, or sublicense the Software without written consent. The free version remains available under the same usage terms.",
      s2Title: "2. Refund Policy (14 Days)",
      s2Text: "CineRename Pro comes with a 14-day money-back guarantee. If you are not satisfied, you may request a refund within 14 days of purchase through your LemonSqueezy receipt.",
      s3Title: "3. Third-Party Data Sources",
      s3Text: "CineRename queries third-party APIs (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) to retrieve metadata and subtitles. Use of this data is subject to each provider's terms. CineRename is not affiliated with Plex, Jellyfin, Emby, or these metadata providers.",
      s4Title: "4. Legal Use and Copyright",
      s4Text: "CineRename is designed strictly to help users organize their legally acquired personal backups of media files. The Software does not promote or facilitate copyright infringement. You are solely responsible for ensuring you have the legal right to process your files.",
      s5Title: "5. Governing Law and Contact",
      s5Text: "These Terms are governed by French law. For any questions, contact us at ",
    },
  }[locale as "fr" | "es" | "zh"] || {
    home: "Home",
    breadcrumb: "Terms and Conditions",
    title: "Terms and Conditions",
    effectiveDate: "Effective Date: April 2026",
    intro: `These Terms and Conditions ("Terms") govern your use of the website located at ${siteUrl} (the "Website") and the CineRename software (the "Software"). By accessing the Website or using the Software, you agree to comply with these Terms.`,
    s1Title: "1. License",
    s1Text: "When you purchase a CineRename Pro license, you receive a personal, non-transferable license to install and use the Software on up to 20 devices. You may not redistribute, resell, or sublicense the Software without written consent. The free version remains available under the same usage terms.",
    s2Title: "2. Refund Policy (14 Days)",
    s2Text: "CineRename Pro comes with a 14-day money-back guarantee. If you are not satisfied, you may request a refund within 14 days of purchase through your LemonSqueezy receipt.",
    s3Title: "3. Third-Party Data Sources",
    s3Text: "CineRename queries third-party APIs (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) to retrieve metadata and subtitles. Use of this data is subject to each provider's terms. CineRename is not affiliated with Plex, Jellyfin, Emby, or these metadata providers.",
    s4Title: "4. Legal Use and Copyright",
    s4Text: "CineRename is designed strictly to help users organize their legally acquired personal backups of media files. The Software does not promote or facilitate copyright infringement. You are solely responsible for ensuring you have the legal right to process your files.",
    s5Title: "5. Governing Law and Contact",
    s5Text: "These Terms are governed by French law. For any questions, contact us at ",
  };

  const breadcrumbJsonLd = getSimpleBreadcrumbJsonLd({
    locale,
    name: labels.breadcrumb,
    currentUrl: `${siteUrl}${locale === "en" ? "" : `/${locale}`}/terms`,
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <script
        id="terms-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
              {labels.breadcrumb}
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
            {labels.s1Title}
          </h2>
          <p className="mb-6">
            {labels.s1Text}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.s2Title}
          </h2>
          <p className="mb-6">
            {labels.s2Text}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.s3Title}
          </h2>
          <p className="mb-6">
            {labels.s3Text}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.s4Title}
          </h2>
          <p className="mb-6">
            {labels.s4Text}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.s5Title}
          </h2>
          <p className="mb-6">
            {labels.s5Text}
            <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
