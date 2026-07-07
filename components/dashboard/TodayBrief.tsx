import {
  Sparkles,
  Mail,
  CalendarDays,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function TodaysBrief() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
          <Sparkles className="h-6 w-6 text-sky-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Today's Brief
          </h2>

          <p className="text-sm text-slate-500">
            AI-generated overview of your day
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-2xl bg-white p-5">
        <p className="leading-7 text-slate-700">
          Good morning, <span className="font-semibold">Dhanraj</span> 👋
          <br />
          You have <strong>12 unread emails</strong>, including{" "}
          <strong>3 high-priority messages</strong>. Your next meeting starts in{" "}
          <strong>42 minutes</strong>. AI recommends replying to your project
          review email before noon.
        </p>
      </div>

      {/* Highlights */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-white p-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-sky-600" />
            <span>Unread Emails</span>
          </div>

          <span className="font-semibold">12</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-4">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-emerald-600" />
            <span>Today's Meetings</span>
          </div>

          <span className="font-semibold">2</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-orange-500" />
            <span>Next Meeting</span>
          </div>

          <span className="font-semibold">11:30 AM</span>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
        <p className="text-sm font-semibold text-sky-700">
          ✨ AI Recommendation
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-700">
          Reply to your <strong>College Project Review</strong> email before
          your next meeting. Estimated response time:{" "}
          <strong>4 minutes</strong>.
        </p>
      </div>

      {/* Footer */}
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700">
        View Full AI Brief
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}