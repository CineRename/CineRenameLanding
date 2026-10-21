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

  const labels = {
    fr: {
      home: "Accueil",
      title: "Politique de Confidentialité",
      effectiveDate: "Date d'effet : Avril 2026",
      intro: "Nous respectons votre vie privée. Cette politique de confidentialité explique comment vos données sont traitées lors de l'utilisation du site web et du logiciel CineRename.",
      s1: "1. Données collectées",
      purchaseTitle: "Informations d'achat",
      purchaseText: "Lorsque vous achetez une licence CineRename, notre processeur de paiement (LemonSqueezy) collecte votre nom, email et informations de paiement pour traiter la transaction. Nous ne stockons jamais vos coordonnées bancaires.",
      analyticsTitle: "Télémétrie & Analyses anonymes",
      analyticsText: "Nous utilisons PostHog (analytique respectueuse de la vie privée) pour analyser l'utilisation du site et de l'application desktop. L'application transmet des données d'usage basiques et anonymes (lancements de l'application, fonctionnalités utilisées, rapports de crash) pour nous aider à améliorer l'outil. Nous ne collectons et n'envoyons JAMAIS la moindre information sur vos fichiers vidéo, titres ou arborescences.",
      s2: "2. Données non collectées (Traitement 100% local)",
      localText: "CineRename traite vos fichiers vidéo exclusivement sur votre ordinateur. Aucun fichier multimédia n'est transféré dans le cloud. L'application contacte uniquement les APIs publiques de métadonnées (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) pour récupérer les titres et sous-titres des œuvres que vous choisissez de renommer.",
      s3: "3. Utilisation de vos informations",
      use1: "Pour vous transmettre votre clé de licence Pro et vous fournir du support technique.",
      use2: "Pour vous notifier des mises à jour majeures du produit.",
      s4: "4. Vos droits",
      choicesText: "Vous pouvez demander la suppression de vos données personnelles ou vous désinscrire de toute communication à tout moment en nous écrivant.",
      s5: "5. Contact",
      contactIntro: "Pour toute question relative à votre vie privée, contactez-nous à ",
    },
    es: {
      home: "Inicio",
      title: "Política de Privacidad",
      effectiveDate: "Fecha de vigencia: Abril 2026",
      intro: "Respetamos tu privacidad. Esta política explica cómo se tratan tus datos al utilizar el sitio web y el software CineRename.",
      s1: "1. Información que recopilamos",
      purchaseTitle: "Información de compra",
      purchaseText: "Al comprar una licencia de CineRename, nuestra pasarela de pago (LemonSqueezy) gestiona tu nombre, correo electrónico y datos de facturación. Nosotros nunca almacenamos información de tarjetas bancarias.",
      analyticsTitle: "Telemetría y análisis anónimos",
      analyticsText: "Utilizamos PostHog (análisis respetuoso con la privacidad) para comprender el uso del sitio y de la aplicación de escritorio. La aplicación transmite datos de uso básicos y anónimos (apertura de la app, funciones utilizadas, informes de errores). NUNCA recopilamos ni subimos ningún dato sobre tus archivos de video o nombres de carpetas.",
      s2: "2. Información que NO recopilamos (Procesamiento 100% local)",
      localText: "CineRename procesa tus archivos de video íntegramente en tu equipo. Ningún archivo multimedia se sube a servidores externos. La aplicación solo consulta APIs públicas de metadatos (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) para obtener títulos y subtítulos de las obras que decides renombrar.",
      s3: "3. Uso de la información",
      use1: "Para enviarte tu clave de licencia Pro y ofrecerte soporte técnico.",
      use2: "Para comunicarte actualizaciones importantes y mejoras del software.",
      s4: "4. Tus derechos",
      choicesText: "Puedes solicitar la eliminación de tus datos personales o darte de baja de cualquier comunicación en cualquier momento escribiéndonos.",
      s5: "5. Contacto",
      contactIntro: "Para cualquier consulta sobre tu privacidad, contáctanos en ",
    },
    zh: {
      home: "首页",
      title: "隐私政策",
      effectiveDate: "生效日期：2026年4月",
      intro: "我们高度重视并保护您的个人隐私。本隐私政策旨在向您说明使用 CineRename 官方网站及桌面端软件时的数据处理方式与原则。",
      s1: "1. 我们收集的信息",
      purchaseTitle: "支付与授权信息",
      purchaseText: "当您购买 CineRename Pro 专业版许可证时，合规支付结算机构（LemonSqueezy）会处理您的姓名、电子邮件及交易信息。我们绝不触碰或存储您的银行卡支付账号敏感信息。",
      analyticsTitle: "匿名遥测与产品体验改进",
      analyticsText: "我们使用 PostHog 隐私友好型工具收集基础的站点与软件匿名交互统计（例如应用启动次数、功能点击和崩溃日志）。我们绝不收集、上传或跟踪您的视频媒体文件、文件路径、库目录或个人隐私内容。",
      s2: "2. 我们绝不收集的信息（100% 本地隐私安全）",
      localText: "CineRename 在您的计算机本地处理所有重命名与匹配任务，绝不将视频上传至任何云端。应用仅根据您确认的操作，向公共元数据库（TheTVDB、TVmaze、AniList、Kitsu、OpenSubtitles）发起合规的剧目信息与字幕检索请求。",
      s3: "3. 信息的使用目的",
      use1: "用于向您下发激活许可证密钥并提供必要的技术售后服务。",
      use2: "用于推送重要版本升级通知及产品安全公告。",
      s4: "4. 您的权利",
      choicesText: "您可以随时联系我们，请求查阅或删除您的订单记录，或退订任何相关通讯。",
      s5: "5. 隐私联络",
      contactIntro: "如有任何隐私相关疑问，请随时发送邮件至 ",
    },
    en: {
      home: "Home",
      title: "Privacy Policy",
      effectiveDate: "Effective Date: April 2026",
      intro: "We respect your privacy. This Privacy Policy explains how we handle your data when you use the CineRename Website and Software.",
      s1: "1. Information We Collect",
      purchaseTitle: "Purchase Information",
      purchaseText: "When you buy a CineRename license, our payment processor (LemonSqueezy) collects your name, email, and payment details to process the transaction. We do not store your payment data.",
      analyticsTitle: "Analytics & Telemetry",
      analyticsText: "We use PostHog (privacy-friendly product analytics) to understand how the website and desktop application are used. The application collects basic, anonymous usage telemetry (such as app launches, feature interactions, and errors) to help us improve the software. We do NOT track, collect, or upload any information about your media files or file paths. No personally identifiable information is sold to third parties.",
      s2: "2. Information We Do Not Collect (100% Local Processing)",
      localText: "CineRename processes your video files entirely on your computer. We do not upload, store, or access your media files. Other than the basic anonymous telemetry mentioned above, the application only contacts public metadata APIs (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) to retrieve titles and subtitles for the files you choose to process.",
      s3: "3. How We Use Your Information",
      use1: "To deliver your license key and provide support.",
      use2: "To communicate important updates or product improvements.",
      s4: "4. Your Choices",
      choicesText: "You may request deletion of your personal data or unsubscribe from communications by contacting us.",
      s5: "5. Contact",
      contactIntro: "If you have questions about your privacy, contact us at ",
    },
  }[locale as "fr" | "es" | "zh"] || {
    home: "Home",
    title: "Privacy Policy",
    effectiveDate: "Effective Date: April 2026",
    intro: "We respect your privacy. This Privacy Policy explains how we handle your data when you use the CineRename Website and Software.",
    s1: "1. Information We Collect",
    purchaseTitle: "Purchase Information",
    purchaseText: "When you buy a CineRename license, our payment processor (LemonSqueezy) collects your name, email, and payment details to process the transaction. We do not store your payment data.",
    analyticsTitle: "Analytics & Telemetry",
    analyticsText: "We use PostHog (privacy-friendly product analytics) to understand how the website and desktop application are used. The application collects basic, anonymous usage telemetry (such as app launches, feature interactions, and errors) to help us improve the software. We do NOT track, collect, or upload any information about your media files or file paths. No personally identifiable information is sold to third parties.",
    s2: "2. Information We Do Not Collect (100% Local Processing)",
    localText: "CineRename processes your video files entirely on your computer. We do not upload, store, or access your media files. Other than the basic anonymous telemetry mentioned above, the application only contacts public metadata APIs (TheTVDB, TVmaze, AniList, Kitsu, OpenSubtitles) to retrieve titles and subtitles for the files you choose to process.",
    s3: "3. How We Use Your Information",
    use1: "To deliver your license key and provide support.",
    use2: "To communicate important updates or product improvements.",
    s4: "4. Your Choices",
    choicesText: "You may request deletion of your personal data or unsubscribe from communications by contacting us.",
    s5: "5. Contact",
    contactIntro: "If you have questions about your privacy, contact us at ",
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
            {labels.s1}
          </h2>

          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {labels.purchaseTitle}
          </h3>
          <p className="mb-6">
            {labels.purchaseText}
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {labels.analyticsTitle}
          </h3>
          <p className="mb-6">
            {labels.analyticsText}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.s2}
          </h2>
          <p className="mb-6">
            {labels.localText}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.s3}
          </h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>{labels.use1}</li>
            <li>{labels.use2}</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.s4}
          </h2>
          <p className="mb-6">
            {labels.choicesText}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.s5}
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
