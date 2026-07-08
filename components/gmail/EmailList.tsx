"use client";

import EmailCard from "./EmailCard";

type Email = {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
};

type EmailListProps = {
  emails: Email[];
  onEmailSelect: (email: Email) => void;
};

export default function EmailList({
  emails,
  onEmailSelect,
}: EmailListProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inbox</h2>

          <p className="text-sm text-slate-500">
            {emails.length} emails
          </p>
        </div>
      </div>

      {emails.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500">
            Click <strong>Connect Gmail</strong> to load your inbox.
          </p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto">
          {emails.map((email) => (
            <EmailCard
              key={email.id}
              sender={email.sender}
              subject={email.subject}
              preview={email.snippet}
              time={new Date(email.date).toLocaleDateString()}
              unread={false}
              starred={false}
              hasAttachment={false}
              priority="low"
              onClick={() => onEmailSelect(email)}
            />
          ))}
        </div>
      )}
    </div>
  );
}