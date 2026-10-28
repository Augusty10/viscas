"use client";

import React, { useState } from "react";
import { LANDING_CONTENT, TabFeature } from "@/lib/landing-data";
import LandingSection from "./LandingSection";
import LandingCard from "./LandingCard";
import {
  Inbox,
  Calendar,
  FileText,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

export default function TabbedShowcase() {
  const { badge, title, subtitle, tabs } = LANDING_CONTENT.everythingYouNeed;
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const renderIcon = (id: string, active: boolean) => {
    const iconClass = `h-4 w-4 ${active ? "text-white" : "text-[#0070E0]"}`;
    switch (id) {
      case "inbox":
        return <Inbox className={iconClass} />;
      case "calendar":
        return <Calendar className={iconClass} />;
      case "summaries":
        return <FileText className={iconClass} />;
      case "subscriptions":
        return <CreditCard className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const renderVisual = (type: TabFeature["mockupType"]) => {
    switch (type) {
      case "inbox":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-xs font-bold text-[#0B1F4B]">Urgent Actions (3)</span>
              </div>
              <span className="text-[11px] font-semibold text-[#0070E0] bg-[#EBF4FE] px-2.5 py-0.5 rounded-full">
                AI Filter Active
              </span>
            </div>

            {/* Email Row 1 */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-full bg-[#0B1F4B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  MC
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0B1F4B] truncate">
                    Meridian Capital · Q3 Term Sheet
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    &quot;Please review updated valuation clause before 5 PM EST&quot;
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md shrink-0 border border-amber-200">
                High Priority
              </span>
            </div>

            {/* Email Row 2 */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-full bg-[#0070E0] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  PL
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0B1F4B] truncate">
                    Product Lead · API Schema Rollout
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    &quot;Migration completed with zero downtime. Summary attached.&quot;
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md shrink-0 border border-emerald-200">
                FYI · Read
              </span>
            </div>

            {/* AI Action pill */}
            <div className="p-3 rounded-xl bg-[#EBF4FE] border border-[#BAD8FB] flex items-center justify-between text-xs text-[#0B1F4B]">
              <span className="font-semibold">32 low-priority promotional emails swept to Daily Digest</span>
              <span className="font-bold text-[#0070E0]">View Digest →</span>
            </div>
          </div>
        );

      case "calendar":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#0070E0]" />
                <span className="text-xs font-bold text-[#0B1F4B]">Smart Booking Engine</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Google Calendar Live
              </span>
            </div>

            {/* Slot cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-white border border-[#0070E0] shadow-xs">
                <div className="text-[11px] font-bold text-[#0070E0]">Thursday · Oct 30</div>
                <div className="text-sm font-extrabold text-[#0B1F4B] mt-0.5">2:00 PM - 2:45 PM</div>
                <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 15 min buffer preserved
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-600">Friday · Oct 31</div>
                <div className="text-sm font-extrabold text-[#0B1F4B] mt-0.5">10:30 AM - 11:15 AM</div>
                <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Auto-converted to attendee TZ
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E2E8F0] text-xs text-[#4A5568]">
              <div className="font-bold text-[#0B1F4B] mb-1">Autonomous Double-Booking Defense</div>
              Google Calendar, Zoom, and Outlook schedules cross-referenced in real-time. Zero scheduling conflicts.
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-[#0B1F4B]">Thread: Enterprise Cloud Migration (18 replies)</span>
              <span className="text-[10px] bg-sky-100 text-[#0070E0] px-2 py-0.5 rounded-full font-bold">
                18 msgs → 3 bullets
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
                <div className="text-[11px] font-bold text-[#0070E0]">1. Key Decision</div>
                <p className="text-xs text-[#0B1F4B] mt-0.5">
                  VP Infrastructure approved US-East cutover for Sunday at midnight.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
                <div className="text-[11px] font-bold text-amber-600">2. Pending Action Owner</div>
                <p className="text-xs text-[#0B1F4B] mt-0.5">
                  Legal must countersign SLA amendment by Friday 4 PM (Assigned to you).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
                <div className="text-[11px] font-bold text-emerald-600">3. Financial Impact</div>
                <p className="text-xs text-[#0B1F4B] mt-0.5">
                  Total revised annual contract value verified at $84,200.
                </p>
              </div>
            </div>
          </div>
        );

      case "subscriptions":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-[#0B1F4B]">Automated SaaS Audit</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <TrendingDown className="h-3.5 w-3.5" />
                $310/mo identified savings
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0B1F4B]">Figma Enterprise (2 unused seats)</div>
                  <div className="text-[10px] text-slate-500">Renews on Nov 14 · $90/mo</div>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                >
                  Downgrade
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0B1F4B]">Notion Team Workspace</div>
                  <div className="text-[10px] text-slate-500">Renews on Dec 01 · $20/mo</div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Active Use
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFD] border border-[#E2E8F0] text-xs text-slate-600">
              All tax invoices and PDF receipts gathered into a single exportable folder automatically.
            </div>
          </div>
        );
    }
  };

  return (
    <LandingSection
      id="solutions"
      badge={badge}
      title={title}
      subtitle={subtitle}
      background="light"
    >
      {/* Tab Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
        {tabs.map((tab: TabFeature) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabId(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0] select-none ${
                isActive
                  ? "bg-[#0070E0] text-white shadow-[0_4px_14px_rgba(0,112,224,0.3)] scale-[1.02]"
                  : "bg-white text-[#0B1F4B] hover:bg-slate-100 border border-[#E2E8F0]"
              }`}
            >
              {renderIcon(tab.id, isActive)}
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Panel */}
      <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-[0_16px_40px_-8px_rgba(11,31,75,0.08)]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Bullets (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0] mb-2">
              {activeTab.title}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B1F4B] leading-snug mb-4">
              {activeTab.subtitle}
            </h3>
            <p className="text-base text-[#4A5568] leading-relaxed mb-6">
              {activeTab.description}
            </p>

            {/* Highlights List */}
            <div className="space-y-3 w-full mb-8">
              {activeTab.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#EBF4FE] text-[#0070E0] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-[#0B1F4B]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0070E0] hover:text-[#0058B6] transition-colors group"
            >
              <span>Explore this capability in Viscas</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column: Visual Mockup (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] p-5 sm:p-6 shadow-[0_8px_24px_-4px_rgba(11,31,75,0.06)]">
              {renderVisual(activeTab.mockupType)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
