"use client";
import React, { useState, useEffect } from "react";
import {
  Film,
  Tv,
  Sparkles,
  FileArchive,
  ArrowRight,
  Check,
  CheckCircle2,
  FolderDown,
  Languages,
  Layers,
  RotateCcw,
  ShieldCheck,
  HardDrive,
  FileText,
  Search,
  ExternalLink,
} from "lucide-react";
import { useLocale } from "next-intl";

const TRANSLATIONS = {
  fr: {
    step1: {
      windowTitle: "CineRename — Importer des fichiers",
      localBadge: "100% Local • Aucun upload",
      dropPrompt: "Glissez vos vidéos, dossiers ou archives ZIP / RAR",
      dropSub: "Reconnaissance simultanée Films, Séries, Animes & Archives",
      file1Name: "Inception.2010.1080p.BluRay.x264-SPARKS.mkv",
      file1Type: "Film",
      file1Match: "TMDB 99.8%",
      file2Name: "Breaking.Bad.S01E03.720p.WEBRip.mkv",
      file2Type: "Série TV",
      file2Match: "TheTVDB : S01E03",
      file3Name: "[SubsPlease] One Piece - 1089 (1080p) [98D83A92].mkv",
      file3Type: "Anime",
      file3Match: "AniList : Épisode 1089",
      file4Name: "Game.of.Thrones.S01.720p.rar",
      file4Type: "Archive RAR",
      file4Match: "10 épisodes extraits sans décompresser",
      footerStatus: "4/4 médias identifiés (4.3 Go) • 100% privé sur votre machine",
    },
    step2: {
      windowTitle: "CineRename Studio — Aperçu avant / après",
      presetBadge: "Preset Plex & Jellyfin",
      all: "Tous (4)",
      movies: "Films (2)",
      series: "Séries (1)",
      animes: "Animes (1)",
      row1Before: "The.Matrix.1999.1080p.BluRay.x264.mkv",
      row1After: "The Matrix (1999) [1080p BluRay].mkv",
      row1Match: "100% TMDB ✓",
      row2Before: "Breaking.Bad.S01E03.720p.WEBRip.mkv",
      row2After: "Breaking Bad - S01E03 - Le Sac est dans le Sac [720p].mkv",
      row2Match: "TheTVDB ✓",
      row3Before: "[SubsPlease] One Piece - 1089 (1080p) [98D83A92].mkv",
      row3After: "One Piece - 1089 - L'Arrivée sur l'Île Future [1080p].mkv",
      row3Match: "AniList ✓",
      row4Before: "Interstellar.2014.IMAX.2160p.UHD.HDR.x265.mkv",
      row4After: "Interstellar (2014) [2160p 4K HDR MULTi].mkv",
      row4Match: "MediaInfo ✓",
      folderNotice: "Organisation automatique : /Films/The Matrix (1999)/The Matrix (1999) [1080p].mkv",
    },
    step3: {
      windowTitle: "CineRename — Traitement & Synchronisation",
      completedBadge: "100% Prêt (0.4s)",
      subtitlesTitle: "Sous-titres automatiques (OpenSubtitles Hash Match)",
      subFr: "Français (Complet)",
      subFrForced: "Français (Forcé)",
      subEn: "English (SDH)",
      downloaded: "Téléchargé ✓",
      sidecarNotice: "Fichier sidecar créé : Inception (2010).fr.srt",
      duplicatesTitle: "Gestionnaire intelligent des doublons",
      keptBest: "[2160p 4K HDR] 18.2 Go — Conservé (Meilleure qualité)",
      purgedDuplicate: "[720p HDTV] 1.1 Go — Doublon nettoyé (+1.1 Go libérés)",
      progressText: "4/4 fichiers renommés en 0.4s • 0 erreur",
      undoButton: "Annuler en 1 clic",
      undoSuccess: "Restauré avec succès !",
      undoNotice: "Historique réversible en 1 clic à tout moment",
      serverReady: "Reconnaissance immédiate par Plex, Jellyfin, Emby & Kodi",
    },
  },
  en: {
    step1: {
      windowTitle: "CineRename — Drop your media files",
      localBadge: "100% Local • Zero cloud upload",
      dropPrompt: "Drop videos, folders or ZIP / RAR archives",
      dropSub: "Simultaneous recognition of Movies, Series, Anime & Archives",
      file1Name: "Inception.2010.1080p.BluRay.x264-SPARKS.mkv",
      file1Type: "Movie",
      file1Match: "TMDB 99.8%",
      file2Name: "Breaking.Bad.S01E03.720p.WEBRip.mkv",
      file2Type: "TV Series",
      file2Match: "TheTVDB: S01E03",
      file3Name: "[SubsPlease] One Piece - 1089 (1080p) [98D83A92].mkv",
      file3Type: "Anime",
      file3Match: "AniList: Episode 1089",
      file4Name: "Game.of.Thrones.S01.720p.rar",
      file4Type: "RAR Archive",
      file4Match: "10 episodes extracted directly",
      footerStatus: "4/4 media identified (4.3 GB) • 100% private on your machine",
    },
    step2: {
      windowTitle: "CineRename Studio — Before / After Preview",
      presetBadge: "Plex & Jellyfin Preset",
      all: "All (4)",
      movies: "Movies (2)",
      series: "Series (1)",
      animes: "Anime (1)",
      row1Before: "The.Matrix.1999.1080p.BluRay.x264.mkv",
      row1After: "The Matrix (1999) [1080p BluRay].mkv",
      row1Match: "100% TMDB ✓",
      row2Before: "Breaking.Bad.S01E03.720p.WEBRip.mkv",
      row2After: "Breaking Bad - S01E03 - ...And the Bag's in the River [720p].mkv",
      row2Match: "TheTVDB ✓",
      row3Before: "[SubsPlease] One Piece - 1089 (1080p) [98D83A92].mkv",
      row3After: "One Piece - 1089 - Entering the Future Island [1080p].mkv",
      row3Match: "AniList ✓",
      row4Before: "Interstellar.2014.IMAX.2160p.UHD.HDR.x265.mkv",
      row4After: "Interstellar (2014) [2160p 4K HDR MULTi].mkv",
      row4Match: "MediaInfo ✓",
      folderNotice: "Automatic organization: /Movies/The Matrix (1999)/The Matrix (1999) [1080p].mkv",
    },
    step3: {
      windowTitle: "CineRename — Processing & Sync",
      completedBadge: "100% Ready (0.4s)",
      subtitlesTitle: "Auto Subtitles (OpenSubtitles Hash Match)",
      subFr: "French (Full)",
      subFrForced: "French (Forced)",
      subEn: "English (SDH)",
      downloaded: "Downloaded ✓",
      sidecarNotice: "Sidecar file created: Inception (2010).fr.srt",
      duplicatesTitle: "Smart Duplicate Resolver",
      keptBest: "[2160p 4K HDR] 18.2 GB — Kept (Best Quality)",
      purgedDuplicate: "[720p HDTV] 1.1 GB — Duplicate purged (+1.1 GB freed)",
      progressText: "4/4 files renamed in 0.4s • 0 errors",
      undoButton: "1-Click Undo",
      undoSuccess: "Restored successfully!",
      undoNotice: "1-Click reversible anytime from history",
      serverReady: "Instant detection by Plex, Jellyfin, Emby & Kodi",
    },
  },
  es: {
    step1: {
      windowTitle: "CineRename — Importar archivos",
      localBadge: "100% Local • Cero subida a la nube",
      dropPrompt: "Arrastra vídeos, carpetas o archivos ZIP / RAR",
      dropSub: "Reconocimiento simultáneo de Películas, Series, Anime y Archivos",
      file1Name: "Inception.2010.1080p.BluRay.x264-SPARKS.mkv",
      file1Type: "Película",
      file1Match: "TMDB 99.8%",
      file2Name: "Breaking.Bad.S01E03.720p.WEBRip.mkv",
      file2Type: "Serie TV",
      file2Match: "TheTVDB: S01E03",
      file3Name: "[SubsPlease] One Piece - 1089 (1080p) [98D83A92].mkv",
      file3Type: "Anime",
      file3Match: "AniList: Episodio 1089",
      file4Name: "Game.of.Thrones.S01.720p.rar",
      file4Type: "Archivo RAR",
      file4Match: "10 episodios extraídos directamente",
      footerStatus: "4/4 medios identificados (4.3 GB) • 100% privado en tu equipo",
    },
    step2: {
      windowTitle: "CineRename Studio — Vista previa antes / después",
      presetBadge: "Preset Plex y Jellyfin",
      all: "Todos (4)",
      movies: "Películas (2)",
      series: "Series (1)",
      animes: "Anime (1)",
      row1Before: "The.Matrix.1999.1080p.BluRay.x264.mkv",
      row1After: "The Matrix (1999) [1080p BluRay].mkv",
      row1Match: "100% TMDB ✓",
      row2Before: "Breaking.Bad.S01E03.720p.WEBRip.mkv",
      row2After: "Breaking Bad - S01E03 - El paquete está en la bolsa [720p].mkv",
      row2Match: "TheTVDB ✓",
      row3Before: "[SubsPlease] One Piece - 1089 (1080p) [98D83A92].mkv",
      row3After: "One Piece - 1089 - Llegada a la Isla del Futuro [1080p].mkv",
      row3Match: "AniList ✓",
      row4Before: "Interstellar.2014.IMAX.2160p.UHD.HDR.x265.mkv",
      row4After: "Interstellar (2014) [2160p 4K HDR MULTi].mkv",
      row4Match: "MediaInfo ✓",
      folderNotice: "Organización automática: /Películas/The Matrix (1999)/The Matrix (1999) [1080p].mkv",
    },
    step3: {
      windowTitle: "CineRename — Procesamiento y Sincronización",
      completedBadge: "100% Listo (0.4s)",
      subtitlesTitle: "Subtítulos automáticos (OpenSubtitles Hash Match)",
      subFr: "Francés (Completo)",
      subFrForced: "Francés (Forzado)",
      subEn: "Inglés (SDH)",
      downloaded: "Descargado ✓",
      sidecarNotice: "Archivo sidecar creado: Inception (2010).es.srt",
      duplicatesTitle: "Limpieza inteligente de duplicados",
      keptBest: "[2160p 4K HDR] 18.2 GB — Conservado (Máxima calidad)",
      purgedDuplicate: "[720p HDTV] 1.1 GB — Duplicado purgado (+1.1 GB liberados)",
      progressText: "4/4 archivos renombrados en 0.4s • 0 errores",
      undoButton: "Deshacer en 1 clic",
      undoSuccess: "¡Restaurado con éxito!",
      undoNotice: "100% reversible en 1 clic en cualquier momento",
      serverReady: "Detección inmediata por Plex, Jellyfin, Emby y Kodi",
    },
  },
  zh: {
    step1: {
      windowTitle: "CineRename — 导入媒体文件",
      localBadge: "100% 本地运行 • 零云端上传",
      dropPrompt: "拖放视频、文件夹或 ZIP / RAR 压缩包",
      dropSub: "同时支持电影、电视剧、动漫与压缩包自动识别",
      file1Name: "Inception.2010.1080p.BluRay.x264-SPARKS.mkv",
      file1Type: "电影",
      file1Match: "TMDB 99.8%",
      file2Name: "Breaking.Bad.S01E03.720p.WEBRip.mkv",
      file2Type: "电视剧",
      file2Match: "TheTVDB: 第1季第3集",
      file3Name: "[SubsPlease] One Piece - 1089 (1080p) [98D83A92].mkv",
      file3Type: "动漫",
      file3Match: "AniList: 第1089集",
      file4Name: "Game.of.Thrones.S01.720p.rar",
      file4Type: "RAR 压缩包",
      file4Match: "直接提取 10 集无需预先解压",
      footerStatus: "已瞬间识别 4 个媒体文件 (4.3 GB) • 100% 本地私密处理",
    },
    step2: {
      windowTitle: "CineRename Studio — 重命名前后实时预览",
      presetBadge: "Plex 与 Jellyfin 预设",
      all: "全部 (4)",
      movies: "电影 (2)",
      series: "剧集 (1)",
      animes: "动漫 (1)",
      row1Before: "The.Matrix.1999.1080p.BluRay.x264.mkv",
      row1After: "The Matrix (1999) [1080p BluRay].mkv",
      row1Match: "100% TMDB ✓",
      row2Before: "Breaking.Bad.S01E03.720p.WEBRip.mkv",
      row2After: "Breaking Bad - S01E03 - 囊中之物 [720p].mkv",
      row2Match: "TheTVDB ✓",
      row3Before: "[SubsPlease] One Piece - 1089 (1080p) [98D83A92].mkv",
      row3After: "One Piece - 1089 - 抵达未来岛 [1080p].mkv",
      row3Match: "AniList ✓",
      row4Before: "Interstellar.2014.IMAX.2160p.UHD.HDR.x265.mkv",
      row4After: "Interstellar (2014) [2160p 4K HDR MULTi].mkv",
      row4Match: "MediaInfo ✓",
      folderNotice: "自动分类归档：/电影/The Matrix (1999)/The Matrix (1999) [1080p].mkv",
    },
    step3: {
      windowTitle: "CineRename — 一键处理与媒体库同步",
      completedBadge: "0.4秒内 100% 就绪",
      subtitlesTitle: "自动下载配套字幕 (OpenSubtitles Hash 匹配)",
      subFr: "法语 (完整)",
      subFrForced: "法语 (特效)",
      subEn: "英语 (SDH)",
      downloaded: "已下载 ✓",
      sidecarNotice: "已自动生成同名外挂字幕：Inception (2010).zh.srt",
      duplicatesTitle: "智能清理重复与低画质版本",
      keptBest: "[2160p 4K HDR] 18.2 GB — 保留 (最高画质版本)",
      purgedDuplicate: "[720p HDTV] 1.1 GB — 清理重复项 (释放 +1.1 GB 存储)",
      progressText: "0.4 秒内已重命名 4/4 个文件 • 0 错误",
      undoButton: "一键撤销",
      undoSuccess: "已瞬间完整还原！",
      undoNotice: "历史记录随时完整一键回滚",
      serverReady: "Plex、Jellyfin、Emby 与 Kodi 完美即刻识别",
    },
  },
};

// Window Header Component with macOS-style traffic lights
function WindowHeader({ title, badge, badgeColor = "primary" }) {
  const badgeClasses =
    badgeColor === "emerald"
      ? "bg-secondary-500/15 text-secondary-400 border-secondary-500/30"
      : "bg-primary-500/15 text-primary-400 border-primary-500/30";

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/10 select-none">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70 hover:opacity-100 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:opacity-100 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-green-500/70 hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-xs font-mono text-gray-300 ml-2 hidden sm:inline">
          {title}
        </span>
      </div>
      {badge && (
        <span
          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${badgeClasses} flex items-center gap-1.5`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {badge}
        </span>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// Step 1 Animation: Drop & Multi-Source Intelligent Matching
// ----------------------------------------------------------------------
export function Step1DropAnimation() {
  const locale = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.fr;
  const s = t.step1;

  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const files = [
    {
      name: s.file1Name,
      type: s.file1Type,
      typeIcon: Film,
      typeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      match: s.file1Match,
      matchColor: "text-secondary-400 bg-secondary-500/10 border-secondary-500/20",
      size: "2.4 Go",
    },
    {
      name: s.file2Name,
      type: s.file2Type,
      typeIcon: Tv,
      typeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      match: s.file2Match,
      matchColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      size: "820 Mo",
    },
    {
      name: s.file3Name,
      type: s.file3Type,
      typeIcon: Sparkles,
      typeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      match: s.file3Match,
      matchColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      size: "1.1 Go",
    },
    {
      name: s.file4Name,
      type: s.file4Type,
      typeIcon: FileArchive,
      typeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      match: s.file4Match,
      matchColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      size: "4.8 Go",
    },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-surface-elevated/90 backdrop-blur-md transition-all duration-300">
      <WindowHeader title={s.windowTitle} badge={s.localBadge} badgeColor="emerald" />

      <div className="p-4 sm:p-6 space-y-4">
        {/* Animated Dropzone Prompt */}
        <div className="relative border-2 border-dashed border-primary-500/30 rounded-xl p-4 sm:p-5 bg-gradient-to-b from-primary-500/5 to-transparent text-center group transition-colors">
          <div className="w-10 h-10 rounded-xl bg-primary-500/15 border border-primary-500/30 text-primary-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
            <FolderDown className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-white">{s.dropPrompt}</p>
          <p className="text-xs text-gray-400 mt-0.5">{s.dropSub}</p>
        </div>

        {/* File Ingestion List */}
        <div className="space-y-2">
          {files.map((file, idx) => {
            const Icon = file.typeIcon;
            const isHighlighted = activeHighlight === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveHighlight(idx)}
                className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border transition-all duration-300 ${
                  isHighlighted
                    ? "bg-white/[0.08] border-primary-500/40 shadow-lg shadow-primary-500/10 scale-[1.01]"
                    : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${file.typeColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-xs sm:text-sm text-gray-200 truncate font-medium">
                      {file.name}
                    </p>
                    <span className="text-[11px] text-gray-400 font-mono flex-shrink-0 hidden sm:inline">
                      {file.size}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${file.typeColor}`}
                    >
                      {file.type}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${file.matchColor} flex items-center gap-1`}
                    >
                      <Check className="w-3 h-3" />
                      {file.match}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-secondary-400" />
            <span className="text-[11px] sm:text-xs text-gray-300">
              {s.footerStatus}
            </span>
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-secondary-400 font-semibold px-2 py-0.5 rounded bg-secondary-500/10 border border-secondary-500/20">
            Local OK
          </span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Step 2 Animation: Live Before / After Renaming Studio
// ----------------------------------------------------------------------
export function Step2StudioAnimation() {
  const locale = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.fr;
  const s = t.step2;

  const [filter, setFilter] = useState("all");

  const rows = [
    {
      id: "matrix",
      category: "movies",
      icon: Film,
      iconColor: "text-blue-400 bg-blue-500/15 border-blue-500/30",
      before: s.row1Before,
      after: s.row1After,
      match: s.row1Match,
      badge: "Plex OK",
    },
    {
      id: "breakingbad",
      category: "series",
      icon: Tv,
      iconColor: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
      before: s.row2Before,
      after: s.row2After,
      match: s.row2Match,
      badge: "S01E03",
    },
    {
      id: "onepiece",
      category: "animes",
      icon: Sparkles,
      iconColor: "text-purple-400 bg-purple-500/15 border-purple-500/30",
      before: s.row3Before,
      after: s.row3After,
      match: s.row3Match,
      badge: "Anime",
    },
    {
      id: "interstellar",
      category: "movies",
      icon: Film,
      iconColor: "text-amber-400 bg-amber-500/15 border-amber-500/30",
      before: s.row4Before,
      after: s.row4After,
      match: s.row4Match,
      badge: "4K HDR",
    },
  ];

  const visibleRows =
    filter === "all" ? rows : rows.filter((r) => r.category === filter);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-surface-elevated/90 backdrop-blur-md transition-all duration-300">
      <WindowHeader title={s.windowTitle} badge={s.presetBadge} badgeColor="primary" />

      {/* Filter Tabs */}
      <div className="px-4 sm:px-6 pt-4 pb-2 flex items-center gap-1.5 sm:gap-2 border-b border-white/10 overflow-x-auto text-xs">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            filter === "all"
              ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          {s.all}
        </button>
        <button
          onClick={() => setFilter("movies")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            filter === "movies"
              ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          {s.movies}
        </button>
        <button
          onClick={() => setFilter("series")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            filter === "series"
              ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          {s.series}
        </button>
        <button
          onClick={() => setFilter("animes")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            filter === "animes"
              ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          {s.animes}
        </button>
      </div>

      {/* Before / After Transformation Rows */}
      <div className="p-3 sm:p-5 space-y-2.5">
        {visibleRows.map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.id}
              className="group p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/40 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${row.iconColor}`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-[1fr_auto_1.1fr] gap-1 md:gap-3 items-center">
                  {/* Before (Messy raw name) */}
                  <span className="font-mono text-[11px] sm:text-xs text-gray-400 truncate">
                    {row.before}
                  </span>

                  {/* Arrow Indicator */}
                  <div className="hidden md:flex items-center justify-center text-primary-400 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* After (Clean standard name with emerald highlight) */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] sm:text-xs text-white font-medium truncate group-hover:text-primary-300 transition-colors">
                      {row.after}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary-500/10 text-secondary-400 border border-secondary-500/20 hidden sm:inline-block">
                    {row.match}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-secondary-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Directory Structure Indicator */}
        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-2 text-[11px] text-gray-400 font-mono truncate">
          <HardDrive className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
          <span className="truncate">{s.folderNotice}</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Step 3 Animation: Auto Subtitles, Duplicates & 1-Click Execution / Undo
// ----------------------------------------------------------------------
export function Step3ReadyAnimation() {
  const locale = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.fr;
  const s = t.step3;

  const [undoClicked, setUndoClicked] = useState(false);

  const handleUndo = () => {
    setUndoClicked(true);
    setTimeout(() => setUndoClicked(false), 2400);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-surface-elevated/90 backdrop-blur-md transition-all duration-300">
      <WindowHeader title={s.windowTitle} badge={s.completedBadge} badgeColor="emerald" />

      <div className="p-4 sm:p-6 space-y-4">
        {/* Module 1: Auto Subtitles (OpenSubtitles Hash Match) */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Languages className="w-4 h-4 text-primary-400" />
              <span>{s.subtitlesTitle}</span>
            </div>
            <span className="text-[10px] font-mono text-secondary-400 bg-secondary-500/10 px-2 py-0.5 rounded border border-secondary-500/20">
              Hash Match ✓
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs">🇫🇷</span>
                <span className="text-gray-200 text-[11px] font-medium">{s.subFr}</span>
              </div>
              <Check className="w-3.5 h-3.5 text-secondary-400" />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs">🇫🇷</span>
                <span className="text-gray-200 text-[11px] font-medium">{s.subFrForced}</span>
              </div>
              <Check className="w-3.5 h-3.5 text-secondary-400" />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs">🇬🇧</span>
                <span className="text-gray-200 text-[11px] font-medium">{s.subEn}</span>
              </div>
              <Check className="w-3.5 h-3.5 text-secondary-400" />
            </div>
          </div>

          <p className="text-[11px] text-gray-400 font-mono">
            {s.sidecarNotice}
          </p>
        </div>

        {/* Module 2: Smart Duplicate Resolver */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>{s.duplicatesTitle}</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-secondary-500/10 border border-secondary-500/20 text-secondary-300">
              <span className="font-mono text-[11px] truncate">{s.keptBest}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider ml-2 bg-secondary-500/20 px-1.5 py-0.5 rounded">
                KEEP
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400">
              <span className="font-mono text-[11px] truncate">{s.purgedDuplicate}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider ml-2 bg-white/10 px-1.5 py-0.5 rounded text-gray-300">
                PURGED
              </span>
            </div>
          </div>
        </div>

        {/* Module 3: Progress & 1-Click Undo */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-300 w-full sm:w-auto">
            <CheckCircle2 className="w-4 h-4 text-secondary-400 flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium">
              {s.progressText}
            </span>
          </div>

          <button
            onClick={handleUndo}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer ${
              undoClicked
                ? "bg-secondary-500 text-white shadow-lg shadow-secondary-500/20 scale-105"
                : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${undoClicked ? "animate-spin" : ""}`} />
            <span>{undoClicked ? s.undoSuccess : s.undoButton}</span>
          </button>
        </div>

        <p className="text-[11px] text-center text-gray-400">
          {s.serverReady}
        </p>
      </div>
    </div>
  );
}
