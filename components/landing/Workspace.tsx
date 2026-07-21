"use client";

import { useEffect, useState } from "react";
import { Mail, Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const productFeatures = [
  {
    id: "gmail",
    title: "AI Email Assistant",
    tabLabel: "Gmail Integration",
    shortDesc: "Manage emails effortlessly with real-time sync.",
    icon: Mail,
    bullets: [
      "Real-time Gmail inbox synchronization",
      "Automatic smart replies drafted by AI",
      "Priority inbox categorization for urgent messages",
      "One-click mailing list unsubscribes",
    ],
    explanation:
      "Viscas connects to Gmail over secure OAuth. Instead of scanning every message yourself, the AI reads incoming mail, compiles a short digest, flags what's urgent, and drafts replies you can send in one click.",
  },
  {
    id: "calendar",
    title: "Smart Calendar Planner",
    tabLabel: "Google Calendar",
    shortDesc: "Organize your schedule and agenda.",
    icon: Calendar,
    bullets: [
      "Continuous Google Calendar sync",
      "Interactive agenda scheduling widgets",
      "AI-compiled morning schedule briefs",
      "Google Meet link integration and alerts",
    ],
    explanation:
      "Keep track of meetings and event blocks automatically. The Smart Calendar analyzes your availability and generates daily agenda summaries. With direct integration, planning a meeting, coordinating with team members, and joining Google Meet links is a single-click experience.",
  },
  {
    id: "ai",
    title: "AI Co-Pilot & Assistant",
    tabLabel: "AI Agent Co-Pilot",
    shortDesc: "Ask questions, write mail drafts, and plan your day.",
    icon: Sparkles,
    bullets: [
      "Conversational AI Chat Assistant",
      "Search and answer questions across all emails",
      "Draft customized outlines and meeting details",
      "Intelligent daily planner suggestions",
    ],
    explanation:
      "Our AI Assistant serves as your workspace co-pilot. Open the assistant overlay to ask questions like 'What did Acme update me on this morning?', draft long-form email replies, sync new calendar schedules, or compile comprehensive brief reports instantly.",
  },
];

export default function Workspace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % productFeatures.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeFeature = productFeatures[activeIndex];

  return (
    <section className="bg-mist py-24 border-b border-line" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-14">
          <span className="font-heading text-[12.5px] font-bold tracking-[0.14em] text-forest-600 uppercase">
            Interactive Tour
          </span>
          <h2 className="font-heading mt-3 text-[38px] font-bold leading-tight tracking-tight text-ink sm:text-[44px]">
            One workspace. Infinite productivity.
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Explore how Viscas brings your communications, schedules, and AI intelligence under one dashboard.
          </p>
        </div>

        {/* Tour Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: Vertical Tabs & Description Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Tab Selectors */}
            <div className="flex flex-col gap-3 w-full">
              {productFeatures.map((feat, index) => {
                const FeatIcon = feat.icon;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-start gap-[18px] w-full rounded-[12px] border p-[18px] text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "border-sky-500 bg-sky-50 shadow-sm scale-[1.01]"
                        : "border-line bg-white hover:border-forest-600/30 hover:bg-mist/30 text-ink"
                    }`}
                  >
                    <div
                      className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[9px] transition-colors duration-200 ${
                        isActive
                          ? "bg-sky-500 text-pine-950"
                          : "bg-forest-800 text-sky-300"
                      }`}
                    >
                      <FeatIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading text-[15.5px] font-bold tracking-tight mb-0.5">
                        {feat.tabLabel}
                      </h4>
                      <p className="text-[13px] text-ink-soft leading-normal font-medium">
                        {feat.shortDesc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Description Card */}
            <div className="rounded-[16px] border border-line bg-white p-6 shadow-sm min-h-[270px] text-ink">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="font-heading text-[19px] font-bold text-ink">
                    {activeFeature.title}
                  </h3>

                  <p className="text-[13.5px] text-ink-soft leading-relaxed">
                    {activeFeature.explanation}
                  </p>

                  <div className="border-t border-line my-4 pt-4" />

                  <ul className="space-y-2.5">
                    {activeFeature.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-[13px] text-ink">
                        <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span className="font-semibold text-ink-soft">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Simulator Mockup Area */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full bg-pine-950 rounded-[16px] p-6 text-white shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between border border-white/6">
              {/* Outer decorative blur items */}
              <div className="absolute top-0 right-0 h-40 w-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-forest-600/10 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 flex-1 flex flex-col justify-between z-10"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#EF6E5B]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F2B807]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]" />
                    </div>
                    <span className="text-[11px] font-bold text-white/50 font-mono select-none">viscas.com/dashboard</span>
                  </div>

                  {/* Simulator Mockup Content */}
                  <div className="flex-1 py-2">
                    {activeFeature.id === "gmail" && (
                      <div className="space-y-2.5 text-xs text-left">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">AI Mail Simulator</span>
                          <span className="text-[9px] text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded font-mono">Real-time sync</span>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 hover:bg-white/10 transition cursor-pointer">
                          <div className="flex justify-between items-center text-white/50">
                            <span className="font-bold text-sky-400">Google Calendar</span>
                            <span>11:15 AM</span>
                          </div>
                          <p className="font-bold text-white mt-1">Weekly Sync & Agenda Details</p>
                          <p className="text-white/60 line-clamp-1 mt-0.5">Your calendar agenda blocks are ready for overview...</p>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 hover:bg-white/10 transition cursor-pointer relative overflow-hidden">
                          <div className="absolute right-0 top-0 bg-sky-500 text-pine-950 text-[8px] font-bold px-2 py-0.5 rounded-bl">AI Summarized</div>
                          <div className="flex justify-between items-center text-white/50">
                            <span className="font-bold text-sky-400">Viscas Newsletter</span>
                            <span>10:42 AM</span>
                          </div>
                          <p className="font-bold text-white mt-1">AI Co-Pilot updates</p>
                          <p className="text-white/60 line-clamp-1 mt-0.5">Summary: 3 new templates added, performance boost is live...</p>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 hover:bg-white/10 transition cursor-pointer">
                          <div className="flex justify-between items-center text-white/50">
                            <span className="font-bold text-red-400">Acme Corporation</span>
                            <span className="text-[9px] font-bold bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">Urgent</span>
                          </div>
                          <p className="font-bold text-white mt-1">Project Alignment Deliverables</p>
                          <p className="text-white/60 line-clamp-1 mt-0.5">Action: Need approvals on dashboard layout designs...</p>
                        </div>
                      </div>
                    )}

                    {activeFeature.id === "calendar" && (
                      <div className="space-y-3 text-xs text-left">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">Calendar Agenda Simulator</span>
                          <span className="text-[9px] text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded font-mono">Today&apos;s Schedule</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 text-right shrink-0">
                            <p className="font-bold text-white">10:00</p>
                            <p className="text-[10px] text-white/45">AM</p>
                          </div>
                          <div className="flex-1 rounded-lg border-l-4 border-sky-500 bg-sky-500/10 p-2.5">
                            <p className="font-bold text-white">Design Alignment Sync</p>
                            <p className="text-[10px] text-white/50 mt-0.5">📍 Figma Board Workspace</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 text-right shrink-0">
                            <p className="font-bold text-white">02:30</p>
                            <p className="text-[10px] text-white/45">PM</p>
                          </div>
                          <div className="flex-1 rounded-lg border-l-4 border-emerald-500 bg-emerald-500/10 p-2.5">
                            <div className="flex justify-between items-start gap-1.5">
                              <p className="font-bold text-white">AI Co-Pilot Planning</p>
                              <span className="rounded bg-emerald-500 text-pine-950 text-[8px] font-bold px-1.5 py-0.5">Google Meet</span>
                            </div>
                            <p className="text-[10px] text-white/50 mt-1">Drafting meeting brief details...</p>
                            <button className="mt-2.5 rounded bg-emerald-600 hover:bg-emerald-700 transition text-[9px] font-bold text-white px-2 py-1 flex items-center gap-1 cursor-pointer">
                              <span>Join Google Meet</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeFeature.id === "ai" && (
                      <div className="space-y-3.5 text-xs text-left">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">Viscas AI Co-Pilot Console</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>

                        <div className="space-y-2.5">
                          <div className="flex gap-2 justify-end">
                            <div className="rounded-lg rounded-tr-none bg-sky-500 text-pine-950 px-3 py-2 max-w-[85%] font-medium text-[11px]">
                              Can you summarize my important emails from this morning?
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div className="h-6 w-6 rounded bg-sky-500 text-pine-950 font-bold flex items-center justify-center shrink-0 text-[10px]">✨</div>
                            <div className="rounded-lg rounded-tl-none bg-white/5 border border-white/10 text-white/90 px-3 py-2 max-w-[85%] space-y-1.5 text-[11px]">
                              <p className="font-bold text-white">Generating Morning Brief...</p>
                              <p>You have 3 urgent items:</p>
                              <ul className="list-disc pl-3.5 space-y-0.5 text-white/80">
                                <li><span className="text-sky-300 font-semibold">Acme Project</span>: Requesting approvals.</li>
                                <li><span className="text-emerald-300 font-semibold">Weekly Sync</span>: Scheduled at 10:00 AM.</li>
                              </ul>
                              <p className="text-[9px] text-[#38BDF8] mt-1 font-bold">⚡ Pre-written reply drafts generated.</p>
                            </div>
                          </div>
                        </div>

                        <div className="relative mt-2">
                          <input
                            type="text"
                            readOnly
                            placeholder="Ask Viscas AI Co-Pilot..."
                            className="h-[34px] w-full rounded-lg border border-white/10 bg-white/5 pl-3 pr-10 text-[11px] text-white outline-none placeholder:text-white/40 select-none pointer-events-none"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-400 text-[10px] font-bold">Send</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="mt-20 flex flex-wrap justify-center gap-3">
          {["Unified Workspace", "AI Powered", "Secure Authentication", "Productivity First"].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-forest-800 shadow-sm"
            >
              ✓ {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}