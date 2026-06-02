'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { trackEvent } from '@/lib/tracking';

const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${currentLocale}#features`, label: t('nav.features'), external: false },
    { href: `/${currentLocale}#how-it-works`, label: t('nav.howItWorks'), external: false },
    { href: `/${currentLocale}/pricing`, label: t('nav.pricing'), external: false },
    { href: currentLocale === 'en' ? '/docs/' : `/docs/${currentLocale}/`, label: t('nav.docs'), external: true },
    { href: `/${currentLocale}#faq`, label: t('nav.faq'), external: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/80 backdrop-blur-xl border-border/60'
          : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${currentLocale}`} className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary-500 to-amber-500 p-1.5 rounded-lg shadow-sm ring-1 ring-primary-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clapperboard w-5 h-5 text-white" aria-hidden="true"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"></path><path d="m6.2 5.3 3.1 3.9"></path><path d="m12.4 3.4 3.1 4"></path><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path></svg>
              </div>
              <span className="text-foreground font-bold text-lg tracking-tight">CineRename</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => trackEvent("nav_link_clicked", { target: link.label })}
                  {...(link.external ? { rel: "noopener" } : {})}
                  className="text-gray-300 hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href={`/${currentLocale}/download`}
                onClick={() => trackEvent('cta_clicked', { location: 'header', type: 'download' })}
                className="ml-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-primary-foreground rounded-lg transition-all duration-200 text-sm font-semibold"
              >
                {t('nav.downloadBeta')}
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-foreground hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface border-t border-border shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { rel: "noopener" } : {})}
                className="text-gray-300 hover:text-foreground block px-3 py-2 text-base font-medium"
                onClick={() => { trackEvent("nav_link_clicked", { target: link.label }); setIsMobileMenuOpen(false); }}
              >
                {link.label}
              </a>
            ))}
            <Link
              href={`/${currentLocale}/download`}
              className="block px-3 py-2 bg-primary-500 hover:bg-primary-600 text-primary-foreground rounded-lg transition-all duration-200 text-base font-semibold text-center"
              onClick={() => { trackEvent('cta_clicked', { location: 'header', type: 'download' }); setIsMobileMenuOpen(false); }}
            >
              {t('nav.downloadBeta')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
