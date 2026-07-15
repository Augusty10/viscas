"use client";

import { useState, useEffect } from "react";
import { X, Minus, Maximize2, Send, Trash2, Loader2, Sparkles } from "lucide-react";
import { useGmailStore } from "@/hooks/useGmail";
import { sendEmail } from "@/lib/gmail";
import { account } from "@/lib/appwrite";

type ComposeWindowProps = {
  onSent?: () => void;
};

export default function ComposeWindow({ onSent }: ComposeWindowProps) {
  const {
    accessToken,
    isComposeOpen,
    composeTo,
    composeSubject,
    composeBody,
    closeCompose,
  } = useGmailStore();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appwriteId, setAppwriteId] = useState("");

  useEffect(() => {
    account
      .get()
      .then((u) => setAppwriteId(u.$id))
      .catch((err) => console.error("ComposeWindow: Failed to load user ID:", err));
  }, []);

  // Sync state with store values when compose window opens
  useEffect(() => {
    if (isComposeOpen) {
      setTo(composeTo);
      setSubject(composeSubject);
      setBody(composeBody);
      setIsMinimized(false);
      setError(null);
    }
  }, [isComposeOpen, composeTo, composeSubject, composeBody]);

  if (!isComposeOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      setError("Please connect your Gmail account first.");
      return;
    }
    if (!to.trim()) {
      setError("Please specify a recipient.");
      return;
    }

    try {
      setIsSending(true);
      setError(null);
      await sendEmail(accessToken, to, subject, body);
      closeCompose();
      if (onSent) {
        onSent();
      }
    } catch (err: any) {
      console.error("Failed to send email:", err);
      setError(err.message || "Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const generateAIBody = async () => {
    if (!to && !subject) {
      setError("Provide a subject or recipient to guide the AI draft.");
      return;
    }
    try {
      setIsSending(true);
      setError(null);
      const response = await fetch("/api/ai/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: `Drafting new email. Recipient: ${to}. Subject: ${subject}. Content directive: ${body}`,
          appwriteId,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to generate draft.");
      }
      setBody(data.reply);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "AI draft generation failed.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 mr-6 w-full max-w-lg rounded-t-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ${
        isMinimized ? "h-12" : "h-[500px]"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white rounded-t-2xl">
        <span className="text-sm font-semibold">New Message</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="rounded p-1 hover:bg-slate-800 transition"
            title="Minimize"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={closeCompose}
            className="rounded p-1 hover:bg-slate-800 transition"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Form Content */}
      {!isMinimized && (
        <form onSubmit={handleSend} className="flex flex-1 flex-col overflow-hidden">
          {error && (
            <div className="bg-red-50 px-4 py-2 text-xs font-medium text-red-600 border-b border-red-100">
              {error}
            </div>
          )}

          {/* Recipient */}
          <div className="flex items-center border-b border-slate-100 px-4 py-2">
            <span className="text-sm text-slate-500 mr-2 min-w-8">To</span>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full text-sm outline-none bg-transparent py-1 text-slate-800"
              placeholder="recipients@example.com"
              required
            />
          </div>

          {/* Subject */}
          <div className="flex items-center border-b border-slate-100 px-4 py-2">
            <span className="text-sm text-slate-500 mr-2 min-w-8">Subject</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-sm outline-none bg-transparent py-1 text-slate-800"
              placeholder="Email subject"
            />
          </div>

          {/* Body */}
          <div className="flex-1 p-4 overflow-y-auto">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full h-full text-sm outline-none resize-none text-slate-700 leading-relaxed"
              placeholder="Write your email here..."
            />
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 bg-slate-50">
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 hover:shadow transition disabled:opacity-60 active:scale-95 cursor-pointer"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send
              </button>

              <button
                type="button"
                onClick={generateAIBody}
                disabled={isSending}
                className="flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-100 hover:text-violet-800 transition disabled:opacity-60 cursor-pointer"
                title="Draft with AI"
              >
                <Sparkles className="h-4 w-4" />
                AI Draft
              </button>
            </div>

            <button
              type="button"
              onClick={closeCompose}
              className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-200 hover:text-red-600 transition cursor-pointer"
              title="Discard Draft"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
