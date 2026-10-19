"use client";
import React, { useState } from "react";
import { Zap, Clock, X } from "lucide-react";
import { useTranslations } from "next-intl";
import OptimizedImage from "./OptimizedImage";

const ProcessSteps = () => {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(null);
  const steps = [
    {
      number: "1",
      title: t("processSteps.steps.drop.title"),
      description: t("processSteps.steps.drop.description"),
      image: "/assets/img/screen-studio.webp",
      hqImage: "/assets/img/screen-studio.png",
      alt: t("processSteps.steps.drop.alt"),
    },
    {
      number: "2",
      title: t("processSteps.steps.trim.title"),
      description: t("processSteps.steps.trim.description"),
      image: "/assets/img/Rename_direct.webp",
      hqImage: "/assets/img/Rename_direct.png",
      alt: t("processSteps.steps.trim.alt"),
    },
    {
      number: "3",
      title: t("processSteps.steps.export.title"),
      description: t("processSteps.steps.export.description"),
      image: "/assets/img/rename-end.webp",
      hqImage: "/assets/img/rename-end.png",
      alt: t("processSteps.steps.export.alt"),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="mx-auto text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t("processSteps.title")}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("processSteps.subtitle")}
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
            >
              <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-border cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20 hover:border-primary-500/50"
                  onClick={() => setSelectedImage(step.hqImage)}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent pointer-events-none" />
                  <OptimizedImage
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-auto"
                    width={1400}
                    height={800}
                    quality={60}
                    sizes="(max-width: 768px) 90vw, 800px"
                  />

                </div>
              </div>

              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="space-y-6">
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="flex items-center gap-3 pt-4">
                    <div className="h-1 w-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" />
                    <span className="text-sm font-medium text-primary-400 uppercase tracking-wider">
                      {t("processSteps.stepCounter")} {step.number} {t("processSteps.of")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 mx-auto max-w-4xl bg-surface-elevated rounded-3xl p-8 lg:p-10 border border-border shadow-xl">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            {t("howItWorks.comparison.title")}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-foreground">{t("processSteps.cineRenameLabel")}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {t("howItWorks.comparison.cineRename")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-foreground">{t("processSteps.otherToolsLabel")}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {t("howItWorks.comparison.otherTools")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div 
            className="relative max-w-7xl w-full max-h-[90vh] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-black" 
            onClick={e => e.stopPropagation()}
          >
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={selectedImage} alt="Expanded view" className="w-full h-full object-contain max-h-[90vh]" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProcessSteps;
