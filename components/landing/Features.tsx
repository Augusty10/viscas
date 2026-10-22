import {
  Mail,
  Calendar,
  Sparkles,
  ShieldCheck,
  Zap,
  Smartphone,
} from "lucide-react";
import Container from "../common/Container";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Mail,
    title: "AI Email Assistant",
    description: "Summarize emails, generate smart replies, and manage your inbox faster.",
  },
  {
    icon: Calendar,
    title: "Smart Calendar",
    description: "Schedule meetings intelligently and never miss an important event.",
  },
  {
    icon: Sparkles,
    title: "AI Workspace",
    description: "Chat with AI and boost your productivity from one unified workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description: "Protected with Google OAuth and modern security best practices.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Next.js for a fast, smooth, and responsive experience.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Optimized for desktop, tablet, and mobile devices.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-slate-200" id="features">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
            Features
          </span>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900">
            Everything you need to stay productive
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-2xl">
            Viscas combines AI, Gmail, Calendar, and modern productivity tools into one intelligent workspace.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat) => {
            const Icon = feat.icon;

            return (
              <Card
                key={feat.title}
                className="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 mb-5 transition-colors duration-200 group-hover:bg-sky-600 group-hover:text-white group-hover:border-transparent shrink-0">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal flex-1">
                  {feat.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}