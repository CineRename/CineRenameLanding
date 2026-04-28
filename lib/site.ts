export const DEFAULT_SITE_URL =
  "https://cinerenamelanding.epikaigle444.workers.dev";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
}
