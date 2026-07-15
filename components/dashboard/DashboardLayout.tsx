"use client";

import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useLayoutStore } from "@/hooks/useLayoutStore";
import { account } from "@/lib/appwrite";
import { Loader2 } from "lucide-react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function verifySession() {
      try {
        const u = await account.get();
        // Auto-sync user details on dashboard load
        try {
          await fetch("/api/user/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              appwriteId: u.$id,
              name: u.name,
              email: u.email,
              avatar: null,
            }),
          });
        } catch (syncErr) {
          console.warn("Failed to auto-sync user in DashboardLayout:", syncErr);
        }
        setCheckingAuth(false);
      } catch (err) {
        console.warn("Guest user access blocked on dashboard:", err);
        window.location.href = "/login";
      }
    }
    verifySession();
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
          <p className="text-sm font-semibold text-slate-500">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 z-40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <Topbar />

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}