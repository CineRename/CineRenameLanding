"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Download as DownloadIcon, Monitor, Mail, Package, FileArchive, Store, Terminal, Disc, AppWindow } from "lucide-react";
import { useTranslations } from 'next-intl';
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

const SITE_URL = getSiteUrl();
const RELEASE_INFO_URL = "/releases/latest.json";

function normalizeReleaseInfo(value) {
  if (!value || typeof value !== "object") return null;
  if (!value.version || !value.downloads || typeof value.downloads !== "object") return null;
  return value;
}

const DownloadContent = () => {
  const t = useTranslations('download');
  const tChangelog = useTranslations('changelog');
  const { copyAttributionToClipboard } = useAttribution();

  const [os, setOs] = useState("mac");
  const [releaseInfo, setReleaseInfo] = useState(null);

  useEffect(() => {
    setOs(detectOS());
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(RELEASE_INFO_URL, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (!cancelled) setReleaseInfo(normalizeReleaseInfo(payload));
      })
      .catch(() => {
        if (!cancelled) setReleaseInfo(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDownloadClick = async (platform, downloadLink, format) => {
    await copyAttributionToClipboard();
    trackDownload({
      platform,
      downloadLink: downloadLink || "",
      format: format || "default",
      location: 'download_page'
    });
  };

  const getDownload = (key) => releaseInfo?.downloads?.[key] || null;

  const platformOptions = {
    windows: [
      { label: "Installer (.exe)", downloadKey: "windowsExe", primary: true, icon: <AppWindow className="w-5 h-5 sm:w-4 sm:h-4" /> },
      { label: "Installer (.msi)", downloadKey: "windowsMsi", primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
      { label: "Portable (.zip)", downloadKey: "windowsPortable", primary: false, icon: <FileArchive className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
      { label: "Microsoft Store", link: `#store`, primary: false, icon: <Store className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    ],
    mac: [
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
      { label: "Flathub (Flatpak)", link: `#flatpak`, primary: false, icon: <Package className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
      { label: "Snap Store", link: `#snap`, primary: false, icon: <Store className="w-4 h-4 text-gray-400 group-hover:text-primary-300 transition-colors" /> },
    ]
  };

  const releaseNotes = releaseInfo?.changelog?.items?.length
    ? [releaseInfo.changelog]
    : [tChangelog.raw('v05')];

  if (os === "mobile") {
    return (
      <section
        id="download"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface min-h-screen pt-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 flex justify-center">
            <Monitor className="h-12 w-12 text-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            {t('mobile.desktopOnly')}
          </p>

          <div className="max-w-md mx-auto mt-8 bg-surface-elevated rounded-2xl shadow-lg border border-border p-6">
            <Mail className="h-8 w-8 text-primary-400 mx-auto mb-3" aria-hidden="true" />
            <p className="text-gray-200 font-medium mb-4">
              {t('mobile.sendReminder')}
            </p>
            <a
              href={`mailto:?subject=${encodeURIComponent(t('mobile.emailSubject'))}&body=${encodeURIComponent(t('mobile.emailBody'))}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg"
            >
              <Mail className="h-5 w-5" />
              <span>{t('mobile.emailButton')}</span>
            </a>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-gray-500">
            <p>{t('mobile.orVisit')}</p>
            <code className="bg-surface-elevated px-3 py-1 rounded-lg text-primary-300 font-mono border border-border">
              {SITE_URL.replace(/^https?:\/\//, "")}
            </code>
          </div>
        </div>
      </section>
    );
  }



  return (
    <section
      id="download"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface min-h-screen pt-32"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4 flex justify-center">
          <DownloadIcon className="h-12 w-12 text-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          {t('subtitle')}
        </p>

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
              <h3 className="text-xl font-bold text-foreground mb-4 capitalize">
                {platformKey === "mac" ? "macOS" : platformKey}
                {os === platformKey && (
                  <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded-full">
                    {t('chooseOS').split(' ')[0]} {/* Simple "Your" or indicator */}
                  </span>
                )}
              </h3>
              
              <div className="space-y-3">
                {options.map((opt, idx) => (
                  (() => {
                    const download = opt.downloadKey ? getDownload(opt.downloadKey) : null;
                    const link = download?.url || opt.link || "#";
                    const enabled = Boolean(download?.url);

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
                        <span className={opt.primary ? "text-sm sm:text-base" : "text-sm"}>
                          {opt.label}
                          {!enabled && (
                            <span className="text-xs font-normal opacity-80"> ({t('comingSoon')})</span>
                          )}
                        </span>
                      </a>
                    );
                  })()
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-6">
          {t('githubNote')}
        </p>

        <div className="text-left mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            {tChangelog('title')}
          </h2>

          <div className="relative border-l border-border/60 ml-4 sm:ml-6 md:ml-8 space-y-12">
            {releaseNotes.map((release, i) => (
              <div key={i} className="pl-8 sm:pl-10 relative">
                <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-foreground">{release.version}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20">
                    {release.badge}
                  </span>
                </div>
                <h4 className="text-md font-semibold text-gray-300 mb-4">{release.title}</h4>
                <ul className="space-y-3">
                  {release.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-primary-500 mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const Download = () => {
  return (
    <Suspense fallback={<DownloadFallback />}>
      <DownloadContent />
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
