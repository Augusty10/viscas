import Link from "next/link";
import Logo from "../common/Logo";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/docs">Docs</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Login
          </Button>

          <Button>
            Get Started
          </Button>
        </div>

      </div>
    </header>
  );
}