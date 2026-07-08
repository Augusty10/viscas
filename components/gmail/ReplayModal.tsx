"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";

type ReplyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  to: string;
  subject: string;
  onSend: (message: string) => Promise<void>;
};

export default function ReplyModal({
  isOpen,
  onClose,
  to,
  subject,
  onSend,
}: ReplyModalProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSend() {
    if (!message.trim()) return;

    setLoading(true);

    try {
      await onSend(message);
      setMessage("");
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-bold">Reply Email</h2>
            <p className="text-sm text-slate-500">
              Send reply using Gmail
            </p>
          </div>

          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              To
            </label>

            <input
              value={to}
              readOnly
              className="w-full rounded-xl border p-3 bg-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Subject
            </label>

            <input
              value={`Re: ${subject}`}
              readOnly
              className="w-full rounded-xl border p-3 bg-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Message
            </label>

            <textarea
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your reply..."
              className="w-full rounded-xl border p-4 outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-6">
          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2 text-white hover:bg-sky-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />

            {loading ? "Sending..." : "Send Reply"}
          </button>
        </div>
      </div>
    </div>
  );
}