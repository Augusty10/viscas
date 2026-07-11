"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

type Props = {
  emails?: any[];
  events?: any[];
};

export default function AIAssistant({
  emails = [],
  events = [],
}: Props) {
  const [loading, setLoading] = useState(false);

  const [brief, setBrief] = useState("");

  async function generateBrief() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/ai/brief",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            emails: JSON.stringify(emails),

            calendar: JSON.stringify(events),
          }),
        }
      );

      const data = await response.json();

      setBrief(data.brief);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-violet-600" />

          <div>
            <h2 className="font-semibold">
              AI Daily Brief
            </h2>

            <p className="text-sm text-slate-500">
              GPT-4o Mini
            </p>
          </div>
        </div>

        <button
          onClick={generateBrief}
          className="rounded-xl bg-violet-600 px-4 py-2 text-white"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Generate"
          )}
        </button>
      </div>

      {brief ? (
        <div className="prose prose-sm max-w-none whitespace-pre-wrap">
          {brief}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-8 text-center text-slate-500">
          Generate today's AI productivity brief.
        </div>
      )}
    </div>
  );
}