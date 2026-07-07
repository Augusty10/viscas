"use client";

import {
  Languages,
  WandSparkles,
  Copy,
  Download,
  Share2,
} from "lucide-react";

const actions = [
  {
    title: "Translate",
    icon: Languages,
  },
  {
    title: "Improve Writing",
    icon: WandSparkles,
  },
  {
    title: "Copy Summary",
    icon: Copy,
  },
  {
    title: "Download PDF",
    icon: Download,
  },
  {
    title: "Share",
    icon: Share2,
  },
];

export default function EmailActions() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        AI Actions
      </h2>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-slate-50"
            >
              <Icon className="h-5 w-5 text-sky-600" />

              <span>{action.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}