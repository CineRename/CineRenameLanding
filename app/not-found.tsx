import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found | CineRename',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found | CineRename</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-[#090a0f] text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
        <span className="text-8xl font-black text-amber-500 mb-2">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-400 mb-8 max-w-md text-center text-sm leading-relaxed">
          The page you requested could not be found or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg text-sm"
        >
          Return to homepage
        </Link>
      </body>
    </html>
  );
}
