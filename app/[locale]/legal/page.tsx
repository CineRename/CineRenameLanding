import React from "react";
import { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal Notice - CineRename",
  description: "Legal notice for CineRename.",
  robots: { index: false }
};

export default function LegalPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl font-bold text-foreground mb-8">Legal Notice</h1>

        <p className="text-gray-400 mb-8">Effective Date: April 2026</p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Website Editor</h2>

          <div className="mb-6">
            <p className="mb-2"><strong>Company:</strong> Simon Deroche</p>
            <p className="mb-2"><strong>Legal status:</strong> Auto-entrepreneur (Artisan)</p>
            <p className="mb-2"><strong>SIRET:</strong> 93150462500019</p>
            <p className="mb-2"><strong>SIREN:</strong> 931504625</p>
            <p className="mb-2"><strong>Professional Address:</strong> 56250 LA VRAIE CROIX, France</p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Publication Director</h2>

          <div className="mb-6">
            <p className="mb-2"><strong>Name:</strong> Simon Deroche</p>
            <p className="mb-2"><strong>Email:</strong> cinerename@gmail.com</p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Hosting</h2>

          <div className="mb-6">
            <p className="mb-2">The website {siteUrl} is hosted on:</p>
            <p className="mb-2"><strong>Cloudflare Workers</strong></p>
            <p className="mb-2">Cloudflare, Inc., 101 Townsend Street</p>
            <p className="mb-2">San Francisco, CA 94107, United States</p>
            <p className="mb-4"></p>
            <p className="mb-2">Software binaries are hosted on:</p>
            <p className="mb-2"><strong>GitHub</strong></p>
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
