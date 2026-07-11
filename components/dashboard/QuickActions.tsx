"use client";

import Link from "next/link";
import {
  MailPlus,
  CalendarPlus,
  Sparkles,
  Mail,
  CalendarDays,
  Settings,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Compose Email",
    description: "Open Gmail workspace",
    icon: MailPlus,
    href: "/dashboard/gmail",
    color: "bg-sky-100 text-sky-600",
  },
  {
    title: "Schedule Meeting",
    description: "Open Calendar",
    icon: CalendarPlus,
    href: "/dashboard/calendar",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "AI Email Summary",
    description: "Summarize important emails",
    icon: Sparkles,
    href: "/dashboard/gmail",
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Inbox",
    description: "Manage Gmail",
    icon: Mail,
    href: "/dashboard/gmail",
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Calendar",
    description: "Today's schedule",
    icon: CalendarDays,
    href: "/dashboard/calendar",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Workspace Settings",
    description: "Configure Viscas",
    icon: Settings,
    href: "/dashboard/settings",
    color: "bg-slate-100 text-slate-700",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used workspace shortcuts
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${action.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {action.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-sky-600" />
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 p-5 text-white">
        <h3 className="font-semibold">
          🚀 Viscas AI Workspace
        </h3>

        <p className="mt-2 text-sm text-sky-100">
          Gmail and Google Calendar are connected. AI features are ready for
          summarization, smart replies, and meeting planning.
        </p>
      </div>
    </section>
  );
}