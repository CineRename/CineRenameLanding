import { defineConfig } from "vitepress";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://cinerenamelanding.epikaigle444.workers.dev";

export default defineConfig({
  base: "/docs/",
  outDir: "../.open-next/assets/docs",
  cleanUrls: true,
  lang: "fr-FR",
  title: "CineRename — Documentation",
  description:
    "Documentation officielle de CineRename : renommer films, séries et animes, télécharger les sous-titres, nettoyer les doublons.",

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

    nav: [
      { text: "Site", link: siteUrl },
      { text: "Télécharger", link: `${siteUrl}/fr/download` },
      { text: "GitHub", link: "https://github.com/Epikaigle/CineRename" },
    ],

    sidebar: [
      {
        text: "Premiers pas",
        collapsed: false,
        items: [
          { text: "Bienvenue", link: "/" },
          { text: "Installation", link: "/installation" },
          { text: "Démarrage rapide", link: "/getting-started" },
        ],
      },
      {
        text: "Modules",
        collapsed: false,
        items: [
          { text: "Studio (renommage)", link: "/studio" },
          { text: "Sous-titres", link: "/subtitles" },
          { text: "Doublons", link: "/duplicates" },
          { text: "Historique & Undo", link: "/history" },
          { text: "Mode automatique", link: "/auto-mode" },
        ],
      },
      {
        text: "Avancé",
        collapsed: false,
        items: [
          { text: "Ligne de commande (CLI)", link: "/cli" },
          { text: "Clés API providers", link: "/providers" },
          { text: "Plex / Jellyfin / Emby", link: "/media-servers" },
        ],
      },
      {
        text: "Aide",
        collapsed: false,
        items: [
          { text: "FAQ", link: "/faq" },
          { text: "Résolution de problèmes", link: "/troubleshooting" },
          { text: "Notes de version", link: "/changelog" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Epikaigle/CineRename" },
    ],

    footer: {
      message: "Documentation CineRename",
      copyright: "© 2026 CineRename",
    },

    search: {
      provider: "local",
    },

    editLink: {
      pattern:
        "https://github.com/Epikaigle/CineRenameLanding/edit/main/docs/:path",
      text: "Modifier cette page sur GitHub",
    },

    lastUpdated: {
      text: "Dernière mise à jour",
    },

    docFooter: {
      prev: "Page précédente",
      next: "Page suivante",
    },

    outline: {
      level: [2, 3],
      label: "Sur cette page",
    },
  },
});
