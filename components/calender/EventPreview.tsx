"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  FileText,
  ExternalLink,
} from "lucide-react";

import { CalendarEvent } from "./EventList";

type EventPreviewProps = {
  event: CalendarEvent | null;
};

export default function EventPreview({
  event,
}: EventPreviewProps) {
  if (!event) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="text-center">
          <Calendar className="mx-auto mb-4 h-14 w-14 text-slate-300" />

          <h2 className="text-xl font-semibold text-slate-700">
            No Event Selected
          </h2>

          <p className="mt-2 text-slate-500">
            Select an event to view details.
          </p>
        </div>
      </div>
    );
  }

  const start = new Date(event.start);
  const end = new Date(event.end);

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-2xl font-bold">
          {event.title}
        </h1>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 text-slate-600">
            <Calendar className="h-5 w-5 text-sky-600" />
            <span>
              {start.toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <Clock className="h-5 w-5 text-sky-600" />
            <span>
              {start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - "}
              {end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {event.location && (
            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="h-5 w-5 text-sky-600" />
              <span>{event.location}</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-slate-600">
            <Users className="h-5 w-5 text-sky-600" />
            <span>
              {event.attendees.length} Attendees
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-sky-600" />

          <h2 className="text-lg font-semibold">
            Description
          </h2>
        </div>

        <div className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 leading-7 text-slate-700">
          {event.description || "No description provided."}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 p-5">
        {event.meetLink ? (
          <a
            href={event.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700"
          >
            <Video className="h-5 w-5" />
            Join Google Meet
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <button
            disabled
            className="w-full rounded-xl bg-slate-200 px-5 py-3 font-medium text-slate-500"
          >
            No Meeting Link
          </button>
        )}
      </div>
    </div>
  );
}