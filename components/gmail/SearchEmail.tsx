"use client";

import { Search, Sparkles, SlidersHorizontal } from "lucide-react";

export default function SearchEmail() {
  return (
    <div className="flex w-full items-center gap-3">
      {/* Search Box */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search emails, senders, attachments or ask AI..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        />

        {/* AI Badge */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-sky-100 px-2 py-1">
          <div className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />

            <span className="text-xs font-medium text-sky-700">
              AI
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-50">
        <SlidersHorizontal className="h-5 w-5 text-slate-600" />
      </button>
    </div>
  );
}