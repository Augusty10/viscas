"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/lib/auth-client";
import { account } from "@/lib/appwrite";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatarUrl?: string;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const u = await account.get();
        let avatarUrl: string | undefined = "/logo/dp.jpg";

        setUser({
          name: u.name || "User",
          email: u.email || "",
          avatarUrl,
        });
      } catch (err) {
        console.error("Failed to load user profile", err);
      }
    }
    loadUser();

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const name = user?.name || "User";
  const email = user?.email || "user@example.com";
  const avatarUrl = user?.avatarUrl;
  const initials = name ? name[0].toUpperCase() : "U";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50 cursor-pointer"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-10 w-10 rounded-full object-cover border border-slate-100"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-semibold text-white">
            {initials}
          </div>
        )}

        <div className="hidden text-left md:block">
          <p className="font-semibold text-sm leading-tight text-slate-800">{name}</p>
          <p className="text-xs text-slate-500 truncate max-w-[150px]">{email}</p>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl z-50">
          {/* User Info */}
          <div className="border-b border-slate-100 p-4">
            <p className="font-semibold">
              {name}
            </p>

            <p className="text-sm text-slate-500">
              {email}
            </p>
          </div>

          {/* Menu */}
          <div className="p-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50">
              <User className="h-5 w-5" />
              Profile
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50">
              <Settings className="h-5 w-5" />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}