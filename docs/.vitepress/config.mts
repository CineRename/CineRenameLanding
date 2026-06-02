import { defineConfig } from "vitepress";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cinerenamelanding.epikaigle444.workers.dev";

export default defineConfig({
  base: "/docs/",
  outDir: "../.open-next/assets/docs",
  cleanUrls: true,
  
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#F97316" }],
  ],

  sitemap: {
    hostname: siteUrl,
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
      { icon: "github", link: "https://github.com/Epikaigle/CineRename" },
    ],
    search: {
      provider: "local",
    },
  },

  locales: {
    root: {
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
                                "link": "/"
                        },
                        {
                                "text": "Installation",
                                "link": "/installation"
                        },
                        {
                                "text": "Démarrage rapide",
                                "link": "/getting-started"
                        },
                        {
                                "text": "Licence Pro",
                                "link": "/pro"
                        }
                ]
        },
        {
                "text": "Modules",
                "collapsed": false,
                "items": [
                        {
                                "text": "Studio (renommage)",
                                "link": "/studio"
                        },
                        {
                                "text": "Sous-titres",
                                "link": "/subtitles"
                        },
                        {
                                "text": "Doublons",
                                "link": "/duplicates"
                        },
                        {
                                "text": "Checksums",
                                "link": "/checksums"
                        },
                        {
                                "text": "Dossiers surveillés",
                                "link": "/watch-folders"
                        },
                        {
                                "text": "Historique & Undo",
                                "link": "/history"
                        },
                        {
                                "text": "Mode automatique",
                                "link": "/auto-mode"
                        }
                ]
        },
        {
                "text": "Avancé",
                "collapsed": false,
                "items": [
                        {
                                "text": "Templates de nommage",
                                "link": "/templates"
                        },
                        {
                                "text": "Ligne de commande (CLI)",
                                "link": "/cli"
                        },
                        {
                                "text": "Export de données",
                                "link": "/export"
                        },
                        {
                                "text": "Clés API providers",
                                "link": "/providers"
                        },
                        {
                                "text": "Plex / Jellyfin / Emby / Kodi",
                                "link": "/media-servers"
                        }
                ]
        },
        {
                "text": "Aide",
                "collapsed": false,
                "items": [
                        {
                                "text": "FAQ",
                                "link": "/faq"
                        },
                        {
                                "text": "Résolution de problèmes",
                                "link": "/troubleshooting"
                        },
                        {
                                "text": "Notes de version",
                                "link": "/changelog"
                        }
                ]
        }
],
        footer: {
          message: "Documentation CineRename",
          copyright: "© 2026 CineRename",
        },
        editLink: {
          pattern: "https://github.com/Epikaigle/CineRenameLanding/edit/main/docs/:path",
          text: "Modifier cette page sur GitHub",
        },
        lastUpdated: { text: "Dernière mise à jour" },
        docFooter: { prev: "Page précédente", next: "Page suivante" },
        outline: { level: [2, 3], label: "Sur cette page" },
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: "CineRename — Documentation",
      description: "Official CineRename documentation: rename movies, TV shows and anime, download subtitles, clean up duplicates.",
      themeConfig: {
        nav: [
          { text: "Website", link: `${siteUrl}/en` },
          { text: "Download", link: `${siteUrl}/en/download` },
        ],
        sidebar: [
        {
                "text": "Getting Started",
                "collapsed": false,
                "items": [
                        {
                                "text": "Welcome",
                                "link": "/en/"
                        },
                        {
                                "text": "Installation",
                                "link": "/en/installation"
                        },
                        {
                                "text": "Quick Start",
                                "link": "/en/getting-started"
                        },
                        {
                                "text": "Pro License",
                                "link": "/en/pro"
                        }
                ]
        },
        {
                "text": "Modules",
                "collapsed": false,
                "items": [
                        {
                                "text": "Studio (renaming)",
                                "link": "/en/studio"
                        },
                        {
                                "text": "Subtitles",
                                "link": "/en/subtitles"
                        },
                        {
                                "text": "Duplicates",
                                "link": "/en/duplicates"
                        },
                        {
                                "text": "Checksums",
                                "link": "/en/checksums"
                        },
                        {
                                "text": "Watch Folders",
                                "link": "/en/watch-folders"
                        },
                        {
                                "text": "History & Undo",
                                "link": "/en/history"
                        },
                        {
                                "text": "Auto Mode",
                                "link": "/en/auto-mode"
                        }
                ]
        },
        {
                "text": "Advanced",
                "collapsed": false,
                "items": [
                        {
                                "text": "Naming Templates",
                                "link": "/en/templates"
                        },
                        {
                                "text": "Command Line (CLI)",
                                "link": "/en/cli"
                        },
                        {
                                "text": "Data Export",
                                "link": "/en/export"
                        },
                        {
                                "text": "Provider API Keys",
                                "link": "/en/providers"
                        },
                        {
                                "text": "Plex / Jellyfin / Emby / Kodi",
                                "link": "/en/media-servers"
                        }
                ]
        },
        {
                "text": "Help",
                "collapsed": false,
                "items": [
                        {
                                "text": "FAQ",
                                "link": "/en/faq"
                        },
                        {
                                "text": "Troubleshooting",
                                "link": "/en/troubleshooting"
                        },
                        {
                                "text": "Changelog",
                                "link": "/en/changelog"
                        }
                ]
        }
],
        footer: {
          message: "CineRename Documentation",
          copyright: "© 2026 CineRename",
        },
        editLink: {
          pattern: "https://github.com/Epikaigle/CineRenameLanding/edit/main/docs/:path",
          text: "Edit this page on GitHub",
        },
        lastUpdated: { text: "Last updated" },
        docFooter: { prev: "Previous page", next: "Next page" },
        outline: { level: [2, 3], label: "On this page" },
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
                                "text": "Modo Automático",
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
          pattern: "https://github.com/Epikaigle/CineRenameLanding/edit/main/docs/:path",
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
                                "text": "自动模式",
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
          pattern: "https://github.com/Epikaigle/CineRenameLanding/edit/main/docs/:path",
          text: "在 GitHub 上编辑此页面",
        },
        lastUpdated: { text: "最后更新" },
        docFooter: { prev: "上一页", next: "下一页" },
        outline: { level: [2, 3], label: "本页目录" },
      }
    }
  }
});
