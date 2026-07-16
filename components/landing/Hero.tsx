import Container from "../common/Container";
import Section from "../common/Section";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

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
  <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden group p-2">
    {/* Browser header bar mock */}
    <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-slate-100 rounded-t-2xl">
      <div className="h-3 w-3 rounded-full bg-red-400" />
      <div className="h-3 w-3 rounded-full bg-yellow-450" />
      <div className="h-3 w-3 rounded-full bg-green-400" />
      <span className="text-[10px] text-slate-400 ml-4 font-mono select-none">viscas.com/dashboard</span>
    </div>

    {/* Live Dashboard Screenshot */}
    <div className="relative overflow-hidden aspect-[16/9] rounded-2xl bg-slate-50 border border-slate-100">
      <Image
        src="/dashboard-preview.png"
        alt="Viscas AI Workspace Dashboard Preview"
        width={600}
        height={338}
        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
      />
    </div>
  </div>
</div>
          </div>

        </div>
      </Container>
    </Section>
  );
}