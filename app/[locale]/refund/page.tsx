import React from "react";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl font-bold text-foreground mb-8">Refund Policy</h1>

        <p className="text-gray-400 mb-8">Effective Date: April 2026</p>

        <div className="prose prose-lg max-w-none text-gray-300">
          <p className="mb-6">
            We want you to feel confident when purchasing a CineRename Pro license.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">14-Day Money-Back Guarantee</h2>

          <ul className="list-disc list-inside mb-6 space-y-3">
            <li>You may request a full refund within 14 days of purchase if you are not satisfied.</li>
            <li>Refund requests must be sent through the LemonSqueezy receipt with your order details.</li>
            <li>Refunds will be issued to your original payment method.</li>
            <li>After 14 days, all sales are final.</li>
          </ul>

          <p className="mb-6">
            The free version of CineRename remains fully usable without a purchase, so you can always evaluate the app before
            considering a Pro license. This policy does not affect your legal rights under applicable consumer protection laws.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            For any questions about refunds, contact us at <a href="mailto:cinerename@gmail.com" className="text-primary-300 underline hover:no-underline">cinerename@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
