"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X, Mail, Calendar, Loader2, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type EmailResult = {
  id: string;
  sender: string;
  subject: string;
  summary: string | null;
  priority: string;
};

type EventResult = {
  id: string;
  title: string;
  start: string;
  location: string | null;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<{
    emails: EmailResult[];
    events: EventResult[];
  }>({ emails: [], events: [] });

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search fetch
  useEffect(() => {
    if (!query.trim()) {
      setResults({ emails: [], events: [] });
      setLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success) {
          setResults({
            emails: data.emails || [],
            events: data.events || [],
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setResults({ emails: [], events: [] });
    setOpen(false);
  };

  const hasResults = results.emails.length > 0 || results.events.length > 0;

  return (
    <div className="relative w-full max-w-lg" ref={containerRef}>
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search emails, meetings, events..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-20 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
        />

        {/* Action icons / keys */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
          ) : query ? (
            <button
              onClick={clearSearch}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <div className="pointer-events-none hidden items-center gap-0.5 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-400 shadow-sm md:flex">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Results Dropdown */}
      <AnimatePresence>
        {open && (query.trim() !== "") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 z-50 mt-3 max-h-[480px] overflow-y-auto rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-2xl backdrop-blur-xl"
          >
            {loading && !hasResults ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-500">
                <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
                <span className="text-sm font-medium">Searching workspace...</span>
              </div>
            ) : !hasResults ? (
              <div className="py-8 text-center text-slate-500">
                <p className="font-semibold text-slate-700">No results found</p>
                <p className="mt-1 text-xs text-slate-400">
                  No matching emails or meetings for "{query}"
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Emails Segment */}
                {results.emails.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span>Emails</span>
                      <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px]">
                        {results.emails.length}
                      </span>
                    </h3>
                    <div className="space-y-1">
                      {results.emails.map((email) => (
                        <Link
                          key={email.id}
                          href="/dashboard/gmail"
                          onClick={() => setOpen(false)}
                          className="block rounded-2xl p-3 hover:bg-sky-50 transition duration-150 border border-transparent hover:border-sky-100"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-500 truncate">
                                {email.sender}
                              </p>
                              <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">
                                {email.subject || "(No Subject)"}
                              </p>
                              {email.summary && (
                                <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-medium">
                                  {email.summary}
                                </p>
                              )}
                            </div>
                            {email.priority === "HIGH" && (
                              <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 uppercase">
                                Urgent
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events Segment */}
                {results.events.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Meetings & Events</span>
                      <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px]">
                        {results.events.length}
                      </span>
                    </h3>
                    <div className="space-y-1">
                      {results.events.map((event) => (
                        <Link
                          key={event.id}
                          href="/dashboard/calendar"
                          onClick={() => setOpen(false)}
                          className="block rounded-2xl p-3 hover:bg-emerald-50 transition duration-150 border border-transparent hover:border-emerald-100"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-slate-800 truncate">
                                {event.title}
                              </p>
                              {event.location && (
                                <p className="text-xs text-slate-400 truncate mt-1">
                                  📍 {event.location}
                                </p>
                              )}
                            </div>
                            <div className="shrink-0 text-right text-[10px] font-bold text-emerald-600">
                              {new Date(event.start).toLocaleDateString([], {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}