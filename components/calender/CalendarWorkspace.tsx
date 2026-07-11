"use client";

import { useEffect, useState } from "react";

import CalendarLayout from "./CalendarLayout";
import EventList from "./EventList";
import EventPreview from "./EventPreview";
import TodayAgenda from "./TodayAgenda";
import UpcomingMeetings from "./UpcomingMeetings";
import AIPlanner from "./AIPlanner";

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

export default function CalendarWorkspace() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] =
    useState<Event | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem(
      "google_access_token"
    );

    if (!accessToken) return;

    async function loadEvents(token: string) {
      try {
        const result = await getEvents(token);

        const parsed = result.items.map(parseEvent);

        setEvents(parsed);

        if (parsed.length > 0) {
          setSelectedEvent(parsed[0]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadEvents(accessToken);
  }, []);

  return (
    <CalendarLayout>
      <div className="grid h-full grid-cols-12 gap-6">
        {/* Events */}
        <section className="col-span-4 overflow-y-auto">
          <EventList
            events={events}
            onSelect={setSelectedEvent}
          />
        </section>

        {/* Preview */}
        <section className="col-span-5 overflow-y-auto">
          <EventPreview event={selectedEvent} />
        </section>

        {/* Right Sidebar */}
        <aside className="col-span-3 space-y-6 overflow-y-auto">
          <TodayAgenda events={events} />

          <UpcomingMeetings events={events} />

          <AIPlanner event={selectedEvent} />
        </aside>
      </div>
    </CalendarLayout>
  );
}