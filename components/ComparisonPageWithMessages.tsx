import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ComparisonPage from "./ComparisonPage";

/**
 * ComparisonPage is a client component that reads `${namespace}.*` messages. Those catalogs are
 * excluded from the shared layout payload (see lib/client-messages.ts), so this server wrapper
 * provides only the namespace the page actually needs.
 */
export default async function ComparisonPageWithMessages({ namespace }: { namespace: string }) {
  const messages = (await getMessages()) as Record<string, unknown>;
  return (
    <NextIntlClientProvider messages={{ [namespace]: messages[namespace] }}>
      <ComparisonPage namespace={namespace} />
    </NextIntlClientProvider>
  );
}
