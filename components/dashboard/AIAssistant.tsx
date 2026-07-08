"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Loader2,
  Mail,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import {
  getUnreadEmailCount,
  getImportantEmails,
} from "@/lib/gmail";
import { getEvents } from "@/lib/calendar";

type Insight = {
  title: string;
  description: string;
  type: "email" | "calendar" | "ai";
};

export default function AIAssistant() {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    async function loadInsights() {
      try {
        const token = localStorage.getItem(
          "google_access_token"
        );

        if (!token) {
          setLoading(false);
          return;
        }

        const unread = await getUnreadEmailCount(token);

        const important =
          await getImportantEmails(token);

        const calendar = await getEvents(token);

        const data: Insight[] = [];

        // Gmail Insights
        if (unread > 0) {
          data.push({
            type: "email",
            title: `${unread} unread emails`,
            description:
              "Review unread emails to keep your inbox up to date.",
          });
        }

        if (
          important.resultSizeEstimate &&
          important.resultSizeEstimate > 0
        ) {
          data.push({
            type: "email",
            title: `${important.resultSizeEstimate} important emails`,
            description:
              "Priority emails need your attention.",
          });
        }

        // Calendar Insights
        const today = new Date();

        const todayMeetings =
          calendar.items?.filter((event: any) => {
            const start = new Date(
              event.start?.dateTime ??
                event.start?.date
            );

            return (
              start.getDate() ===
                today.getDate() &&
              start.getMonth() ===
                today.getMonth() &&
              start.getFullYear() ===
                today.getFullYear()
            );
          }) ?? [];

        if (todayMeetings.length > 0) {
          data.push({
            type: "calendar",
            title: `${todayMeetings.length} meeting(s) today`,
            description:
              "Prepare before your next scheduled meeting.",
          });
        }

        // Workspace Insight
        data.push({
          type: "ai",
          title: "Workspace Summary",
          description:
            "Your Gmail and Calendar are connected successfully.",
        });

        setInsights(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadInsights();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-violet-100 p-3">
          <Sparkles className="h-6 w-6 text-violet-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            AI Assistant
          </h2>

          <p className="text-sm text-slate-500">
            Live workspace insights
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300"
            >
              <div className="flex items-start gap-3">
                {item.type === "email" && (
                  <Mail className="mt-1 h-5 w-5 text-sky-600" />
                )}

                {item.type === "calendar" && (
                  <CalendarDays className="mt-1 h-5 w-5 text-green-600" />
                )}

                {item.type === "ai" && (
                  <Sparkles className="mt-1 h-5 w-5 text-violet-600" />
                )}

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-700">
            <Sparkles className="h-4 w-4" />
            Generate AI Brief
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}