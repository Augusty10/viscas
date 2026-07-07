"use client";

import EmailCard from "./EmailCard";

const emails = [
  {
    id: 1,
    sender: "Google",
    subject: "Interview Invitation",
    preview:
      "Congratulations! We'd like to invite you for the next round of interviews.",
    time: "2 min ago",
    unread: true,
    starred: true,
    hasAttachment: false,
    priority: "high" as const,
  },
  {
    id: 2,
    sender: "GitHub",
    subject: "Repository Activity",
    preview:
      "Several contributors pushed new commits to your repository today.",
    time: "18 min ago",
    unread: true,
    starred: false,
    hasAttachment: false,
    priority: "medium" as const,
  },
  {
    id: 3,
    sender: "College",
    subject: "Project Review Meeting",
    preview:
      "Reminder: Your MCA project review is scheduled tomorrow at 11:30 AM.",
    time: "1 hour ago",
    unread: false,
    starred: false,
    hasAttachment: true,
    priority: "medium" as const,
  },
  {
    id: 4,
    sender: "LinkedIn",
    subject: "New Job Recommendations",
    preview:
      "We've found new Full Stack Developer opportunities matching your profile.",
    time: "Yesterday",
    unread: false,
    starred: false,
    hasAttachment: false,
    priority: "low" as const,
  },
];

export default function EmailList() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Inbox
          </h2>

          <p className="text-sm text-slate-500">
            {emails.length} emails
          </p>
        </div>

        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
          {emails.filter((email) => email.unread).length} Unread
        </span>
      </div>

      {/* Email List */}
      <div className="space-y-4 overflow-y-auto">
        {emails.map((email) => (
          <EmailCard
            key={email.id}
            sender={email.sender}
            subject={email.subject}
            preview={email.preview}
            time={email.time}
            unread={email.unread}
            starred={email.starred}
            hasAttachment={email.hasAttachment}
            priority={email.priority}
          />
        ))}
      </div>
    </div>
  );
}