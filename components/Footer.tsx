"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

const Footer = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "en";

  const handleLanguageChange = (newLocale: string) => {
    trackEvent("changement_langue", { from_locale: currentLocale, to_locale: newLocale });
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/") || `/${newLocale}`;
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
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              {t("footer.copyright")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/terms" onClick={() => trackEvent("clic_lien_footer", { link: "terms" })} className="text-gray-400 hover:text-foreground text-sm transition-colors">
                {t("footer.links.terms")}
              </Link>
              <Link href="/privacy" onClick={() => trackEvent("clic_lien_footer", { link: "privacy" })} className="text-gray-400 hover:text-foreground text-sm transition-colors">
                {t("footer.links.privacy")}
              </Link>
              <Link href="/refund" onClick={() => trackEvent("clic_lien_footer", { link: "refund" })} className="text-gray-400 hover:text-foreground text-sm transition-colors">
                Refund
              </Link>
              <Link href="/legal" onClick={() => trackEvent("clic_lien_footer", { link: "legal" })} className="text-gray-400 hover:text-foreground text-sm transition-colors">
                Legal
              </Link>
              <a href="mailto:cinerename@gmail.com" onClick={() => trackEvent("clic_contact", { location: "footer" })} className="text-gray-400 hover:text-foreground text-sm transition-colors">
                {t("footer.links.contact")}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t("footer.resources.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${currentLocale}/download`} onClick={() => trackEvent("clic_bouton_action", { location: "footer", type: "download" })} className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  {t("footer.resources.download")}
                </Link>
              </li>
              <li>
                <a href={currentLocale === 'en' ? '/docs/index.html' : `/docs/${currentLocale}/index.html`} onClick={() => trackEvent("clic_lien_footer", { link: "docs" })} className="text-gray-400 hover:text-primary-400 text-sm transition-colors" target="_blank" rel="noopener noreferrer">
                  {t("nav.docs")}
                </a>
              </li>
              <li>
                <a href={currentLocale === 'en' ? '/docs/changelog.html' : `/docs/${currentLocale}/changelog.html`} onClick={() => trackEvent("clic_lien_footer", { link: "changelog" })} className="text-gray-400 hover:text-primary-400 text-sm transition-colors" target="_blank" rel="noopener noreferrer">
                  Changelog
                </a>
              </li>
              <li>
                <Link href={`/${currentLocale}/pricing`} onClick={() => trackEvent("clic_lien_footer", { link: "pricing" })} className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  {t("footer.resources.pricing")}
                </Link>
              </li>
              <li>
                <a href="#faq" onClick={() => trackEvent("clic_lien_footer", { link: "faq" })} className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  {t("footer.resources.faq")}
                </a>
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
              <p className="text-gray-400 text-sm">{t("footer.cta.ready")}</p>
              <Link
                href={`/${currentLocale}/download`}
                onClick={() => trackEvent("clic_bouton_action", { location: "footer", type: "download" })}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-primary-foreground rounded-lg transition-all duration-200 text-sm font-semibold"
              >
                {t("footer.cta.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
