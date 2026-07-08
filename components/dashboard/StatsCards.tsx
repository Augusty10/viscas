"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  AlertTriangle,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import {
  getUnreadEmailCount,
  getImportantEmails,
} from "@/lib/gmail";

import { getEvents } from "@/lib/calendar";

type Stat = {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  iconBg: string;
  iconColor: string;
};

export default function StatsCards() {
  const [stats, setStats] = useState<Stat[]>([
    {
      title: "Unread Emails",
      value: "...",
      subtitle: "Loading...",
      icon: Mail,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      title: "Priority Emails",
      value: "...",
      subtitle: "Loading...",
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Today's Meetings",
      value: "...",
      subtitle: "Loading...",
      icon: CalendarDays,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "AI Insights",
      value: "...",
      subtitle: "Generated from Workspace",
      icon: Sparkles,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
  ]);

  useEffect(() => {
    async function loadStats() {
      try {
        const token = localStorage.getItem(
          "google_access_token"
        );

        if (!token) return;

        const unread = await getUnreadEmailCount(token);

        const important =
          await getImportantEmails(token);

        const calendar = await getEvents(token);

        const today = new Date();

        const meetings =
          calendar.items?.filter((event: any) => {
            const start = new Date(
              event.start?.dateTime ||
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

        setStats([
          {
            title: "Unread Emails",
            value: unread.toString(),
            subtitle: "Live Gmail",
            icon: Mail,
            iconBg: "bg-sky-100",
            iconColor: "text-sky-600",
          },
          {
            title: "Priority Emails",
            value: (
              important.resultSizeEstimate ?? 0
            ).toString(),
            subtitle: "Important",
            icon: AlertTriangle,
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
          },
          {
            title: "Today's Meetings",
            value: meetings.length.toString(),
            subtitle: "Google Calendar",
            icon: CalendarDays,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
          },
          {
            title: "AI Insights",
            value: (
              unread + meetings.length
            ).toString(),
            subtitle: "Workspace Analysis",
            icon: Sparkles,
            iconBg: "bg-violet-100",
            iconColor: "text-violet-600",
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    }

    loadStats();
  }, []);

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg}`}
              >
                <Icon
                  className={`h-6 w-6 ${stat.iconColor}`}
                />
              </div>

              <span className="text-xs font-medium text-emerald-600">
                Live
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-500">
                {stat.title}
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight">
                {stat.value}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {stat.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}