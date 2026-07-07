"use client";

import {
  Archive,
  Reply,
  Forward,
  Trash2,
  Star,
  Paperclip,
  Calendar,
} from "lucide-react";

export default function EmailPreview() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Interview Invitation
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              From: Google Careers &lt;careers@google.com&gt;
            </p>

            <p className="mt-1 text-sm text-slate-500">
              To: dhanraj@example.com
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="h-4 w-4" />
              Today • 10:45 AM
            </div>
          </div>

          <button>
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          </button>
        </div>
      </div>

      {/* Email Body */}
      <div className="flex-1 overflow-y-auto p-6">
        <p className="leading-8 text-slate-700">
          Hi Dhanraj,
          <br />
          <br />
          Congratulations! We are pleased to invite you to the next round of
          interviews for the Software Engineer position.
          <br />
          <br />
          Your interview is scheduled for Monday at 11:00 AM IST.
          Please confirm your availability by replying to this email.
          <br />
          <br />
          Best Regards,
          <br />
          Google Recruiting Team
        </p>

        {/* Attachment */}
        <div className="mt-8 rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <Paperclip className="h-5 w-5 text-sky-600" />

            <div>
              <p className="font-medium">
                Interview_Details.pdf
              </p>

              <p className="text-sm text-slate-500">
                1.4 MB PDF
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t border-slate-200 p-5">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 transition hover:bg-slate-100">
            <Reply className="h-4 w-4" />
            Reply
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 transition hover:bg-slate-100">
            <Forward className="h-4 w-4" />
            Forward
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">
            <Archive className="h-5 w-5" />
          </button>

          <button className="rounded-xl border border-red-200 p-3 text-red-500 transition hover:bg-red-50">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}