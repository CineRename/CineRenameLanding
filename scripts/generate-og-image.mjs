#!/usr/bin/env node
/**
 * Generates localized 1200x630 Open Graph / X card images from the app screenshot:
 * public/assets/img/og-image.png (EN) and og-image-{fr,es,zh}.png.
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;
const shotW = 1010;

const VARIANTS = [
  {
    file: "og-image.png",
    subtitle: "Movies · TV shows · Anime · Subtitles — Plex &amp; Jellyfin",
    font: "DejaVu Sans, Arial, Helvetica, sans-serif",
  },
  {
    file: "og-image-fr.png",
    subtitle: "Films · Séries · Animes · Sous-titres — Plex &amp; Jellyfin",
    font: "DejaVu Sans, Arial, Helvetica, sans-serif",
  },
  {
    file: "og-image-es.png",
    subtitle: "Películas · Series · Anime · Subtítulos — Plex y Jellyfin",
    font: "DejaVu Sans, Arial, Helvetica, sans-serif",
  },
  {
    file: "og-image-zh.png",
    subtitle: "电影 · 剧集 · 动漫 · 字幕 — Plex 与 Jellyfin 自动重命名",
    font: "Noto Sans CJK SC, Noto Serif CJK SC, DejaVu Sans, sans-serif",
  },
];

const shot = await sharp(join(root, "public/assets/img/screen-studio.png"))
  .resize({ width: shotW })
  .toBuffer();
const shotMeta = await sharp(shot).metadata();
const shotH = Math.min(shotMeta.height, 400);
const mask = Buffer.from(
  `<svg width="${shotW}" height="${shotH}"><rect width="${shotW}" height="${shotH}" rx="18" fill="#fff"/></svg>`,
);
const rounded = await sharp(shot)
  .extract({ left: 0, top: 0, width: shotW, height: shotH })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

for (const variant of VARIANTS) {
  const background = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="85%" cy="0%" r="70%"><stop offset="0%" stop-color="#F97316" stop-opacity="0.35"/><stop offset="100%" stop-color="#F97316" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0%" cy="100%" r="60%"><stop offset="0%" stop-color="#F59E0B" stop-opacity="0.18"/><stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0A0F1E"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
  <text x="95" y="108" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#F8FAFC">Cine<tspan fill="#F97316">Rename</tspan></text>
  <text x="97" y="150" font-family="${variant.font}" font-size="25" fill="#94A3B8">${variant.subtitle}</text>
</svg>`);

  const outPath = join(root, "public/assets/img", variant.file);
  await sharp(background)
    .composite([{ input: rounded, left: Math.round((W - shotW) / 2), top: H - shotH }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`[og] wrote public/assets/img/${variant.file}`);
}
