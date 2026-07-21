"use client";

import SearchBar from "./SearchBar";
import { Bell, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLayoutStore } from "@/hooks/useLayoutStore";
import UserDropdown from "./UserDropdown";

export default function Topbar() {
  const pathname = usePathname();
  const showGlobalSearch = !pathname.startsWith("/dashboard/gmail");
  const { toggleSidebar } = useLayoutStore();

  return (
    <header className="relative z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-8">
      {/* Mobile Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100 lg:hidden"
        title="Toggle Menu"
      >
        <Menu className="h-5 w-5 text-slate-600" />
      </button>

      {/* Search */}
      {showGlobalSearch ? <SearchBar /> : <div className="flex-1" />}

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <button className="rounded-xl p-3 transition hover:bg-slate-100">
          <Bell className="h-5 w-5" />
        </button>

        <UserDropdown />
      </div>
    </header>
  );
}