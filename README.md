# CineRename Website

Official landing page and documentation site for [CineRename](https://cinerename.app).

This repository contains the public website, localized marketing pages, VitePress documentation, download page logic, pricing integration, and lightweight analytics wiring. It does not store application binaries; release assets live in [CineRename/CineRename-Releases](https://github.com/CineRename/CineRename-Releases).

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- `next-intl` for English, French, Spanish, and Chinese
- VitePress for `/docs`
- OpenNext for Cloudflare Workers deployment
- PostHog analytics, loaded client-side when configured
- Lemon Squeezy pricing API and checkout links

## Quick Start

Requires Node.js 22 or newer.

```bash
npm ci
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The middleware redirects visitors to a localized route.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run docs:dev` | Start VitePress docs locally |
| `npm run build` | Build the Next.js app |
| `npm run docs:build` | Build the documentation bundle |
| `npm run cf:build` | Build the Cloudflare Worker bundle and docs |
| `npm run preview` | Build and preview with OpenNext/Cloudflare locally |
| `npm run deploy` | Build and deploy the production Worker |
| `npm run upload` | Build and upload a non-production Worker build |
| `npm run cf-typegen` | Generate Cloudflare environment types |

Before pushing changes that affect pages, docs, routing, or config, run:

```bash
npm run build
npm run cf:build
git diff --check
```

## Project Layout

```text
app/
  [locale]/                 Localized website routes
  api/pricing/              Lemon Squeezy pricing endpoint
  PostHogProvider.tsx       Client-side analytics provider
  globals.css               Global theme and Tailwind imports
  robots.ts                 robots.txt route
  sitemap.ts                sitemap.xml route

components/                 Landing, pricing, download, FAQ, footer and shared UI
components/three/           Interactive hero background
docs/                       VitePress documentation source
docs/.vitepress/            Docs configuration and theme overrides
hooks/                      Attribution and browser helpers
i18n/                       next-intl routing and request config
lib/                        Site URL and tracking helpers
messages/                   Localized website copy
public/                     Static images, icons, headers and release metadata
public/releases/            Download page release metadata JSON
```

## Environment Variables

Copy `.env.local.example` for local development.

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL used by metadata, sitemap and JSON-LD |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | Public PostHog project key; leave empty to disable analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog host, for example `https://eu.i.posthog.com` |
| `NEXT_PUBLIC_VIMEO_ID` | No | Demo video ID |
| `LEMON_SQUEEZY_API_KEY` | Production pricing | Server-side secret for live pricing; do not commit real values |
| `LEMON_SQUEEZY_STORE_ID` | Pricing | Store ID |
| `LEMON_SQUEEZY_MONTHLY_VARIANT_ID` | Pricing | Monthly Pro variant |
| `LEMON_SQUEEZY_ANNUAL_VARIANT_ID` | Pricing | Annual Pro variant |
| `LEMON_SQUEEZY_LIFETIME_VARIANT_ID` | Pricing | Lifetime Pro variant |
| `NEXT_PUBLIC_LEMONSQUEEZY_URL` | Checkout fallback | Public storefront URL |
| `NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_URL` | Checkout fallback | Public monthly checkout URL |
| `NEXT_PUBLIC_LEMONSQUEEZY_ANNUAL_URL` | Checkout fallback | Public annual checkout URL |
| `NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_URL` | Checkout fallback | Public lifetime checkout URL |

The `NEXT_PUBLIC_*` values are public by design. `LEMON_SQUEEZY_API_KEY` must be configured as a Cloudflare secret or environment secret, never committed.

## Releases And Downloads

The download page reads `/releases/latest.json` and displays links when download URLs are present.

- `public/releases/latest.json` contains the latest version, changelog summary and download map.
- `public/releases/history.json` contains the public changelog history.
- Release binaries are stored in the public release repository, not in this website repository.
- The application release workflow can update these JSON files so the website shows the newest downloads and changelog automatically.

If no release download URLs are available, the download page keeps unavailable formats disabled instead of linking to missing files.

## Cloudflare Workers Deployment

The production Worker is configured by `wrangler.toml` / `wrangler.deploy.toml`.

Cloudflare settings:

- Worker name: `cinerenamelanding`
- Production branch: `main`
- Root directory: `/`
- Build command: `npm run cf:build`
- Deploy command: `npm run cf:deploy-built`
- Non-production deploy command: `npm run cf:upload-built`
- Compatibility flags: `nodejs_compat`, `global_fetch_strictly_public`

Set the server-side Lemon Squeezy API key as a secret:

```bash
wrangler secret put LEMON_SQUEEZY_API_KEY
```

Public IDs, checkout URLs and the public PostHog project key may live in Wrangler vars because they are not private credentials.

## Analytics And Attribution

PostHog is optional. If `NEXT_PUBLIC_POSTHOG_KEY` is empty, analytics stays disabled.

Download buttons call the tracking helper and use the attribution hook to copy a short web-to-app attribution token when the browser permits clipboard access. The site should never copy unrelated clipboard data, and the app should ignore clipboard contents that do not match the CineRename attribution format.

## Copy Guidelines

- Keep public claims aligned with the app behavior.
- Avoid absolute promises such as perfect subtitle sync, guaranteed recognition, or fully unattended operation for uncertain matches.
- Mention FileBot only as a comparison or legacy-format import context.
- Use `Preferences` / `Préférences` / `Preferencias` / `偏好设置` for app settings paths.
- Keep docs and landing translations synchronized when changing product behavior.

## Useful Links

- Website: [https://cinerename.app](https://cinerename.app)
- Documentation: [https://cinerename.app/docs/](https://cinerename.app/docs/)
- Downloads: [https://cinerename.app/download](https://cinerename.app/download)
- Release assets: [CineRename/CineRename-Releases](https://github.com/CineRename/CineRename-Releases)
