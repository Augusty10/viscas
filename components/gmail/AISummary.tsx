"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ListTodo,
} from "lucide-react";

type AISummaryProps = {
  email: string;
};

type SummaryResult = {
  summary: string;
  priority: "High" | "Medium" | "Low";
  actionItems: string[];
  importantDates: string[];
};

export default function AISummary({
  email,
}: AISummaryProps) {
  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<SummaryResult | null>(null);

  const [error, setError] =
    useState("");

  const [appwriteId, setAppwriteId] = useState("");

  useEffect(() => {
    account
      .get()
      .then((u) => setAppwriteId(u.$id))
      .catch((err) => console.error("AISummary: Failed to load user ID:", err));
  }, []);

  async function generateSummary() {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch(
        "/api/ai/summary",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            appwriteId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to generate summary"
        );
      }

      // OpenAI currently returns JSON as text
      const parsed = JSON.parse(data.summary);

      setResult(parsed);
    } catch (err: any) {
      console.error(err);

      setError(
        err.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-100 p-2">
            <Sparkles className="h-5 w-5 text-violet-600" />
          </div>

          <div>
            <h2 className="font-semibold">
              AI Summary
            </h2>

            <p className="text-sm text-slate-500">
              GPT-4o Mini
            </p>
          </div>
        </div>

        <button
          onClick={generateSummary}
          disabled={loading}
          className="rounded-xl bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-700 disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </span>
          ) : (
            "Generate"
          )}
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}

      {!loading &&
        !result &&
        !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <Sparkles className="mx-auto mb-3 h-8 w-8 text-violet-500" />

            <p className="font-medium">
              Generate AI Summary
            </p>

            <p className="mt-2 text-sm text-slate-500">
              AI will analyze this email
              and extract the most
              important information.
            </p>
          </div>
        )}

      {/* Result */}

      {result && (
        <div className="space-y-6">
          {/* Summary */}

          <div>
            <h3 className="mb-2 font-semibold">
              Summary
            </h3>

            <p className="leading-7 text-slate-600">
              {result.summary}
            </p>
          </div>

          {/* Priority */}

          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-orange-500" />

            <span className="font-medium">
              Priority:
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                result.priority ===
                "High"
                  ? "bg-red-100 text-red-600"
                  : result.priority ===
                    "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {result.priority}
            </span>
          </div>

          {/* Action Items */}

          <div>
            <div className="mb-3 flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-sky-600" />

              <h3 className="font-semibold">
                Action Items
              </h3>
            </div>

            <ul className="space-y-2">
              {result.actionItems.map(
                (item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 text-green-500" />

                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Dates */}

          {result.importantDates
            .length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-violet-600" />

                <h3 className="font-semibold">
                  Important Dates
                </h3>
              </div>

              <ul className="space-y-2">
                {result.importantDates.map(
                  (date, index) => (
                    <li
                      key={index}
                    >
                      • {date}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}