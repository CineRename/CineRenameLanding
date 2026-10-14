import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: '404 - Page Not Found | CineRename',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LocalizedNotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-28">
        <span className="text-8xl font-black bg-gradient-to-r from-primary-400 to-amber-500 bg-clip-text text-transparent mb-2">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-gray-400 max-w-md mb-8 leading-relaxed text-sm">
          {t('description')}
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg text-sm"
        >
          {t('returnHome')}
        </Link>
      </main>
      <Footer />
    </div>
  );
}
