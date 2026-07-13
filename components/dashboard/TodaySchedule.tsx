"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Video,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { getEvents, parseEvent } from "@/lib/calendar";

type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  attendees: any[];
  meetLink: string;
};

type TodayScheduleProps = {
  events?: Event[];
};

export default function TodaySchedule({ events: propEvents }: TodayScheduleProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(propEvents === undefined);

  useEffect(() => {
    if (propEvents !== undefined) {
      setEvents(propEvents);
      setLoading(false);
      return;
    }

    async function loadTodayEvents() {
      try {
        const token = localStorage.getItem(
          "google_access_token"
        );

        if (!token) {
          setLoading(false);
          return;
        }

        const result = await getEvents(token);

        const today = new Date();

        const todayEvents = (result.items || [])
          .map(parseEvent)
          .filter((event: Event) => {
            const date = new Date(event.start);

            return (
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()
            );
          });

        setEvents(todayEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadTodayEvents();
  }, [propEvents]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Today's Schedule
          </h2>

          <p className="text-sm text-slate-500">
            Google Calendar
          </p>
        </div>

        <Link
          href="/dashboard/calendar"
          className="flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700"
        >
          View Calendar

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-500">
          Loading schedule...
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <CalendarDays className="mx-auto mb-3 h-10 w-10 text-slate-400" />

          <p className="font-medium">
            No meetings today
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Enjoy your free schedule.
          </p>
        </div>
      ) : (
        <div className="space-y-5 max-h-[380px] overflow-y-auto pr-1">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-sky-300 hover:bg-sky-50"
            >
              <h3 className="text-lg font-semibold">
                {event.title}
              </h3>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-sky-600" />

                  {new Date(event.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-600" />

                    {event.location}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-sky-600" />

                  {event.attendees.length} Attendee
                  {event.attendees.length !== 1 ? "s" : ""}
                </div>
              </div>

              {event.meetLink && (
                <a
                  href={event.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-fit items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                >
                  <Video className="h-4 w-4" />

                  Join Google Meet
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}