"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Video,
  Calendar,
} from "lucide-react";
import { useCalendarStore } from "@/hooks/useCalendar";

type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  attendees: any[];
  meetLink: string;
};

type CalendarGridProps = {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  selectedEvent: CalendarEvent | null;
};

const HOUR_HEIGHT = 70; // Height of an hour slot in px

// Date helpers
const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const formatTime = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const getMonthDays = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay(); // 0: Sun, 6: Sat

  const days: Date[] = [];

  // Previous month padding days
  const prevMonth = new Date(year, month - 1, 1);
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, daysInPrevMonth - i));
  }

  // Current month days
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push(new Date(year, month, i));
  }

  // Next month padding days to reach full weeks
  const remainingCells = days.length % 7 === 0 ? 0 : 7 - (days.length % 7);
  for (let i = 1; i <= remainingCells; i++) {
    days.push(new Date(year, month + 1, i));
  }

  // Ensure exactly 6 rows (42 days) for layout consistency
  while (days.length < 42) {
    const nextDayNum = days.length - (startDayOfWeek + daysInCurrentMonth) + 1;
    days.push(new Date(year, month + 1, nextDayNum));
  }

  return days;
};

const getWeekDays = (date: Date) => {
  const currentDayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - currentDayOfWeek);

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  return days;
};

const eventOverlapsDay = (event: CalendarEvent, day: Date) => {
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);

  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0, 0);
  const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59, 999);

  return eventStart <= dayEnd && eventEnd >= dayStart;
};

// Layout calculation helper for overlapping events in Week/Day views
const getOverlappingLayout = (dayEvents: CalendarEvent[]) => {
  const sorted = [...dayEvents].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const columns: CalendarEvent[][] = [];
  sorted.forEach((event) => {
    let placed = false;
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      const lastEvent = col[col.length - 1];
      const lastEnd = new Date(lastEvent.end).getTime();
      const thisStart = new Date(event.start).getTime();

      if (thisStart >= lastEnd) {
        col.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) {
      columns.push([event]);
    }
  });

  const eventLayouts = new Map<string, { width: number; left: number }>();
  columns.forEach((col, colIndex) => {
    col.forEach((event) => {
      eventLayouts.set(event.id, {
        width: 100 / columns.length,
        left: (colIndex * 100) / columns.length,
      });
    });
  });

  return eventLayouts;
};

export default function CalendarGrid({
  events,
  onSelectEvent,
  selectedEvent,
}: CalendarGridProps) {
  const { currentView, selectedDate, setSelectedDate, setNewEventOpen } =
    useCalendarStore();

  const weekTimelineRef = useRef<HTMLDivElement>(null);
  const dayTimelineRef = useRef<HTMLDivElement>(null);

  // Scroll to 8 AM on load for Week and Day views
  useEffect(() => {
    const scrollTo8AM = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        ref.current.scrollTop = 8 * HOUR_HEIGHT;
      }
    };

    if (currentView === "week") {
      scrollTo8AM(weekTimelineRef);
    } else if (currentView === "day") {
      scrollTo8AM(dayTimelineRef);
    }
  }, [currentView]);

  const handlePrev = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      if (currentView === "month") {
        d.setMonth(d.getMonth() - 1);
      } else if (currentView === "week") {
        d.setDate(d.getDate() - 7);
      } else {
        d.setDate(d.getDate() - 1);
      }
      return d;
    });
  };

  const handleNext = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      if (currentView === "month") {
        d.setMonth(d.getMonth() + 1);
      } else if (currentView === "week") {
        d.setDate(d.getDate() + 7);
      } else {
        d.setDate(d.getDate() + 1);
      }
      return d;
    });
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const getHeaderLabel = () => {
    if (currentView === "month") {
      return selectedDate.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    } else if (currentView === "week") {
      const weekDays = getWeekDays(selectedDate);
      const start = weekDays[0];
      const end = weekDays[6];
      if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString(undefined, {
          month: "short",
        })} ${start.getFullYear()}`;
      } else if (start.getFullYear() === end.getFullYear()) {
        return `${start.toLocaleDateString(undefined, {
          month: "short",
        })} – ${end.toLocaleDateString(undefined, {
          month: "short",
        })} ${start.getFullYear()}`;
      } else {
        return `${start.toLocaleDateString(undefined, {
          month: "short",
          year: "numeric",
        })} – ${end.toLocaleDateString(undefined, {
          month: "short",
          year: "numeric",
        })}`;
      }
    } else {
      return selectedDate.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekDaysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm overflow-hidden">
      {/* Calendar Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-800">
            {getHeaderLabel()}
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-1">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-white hover:text-slate-900 active:scale-95 cursor-pointer"
            title="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleToday}
            className="px-4 py-2 text-sm font-semibold rounded-xl text-sky-600 transition hover:bg-white hover:text-sky-700 active:scale-95 cursor-pointer"
          >
            Today
          </button>
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-white hover:text-slate-900 active:scale-95 cursor-pointer"
            title="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Calendar View Area */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        {/* MONTH VIEW */}
        {currentView === "month" && (
          <div className="flex h-full flex-col overflow-hidden">
            {/* Weekdays labels */}
            <div className="grid grid-cols-7 border-b border-slate-100 pb-3 text-center shrink-0">
              {weekDaysList.map((day) => (
                <div key={day} className="text-sm font-semibold text-slate-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 grid-rows-6 flex-1 gap-px bg-slate-100 mt-2 overflow-hidden rounded-2xl border border-slate-100">
              {getMonthDays(selectedDate).map((day, idx) => {
                const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
                const isTodayDate = isSameDay(day, new Date());
                const dayEvents = events.filter((event) =>
                  eventOverlapsDay(event, day)
                );

                return (
                  <div
                    key={idx}
                    className={`flex flex-col bg-white p-2 min-h-0 relative group transition-colors hover:bg-slate-50/50 ${
                      isCurrentMonth ? "" : "bg-slate-50/40 text-slate-400"
                    }`}
                  >
                    {/* Day Number */}
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                          isTodayDate
                            ? "bg-sky-600 text-white shadow-sm"
                            : isCurrentMonth
                            ? "text-slate-800"
                            : "text-slate-400"
                        }`}
                      >
                        {day.getDate()}
                      </span>
                    </div>

                    {/* Events Container */}
                    <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {dayEvents.slice(0, 3).map((event) => (
                        <button
                          key={event.id}
                          onClick={() => onSelectEvent(event)}
                          className={`w-full text-left truncate text-[11px] font-semibold px-2 py-1 rounded-lg border transition cursor-pointer hover:shadow-sm active:scale-[0.98] ${
                            selectedEvent?.id === event.id
                              ? "bg-sky-100 border-sky-300 text-sky-700 font-bold"
                              : "bg-sky-50 border-sky-100 text-sky-600 hover:bg-sky-100/60 hover:border-sky-200"
                          }`}
                        >
                          {formatTime(event.start)} {event.title}
                        </button>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-[10px] font-semibold text-slate-400 pl-2">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* WEEK VIEW */}
        {currentView === "week" && (
          <div className="flex h-full flex-col overflow-hidden">
            {/* Week header: Date boxes */}
            <div className="grid grid-cols-[60px_1fr] border-b border-slate-100 pb-3 shrink-0">
              <div className="w-[60px]" />
              <div className="grid grid-cols-7 text-center">
                {getWeekDays(selectedDate).map((day, idx) => {
                  const isTodayDate = isSameDay(day, new Date());
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-slate-400">
                        {weekDaysList[day.getDay()]}
                      </span>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold mt-1 ${
                          isTodayDate
                            ? "bg-sky-600 text-white shadow-sm"
                            : "text-slate-800"
                        }`}
                      >
                        {day.getDate()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Hourly Container */}
            <div
              ref={weekTimelineRef}
              className="flex-1 overflow-y-auto pr-1"
            >
              <div
                className="grid grid-cols-[60px_1fr] relative"
                style={{ height: `${24 * HOUR_HEIGHT}px` }}
              >
                {/* Hourly grid lines background */}
                <div className="absolute inset-0 grid grid-cols-[60px_1fr] pointer-events-none">
                  <div className="border-r border-slate-100" />
                  <div className="grid grid-cols-7 h-full divide-x divide-slate-100">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="h-full" />
                    ))}
                  </div>
                </div>

                {/* Hourly horizontal lines */}
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="absolute left-0 w-full border-b border-slate-100 flex items-start"
                    style={{
                      top: `${hour * HOUR_HEIGHT}px`,
                      height: `${HOUR_HEIGHT}px`,
                    }}
                  >
                    <span className="text-[10px] font-bold text-slate-400 w-[50px] text-right pr-2 select-none">
                      {hour === 0
                        ? "12 AM"
                        : hour === 12
                        ? "12 PM"
                        : hour < 12
                        ? `${hour} AM`
                        : `${hour - 12} PM`}
                    </span>
                  </div>
                ))}

                {/* Event Blocks Container */}
                <div className="col-start-2 grid grid-cols-7 h-full relative">
                  {getWeekDays(selectedDate).map((day, dayIdx) => {
                    const dayEvents = events.filter((event) =>
                      eventOverlapsDay(event, day)
                    );
                    const layouts = getOverlappingLayout(dayEvents);

                    return (
                      <div key={dayIdx} className="h-full relative">
                        {dayEvents.map((event) => {
                          const layout = layouts.get(event.id) || {
                            width: 100,
                            left: 0,
                          };
                          const start = new Date(event.start);
                          const end = new Date(event.end);
                          const startHour = start.getHours();
                          const startMin = start.getMinutes();
                          const durationHrs =
                            (end.getTime() - start.getTime()) / (1000 * 60 * 60);

                          const top = (startHour + startMin / 60) * HOUR_HEIGHT;
                          const height = Math.max(durationHrs * HOUR_HEIGHT, 28);

                          return (
                            <button
                              key={event.id}
                              onClick={() => onSelectEvent(event)}
                              style={{
                                top: `${top}px`,
                                height: `${height}px`,
                                left: `${layout.left}%`,
                                width: `${layout.width - 2}%`,
                              }}
                              className={`absolute mx-[1%] rounded-xl p-2 text-left border flex flex-col justify-between overflow-hidden shadow-sm hover:shadow transition cursor-pointer active:scale-95 ${
                                selectedEvent?.id === event.id
                                  ? "bg-sky-100 border-sky-300 text-sky-800 font-bold"
                                  : "bg-sky-50 border-sky-100 text-sky-700 hover:bg-sky-100/80 hover:border-sky-200"
                              }`}
                            >
                              <div className="truncate text-xs font-bold leading-tight">
                                {event.title}
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-[9px] font-semibold text-slate-500 truncate leading-none">
                                <Clock className="h-2.5 w-2.5 shrink-0" />
                                <span>
                                  {formatTime(event.start)} - {formatTime(event.end)}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DAY VIEW */}
        {currentView === "day" && (
          <div className="flex h-full flex-col overflow-hidden">
            {/* Scrollable Hourly Container */}
            <div
              ref={dayTimelineRef}
              className="flex-1 overflow-y-auto pr-1"
            >
              <div
                className="grid grid-cols-[60px_1fr] relative"
                style={{ height: `${24 * HOUR_HEIGHT}px` }}
              >
                {/* Hourly grid lines background */}
                <div className="absolute inset-0 grid grid-cols-[60px_1fr] pointer-events-none">
                  <div className="border-r border-slate-100" />
                  <div className="h-full" />
                </div>

                {/* Hourly horizontal lines */}
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="absolute left-0 w-full border-b border-slate-100 flex items-start"
                    style={{
                      top: `${hour * HOUR_HEIGHT}px`,
                      height: `${HOUR_HEIGHT}px`,
                    }}
                  >
                    <span className="text-[10px] font-bold text-slate-400 w-[50px] text-right pr-2 select-none">
                      {hour === 0
                        ? "12 AM"
                        : hour === 12
                        ? "12 PM"
                        : hour < 12
                        ? `${hour} AM`
                        : `${hour - 12} PM`}
                    </span>
                  </div>
                ))}

                {/* Event Blocks Container */}
                <div className="col-start-2 h-full relative">
                  {(() => {
                    const dayEvents = events.filter((event) =>
                      eventOverlapsDay(event, selectedDate)
                    );
                    const layouts = getOverlappingLayout(dayEvents);

                    return dayEvents.map((event) => {
                      const layout = layouts.get(event.id) || {
                        width: 100,
                        left: 0,
                      };
                      const start = new Date(event.start);
                      const end = new Date(event.end);
                      const startHour = start.getHours();
                      const startMin = start.getMinutes();
                      const durationHrs =
                        (end.getTime() - start.getTime()) / (1000 * 60 * 60);

                      const top = (startHour + startMin / 60) * HOUR_HEIGHT;
                      const height = Math.max(durationHrs * HOUR_HEIGHT, 40);

                      return (
                        <button
                          key={event.id}
                          onClick={() => onSelectEvent(event)}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            left: `${layout.left}%`,
                            width: `${layout.width - 2}%`,
                          }}
                          className={`absolute mx-[1%] rounded-2xl p-4 text-left border flex flex-col justify-between overflow-hidden shadow-sm hover:shadow transition cursor-pointer active:scale-95 ${
                            selectedEvent?.id === event.id
                              ? "bg-sky-100 border-sky-300 text-sky-800 font-bold"
                              : "bg-sky-50 border-sky-100 text-sky-700 hover:bg-sky-100/80 hover:border-sky-200"
                          }`}
                        >
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold leading-snug">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                              <Clock className="h-3.5 w-3.5" />
                              <span>
                                {formatTime(event.start)} - {formatTime(event.end)}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                <MapPin className="h-3.5 w-3.5" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}
                          </div>

                          {event.meetLink && (
                            <div className="flex items-center gap-1 text-[11px] font-bold text-sky-600 mt-2">
                              <Video className="h-3.5 w-3.5" />
                              <span>Join Google Meet</span>
                            </div>
                          )}
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
