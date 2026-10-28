"use client";

import React, { useState } from "react";
import { LANDING_CONTENT, TestimonialItem } from "@/lib/landing-data";
import LandingSection from "./LandingSection";
import LandingCard from "./LandingCard";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const { badge, title, subtitle, items } = LANDING_CONTENT.testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const current = items[currentIndex];

  return (
    <LandingSection
      id="testimonials"
      badge={badge}
      title={title}
      subtitle={subtitle}
      background="light"
    >
      <div className="max-w-4xl mx-auto">
        {/* Main Testimonial Card */}
        <div className="relative rounded-3xl bg-white border border-[#E2E8F0] p-8 sm:p-12 shadow-[0_16px_40px_-8px_rgba(11,31,75,0.08)]">
          <Quote className="h-10 w-10 text-[#BAD8FB] mb-6" />

          {/* Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-amber-400 text-amber-400"
              />
            ))}
            <span className="ml-2 text-xs font-bold text-[#0070E0] bg-[#EBF4FE] px-2.5 py-0.5 rounded-full border border-[#BAD8FB]/60">
              {current.highlight}
            </span>
          </div>

          {/* Quote Text */}
          <blockquote className="font-heading text-xl sm:text-2xl md:text-[26px] font-semibold text-[#0B1F4B] leading-snug mb-8">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Author Details and Nav Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0070E0] text-white font-heading font-extrabold text-sm shadow-xs">
                {current.avatarText}
              </div>
              <div>
                <div className="font-bold text-base text-[#0B1F4B]">
                  {current.author}
                </div>
                <div className="text-xs sm:text-sm text-[#64748B]">
                  {current.role} · <span className="font-medium text-[#0B1F4B]">{current.company}</span>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#0B1F4B] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <span className="text-xs font-bold text-[#64748B] px-2">
                {currentIndex + 1} / {items.length}
              </span>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#0B1F4B] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Bar */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-[#0070E0]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </LandingSection>
  );
}
