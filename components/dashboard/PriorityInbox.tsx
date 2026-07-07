import {
  ArrowRight,
  AlertCircle,
  Clock,
  Mail,
} from "lucide-react";

const emails = [
  {
    sender: "Google",
    subject: "Interview Invitation",
    priority: "High",
    time: "2 min ago",
  },
  {
    sender: "College",
    subject: "Project Review Meeting",
    priority: "Medium",
    time: "18 min ago",
  },
  {
    sender: "GitHub",
    subject: "Repository Activity",
    priority: "Low",
    time: "1 hour ago",
  },
];

export default function PriorityInbox() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
            <Mail className="h-6 w-6 text-sky-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Priority Inbox
            </h2>

            <p className="text-sm text-slate-500">
              Emails that need your attention
            </p>
          </div>
        </div>

        <button className="text-sm font-medium text-sky-600 hover:underline">
          View All
        </button>
      </div>

      {/* Email List */}
      <div className="mt-6 space-y-4">
        {emails.map((email) => (
          <div
            key={email.subject}
            className="rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-slate-50"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">
                  {email.sender}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {email.subject}
                </p>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                {email.time}
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  email.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : email.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                <AlertCircle className="mr-1 inline h-3 w-3" />
                {email.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}