"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import CalendarLayout from "./CalendarLayout";
import CalendarGrid from "./CalendarGrid";
import EventPreview from "./EventPreview";
import TodayAgenda from "./TodayAgenda";
import UpcomingMeetings from "./UpcomingMeetings";
import AIPlanner from "./AIPlanner";
import NewEventDialog from "./NewEventDialog";
import EditEventDialog from "./EditEventDialog";

import { getEvents, parseEvent, deleteEvent } from "@/lib/calendar";
import { useCalendarStore } from "@/hooks/useCalendar";

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { refreshTrigger, triggerRefresh, setEditEventOpen, setEditingEvent } = useCalendarStore();

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
  }, [refreshTrigger]);

  const handleDelete = async (eventToDelete: Event) => {
    if (!window.confirm(`Are you sure you want to delete the meeting "${eventToDelete.title}"?`)) {
      return;
    }

    const token = localStorage.getItem("google_access_token");
    if (!token) {
      alert("Please connect your Google Account first.");
      return;
    }

    try {
      await deleteEvent(token, eventToDelete.id);
      setIsPreviewOpen(false);
      setSelectedEvent(null);
      triggerRefresh();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to delete event. Please try again.");
    }
  };

  return (
    <>
      <CalendarLayout>
        <div className="grid h-full grid-cols-12 gap-6">
          {/* Main Calendar View */}
          <section className="col-span-9 h-full overflow-hidden">
            <CalendarGrid
              events={events}
              onSelectEvent={(event) => {
                setSelectedEvent(event);
                setIsPreviewOpen(true);
              }}
              selectedEvent={selectedEvent}
            />
          </section>

          {/* Right Sidebar */}
          <aside className="col-span-3 space-y-6 overflow-y-auto">
            <TodayAgenda events={events} />

            <UpcomingMeetings events={events} />

            <AIPlanner event={selectedEvent} />
          </aside>
        </div>
      </CalendarLayout>

      {/* Event Preview Overlay */}
      {isPreviewOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl h-[85vh] max-h-[700px] overflow-hidden rounded-3xl relative animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            <button
              onClick={() => {
                setIsPreviewOpen(false);
                setSelectedEvent(null);
              }}
              className="absolute right-6 top-6 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition bg-white/80 border border-slate-100 backdrop-blur-sm cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <EventPreview
              event={selectedEvent}
              onEdit={() => {
                setEditingEvent(selectedEvent);
                setEditEventOpen(true);
                setIsPreviewOpen(false);
              }}
              onDelete={() => handleDelete(selectedEvent)}
            />
          </div>
        </div>
      )}
      <NewEventDialog />
      <EditEventDialog />
    </>
  );
}