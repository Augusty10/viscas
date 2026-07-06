import { Mail, CalendarDays, Sparkles } from "lucide-react";
import Logo from "../common/Logo";
import Container from "../common/Container";
import Section from "../common/Section";
import WorkspaceCard from "./WorkspaceCard";


export default function Workspace() {
  return (
    <Section>
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
            Everything You Need
          </p>

          <h2
            className="mt-4 text-4xl font-bold lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            One Workspace.
            <br />
            Infinite Productivity.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Manage your Gmail, Calendar, AI assistant, and future productivity
            tools from one beautiful workspace.
          </p>
        </div>

        {/* Workspace Diagram */}
        <div className="relative mt-20 flex flex-col items-center">
       

          {/* Top Cards */}
          <div className="flex items-center justify-center gap-20">
            <WorkspaceCard
              title="Gmail"
              description="Manage emails effortlessly."
            >
              <Mail className="h-10 w-10 text-sky-500" />
            </WorkspaceCard>

            <WorkspaceCard
              title="Calendar"
              description="Organize your schedule."
            >
              <CalendarDays className="h-10 w-10 text-sky-500" />
            </WorkspaceCard>
          </div>

          {/* Center Logo */}
          <div className="my-12 flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_0_60px_rgba(56,189,248,0.20)]">
            <Logo showText={false} />
          </div>

          {/* AI Card */}
          <WorkspaceCard
            title="AI Assistant"
            description="Smart summaries, replies and productivity insights."
          >
            <Sparkles className="h-10 w-10 text-sky-500" />
          </WorkspaceCard>
        </div>

        {/* Feature Pills */}
        <div className="mt-24 flex flex-wrap justify-center gap-4">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium">
            ✓ Unified Workspace
          </span>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium">
            ✓ AI Powered
          </span>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium">
            ✓ Secure Authentication
          </span>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium">
            ✓ Productivity First
          </span>
        </div>
      </Container>
    </Section>
  );
}