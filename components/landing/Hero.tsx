import Container from "../common/Container";
import Section from "../common/Section";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">

          <div>
            <div className="space-y-8">

  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
    ✨ AI Powered Workspace
  </div>

  <h1
    className="text-5xl font-bold leading-tight lg:text-7xl"
    style={{ fontFamily: "var(--font-heading)" }}
  >
    Your AI Workspace
    <br />
    for Email &
    <br />
    Calendar
  </h1>
 <p className="max-w-xl text-lg leading-8 text-slate-600">
    Manage Gmail, Google Calendar, AI Chat, and smart replies
    from one beautiful workspace built for modern productivity.
  </p>

<div className="flex flex-wrap items-center gap-4">
  <Button
    asChild
    size="lg"
    className="h-12 rounded-xl bg-sky-500 px-8 hover:bg-sky-600 text-white font-medium"
  >
    <Link href="/login">Get Started</Link>
  </Button>

  <Button
    size="lg"
    variant="outline"
    className="h-12 rounded-xl px-8"
  >
    Watch Demo
  </Button>
</div>

</div>

 </div>


<div>

<div className="flex items-center justify-center">
  <div className="relative flex h-[500px] w-full max-w-lg items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl p-8 overflow-hidden group">
    {/* Decorative blur inside dashboard preview */}
    <div className="absolute top-0 right-0 h-40 w-40 bg-sky-500/10 rounded-full blur-2xl group-hover:scale-110 transition duration-500 pointer-events-none" />
    <div className="absolute bottom-0 left-0 h-40 w-40 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-110 transition duration-500 pointer-events-none" />

    {/* Content */}
    <div className="text-center relative z-10 space-y-4">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold text-white shadow-inner">
        📊
      </div>
      <h3 className="text-lg font-bold text-white">Interactive Workspace Preview</h3>
      <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
        Experience a unified dashboard combining Gmail indexers, Google Calendars, and active AI Agents in real-time.
      </p>
      <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-400">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
        Ready to Sync
      </div>
    </div>
  </div>
</div>
          </div>

        </div>
      </Container>
    </Section>
  );
}