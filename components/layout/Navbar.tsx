import Link from "next/link";
import Logo from "../common/Logo";
import { Button } from "@/components/ui/button";
import Container from "../common/Container";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <Container className="flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-sky-500"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="rounded-xl">
            <Link href="/login">Login</Link>
          </Button>

          <Button
            asChild
            className="rounded-xl bg-sky-500 px-5 hover:bg-sky-600"
          >
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}