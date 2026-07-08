"use client";

import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Video,
} from "lucide-react";

import { CalendarEvent } from "./EventList";

type EventCardProps = {
  event: CalendarEvent;
  onClick: () => void;
};

export default function EventCard({
  event,
  onClick,
}: EventCardProps) {
  const startDate = new Date(event.start);

  const date = startDate.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

  const time = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-sky-400 hover:bg-sky-50 hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {event.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays className="h-4 w-4" />
            {date}
          </div>

          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            {time}
          </div>
        </div>

        {event.meetLink && (
          <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Google Meet
          </div>
        )}
      </div>

      {/* Description */}
      {event.description && (
        <p className="mt-4 line-clamp-2 text-sm text-slate-600">
          {event.description}
        </p>
      )}

      {/* Location */}
      {event.location && (
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          {event.location}
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Users className="h-4 w-4" />
          {event.attendees.length} Attendees
        </div>

        {event.meetLink && (
          <div className="flex items-center gap-2 text-sky-600">
            <Video className="h-4 w-4" />
            Meet
          </div>
        )}
      </div>
    </button>
  );
}