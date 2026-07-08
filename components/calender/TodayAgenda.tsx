"use client";

import {
  CalendarDays,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { CalendarEvent } from "./EventList";

type TodayAgendaProps = {
  events: CalendarEvent[];
};

export default function TodayAgenda({
  events,
}: TodayAgendaProps) {
  const today = new Date();

  const todayEvents = events.filter((event) => {
    const eventDate = new Date(event.start);

    return (
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-sky-100 p-2">
          <CalendarDays className="h-5 w-5 text-sky-600" />
        </div>

        <div>
          <h2 className="font-semibold">
            Today's Agenda
          </h2>

          <p className="text-sm text-slate-500">
            {todayEvents.length} event
            {todayEvents.length !== 1 ? "s" : ""} today
          </p>
        </div>
      </div>

      {todayEvents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">
          <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-500" />

          <p className="font-medium text-slate-700">
            You're free today 🎉
          </p>

          <p className="mt-1 text-sm text-slate-500">
            No meetings scheduled.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {todayEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300"
            >
              <h3 className="font-semibold">
                {event.title}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />

                {new Date(event.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}