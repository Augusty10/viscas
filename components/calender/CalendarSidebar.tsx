"use client";

import {
  CalendarDays,
  Clock,
  CalendarRange,
  Users,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useLayoutStore } from "@/hooks/useLayoutStore";

const menu = [
  {
    title: "Today",
    icon: CalendarDays,
  },
  {
    title: "Upcoming",
    icon: Clock,
  },
  {
    title: "This Week",
    icon: CalendarRange,
  },
  {
    title: "Meetings",
    icon: Users,
  },
];

export default function CalendarSidebar() {
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <Link
          href="/dashboard"
          className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-sky-600 transition"
        >
          ← Back to Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-slate-800">
          Calendar
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your schedule
        </p>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-sky-700">
          <Plus className="h-5 w-5" />
          New Event
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-sky-50 hover:text-sky-600"
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 p-5">
        <div className="rounded-2xl bg-sky-50 p-4">
          <p className="text-sm font-semibold text-sky-700">
            Google Calendar
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Connected successfully
          </p>
        </div>
      </div>
    </aside>
  );
}