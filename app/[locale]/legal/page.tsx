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

  const labels = {
    fr: {
      home: "Accueil",
      title: "Mentions Légales",
      effectiveDate: "Date d'effet : Avril 2026",
      editor: "Éditeur du site",
      company: "Entreprise :",
      legalStatus: "Statut juridique :",
      legalStatusValue: "Auto-entrepreneur (Artisan)",
      address: "Adresse professionnelle :",
      director: "Directeur de la publication",
      name: "Nom :",
      hosting: "Hébergement",
      hostingIntro: `Le site ${siteUrl} est hébergé par :`,
      binariesIntro: "Les fichiers binaires du logiciel sont hébergés sur :",
      ip: "Propriété intellectuelle",
      ipText: "L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive du projet CineRename, sauf mention contraire. Toute reproduction ou distribution sans autorisation écrite préalable est interdite.",
      trademarks: "Marques déposées",
      trademarksText: "Plex, Jellyfin, Emby, TheTVDB, TVmaze et OpenSubtitles sont des marques déposées de leurs propriétaires respectifs. CineRename est un projet indépendant sans affiliation ni parrainage de ces entités.",
      contact: "Contact",
      contactIntro: "Pour toute question, contactez-nous à ",
    },
    es: {
      home: "Inicio",
      title: "Aviso Legal",
      effectiveDate: "Fecha de vigencia: Abril 2026",
      editor: "Editor del sitio",
      company: "Empresa:",
      legalStatus: "Forma jurídica:",
      legalStatusValue: "Autónomo (Auto-entrepreneur)",
      address: "Dirección profesional:",
      director: "Director de la publicación",
      name: "Nombre:",
      hosting: "Alojamiento",
      hostingIntro: `El sitio ${siteUrl} está alojado en:`,
      binariesIntro: "Los binarios del software están alojados en:",
      ip: "Propiedad intelectual",
      ipText: "Todo el contenido de este sitio (textos, imágenes, gráficos, logotipos) es propiedad exclusiva de CineRename, salvo que se indique lo contrario. Queda prohibida su reproducción sin autorización previa.",
      trademarks: "Marcas registradas",
      trademarksText: "Plex, Jellyfin, Emby, TheTVDB, TVmaze y OpenSubtitles son marcas de sus respectivos propietarios. CineRename es un software independiente sin afiliación con dichas compañías.",
      contact: "Contacto",
      contactIntro: "Para cualquier consulta, contáctanos en ",
    },
    zh: {
      home: "首页",
      title: "法律声明",
      effectiveDate: "生效日期：2026年4月",
      editor: "网站主办与出版信息",
      company: "企业实体：",
      legalStatus: "法人/登记资质：",
      legalStatusValue: "独立个体工商户（法国 Auto-entrepreneur）",
      address: "注册地址：",
      director: "出版发行负责人",
      name: "负责人姓名：",
      hosting: "基础设施与托管",
      hostingIntro: `本网站 ${siteUrl} 托管运行于：`,
      binariesIntro: "软件安装包及二进制发行文件托管于：",
      ip: "知识产权声明",
      ipText: "除另有说明外，本网站的所有内容（包括文字、交互设计、图形与商标）均属于 CineRename 项目专有。未经事先书面许可，严禁擅自复制或传播。",
      trademarks: "第三方商标声明",
      trademarksText: "Plex、Jellyfin、Emby、TheTVDB、TVmaze 和 OpenSubtitles 均为其各自所有者的注册商标。CineRename 是一个独立的媒体管理工具，与上述企业无从属或代言关系。",
      contact: "联络方式",
      contactIntro: "如有任何法律或商务咨询，请发送邮件至 ",
    },
    en: {
      home: "Home",
      title: "Legal Notice",
      effectiveDate: "Effective Date: April 2026",
      editor: "Website Editor",
      company: "Company:",
      legalStatus: "Legal status:",
      legalStatusValue: "Sole proprietorship (Auto-entrepreneur)",
      address: "Professional Address:",
      director: "Publication Director",
      name: "Name:",
      hosting: "Hosting",
      hostingIntro: `The website ${siteUrl} is hosted on:`,
      binariesIntro: "Software binaries are hosted on:",
      ip: "Intellectual Property",
      ipText: "All content on this website, including text, images, graphics, and logos, is the exclusive property of the CineRename project unless otherwise stated. Any reproduction, distribution, or use without prior written permission is prohibited.",
      trademarks: "Trademarks",
      trademarksText: "Plex, Jellyfin, Emby, TheTVDB, TVmaze and OpenSubtitles are trademarks of their respective owners. CineRename is an independent project and is not endorsed by or affiliated with these companies.",
      contact: "Contact",
      contactIntro: "For any inquiries, contact us at ",
    },
  }[locale as "fr" | "es" | "zh"] || {
    home: "Home",
    title: "Legal Notice",
    effectiveDate: "Effective Date: April 2026",
    editor: "Website Editor",
    company: "Company:",
    legalStatus: "Legal status:",
    legalStatusValue: "Sole proprietorship (Auto-entrepreneur)",
    address: "Professional Address:",
    director: "Publication Director",
    name: "Name:",
    hosting: "Hosting",
    hostingIntro: `The website ${siteUrl} is hosted on:`,
    binariesIntro: "Software binaries are hosted on:",
    ip: "Intellectual Property",
    ipText: "All content on this website, including text, images, graphics, and logos, is the exclusive property of the CineRename project unless otherwise stated. Any reproduction, distribution, or use without prior written permission is prohibited.",
    trademarks: "Trademarks",
    trademarksText: "Plex, Jellyfin, Emby, TheTVDB, TVmaze and OpenSubtitles are trademarks of their respective owners. CineRename is an independent project and is not endorsed by or affiliated with these companies.",
    contact: "Contact",
    contactIntro: "For any inquiries, contact us at ",
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
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.editor}
          </h2>

          <div className="mb-6 space-y-1">
            <p><strong>{labels.company}</strong> Simon Deroche</p>
            <p><strong>{labels.legalStatus}</strong> {labels.legalStatusValue}</p>
            <p><strong>SIRET:</strong> 93150462500019</p>
            <p><strong>SIREN:</strong> 931504625</p>
            <p><strong>{labels.address}</strong> 56250 LA VRAIE CROIX, France</p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.director}
          </h2>

          <div className="mb-6 space-y-1">
            <p><strong>{labels.name}</strong> Simon Deroche</p>
            <p><strong>Email:</strong> <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a></p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.hosting}
          </h2>

          <div className="mb-6 space-y-1">
            <p>{labels.hostingIntro}</p>
            <p><strong>Cloudflare Workers</strong></p>
            <p>Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA</p>
            <p className="pt-2">{labels.binariesIntro}</p>
            <p><strong>GitHub</strong></p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.ip}
          </h2>

          <p className="mb-6">
            {labels.ipText}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.trademarks}
          </h2>

          <p className="mb-6">
            {labels.trademarksText}
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
            {labels.contact}
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
