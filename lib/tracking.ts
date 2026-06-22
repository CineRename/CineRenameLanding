export interface DownloadTrackingParams {
  platform: "mac" | "windows" | "linux";
  downloadLink: string;
  location?: string;
  format?: string;
}

type TrackingParams = Record<string, string | number | boolean | Record<string, string>>;

type PostHogClient = {
  __loaded?: boolean;
  capture: (eventName: string, properties?: TrackingParams) => void;
};

type PostHogRuntimeConfig = {
  key?: string;
  host?: string;
  initialized?: boolean;
  loading?: Promise<PostHogClient | null>;
};

declare global {
  interface Window {
    __CINERENAME_POSTHOG__?: PostHogRuntimeConfig;
  }
}

const getRuntimeConfig = (): PostHogRuntimeConfig | null => {
  if (typeof window === "undefined") return null;
  return window.__CINERENAME_POSTHOG__ ?? null;
};

export const configurePostHog = (
  key?: string | null,
  host?: string | null
): void => {
  if (typeof window === "undefined") return;
  const apiKey = key?.trim();
  if (!apiKey) return;

  window.__CINERENAME_POSTHOG__ = {
    ...(window.__CINERENAME_POSTHOG__ ?? {}),
    key: apiKey,
    host: host?.trim() || "https://us.i.posthog.com",
  };
};

export const loadPostHog = async (): Promise<PostHogClient | null> => {
  const config = getRuntimeConfig();
  if (!config?.key) return null;
  if (config.loading) return config.loading;

  config.loading = import("posthog-js")
    .then((mod) => {
      const client = (mod.default ?? mod) as PostHogClient & {
        init?: (key: string, options: Record<string, unknown>) => void;
      };

      if (!config.initialized && !client.__loaded && client.init) {
        client.init(config.key as string, {
          api_host: config.host || "https://us.i.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: true,
          capture_pageleave: false,
          autocapture: false,
          rageclick: false,
          disable_session_recording: true,
          disable_surveys: true,
          disable_surveys_automatic_display: true,
          disable_product_tours: true,
          capture_performance: false,
          advanced_disable_flags: true,
          persistence: "localStorage",
        });
        config.initialized = true;
      }

      return client;
    })
    .catch(() => null);

  return config.loading;
};

const captureWhenReady = (eventName: string, params?: TrackingParams): void => {
  if (typeof window === "undefined") return;

  void loadPostHog().then((client) => {
    if (client?.__loaded) {
      client.capture(eventName, params);
    }
  });
};

export const trackDownload = ({
  platform,
  downloadLink,
  location = "download_page",
  format = "default",
}: DownloadTrackingParams): void => {
  captureWhenReady("download_clicked", {
    platform,
    format,
    download_link: downloadLink,
    location,
    $set: {
      last_download_platform: platform,
      last_download_format: format,
      last_download_date: new Date().toISOString(),
    },
  });
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
): void => {
  captureWhenReady(eventName, params);
};
