import React from "react";
import Link from "next/link";
import LandingSection from "./LandingSection";
import LandingCard from "./LandingCard";
import LandingButton from "./LandingButton";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever free",
    description: "Ideal for individual professionals getting started with AI inbox management.",
    popular: false,
    ctaText: "Get Started Free",
    ctaVariant: "outline-navy" as const,
    href: "/login",
    features: [
      "Gmail bidirectional sync",
      "Google Calendar integration",
      "5 AI drafted replies / day",
      "Daily email summary digest",
      "Google OAuth 2.0 security",
    ],
  },
  {
    name: "Professional",
    price: "$15",
    period: "per month",
    description: "For founders, managers, and creators who need unlimited AI productivity.",
    popular: true,
    ctaText: "Start 14-Day Free Trial",
    ctaVariant: "primary" as const,
    href: "/login",
    features: [
      "Unlimited AI email drafting & replies",
      "Autonomous meeting scheduling engine",
      "Instant executive thread summaries",
      "Subscription guard & invoice parser",
      "Priority customer assistance",
      "Multi-account inbox switching",
    ],
  },
  {
    name: "Team & Enterprise",
    price: "$39",
    period: "per user / month",
    description: "Designed for high-growth teams and organizations requiring centralized admin controls.",
    popular: false,
    ctaText: "Contact Sales",
    ctaVariant: "outline-navy" as const,
    href: "/login",
    features: [
      "Everything in Professional",
      "Team-wide calendar coordination",
      "Centralized billing & admin panel",
      "Custom tone & brand guidelines",
      "Dedicated account manager",
      "Custom security SLA & SOC-2 report",
    ],
  },
];

export default function PricingSection() {
  return (
    <LandingSection
      id="pricing"
      badge="Transparent Pricing"
      title="Predictable plans with no hidden fees"
      subtitle="Start free with zero credit card required. Upgrade as your communication workflow grows."
      background="white"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <LandingCard
            key={plan.name}
            variant={plan.popular ? "elevated" : "default"}
            hoverEffect={true}
            className={`relative flex flex-col justify-between ${
              plan.popular
                ? "border-2 border-[#0070E0] shadow-[0_20px_48px_-10px_rgba(0,112,224,0.18)]"
                : "border border-[#E2E8F0]"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#0070E0] text-white shadow-xs">
                  Most Popular
                </span>
              </div>
            )}

            <div>
              <div className="mb-4">
                <h3 className="font-heading text-xl font-bold text-[#0B1F4B]">
                  {plan.name}
                </h3>
                <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price display */}
              <div className="my-6 pb-6 border-b border-slate-100 flex items-baseline gap-1.5">
                <span className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0B1F4B]">
                  {plan.price}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  / {plan.period}
                </span>
              </div>

              {/* Feature items */}
              <div className="space-y-3 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F4B]">
                  Included features:
                </span>
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#4A5568]">
                    <div className="h-4 w-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 w-full">
              <LandingButton
                href={plan.href}
                variant={plan.ctaVariant}
                size="md"
                fullWidth
              >
                {plan.ctaText}
              </LandingButton>
            </div>
          </LandingCard>
        ))}
      </div>
    </LandingSection>
  );
}
