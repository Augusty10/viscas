import { Check } from "lucide-react";
import Container from "../common/Container";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started.",
    popular: false,
    ctaText: "Get Started",
    btnClass: "bg-pine-950 text-white hover:bg-forest-700",
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
    btnClass: "bg-sky-500 text-pine-950 hover:scale-[1.01] hover:shadow-[0_10px_26px_rgba(56,189,248,0.4)]",
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
    btnClass: "bg-transparent text-forest-800 border border-line hover:border-forest-600 hover:text-forest-600",
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
    <section className="bg-mist py-[110px] border-b border-line" id="pricing">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-16">
          <span className="font-heading text-[12.5px] font-bold tracking-[0.14em] text-forest-600 uppercase">
            Pricing Plans
          </span>
          <h2 className="font-heading mt-3 text-[38px] font-bold leading-tight tracking-tight text-ink sm:text-[44px]">
            Simple &amp; transparent pricing
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Choose the plan that fits your productivity flow.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-[20px] p-8 transition-all duration-300 border ${
                plan.popular
                  ? "bg-pine-950 text-white border-transparent shadow-[0_24px_50px_rgba(8,37,28,0.25)] md:scale-[1.03] z-10"
                  : "bg-white border-line text-ink"
              }`}
            >
              {/* Popular tag */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-500 text-pine-950 font-heading text-[11.5px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              {/* Card Header & Content */}
              <div>
                <h3 className="font-heading text-[20px] font-bold mb-1.5">
                  {plan.name}
                </h3>
                <p className={`text-[13.5px] leading-relaxed mb-5 ${
                  plan.popular ? "text-white/60" : "text-ink-soft"
                }`}>
                  {plan.description}
                </p>

                <div className="font-heading text-[38px] font-bold mb-5.5 flex items-baseline">
                  {plan.price}
                  {plan.price !== "Coming Soon" && (
                    <span className={`text-[14px] font-medium ml-1 ${
                      plan.popular ? "text-white/60" : "text-ink-soft"
                    }`}>
                      /month
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8 border-t border-line/10 pt-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 items-start text-[14px]">
                      <Check className="h-5.5 w-5.5 text-sky-500 shrink-0" />
                      <span className={plan.popular ? "text-white/85 font-medium" : "text-ink/85 font-medium"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  href="/login"
                  className={`inline-flex h-12 w-full items-center justify-center rounded-full text-[14.5px] font-bold transition-all duration-200 cursor-pointer ${plan.btnClass}`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}