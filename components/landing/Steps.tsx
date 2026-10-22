import Container from "../common/Container";

export default function Steps() {
  const steps = [
    {
      num: "01",
      title: "Connect Google",
      desc: "Sign in with Google OAuth — Viscas never sees or stores your password.",
    },
    {
      num: "02",
      title: "Let it sync",
      desc: "Gmail and Calendar sync in real time, and the AI starts reading your inbox's shape.",
    },
    {
      num: "03",
      title: "Work from one view",
      desc: "Priority mail, today's schedule, and AI drafts land on a single dashboard.",
    },
  ];

  return (
    <section className="bg-slate-50/70 py-18 sm:py-20 lg:py-24 border-b border-slate-200/80" id="how-it-works">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mx-auto max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2">
            Getting Started
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900">
            From signup to inbox-zero in three steps
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            No setup calls, no config files — Viscas is ready the moment you connect your account.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="group relative bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center h-full"
            >
              {/* Step indicator badge */}
              <div className="font-mono text-sm font-bold text-sky-600 bg-sky-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-sky-200/80 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-200">
                {step.num}
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed font-normal flex-1">
                {step.desc}
              </p>

              {/* Bottom Subtle Step Pill */}
              <div className="mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-center text-xs font-medium text-slate-400">
                Step {idx + 1} of 3
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
