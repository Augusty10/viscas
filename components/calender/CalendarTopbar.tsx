"use client";

import {
  Search,
  Bell,
  RefreshCw,
  Plus,
} from "lucide-react";

export default function CalendarTopbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search events..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none transition focus:border-sky-500 focus:bg-white"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">
          <RefreshCw className="h-5 w-5" />
        </button>

        <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">
          <Bell className="h-5 w-5" />
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700">
          <Plus className="h-4 w-4" />
          New Event
        </button>
      </div>
    </header>
  );
}