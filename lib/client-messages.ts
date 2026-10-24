/**
 * The root layout serializes its messages into every page (RSC payload) for client components.
 * Comparison and guide catalogs are only needed by their own routes, so they are left out of the
 * shared payload; ComparisonPageWithMessages re-injects its own namespace on the /vs-* pages.
 * Guide pages are server-rendered with props and never read these namespaces on the client.
 */
const PAGE_SCOPED_PREFIXES = ["comparison", "guide"] as const;
// Read by client components that are not behind a page-level provider:
// - comparisonFilebot: home page section + /vs-filebot
// - guidesHub: GuidesHub client component on /guides (note: "guidesHub" also starts with "guide")
const ALWAYS_SHARED = new Set(["comparisonFilebot", "guidesHub"]);

export function pickSharedClientMessages<T extends Record<string, unknown>>(messages: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(messages).filter(
      ([key]) =>
        ALWAYS_SHARED.has(key) || !PAGE_SCOPED_PREFIXES.some((prefix) => key.startsWith(prefix)),
    ),
  ) as Partial<T>;
}
