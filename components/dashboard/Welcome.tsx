"use client";

import { CalendarDays, Sparkles } from "lucide-react";

type WelcomeProps = {
  name?: string;
  unreadEmails: number;
  meetings: number;
};

export default function Welcome({
  name = "Dhanraj",
  unreadEmails,
  meetings,
}: WelcomeProps) {
  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-500 to-cyan-500 p-8 text-white shadow-lg">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        {/* Left */}
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-100">
            AI Productivity Workspace
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            {greeting}, {name} 👋
          </h1>

          <p className="mt-4 max-w-2xl text-sky-100">
            Welcome back to{" "}
            <span className="font-semibold">
              Viscas
            </span>
            . Here's your live workspace overview.
          </p>

          <p className="mt-4 text-sm text-sky-100">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Right */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />

              <span className="text-sm font-medium">
                Today's Meetings
              </span>
            </div>

            <p className="mt-3 text-2xl font-bold">
              {meetings}
            </p>

            <p className="text-sm text-sky-100">
              Scheduled Today
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />

              <span className="text-sm font-medium">
                Inbox
              </span>
            </div>

            <p className="mt-3 text-2xl font-bold">
              {unreadEmails}
            </p>

            <p className="text-sm text-sky-100">
              Unread Emails
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}