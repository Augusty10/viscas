"use client";

import {
  CalendarDays,
  Clock,
  CalendarRange,
  Users,
  Plus,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useLayoutStore } from "@/hooks/useLayoutStore";
import { useCalendarStore } from "@/hooks/useCalendar";

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
  const { sidebarOpen, setSidebarOpen, isCollapsed, toggleCollapsed } = useLayoutStore();
  const { setNewEventOpen } = useCalendarStore();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:static lg:translate-x-0 shrink-0 ${
        isCollapsed ? "lg:w-20 w-72" : "w-72 lg:w-72"
      } ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className={`relative border-b border-slate-200 p-6 flex flex-col ${
        isCollapsed ? "items-center py-6 px-2" : "items-stretch"
      }`}>
        {/* Back Link */}
        <Link
          href="/dashboard"
          className={`flex items-center text-xs font-semibold text-slate-500 hover:text-sky-600 transition ${
            isCollapsed ? "justify-center mb-4" : "gap-2 mb-4"
          }`}
          title={isCollapsed ? "Back to Dashboard" : undefined}
        >
          <ArrowLeft className="h-4 w-4" />
          {!isCollapsed && "Back to Dashboard"}
        </Link>

        {/* Title */}
        {!isCollapsed && (
          <h2 className="text-2xl font-bold text-slate-800">
            Calendar
          </h2>
        )}

        {/* New Event Button */}
        <div className={isCollapsed ? "py-4 w-full flex justify-center" : "mt-2"}>
          <button
            onClick={() => setNewEventOpen(true)}
            className={`flex items-center justify-center bg-sky-600 text-white font-medium transition hover:bg-sky-700 active:scale-95 shadow-sm hover:shadow cursor-pointer ${
              isCollapsed ? "h-11 w-11 rounded-full p-0 mx-auto" : "w-full gap-2 rounded-xl px-4 py-3"
            }`}
            title={isCollapsed ? "New Event" : undefined}
          >
            <Plus className="h-5 w-5 shrink-0" />
            {!isCollapsed && "New Event"}
          </button>
        </div>

        {!isCollapsed && (
          <p className="mt-2 text-[10px] text-slate-400">
            Manage your schedule
          </p>
        )}

        {/* Collapse Button (Desktop Only) */}
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex absolute -right-3 top-7 z-50 h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md hover:bg-slate-50 transition cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5 text-slate-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={`flex w-full items-center rounded-xl text-left transition hover:bg-sky-50 hover:text-sky-600 text-slate-700 ${
                isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
              }`}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="font-semibold text-sm">{item.title}</span>}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        {isCollapsed ? (
          <div className="flex justify-center" title="Google Calendar: Connected">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-sky-50 p-4">
            <p className="text-sm font-semibold text-sky-700">
              Google Calendar
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Connected successfully
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}