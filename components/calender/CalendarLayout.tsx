"use client";

import { ReactNode } from "react";
import CalendarSidebar from "./CalendarSidebar";
import CalendarTopbar from "./CalendarTopbar";

type CalendarLayoutProps = {
  children: ReactNode;
};

export default function CalendarLayout({
  children,
}: CalendarLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-96px)] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 bg-white">
        <CalendarSidebar />
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <CalendarTopbar />

        <main className="flex-1 overflow-hidden p-6">
          {children}
        </main>
      </div>
    </div>
  );
}