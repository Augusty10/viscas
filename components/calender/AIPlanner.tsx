"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

import { CalendarEvent } from "./EventList";

type AIPlannerProps = {
  event: CalendarEvent | null;
};

export default function AIPlanner({
  event,
}: AIPlannerProps) {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generatePlan() {
    if (!event) return;

    setLoading(true);

    try {
      // Sprint 07
      // Replace with Corsair/OpenAI API

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const generatedPlan = `
📅 Event: ${event.title}

🎯 Objective
Attend and complete the meeting successfully.

📍 Location
${event.location || "Not specified"}

👥 Attendees
${event.attendees.length}

📝 Preparation
• Review related emails
• Open required documents
• Join 5 minutes early
• Prepare discussion points
• Keep notes ready

✅ Suggested Action
Finish pending work before this meeting.
`;

      setPlan(generatedPlan);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function copyPlan() {
    if (!plan) return;

    await navigator.clipboard.writeText(plan);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-violet-100 p-2">
          <Sparkles className="h-5 w-5 text-violet-600" />
        </div>

        <div>
          <h2 className="font-semibold">
            AI Planner
          </h2>

          <p className="text-sm text-slate-500">
            Prepare for your meeting
          </p>
        </div>
      </div>

      {!event ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Select an event first.
        </div>
      ) : (
        <>
          <button
            onClick={generatePlan}
            disabled={loading}
            className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Plan
              </>
            )}
          </button>

          <div className="min-h-[220px] whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            {plan || "Click Generate Plan"}
          </div>

          {plan && (
            <button
              onClick={copyPlan}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 transition hover:bg-slate-100"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Plan
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}