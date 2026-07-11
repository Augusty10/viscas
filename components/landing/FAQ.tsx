"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Container from "../common/Container";
import Section from "../common/Section";

const faqs = [
  {
    question: "What is Viscas?",
    answer:
      "Viscas is an AI-powered productivity workspace that combines Gmail, Calendar, and AI into one unified platform.",
  },
  {
    question: "Is Viscas free to use?",
    answer:
      "Yes. You can start with the Free plan and upgrade anytime for additional AI features.",
  },
  {
    question: "Is my Gmail data secure?",
    answer:
      "Absolutely. Viscas uses Google OAuth and never stores your Google password.",
  },
  {
    question: "Which AI model does Viscas use?",
    answer:
      "Viscas is designed with a provider-independent AI architecture and currently integrates with Corsair AI.",
  },
  {
    question: "Will mobile devices be supported?",
    answer:
      "Yes. Viscas is fully responsive, with dedicated mobile applications planned in future releases.",
  },
];

export default function FAQ() {
  return (
    <Section id="faq">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Accordion */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
                FAQ
              </p>

              <h2
                className="mt-4 text-4xl font-bold lg:text-5xl text-slate-900"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Frequently Asked Questions
              </h2>

              <p className="mt-4 text-lg text-slate-600">
                Everything you need to know about Viscas.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-slate-200">
                  <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-sky-600 transition">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 leading-relaxed font-medium">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column: Illustration Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Glowing blur decorations */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 to-violet-400/20 rounded-3xl blur-3xl -z-10 transform scale-95" />
            
            <div className="relative rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
              <img
                src="/faq-illustration.jpg"
                alt="AI Assistant FAQ Illustration"
                className="w-full max-w-sm rounded-2xl shadow-inner object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}