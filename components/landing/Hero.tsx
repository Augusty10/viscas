import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Mail, CheckCircle2, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white py-16 sm:py-20 lg:py-28"
      style={{
        background: "radial-gradient(ellipse 120% 80% at 50% -10%, #12432F 0%, #061B14 80%)",
      }}
    >
      {/* Background growth rings - constrained to avoid horizontal overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[600px] lg:h-[600px] opacity-40"
          viewBox="0 0 640 640"
          aria-hidden="true"
        >
          <circle
            className="animate-spin-slow"
            cx="320"
            cy="320"
            r="300"
            stroke="#1C5A44"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
            strokeDasharray="2 10"
            style={{ transformOrigin: "320px 320px" }}
          />
          <circle
            cx="320"
            cy="320"
            r="240"
            stroke="#1C5A44"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <circle
            className="animate-spin-slow-rev"
            cx="320"
            cy="320"
            r="180"
            stroke="#0EA5E9"
            strokeWidth="1"
            fill="none"
            opacity="0.35"
            strokeDasharray="1 8"
            style={{ transformOrigin: "320px 320px" }}
          />
          <circle
            cx="320"
            cy="320"
            r="120"
            stroke="#0EA5E9"
            strokeWidth="1"
            fill="none"
            opacity="0.25"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Headline and Actions */}
          <div className="flex flex-col items-start text-left max-w-2xl w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-semibold text-sky-300 mb-6 backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              AI-Powered Workspace
            </div>

            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
              Your AI workspace for{" "}
              <span className="text-sky-400">email &amp; calendar</span>
            </h1>

            {/* Description - WCAG AA compliant text-white/85 */}
            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-xl font-normal">
              Viscas brings Gmail, Google Calendar, and an AI co-pilot into one calm dashboard — so your inbox stops running your day.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mb-8">
              <Button asChild size="lg" variant="default" className="w-full sm:w-auto font-bold shadow-md">
                <Link href="/login">Get Started Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 shadow-xs"
              >
                <Link href="/login" className="flex items-center justify-center gap-2">
                  <Play className="h-4 w-4 fill-white" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Trust Line - High contrast WCAG AA compliant text */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-sky-400" />
                Free plan available
              </span>
              <span className="h-3.5 w-px bg-white/20" />
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-sky-400" />
                No credit card required
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Dashboard Mockup Preview */}
          <div className="relative w-full max-w-full mx-auto lg:max-w-none">
            {/* AI Drafting Floating Chip */}
            <div className="absolute -top-3.5 right-2 sm:right-6 z-20 animate-float-chip inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-bold text-slate-800 shadow-md">
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse-dot" />
              AI drafting a reply…
            </div>

            {/* Dashboard Mock Window */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 text-left w-full">
              {/* Window Chrome Header */}
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-3 border-b border-slate-200">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="ml-2.5 flex-1 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-600 font-mono select-none overflow-hidden text-ellipsis whitespace-nowrap">
                  viscas.com/dashboard
                </div>
              </div>

              {/* Dashboard Inner Body */}
              <div className="p-4 sm:p-5 text-slate-900 bg-slate-50/60">
                {/* Greeting banner */}
                <div className="rounded-xl p-3.5 sm:p-4 mb-4 text-white bg-gradient-to-r from-forest-700 to-sky-600 shadow-xs">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-sky-200 mb-0.5">
                    AI Productivity Workspace
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold">Good afternoon, Dhanraj 👋</h3>
                  <p className="text-xs text-white/85">Thursday, July 16 — here&apos;s your overview.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-4 sm:grid-cols-4">
                  <div className="border border-slate-200 rounded-xl p-2.5 sm:p-3 bg-white shadow-2xs min-w-0">
                    <span className="text-[9px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded-sm float-right">
                      LIVE
                    </span>
                    <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 mt-2 truncate">
                      201
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5 truncate">Unread</div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-2.5 sm:p-3 bg-white shadow-2xs min-w-0">
                    <span className="text-[9px] font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-sm float-right">
                      LIVE
                    </span>
                    <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 mt-2 truncate">
                      5
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5 truncate">Priority</div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-2.5 sm:p-3 bg-white shadow-2xs min-w-0">
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-sm float-right">
                      LIVE
                    </span>
                    <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 mt-2 truncate">
                      1
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5 truncate">Meetings</div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-2.5 sm:p-3 bg-white shadow-2xs min-w-0">
                    <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 mt-2 truncate">
                      202
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5 truncate">Insights</div>
                  </div>
                </div>

                {/* Priority Inbox Mini List */}
                <div className="border border-slate-200 rounded-xl p-3 sm:p-3.5 bg-white shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-sky-600" />
                      Priority Inbox
                    </h4>
                    <span className="text-[11px] font-semibold text-sky-600">Synced</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-slate-800 truncate pr-2">Acme Corporation Contract</span>
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-slate-800 truncate pr-2">Viscas Weekly Digest</span>
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
                    </div>
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