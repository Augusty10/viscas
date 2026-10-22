import Link from "next/link";
import Container from "../common/Container";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

function GrowthRings() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 opacity-25 select-none">
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px] max-w-none"
        viewBox="0 0 640 640"
        aria-hidden="true"
      >
        <circle
          cx="320"
          cy="320"
          r="280"
          stroke="#0EA5E9"
          strokeWidth="1"
          fill="none"
          opacity="0.35"
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
    <section className="bg-white py-16 sm:py-20 lg:py-24" id="cta">
      <Container>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-pine-950 px-6 py-12 sm:px-12 sm:py-16 text-center text-white shadow-2xl border border-white/10 max-w-5xl mx-auto">
          <GrowthRings />

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
              Ready to reclaim your inbox?
            </h2>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-xl font-normal">
              Start free — upgrade only when the AI is doing work you&apos;d rather not do yourself.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                variant="default"
                className="w-full sm:w-auto font-bold shadow-md bg-sky-500 hover:bg-sky-400 text-pine-950 h-12 px-7 rounded-xl text-base"
              >
                <Link href="/login">Get Started Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/25 bg-white/5 text-white hover:bg-white/10 shadow-xs h-12 px-7 rounded-xl text-base"
              >
                <Link href="/login" className="flex items-center justify-center gap-2">
                  <Play className="h-4 w-4 fill-white" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}