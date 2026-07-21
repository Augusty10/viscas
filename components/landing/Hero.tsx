import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white flex items-center min-h-[calc(100vh-72px)] lg:h-[calc(100vh-72px)] lg:min-h-0 py-12 lg:py-0"
      style={{
        background: "radial-gradient(ellipse 120% 80% at 50% -10%, #12432F 0%, #08251C 75%)",
      }}
    >
      {/* Background growth-rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] opacity-90"
          viewBox="0 0 640 640"
        >
          <circle
            className="animate-spin-slow"
            cx="320"
            cy="320"
            r="300"
            stroke="#1C5A44"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
            strokeDasharray="2 10"
            style={{ transformOrigin: "320px 320px" }}
          />
          <circle
            cx="320"
            cy="320"
            r="240"
            stroke="#1C5A44"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <circle
            className="animate-spin-slow-rev"
            cx="320"
            cy="320"
            r="180"
            stroke="#38BDF8"
            strokeWidth="1"
            fill="none"
            opacity="0.35"
            strokeDasharray="1 8"
            style={{ transformOrigin: "320px 320px" }}
          />
          <circle
            cx="320"
            cy="320"
            r="120"
            stroke="#38BDF8"
            strokeWidth="1"
            fill="none"
            opacity="0.25"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left max-w-xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/35 bg-sky-500/12 px-3.5 py-1.5 text-[13px] font-semibold text-sky-300 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              AI-Powered Workspace
            </span>

            {/* Heading */}
            <h1 className="font-heading text-[38px] leading-tight font-bold tracking-tight text-white sm:text-[52px] sm:leading-[1.06] mb-[22px]">
              Your AI workspace for <span className="text-sky-400">email &amp; calendar</span>
            </h1>

            {/* Description */}
            <p className="text-[17px] leading-relaxed text-white/68 mb-[34px]">
              Viscas brings Gmail, Google Calendar, and an AI co-pilot into one calm dashboard — so your inbox stops running your day.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mb-8">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3.5 text-[14.5px] font-bold text-pine-950 shadow-[0_6px_20px_rgba(56,189,248,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(56,189,248,0.4)] w-full sm:w-auto"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent px-7 py-3.5 text-[14.5px] font-bold text-white transition hover:border-white/55 w-full sm:w-auto"
              >
                ▶ Watch Demo
              </Link>
            </div>

            {/* Trust Badge Line */}
            <div className="flex flex-wrap items-center gap-[18px] text-[12.5px] text-white/45">
              <span>Free plan available</span>
              <span className="h-3 w-[1px] bg-white/15" />
              <span>No credit card required</span>
            </div>
          </div>

          {/* Right Column: viscas.com/dashboard Mockup Preview */}
          <div className="relative w-full max-w-xl lg:max-w-none">
            {/* AI Drafting Floating Chip */}
            <div className="absolute -top-4 right-10 z-20 animate-float-chip inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[12px] font-bold text-forest-700 shadow-[0_12px_24px_rgba(15,61,46,0.18)]">
              <span className="h-[7px] w-[7px] rounded-full bg-sky-500 animate-pulse-dot" />
              AI drafting a reply…
            </div>

            {/* Dashboard Mock Window */}
            <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_30px_70px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] border border-slate-200 text-left">
              <div className="flex items-center gap-2 bg-[#F1F5F4] px-3.5 py-3 border-b border-line">
                <span className="h-[9px] w-[9px] rounded-full bg-[#EF6E5B]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#F2B807]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#38BDF8]" />
                <div className="ml-2.5 flex-1 bg-white border border-line rounded-[6px] px-2.5 py-1 text-[12px] text-ink-soft select-none font-mono">
                  viscas.com/dashboard
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 text-ink">
                {/* Greeting banner */}
                <div
                  className="text-white rounded-[12px] p-4 mb-4"
                  style={{
                    background: "linear-gradient(120deg, var(--forest-700), var(--sky-500) 160%)"
                  }}
                >
                  <div className="text-[10px] font-bold tracking-widest uppercase opacity-75 mb-1">
                    AI Productivity Workspace
                  </div>
                  <h3 className="font-heading text-[18px] font-bold mb-0.5">Good afternoon, Dhanraj 👋</h3>
                  <p className="text-[11.5px] opacity-85">Thursday, July 16 — here&apos;s your overview.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4">
                  <div className="border border-line rounded-[8px] p-2.5 bg-mist">
                    <span className="text-[8px] font-bold text-sky-500 bg-sky-50 px-1 py-0.5 rounded-[4px] float-right">
                      LIVE
                    </span>
                    <div className="font-mono text-[18px] font-semibold text-forest-800 mt-2">
                      201
                    </div>
                    <div className="text-[10px] text-ink-soft mt-0.5">Unread</div>
                  </div>

                  <div className="border border-line rounded-[8px] p-2.5 bg-mist">
                    <span className="text-[8px] font-bold text-sky-500 bg-sky-50 px-1 py-0.5 rounded-[4px] float-right">
                      LIVE
                    </span>
                    <div className="font-mono text-[18px] font-semibold text-forest-800 mt-2">
                      5
                    </div>
                    <div className="text-[10px] text-ink-soft mt-0.5">Priority</div>
                  </div>

                  <div className="border border-line rounded-[8px] p-2.5 bg-mist">
                    <span className="text-[8px] font-bold text-sky-500 bg-sky-50 px-1 py-0.5 rounded-[4px] float-right">
                      LIVE
                    </span>
                    <div className="font-mono text-[18px] font-semibold text-forest-800 mt-2">
                      1
                    </div>
                    <div className="text-[10px] text-ink-soft mt-0.5">Meetings</div>
                  </div>

                  <div className="border border-line rounded-[8px] p-2.5 bg-mist">
                    <div className="font-mono text-[18px] font-semibold text-forest-800 mt-2">
                      202
                    </div>
                    <div className="text-[10px] text-ink-soft mt-0.5">Insights</div>
                  </div>
                </div>

                {/* Priority Inbox list */}
                <div className="border border-line rounded-[8px] p-3">
                  <h4 className="text-[11.5px] font-bold mb-2">Priority Inbox</h4>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center py-1.5 border-b border-line">
                      <span><strong>Acme Corporation</strong></span>
                      <span className="text-[#F2B807]">★</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-line">
                      <span><strong>Viscas Newsletter</strong></span>
                      <span className="text-[#F2B807]">★</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span><strong>Google Calendar</strong></span>
                      <span className="text-sky-500 font-semibold">Synced</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}