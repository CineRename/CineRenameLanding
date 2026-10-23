/**
 * The root layout serializes its messages into every page (RSC payload) for client components.
 * Comparison and guide catalogs are only needed by their own routes, so they are left out of the
 * shared payload; ComparisonPageWithMessages re-injects its own namespace on the /vs-* pages.
 * Guide pages are server-rendered with props and never read these namespaces on the client.
 */
const PAGE_SCOPED_PREFIXES = ["comparison", "guide"] as const;
// Used on the home page (ComparisonFilebot section), so it stays in the shared payload.
const ALWAYS_SHARED = new Set(["comparisonFilebot"]);

export function pickSharedClientMessages<T extends Record<string, unknown>>(messages: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(messages).filter(
      ([key]) =>
        ALWAYS_SHARED.has(key) || !PAGE_SCOPED_PREFIXES.some((prefix) => key.startsWith(prefix)),
    ),
  ) as Partial<T>;
}
