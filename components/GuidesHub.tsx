"use client";
import React from "react";
import {
  BookOpen,
  FolderTree,
  Server,
  Film,
  Tv,
  ArrowRight,
  Download,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { trackEvent } from "@/lib/tracking";

export interface GuideCardInfo {
  slug: string;
  category: string;
  icon: "plex" | "nas" | "anime";
  title: string;
  description: string;
  readTime: string;
  tags: string[];
}

export default function GuidesHub() {
  const t = useTranslations("guidesHub");

  const guides: GuideCardInfo[] = [
    {
      slug: "plex-jellyfin-naming-conventions",
      category: t("cards.plex.category"),
      icon: "plex",
      title: t("cards.plex.title"),
      description: t("cards.plex.description"),
      readTime: t("cards.plex.readTime"),
      tags: ["Plex", "Jellyfin", "Emby", "4K HDR", "Editions"],
    },
    {
      slug: "synology-qnap-nas-media-organization",
      category: t("cards.nas.category"),
      icon: "nas",
      title: t("cards.nas.title"),
      description: t("cards.nas.description"),
      readTime: t("cards.nas.readTime"),
      tags: ["Synology DSM", "QNAP", "Docker", "PUID/PGID", "Watched Folders"],
    },
    {
      slug: "anime-naming-absolute-vs-season",
      category: t("cards.anime.category"),
      icon: "anime",
      title: t("cards.anime.title"),
      description: t("cards.anime.description"),
      readTime: t("cards.anime.readTime"),
      tags: ["Anime", "Absolute Order", "AniDB", "TheTVDB", "Subtitles"],
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Header */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-gradient-to-b from-surface/60 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{t("eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-6">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Guide Cards Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={`/guides/${guide.slug}` as any}
                onClick={() => trackEvent("clic_guide_card", { slug: guide.slug })}
                className="group rounded-2xl bg-surface/50 border border-border p-6 hover:border-primary-500/50 hover:bg-surface/80 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-primary-500/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-500/10 text-primary-300 text-xs font-semibold uppercase tracking-wider">
                      {guide.icon === "nas" ? (
                        <Server className="w-3.5 h-3.5" />
                      ) : guide.icon === "anime" ? (
                        <Tv className="w-3.5 h-3.5" />
                      ) : (
                        <Film className="w-3.5 h-3.5" />
                      )}
                      {guide.category}
                    </span>
                    <span className="text-xs text-muted-foreground/80">{guide.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary-400 transition-colors leading-snug">
                    {guide.title}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {guide.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {guide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-black/30 border border-border/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
                    <span>{t("readGuide")}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Cheat Sheet / Table */}
          <div className="mt-20 p-8 rounded-2xl bg-surface/40 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <FolderTree className="w-6 h-6 text-primary-400" />
              <h2 className="text-2xl font-bold text-foreground">
                {t("cheatSheet.title")}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {t("cheatSheet.subtitle")}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-3 px-4 font-semibold text-foreground">Media Type</th>
                    <th className="py-3 px-4 font-semibold text-foreground">Official Standard Pattern</th>
                    <th className="py-3 px-4 font-semibold text-foreground">Example Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-gray-300">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-primary-400">Movie</td>
                    <td className="py-3 px-4 text-xs"><code>{"{title} ({year}) [{resolution} {dynamic_range}]"}</code></td>
                    <td className="py-3 px-4 text-xs text-emerald-300">Avatar (2009) [4K HDR].mkv</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-primary-400">Movie Edition</td>
                    <td className="py-3 px-4 text-xs"><code>{"{title} ({year}) {edition-{edition}}"}</code></td>
                    <td className="py-3 px-4 text-xs text-emerald-300">Blade Runner (1982) {"{edition-Director's Cut}"}.mkv</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-primary-400">TV Episode</td>
                    <td className="py-3 px-4 text-xs"><code>{"Season {season:00}/{show} - s{season:00}e{episode:00} - {title}"}</code></td>
                    <td className="py-3 px-4 text-xs text-emerald-300">Season 01/Breaking Bad - s01e01 - Pilot.mkv</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-primary-400">Multi-Episode</td>
                    <td className="py-3 px-4 text-xs"><code>{"{show} - s{season:00}e{ep1:00}-e{ep2:00}"}</code></td>
                    <td className="py-3 px-4 text-xs text-emerald-300">Friends - s01e01-e02 - The Pilot.mkv</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-primary-400">Specials / OVAs</td>
                    <td className="py-3 px-4 text-xs"><code>{"Season 00/{show} - s00e{special:00}"}</code></td>
                    <td className="py-3 px-4 text-xs text-emerald-300">Season 00/Doctor Who - s00e05 - Christmas.mkv</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-primary-400">Subtitle Sidecar</td>
                    <td className="py-3 px-4 text-xs"><code>{"{media_basename}.{lang}.[forced|default].srt"}</code></td>
                    <td className="py-3 px-4 text-xs text-emerald-300">Pilot.en.forced.srt</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              {t("cta.subtitle")}
            </p>
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-amber-500 text-white font-semibold text-sm hover:from-primary-600 hover:to-amber-600 transition-all shadow-lg shadow-primary-500/25"
            >
              <Download className="w-4 h-4" />
              <span>{t("cta.button")}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
