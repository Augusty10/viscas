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
    <Section>
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

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
                  <Icon className="h-7 w-7 text-sky-600" />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-600">
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