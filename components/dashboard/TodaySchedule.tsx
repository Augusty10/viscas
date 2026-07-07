import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

const events = [
  {
    title: "Team Standup",
    time: "09:00 AM",
    location: "Google Meet",
    type: "Meeting",
  },
  {
    title: "College Project Review",
    time: "11:30 AM",
    location: "Classroom",
    type: "Review",
  },
  {
    title: "AI Product Demo",
    time: "03:30 PM",
    location: "Zoom",
    type: "Presentation",
  },
];

export default function TodaySchedule() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
            <CalendarDays className="h-6 w-6 text-sky-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Today's Schedule
            </h2>

            <p className="text-sm text-slate-500">
              Upcoming meetings & events
            </p>
          </div>
        </div>

        <button className="text-sm font-medium text-sky-600 hover:underline">
          View Calendar
        </button>
      </div>

      {/* Event List */}
      <div className="mt-6 space-y-4">
        {events.map((event) => (
          <div
            key={event.title}
            className="rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-slate-50"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">
                  {event.title}
                </h3>

                <span className="mt-2 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                  {event.type}
                </span>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}