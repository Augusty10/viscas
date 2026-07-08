"use client";

import { ReactNode } from "react";
import GmailSidebar from "./GmailSidebar";
import GmailTopbar from "./GmailTopbar";

type GmailLayoutProps = {
  children: ReactNode;
  onSearch?: (query: string) => void;
  onRefresh?: () => void;
};

export default function GmailLayout({
  children,
  onSearch = () => {},
  onRefresh,
}: GmailLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-96px)] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 bg-white">
        <GmailSidebar />
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <GmailTopbar
          onSearch={onSearch}
          onRefresh={onRefresh}
        />

        <main className="flex-1 overflow-hidden p-6">
          {children}
        </main>
      </div>
    </div>
  );
}