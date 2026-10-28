import React from "react";
import { LANDING_CONTENT, StatItem } from "@/lib/landing-data";

export default function StatsBand() {
  const { badge, heading, stats } = LANDING_CONTENT.statsBand;

  return (
    <section className="relative overflow-hidden bg-[#071533] text-white py-18 sm:py-24 border-y border-white/10">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-r from-[#0070E0]/15 via-sky-500/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-300 bg-white/10 border border-white/15 mb-4">
            {badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-white leading-tight">
            {heading}
          </h2>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat: StatItem) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:bg-white/10 transition-colors"
            >
              <div className="font-heading text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-sky-300 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-300 leading-normal max-w-[200px]">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
