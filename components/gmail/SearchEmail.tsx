"use client";

import { Search, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

type SearchEmailProps = {
  onSearch: (query: string) => void;
};

export default function SearchEmail({
  onSearch,
}: SearchEmailProps) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  // Debounced search trigger
  useEffect(() => {
    setSearching(query.trim() !== "");
    const delayDebounceFn = setTimeout(() => {
      onSearch(query.trim());
      setSearching(false);
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors duration-250 group-focus-within:text-sky-500" />

      <input
        type="text"
        placeholder="Search inbox emails..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-12 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
      />

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
        {searching ? (
          <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
        ) : (
          query && (
            <button
              onClick={clearSearch}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )
        )}
      </div>
    </div>
  );
}