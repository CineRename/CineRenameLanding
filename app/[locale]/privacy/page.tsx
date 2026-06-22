import React from "react";
import { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy - CineRename",
  description: "Privacy policy for CineRename users.",
  robots: { index: false }
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <p className="text-gray-400 mb-8">Effective Date: April 2026</p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <p className="mb-6">
            We respect your privacy. This Privacy Policy explains how we handle your data when you use the CineRename Website and Software.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Purchase Information</h3>
          <p className="mb-6">
            When you buy a CineRename license, our payment processor (LemonSqueezy) collects your name, email, and payment
            details to process the transaction. We do not store your payment data.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Analytics &amp; Telemetry</h3>
          <p className="mb-6">
            We use PostHog (privacy-friendly product analytics) to understand how the website and desktop application are used. The application collects basic, anonymous usage telemetry (such as app launches, feature interactions, and errors) to help us improve the software. We do NOT track, collect, or upload any information about your media files or file paths. No personally identifiable information is sold to third parties.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Information We Do Not Collect</h2>
          <p className="mb-6">
            CineRename processes your video files entirely on your computer. We do not upload, store, or access your media files. Other than the basic anonymous telemetry mentioned above, the application only contacts public metadata APIs (TheTVDB, TVmaze, OpenSubtitles) to retrieve titles and subtitles for the files you choose to process.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>To deliver your license key and provide support.</li>
            <li>To communicate important updates or product improvements.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Your Choices</h2>
          <p className="mb-6">
            You may request deletion of your personal data or unsubscribe from communications by contacting us.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Security</h2>
          <p className="mb-6">
            We take reasonable measures to protect your data, though no method is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Contact</h2>
          <p className="mb-6">
            If you have questions, contact us at <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
