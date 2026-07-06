import { Check } from "lucide-react";
import Container from "../common/Container";
import Section from "../common/Section";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started.",
    popular: false,
    features: [
      "Gmail Integration",
      "Calendar Integration",
      "5 AI Requests / Day",
      "Basic Dashboard",
    ],
  },
  {
    name: "Pro",
    price: "₹299",
    description: "For professionals and creators.",
    popular: true,
    features: [
      "Unlimited AI Requests",
      "Smart Email Reply",
      "Meeting Summary",
      "Priority Support",
      "Advanced Analytics",
    ],
  },
  {
    name: "Team",
    price: "Coming Soon",
    description: "Built for organizations.",
    popular: false,
    features: [
      "Team Workspace",
      "Shared Calendar",
      "Admin Dashboard",
      "Role Management",
    ],
  },
];

export default function Pricing() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
            Pricing
          </p>

          <h2
            className="mt-4 text-4xl font-bold lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Simple & Transparent Pricing
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Choose the plan that fits your workflow.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 ${
                plan.popular
                  ? "border-sky-500 shadow-xl"
                  : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="mt-4 text-2xl font-bold">
                {plan.name}
              </h3>

              <p className="mt-2 text-slate-600">
                {plan.description}
              </p>

              <div className="mt-6 text-4xl font-bold">
                {plan.price}
                {plan.price !== "Coming Soon" && (
                  <span className="text-base font-normal text-slate-500">
                    /month
                  </span>
                )}
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button className="mt-8 w-full">
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}