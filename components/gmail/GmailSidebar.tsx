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
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Activity,
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
  const { sidebarOpen, setSidebarOpen, isCollapsed, toggleCollapsed } = useLayoutStore();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:static lg:translate-x-0 shrink-0 ${
        isCollapsed ? "lg:w-20 w-72" : "w-72 lg:w-72"
      } ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className={`relative border-b border-slate-200 p-6 flex flex-col ${
        isCollapsed ? "items-center py-6 px-2" : "items-stretch"
      }`}>
        {/* Back Link */}
        <Link
          href="/dashboard"
          className={`flex items-center text-xs font-semibold text-slate-500 hover:text-sky-600 transition ${
            isCollapsed ? "justify-center mb-4" : "gap-2 mb-4"
          }`}
          title={isCollapsed ? "Back to Dashboard" : undefined}
        >
          <ArrowLeft className="h-4 w-4" />
          {!isCollapsed && "Back to Dashboard"}
        </Link>

        {/* Title */}
        {!isCollapsed && (
          <h2 className="text-2xl font-bold text-sky-600">
            Gmail
          </h2>
        )}

        {/* Compose Button */}
        <div className={isCollapsed ? "py-4 w-full flex justify-center" : "mt-4"}>
          <ComposeButton collapsed={isCollapsed} />
        </div>

        {!isCollapsed && (
          <p className="mt-2 text-xs text-slate-400">
            AI Email Workspace
          </p>
        )}

        {/* Collapse Button (Desktop Only) */}
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex absolute -right-3 top-7 z-50 h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md hover:bg-slate-50 transition cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5 text-slate-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Mailboxes */}
        <div>
          {!isCollapsed && (
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Mailboxes
            </p>
          )}

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center rounded-xl transition-all duration-200 ${
                    active ? "bg-sky-50 text-sky-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
                  } ${isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-2.5"}`}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="text-sm truncate">{item.title}</span>}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tools */}
        <div>
          {!isCollapsed && (
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              AI Tools
            </p>
          )}

          <div className="space-y-1">
            {tools.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center rounded-xl transition-all duration-200 ${
                    active ? "bg-sky-50 text-sky-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
                  } ${isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-2.5"}`}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="text-sm truncate">{item.title}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer / Health Status */}
      <div className="border-t border-slate-200 p-4">
        {isCollapsed ? (
          <div className="flex justify-center" title="Inbox Health: 92%">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Activity className="h-5 w-5" />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-sky-50 p-4">
            <h3 className="font-semibold text-sky-700 text-sm">
              Inbox Health
            </h3>

            <p className="mt-1 text-xs text-slate-600">
              Score: <span className="font-semibold">92%</span>
            </p>

            <p className="mt-1.5 text-[10px] text-slate-400">
              AI recommends cleaning 8 newsletters.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}