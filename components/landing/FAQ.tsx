"use client";

import { useState } from "react";
import Container from "../common/Container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Viscas?",
    answer:
      "Viscas is an AI-powered productivity workspace that unifies Gmail, Google Calendar, and an AI assistant into one clean, calm dashboard.",
  },
  {
    question: "Is Viscas free to use?",
    answer:
      "Yes — the Free plan covers Gmail and Calendar integration with a daily AI allowance, no credit card required.",
  },
  {
    question: "Is my Gmail data secure?",
    answer:
      "Viscas connects exclusively through Google's official OAuth 2.0 flow and never stores your Google password or private credentials.",
  },
  {
    question: "Which AI model does Viscas use?",
    answer:
      "Viscas uses state-of-the-art large language models to summarize incoming mail, draft context-aware replies, and answer workspace schedule queries.",
  },
  {
    question: "Will mobile devices be supported?",
    answer:
      "Viscas is built mobile-first, ensuring a smooth and responsive experience across all modern phone and tablet browsers.",
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
        <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const btnId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div key={idx} className="py-2">
                <button
                  type="button"
                  id={btnId}
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex justify-between items-center py-4 text-left font-semibold text-base sm:text-lg text-slate-900 cursor-pointer hover:text-sky-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded-lg"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="pb-4 pr-6 text-slate-600 text-sm sm:text-base leading-relaxed animate-in fade-in-50 duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}