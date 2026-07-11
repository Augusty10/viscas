"use client";

import { useEffect, useState } from "react";
import { Mail, CalendarDays, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Container from "../common/Container";
import Section from "../common/Section";
import { motion, AnimatePresence } from "framer-motion";

const productFeatures = [
  {
    id: "gmail",
    title: "AI Email Assistant",
    tabLabel: "Gmail Integration",
    shortDesc: "Manage emails effortlessly with real-time sync.",
    icon: Mail,
    colorClass: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    activeColorClass: "border-sky-500 bg-sky-50 text-sky-700",
    bullets: [
      "Real-time Gmail inbox synchronization",
      "Automatic smart replies drafted by AI",
      "Priority inbox categorization for urgent messages",
      "One-click mailing list subscription cancellation",
    ],
    explanation:
      "Viscas connects directly with your Gmail account using secure OAuth. Instead of drowning in spam, our AI models analyze incoming mail metadata to compile concise bullet-point digests, mark urgent tasks, and draft pre-written responses you can send instantly.",
  },
  {
    id: "calendar",
    title: "Smart Calendar Planner",
    tabLabel: "Google Calendar",
    shortDesc: "Organize your schedule and agenda.",
    icon: CalendarDays,
    colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    activeColorClass: "border-emerald-500 bg-emerald-50 text-emerald-700",
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
    colorClass: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    activeColorClass: "border-violet-500 bg-violet-50 text-violet-700",
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

  // Auto-rotating timer
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % productFeatures.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const activeFeature = productFeatures[activeIndex];
  const ActiveIcon = activeFeature.icon;

  return (
    <Section id="features">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
            Interactive Tour
          </p>

          <h2
            className="mt-4 text-4xl font-bold lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            One Workspace.
            <br />
            Infinite Productivity.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Explore how Viscas brings your communications, schedules, and AI intelligence under one beautiful dashboard.
          </p>
        </div>

        {/* Tab Scroller / Rotator Layout */}
        <div 
          className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: Tab Selectors & Explanations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col gap-2.5">
              {productFeatures.map((feat, index) => {
                const FeatIcon = feat.icon;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-center gap-4 w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? `${feat.activeColorClass} shadow-md scale-[1.01]`
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${feat.colorClass}`}>
                      <FeatIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-sm tracking-tight">{feat.tabLabel}</h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{feat.shortDesc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feature Description Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-sky-600">
                    <ActiveIcon className="h-5 w-5" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Product Module
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800">
                    {activeFeature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeFeature.explanation}
                  </p>

                  <div className="border-t border-slate-100 my-4 pt-4" />

                  <div className="grid grid-cols-1 gap-2">
                    {activeFeature.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="h-4.5 w-4.5 text-sky-500 shrink-0" />
                        <span className="text-xs font-semibold">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: "Side Picture" (Dynamic Mockups) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl p-6 relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              {/* Outer decorative items */}
              <div className="absolute top-0 right-0 h-40 w-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Dynamic Mockup Content */}
              <AnimatePresence mode="wait">
                {activeFeature.id === "gmail" && (
                  <motion.div
                    key="gmail-mockup"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 flex-1 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold text-slate-400">AI Mail Inbox</span>
                    </div>

                    <div className="space-y-3 flex-1 py-4">
                      {/* Email Mock 1 */}
                      <div className="rounded-xl border border-slate-700/40 bg-slate-800/40 p-3 hover:bg-slate-800/80 transition cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-sky-400">Google Calendar</span>
                          <span className="rounded-full bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[9px] font-bold text-sky-400">Sync Success</span>
                        </div>
                        <p className="text-sm font-bold text-white mt-1">Weekly Sync & Agenda Details</p>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">Your calendar agenda blocks are ready for overview...</p>
                      </div>

                      {/* Email Mock 2 */}
                      <div className="rounded-xl border border-slate-700/40 bg-slate-800/40 p-3 hover:bg-slate-800/80 transition cursor-pointer relative overflow-hidden">
                        <div className="absolute right-0 top-0 bg-violet-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl-lg">AI Summarized</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-violet-400">Viscas Newsletter</span>
                          <span className="text-[10px] text-slate-500 mr-12">10:42 AM</span>
                        </div>
                        <p className="text-sm font-bold text-white mt-1">AI Co-Pilot updates</p>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">Summary: 3 new templates added, performance boost is live...</p>
                      </div>

                      {/* Email Mock 3 */}
                      <div className="rounded-xl border border-slate-700/40 bg-slate-800/40 p-3 hover:bg-slate-800/80 transition cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-red-400">Acme Corporation</span>
                          <span className="rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-[9px] font-bold text-red-400">Urgent</span>
                        </div>
                        <p className="text-sm font-bold text-white mt-1">Project Alignment Deliverables</p>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">Action: Need approvals on dashboard layout designs...</p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-850 p-2 text-center text-xs font-semibold text-slate-400 border border-slate-700/30">
                      ⚡ Automatically syncs with Google OAuth
                    </div>
                  </motion.div>
                )}

                {activeFeature.id === "calendar" && (
                  <motion.div
                    key="calendar-mockup"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 flex-1 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold text-slate-400">Google Calendar</span>
                    </div>

                    <div className="space-y-4 flex-1 py-4">
                      {/* Calendar Event Item 1 */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 text-right shrink-0">
                          <p className="text-sm font-bold text-white">10:00</p>
                          <p className="text-xs text-slate-400">AM</p>
                        </div>
                        <div className="flex-1 rounded-2xl border-l-4 border-sky-500 bg-sky-500/10 p-3.5">
                          <p className="text-sm font-bold text-white">Design Alignment Sync</p>
                          <p className="text-xs text-slate-400 mt-1">📍 Figma Board Workspace</p>
                          <div className="flex gap-1.5 mt-2.5">
                            <span className="h-5 w-5 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-[9px]">D</span>
                            <span className="h-5 w-5 rounded-full bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-[9px]">+2</span>
                          </div>
                        </div>
                      </div>

                      {/* Calendar Event Item 2 */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 text-right shrink-0">
                          <p className="text-sm font-bold text-white">02:30</p>
                          <p className="text-xs text-slate-400">PM</p>
                        </div>
                        <div className="flex-1 rounded-2xl border-l-4 border-emerald-500 bg-emerald-500/10 p-3.5">
                          <div className="flex justify-between items-start gap-2">
                            <p className="text-sm font-bold text-white">AI Co-Pilot Planning</p>
                            <span className="rounded-full bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5">Google Meet</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Drafting meeting brief details...</p>
                          <button className="mt-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition text-[10px] font-bold text-white px-3 py-1.5 flex items-center gap-1">
                            <span>Join Google Meet</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-850 p-2 text-center text-xs font-semibold text-slate-400 border border-slate-700/30">
                      📅 Auto-generated Daily Brief outline ready every morning
                    </div>
                  </motion.div>
                )}

                {activeFeature.id === "ai" && (
                  <motion.div
                    key="ai-mockup"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 flex-1 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold text-slate-400">Viscas AI Co-Pilot</span>
                    </div>

                    <div className="space-y-3 flex-1 py-4 text-xs">
                      {/* User message */}
                      <div className="flex gap-3 justify-end">
                        <div className="rounded-2xl rounded-tr-none bg-sky-500 text-white p-3 max-w-[80%] font-medium">
                          Can you summarize my important emails from this morning?
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex gap-3">
                        <div className="h-7 w-7 rounded-xl bg-violet-600 text-white font-bold flex items-center justify-center shrink-0">✨</div>
                        <div className="rounded-2xl rounded-tl-none bg-slate-800 border border-slate-750 text-slate-200 p-3 max-w-[80%] space-y-2 leading-relaxed">
                          <p className="font-bold text-white">Generating Morning Brief...</p>
                          <p>You have 3 urgent items:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li><span className="text-sky-400 font-semibold">Acme Project</span>: Requesting approvals.</li>
                            <li><span className="text-emerald-400 font-semibold">Weekly Sync</span>: Scheduled at 10:00 AM.</li>
                          </ul>
                          <p className="text-[10px] text-violet-400 mt-2 font-bold">⚡ Pre-written reply drafts generated.</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        placeholder="Ask Viscas AI Co-Pilot..."
                        className="h-10 w-full rounded-xl border border-slate-750 bg-slate-800 pl-4 pr-10 text-xs text-slate-300 outline-none placeholder:text-slate-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-400 text-[10px] font-bold">Send</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="mt-24 flex flex-wrap justify-center gap-4">
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            ✓ Unified Workspace
          </span>

          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            ✓ AI Powered
          </span>

          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            ✓ Secure Authentication
          </span>

          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            ✓ Productivity First
          </span>
        </div>
      </Container>
    </Section>
  );
}