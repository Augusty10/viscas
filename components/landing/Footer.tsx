import Link from "next/link";
import Logo from "../common/Logo";
import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-800">
      <Container>
        <div className="flex flex-col items-center justify-between gap-10 py-12 md:flex-row">
          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-4 max-w-sm text-sm text-slate-600">
              AI-powered productivity workspace that brings Gmail, Calendar,
              and AI together in one place.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-10 text-sm">
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Product</h4>

              <Link href="/" className="text-slate-600 hover:text-sky-600 transition">Features</Link>
              <br />
              <Link href="/" className="text-slate-600 hover:text-sky-600 transition">Pricing</Link>
              <br />
              <Link href="/" className="text-slate-600 hover:text-sky-600 transition">Roadmap</Link>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Resources</h4>

              <Link href="/" className="text-slate-600 hover:text-sky-600 transition">Documentation</Link>
              <br />
              <Link href="/" className="text-slate-600 hover:text-sky-600 transition">Blog</Link>
              <br />
              <Link href="/" className="text-slate-600 hover:text-sky-600 transition">Support</Link>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Company</h4>

              <Link href="/" className="text-slate-600 hover:text-sky-600 transition">About</Link>
              <br />
              <Link href="/" className="text-slate-600 hover:text-sky-600 transition">Privacy</Link>
              <br />
              <Link href="/" className="text-slate-600 hover:text-sky-600 transition">Terms</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          © 2026 Viscas. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}