"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GmailSidebar from "@/components/gmail/GmailSidebar";
import CalendarSidebar from "@/components/calender/CalendarSidebar";
import { useLayoutStore } from "@/hooks/useLayoutStore";
import { logout } from "@/lib/auth-client";

import {
  LayoutDashboard,
  Mail,
  CalendarDays,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Gmail",
    href: "/dashboard/gmail",
    icon: Mail,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/ai",
    icon: Sparkles,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.error("Failed to logout from sidebar", err);
    }
  };

  // Dynamic routing display
  if (pathname.startsWith("/dashboard/gmail")) {
    return <GmailSidebar />;
  }

  if (pathname.startsWith("/dashboard/calendar")) {
    return <CalendarSidebar />;
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-3xl font-bold text-sky-600">
          Viscas
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          AI Productivity Workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-sky-50 hover:text-sky-600"
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}