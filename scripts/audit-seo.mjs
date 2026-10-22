import { parseArgs } from 'node:util';

const BASE_URL = 'https://cinerename.app';

async function fetchXml(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return await res.text();
}

function extractUrlsFromSitemap(xml) {
  const urls = [];
  const regex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function extractHeadings(html) {
  const headings = [];
  const regex = /<(h[1-6])(?:\s+[^>]*)?>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1].substring(1), 10);
    const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    headings.push({ tag: match[1].toLowerCase(), level, text });
  }
  return headings;
}

function extractImages(html) {
  const images = [];
  const regex = /<img\s+([^>]*)\/?>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const attrs = match[1];
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    images.push({
      src: srcMatch ? srcMatch[1] : null,
      alt: altMatch ? altMatch[1] : null,
      raw: match[0],
    });
  }
  return images;
}

function extractMeta(html) {
  const meta = {};
  const metaRegex = /<meta\s+([^>]*)\/?>/gi;
  let match;
  while ((match = metaRegex.exec(html)) !== null) {
    const attrs = match[1];
    const nameMatch = attrs.match(/(?:name|property)=["']([^"']+)["']/i);
    const contentMatch = attrs.match(/content=["']([^"']*)["']/i);
    if (nameMatch && contentMatch) {
      meta[nameMatch[1].toLowerCase()] = contentMatch[1];
    }
  }

  const titleMatch = html.match(/<title(?:\s+[^>]*)?>([\s\S]*?)<\/title>/i);
  meta.title = titleMatch ? titleMatch[1].trim() : null;

  const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*\/?>/i)
    || html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*\/?>/i);
  meta.canonical = canonicalMatch ? canonicalMatch[1] : null;

  const hreflangs = [];
  const altRegex = /<link\s+[^>]*rel=["']alternate["'][^>]*\/?>/gi;
  let altMatch;
  while ((altMatch = altRegex.exec(html)) !== null) {
    const tag = altMatch[0];
    const hMatch = tag.match(/hreflang=["']([^"']+)["']/i);
    const uMatch = tag.match(/href=["']([^"']+)["']/i);
    if (hMatch && uMatch) {
      hreflangs.push({ lang: hMatch[1], href: uMatch[1] });
    }
  }
  meta.hreflangs = hreflangs;

  const jsonLd = [];
  const scriptRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let sMatch;
  while ((sMatch = scriptRegex.exec(html)) !== null) {
    try {
      jsonLd.push(JSON.parse(sMatch[1]));
    } catch (e) {
      jsonLd.push({ error: e.message, raw: sMatch[1].substring(0, 100) });
    }
  }
  meta.jsonLd = jsonLd;

  return meta;
}

async function auditUrl(url) {
  const issues = [];
  const warnings = [];

  let html;
  let status;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    status = res.status;
    if (status >= 300 && status < 400) {
      return {
        url,
        status,
        redirect: res.headers.get('location'),
        issues: [`Redirected with ${status} to ${res.headers.get('location')}`],
        warnings: [],
      };
    }
    if (status !== 200) {
      return { url, status, issues: [`HTTP status ${status}`], warnings: [] };
    }
    html = await res.text();
  } catch (err) {
    return { url, status: 0, issues: [`Fetch failed: ${err.message}`], warnings: [] };
  }

  const meta = extractMeta(html);
  const headings = extractHeadings(html);
  const images = extractImages(html);

  // 1. Title
  if (!meta.title) {
    issues.push('Missing <title>');
  } else {
    if (meta.title.length < 20) warnings.push(`Short title (${meta.title.length} chars): "${meta.title}"`);
    if (meta.title.length > 70) warnings.push(`Long title (${meta.title.length} chars): "${meta.title}"`);
    if (/\|\s*CineRename\s*\|\s*CineRename/i.test(meta.title)) {
      issues.push(`Duplicate brand in title: "${meta.title}"`);
    }
  }

  // 2. Meta description
  const desc = meta.description;
  if (!desc) {
    issues.push('Missing meta description');
  } else {
    if (desc.length < 60) warnings.push(`Short meta description (${desc.length} chars): "${desc}"`);
    if (desc.length > 170) warnings.push(`Long meta description (${desc.length} chars): "${desc}"`);
  }

  // 3. Canonical
  if (!meta.canonical) {
    issues.push('Missing rel="canonical"');
  } else {
    // Check if canonical matches url (ignoring trailing slash difference if any)
    const normUrl = url.replace(/\/$/, '');
    const normCan = meta.canonical.replace(/\/$/, '');
    if (normUrl !== normCan) {
      warnings.push(`Canonical mismatch: page is ${url}, canonical is ${meta.canonical}`);
    }
  }

  // 4. Hreflang
  if (url.includes('/docs/')) {
    // Docs pages have their own hreflangs
    const langs = meta.hreflangs.map((h) => h.lang);
    if (!langs.includes('en') || !langs.includes('fr')) {
      warnings.push(`Incomplete docs hreflangs: found [${langs.join(', ')}]`);
    }
  } else {
    const langs = meta.hreflangs.map((h) => h.lang);
    const expected = ['en', 'fr', 'es', 'zh', 'x-default'];
    const missing = expected.filter((l) => !langs.includes(l));
    if (missing.length > 0) {
      issues.push(`Missing hreflangs: [${missing.join(', ')}]`);
    }
  }

  // 5. Headings
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) {
    issues.push('Missing <h1> heading');
  } else if (h1s.length > 1) {
    issues.push(`Multiple <h1> headings (${h1s.length}): ${h1s.map((h) => `"${h.text}"`).join(', ')}`);
  }

  // Check skips
  let prevLevel = 0;
  for (const h of headings) {
    if (prevLevel > 0 && h.level > prevLevel + 1) {
      warnings.push(`Skipped heading level: H${prevLevel} -> H${h.level} ("${h.text}")`);
    }
    prevLevel = h.level;
  }

  // 6. OpenGraph & Twitter
  if (!meta['og:title']) warnings.push('Missing og:title');
  if (!meta['og:description']) warnings.push('Missing og:description');
  if (!meta['og:image']) warnings.push('Missing og:image');
  if (!meta['twitter:card']) warnings.push('Missing twitter:card');
  if (!meta['twitter:site']) warnings.push('Missing twitter:site');

  // 7. Structured Data
  if (meta.jsonLd.length === 0) {
    warnings.push('No JSON-LD structured data found');
  } else {
    for (const ld of meta.jsonLd) {
      if (ld.error) {
        issues.push(`JSON-LD syntax error: ${ld.error}`);
      }
    }
  }

  // 8. Images
  for (const img of images) {
    if (img.alt === null || img.alt === undefined || img.alt.trim() === '') {
      warnings.push(`Image missing alt attribute: ${img.src || img.raw}`);
    }
  }

  return {
    url,
    status,
    title: meta.title,
    headingsCount: headings.length,
    h1: h1s[0]?.text || null,
    jsonLdTypes: meta.jsonLd.map((ld) => ld['@type']).filter(Boolean),
    issues,
    warnings,
  };
}

async function run() {
  console.log('--- Starting Comprehensive Live SEO Audit ---');

  // Fetch Main Sitemap
  console.log('Fetching main sitemap.xml...');
  const mainSitemapXml = await fetchXml(`${BASE_URL}/sitemap.xml`);
  const mainUrls = extractUrlsFromSitemap(mainSitemapXml);
  console.log(`Found ${mainUrls.length} URLs in main sitemap.xml`);

  // Fetch Docs Sitemap
  console.log('Fetching docs sitemap.xml...');
  let docsUrls = [];
  try {
    const docsSitemapXml = await fetchXml(`${BASE_URL}/docs/sitemap.xml`);
    docsUrls = extractUrlsFromSitemap(docsSitemapXml);
    console.log(`Found ${docsUrls.length} URLs in docs/sitemap.xml`);
  } catch (e) {
    console.error('Failed to fetch docs sitemap:', e.message);
  }

  const allUrls = [...mainUrls, ...docsUrls];
  console.log(`Auditing total ${allUrls.length} URLs...\n`);

  // We audit all main URLs and a representative sample of docs URLs, or all URLs
  // Let's audit all main URLs (88 URLs) and docs URLs
  let totalIssues = 0;
  let totalWarnings = 0;
  const issueReports = [];
  const warningReports = [];

  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i];
    process.stdout.write(`[${i + 1}/${allUrls.length}] Auditing ${url.replace(BASE_URL, '')}... `);
    const result = await auditUrl(url);

    if (result.issues.length > 0) {
      console.log(`❌ ${result.issues.length} issue(s)`);
      totalIssues += result.issues.length;
      issueReports.push(result);
    } else if (result.warnings.length > 0) {
      console.log(`⚠️ ${result.warnings.length} warning(s)`);
      totalWarnings += result.warnings.length;
      warningReports.push(result);
    } else {
      console.log(`✅ OK (H1: "${result.h1?.substring(0, 30)}...")`);
    }
  }

  console.log('\n========================================');
  console.log('AUDIT SUMMARY');
  console.log('========================================');
  console.log(`Total URLs checked: ${allUrls.length}`);
  console.log(`Total Critical Issues: ${totalIssues}`);
  console.log(`Total Warnings: ${totalWarnings}`);

  if (issueReports.length > 0) {
    console.log('\n❌ CRITICAL ISSUES:');
    for (const r of issueReports) {
      console.log(`- ${r.url}:`);
      for (const iss of r.issues) console.log(`    * ${iss}`);
    }
  }

  if (warningReports.length > 0) {
    console.log('\n⚠️ WARNINGS:');
    // Group warnings by category
    const warningMap = new Map();
    for (const r of warningReports) {
      for (const w of r.warnings) {
        const cat = w.split(':')[0];
        if (!warningMap.has(cat)) warningMap.set(cat, []);
        warningMap.get(cat).push({ url: r.url, warning: w });
      }
    }
    for (const [cat, items] of warningMap) {
      console.log(`\n[${cat}] (${items.length} occurrences):`);
      for (const item of items.slice(0, 5)) {
        console.log(`  - ${item.url.replace(BASE_URL, '')}: ${item.warning}`);
      }
      if (items.length > 5) {
        console.log(`  ... and ${items.length - 5} more.`);
      }
    }
  }
}

run().catch((e) => {
  console.error('Fatal audit error:', e);
  process.exit(1);
});
