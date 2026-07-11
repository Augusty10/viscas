"use client";

import { PenSquare } from "lucide-react";

interface ComposeButtonProps {
  collapsed?: boolean;
}

export default function ComposeButton({ collapsed = false }: ComposeButtonProps) {
  return (
    <button
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
      title={collapsed ? "Compose Email" : undefined}
    >
      <PenSquare className="h-5 w-5 shrink-0" />
      {!collapsed && "Compose"}
    </button>
  );
}