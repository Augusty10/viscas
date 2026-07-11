"use client";

import Link from "next/link";
import Logo from "../common/Logo";
import { Button } from "@/components/ui/button";
import Container from "../common/Container";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <Container className="flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
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

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" className="rounded-xl">
            <Link href="/login">Login</Link>
          </Button>

          <Button
            asChild
            className="rounded-xl bg-sky-500 px-5 hover:bg-sky-600 text-white font-medium"
          >
            <Link href="/login">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 md:hidden transition"
          title="Toggle Navigation Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-slate-200 bg-white md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-slate-700 hover:text-sky-500 transition"
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t border-slate-100 my-2" />

              <div className="flex flex-col gap-3">
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>

                <Button asChild className="w-full rounded-xl bg-sky-500 hover:bg-sky-600 text-white">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}