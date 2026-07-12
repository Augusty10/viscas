"use client";

import { MessageSquareReply } from "lucide-react";
import { useGmailStore } from "@/hooks/useGmail";

type SuggestedRepliesProps = {
  email: {
    sender: string;
    subject: string;
    body: string;
    date: string;
  } | null;
};

const replies = [
  "Thank you. I confirm my availability for Monday at 11:00 AM.",
  "Thanks for the invitation. Looking forward to the interview.",
  "Could we reschedule the interview to another time?",
];

export default function SuggestedReplies({ email }: SuggestedRepliesProps) {
  const openCompose = useGmailStore((state) => state.openCompose);

  if (!email) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
            <MessageSquareReply className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="font-semibold">Suggested Replies</h2>
            <p className="text-sm text-slate-500">AI generated responses</p>
          </div>
        </div>
        <p className="text-sm text-slate-400 text-center py-4">
          Select an email to view suggested replies.
        </p>
      </div>
    );
  }

  const extractEmailAddress = (sender: string) => {
    const match = sender.match(/<([^>]+)>/);
    return match ? match[1] : sender;
  };

  const handleSuggestionClick = (replyText: string) => {
    const to = extractEmailAddress(email.sender);
    const subject = email.subject.startsWith("Re:") ? email.subject : `Re: ${email.subject}`;
    const dateStr = new Date(email.date).toLocaleString();
    const quotedBody = `\n\nOn ${dateStr}, ${email.sender} wrote:\n> ${email.body.split("\n").join("\n> ")}`;
    
    openCompose({
      to,
      subject,
      body: `${replyText}${quotedBody}`,
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
          <MessageSquareReply className="h-5 w-5 text-green-600" />
        </div>

        <div>
          <h2 className="font-semibold">
            Suggested Replies
          </h2>

          <p className="text-sm text-slate-500">
            AI generated responses
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {replies.map((reply) => (
          <button
            key={reply}
            onClick={() => handleSuggestionClick(reply)}
            className="w-full rounded-2xl border border-slate-200 p-4 text-left text-sm transition hover:border-sky-300 hover:bg-sky-50 cursor-pointer"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
}