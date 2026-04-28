import posthog from "posthog-js";

export interface DownloadTrackingParams {
  platform: 'mac' | 'windows' | 'linux';
  downloadLink: string;
  location?: string;
}

export const trackDownload = ({
  platform,
  downloadLink,
  location = 'download_page',
}: DownloadTrackingParams): void => {
  if (typeof posthog !== 'undefined' && posthog.__loaded) {
    posthog.capture('download_clicked', {
      platform,
      download_link: downloadLink,
      location,
      $set: {
        last_download_platform: platform,
        last_download_date: new Date().toISOString(),
      },
    });
  }
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
): void => {
  if (typeof posthog !== 'undefined' && posthog.__loaded) {
    posthog.capture(eventName, params);
  }
};
