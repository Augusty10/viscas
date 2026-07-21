"use client";

import Link from "next/link";
import Logo from "../common/Logo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/#" },
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/6 bg-pine-950/96 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl h-[72px] items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[14.5px] font-medium text-white/70 transition-colors duration-200 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4.5 md:flex">
          <Link href="/login" className="text-[14.5px] font-medium text-white/85 transition-colors hover:text-white">
            Login
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-5.5 py-2.5 text-[14.5px] font-bold text-pine-950 shadow-[0_6px_20px_rgba(56,189,248,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(56,189,248,0.4)]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-[38px] w-[38px] flex-col items-center justify-center gap-1 rounded-[9px] border border-white/20 bg-transparent cursor-pointer md:hidden transition hover:bg-white/5"
          title="Open Navigation Menu"
          aria-label="Open menu"
        >
          <span className="h-0.5 w-4 bg-white" />
          <span className="h-0.5 w-4 bg-white" />
          <span className="h-0.5 w-4 bg-white" />
        </button>
      </div>

      {/* Mobile Drawer Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-pine-950 px-8 py-[100px] md:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-7 bg-none border-none text-white text-3xl cursor-pointer"
              aria-label="Close menu"
            >
              ×
            </button>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[22px] font-semibold text-white py-4 border-b border-white/8 hover:text-sky-300 transition"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-transparent py-3 text-[16px] font-bold text-white transition hover:border-white/55"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 py-3 text-[16px] font-bold text-pine-950 shadow-[0_6px_20px_rgba(56,189,248,0.28)] transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}