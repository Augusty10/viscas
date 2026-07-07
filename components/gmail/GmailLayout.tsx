import { ReactNode } from "react";

import GmailSidebar from "./GmailSidebar";
import GmailTopbar from "./GmailTopbar";

type GmailLayoutProps = {
  children: ReactNode;
};

export default function GmailLayout({
  children,
}: GmailLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Gmail Sidebar */}
      <GmailSidebar />

      {/* Main Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <GmailTopbar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}