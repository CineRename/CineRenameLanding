'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { trackEvent } from '@/lib/tracking';

const Header = () => {
  const t = useTranslations();
  const currentLocale = useLocale();
  const pathname = usePathname(); // This is now prefix-less (e.g. '/' or '/pricing')
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    trackEvent("clic_lien_navigation", { target: label });
    
    // Check if it's a hash link on the home page
    if (href.startsWith('/#')) {
      const hash = href.substring(1); // e.g., '#features'
      if (pathname === '/') {
        // We are already on the home page, smoothly scroll to the section
        e.preventDefault();
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
      // If we are NOT on the home page, let the Next-intl Link navigate naturally to the home page hash
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: '/#features', label: t('nav.features'), external: false },
    { href: '/#how-it-works', label: t('nav.howItWorks'), external: false },
    { href: '/pricing', label: t('nav.pricing'), external: false },
    { href: currentLocale === 'en' ? '/docs/index.html' : `/docs/${currentLocale}/index.html`, label: t('nav.docs'), external: true },
    { href: '/#faq', label: t('nav.faq'), external: false },
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
            <Link 
              href="/" 
              className="flex items-center gap-2"
              onClick={(e) => {
                trackEvent("clic_logo_header", { target: "home" });
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="bg-gradient-to-br from-primary-500 to-amber-500 p-1.5 rounded-lg shadow-sm ring-1 ring-primary-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clapperboard w-5 h-5 text-white" aria-hidden="true"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"></path><path d="m6.2 5.3 3.1 3.9"></path><path d="m12.4 3.4 3.1 4"></path><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path></svg>
              </div>
              <span className="text-foreground font-bold text-lg tracking-tight">CineRename</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => trackEvent("clic_lien_navigation", { target: link.label })}
                    rel="noopener"
                    className="text-gray-300 hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={link.href as any}
                    onClick={(e) => handleNavClick(e, link.href, link.label)}
                    className="text-gray-300 hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Link
                href="/download"
                onClick={() => trackEvent('clic_bouton_action', { location: 'header', type: 'download' })}
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
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  rel="noopener"
                  className="text-gray-300 hover:text-foreground block px-3 py-2 text-base font-medium"
                  onClick={() => { trackEvent("clic_lien_navigation", { target: link.label }); setIsMobileMenuOpen(false); }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={link.href as any}
                  className="text-gray-300 hover:text-foreground block px-3 py-2 text-base font-medium"
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              href="/download"
              className="block px-3 py-2 bg-primary-500 hover:bg-primary-600 text-primary-foreground rounded-lg transition-all duration-200 text-base font-semibold text-center"
              onClick={() => { trackEvent('clic_bouton_action', { location: 'header', type: 'download' }); setIsMobileMenuOpen(false); }}
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
