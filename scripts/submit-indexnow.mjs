#!/usr/bin/env node
/**
 * Submits all pages in the sitemap to the IndexNow API (Bing, Yandex, Naver, Seznam).
 * Key hosted at: /fcd185d04e5041e29106f217169f25d5.txt
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const host = "cinerename.app";
const key = "fcd185d04e5041e29106f217169f25d5";
const keyLocation = `https://${host}/${key}.txt`;

// Read the generated lastmod or fetch sitemap to get URL list
const lastmod = JSON.parse(readFileSync(join(root, "lib", "lastmod.generated.json"), "utf8"));
const locales = ["", "/fr", "/es", "/zh"];

const urlList = [];
for (const path of Object.keys(lastmod)) {
  for (const loc of locales) {
    if (path === "/docs/" && loc !== "") continue;
    const full = path === "/" 
      ? `https://${host}${loc}`
      : `https://${host}${loc}${path}`;
    urlList.push(full.replace(/\/$/, ""));
  }
}
// Clean root
urlList[0] = `https://${host}`;

// Include documentation URLs from docs sitemap
const docsSitemapPath = join(root, ".open-next", "assets", "docs", "sitemap.xml");
if (existsSync(docsSitemapPath)) {
  const xml = readFileSync(docsSitemapPath, "utf8");
  const matches = xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g);
  for (const m of matches) {
    urlList.push(m[1].replace(/\/$/, ""));
  }
} else {
  try {
    const res = await fetch(`https://${host}/docs/sitemap.xml`);
    if (res.ok) {
      const xml = await res.text();
      const matches = xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g);
      for (const m of matches) {
        urlList.push(m[1].replace(/\/$/, ""));
      }
    }
  } catch {}
}

const payload = {
  host,
  key,
  keyLocation,
  urlList: [...new Set(urlList)],
};

console.log(`[IndexNow] Submitting ${payload.urlList.length} URLs to api.indexnow.org...`);

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`[IndexNow] Successfully submitted (${res.status} ${res.statusText})`);
  } else {
    console.warn(`[IndexNow] Submission returned ${res.status}:`, await res.text());
  }
} catch (err) {
  console.error("[IndexNow] Error submitting to IndexNow:", err.message);
}
