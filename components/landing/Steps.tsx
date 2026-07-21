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
    <section className="bg-white min-h-[calc(100vh-72px)] flex items-center py-16 border-b border-line" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-16">
          <span className="font-heading text-[12.5px] font-bold tracking-[0.14em] text-forest-600 uppercase">
            Getting Started
          </span>
          <h2 className="font-heading mt-3 text-[38px] font-bold leading-tight tracking-tight text-ink sm:text-[44px]">
            From signup to inbox-zero in three steps
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            No setup calls, no config files — Viscas is ready the moment you connect your account.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dotted Connection Line */}
          <div 
            className="absolute top-7 left-[16%] right-[16%] h-[1px] hidden md:block"
            style={{
              background: "repeating-linear-gradient(90deg, var(--line) 0 8px, transparent 8px 16px)",
            }}
          />

          {/* Step Cards */}
          {steps.map((step) => (
            <div key={step.num} className="relative bg-white flex flex-col items-center text-center w-full">
              <div className="font-mono text-[14px] font-bold text-sky-500 bg-pine-950 w-14 h-14 rounded-full flex items-center justify-center mb-[22px] relative z-10 border-4 border-white shadow-[0_0_0_1px_rgba(10,31,26,0.09)]">
                {step.num}
              </div>
              <h3 className="font-heading text-[18px] font-bold text-ink mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-[14.5px] text-ink-soft leading-relaxed max-w-sm md:max-w-none font-medium text-center">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
