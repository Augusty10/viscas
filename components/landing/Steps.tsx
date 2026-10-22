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
    <section className="bg-slate-50/60 py-20 lg:py-28 border-b border-slate-200" id="how-it-works">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
            Getting Started
          </span>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900">
            From signup to inbox-zero in three steps
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-2xl">
            No setup calls, no config files — Viscas is ready the moment you connect your account.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Dotted Connection Line for desktop - aligned through badge center (padding 32px + half of 56px badge = 60px) */}
          <div 
            className="absolute top-[60px] left-[18%] right-[18%] h-[2px] hidden md:block z-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(90deg, #CBD5E1 0 8px, transparent 8px 16px)",
            }}
            aria-hidden="true"
          />

          {/* Step Cards */}
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col items-center text-center w-full h-full transition-all hover:-translate-y-1 hover:shadow-md duration-200 z-10"
            >
              <div className="font-mono text-sm font-bold text-sky-600 bg-sky-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-sky-200 shadow-2xs shrink-0">
                {step.num}
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
