import { CalendarDays, Sparkles } from "lucide-react";

export default function Welcome() {
  const currentHour = new Date().getHours();

  let greeting = "Good Evening";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-500 to-cyan-500 p-8 text-white shadow-lg">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        {/* Left */}
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-100">
            AI Productivity Workspace
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            {greeting}, Dhanraj 👋
          </h1>

          <p className="mt-4 max-w-2xl text-sky-100">
            Welcome back to <span className="font-semibold">Viscas</span>.
            Here's a quick overview of your emails, calendar, and AI insights
            for today.
          </p>
        </div>

        {/* Right */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />

              <span className="text-sm font-medium">
                Today
              </span>
            </div>

            <p className="mt-3 text-lg font-semibold">
              2 Meetings Scheduled
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />

              <span className="text-sm font-medium">
                AI Brief
              </span>
            </div>

            <p className="mt-3 text-lg font-semibold">
              3 Important Emails
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}