"use client";

import { PenSquare } from "lucide-react";

export default function ComposeButton() {
  return (
    <button
      className="
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-sky-600
        px-5
        py-3
        font-semibold
        text-white
        shadow-sm
        transition-all
        duration-200
        hover:bg-sky-700
        hover:shadow-lg
        active:scale-95
      "
    >
      <PenSquare className="h-5 w-5" />

      Compose
    </button>
  );
}