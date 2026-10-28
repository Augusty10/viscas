import React from "react";
import Link from "next/link";
import { LANDING_CONTENT } from "@/lib/landing-data";
import LandingButton from "./LandingButton";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Mail,
  Clock,
  Send,
  Zap,
} from "lucide-react";

export default function Hero() {
  const { badge, headline, subheading, primaryCta, secondaryCta, guaranteeText } =
    LANDING_CONTENT.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FC] via-[#F8FAFD] to-white pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 border-b border-[#E8EEF5]">
      {/* Subtle background ambient mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <div className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#0070E0]/8 to-[#0B1F4B]/5 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-[#0070E0]/6 to-emerald-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Headline and CTAs (lg:col-span-7) */}
          <div className="flex flex-col items-start text-left lg:col-span-7 max-w-2xl mx-auto lg:mx-0">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BAD8FB] bg-[#EBF4FE] px-4 py-1.5 text-xs font-bold text-[#0070E0] mb-6 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#0070E0] animate-pulse" />
              <span>{badge}</span>
            </div>

            {/* Big, bold headline (48-72px desktop) */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-[#0B1F4B] leading-[1.08] mb-6">
              The calm, intelligent way to master{" "}
              <span className="text-[#0070E0] underline decoration-[#BAD8FB] decoration-wavy decoration-from-font">
                email &amp; meetings
              </span>
            </h1>

            {/* Reassuring Subtitle */}
            <p className="text-lg sm:text-xl text-[#4A5568] leading-relaxed mb-8 font-normal">
              {subheading}
            </p>

            {/* Pill CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <LandingButton
                href={primaryCta.href}
                variant="primary"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                className="shadow-[0_4px_18px_rgba(0,112,224,0.3)]"
              >
                {primaryCta.label}
              </LandingButton>

              <LandingButton
                href={secondaryCta.href}
                variant="outline-navy"
                size="lg"
              >
                {secondaryCta.label}
              </LandingButton>
            </div>

            {/* Trust check guarantee line */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#64748B]">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{guaranteeText}</span>
            </div>
          </div>

          {/* Right Column: Layered Floating Card Product Mockup (lg:col-span-5) */}
          <div className="relative lg:col-span-5 flex items-center justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Main Product Canvas Card */}
              <div className="relative rounded-3xl bg-white border border-[#E2E8F0] p-6 shadow-[0_24px_50px_-12px_rgba(11,31,75,0.12),0_8px_20px_rgba(11,31,75,0.04)] overflow-hidden">
                {/* Header bar of the UI */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-[#0070E0] flex items-center justify-center text-white">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1F4B]">
                        Viscas Copilot
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live Google Sync Active
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>Inbox Zero in 12m</span>
                  </div>
                </div>

                {/* Simulated Email Thread with AI Summary */}
                <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFD] border border-[#E9EEF5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0070E0]">
                      ⚡ AI Executive Summary
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      2 mins ago
                    </span>
                  </div>
                  <p className="text-xs text-[#0B1F4B] font-semibold leading-snug">
                    Client contract renewal for Q3 from Sarah Jenkins (Apex Ventures)
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] text-[#4A5568]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0070E0] font-bold">•</span>
                      <span>Agreed to 15% budget expansion for marketing pipeline</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#0070E0] font-bold">•</span>
                      <span>Action: Requires meeting confirmation for Thursday 3:00 PM</span>
                    </li>
                  </ul>
                </div>

                {/* AI One-Click Response Strip */}
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-[#64748B]">
                    Recommended Action:
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 py-2 px-3 rounded-xl bg-[#EBF4FE] border border-[#BAD8FB] text-xs font-medium text-[#0B1F4B] truncate">
                      &quot;Sounds wonderful Sarah, calendar invite confirmed for Thursday.&quot;
                    </div>
                    <button
                      type="button"
                      className="px-3 py-2 rounded-xl bg-[#0070E0] hover:bg-[#0058B6] text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                    >
                      <Send className="h-3 w-3" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>

                {/* Quick stats bottom row */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-[#0070E0]" />
                    <span>42 emails auto-sorted</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                    <span>3 meetings scheduled</span>
                  </span>
                </div>
              </div>

              {/* Floating Chip 1: Calendar Conflict Resolved (Top Left) */}
              <div className="absolute -top-6 -left-6 sm:-left-8 rounded-2xl bg-white border border-[#E2E8F0] p-3 sm:p-3.5 shadow-[0_12px_28px_rgba(11,31,75,0.12)] flex items-center gap-3 animate-fintech-float hidden sm:flex">
                <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1F4B]">
                    Conflict Resolved
                  </div>
                  <div className="text-[11px] text-slate-500">
                    +45 min focus time saved
                  </div>
                </div>
              </div>

              {/* Floating Chip 2: Bank-Grade Security badge (Bottom Right) */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 rounded-2xl bg-[#0B1F4B] text-white p-3 sm:p-3.5 shadow-[0_16px_36px_rgba(7,21,51,0.3)] flex items-center gap-3 hidden sm:flex">
                <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-sky-400 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">256-bit AES Protected</div>
                  <div className="text-[10px] text-slate-300">
                    Official Google OAuth 2.0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
