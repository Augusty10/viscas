"use client";

import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useLayoutStore } from "@/hooks/useLayoutStore";
import { account } from "@/lib/appwrite";
import { Loader2, X } from "lucide-react";
import { useGmailStore } from "@/hooks/useGmail";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);

  // Auth session verify on mount
  useEffect(() => {
    async function verifySession() {
      try {
        const u = await account.get();
        // Auto-sync user details on dashboard load
        try {
          const res = await fetch("/api/user/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              appwriteId: u.$id,
              name: u.name,
              email: u.email,
              avatar: null,
            }),
          });
          const data = await res.json();
          if (!res.ok || !data.success) {
            const errMsg = data.error || "Failed to sync user.";
            if (
              errMsg.includes("paused") ||
              errMsg.includes("inactivity") ||
              errMsg.includes("restore")
            ) {
              window.location.href = `/login?error=${encodeURIComponent(errMsg)}`;
              return;
            }
          }
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

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      // Ignore shortcuts if the user is typing in form inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // 1. Navigation shortcuts: Alt + 1, Alt + 2, etc.
      if (e.altKey) {
        if (e.key === "1") {
          e.preventDefault();
          window.location.href = "/dashboard";
        } else if (e.key === "2") {
          e.preventDefault();
          window.location.href = "/dashboard/gmail";
        } else if (e.key === "3") {
          e.preventDefault();
          window.location.href = "/dashboard/calendar";
        } else if (e.key === "4") {
          e.preventDefault();
          window.location.href = "/dashboard/ai";
        } else if (e.key === "5") {
          e.preventDefault();
          window.location.href = "/dashboard/settings";
        } else if (e.key.toLowerCase() === "c") {
          e.preventDefault();
          // Open Compose mail window
          useGmailStore.getState().openCompose();
        }
      }

      // 2. Toggle Shortcut help: '?' (shift + /)
      if (e.key === "?") {
        e.preventDefault();
        setShowShortcutHelp((prev) => !prev);
      }
      
      if (e.key === "Escape") {
        setShowShortcutHelp(false);
      }
    };

    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => {
      window.removeEventListener("keydown", handleGlobalShortcuts);
    };
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

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto relative z-10">
          {children}
        </main>
      </div>

      {/* Keyboard Shortcuts Dialog Overlay */}
      {showShortcutHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">⌨️</span>
                <h3 className="text-lg font-bold text-slate-900">Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={() => setShowShortcutHelp(false)}
                className="rounded-full p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-sm text-slate-600 font-medium">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2.5">Global Navigation</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Go to Dashboard Overview</span>
                    <kbd className="px-2.5 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono shadow-sm">Alt + 1</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Go to Gmail Inbox</span>
                    <kbd className="px-2.5 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono shadow-sm">Alt + 2</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Go to Google Calendar</span>
                    <kbd className="px-2.5 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono shadow-sm">Alt + 3</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Go to AI Assistant</span>
                    <kbd className="px-2.5 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono shadow-sm">Alt + 4</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Go to Workspace Settings</span>
                    <kbd className="px-2.5 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono shadow-sm">Alt + 5</kbd>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2.5">Quick Actions</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Open Compose Email Window</span>
                    <kbd className="px-2.5 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono shadow-sm">Alt + C</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Toggle this Shortcuts Helper</span>
                    <kbd className="px-2.5 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono shadow-sm">?</kbd>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end border-t border-slate-100 pt-4">
              <button
                onClick={() => setShowShortcutHelp(false)}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}