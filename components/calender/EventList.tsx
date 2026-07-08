"use client";

import EventCard from "./EventCard";

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  attendees: any[];
  meetLink: string;
};

type EventListProps = {
  events: CalendarEvent[];
  onSelect: (event: CalendarEvent) => void;
};

export default function EventList({
  events,
  onSelect,
}: EventListProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Upcoming Events
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {events.length} scheduled events
        </p>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500">
            No upcoming events found.
          </p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => onSelect(event)}
            />
          ))}
        </div>
      )}
    </div>
  );
}