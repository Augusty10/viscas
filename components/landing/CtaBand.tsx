import Link from "next/link";
import Container from "../common/Container";

function GrowthRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-50">
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px]"
        viewBox="0 0 640 640"
      >
        <circle
          cx="320"
          cy="320"
          r="280"
          stroke="#38BDF8"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          className="animate-spin-slow"
          style={{ transformOrigin: "320px 320px" }}
        />
        <circle
          cx="320"
          cy="320"
          r="200"
          stroke="#1C5A44"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
          className="animate-spin-slow-rev"
          style={{ transformOrigin: "320px 320px" }}
        />
      </svg>
    </div>
  );
}

export default function CtaBand() {
  return (
    <section className="bg-white py-5 pb-[110px]" id="cta">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-pine-950 px-6 py-16 text-center text-white shadow-2xl mx-0 md:mx-8">

          <GrowthRings />

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="font-heading text-[30px] sm:text-[34px] font-bold mb-3.5 leading-tight">
              Ready to reclaim your inbox?
            </h2>
            <p className="text-[15.5px] text-white/65 leading-relaxed mb-[30px] font-medium">
              Start free — upgrade only when the AI is doing work you&apos;d rather not do yourself.
            </p>

            <div className="flex flex-row flex-wrap justify-center gap-3.5">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-full bg-sky-500 px-5 text-[13.5px] font-bold text-pine-950 shadow-[0_6px_20px_rgba(56,189,248,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(56,189,248,0.4)]"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 bg-transparent px-5 text-[13.5px] font-bold text-white transition hover:border-white/55"
              >
                Watch Demo
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}