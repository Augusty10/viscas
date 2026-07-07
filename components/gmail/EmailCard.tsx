"use client";

import {
  Paperclip,
  Star,
  Clock,
  AlertCircle,
} from "lucide-react";

type EmailCardProps = {
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
  starred?: boolean;
  hasAttachment?: boolean;
  priority?: "high" | "medium" | "low";
  onClick?: () => void;
};

export default function EmailCard({
  sender,
  subject,
  preview,
  time,
  unread = false,
  starred = false,
  hasAttachment = false,
  priority = "low",
  onClick,
}: EmailCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-200 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md"
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700">
            {sender.charAt(0)}
          </div>

          <div>
            <h3
              className={`${
                unread ? "font-bold" : "font-semibold"
              }`}
            >
              {sender}
            </h3>

            <p className="text-sm text-slate-500">
              {time}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {priority === "high" && (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}

          {hasAttachment && (
            <Paperclip className="h-4 w-4 text-slate-500" />
          )}

          <Star
            className={`h-4 w-4 ${
              starred
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-300"
            }`}
          />
        </div>
      </div>

      {/* Subject */}
      <h4
        className={`mt-4 ${
          unread ? "font-semibold" : "font-medium"
        }`}
      >
        {subject}
      </h4>

      {/* Preview */}
      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
        {preview}
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          Received {time}
        </div>

        {unread && (
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
            Unread
          </span>
        )}
      </div>
    </button>
  );
}