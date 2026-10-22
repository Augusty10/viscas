import { Check } from "lucide-react";
import Container from "../common/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started with AI email.",
    popular: false,
    ctaText: "Get Started",
    buttonVariant: "outline" as const,
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
    description: "For professionals and power creators.",
    popular: true,
    ctaText: "Upgrade to Pro",
    buttonVariant: "default" as const,
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
    description: "Built for teams and organizations.",
    popular: false,
    ctaText: "Join Waitlist",
    buttonVariant: "secondary" as const,
    features: [
      "Team-wide Shared Workspace",
      "Collaborative Calendars",
      "Central Admin Control Panel",
      "Custom Role Permissions",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-slate-50/70 py-18 sm:py-20 lg:py-24 border-b border-slate-200/80" id="pricing">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mx-auto max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2">
            Pricing Plans
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900">
            Simple &amp; transparent pricing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            Choose the plan that fits your productivity flow.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-200 border ${
                plan.popular
                  ? "bg-pine-950 text-white border-pine-800 shadow-xl ring-2 ring-sky-400/50"
                  : "bg-white border-slate-200/90 text-slate-900 shadow-xs hover:shadow-md hover:border-slate-300"
              }`}
            >
              {/* Card Header & Content */}
              <div className="flex flex-col flex-1">
                {/* Name & Most Popular Pill */}
                <div className="flex items-center justify-between gap-2 mb-2 min-h-[30px]">
                  <h3 className="font-heading text-xl font-bold">
                    {plan.name}
                  </h3>
                  {plan.popular ? (
                    <span className="bg-sky-400 text-pine-950 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
                      Most Popular
                    </span>
                  ) : null}
                </div>

                <p className={`text-sm mb-6 ${plan.popular ? "text-white/80" : "text-slate-600"}`}>
                  {plan.description}
                </p>

                {/* Price Display */}
                <div
                  className={`flex items-baseline mb-6 pb-6 min-h-[64px] border-b ${
                    plan.popular ? "border-white/15" : "border-slate-200"
                  }`}
                >
                  <span
                    className={`font-heading font-extrabold tracking-tight ${
                      plan.price === "Coming Soon"
                        ? "text-2xl sm:text-3xl"
                        : "text-4xl sm:text-5xl"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.price !== "Coming Soon" && (
                    <span
                      className={`text-sm font-medium ml-2 ${
                        plan.popular ? "text-white/75" : "text-slate-500"
                      }`}
                    >
                      /month
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 items-start text-sm">
                      <Check className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                      <span
                        className={
                          plan.popular
                            ? "text-white/90 font-medium"
                            : "text-slate-700 font-medium"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button - aligned at bottom across all cards */}
              <div className="pt-2">
                <Button
                  asChild
                  variant={plan.buttonVariant}
                  size="lg"
                  fullWidth
                  className={
                    plan.popular
                      ? "font-bold shadow-md bg-sky-500 hover:bg-sky-400 text-pine-950 h-12 rounded-xl text-base"
                      : "font-semibold h-12 rounded-xl text-base"
                  }
                >
                  <Link href="/login">{plan.ctaText}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}