"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

const Footer = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const prefix = currentLocale === 'en' ? '' : `/${currentLocale}`;

  const handleLanguageChange = (newLocale: string) => {
    trackEvent("changement_langue", { from_locale: currentLocale, to_locale: newLocale });
    let pathWithoutLocale = pathname;
    if (pathname.startsWith(`/${currentLocale}/`)) {
      pathWithoutLocale = pathname.slice(currentLocale.length + 1);
    } else if (pathname === `/${currentLocale}`) {
      pathWithoutLocale = '/';
    }
    const newPath = newLocale === 'en' ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <footer className="bg-surface border-t border-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary-500 to-amber-500 p-1.5 rounded-lg shadow-sm ring-1 ring-primary-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clapperboard w-5 h-5 text-white" aria-hidden="true"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"></path><path d="m6.2 5.3 3.1 3.9"></path><path d="m12.4 3.4 3.1 4"></path><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path></svg>
              </div>
              <span className="text-foreground font-bold text-lg tracking-tight">CineRename</span>
            </div>
            <p className="text-muted-foreground text-xs mb-4 max-w-md leading-relaxed">
              {t("footer.legalAttribution")}
            </p>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              {t("footer.copyright")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`${prefix}/terms`} onClick={() => trackEvent("clic_lien_footer", { link: "terms" })} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {t("footer.terms")}
              </Link>
              <Link href={`${prefix}/privacy`} onClick={() => trackEvent("clic_lien_footer", { link: "privacy" })} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href={`${prefix}/refund`} onClick={() => trackEvent("clic_lien_footer", { link: "refund" })} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Refund Policy
              </Link>
              <Link href={`${prefix}/legal`} onClick={() => trackEvent("clic_lien_footer", { link: "legal" })} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {t("footer.links.legal")}
              </Link>
              <a href="mailto:cinerename@gmail.com" onClick={() => trackEvent("clic_contact", { location: "footer" })} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {t("footer.links.contact")}
              </a>
              <a href="https://discord.gg/2cjMVyF6ux" onClick={() => trackEvent("clic_social", { platform: "discord" })} className="text-muted-foreground hover:text-foreground text-sm transition-colors" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              <a href="https://x.com/CineRename" onClick={() => trackEvent("clic_social", { platform: "x" })} className="text-muted-foreground hover:text-foreground text-sm transition-colors" target="_blank" rel="noopener noreferrer">
                X (Twitter)
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t("footer.resources.title")}
            </h3>
            <ul className="space-y-2">
              <li className="mb-3">
                <Link href={`${prefix}/download`} onClick={() => trackEvent("clic_bouton_action", { location: "footer", type: "download" })} className="text-muted-foreground hover:text-primary-400 text-sm transition-colors">
                  {t("footer.download")}
                </Link>
              </li>
              <li className="mb-3">
                <a href={currentLocale === 'en' ? '/docs/index.html' : `/docs/${currentLocale}/index.html`} onClick={() => trackEvent("clic_lien_footer", { link: "docs" })} className="text-muted-foreground hover:text-primary-400 text-sm transition-colors" target="_blank" rel="noopener noreferrer">
                  {t("footer.docs")}
                </a>
              </li>
              <li className="mb-3">
                <a href={currentLocale === 'en' ? '/docs/changelog.html' : `/docs/${currentLocale}/changelog.html`} onClick={() => trackEvent("clic_lien_footer", { link: "changelog" })} className="text-muted-foreground hover:text-primary-400 text-sm transition-colors" target="_blank" rel="noopener noreferrer">
                  Changelog
                </a>
              </li>
              <li className="mb-3">
                <Link href={`${prefix}/pricing`} onClick={() => trackEvent("clic_lien_footer", { link: "pricing" })} className="text-muted-foreground hover:text-primary-400 text-sm transition-colors">
                  {t("footer.pricing")}
                </Link>
              </li>
              <li className="mb-3">
                <a href={`${prefix}/#faq`} onClick={() => trackEvent("clic_lien_footer", { link: "faq" })} className="text-muted-foreground hover:text-primary-400 text-sm transition-colors">
                  {t("footer.faq")}
                </a>
              </li>
              <li className="mb-3">
                <Link href={`${prefix}/vs-filebot`} onClick={() => trackEvent("clic_lien_footer", { link: "vs-filebot" })} className="text-muted-foreground hover:text-primary-400 text-sm transition-colors">
                  CineRename vs FileBot
                </Link>
              </li>

            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <label htmlFor="language-select" className="sr-only">
                {t("footer.language.label")}
              </label>
              <select
                id="language-select"
                value={currentLocale}
                onChange={(e) => {
                  trackEvent("changement_langue", { language: e.target.value });
                  handleLanguageChange(e.target.value);
                }}
                className="bg-surface text-gray-300 text-sm border border-border rounded px-2 py-1 focus:outline-none focus:border-primary-500"
                aria-label={t("footer.language.label")}
              >
                <option value="en">{t("footer.language.en")}</option>
                <option value="fr">{t("footer.language.fr")}</option>
                <option value="es">{t("footer.language.es")}</option>
                <option value="zh">{t("footer.language.zh")}</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-muted-foreground text-sm mb-4">
                {t("footer.readyToOrganize")}
              </p>
              <Link 
                href={`${prefix}/download`}
                onClick={() => trackEvent("clic_bouton_action", { location: "footer_cta", type: "download" })}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg transition-all group"
              >
                {t("footer.cta")}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
