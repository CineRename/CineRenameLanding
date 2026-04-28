import React from "react";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl font-bold text-foreground mb-8">Legal Notice</h1>

        <p className="text-gray-400 mb-8">Effective Date: April 2026</p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Website Editor</h2>

          <div className="mb-6 space-y-2">
            <p>Project: <strong>CineRename</strong></p>
            <p>The contact and editor information will be updated when the legal entity is incorporated.</p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Hosting</h2>

          <div className="mb-6 space-y-2">
            <p>The website cinerename.app is hosted on:</p>
            <p><strong>Cloudflare Pages</strong> — Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, United States.</p>
            <p>Software binaries are distributed via:</p>
            <p><strong>GitHub Releases</strong> — github.com/Epikaigle/CineRename.</p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Intellectual Property</h2>

          <p className="mb-6">
            All content on this website, including text, images, graphics, and logos, is the exclusive property of the
            CineRename project unless otherwise stated. Any reproduction, distribution, or use of this content without prior
            written permission is strictly prohibited.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Trademarks</h2>

          <p className="mb-6">
            Plex, Jellyfin, Emby, TheTVDB, TVmaze and OpenSubtitles are trademarks of their respective owners. CineRename is
            an independent project and is not endorsed by, affiliated with, or sponsored by any of these companies.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Contact</h2>

          <p className="mb-6">
            For any inquiries regarding this legal notice or the website, contact us at <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
