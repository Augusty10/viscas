"use client";

import { useState, useEffect } from "react";
import { X, Calendar, MapPin, AlignLeft, Users, Video, Loader2, Sparkles } from "lucide-react";
import { useCalendarStore } from "@/hooks/useCalendar";
import { createEvent } from "@/lib/calendar";

export default function NewEventDialog() {
  const { isNewEventOpen, setNewEventOpen, triggerRefresh } = useCalendarStore();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendeesInput, setAttendeesInput] = useState("");
  const [createMeetLink, setCreateMeetLink] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch token and prefill dates on open
  useEffect(() => {
    if (isNewEventOpen) {
      const token = localStorage.getItem("google_access_token");
      setAccessToken(token);

      // Default start: tomorrow at 10:00 AM
      const start = new Date();
      start.setDate(start.getDate() + 1);
      start.setHours(10, 0, 0, 0);

      // Default end: tomorrow at 11:00 AM
      const end = new Date(start);
      end.setHours(11, 0, 0, 0);

      // Format to datetime-local local string format: YYYY-MM-DDTHH:MM
      const formatDateTimeLocal = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().substring(0, 16);
      };

      setStartDate(formatDateTimeLocal(start));
      setEndDate(formatDateTimeLocal(end));

      // Reset form fields
      setTitle("");
      setDescription("");
      setLocation("");
      setAttendeesInput("");
      setCreateMeetLink(false);
      setError(null);
    }
  }, [isNewEventOpen]);

  if (!isNewEventOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken) {
      setError("Please connect your Google Account first.");
      return;
    }

    if (!title.trim()) {
      setError("Event title is required.");
      return;
    }

    const startISO = new Date(startDate).toISOString();
    const endISO = new Date(endDate).toISOString();

    if (new Date(endISO) <= new Date(startISO)) {
      setError("End date & time must be after the start date & time.");
      return;
    }

    setLoading(true);
    setError(null);

    // Parse attendees (comma-separated emails)
    const attendees = attendeesInput
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)); // valid email regex

    try {
      await createEvent(accessToken, {
        title,
        description,
        location,
        start: startISO,
        end: endISO,
        attendees,
        createMeetLink,
      });

      setNewEventOpen(false);
      triggerRefresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2 text-sky-600">
            <Calendar className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-800">New Calendar Event</h2>
          </div>
          <button
            onClick={() => setNewEventOpen(false)}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600 border border-red-100">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Weekly Sync Meeting"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Start Time</label>
              <input
                type="datetime-local"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">End Time</label>
              <input
                type="datetime-local"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-400" /> Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Conference Room A or Remote"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {/* Attendees */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Users className="h-4 w-4 text-slate-400" /> Guests
            </label>
            <input
              type="text"
              value={attendeesInput}
              onChange={(e) => setAttendeesInput(e.target.value)}
              placeholder="e.g., alex@company.com, sarah@company.com"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <AlignLeft className="h-4 w-4 text-slate-400" /> Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Meeting agenda, details, etc."
              rows={3}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 resize-none"
            />
          </div>

          {/* Google Meet Toggle */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              id="meet-link"
              checked={createMeetLink}
              onChange={(e) => setCreateMeetLink(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="meet-link" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 select-none cursor-pointer">
              <Video className="h-4 w-4 text-sky-600" /> Add Google Meet video conferencing
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setNewEventOpen(false)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-700 hover:shadow-lg transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
