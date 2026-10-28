import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LANDING_CONTENT, FooterColumn } from "@/lib/landing-data";
import { Globe, ShieldCheck } from "lucide-react";

export default function MegaFooter() {
  const { brandDescription, columns, copyright, disclaimer, languages } =
    LANDING_CONTENT.footer;

  return (
    <footer className="bg-[#0B1F4B] text-slate-300 pt-16 pb-12 border-t border-white/10 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Segment: Brand and Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0] rounded-lg"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-white p-1 flex items-center justify-center">
                <Image
                  src="/logo/logo.jpg"
                  alt="Viscas"
                  width={34}
                  height={34}
                  className="object-cover rounded-lg"
                />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                viscas
              </span>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
              {brandDescription}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-sky-300 border border-white/15">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Official Google OAuth Verified</span>
            </div>
          </div>

          {/* Links Grid (8 cols, 4 columns) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col: FooterColumn) => (
              <div key={col.title} className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                  {col.title}
                </span>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="text-[10px] font-bold text-sky-300 bg-sky-500/20 px-1.5 py-0.5 rounded-sm">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Region & Language Selector bar */}
        <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-sky-400" />
            <span className="font-bold text-white">Country / Region:</span>
            <span className="text-slate-300">United States · English (USD $)</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/#" className="hover:text-white transition-colors">
              Cookie Preferences
            </Link>
            <Link href="#security" className="hover:text-white transition-colors">
              Security
            </Link>
          </div>
        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>{copyright}</div>
          <div className="max-w-xl text-left md:text-right leading-normal">
            {disclaimer}
          </div>
        </div>
      </div>
    </footer>
  );
}
