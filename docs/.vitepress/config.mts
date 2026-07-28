import { defineConfig } from "vitepress";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://cinerename.app").replace(/\/$/, "");
const docsBase = "/docs/";
const docsLocales = {
  en: { prefix: "", hreflang: "en-US" },
  fr: { prefix: "fr", hreflang: "fr-FR" },
  es: { prefix: "es", hreflang: "es-ES" },
  zh: { prefix: "zh", hreflang: "zh-CN" },
} as const;

type DocsLocale = keyof typeof docsLocales;

function withDocsBase(url: string) {
  const path = url.startsWith(siteUrl) ? url.slice(siteUrl.length) : url;
  if (path === "/docs" || path.startsWith(docsBase)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${docsBase.replace(/\/$/, "")}${normalizedPath}`;
}

function toPublicDocsUrl(url: string) {
  return withDocsBase(url)
    .replace(/\/index\.html$/, "/")
    .replace(/\.html$/, "");
}

function getDocsPageInfo(relativePath: string) {
  const path = relativePath.replace(/\\/g, "/").replace(/\.md$/, "");
  const segments = path.split("/");
  const locale = segments[0] in docsLocales && segments[0] !== "en"
    ? segments.shift() as DocsLocale
    : "en";
  const contentPath = segments.join("/").replace(/(^|\/)index$/, "");

  return { locale, contentPath };
}

function getDocsPageUrl(locale: DocsLocale, contentPath: string) {
  const { prefix } = docsLocales[locale];
  const path = [prefix, contentPath].filter(Boolean).join("/");

  if (!path) return `${siteUrl}${docsBase}`;
  return `${siteUrl}${docsBase}${path}${contentPath ? "" : "/"}`;
}

export default defineConfig({
  base: "/docs/",
  outDir: "../.open-next/assets/docs",
  cleanUrls: true,

  transformHead: ({ pageData }) => {
    const { locale, contentPath } = getDocsPageInfo(pageData.relativePath);
    const canonical = getDocsPageUrl(locale, contentPath);
    const alternates = Object.entries(docsLocales).map(([key, value]) => [
      "link",
      {
        rel: "alternate",
        hreflang: value.hreflang,
        href: getDocsPageUrl(key as DocsLocale, contentPath),
      },
    ] as [string, Record<string, string>]);

    return [
      ["link", { rel: "canonical", href: canonical }],
      ...alternates,
      ["link", {
        rel: "alternate",
        hreflang: "x-default",
        href: getDocsPageUrl("en", contentPath),
      }],
    ];
  },
  
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#F97316" }],
  ],

  sitemap: {
    hostname: siteUrl,
    transformItems: (items) =>
      items.map((item) => ({
        ...item,
        url: toPublicDocsUrl(item.url),
        links: item.links?.map((link) => ({
          ...link,
          url: toPublicDocsUrl(link.url),
        })),
      })),
  },
  ignoreDeadLinks: [
    /^\/(?:fr|en|es|zh)\//,
    /^\/assets\//,
  ],

  vite: {
    css: {
      postcss: {
        plugins: [],
      },
    },
  },

  themeConfig: {
    logo: "/favicon.svg",
    siteTitle: "CineRename Docs",
    socialLinks: [
      { icon: "github", link: "https://github.com/CineRename" },
    ],
    search: {
      provider: "local",
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: "CineRename — Documentation",
      description: "Official CineRename documentation: rename movies, TV shows and anime, download subtitles, clean up duplicates.",
      themeConfig: {
        nav: [
          { text: "Website", link: siteUrl },
          { text: "Download", link: `${siteUrl}/download` },
        ],
        sidebar: [
        {
                "text": "Getting Started",
                "collapsed": false,
                "items": [
                        {
                                "text": "Welcome",
                                "link": "/"
                        },
                        {
                                "text": "Installation",
                                "link": "/installation"
                        },
                        {
                                "text": "Quick Start",
                                "link": "/getting-started"
                        },
                        {
                                "text": "Pro License",
                                "link": "/pro"
                        }
                ]
        },
        {
                "text": "Modules",
                "collapsed": false,
                "items": [
                        {
                                "text": "Studio (renaming)",
                                "link": "/studio"
                        },
                        {
                                "text": "Subtitles",
                                "link": "/subtitles"
                        },
                        {
                                "text": "Duplicates",
                                "link": "/duplicates"
                        },
                        {
                                "text": "Checksums",
                                "link": "/checksums"
                        },
                        {
                                "text": "Watch Folders",
                                "link": "/watch-folders"
                        },
                        {
                                "text": "History & Undo",
                                "link": "/history"
                        },
                        {
                                "text": "Automation",
                                "link": "/auto-mode"
                        }
                ]
        },
        {
                "text": "Advanced",
                "collapsed": false,
                "items": [
                        {
                                "text": "Naming Templates",
                                "link": "/templates"
                        },
                        {
                                "text": "Command Line (CLI)",
                                "link": "/cli"
                        },
                        {
                                "text": "Data Export",
                                "link": "/export"
                        },
                        {
                                "text": "Provider API Keys",
                                "link": "/providers"
                        },
                        {
                                "text": "Plex / Jellyfin / Emby / Kodi",
                                "link": "/media-servers"
                        }
                ]
        },
        {
                "text": "Help",
                "collapsed": false,
                "items": [
                        {
                                "text": "FAQ",
                                "link": "/faq"
                        },
                        {
                                "text": "Troubleshooting",
                                "link": "/troubleshooting"
                        },
                        {
                                "text": "Changelog",
                                "link": "/changelog"
                        }
                ]
        }
],
        footer: {
          message: "CineRename Documentation",
          copyright: "© 2026 CineRename",
        },
        editLink: {
          pattern: "https://github.com/CineRename/CineRenameLanding/edit/main/docs/:path",
          text: "Edit this page on GitHub",
        },
        lastUpdated: { text: "Last updated" },
        docFooter: { prev: "Previous page", next: "Next page" },
        outline: { level: [2, 3], label: "On this page" },
      }
    },
    fr: {
      label: 'Français',
      lang: 'fr-FR',
      title: "CineRename — Documentation",
      description: "Documentation officielle de CineRename : renommer films, séries et animes, télécharger les sous-titres, nettoyer les doublons.",
      themeConfig: {
        nav: [
          { text: "Site", link: `${siteUrl}/fr` },
          { text: "Télécharger", link: `${siteUrl}/fr/download` },
        ],
        sidebar: [
        {
                "text": "Premiers pas",
                "collapsed": false,
                "items": [
                        {
                                "text": "Bienvenue",
                                "link": "/fr/"
                        },
                        {
                                "text": "Installation",
                                "link": "/fr/installation"
                        },
                        {
                                "text": "Démarrage rapide",
                                "link": "/fr/getting-started"
                        },
                        {
                                "text": "Licence Pro",
                                "link": "/fr/pro"
                        }
                ]
        },
        {
                "text": "Modules",
                "collapsed": false,
                "items": [
                        {
                                "text": "Studio (renommage)",
                                "link": "/fr/studio"
                        },
                        {
                                "text": "Sous-titres",
                                "link": "/fr/subtitles"
                        },
                        {
                                "text": "Doublons",
                                "link": "/fr/duplicates"
                        },
                        {
                                "text": "Checksums",
                                "link": "/fr/checksums"
                        },
                        {
                                "text": "Dossiers surveillés",
                                "link": "/fr/watch-folders"
                        },
                        {
                                "text": "Historique & Undo",
                                "link": "/fr/history"
                        },
                        {
                                "text": "Pipeline d'automatisation",
                                "link": "/fr/auto-mode"
                        }
                ]
        },
        {
                "text": "Avancé",
                "collapsed": false,
                "items": [
                        {
                                "text": "Templates de nommage",
                                "link": "/fr/templates"
                        },
                        {
                                "text": "Ligne de commande (CLI)",
                                "link": "/fr/cli"
                        },
                        {
                                "text": "Export de données",
                                "link": "/fr/export"
                        },
                        {
                                "text": "Clés API providers",
                                "link": "/fr/providers"
                        },
                        {
                                "text": "Plex / Jellyfin / Emby / Kodi",
                                "link": "/fr/media-servers"
                        }
                ]
        },
        {
                "text": "Aide",
                "collapsed": false,
                "items": [
                        {
                                "text": "FAQ",
                                "link": "/fr/faq"
                        },
                        {
                                "text": "Résolution de problèmes",
                                "link": "/fr/troubleshooting"
                        },
                        {
                                "text": "Notes de version",
                                "link": "/fr/changelog"
                        }
                ]
        }
],
        footer: {
          message: "Documentation CineRename",
          copyright: "© 2026 CineRename",
        },
        editLink: {
          pattern: "https://github.com/CineRename/CineRenameLanding/edit/main/docs/:path",
          text: "Modifier cette page sur GitHub",
        },
        lastUpdated: { text: "Dernière mise à jour" },
        docFooter: { prev: "Page précédente", next: "Page suivante" },
        outline: { level: [2, 3], label: "Sur cette page" },
      }
    },
    es: {
      label: 'Español',
      lang: 'es-ES',
      title: "CineRename — Documentación",
      description: "Documentación oficial de CineRename: renombrar películas, series y anime, descargar subtítulos, limpiar duplicados.",
      themeConfig: {
        nav: [
          { text: "Sitio Web", link: `${siteUrl}/es` },
          { text: "Descargar", link: `${siteUrl}/es/download` },
        ],
        sidebar: [
        {
                "text": "Primeros pasos",
                "collapsed": false,
                "items": [
                        {
                                "text": "Bienvenido",
                                "link": "/es/"
                        },
                        {
                                "text": "Instalación",
                                "link": "/es/installation"
                        },
                        {
                                "text": "Inicio Rápido",
                                "link": "/es/getting-started"
                        },
                        {
                                "text": "Licencia Pro",
                                "link": "/es/pro"
                        }
                ]
        },
        {
                "text": "Módulos",
                "collapsed": false,
                "items": [
                        {
                                "text": "Studio (renombrar)",
                                "link": "/es/studio"
                        },
                        {
                                "text": "Subtítulos",
                                "link": "/es/subtitles"
                        },
                        {
                                "text": "Duplicados",
                                "link": "/es/duplicates"
                        },
                        {
                                "text": "Checksums",
                                "link": "/es/checksums"
                        },
                        {
                                "text": "Carpetas vigiladas",
                                "link": "/es/watch-folders"
                        },
                        {
                                "text": "Historial y Deshacer",
                                "link": "/es/history"
                        },
                        {
                                "text": "Automatización",
                                "link": "/es/auto-mode"
                        }
                ]
        },
        {
                "text": "Avanzado",
                "collapsed": false,
                "items": [
                        {
                                "text": "Plantillas de nombres",
                                "link": "/es/templates"
                        },
                        {
                                "text": "Línea de comandos (CLI)",
                                "link": "/es/cli"
                        },
                        {
                                "text": "Exportación de datos",
                                "link": "/es/export"
                        },
                        {
                                "text": "Claves API de proveedores",
                                "link": "/es/providers"
                        },
                        {
                                "text": "Plex / Jellyfin / Emby / Kodi",
                                "link": "/es/media-servers"
                        }
                ]
        },
        {
                "text": "Ayuda",
                "collapsed": false,
                "items": [
                        {
                                "text": "Preguntas Frecuentes",
                                "link": "/es/faq"
                        },
                        {
                                "text": "Solución de problemas",
                                "link": "/es/troubleshooting"
                        },
                        {
                                "text": "Historial de cambios",
                                "link": "/es/changelog"
                        }
                ]
        }
],
        footer: {
          message: "Documentación de CineRename",
          copyright: "© 2026 CineRename",
        },
        editLink: {
          pattern: "https://github.com/CineRename/CineRenameLanding/edit/main/docs/:path",
          text: "Editar esta página en GitHub",
        },
        lastUpdated: { text: "Última actualización" },
        docFooter: { prev: "Página anterior", next: "Página siguiente" },
        outline: { level: [2, 3], label: "En esta página" },
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      title: "CineRename — 文档",
      description: "CineRename官方文档：重命名电影、电视剧和动漫，下载字幕，清理重复项。",
      themeConfig: {
        nav: [
          { text: "网站", link: `${siteUrl}/zh` },
          { text: "下载", link: `${siteUrl}/zh/download` },
        ],
        sidebar: [
        {
                "text": "入门指南",
                "collapsed": false,
                "items": [
                        {
                                "text": "欢迎",
                                "link": "/zh/"
                        },
                        {
                                "text": "安装",
                                "link": "/zh/installation"
                        },
                        {
                                "text": "快速开始",
                                "link": "/zh/getting-started"
                        },
                        {
                                "text": "专业版许可证",
                                "link": "/zh/pro"
                        }
                ]
        },
        {
                "text": "模块",
                "collapsed": false,
                "items": [
                        {
                                "text": "工作室 (重命名)",
                                "link": "/zh/studio"
                        },
                        {
                                "text": "字幕",
                                "link": "/zh/subtitles"
                        },
                        {
                                "text": "重复文件",
                                "link": "/zh/duplicates"
                        },
                        {
                                "text": "校验和",
                                "link": "/zh/checksums"
                        },
                        {
                                "text": "监控文件夹",
                                "link": "/zh/watch-folders"
                        },
                        {
                                "text": "历史与撤销",
                                "link": "/zh/history"
                        },
                        {
                                "text": "自动化",
                                "link": "/zh/auto-mode"
                        }
                ]
        },
        {
                "text": "高级",
                "collapsed": false,
                "items": [
                        {
                                "text": "命名模板",
                                "link": "/zh/templates"
                        },
                        {
                                "text": "命令行 (CLI)",
                                "link": "/zh/cli"
                        },
                        {
                                "text": "数据导出",
                                "link": "/zh/export"
                        },
                        {
                                "text": "提供商 API 密钥",
                                "link": "/zh/providers"
                        },
                        {
                                "text": "Plex / Jellyfin / Emby / Kodi",
                                "link": "/zh/media-servers"
                        }
                ]
        },
        {
                "text": "帮助",
                "collapsed": false,
                "items": [
                        {
                                "text": "常见问题",
                                "link": "/zh/faq"
                        },
                        {
                                "text": "故障排除",
                                "link": "/zh/troubleshooting"
                        },
                        {
                                "text": "更新日志",
                                "link": "/zh/changelog"
                        }
                ]
        }
],
        footer: {
          message: "CineRename 文档",
          copyright: "© 2026 CineRename",
        },
        editLink: {
          pattern: "https://github.com/CineRename/CineRenameLanding/edit/main/docs/:path",
          text: "在 GitHub 上编辑此页面",
        },
        lastUpdated: { text: "最后更新" },
        docFooter: { prev: "上一页", next: "下一页" },
        outline: { level: [2, 3], label: "本页目录" },
      }
    }
  }
});
