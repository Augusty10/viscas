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
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
            FAQ
          </p>

          <h2
            className="mt-4 text-4xl font-bold lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Everything you need to know about Viscas.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
}