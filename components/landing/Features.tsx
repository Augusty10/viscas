import {
  Mail,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  Zap,
  Smartphone,
} from "lucide-react";

import Container from "../common/Container";
import Section from "../common/Section";

const features = [
  {
    icon: Mail,
    title: "AI Email Assistant",
    description:
      "Summarize emails, generate smart replies, and manage your inbox faster.",
  },
  {
    icon: CalendarDays,
    title: "Smart Calendar",
    description:
      "Schedule meetings intelligently and never miss important events.",
  },
  {
    icon: Sparkles,
    title: "AI Workspace",
    description:
      "Chat with AI and boost your productivity from one unified workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Protected with Google OAuth and modern security best practices.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with Next.js for a fast, smooth and responsive experience.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Optimized for desktop, tablet and mobile devices.",
  },
];

export default function Features() {
  return (
    <Section id="features">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
            Features
          </p>

          <h2
            className="mt-4 text-4xl font-bold lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Everything You Need
            <br />
            To Stay Productive
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Viscas combines AI, Gmail, Calendar and modern productivity tools
            into one intelligent workspace.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-105 bg-slate-50/40 p-8 transition-all duration-300 hover:border-sky-200 hover:bg-white hover:shadow-[0_20px_40px_rgba(56,189,248,0.06)] hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-850">
                  {feature.title}
                </h3>

                <p className="mt-2.5 text-sm font-medium text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}