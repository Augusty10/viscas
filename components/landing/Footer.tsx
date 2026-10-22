import Link from "next/link";
import Logo from "../common/Logo";
import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-white/80 py-16 md:py-20 pb-8 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand info */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/75 leading-relaxed font-normal">
              An AI-powered productivity workspace that unifies Gmail, Calendar, and an AI co-pilot into one calm dashboard.
            </p>
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
                <Link href="#pricing" className="text-white/75 hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-white/75 hover:text-white transition-colors duration-200">
                  How it Works
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
                <Link href="/#" className="text-white/75 hover:text-white transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-white/75 hover:text-white transition-colors duration-200">
                  Privacy Guides
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-white/75 hover:text-white transition-colors duration-200">
                  Support
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
                <Link href="/#" className="text-white/75 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-white/75 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-white/75 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© 2026 Viscas. All rights reserved.</p>
          <p className="text-white/60">Designed for calm email &amp; calendar focus.</p>
        </div>
      </Container>
    </footer>
  );
}