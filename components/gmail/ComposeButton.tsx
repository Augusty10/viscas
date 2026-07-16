"use client";

import { PenSquare } from "lucide-react";
import { useGmailStore } from "@/hooks/useGmail";

interface ComposeButtonProps {
  collapsed?: boolean;
}

export default function ComposeButton({ collapsed = false }: ComposeButtonProps) {
  const openCompose = useGmailStore((state) => state.openCompose);

  return (
    <button
      onClick={() => openCompose()}
      className={`
        flex
        items-center
        justify-center
        bg-sky-600
        text-white
        shadow-sm
        transition-all
        duration-200
        hover:bg-sky-700
        hover:shadow-lg
        active:scale-95
        ${collapsed ? "h-11 w-11 rounded-full p-0 mx-auto" : "w-full gap-2 rounded-2xl px-5 py-3 font-semibold"}
      `}
      title={collapsed ? "Compose Email (Alt+C)" : undefined}
    >
      {collapsed ? (
        <PenSquare className="h-5 w-5 shrink-0" />
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <PenSquare className="h-5 w-5 shrink-0" />
            <span>Compose</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[9px] font-bold bg-white/20 border border-white/10 rounded text-sky-100 font-mono shadow-sm">
            Alt+C
          </kbd>
        </div>
      )}
    </button>
  );
}