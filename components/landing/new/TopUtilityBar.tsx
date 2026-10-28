import React from "react";
import Link from "next/link";
import { LANDING_CONTENT } from "@/lib/landing-data";
import { Globe, ShieldCheck } from "lucide-react";

export default function TopUtilityBar() {
  const { modes, links } = LANDING_CONTENT.utilityBar;

  return (
    <div className="w-full bg-[#071533] text-slate-300 text-[11px] sm:text-xs font-medium border-b border-white/10 hidden md:block select-none">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Segment: User types */}
        <div className="flex items-center gap-1">
          {modes.map((mode) => (
            <Link
              key={mode.label}
              href={mode.href}
              className={`px-3 py-1 rounded-full transition-colors ${
                mode.active
                  ? "bg-white/15 text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {mode.label}
            </Link>
          ))}
        </div>

        {/* Right Segment: Utility links */}
        <div className="flex items-center gap-5">
          <Link
            href={links[0].href}
            className="text-slate-300 hover:text-white transition-colors"
          >
            {links[0].label}
          </Link>
          <Link
            href={links[1].href}
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            {links[1].label}
          </Link>
          <div className="h-3 w-px bg-white/20" />
          <div className="inline-flex items-center gap-1.5 text-slate-300 cursor-pointer hover:text-white transition-colors">
            <Globe className="h-3.5 w-3.5" />
            <span>{links[2].label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
