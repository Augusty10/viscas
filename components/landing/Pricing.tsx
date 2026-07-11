import { Check } from "lucide-react";
import Container from "../common/Container";
import Section from "../common/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started.",
    popular: false,
    ctaText: "Get Started",
    btnClass: "bg-slate-800 hover:bg-slate-900 text-white",
    features: [
      "Gmail Integration",
      "Calendar Integration",
      "5 AI Requests / Day",
      "Basic Dashboard Overview",
    ],
  },
  {
    name: "Pro",
    price: "₹299",
    description: "For professionals and creators.",
    popular: true,
    ctaText: "Upgrade to Pro",
    btnClass: "bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20",
    features: [
      "Unlimited AI Requests",
      "Smart AI Email Reply Drafts",
      "Dynamic Meeting Summaries",
      "Priority Email & Chat Support",
      "Advanced Workspace Analytics",
    ],
  },
  {
    name: "Team",
    price: "Coming Soon",
    description: "Built for organization groups.",
    popular: false,
    ctaText: "Join Waitlist",
    btnClass: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    features: [
      "Team-wide Shared Workspace",
      "Interactive Collaborative Calendars",
      "Central Admin Control Panels",
      "Custom Role Permission Management",
    ],
  },
];

export default function Pricing() {
  return (
    <Section id="pricing" className="bg-slate-50/50">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
            Pricing Plans
          </p>

          <h2
            className="mt-4 text-4xl font-bold lg:text-5xl text-slate-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Simple & Transparent Pricing
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Choose the plan that fits your productivity workflow.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "bg-slate-900 text-white border border-slate-800 shadow-2xl lg:scale-[1.04]"
                  : "bg-white border border-slate-200 text-slate-800 shadow-sm hover:shadow-xl"
              }`}
            >
              {/* Highlight decorations for Pro card */}
              {plan.popular && (
                <>
                  <div className="absolute top-0 right-0 h-40 w-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-sky-500 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                </>
              )}

              {/* Upper Section */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {plan.name}
                </h3>

                <p className={`mt-2 text-sm leading-relaxed ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.price !== "Coming Soon" && (
                    <span className={`ml-1 text-sm ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                      /month
                    </span>
                  )}
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 my-6" />

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className={`h-5 w-5 shrink-0 ${plan.popular ? "text-sky-400" : "text-green-500"}`} />
                      <span className={plan.popular ? "text-slate-200 font-medium" : "text-slate-600 font-medium"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Button asChild className={`h-12 w-full rounded-2xl text-sm font-bold tracking-wide transition-all duration-200 ${plan.btnClass}`}>
                  <Link href="/login">{plan.ctaText}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}