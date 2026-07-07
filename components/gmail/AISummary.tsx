"use client";

import { Sparkles } from "lucide-react";

export default function AISummary() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-sky-600" />

        <h3 className="text-lg font-semibold">
          AI Summary
        </h3>
      </div>

      <p className="leading-7 text-slate-600">
        Google has invited you to the next interview round.
        The interview is scheduled for Monday at 11:00 AM IST.
        You should confirm your availability by replying to this email.
      </p>

      <div className="mt-5 rounded-2xl bg-sky-50 p-4">
        <p className="text-sm font-medium text-sky-700">
          💡 AI Recommendation
        </p>

        <p className="mt-2 text-sm text-slate-600">
          Reply today to confirm your interview schedule.
        </p>
      </div>
    </div>
  );
}