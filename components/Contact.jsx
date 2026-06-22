"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const Contact = () => {
  const t = useTranslations("contact");

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div 
            data-animate="contact-card"
            className="bg-surface-elevated border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:border-primary-500/50 hover:shadow-primary-500/10"
          >
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6 shadow-inner text-primary-400">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">{t("cards.email.title")}</h3>
            <p className="text-gray-400 mb-8">{t("cards.email.description")}</p>
            
            <a
              href="mailto:cinerename@gmail.com"
              onClick={() => trackEvent("clic_contact", { type: "email" })}
              className="inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground font-bold rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all"
            >
              <Mail className="w-5 h-5 mr-2" />
              {t("cards.email.button")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
