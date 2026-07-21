import Link from "next/link";
import Logo from "../common/Logo";
import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-white/70 py-[70px] pb-[30px] border-t border-white/8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-[50px]">
          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/">
              <Logo />
            </Link>
            <p className="mt-3.5 max-w-[280px] text-[14px] text-white/50 leading-relaxed">
              An AI-powered productivity workspace that brings Gmail, Calendar, and AI together in one place.
            </p>
          </div>

          {/* Links 1 */}
          <div className="flex flex-col">
            <h5 className="text-white text-[13.5px] font-bold tracking-wider uppercase mb-4 font-heading">
              Product
            </h5>
            <ul className="space-y-2 text-[13.5px]">
              <li>
                <Link href="#features" className="hover:text-sky-400 transition-colors duration-200">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-sky-400 transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sky-400 transition-colors duration-200">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col">
            <h5 className="text-white text-[13.5px] font-bold tracking-wider uppercase mb-4 font-heading">
              Resources
            </h5>
            <ul className="space-y-2 text-[13.5px]">
              <li>
                <Link href="#" className="hover:text-sky-400 transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sky-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sky-400 transition-colors duration-200">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="flex flex-col">
            <h5 className="text-white text-[13.5px] font-bold tracking-wider uppercase mb-4 font-heading">
              Company
            </h5>
            <ul className="space-y-2 text-[13.5px]">
              <li>
                <Link href="#" className="hover:text-sky-400 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sky-400 transition-colors duration-200">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-sky-400 transition-colors duration-200">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 text-center text-[13px] text-white/40">
          © 2026 Viscas. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}