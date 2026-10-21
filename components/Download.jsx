"use client";
import React, { useEffect, useState, Suspense } from "react";
import {
  Download as DownloadIcon,
  Mail,
  Package,
  FileArchive,
  Store,
  Terminal,
  Disc,
  AppWindow,
  ShieldAlert,
  KeyRound,
  Check,
  Copy,
  X,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackDownload } from '@/lib/tracking';
import { useAttribution } from '@/hooks/useAttribution';
import { getSiteUrl } from '@/lib/site';

function detectOS() {
  if (typeof window === 'undefined') return "mac";
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(ua)) return "mobile";
  if (/iPhone|iPad|iPod/i.test(ua)) return "mobile";
  if (/windows phone/i.test(ua)) return "mobile";
  if (/win/i.test(ua)) return "windows";
  if (/macintosh|mac os x/i.test(ua)) return "mac";
  if (/linux/i.test(ua)) return "linux";
  return "unknown";
}

async function detectMacArch() {
  if (typeof window === "undefined") return "arm64";

  // 1. Client Hints (Chromium: Chrome, Edge, Brave, Arc, Opera)
  try {
    if (navigator.userAgentData?.getHighEntropyValues) {
      const hints = await navigator.userAgentData.getHighEntropyValues(["architecture"]);
      if (hints?.architecture === "x86") return "x64";
      if (hints?.architecture === "arm") return "arm64";
    }
  } catch {}

  // 2. WebGL unmasked renderer detection (Safari, Firefox, Chrome)
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (ext) {
        const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "";
        // Intel, AMD or Nvidia GPUs identify Intel Macs
        if (/Intel|AMD|Radeon|Nvidia|GeForce/i.test(renderer)) {
          return "x64";
        }
        // Apple M1/M2/M3/M4 or Apple GPU identify Apple Silicon
        if (/Apple/i.test(renderer)) {
          return "arm64";
        }
      }
    }
  } catch {}

  return "arm64";
}

const SITE_URL = getSiteUrl();
const RELEASE_INFO_URL = "/releases/latest.json";

function normalizeReleaseInfo(value) {
  if (!value || typeof value !== "object") return null;
  if (!value.version || !value.downloads || typeof value.downloads !== "object") return null;
  return value;
}

function localizedReleaseHistory(releaseInfo, locale) {
  const localizedHistory = releaseInfo?.localizedHistory;
  if (localizedHistory && typeof localizedHistory === "object") {
    const candidates = [locale, locale?.split("-")?.[0], "en"].filter(Boolean);

    for (const candidate of candidates) {
      if (Array.isArray(localizedHistory[candidate]) && localizedHistory[candidate].length > 0) {
        return localizedHistory[candidate];
      }
    }
  }

  return Array.isArray(releaseInfo?.history) ? releaseInfo.history : [];
}

function localizedReleaseChangelog(releaseInfo, locale) {
  const localizedChangelog = releaseInfo?.localizedChangelog;
  if (localizedChangelog && typeof localizedChangelog === "object") {
    const candidates = [locale, locale?.split("-")?.[0], "en"].filter(Boolean);

    for (const candidate of candidates) {
      if (localizedChangelog[candidate]?.items?.length) {
        return localizedChangelog[candidate];
      }
    }
  }

  return releaseInfo?.changelog?.items?.length ? releaseInfo.changelog : null;
}

function renderReleaseNote(item) {
  return item.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="text-gray-300">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-semibold text-gray-300">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * @param {{ initialReleaseInfo?: unknown }} props
 */
const DownloadContent = ({ initialReleaseInfo = null }) => {
  const t = useTranslations('download');
  const tChangelog = useTranslations('changelog');
  const locale = useLocale();
  const { copyAttributionToClipboard } = useAttribution();
  const normalizedInitialReleaseInfo = normalizeReleaseInfo(initialReleaseInfo);

  const [os, setOs] = useState("mac");
  const [macArch, setMacArch] = useState("arm64");
  const [showMacModal, setShowMacModal] = useState(false);
  const [copiedTerminal, setCopiedTerminal] = useState(false);
  const [releaseInfo, setReleaseInfo] = useState(() => normalizedInitialReleaseInfo);
  const [releaseInfoLoaded, setReleaseInfoLoaded] = useState(() => Boolean(normalizedInitialReleaseInfo));

  useEffect(() => {
    setOs(detectOS());
    detectMacArch().then((arch) => {
      if (arch) setMacArch(arch);
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(RELEASE_INFO_URL, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (!cancelled) {
          setReleaseInfo(normalizeReleaseInfo(payload) || normalizedInitialReleaseInfo);
          setReleaseInfoLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReleaseInfo((current) => current || normalizedInitialReleaseInfo);
          setReleaseInfoLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [normalizedInitialReleaseInfo]);

  const handleDownloadClick = async (platform, downloadLink, format) => {
    await copyAttributionToClipboard();
    trackDownload({
      platform,
      downloadLink: downloadLink || "",
      format: format || "default",
      location: 'download_page'
    });

    if (platform === "mac") {
      setShowMacModal(true);
    }
  };

  const getDownload = (key) => releaseInfo?.downloads?.[key] || null;
  const hasReleaseDownloads = Object.keys(releaseInfo?.downloads || {}).length > 0;

  const renderDownloadOption = (platformKey, opt, idx) => {
    const download = opt.downloadKey ? getDownload(opt.downloadKey) : null;
    const link = download?.url || opt.link || "#";
    const enabled = Boolean(download?.url || opt.enabledLink);

    return (
      <a
        key={idx}
        href={enabled ? link : "#"}
        onClick={(event) => {
          if (!enabled) {
            event.preventDefault();
            return;
          }
          handleDownloadClick(platformKey, link, opt.downloadKey || opt.label);
        }}
        className={`group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
          enabled
            ? "hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
            : "opacity-60 cursor-not-allowed"
        } ${
          opt.primary
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground shadow-md'
            : 'bg-surface border border-border text-gray-400'
        }`}
        title={enabled ? opt.label : t('comingSoon')}
      >
        {opt.icon}
        <span className={opt.primary ? "text-sm sm:text-base flex items-center justify-center gap-1.5 flex-wrap" : "text-sm flex items-center justify-center gap-1.5 flex-wrap"}>
          <span>{opt.label}</span>
          {opt.badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/30 text-white border border-white/20 whitespace-nowrap">
              {opt.badge}
            </span>
          )}
          {!enabled && (
            <span className="text-xs font-normal opacity-80"> ({t('comingSoon')})</span>
          )}
        </span>
      </a>
    );
  };

  const platformOptions = {
    windows: [
      { label: "Installer (.exe)", downloadKey: "windowsExe", primary: true, icon: <AppWindow className="w-5 h-5 sm:w-4 sm:h-4" /> },
      { label: "Installer (.msi)", downloadKey: "windowsMsi", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
      { label: "Portable (.zip)", downloadKey: "windowsPortable", primary: false, icon: <FileArchive className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
      { label: "Microsoft Store", link: "https://apps.microsoft.com/detail/9N7JL6NXFVGW", enabledLink: true, primary: false, icon: <Store className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    ],
    mac: macArch === "x64"
      ? [
          { label: "Intel (.dmg)", downloadKey: "macX64Dmg", primary: true, icon: <Disc className="w-5 h-5 sm:w-4 sm:h-4" /> },
          { label: "Apple Silicon (.dmg)", downloadKey: "macArmDmg", primary: false, icon: <Disc className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
          { label: "Intel (.pkg)", downloadKey: "macX64Pkg", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
          { label: "Apple Silicon (.pkg)", downloadKey: "macArmPkg", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
          { label: "Mac App Store", link: `#appstore`, primary: false, icon: <Store className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
          { label: "Homebrew", link: `#brew`, primary: false, icon: <Terminal className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
        ]
      : [
          { label: "Apple Silicon (.dmg)", downloadKey: "macArmDmg", primary: true, icon: <Disc className="w-5 h-5 sm:w-4 sm:h-4" /> },
          { label: "Intel (.dmg)", downloadKey: "macX64Dmg", primary: false, icon: <Disc className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
          { label: "Apple Silicon (.pkg)", downloadKey: "macArmPkg", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
          { label: "Intel (.pkg)", downloadKey: "macX64Pkg", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
          { label: "Mac App Store", link: `#appstore`, primary: false, icon: <Store className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
          { label: "Homebrew", link: `#brew`, primary: false, icon: <Terminal className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
        ],
    linux: [
      { label: "AppImage x64", downloadKey: "linuxAppImage", primary: true, icon: <Package className="w-5 h-5 sm:w-4 sm:h-4" /> },
      { label: "Debian / Ubuntu (.deb)", downloadKey: "linuxDeb", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
      { label: "Fedora / openSUSE (.rpm)", downloadKey: "linuxRpm", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
      { label: "Portable POSIX (.tar.xz)", downloadKey: "posixPortable", primary: false, icon: <FileArchive className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
      { label: "Snap Store", link: `https://snapcraft.io/cinerename`, enabledLink: true, primary: false, icon: <Store className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    ]
  };

  const advancedOptions = [
    { label: "NAS Linux x64 (.tar.xz)", downloadKey: "nasX64", primary: false, icon: <Terminal className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    { label: "NAS Linux ARM64 (.tar.xz)", downloadKey: "nasArm64", primary: false, icon: <Terminal className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    { label: "Docker x64 (.tar.gz)", downloadKey: "dockerX64", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    { label: "Docker ARM64 (.tar.gz)", downloadKey: "dockerArm64", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    { label: "macOS Apple Silicon app (.tar.gz)", downloadKey: "macArmAppArchive", primary: false, icon: <FileArchive className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    { label: "macOS Intel app (.tar.gz)", downloadKey: "macX64AppArchive", primary: false, icon: <FileArchive className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    { label: t('advancedSection.allFiles'), link: releaseInfo?.releaseUrl, enabledLink: Boolean(releaseInfo?.releaseUrl && hasReleaseDownloads), primary: false, icon: <FileArchive className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
  ];

  const releaseHistory = localizedReleaseHistory(releaseInfo, locale);
  const releaseChangelog = localizedReleaseChangelog(releaseInfo, locale);
  const releaseNotes = !releaseInfoLoaded
    ? []
    : releaseHistory.length
      ? releaseHistory
      : releaseChangelog
        ? [releaseChangelog]
        : [tChangelog.raw('v05')];

  return (
    <section
      id="download"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface min-h-screen pt-32"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Visible Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary-300 transition-colors">
                {locale === "fr" ? "Accueil" : locale === "es" ? "Inicio" : locale === "zh" ? "首页" : "Home"}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-600">/</li>
            <li className="text-primary-400 font-medium" aria-current="page">
              {t('title')}
            </li>
          </ol>
        </nav>

        <div className="mb-4 flex justify-center">
          <DownloadIcon className="h-12 w-12 text-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          {t('subtitle')}
        </p>

        {os === "mobile" && (
          <div className="max-w-md mx-auto mb-12 bg-surface-elevated rounded-2xl shadow-lg border border-primary-500/30 p-6 text-center">
            <Mail className="h-8 w-8 text-primary-400 mx-auto mb-3" aria-hidden="true" />
            <p className="text-gray-200 font-medium mb-2">
              {t('mobile.desktopOnly')}
            </p>
            <p className="text-gray-400 text-sm mb-4">
              {t('mobile.sendReminder')}
            </p>
            <a
              href={`mailto:?subject=${encodeURIComponent(t('mobile.emailSubject'))}&body=${encodeURIComponent(t('mobile.emailBody'))}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg text-sm"
            >
              <Mail className="h-4 w-4" />
              <span>{t('mobile.emailButton')}</span>
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {Object.entries(platformOptions).map(([platformKey, options]) => (
            <div
              key={platformKey}
              className={`p-6 rounded-2xl border transition-all ${
                os === platformKey
                  ? 'border-primary-500 bg-primary-500/5 shadow-lg shadow-primary-500/10'
                  : 'border-border bg-surface-elevated'
              }`}
            >
              <h2 className="text-xl font-bold text-foreground mb-4 capitalize">
                {platformKey === "mac" ? "macOS" : platformKey}
                {os === platformKey && (
                  <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded-full">
                    {t('chooseOS').split(' ')[0]} {/* Simple "Your" or indicator */}
                  </span>
                )}
              </h2>
              
              <div className="space-y-3">
                {options.map((opt, idx) => (
                  renderDownloadOption(platformKey, opt, idx)
                ))}
              </div>

              {platformKey === "mac" && (
                <button
                  type="button"
                  onClick={() => setShowMacModal(true)}
                  className="mt-4 pt-3 border-t border-border/40 text-xs flex items-center justify-center gap-1.5 text-primary-400 hover:text-primary-300 transition-colors w-full text-center group cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:underline">{t('macFirstLaunchTip')}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-6 text-left border border-border bg-surface-elevated rounded-2xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {t('advancedSection.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {advancedOptions.map((opt, idx) => renderDownloadOption("advanced", opt, idx))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          {t('githubNote')}
        </p>

        <div className="text-left mt-20 max-w-3xl mx-auto">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
            {tChangelog('title')}
          </h2>

          <div className="relative border-l border-border/60 ml-4 sm:ml-6 md:ml-8 space-y-12">
            {!releaseInfoLoaded ? (
              <div className="pl-8 sm:pl-10 relative" aria-hidden="true">
                <div className="absolute w-3 h-3 bg-primary-500/30 rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-6 w-24 rounded bg-surface-elevated animate-pulse" />
                  <div className="h-5 w-28 rounded-full bg-surface-elevated animate-pulse" />
                </div>
                <div className="h-5 w-52 rounded bg-surface-elevated animate-pulse mb-5" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-surface-elevated animate-pulse" />
                  <div className="h-4 w-5/6 rounded bg-surface-elevated animate-pulse" />
                  <div className="h-4 w-4/6 rounded bg-surface-elevated animate-pulse" />
                </div>
              </div>
            ) : (
              releaseNotes.map((release, i) => (
                <div key={release.version || i} className="pl-8 sm:pl-10 relative">
                  <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
                    <h3 className="text-xl font-bold text-foreground">{releaseInfo?.productName || "CineRename"} {release.version}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20">
                      {release.badge}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {release.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-primary-500 mt-0.5" aria-hidden="true">✦</span>
                        <span className="min-w-0 break-words">{renderReleaseNote(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {showMacModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 text-left max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowMacModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-surface-elevated cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-400 border border-primary-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                {t('macModal.badge')}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              {t('macModal.title')}
            </h3>

            <p className="text-sm text-gray-300 mb-5 leading-relaxed">
              {t('macModal.subtitle')}
            </p>

            <div className="space-y-4">
              {/* Étape 1: Gatekeeper */}
              <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2.5">
                <div className="flex items-center gap-2 text-primary-400 font-semibold text-sm">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <h4>{t('macModal.step1Title')}</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t('macModal.step1Text')}
                </p>
                <ol className="text-xs text-gray-400 space-y-1.5 list-decimal list-inside pl-1 leading-relaxed">
                  <li>{t('macModal.step1Sub1')}</li>
                  <li>{t('macModal.step1Sub2')}</li>
                  <li>{t('macModal.step1Sub3')}</li>
                </ol>

                <div className="pt-2 border-t border-border/50">
                  <p className="text-[11px] text-gray-400 mb-1.5 font-medium">
                    {t('macModal.step1Terminal')}
                  </p>
                  <div className="flex items-center justify-between gap-2 bg-black/40 border border-border/60 rounded-lg px-3 py-2 font-mono text-[11px] text-primary-300">
                    <span className="select-all break-all">xattr -cr /Applications/CineRename.app</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText("xattr -cr /Applications/CineRename.app");
                        setCopiedTerminal(true);
                        setTimeout(() => setCopiedTerminal(false), 2000);
                      }}
                      className="text-xs font-sans text-gray-300 hover:text-white flex items-center gap-1 shrink-0 px-2.5 py-1 rounded bg-surface hover:bg-surface-elevated transition-colors border border-border/60 cursor-pointer"
                    >
                      {copiedTerminal ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">{t('macModal.copiedCmd')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t('macModal.copyCmd')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Étape 2: Trousseau / Keychain */}
              <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2">
                <div className="flex items-center gap-2 text-primary-400 font-semibold text-sm">
                  <KeyRound className="w-4 h-4 shrink-0" />
                  <h4>{t('macModal.step2Title')}</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t('macModal.step2Text')}
                </p>
                <ul className="text-xs text-gray-400 space-y-1.5 list-disc list-inside pl-1 leading-relaxed">
                  <li>{t('macModal.step2Sub1')}</li>
                  <li>
                    <strong className="text-foreground">{t('macModal.step2Sub2')}</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowMacModal(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-primary-foreground shadow-md transition-all text-sm cursor-pointer"
              >
                {t('macModal.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/**
 * @param {{ initialReleaseInfo?: unknown }} props
 */
const Download = ({ initialReleaseInfo = null }) => {
  return (
    <Suspense fallback={<DownloadFallback />}>
      <DownloadContent initialReleaseInfo={initialReleaseInfo} />
    </Suspense>
  );
};

const DownloadFallback = () => {
  return (
    <section
      id="download"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface min-h-screen pt-32"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4 flex justify-center">
          <DownloadIcon className="h-12 w-12 text-foreground" aria-hidden="true" />
        </div>
        <div className="h-10 bg-surface-elevated rounded w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-6 bg-surface-elevated rounded w-96 mx-auto mb-8 animate-pulse" />
        <div className="flex justify-center">
          <div className="h-14 bg-surface-elevated rounded-xl w-48 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Download;
