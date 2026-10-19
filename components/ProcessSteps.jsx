"use client";
import React from "react";
import { Zap, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Step1DropAnimation,
  Step2StudioAnimation,
  Step3ReadyAnimation,
} from "./ProcessStepAnimations";

const ProcessSteps = () => {
  const t = useTranslations();

  const steps = [
    {
      number: "1",
      title: t("processSteps.steps.drop.title"),
      description: t("processSteps.steps.drop.description"),
      component: <Step1DropAnimation />,
    },
    {
      number: "2",
      title: t("processSteps.steps.trim.title"),
      description: t("processSteps.steps.trim.description"),
      component: <Step2StudioAnimation />,
    },
    {
      number: "3",
      title: t("processSteps.steps.export.title"),
      description: t("processSteps.steps.export.description"),
      component: <Step3ReadyAnimation />,
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
                {step.component}
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
    </section>
  );
};

export default ProcessSteps;
