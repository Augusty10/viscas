"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GmailSidebar from "@/components/gmail/GmailSidebar";
import CalendarSidebar from "@/components/calender/CalendarSidebar";
import { useLayoutStore } from "@/hooks/useLayoutStore";
import { logout } from "@/lib/auth-client";
import Logo from "../common/Logo";

import {
  LayoutDashboard,
  Mail,
  CalendarDays,
  Sparkles,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
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
  const { sidebarOpen, setSidebarOpen, isCollapsed, toggleCollapsed } = useLayoutStore();

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
      className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:static lg:translate-x-0 shrink-0 ${
        isCollapsed ? "lg:w-20 w-72" : "w-72 lg:w-72"
      } ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header / Logo */}
      <div className={`relative border-b border-slate-200 p-6 flex items-center ${
        isCollapsed ? "justify-center py-6 px-2" : "justify-between"
      }`}>
        <Logo showText={!isCollapsed} />

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
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center rounded-xl transition-all duration-200 text-slate-700 hover:bg-sky-50 hover:text-sky-600 ${
                isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
              }`}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="text-sm font-semibold truncate">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className={`flex items-center rounded-xl text-red-500 transition-all duration-200 hover:bg-red-50 ${
            isCollapsed ? "justify-center p-3 w-full" : "gap-3 px-4 py-3 w-full"
          }`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span className="text-sm font-semibold truncate">Logout</span>}
        </button>
      </div>
    </aside>
  );
}