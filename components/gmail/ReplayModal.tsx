"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";

import {
  Sparkles,
  Send,
  Copy,
  Loader2,
  X,
} from "lucide-react";

type ReplyModalProps = {
  open: boolean;
  onClose: () => void;
  email: string;
  accessToken: string;
  messageId: string;
  onSend: (
    accessToken: string,
    messageId: string,
    body: string
  ) => Promise<void>;
};

export default function ReplyModal({
  open,
  onClose,
  email,
  accessToken,
  messageId,
  onSend,
}: ReplyModalProps) {
  const [reply, setReply] = useState("");

  const [loadingAI, setLoadingAI] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [appwriteId, setAppwriteId] = useState("");

  useEffect(() => {
    account
      .get()
      .then((u) => setAppwriteId(u.$id))
      .catch((err) => console.error("ReplayModal: Failed to load user ID:", err));
  }, []);

  if (!open) return null;

  async function generateAIReply() {
    try {
      setLoadingAI(true);

      const response = await fetch(
        "/api/ai/reply",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            appwriteId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to generate reply."
        );
      }

      setReply(data.reply);
    } catch (error) {
      console.error(error);

      alert("AI reply generation failed.");
    } finally {
      setLoadingAI(false);
    }
  }

  async function send() {
    try {
      setSending(true);

      await onSend(
        accessToken,
        messageId,
        reply
      );

      onClose();
    } catch (error) {
      console.error(error);

      alert("Failed to send email.");
    } finally {
      setSending(false);
    }
  }

  async function copyReply() {
    await navigator.clipboard.writeText(
      reply
    );

    alert("Copied!");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">
            Reply Email
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">
          <textarea
            value={reply}
            onChange={(e) =>
              setReply(e.target.value)
            }
            rows={12}
            className="w-full rounded-2xl border p-4 outline-none focus:border-sky-500"
            placeholder="Write your reply..."
          />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={generateAIReply}
              disabled={loadingAI}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700 disabled:opacity-60"
            >
              {loadingAI ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}

              Generate AI Reply
            </button>

            <button
              onClick={copyReply}
              className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-slate-100"
            >
              <Copy className="h-4 w-4" />

              Copy
            </button>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">
          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3"
          >
            Cancel
          </button>

          <button
            onClick={send}
            disabled={
              sending || reply.trim() === ""
            }
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}

            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}