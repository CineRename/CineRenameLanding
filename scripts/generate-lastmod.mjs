#!/usr/bin/env node
/**
 * Generates lib/lastmod.generated.json: a real "last modified" date for every sitemap path,
 * derived from git history of the page file and the page-specific components it imports.
 * (Header/Footer and other shared layout components are ignored, otherwise every page would
 * look modified whenever the navigation changes.)
 *
 * If git history is unavailable or truncated (e.g. shallow clone in CI, where every file would
 * report the HEAD commit date), the previously committed file is kept as-is.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "lib", "lastmod.generated.json");
const pagesDir = join(root, "app", "[locale]");
const SHARED = new Set(["Header", "Footer", "OptimizedImage"]);

function isShallowRepository() {
  try {
    return (
      execFileSync("git", ["rev-parse", "--is-shallow-repository"], {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() === "true"
    );
  } catch {
    return false;
  }
}

if (isShallowRepository()) {
  console.warn("[lastmod] shallow git clone detected, keeping existing lastmod.generated.json");
  process.exit(0);
}

function gitDate(files) {
  const existing = files.filter((f) => existsSync(join(root, f)));
  if (existing.length === 0) return null;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...existing], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

function componentFiles(pageFile) {
  const src = readFileSync(join(root, pageFile), "utf8");
  const files = [];
  for (const m of src.matchAll(/from\s+["']@\/components\/([A-Za-z0-9_]+)["']/g)) {
    if (SHARED.has(m[1])) continue;
    for (const ext of ["jsx", "tsx"]) {
      const candidate = `components/${m[1]}.${ext}`;
      if (!existsSync(join(root, candidate))) continue;
      files.push(candidate);
      // Wrapper components (e.g. ComparisonPageWithMessages) import the real component via "./X".
      const inner = readFileSync(join(root, candidate), "utf8");
      for (const r of inner.matchAll(/from\s+["']\.\/([A-Za-z0-9_]+)["']/g)) {
        if (SHARED.has(r[1])) continue;
        for (const e2 of ["jsx", "tsx"]) {
          const c2 = `components/${r[1]}.${e2}`;
          if (existsSync(join(root, c2))) files.push(c2);
        }
      }
    }
  }
  return files;
}

const result = {};
const entries = [{ path: "/", file: "app/[locale]/page.tsx" }];
function collectPages(dir, baseRoute = "") {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    if (!item.isDirectory()) continue;
    const subRoute = `${baseRoute}/${item.name}`;
    const pageFile = relative(root, join(dir, item.name, "page.tsx"));
    if (existsSync(join(root, pageFile))) {
      entries.push({ path: subRoute, file: pageFile });
    }
    collectPages(join(dir, item.name), subRoute);
  }
}
collectPages(pagesDir);

for (const { path, file } of entries) {
  const date = gitDate([file, ...componentFiles(file)]);
  if (date) result[path] = date;
}

// Documentation (VitePress) lives outside app/, use the newest change in docs/*.md
const docsDate = gitDate(["docs"]);
if (docsDate) result["/docs/"] = docsDate;

// Home and download pages also change with every published release.
try {
  const latest = JSON.parse(readFileSync(join(root, "public", "releases", "latest.json"), "utf8"));
  if (latest.publishedAt) {
    for (const p of ["/", "/download"]) {
      if (!result[p] || latest.publishedAt > result[p]) result[p] = latest.publishedAt;
    }
  }
} catch {}

if (Object.keys(result).length === 0) {
  console.warn("[lastmod] git history unavailable, keeping existing lastmod.generated.json");
  process.exit(0);
}

const sorted = Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(outFile, JSON.stringify(sorted, null, 2) + "\n");
console.log(`[lastmod] wrote ${Object.keys(sorted).length} entries to lib/lastmod.generated.json`);
