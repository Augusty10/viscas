"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "../common/Container";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is Viscas?",
    answer: "Viscas is an AI-powered productivity workspace that unifies Gmail, Google Calendar, and an AI assistant into one clean, calm dashboard.",
  },
  {
    question: "Is Viscas free to use?",
    answer: "Yes — the Free plan covers Gmail and Calendar integration with a daily AI allowance, no credit card required.",
  },
  {
    question: "Is my Gmail data secure?",
    answer: "Viscas connects exclusively through Google's official OAuth 2.0 flow and never stores your Google password or private credentials.",
  },
  {
    question: "Which AI model does Viscas use?",
    answer: "Viscas uses state-of-the-art large language models to summarize incoming mail, draft context-aware replies, and answer workspace schedule queries.",
  },
  {
    question: "Will mobile devices be supported?",
    answer: "Viscas is built mobile-first, ensuring a smooth and responsive experience across all modern phone and tablet browsers.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-slate-200" id="faq">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-14">
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
            FAQ
          </span>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-2xl">
            Everything you need to know about the Viscas AI workspace.
          </p>
        </div>

        {/* Centered Accordion List */}
        <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200 mb-20">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-2">
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center py-4 text-left font-semibold text-base sm:text-lg text-slate-900 cursor-pointer hover:text-sky-600 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-4 pr-6 text-slate-600 text-sm sm:text-base leading-relaxed animate-in fade-in-50 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dedicated Bottom CTA Banner (No two-column cramped collision) */}
        <div className="relative overflow-hidden rounded-2xl bg-pine-950 px-8 py-12 sm:px-12 sm:py-16 text-center text-white shadow-2xl max-w-5xl mx-auto border border-white/10">
          {/* Background growth-rings */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 opacity-30 select-none">
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] max-w-none"
              viewBox="0 0 640 640"
              aria-hidden="true"
            >
              <circle
                className="animate-spin-slow"
                cx="320"
                cy="320"
                r="280"
                stroke="#0EA5E9"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
                style={{ transformOrigin: "320px 320px" }}
              />
              <circle
                className="animate-spin-slow-rev"
                cx="320"
                cy="320"
                r="200"
                stroke="#1C5A44"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
                style={{ transformOrigin: "320px 320px" }}
              />
            </svg>
          </div>

          {/* Banner Content */}
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
              Ready to reclaim your inbox?
            </h3>
            <p className="text-base text-white/85 leading-relaxed mb-8 font-normal">
              Start free — upgrade only when the AI is doing work you&apos;d rather not do yourself.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <Button asChild size="lg" variant="default" className="w-full sm:w-auto font-bold shadow-md">
                <Link href="/login">Get Started Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 shadow-xs"
              >
                <Link href="/login" className="flex items-center gap-2">
                  <Play className="h-4 w-4 fill-white" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}