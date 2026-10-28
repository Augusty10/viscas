import React from "react";
import { LANDING_CONTENT } from "@/lib/landing-data";
import LandingButton from "./LandingButton";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function FinalCta() {
  const { badge, title, subtitle, cta, perks } = LANDING_CONTENT.finalCta;

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#0070E0] via-[#005FC8] to-[#0048A8] text-white p-8 sm:p-14 lg:p-18 shadow-[0_24px_60px_-12px_rgba(0,112,224,0.35)] overflow-hidden text-center">
          {/* Subtle concentric circles in background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-20">
            <svg
              className="absolute -top-24 -right-24 h-[500px] w-[500px]"
              viewBox="0 0 500 500"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="250" cy="250" r="240" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="250" cy="250" r="180" stroke="white" strokeWidth="1.5" />
              <circle cx="250" cy="250" r="120" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/15 border border-white/20 mb-6 backdrop-blur-xs">
              {badge}
            </span>

            {/* Title */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl font-normal">
              {subtitle}
            </p>

            {/* Pill CTA button */}
            <LandingButton
              href={cta.href}
              variant="white"
              size="lg"
              icon={<ArrowRight className="h-4 w-4 text-[#0070E0]" />}
              className="text-base sm:text-lg font-bold text-[#0070E0] hover:text-[#0058B6] px-9 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
            >
              {cta.label}
            </LandingButton>

            {/* Perks list */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-white/90">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
