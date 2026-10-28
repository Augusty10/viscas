"use client";

import React, { useState } from "react";
import { LANDING_CONTENT, FaqItem } from "@/lib/landing-data";
import LandingSection from "./LandingSection";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const { badge, title, subtitle, items } = LANDING_CONTENT.faq;
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <LandingSection
      id="faq"
      badge={badge}
      title={title}
      subtitle={subtitle}
      background="white"
      size="narrow"
    >
      <div className="w-full divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
        {items.map((item: FaqItem) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="py-5 sm:py-6">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 text-left font-heading text-lg sm:text-xl font-bold text-[#0B1F4B] hover:text-[#0070E0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0] rounded-lg cursor-pointer"
              >
                <span className="pr-2">{item.question}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5F8FC] border border-[#E2E8F0] text-[#0B1F4B] transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-[#0070E0] text-white border-[#0070E0]" : ""
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>

              {isOpen && (
                <div className="mt-3.5 pr-10 text-sm sm:text-base text-[#4A5568] leading-relaxed font-normal animate-in fade-in slide-in-from-top-1 duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reassurance footer under FAQ */}
      <div className="mt-10 text-center text-xs sm:text-sm text-[#64748B]">
        Have a question not listed here?{" "}
        <a
          href="/login"
          className="font-bold text-[#0070E0] hover:underline"
        >
          Contact our support team
        </a>
      </div>
    </LandingSection>
  );
}
