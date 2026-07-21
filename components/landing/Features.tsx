import {
  Mail,
  Calendar,
  Sparkles,
  ShieldCheck,
  Zap,
  Smartphone,
} from "lucide-react";
import Container from "../common/Container";

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
    <section className="bg-white py-[110px] border-b border-line" id="features">
      <Container>
        {/* Heading */}
        <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-14">
          <span className="font-heading text-[12.5px] font-bold tracking-[0.14em] text-forest-600 uppercase">
            Features
          </span>
          <h2 className="font-heading mt-3 text-[38px] font-bold leading-tight tracking-tight text-ink sm:text-[44px]">
            Everything you need to stay productive
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Viscas combines AI, Gmail, Calendar, and modern productivity tools into one intelligent workspace.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat) => {
            const Icon = feat.icon;

            return (
              <div
                key={feat.title}
                className="group border border-line rounded-[16px] p-7 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_16px_32px_rgba(15,61,46,0.1)] text-ink"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-forest-800 text-sky-300 mb-[18px] transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-pine-950">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-heading text-[17.5px] font-bold mb-2">
                  {feat.title}
                </h3>

                <p className="text-[14.5px] text-ink-soft leading-relaxed font-medium">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}