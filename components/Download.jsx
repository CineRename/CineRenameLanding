"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Download as DownloadIcon, Monitor, Mail } from "lucide-react";
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

const RELEASES_BASE = "https://github.com/Epikaigle/CineRename/releases/latest/download";
const SITE_URL = getSiteUrl();
const assetLinks = {
  mac: `${RELEASES_BASE}/CineRename.dmg`,
  windows: `${RELEASES_BASE}/CineRename-Setup.exe`,
  linux: `${RELEASES_BASE}/CineRename.AppImage`,
};

const DownloadContent = () => {
  const t = useTranslations('download');
  const { copyAttributionToClipboard } = useAttribution();

  const [os, setOs] = useState("mac");
  useEffect(() => {
    setOs(detectOS());
  }, []);

  const handleDownloadClick = async (platform) => {
    await copyAttributionToClipboard();
    trackDownload({
      platform,
      downloadLink: assetLinks[platform] || "",
      location: 'download_page'
    });
  };

  const primaryHref =
    os === "mac" ? assetLinks.mac : os === "windows" ? assetLinks.windows : os === "linux" ? assetLinks.linux : "#";
  const primaryLabel =
    os === "mac" ? t('macOS') : os === "windows" ? t('windows') : os === "linux" ? t('linux') : t('chooseOS');

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
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
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

  const otherPlatforms = ["mac", "windows", "linux"].filter((p) => p !== os);
  const labels = { mac: t('buttons.macOS'), windows: t('buttons.windows'), linux: t('buttons.linux') };

  return (
    <section
      id="download"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface min-h-screen pt-32"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4 flex justify-center">
          <DownloadIcon className="h-12 w-12 text-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primaryHref}
            onClick={() => handleDownloadClick(os)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg"
          >
            <DownloadIcon className="h-5 w-5" />
            <span>{primaryLabel}</span>
          </a>

          <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap justify-center">
            <span className="hidden sm:inline">{t('otherPlatform')}</span>
            {otherPlatforms.map((platform, idx) => (
              <React.Fragment key={platform}>
                {idx > 0 && <span>·</span>}
                <a
                  href={assetLinks[platform]}
                  onClick={() => handleDownloadClick(platform)}
                  className="underline hover:no-underline hover:text-primary-300"
                >
                  {labels[platform]}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          {t('githubNote')}
        </p>
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
