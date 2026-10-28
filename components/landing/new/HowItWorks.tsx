import React from "react";
import { LANDING_CONTENT, StepItem } from "@/lib/landing-data";
import LandingSection from "./LandingSection";
import LandingCard from "./LandingCard";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const { badge, title, subtitle, steps } = LANDING_CONTENT.howItWorks;

  return (
    <LandingSection
      id="how-it-works"
      badge={badge}
      title={title}
      subtitle={subtitle}
      background="white"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Subtle connector line on desktop */}
        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#BAD8FB] via-[#0070E0] to-[#BAD8FB] -z-0" />

        {steps.map((item: StepItem, idx: number) => (
          <LandingCard
            key={item.step}
            variant="default"
            hoverEffect={true}
            className="relative z-10 flex flex-col justify-between items-start text-left bg-white"
          >
            <div>
              {/* Numbered Pill Header */}
              <div className="flex items-center justify-between w-full mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0070E0] text-white font-heading font-extrabold text-lg shadow-[0_4px_12px_rgba(0,112,224,0.3)]">
                  {item.step}
                </div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Step {idx + 1} of 3
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-xl font-bold text-[#0B1F4B] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#4A5568] leading-relaxed mb-6 font-normal">
                {item.description}
              </p>
            </div>

            {/* Bottom check pill */}
            <div className="pt-4 border-t border-slate-100 w-full flex items-center gap-2 text-xs font-semibold text-[#0070E0]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{item.detail}</span>
            </div>
          </LandingCard>
        ))}
      </div>
    </LandingSection>
  );
}
