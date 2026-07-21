"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "../common/Container";

const faqs = [
  {
    question: "What is Viscas?",
    answer: "Viscas is an AI-powered productivity workspace that unifies Gmail, Google Calendar, and an AI assistant into one dashboard.",
  },
  {
    question: "Is Viscas free to use?",
    answer: "Yes — the Free plan covers Gmail and Calendar integration with a limited daily AI allowance, no card required.",
  },
  {
    question: "Is my Gmail data secure?",
    answer: "Viscas connects only through Google's official OAuth flow and never stores your Google password.",
  },
  {
    question: "Which AI model does Viscas use?",
    answer: "Viscas uses modern large language models to summarize mail, draft replies, and answer workspace questions.",
  },
  {
    question: "Will mobile devices be supported?",
    answer: "A responsive mobile experience is on the roadmap alongside the Team plan.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-[100px] border-b border-line" id="faq">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">

          {/* Left Column: FAQ Header & Accordion */}
          <div className="flex flex-col">
            <span className="font-heading text-[12.5px] font-bold tracking-[0.14em] text-forest-600 uppercase mb-3">
              FAQ
            </span>
            <h2 className="font-heading text-[34px] font-bold leading-tight tracking-tight text-ink sm:text-[40px] mb-8">
              Frequently asked questions
            </h2>

            <div className="flex flex-col w-full">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div key={idx} className="border-b border-line w-full">
                    <button
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex justify-between items-center py-[18px] text-left font-semibold text-[15.5px] text-ink cursor-pointer hover:text-forest-600 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <span
                        className={`text-[18px] text-forest-600 font-bold transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        ⌄
                      </span>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out text-ink-soft text-[14px] font-medium"
                      style={{
                        maxHeight: isOpen ? "200px" : "0px",
                        paddingBottom: isOpen ? "16px" : "0px",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: CTA Band Card */}
          <div className="relative overflow-hidden rounded-[24px] bg-pine-950 px-8 py-12 text-center text-white shadow-2xl w-full border border-white/6 mt-6 lg:mt-10">

            {/* Background growth-rings */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px]"
                viewBox="0 0 640 640"
              >
                <circle
                  className="animate-spin-slow"
                  cx="320"
                  cy="320"
                  r="280"
                  stroke="#38BDF8"
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

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="font-heading text-[26px] sm:text-[28px] font-bold mb-3.5 leading-tight">
                Ready to reclaim your inbox?
              </h3>
              <p className="text-[14.5px] text-white/60 leading-relaxed mb-8 font-medium">
                Start free — upgrade only when the AI is doing work you&apos;d rather not do yourself.
              </p>

              <div className="flex flex-row flex-wrap justify-center gap-3">
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-sky-500 px-5 text-[13.5px] font-bold text-pine-950 shadow-[0_6px_20px_rgba(56,189,248,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(56,189,248,0.4)]"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 bg-transparent px-5 text-[13.5px] font-bold text-white transition hover:border-white/55"
                >
                  Watch Demo
                </Link>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}