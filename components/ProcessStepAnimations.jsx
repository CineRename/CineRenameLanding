"use client";
import React, { useState } from "react";
import ProcessDemo from "./ProcessDemo";
import {
  Film,
  Tv,
  Sparkles,
  FileArchive,
  Check,
  CheckCircle2,
  FolderDown,
  Layers,
  RotateCcw,
  ShieldCheck,
  HardDrive,
  Search,
  Zap,
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
    metadataStep: {
      windowTitle: "CineRename — Métadonnées & Affiches",
      badge: "APIs Connectées",
      searchStatus: "100% Identifié via TheTVDB, TMDB & AniList",
      movieTitle: "Inception (2010)",
      movieMeta: "Science-Fiction • 2h 28m • Christopher Nolan",
      movieScore: "★ 8.8/10 TMDB",
      showTitle: "Breaking Bad (2008)",
      showMeta: "Saison 1 (7 épisodes) • Drame / Thriller",
      showScore: "★ 9.5/10 TheTVDB",
      tags: ["TheTVDB", "TVmaze", "AniList", "Kitsu"],
      footerStatus: "Affiches HD et titres officiels récupérés sans clé API",
    },
    step2: {
      windowTitle: "CineRename Studio",
      presetBadge: "Preset Plex / Jellyfin",
      all: "Tous (4)",
      movies: "Films (2)",
      series: "Séries (1)",
      animes: "Animes (1)",
      catMovieMatrix: "Film • The Matrix (1999)",
      catShowBB: "Série TV • Breaking Bad (S01)",
      catAnimeOP: "Anime • One Piece (Egghead)",
      catMovieInterstellar: "Film 4K • Interstellar (2014)",
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
      folderNotice: "Dossier : /Films/The Matrix (1999)/The Matrix (1999) [1080p].mkv",
    },
    executionStep: {
      windowTitle: "CineRename — Renommage & Organisation",
      badge: "⚡ Moteur Rust Natif",
      renameBtn: "Lancer le renommage (4 fichiers)",
      renamingProgress: "Renommage en cours...",
      renamedSuccess: "4 fichiers renommés en 0.04s (3 500 f/s)",
      speedTitle: "Exécution ultra-rapide en Rust",
      treeTitle: "Structure générée pour Plex & Jellyfin :",
      movieFolder: "Films / The Matrix (1999)",
      movieFile: "The Matrix (1999) [1080p BluRay].mkv",
      showFolder: "Séries / Breaking Bad / Saison 01",
      showFile: "Breaking Bad - S01E03 - Le Sac est dans le Sac.mkv",
      undoBtn: "Annuler en 1 clic ↺",
      undoDone: "Restauration effectuée ✓",
      footer: "100% Local • Fichiers renommés sans risque sur votre machine",
    },
    step3: {
      windowTitle: "CineRename — Sous-titres & Doublons",
      badge: "OpenSubtitles API Hash",
      searchPlaceholder: "Inception.2010.1080p.mkv (Hash : 8d2e9f1...)",
      hashExact: "Hash Match 100%",
      subFr: "Français (Complet)",
      subFrDesc: "Synchronisation hash parfaite • 1.4k dl",
      subFrForced: "Français (Forcé)",
      subFrForcedDesc: "Pistes forcées • 890 dl",
      subEn: "English (SDH)",
      subEnDesc: "Sous-titres sourds & malentendants • 3.2k dl",
      downloaded: "Téléchargé ✓",
      sidecarFile: "Fichier créé : Inception (2010).fr.srt",
      duplicatesTitle: "Gestionnaire intelligent des doublons",
      duplicateBest: "Inception (2010) [2160p 4K HDR] • 14.2 Go",
      duplicateBestTag: "CONSERVÉ (4K)",
      duplicateOld: "Inception.2010.720p.HDTV.mkv • 1.1 Go",
      duplicateOldTag: "PURGÉ (+1.1 Go)",
      footer: "Sous-titres synchronisés et doublons résolus dans le même flux",
    },
  },
  en: {
    step1: {
      windowTitle: "CineRename — Drop files",
      localBadge: "100% Local • Zero upload",
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
    metadataStep: {
      windowTitle: "CineRename — Metadata & Posters",
      badge: "APIs Connected",
      searchStatus: "100% Identified via TheTVDB, TMDB & AniList",
      movieTitle: "Inception (2010)",
      movieMeta: "Sci-Fi • 2h 28m • Christopher Nolan",
      movieScore: "★ 8.8/10 TMDB",
      showTitle: "Breaking Bad (2008)",
      showMeta: "Season 1 (7 episodes) • Drama / Crime",
      showScore: "★ 9.5/10 TheTVDB",
      tags: ["TheTVDB", "TVmaze", "AniList", "Kitsu"],
      footerStatus: "Official posters, summaries & ratings fetched with zero API key needed",
    },
    step2: {
      windowTitle: "CineRename Studio",
      presetBadge: "Plex & Jellyfin Preset",
      all: "All (4)",
      movies: "Movies (2)",
      series: "Series (1)",
      animes: "Anime (1)",
      catMovieMatrix: "Movie • The Matrix (1999)",
      catShowBB: "TV Series • Breaking Bad (S01)",
      catAnimeOP: "Anime • One Piece (Egghead)",
      catMovieInterstellar: "4K Movie • Interstellar (2014)",
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
      folderNotice: "Folder: /Movies/The Matrix (1999)/The Matrix (1999) [1080p].mkv",
    },
    executionStep: {
      windowTitle: "CineRename — Rename & Organization",
      badge: "⚡ Native Rust Engine",
      renameBtn: "Start renaming (4 files)",
      renamingProgress: "Renaming files...",
      renamedSuccess: "4 files renamed in 0.04s (3,500 f/s)",
      speedTitle: "Blazing-fast execution in Rust",
      treeTitle: "Plex & Jellyfin directory structure:",
      movieFolder: "Movies / The Matrix (1999)",
      movieFile: "The Matrix (1999) [1080p BluRay].mkv",
      showFolder: "TV Shows / Breaking Bad / Season 01",
      showFile: "Breaking Bad - S01E03 - ...And the Bag's in the River.mkv",
      undoBtn: "1-Click Undo ↺",
      undoDone: "Restored successfully ✓",
      footer: "100% Local • Safe renaming directly on your machine",
    },
    step3: {
      windowTitle: "CineRename — Subtitles & Duplicates",
      badge: "OpenSubtitles API Hash",
      searchPlaceholder: "Inception.2010.1080p.mkv (Hash: 8d2e9f1...)",
      hashExact: "Hash Match 100%",
      subFr: "French (Full)",
      subFrDesc: "Exact hash sync • 1.4k dl",
      subFrForced: "French (Forced)",
      subFrForcedDesc: "Foreign dialogue tracks • 890 dl",
      subEn: "English (SDH)",
      subEnDesc: "Deaf & Hard-of-Hearing • 3.2k dl",
      downloaded: "Downloaded ✓",
      sidecarFile: "Sidecar created: Inception (2010).fr.srt",
      duplicatesTitle: "Smart Duplicate Resolver",
      duplicateBest: "Inception (2010) [2160p 4K HDR] • 14.2 GB",
      duplicateBestTag: "KEPT (4K)",
      duplicateOld: "Inception.2010.720p.HDTV.mkv • 1.1 GB",
      duplicateOldTag: "PURGED (+1.1 GB)",
      footer: "Subtitles downloaded and duplicates purged in the same pipeline",
    },
  },
  es: {
    step1: {
      windowTitle: "CineRename — Importar archivos",
      localBadge: "100% Local • Cero nube",
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
    metadataStep: {
      windowTitle: "CineRename — Metadatos y Pósters",
      badge: "APIs Conectadas",
      searchStatus: "100% Identificado en TheTVDB, TMDB y AniList",
      movieTitle: "Inception (2010)",
      movieMeta: "Ciencia Ficción • 2h 28m • Christopher Nolan",
      movieScore: "★ 8.8/10 TMDB",
      showTitle: "Breaking Bad (2008)",
      showMeta: "Temporada 1 (7 episodios) • Drama / Suspense",
      showScore: "★ 9.5/10 TheTVDB",
      tags: ["TheTVDB", "TVmaze", "AniList", "Kitsu"],
      footerStatus: "Pósters oficiales y títulos obtenidos sin necesidad de claves API",
    },
    step2: {
      windowTitle: "CineRename Studio",
      presetBadge: "Preset Plex / Jellyfin",
      all: "Todos (4)",
      movies: "Películas (2)",
      series: "Series (1)",
      animes: "Anime (1)",
      catMovieMatrix: "Película • The Matrix (1999)",
      catShowBB: "Serie TV • Breaking Bad (S01)",
      catAnimeOP: "Anime • One Piece (Egghead)",
      catMovieInterstellar: "Película 4K • Interstellar (2014)",
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
      folderNotice: "Carpeta: /Películas/The Matrix (1999)/The Matrix (1999) [1080p].mkv",
    },
    executionStep: {
      windowTitle: "CineRename — Renombrado y Organización",
      badge: "⚡ Motor Rust Nativo",
      renameBtn: "Iniciar renombrado (4 archivos)",
      renamingProgress: "Renombrando archivos...",
      renamedSuccess: "4 archivos renombrados en 0.04s (3 500 f/s)",
      speedTitle: "Ejecución ultra rápida en Rust",
      treeTitle: "Estructura generada para Plex y Jellyfin:",
      movieFolder: "Películas / The Matrix (1999)",
      movieFile: "The Matrix (1999) [1080p BluRay].mkv",
      showFolder: "Series / Breaking Bad / Temporada 01",
      showFile: "Breaking Bad - S01E03 - El paquete está en la bolsa.mkv",
      undoBtn: "Deshacer en 1 clic ↺",
      undoDone: "¡Restaurado con éxito! ✓",
      footer: "100% Local • Renombrado seguro y atómico en tu equipo",
    },
    step3: {
      windowTitle: "CineRename — Subtítulos y Duplicados",
      badge: "OpenSubtitles API Hash",
      searchPlaceholder: "Inception.2010.1080p.mkv (Hash: 8d2e9f1...)",
      hashExact: "Coincidencia 100%",
      subFr: "Francés (Completo)",
      subFrDesc: "Sincronización exacta por hash • 1.4k dl",
      subFrForced: "Francés (Forzado)",
      subFrForcedDesc: "Diálogos extranjeros • 890 dl",
      subEn: "Inglés (SDH)",
      subEnDesc: "Subtítulos para sordos • 3.2k dl",
      downloaded: "Descargado ✓",
      sidecarFile: "Archivo creado: Inception (2010).es.srt",
      duplicatesTitle: "Limpieza inteligente de duplicados",
      duplicateBest: "Inception (2010) [2160p 4K HDR] • 14.2 GB",
      duplicateBestTag: "CONSERVADO (4K)",
      duplicateOld: "Inception.2010.720p.HDTV.mkv • 1.1 GB",
      duplicateOldTag: "PURGADO (+1.1 GB)",
      footer: "Subtítulos sincronizados y duplicados resueltos en el mismo flujo",
    },
  },
  zh: {
    step1: {
      windowTitle: "CineRename — 导入媒体文件",
      localBadge: "100% 本地运行 • 零上传",
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
    metadataStep: {
      windowTitle: "CineRename — 官方元数据与海报",
      badge: "官方 API 对接",
      searchStatus: "100% 已通过 TheTVDB、TMDB 与 AniList 匹配",
      movieTitle: "盗梦空间 / Inception (2010)",
      movieMeta: "科幻 / 冒险 • 2小时 28分 • 克里斯托弗·诺兰",
      movieScore: "★ 8.8/10 TMDB",
      showTitle: "绝命毒师 / Breaking Bad (2008)",
      showMeta: "第1季 (7集) • 剧情 / 犯罪",
      showScore: "★ 9.5/10 TheTVDB",
      tags: ["TheTVDB", "TVmaze", "AniList", "Kitsu"],
      footerStatus: "自动获取高清海报、剧集大纲与评分，无需任何个人 API 密钥",
    },
    step2: {
      windowTitle: "CineRename Studio",
      presetBadge: "Plex / Jellyfin 预设",
      all: "全部 (4)",
      movies: "电影 (2)",
      series: "剧集 (1)",
      animes: "动漫 (1)",
      catMovieMatrix: "电影 • 黑客帝国 (1999)",
      catShowBB: "电视剧 • 绝命毒师 (第1季)",
      catAnimeOP: "动漫 • 海贼王 (未来岛篇)",
      catMovieInterstellar: "4K 电影 • 星际穿越 (2014)",
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
      folderNotice: "归档：/电影/The Matrix (1999)/The Matrix (1999) [1080p].mkv",
    },
    executionStep: {
      windowTitle: "CineRename — 极速重命名与整理",
      badge: "⚡ Rust 原生内核",
      renameBtn: "开始一键重命名 (4 个文件)",
      renamingProgress: "正在极速重命名...",
      renamedSuccess: "0.04 秒完成 4 个文件重命名 (3,500 文件/秒)",
      speedTitle: "Rust 原生极速执行",
      treeTitle: "标准化 Plex 与 Jellyfin 目录结构：",
      movieFolder: "电影 / The Matrix (1999)",
      movieFile: "The Matrix (1999) [1080p BluRay].mkv",
      showFolder: "剧集 / Breaking Bad / Season 01",
      showFile: "Breaking Bad - S01E03 - 囊中之物.mkv",
      undoBtn: "一键撤销 ↺",
      undoDone: "已瞬间完整恢复 ✓",
      footer: "100% 本地原子操作 • 绝不损坏原始媒体文件",
    },
    step3: {
      windowTitle: "CineRename — 配套字幕与重复项清理",
      badge: "OpenSubtitles API Hash",
      searchPlaceholder: "Inception.2010.1080p.mkv (哈希: 8d2e9f1...)",
      hashExact: "哈希精准匹配 100%",
      subFr: "法语 (完整字幕)",
      subFrDesc: "哈希完美同步 • 1.4k 次下载",
      subFrForced: "法语 (特效/强制)",
      subFrForcedDesc: "外语对白专用 • 890 次下载",
      subEn: "英语 (SDH 听障)",
      subEnDesc: "完整英文字幕 • 3.2k 次下载",
      downloaded: "已自动下载 ✓",
      sidecarFile: "已生成外挂字幕：Inception (2010).zh.srt",
      duplicatesTitle: "智能清理冗余与低清版本",
      duplicateBest: "Inception (2010) [2160p 4K HDR] • 14.2 GB",
      duplicateBestTag: "保留 (4K)",
      duplicateOld: "Inception.2010.720p.HDTV.mkv • 1.1 GB",
      duplicateOldTag: "清理 (释放 +1.1 GB)",
      footer: "字幕自动配对与重复项清理在同一流水线内极速完成",
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
    <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border-b border-white/10 select-none gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/70 hover:opacity-100 transition-opacity" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/70 hover:opacity-100 transition-opacity" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/70 hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-xs font-mono text-gray-300 ml-1 truncate">
          {title}
        </span>
      </div>
      {badge && (
        <span
          className={`text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 rounded-full border ${badgeClasses} flex items-center gap-1.5 flex-shrink-0`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
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
    <ProcessDemo variant="import" title={s.windowTitle}>
      <WindowHeader title={s.windowTitle} badge={s.localBadge} badgeColor="emerald" />

      <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
        {/* Animated Dropzone Prompt */}
        <div className="relative border-2 border-dashed border-primary-500/30 rounded-xl p-3.5 sm:p-4 bg-gradient-to-b from-primary-500/5 to-transparent text-center group transition-colors">
          <div data-demo-parcel aria-hidden="true" className="absolute inset-x-0 top-2 mx-auto w-fit flex items-center gap-2 rounded-lg border border-primary-500/40 bg-surface-elevated px-3 py-2 text-primary-300 shadow-lg"><Film className="h-4 w-4" /><FileArchive className="h-4 w-4" /><span className="font-mono text-xs">+4</span></div>
          <div data-demo-drop className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-500/15 border border-primary-500/30 text-primary-400 flex items-center justify-center mx-auto mb-1.5">
            <FolderDown className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-white">{s.dropPrompt}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{s.dropSub}</p>
        </div>

        {/* File Ingestion List */}
        <div className="space-y-1.5 sm:space-y-2">
          {files.map((file, idx) => {
            const Icon = file.typeIcon;
            return (
              <div
                key={idx}
                data-demo-row
                className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-primary-500/40 transition-colors duration-200"
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${file.typeColor}`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-[11px] sm:text-xs text-gray-200 truncate font-medium">
                      {file.name}
                    </p>
                    <span className="text-[10px] text-gray-400 font-mono flex-shrink-0 hidden sm:inline">
                      {file.size}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded border ${file.typeColor}`}
                    >
                      {file.type}
                    </span>
                    <span
                      data-demo-check data-demo-match
                      className={`text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded border ${file.matchColor} flex items-center gap-1 truncate`}
                    >
                      <Check className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{file.match}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Status Bar */}
        <div data-demo-result className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-gray-300">
          <div className="flex items-center gap-1.5 min-w-0">
            <ShieldCheck className="w-4 h-4 text-secondary-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] text-gray-300 truncate">
              {s.footerStatus}
            </span>
          </div>
          <span className="text-[9px] uppercase font-mono tracking-wider text-secondary-400 font-semibold px-2 py-0.5 rounded bg-secondary-500/10 border border-secondary-500/20 flex-shrink-0 ml-2">
            Local OK
          </span>
        </div>
      </div>
    </ProcessDemo>
  );
}

// ----------------------------------------------------------------------
// Step 2 Animation: Metadata & Official Posters Fetching
// ----------------------------------------------------------------------
export function Step2MetadataAnimation() {
  const locale = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.fr;
  const s = t.metadataStep;

  return (
    <ProcessDemo variant="metadata" title={s.windowTitle}>
      <WindowHeader title={s.windowTitle} badge={s.badge} badgeColor="emerald" />

      <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-3.5">
        {/* Status banner */}
        <div className="relative overflow-hidden flex items-center justify-between p-2.5 rounded-xl bg-secondary-500/10 border border-secondary-500/20 text-secondary-300 text-xs">
          <span data-demo-scan aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary-400 opacity-0" />
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-secondary-400 flex-shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs truncate">{s.searchStatus}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary-500/20 text-secondary-300 flex-shrink-0 ml-2">
            0 API KEY
          </span>
        </div>

        {/* Two Matched Cards (Stacked for optimal readability without horizontal squishing) */}
        <div className="space-y-2">
          {/* Card 1: Inception */}
          <div data-demo-row className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 group hover:border-primary-500/40 transition-colors">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div data-demo-poster className="w-9 h-11 rounded-md bg-gradient-to-br from-blue-600/40 to-indigo-900/60 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Film className="w-4 h-4 text-blue-300" />
                </div>
                <div className="min-w-0">
                  <div data-demo-metadata-heading className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 flex-shrink-0">
                      TMDB 27205
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white truncate">
                      {s.movieTitle}
                    </p>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 truncate mt-0.5">
                    {s.movieMeta}
                  </p>
                </div>
              </div>
              <span data-demo-check className="text-amber-400 font-semibold text-[11px] flex-shrink-0 ml-2">
                {s.movieScore}
              </span>
            </div>
          </div>

          {/* Card 2: Breaking Bad */}
          <div data-demo-row className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 group hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div data-demo-poster className="w-9 h-11 rounded-md bg-gradient-to-br from-emerald-600/40 to-teal-900/60 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Tv className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="min-w-0">
                  <div data-demo-metadata-heading className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex-shrink-0">
                      TVDB 81189
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white truncate">
                      {s.showTitle}
                    </p>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 truncate mt-0.5">
                    {s.showMeta}
                  </p>
                </div>
              </div>
              <span data-demo-check className="text-amber-400 font-semibold text-[11px] flex-shrink-0 ml-2">
                {s.showScore}
              </span>
            </div>
          </div>
        </div>

        {/* API Tags & Footer */}
        <div data-demo-result className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            {s.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] text-gray-400 hidden sm:inline truncate ml-2">
            {s.footerStatus}
          </span>
        </div>
      </div>
    </ProcessDemo>
  );
}

// ----------------------------------------------------------------------
// Step 3 Animation: Live Before / After Renaming Studio (Redesigned & Responsive)
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
      categoryTitle: s.catMovieMatrix || "Film • The Matrix",
      icon: Film,
      iconColor: "text-blue-400 bg-blue-500/15 border-blue-500/30",
      before: s.row1Before,
      after: s.row1After,
      match: s.row1Match,
    },
    {
      id: "breakingbad",
      category: "series",
      categoryTitle: s.catShowBB || "Série TV • Breaking Bad",
      icon: Tv,
      iconColor: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
      before: s.row2Before,
      after: s.row2After,
      match: s.row2Match,
    },
    {
      id: "onepiece",
      category: "animes",
      categoryTitle: s.catAnimeOP || "Anime • One Piece",
      icon: Sparkles,
      iconColor: "text-purple-400 bg-purple-500/15 border-purple-500/30",
      before: s.row3Before,
      after: s.row3After,
      match: s.row3Match,
    },
    {
      id: "interstellar",
      category: "movies",
      categoryTitle: s.catMovieInterstellar || "Film 4K • Interstellar",
      icon: Film,
      iconColor: "text-amber-400 bg-amber-500/15 border-amber-500/30",
      before: s.row4Before,
      after: s.row4After,
      match: s.row4Match,
    },
  ];

  const visibleRows =
    filter === "all" ? rows : rows.filter((r) => r.category === filter);

  return (
    <ProcessDemo variant="studio" title={s.windowTitle} sequenceKey={filter}>
      <WindowHeader title={s.windowTitle} badge={s.presetBadge} badgeColor="primary" />

      {/* Filter Tabs */}
      <div className="px-3 sm:px-4 pt-2.5 pb-2 flex items-center gap-1.5 border-b border-white/10 overflow-x-auto text-xs select-none">
        <button
          type="button"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
          className={`min-h-11 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
            filter === "all"
              ? "bg-primary-500 text-white shadow-sm"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          {s.all}
        </button>
        <button
          type="button"
          aria-pressed={filter === "movies"}
          onClick={() => setFilter("movies")}
          className={`min-h-11 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
            filter === "movies"
              ? "bg-primary-500 text-white shadow-sm"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          {s.movies}
        </button>
        <button
          type="button"
          aria-pressed={filter === "series"}
          onClick={() => setFilter("series")}
          className={`min-h-11 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
            filter === "series"
              ? "bg-primary-500 text-white shadow-sm"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          {s.series}
        </button>
        <button
          type="button"
          aria-pressed={filter === "animes"}
          onClick={() => setFilter("animes")}
          className={`min-h-11 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
            filter === "animes"
              ? "bg-primary-500 text-white shadow-sm"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          {s.animes}
        </button>
      </div>

      {/* Before / After Transformation Rows (Stacked layout ensuring zero text overlap) */}
      <div data-demo-studio-list className="p-3 sm:p-4 space-y-2">
        {visibleRows.map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.id}
              data-demo-row
              className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/40 hover:bg-white/[0.06] transition-all space-y-1.5 group"
            >
              {/* Item Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center flex-shrink-0 border ${row.iconColor}`}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-200 truncate">
                    {row.categoryTitle}
                  </span>
                </div>
                <span data-demo-check data-demo-match className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary-500/15 text-secondary-400 border border-secondary-500/30 flex items-center gap-1 font-semibold flex-shrink-0">
                  <Check className="w-3 h-3 text-secondary-400" />
                  {row.match}
                </span>
              </div>

              {/* Before & After comparison lines */}
              <div className="space-y-1 pl-1 font-mono text-[10px] sm:text-[11px]">
                {/* Raw Before */}
                <div data-demo-before className="flex items-center gap-2 min-w-0 text-gray-400">
                  <span className="text-red-400/80 font-bold text-xs flex-shrink-0 select-none">✗</span>
                  <span className="truncate text-gray-400/80 font-mono">
                    {row.before}
                  </span>
                </div>

                {/* Clean Target After */}
                <div data-demo-after className="flex items-center gap-2 min-w-0 text-white">
                  <span className="text-secondary-400 font-bold text-xs flex-shrink-0 select-none">✓</span>
                  <span className="truncate text-white font-semibold group-hover:text-primary-300 transition-colors">
                    {row.after}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Directory Structure Indicator */}
        <div data-demo-result className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-400 font-mono">
          <HardDrive className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
          <span className="truncate">{s.folderNotice}</span>
        </div>
      </div>
    </ProcessDemo>
  );
}

// ----------------------------------------------------------------------
// Step 4 Animation: 1-Click Rust Execution & Directory Structure (Redesigned)
// ----------------------------------------------------------------------
export function Step4ExecutionAnimation() {
  const locale = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.fr;
  const s = t.executionStep;

  return (
    <ProcessDemo variant="execute" title={s.windowTitle}>
      {({ phase, playing, replay, undo }) => (
        <>
          <WindowHeader title={s.windowTitle} badge={s.badge} badgeColor="primary" />
          <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-3.5">
            <div className="p-3 rounded-xl bg-primary-500/5 border border-primary-500/20 space-y-2.5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary-400 shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold text-white min-w-0">
                  {phase === "restored" ? s.undoDone : phase === "reversing" ? s.undoBtn : playing || phase === "paused" ? s.renamingProgress : phase === "finished" || phase === "reduced" ? s.renamedSuccess : s.speedTitle}
                </span>
              </div>
              <div role="progressbar" aria-label={s.renamingProgress} aria-valuemin={0} aria-valuemax={100} aria-valuenow={100} className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div data-demo-progress className="h-full w-full bg-primary-400 rounded-full" />
              </div>
              <div data-demo-execution-actions className="flex items-center justify-between pt-1 gap-2">
                <button type="button" onClick={replay} disabled={playing} className="text-xs px-3 py-1.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-primary-foreground font-semibold transition-colors cursor-pointer flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /><span>{s.renameBtn}</span>
                </button>
                <button type="button" onClick={undo} disabled={phase !== "finished" && phase !== "reduced"} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-200 transition-colors cursor-pointer flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /><span>{s.undoBtn}</span>
                </button>
              </div>
            </div>
            <div data-demo-tree>
              <div hidden={phase === "restored"}>
                <p className="text-[11px] font-semibold text-gray-300 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-400 shrink-0" /><span>{s.treeTitle}</span>
                </p>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-3 font-mono text-[10px] sm:text-[11px]">
                  {[{ folder: s.movieFolder, file: s.movieFile, Icon: Film }, { folder: s.showFolder, file: s.showFile, Icon: Tv }].map(({ folder, file, Icon }) => (
                    <div key={folder}>
                      <div data-demo-folder className="flex items-center gap-1.5 text-primary-300 font-semibold min-w-0">
                        <FolderDown className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{folder}</span>
                      </div>
                      <div data-demo-file className="flex items-center gap-2 pl-4 mt-1 text-gray-200 min-w-0">
                        <Icon className="w-3 h-3 text-secondary-400 shrink-0" /><span className="truncate">{file}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div hidden={phase !== "restored"} className="p-3 rounded-xl border border-white/10 space-y-2 text-gray-200 font-mono text-[10px] sm:text-[11px]">
                <p className="text-secondary-400 font-sans text-xs">{s.undoDone}</p>
                <p className="truncate">{t.step2.row1Before}</p><p className="truncate">{t.step2.row2Before}</p>
              </div>
            </div>
            <div data-demo-result className="pt-2 border-t border-white/10 text-[10px] sm:text-[11px] text-gray-400 font-mono">{s.footer}</div>
          </div>
        </>
      )}
    </ProcessDemo>
  );
}

// ----------------------------------------------------------------------
// Step 5 Animation: Subtitles & Duplicates (Redesigned & Spacious)
// ----------------------------------------------------------------------
export function Step3ReadyAnimation() {
  const locale = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.fr;
  const s = t.step3;

  return (
    <ProcessDemo variant="ready" title={s.windowTitle}>
      <WindowHeader title={s.windowTitle} badge={s.badge} badgeColor="emerald" />

      <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-3.5">
        {/* Module 1: Subtitles List (Spacious clean vertical list) */}
        <div className="space-y-1.5">
          {/* Simulated Search / Hash Bar */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Search className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
              <span className="font-mono text-[10px] sm:text-[11px] text-gray-300 truncate">
                {s.searchPlaceholder}
              </span>
            </div>
            <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-secondary-500/15 text-secondary-400 border border-secondary-500/30 flex-shrink-0">
              {s.hashExact}
            </span>
          </div>

          {/* Subtitle Items */}
          <div className="space-y-1">
            <div data-demo-row className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 transition-colors gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-sm flex-shrink-0">🇫🇷</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{s.subFr}</p>
                  <p className="text-[10px] text-gray-400 truncate">{s.subFrDesc}</p>
                </div>
              </div>
              <span data-demo-check data-demo-match className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-secondary-500/15 text-secondary-400 border border-secondary-500/30 font-medium flex-shrink-0">
                {s.downloaded}
              </span>
            </div>

            <div data-demo-row className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 transition-colors gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-sm flex-shrink-0">🇫🇷</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{s.subFrForced}</p>
                  <p className="text-[10px] text-gray-400 truncate">{s.subFrForcedDesc}</p>
                </div>
              </div>
              <span data-demo-check data-demo-match className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-secondary-500/15 text-secondary-400 border border-secondary-500/30 font-medium flex-shrink-0">
                {s.downloaded}
              </span>
            </div>

            <div data-demo-row className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 transition-colors gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-sm flex-shrink-0">🇬🇧</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{s.subEn}</p>
                  <p className="text-[10px] text-gray-400 truncate">{s.subEnDesc}</p>
                </div>
              </div>
              <span data-demo-check data-demo-match className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-secondary-500/15 text-secondary-400 border border-secondary-500/30 font-medium flex-shrink-0">
                {s.downloaded}
              </span>
            </div>
          </div>

          <p data-demo-sidecar className="text-[10px] text-gray-400 font-mono truncate pl-1">
            {s.sidecarFile}
          </p>
        </div>

        {/* Module 2: Smart Duplicate Cleaner */}
        <div data-demo-duplicates className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <Layers className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>{s.duplicatesTitle}</span>
          </div>

          <div className="space-y-1 text-xs">
            {/* Best version kept */}
            <div data-demo-kept className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg bg-secondary-500/10 border border-secondary-500/20 text-secondary-300 gap-2">
              <span className="font-mono text-[10px] sm:text-[11px] truncate font-medium">{s.duplicateBest}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-secondary-500/20 px-2 py-0.5 rounded flex-shrink-0">
                {s.duplicateBestTag}
              </span>
            </div>

            {/* Low-res duplicate purged */}
            <div data-demo-duplicate className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/5 text-gray-300 gap-2">
              <span className="font-mono text-[10px] sm:text-[11px] truncate line-through decoration-gray-500">{s.duplicateOld}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-gray-300 flex-shrink-0">
                {s.duplicateOldTag}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div data-demo-result className="pt-1 border-t border-white/10 text-[10px] sm:text-[11px] text-gray-400 font-mono truncate">
          {s.footer}
        </div>
      </div>
    </ProcessDemo>
  );
}
