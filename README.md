# CineRename Landing

Landing page for [CineRename](https://github.com/CineRename/CineRename), built with Next.js 15, Tailwind CSS 4 and `next-intl`. Designed for deployment on **Cloudflare Workers**.

## Stack

- Next.js 15 (App Router, Turbopack)
- React 19, TypeScript
- Tailwind CSS 4 with a dark-first CineRename theme (orange / navy / emerald)
- `next-intl` — fr, en, es, zh
- Lightweight CSS-only hero treatment for fast LCP
- PostHog product analytics (optional, lazy-loaded after the page is idle)

## Local development

```bash
npm install
cp .env.local.example .env.local
# fill in your PostHog key if you want analytics enabled

npm run dev
```

Open http://localhost:3000 — the middleware redirects to the default locale.

## Project structure

```
app/
├── [locale]/                 # Localized routes (fr/en/es/zh)
│   ├── page.tsx              # Home (Hero, Features, FAQ, etc.)
│   ├── pricing/              # Pricing page
│   └── download/             # Download page
├── privacy/                  # Privacy policy
├── terms/                    # Terms of service
├── refund/                   # Refund policy
├── legal/                    # Legal notice
├── layout.tsx                # Root layout (metadata, Schema.org, PostHog)
├── globals.css               # Theme tokens + Tailwind imports
├── robots.ts
└── sitemap.ts

components/                   # Hero, PerksGrid, FAQ, Pricing, Download, Footer, Header…
i18n/                         # next-intl routing config
messages/                     # fr.json / en.json / es.json / zh.json
public/assets/img/            # Screenshots used on the landing
```

## Environment variables

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL`         | Canonical URL used in metadata, sitemap and JSON-LD |
| `NEXT_PUBLIC_POSTHOG_KEY`      | PostHog project key — leave empty to disable |
| `NEXT_PUBLIC_POSTHOG_HOST`     | PostHog host (defaults to `https://us.i.posthog.com`) |
| `NEXT_PUBLIC_VIMEO_ID`         | Vimeo ID for the demo modal |
| `NEXT_PUBLIC_LEMONSQUEEZY_URL` | LemonSqueezy checkout base URL |

Copy `.env.local.example` and fill in what you need.

## Deploy on Cloudflare Workers

This project ships with `@opennextjs/cloudflare` so the Next.js app can run on Cloudflare Workers at:

https://cinerename.app

```bash
# Build the Next.js output for Cloudflare Workers
npm run cf:build

# Preview the build locally (uses wrangler)
npm run preview

# Deploy from the CLI
npm run deploy
```

For continuous deployment, point Cloudflare Workers Builds at the GitHub repo
`CineRename/CineRenameLanding` with these settings:

- Worker name: `cinerenamelanding`
- Production branch: `main`
- Root directory: `/`
- Build command: `npm run cf:build`
- Deploy command: `npm run cf:deploy-built`
- Non-production branch deploy command: `npm run cf:upload-built`
- Compatibility flags: `nodejs_compat`, `global_fetch_strictly_public` (already set in `wrangler.toml`)

Define your `NEXT_PUBLIC_*` variables in the Worker settings.

## Theme

- Background: `#0F1729` (navy)
- Surfaces: `#0A0F1E` / `#131C32`
- Primary: `#F97316` (orange-500) — derived from the CineRename app accent
- Secondary: `#10B981` (emerald-500) — used for Pro Lifetime / success states

Tokens live in `app/globals.css` and `tailwind.config.js`.
