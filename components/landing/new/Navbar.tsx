"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { LANDING_CONTENT, NavItem } from "@/lib/landing-data";
import LandingButton from "./LandingButton";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { links, ctaSecondary, ctaPrimary } = LANDING_CONTENT.navigation;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E9F0] transition-all">
      <div className="mx-auto flex h-18 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0] rounded-lg"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-[#0B1F4B] p-1 shadow-sm flex items-center justify-center">
              <Image
                src="/logo/logo.jpg"
                alt="Viscas"
                width={36}
                height={36}
                className="object-cover rounded-lg"
                priority
              />
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-[#0B1F4B]">
              viscas
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-1.5 ml-4"
            aria-label="Main Navigation"
          >
            {links.map((item: NavItem) => {
              if (item.children) {
                const isOpen = activeDropdown === item.label;
                return (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      aria-expanded={isOpen}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0] ${
                        isOpen
                          ? "text-[#0070E0] bg-[#EBF4FE]"
                          : "text-[#4A5568] hover:text-[#0B1F4B] hover:bg-slate-100/70"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#0070E0]" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div
                        onMouseLeave={() => setActiveDropdown(null)}
                        className="absolute left-0 top-full mt-2 w-80 rounded-2xl bg-white p-3 shadow-[0_16px_40px_-8px_rgba(11,31,75,0.15)] border border-[#E2E8F0] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="flex flex-col gap-1">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex flex-col p-3 rounded-xl transition-colors hover:bg-[#F8FAFD]"
                            >
                              <div className="flex items-center justify-between text-sm font-bold text-[#0B1F4B] group-hover:text-[#0070E0]">
                                <span>{subItem.label}</span>
                                <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-[#0070E0]" />
                              </div>
                              <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                                {subItem.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-2 text-sm font-semibold text-[#4A5568] hover:text-[#0B1F4B] hover:bg-slate-100/70 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0]"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop CTA actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={ctaSecondary.href}
            className="text-sm font-bold text-[#0B1F4B] hover:text-[#0070E0] px-4 py-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0]"
          >
            {ctaSecondary.label}
          </Link>
          <LandingButton
            href={ctaPrimary.href}
            variant="primary"
            size="md"
            className="px-6"
          >
            {ctaPrimary.label}
          </LandingButton>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href={ctaSecondary.href}
            className="text-xs font-bold text-[#0B1F4B] px-2.5 py-1.5"
          >
            {ctaSecondary.label}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-xl text-[#0B1F4B] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0]"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen / Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-18 bottom-0 bg-white z-50 flex flex-col p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-200 border-t border-slate-200">
          <nav className="flex flex-col gap-2">
            {links.map((link: NavItem) => (
              <div key={link.label} className="py-2 border-b border-slate-100">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg font-bold text-[#0B1F4B] hover:text-[#0070E0]"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="mt-2 pl-3 flex flex-col gap-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-sm text-[#64748B] hover:text-[#0070E0]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <LandingButton
              href={ctaPrimary.href}
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setMobileOpen(false)}
            >
              {ctaPrimary.label}
            </LandingButton>
            <LandingButton
              href={ctaSecondary.href}
              variant="outline-navy"
              size="lg"
              fullWidth
              onClick={() => setMobileOpen(false)}
            >
              {ctaSecondary.label}
            </LandingButton>
          </div>
        </div>
      )}
    </header>
  );
}
