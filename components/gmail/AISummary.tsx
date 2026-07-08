"use client";

import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { useState } from "react";

type AISummaryProps = {
  email?: {
    subject: string;
    body: string;
  } | null;
};

export default function AISummary({
  email,
}: AISummaryProps) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    if (!email) return;

    setLoading(true);

    try {
      // Sprint 07: Replace with Corsair AI API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const text =
        email.body.length > 350
          ? email.body.substring(0, 350) + "..."
          : email.body;

      setSummary(text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copySummary = async () => {
    if (!summary) return;

    await navigator.clipboard.writeText(summary);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-sky-100 p-2">
          <Sparkles className="h-5 w-5 text-sky-600" />
        </div>

        <div>
          <h2 className="font-semibold">
            AI Summary
          </h2>

          <p className="text-sm text-slate-500">
            Summarize the selected email
          </p>
        </div>
      </div>

      {!email ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Select an email first.
        </div>
      ) : (
        <>
          <button
            onClick={generateSummary}
            disabled={loading}
            className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Summary
              </>
            )}
          </button>

          <div className="min-h-[180px] rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            {summary || "Click Generate Summary"}
          </div>

          {summary && (
            <button
              onClick={copySummary}
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
                  Copy Summary
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}