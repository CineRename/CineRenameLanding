#!/usr/bin/env node
/**
 * Generates public/assets/img/og-image.png (1200x630, the recommended Open Graph / X card ratio)
 * from the app screenshot, so social cards are never cropped. Latin-only wordmark on purpose:
 * the same image is shared by every locale.
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;
const shotW = 1010;

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
  <text x="97" y="150" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="26" fill="#94A3B8">Movies · TV shows · Anime · Subtitles</text>
</svg>`);

await sharp(background)
  .composite([{ input: rounded, left: Math.round((W - shotW) / 2), top: H - shotH }])
  .png({ compressionLevel: 9 })
  .toFile(join(root, "public/assets/img/og-image.png"));
console.log("[og] wrote public/assets/img/og-image.png");
