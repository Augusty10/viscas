import React from "react";
import { LANDING_CONTENT, SplitSectionItem } from "@/lib/landing-data";
import LandingButton from "./LandingButton";
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowRight,
  Zap,
  Layers,
  Calendar,
  Mail,
  Send,
} from "lucide-react";

export default function SplitSections() {
  const sections = LANDING_CONTENT.splitSections;

  const renderIllustration = (type: SplitSectionItem["illustrationType"]) => {
    switch (type) {
      case "fastReply":
        return (
          <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 shadow-[0_20px_48px_-10px_rgba(11,31,75,0.1)]">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#0070E0]" />
                <span className="text-xs font-bold text-[#0B1F4B]">Contextual Co-Author</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Generated in 1.1s
              </span>
            </div>

            {/* Tone selector pill switches */}
            <div className="mt-4 flex items-center gap-1.5 p-1 rounded-xl bg-slate-100">
              <span className="px-3 py-1 rounded-lg bg-white text-[11px] font-bold text-[#0B1F4B] shadow-xs">
                Executive
              </span>
              <span className="px-3 py-1 rounded-lg text-[11px] font-medium text-slate-500">
                Warm &amp; Friendly
              </span>
              <span className="px-3 py-1 rounded-lg text-[11px] font-medium text-slate-500">
                Ultra-Concise
              </span>
            </div>

            {/* Draft preview text */}
            <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] text-xs text-[#0B1F4B] leading-relaxed">
              <p className="font-semibold text-slate-700 mb-1.5">Hi Jonathan,</p>
              <p>
                Thanks for sending over the revised deliverables. I reviewed the SLA milestones and they align with our goals. Let&apos;s finalize the agreement on Thursday.
              </p>
              <p className="mt-2 text-[#0070E0] font-semibold flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Attached: Google Meet invite for 2:30 PM EST
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                Matches your communication style
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0070E0] text-white text-xs font-bold shadow-xs hover:bg-[#0058B6] transition-colors"
              >
                <Send className="h-3 w-3" />
                <span>Send Reply</span>
              </button>
            </div>
          </div>
        );

      case "securityLock":
        return (
          <div className="rounded-3xl bg-[#0B1F4B] text-white p-6 sm:p-8 shadow-[0_24px_50px_-12px_rgba(7,21,51,0.5)] border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-sky-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">Data Privacy Vault</div>
                  <div className="text-[10px] text-slate-300">SOC-2 Type II Compliant Architecture</div>
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Architecture breakdown */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5">
                  <Lock className="h-4 w-4 text-sky-400" />
                  <span className="text-xs font-semibold">In-Transit Encryption</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">TLS 1.3 / AES-256</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-semibold">Google OAuth 2.0 Auth</span>
                </div>
                <span className="text-[11px] text-slate-300 font-medium">Restricted Scopes</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-semibold">AI Training Policy</span>
                </div>
                <span className="text-[11px] text-sky-300 font-bold">Zero User Model Training</span>
              </div>
            </div>

            <p className="mt-5 text-[11px] text-slate-300 leading-normal">
              Your confidential correspondence is never monetized, indexed for public knowledge, or stored unencrypted.
            </p>
          </div>
        );

      case "unifiedHub":
        return (
          <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 shadow-[0_20px_48px_-10px_rgba(11,31,75,0.1)]">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#0070E0]" />
                <span className="text-xs font-bold text-[#0B1F4B]">Unified Workspace Canvas</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Zero App Hopping</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Inbox side */}
              <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E9EEF5]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B1F4B] mb-2">
                  <Mail className="h-3.5 w-3.5 text-[#0070E0]" />
                  <span>Inbox Flow</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 font-semibold truncate text-[#0B1F4B]">
                    David Kim · Q4 Strategy
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 font-semibold truncate text-[#0B1F4B]">
                    Stripe · Payout Verified
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 font-semibold truncate text-[#0B1F4B]">
                    Google Cloud · Audit
                  </div>
                </div>
              </div>

              {/* Calendar side */}
              <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E9EEF5]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B1F4B] mb-2">
                  <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Agenda Today</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold truncate">
                    11:00 AM · Product Sync
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 truncate">
                    1:30 PM · Focus Block
                  </div>
                  <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 font-bold truncate">
                    3:30 PM · Client Demo
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#EBF4FE] text-xs text-[#0B1F4B] font-medium flex items-center justify-between">
              <span>All notifications unified into calm digest intervals</span>
              <span className="font-bold text-[#0070E0]">Customizable</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white">
      {sections.map((section: SplitSectionItem, index: number) => {
        const isImageLeft = section.imageSide === "left";
        const isEven = index % 2 === 1;

        return (
          <section
            key={section.id}
            className={`py-16 sm:py-20 lg:py-24 border-b border-[#EAEFF5] ${
              isEven ? "bg-[#F8FAFD]" : "bg-white"
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
                {/* Text Content Column */}
                <div
                  className={`flex flex-col items-start lg:col-span-6 ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0070E0] bg-[#EBF4FE] border border-[#BAD8FB]/60 mb-4">
                    {section.badge}
                  </span>

                  <h2 className="font-heading text-3xl sm:text-4xl md:text-[40px] font-bold tracking-tight text-[#0B1F4B] leading-[1.18] mb-5">
                    {section.title}
                  </h2>

                  <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed mb-6 font-normal">
                    {section.description}
                  </p>

                  {/* Bullet list */}
                  <div className="space-y-3 w-full mb-8">
                    {section.bullets.map((bullet: string, bIdx: number) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-[#EBF4FE] text-[#0070E0] flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-medium text-[#0B1F4B]">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>

                  <LandingButton
                    href={section.ctaHref}
                    variant={isImageLeft ? "secondary" : "primary"}
                    size="md"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    {section.ctaText}
                  </LandingButton>
                </div>

                {/* Illustration Column */}
                <div
                  className={`lg:col-span-6 ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {renderIllustration(section.illustrationType)}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
