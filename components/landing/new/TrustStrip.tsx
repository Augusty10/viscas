import React from "react";
import { LANDING_CONTENT, TrustBadge, PartnerLogo } from "@/lib/landing-data";
import { ShieldCheck, Lock, Award, CheckCircle } from "lucide-react";

export default function TrustStrip() {
  const { heading, badges, partners } = LANDING_CONTENT.trustStrip;

  const renderIcon = (name: TrustBadge["iconName"]) => {
    switch (name) {
      case "checkCircle":
        return <CheckCircle className="h-5 w-5 text-[#0070E0]" />;
      case "lock":
        return <Lock className="h-5 w-5 text-emerald-600" />;
      case "shield":
        return <ShieldCheck className="h-5 w-5 text-[#0B1F4B]" />;
      case "award":
        return <Award className="h-5 w-5 text-amber-500" />;
      default:
        return <ShieldCheck className="h-5 w-5 text-[#0070E0]" />;
    }
  };

  return (
    <section
      id="security"
      className="bg-white py-12 sm:py-16 border-b border-[#EAEFF5]"
      aria-label="Security and Trust Standards"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Security Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge: TrustBadge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#F8FAFD] border border-[#E9EEF5] hover:border-[#BAD8FB] transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs border border-slate-100">
                {renderIcon(badge.iconName)}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-[#0B1F4B] truncate">
                  {badge.label}
                </div>
                <div className="text-[11px] text-[#64748B] truncate">
                  {badge.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos Strip */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6 text-center">
            {heading}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 hover:opacity-100 transition-opacity">
            {partners.map((partner: PartnerLogo) => (
              <div
                key={partner.name}
                className="flex items-center gap-2 text-slate-600 hover:text-[#0B1F4B] transition-colors font-heading font-extrabold tracking-wider text-sm sm:text-base cursor-default select-none"
              >
                <div className="h-6 w-6 rounded-md bg-slate-200/80 flex items-center justify-center text-[10px] font-mono font-bold text-slate-700">
                  {partner.symbol.slice(0, 2)}
                </div>
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
