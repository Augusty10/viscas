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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-pine-950/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 sm:h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3.5 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-white/85 transition-colors hover:text-white px-3 py-2 rounded-lg hover:bg-white/5"
          >
            Login
          </Link>

          <Button asChild size="default" variant="default" className="shadow-xs font-bold">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button (Accessible 44x44px target) */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white cursor-pointer md:hidden transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          title="Open Navigation Menu"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Drawer Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-pine-950 px-6 py-8 md:hidden"
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
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white cursor-pointer hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
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
                  className="text-lg font-semibold text-white/90 py-3.5 px-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 mt-8 border-t border-white/10 pt-6">
                <Button asChild variant="outline" size="lg" fullWidth className="border-white/20 bg-transparent text-white hover:bg-white/10">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild variant="default" size="lg" fullWidth className="font-bold">
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