import Link from "next/link";
import Logo from "../common/Logo";
import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-white/80 pt-16 pb-10 border-t border-white/10">
      <Container>
        {/* Multi-column grid: 1 col on mobile, 2 col on tablet, 5 cols on desktop (2+1+1+1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-14">
          {/* Brand Column (spans 2 on desktop) */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90 w-fit">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/75 leading-relaxed font-normal">
              An AI-powered productivity workspace that unifies Gmail, Google Calendar, and an AI co-pilot into one calm dashboard.
            </p>
            <div className="inline-flex items-center gap-2 mt-5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>All systems operational</span>
            </div>
          </div>

          {/* Links 1: Product */}
          <div className="flex flex-col">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 font-heading">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#features" className="text-white/75 hover:text-white transition-colors duration-200">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-white/75 hover:text-white transition-colors duration-200">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-white/75 hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-white/75 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: Resources */}
          <div className="flex flex-col">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 font-heading">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#features" className="text-white/75 hover:text-white transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-white/75 hover:text-white transition-colors duration-200">
                  Privacy Guides
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white/75 hover:text-white transition-colors duration-200">
                  Help &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 3: Company */}
          <div className="flex flex-col">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 font-heading">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#how-it-works" className="text-white/75 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white/75 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white/75 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 text-center sm:text-left">
          <p>© 2026 Viscas. All rights reserved.</p>
          <p className="text-white/60">Designed for calm email &amp; calendar focus.</p>
        </div>
      </Container>
    </footer>
  );
}