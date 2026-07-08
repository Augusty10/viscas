"use client";

import {
  Archive,
  Reply,
  Forward,
  Trash2,
  Star,
  Calendar,
  User,
} from "lucide-react";

export type GmailEmail = {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
};

type EmailPreviewProps = {
  email: GmailEmail | null;
};

export default function EmailPreview({
  email,
}: EmailPreviewProps) {
  if (!email) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            No Email Selected
          </h2>

          <p className="mt-2 text-slate-500">
            Select an email from your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">
              {email.subject || "(No Subject)"}
            </h1>

            <div className="flex items-center gap-2 text-slate-600">
              <User className="h-4 w-4" />
              <span>{email.sender}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              {new Date(email.date).toLocaleString()}
            </div>
          </div>

          <button className="rounded-xl border p-2 hover:bg-slate-100">
            <Star className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Email Body */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="whitespace-pre-wrap leading-8 text-slate-700">
          {email.body}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 p-5">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-100">
            <Reply className="h-4 w-4" />
            Reply
          </button>

          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-100">
            <Forward className="h-4 w-4" />
            Forward
          </button>
        </div>

        <div className="flex gap-3">
          <button className="rounded-xl border p-3 hover:bg-slate-100">
            <Archive className="h-5 w-5" />
          </button>

          <button className="rounded-xl border border-red-200 p-3 text-red-500 hover:bg-red-50">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}