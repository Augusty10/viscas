"use client";

import {
  RefreshCw,
  Plus,
} from "lucide-react";
import { useCalendarStore } from "@/hooks/useCalendar";

export default function CalendarTopbar() {
  const { setNewEventOpen, triggerRefresh } = useCalendarStore();
  return (
    <header className="flex items-center justify-end border-b border-slate-200 bg-white px-6 py-4">
      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={triggerRefresh}
          className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100 cursor-pointer active:scale-95"
          title="Refresh Events"
        >
          <RefreshCw className="h-5 w-5" />
        </button>

        <button
          onClick={() => setNewEventOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 cursor-pointer animate-duration-150 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          New Event
        </button>
      </div>
    </header>
  );
}