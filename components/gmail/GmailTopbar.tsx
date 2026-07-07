"use client";

import {
  RefreshCw,
  Filter,
  Sparkles,
} from "lucide-react";

import SearchEmail from "./SearchEmail";

export default function GmailTopbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
      {/* Search */}
      <div className="flex-1">
        <SearchEmail />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Refresh */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100"
          title="Refresh Inbox"
        >
          <RefreshCw className="h-5 w-5 text-slate-600" />
        </button>

        {/* Filter */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100"
          title="Filters"
        >
          <Filter className="h-5 w-5 text-slate-600" />
        </button>

        {/* AI Button */}
        <button
          className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 font-medium text-white transition hover:bg-sky-700"
        >
          <Sparkles className="h-4 w-4" />
          AI Actions
        </button>
      </div>
    </header>
  );
}