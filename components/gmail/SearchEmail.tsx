"use client";

import { Search, X } from "lucide-react";
import { useState, KeyboardEvent } from "react";

type SearchEmailProps = {
  onSearch: (query: string) => void;
};

export default function SearchEmail({
  onSearch,
}: SearchEmailProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        placeholder="Search emails..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 outline-none transition focus:border-sky-500"
      />

      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-100"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>
      )}
    </div>
  );
}