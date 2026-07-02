import Container from "../common/Container";
import Section from "../common/Section";
import { Button } from "../ui/button";

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
    size="lg"
    className="h-12 rounded-xl bg-sky-500 px-8 hover:bg-sky-600"
  >
    Get Started
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
  <div className="flex h-[500px] w-full max-w-lg items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 shadow-xl">
    Dashboard Preview
  </div>
</div>
          </div>

        </div>
      </Container>
    </Section>
  );
}