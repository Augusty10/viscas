"use client";

import Link from "next/link";
import Logo from "../common/Logo";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  // Close mobile drawer on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 relative">
      {/* Background layer with blur so header itself does NOT trap fixed position children */}
      <div className="absolute inset-0 bg-pine-950/95 backdrop-blur-md -z-10" />

      <div className="mx-auto flex h-16 sm:h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex flex-1 items-center justify-start min-w-0">
          <Link href="/" className="transition-opacity hover:opacity-90 shrink-0">
            <Logo />
          </Link>
        </div>

        {/* Center: Navigation Links (dead-center on desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-7 lg:gap-8 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white whitespace-nowrap py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-3.5">
          <Link
            href="/login"
            className="text-sm font-medium text-white/85 transition-colors hover:text-white px-3.5 py-2 rounded-lg hover:bg-white/5 whitespace-nowrap"
          >
            Login
          </Link>

          <Button
            asChild
            size="default"
            variant="default"
            className="shadow-sm font-bold whitespace-nowrap bg-sky-500 hover:bg-sky-400 text-pine-950 px-5 rounded-xl h-10"
          >
            <Link href="/login">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white cursor-pointer transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            title="Open Navigation Menu"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col bg-pine-950 px-6 py-8 md:hidden h-screen w-screen overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Top Bar with Logo & Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Logo />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white cursor-pointer hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-2 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold text-white/90 py-3.5 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 mt-8 border-t border-white/10 pt-6">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 rounded-xl h-12 text-base font-semibold"
                >
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  fullWidth
                  className="font-bold bg-sky-500 hover:bg-sky-400 text-pine-950 rounded-xl h-12 text-base shadow-md"
                >
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Get Started Free
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}