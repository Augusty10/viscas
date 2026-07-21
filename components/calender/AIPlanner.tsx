"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  attendees: any[];
  meetLink: string;
  eventType?: string;
};

type PlannerResult = {
  summary: string;
  agenda: string[];
  checklist: string[];
  questions: string[];
  risks: string[];
};

type AIPlannerProps = {
  event: Event | null;
};

export default function AIPlanner({
  event,
}: AIPlannerProps) {
  const [loading, setLoading] = useState(false);

  const [plan, setPlan] =
    useState<PlannerResult | null>(null);

  const [error, setError] =
    useState("");

  const [appwriteId, setAppwriteId] = useState("");

  useEffect(() => {
    account
      .get()
      .then((u) => setAppwriteId(u.$id))
      .catch((err) => console.error("AIPlanner: Failed to load user ID:", err));
  }, []);

  async function generatePlan() {
    if (!event) return;

    try {
      setLoading(true);
      setError("");
      setPlan(null);

      const response = await fetch(
        "/api/ai/planner",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            event,
            appwriteId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to generate meeting plan."
        );
      }

      let parsed;

      try {
        parsed = JSON.parse(data.plan);
      } catch {
        throw new Error(
          "AI returned an invalid response."
        );
      }

      setPlan(parsed);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
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
              AI Meeting Planner
            </h2>

            <p className="text-sm text-slate-500">
              GPT-4o Mini
            </p>
          </div>
        </div>

        <button
          onClick={generatePlan}
          disabled={!event || loading}
          className="rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 disabled:opacity-50"
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

      {!event && (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          Select a meeting first.
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {plan && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">
              Summary
            </h3>

            <p className="mt-2 text-slate-600">
              {plan.summary}
            </p>
          </div>

          <Section
            title="Agenda"
            icon={<CalendarDays className="h-5 w-5 text-sky-600" />}
            items={plan.agenda}
          />

          <Section
            title="Checklist"
            icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
            items={plan.checklist}
          />

          <Section
            title="Questions"
            icon={<Sparkles className="h-5 w-5 text-violet-600" />}
            items={plan.questions}
          />

          <Section
            title="Risks"
            icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
            items={plan.risks}
          />
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  if (!items?.length) return null;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="font-semibold">
          {title}
        </h3>
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-2"
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}