"use client";
import AISummary from "./AISummary";
import {
  Archive,
  Reply,
  Forward,
  Trash2,
  Star,
  Calendar,
  User,
} from "lucide-react";

import { useGmailStore } from "@/hooks/useGmail";

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
  const openCompose = useGmailStore((state) => state.openCompose);
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

  const extractEmailAddress = (sender: string) => {
    const match = sender.match(/<([^>]+)>/);
    return match ? match[1] : sender;
  };

  const handleReply = () => {
    if (!email) return;
    const to = extractEmailAddress(email.sender);
    const subject = email.subject.startsWith("Re:") ? email.subject : `Re: ${email.subject}`;
    const dateStr = new Date(email.date).toLocaleString();
    const body = `\n\nOn ${dateStr}, ${email.sender} wrote:\n> ${email.body.split("\n").join("\n> ")}`;
    
    openCompose({ to, subject, body });
  };

  const handleForward = () => {
    if (!email) return;
    const subject = email.subject.startsWith("Fwd:") ? email.subject : `Fwd: ${email.subject}`;
    const body = `\n\n---------- Forwarded message ---------\nFrom: ${email.sender}\nDate: ${email.date}\nSubject: ${email.subject}\n\n${email.body}`;
    
    openCompose({ to: "", subject, body });
  };

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

      <div className="mt-8">
        <AISummary email={email.body || email.snippet} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 p-5">
        <div className="flex gap-3">
          <button
            onClick={handleReply}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-100 cursor-pointer"
          >
            <Reply className="h-4 w-4" />
            Reply
          </button>

          <button
            onClick={handleForward}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-100 cursor-pointer"
          >
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