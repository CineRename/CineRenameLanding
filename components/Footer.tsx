"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/tracking";

const Footer = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "en";

  const handleLanguageChange = (newLocale: string) => {
    trackEvent("language_changed", { from_locale: currentLocale, to_locale: newLocale });
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
              <Image
                src="/favicon.svg"
                alt="CineRename"
                className="h-8 w-8"
                width={32}
                height={32}
                loading="lazy"
              />
              <span className="text-foreground font-bold text-lg tracking-tight">CineRename</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              {t("footer.copyright")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/terms" className="text-gray-400 hover:text-foreground text-sm transition-colors">
                {t("footer.links.terms")}
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-foreground text-sm transition-colors">
                {t("footer.links.privacy")}
              </Link>
              <Link href="/refund" className="text-gray-400 hover:text-foreground text-sm transition-colors">
                Refund
              </Link>
              <Link href="/legal" className="text-gray-400 hover:text-foreground text-sm transition-colors">
                Legal
              </Link>
              <a href="mailto:cinerename@gmail.com" className="text-gray-400 hover:text-foreground text-sm transition-colors">
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
                <Link href={`/${currentLocale}/download`} className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  {t("footer.resources.download")}
                </Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/pricing`} className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  {t("footer.resources.pricing")}
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
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
                onChange={(e) => handleLanguageChange(e.target.value)}
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
                onClick={() => trackEvent("cta_clicked", { location: "footer", type: "download" })}
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
