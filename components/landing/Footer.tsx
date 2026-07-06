import Link from "next/link";
import Logo from "../common/Logo";
import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
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
              <h4 className="font-semibold">Product</h4>

              <Link href="/">Features</Link>
              <br />
              <Link href="/">Pricing</Link>
              <br />
              <Link href="/">Roadmap</Link>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Resources</h4>

              <Link href="/">Documentation</Link>
              <br />
              <Link href="/">Blog</Link>
              <br />
              <Link href="/">Support</Link>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>

              <Link href="/">About</Link>
              <br />
              <Link href="/">Privacy</Link>
              <br />
              <Link href="/">Terms</Link>
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