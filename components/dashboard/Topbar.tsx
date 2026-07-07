"use client";

import SearchBar from "./SearchBar";
import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

        <input
          type="text"
          placeholder="Search emails, events..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none transition focus:border-sky-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <button className="rounded-xl p-3 transition hover:bg-slate-100">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 font-semibold text-white">
            D
          </div>

          <div>
            <p className="font-semibold">Dhanraj</p>
            <p className="text-sm text-slate-500">
              Welcome back
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}