"use client";

import {
  Video,
  Clock,
  ExternalLink,
} from "lucide-react";

import { CalendarEvent } from "./EventList";

type UpcomingMeetingsProps = {
  events: CalendarEvent[];
};

export default function UpcomingMeetings({
  events,
}: UpcomingMeetingsProps) {
  const meetings = events
    .filter((event) => event.meetLink)
    .slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-green-100 p-2">
          <Video className="h-5 w-5 text-green-600" />
        </div>

        <div>
          <h2 className="font-semibold">
            Upcoming Meetings
          </h2>

          <p className="text-sm text-slate-500">
            {meetings.length} Google Meet meeting
            {meetings.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">
          <Video className="mx-auto mb-3 h-10 w-10 text-slate-400" />

          <p className="font-medium text-slate-700">
            No upcoming meetings
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Google Meet events will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <h3 className="font-semibold">
                {meeting.title}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />

                {new Date(meeting.start).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>

              <a
                href={meeting.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                <Video className="h-4 w-4" />
                Join Google Meet
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}