import React from "react";
import { getSiteUrl } from "@/lib/site";

export default function TermsPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms and Conditions</h1>

        <p className="text-gray-400 mb-8">Effective Date: April 2026</p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <p className="mb-6">
            These Terms and Conditions (&quot;Terms&quot;) govern your use of the website located at {siteUrl} (the &quot;Website&quot;)
            and the CineRename software (the &quot;Software&quot;). By accessing the Website or using the Software, you agree to
            comply with these Terms. If you do not agree, please do not use CineRename.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. License</h2>
          <p className="mb-6">
            When you purchase a CineRename Pro license, you receive a personal, non-transferable license to install and use the
            Software on up to 2 devices (unless otherwise specified). You may not redistribute, resell, or sublicense the Software
            without our written consent. The free version of CineRename remains available without a license under the same usage
            terms.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Refund Policy</h2>
          <p className="mb-6">
            CineRename Pro comes with a 14-day money-back guarantee. If you are not satisfied, you may request a refund within
            14 days of purchase through the LemonSqueezy support channel.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Third-Party Data Sources</h2>
          <p className="mb-6">
            CineRename queries third-party APIs (TheTVDB, TVmaze, OpenSubtitles) to retrieve metadata and subtitles. The use of
            this data is subject to the respective providers&apos; terms of use. CineRename is not affiliated with Plex, Jellyfin,
            Emby, or any of these metadata providers.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Intellectual Property</h2>
          <p className="mb-6">
            All content, code, and materials provided on the Website and in the Software are protected by intellectual property
            laws. You may not reproduce or distribute them without permission.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Disclaimer</h2>
          <p className="mb-6">
            The Software is provided &quot;as is&quot; without warranty of any kind. We do not guarantee that it will be error-free
            or meet your specific requirements. Always verify the rename preview before applying changes — CineRename ships with
            a safe preview-first design specifically to mitigate accidental data loss.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="mb-6">
            To the maximum extent permitted by law, the publisher shall not be liable for indirect, incidental, or consequential
            damages resulting from the use of the Software or Website.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Governing Law</h2>
          <p className="mb-6">
            These Terms are governed by French law.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Contact</h2>
          <p className="mb-6">
            For any questions, contact us at <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
