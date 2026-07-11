"use client";

import ComposeButton from "./ComposeButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutStore } from "@/hooks/useLayoutStore";
import {
  Inbox,
  Star,
  Send,
  FileText,
  Trash2,
  MailWarning,
  FolderOpen,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Inbox",
    href: "/dashboard/gmail",
    icon: Inbox,
  },
  {
    title: "Starred",
    href: "/dashboard/gmail/starred",
    icon: Star,
  },
  {
    title: "Sent",
    href: "/dashboard/gmail/sent",
    icon: Send,
  },
  {
    title: "Drafts",
    href: "/dashboard/gmail/drafts",
    icon: FileText,
  },
  {
    title: "Spam",
    href: "/dashboard/gmail/spam",
    icon: MailWarning,
  },
  {
    title: "Trash",
    href: "/dashboard/gmail/trash",
    icon: Trash2,
  },
];

const tools = [
  {
    title: "Subscription Manager",
    href: "/dashboard/gmail/subscriptions",
    icon: FolderOpen,
  },
  {
    title: "Gmail Settings",
    href: "/dashboard/gmail/settings",
    icon: Settings,
  },
];

export default function GmailSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <Link
          href="/dashboard"
          className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-sky-600 transition"
        >
          ← Back to Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-sky-600">
          Gmail
        </h2>

<div className="p-4">
  <ComposeButton />
</div>
        <p className="mt-1 text-sm text-slate-500">
          AI Email Workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Mailboxes
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? "bg-sky-100 text-sky-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Tools */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            AI Tools
          </p>

          <div className="space-y-2">
            {tools.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    active
                      ? "bg-sky-100 text-sky-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <div className="rounded-2xl bg-sky-50 p-4">
          <h3 className="font-semibold text-sky-700">
            Inbox Health
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Score: <span className="font-semibold">92%</span>
          </p>

          <p className="mt-2 text-xs text-slate-500">
            AI recommends cleaning 8 newsletters.
          </p>
        </div>
      </div>
    </aside>
  );
}