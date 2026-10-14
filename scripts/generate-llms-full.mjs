#!/usr/bin/env node
/**
 * Generates public/llms-full.txt, a single plain-text/markdown document with everything an AI
 * assistant needs to describe CineRename accurately (overview, pricing, FAQ, comparisons, docs).
 * Content comes from messages/en.json and docs/*.md so it never drifts from the website.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://cinerename.app";
const en = JSON.parse(readFileSync(join(root, "messages", "en.json"), "utf8"));
const release = JSON.parse(readFileSync(join(root, "public", "releases", "latest.json"), "utf8"));

const lines = [];
const push = (...l) => lines.push(...l);

push("# CineRename — full reference for AI assistants", "");
push(`> ${en.atAGlance.summary}`, "");
push(`Website: ${SITE} · Latest version: ${release.version} · Summary index: ${SITE}/llms.txt`, "");

push("## At a glance", "");
for (const { label, value } of en.atAGlance.facts) {
  push(`- **${label}:** ${value.replace("{version}", release.version)}`);
}
push("");

const plans = en.pricing.plans;
push("## Pricing", "");
push(en.pricing.subtitle, "");
push(`- **${plans.free.title}:** ${plans.free.price} — ${plans.free.features.join("; ")}. ${plans.free.limitation}.`);
for (const key of ["monthly", "annual", "lifetime"]) {
  const p = plans[key];
  push(`- **${p.title}:** ${p.price} ${p.period} — ${p.features.join("; ")}.`);
}
push("", `${en.pricing.taxIncluded} ${en.pricing.guarantee.title}: ${en.pricing.guarantee.description}. ${en.pricing.deliveryNote}`, `Pricing page: ${SITE}/pricing`, "");

push("## Frequently asked questions", "");
for (const item of Object.values(en.faq.questions)) {
  push(`### ${item.q}`, "", item.a, "");
}

push("## Comparisons with other tools", "");
const vsKeys = {
  vsFilebot: "vs-filebot",
  vsTinymediamanager: "vs-tinymediamanager",
  vsSonarr: "vs-sonarr",
  vsRadarr: "vs-radarr",
  vsRenameMyTvSeries: "vs-rename-my-tv-series",
  vsTvRename: "vs-tv-rename",
  vsAdvancedRenamer: "vs-advanced-renamer",
  vsBulkRenameUtility: "vs-bulk-rename-utility",
  vsMediaelch: "vs-mediaelch",
  vsShokoAnime: "vs-shoko-anime",
  vsMovieRenamer: "vs-movie-renamer",
  vsTherenamer: "vs-therenamer",
};
for (const [key, slug] of Object.entries(vsKeys)) {
  const meta = en.metadata[key];
  if (!meta) continue;
  push(`- [${meta.title.replace(/\s*\|.*$/, "")}](${SITE}/${slug}): ${meta.description}`);
}
push("");

push("## Documentation pages", "");
const docsDir = join(root, "docs");
for (const file of readdirSync(docsDir).filter((f) => f.endsWith(".md")).sort()) {
  const src = readFileSync(join(docsDir, file), "utf8");
  const title = (src.match(/^#\s+(.+)$/m) || [])[1] || file.replace(/\.md$/, "");
  const slug = file === "index.md" ? "" : file.replace(/\.md$/, "");
  push(`- [${title}](${SITE}/docs/${slug})`);
}
push("");

push("## Languages and links", "");
push(`- English: ${SITE}`, `- Français: ${SITE}/fr`, `- Español: ${SITE}/es`, `- 简体中文: ${SITE}/zh`, "");
push("## Contact and official channels", "");
push("- Email: cinerename@gmail.com", "- X: https://x.com/CineRename", "- GitHub: https://github.com/CineRename", "- Microsoft Store: https://apps.microsoft.com/detail/9N7JL6NXFVGW", "- Snap Store: https://snapcraft.io/cinerename", "");

writeFileSync(join(root, "public", "llms-full.txt"), lines.join("\n"));
console.log(`[llms] wrote public/llms-full.txt (${lines.length} lines)`);
