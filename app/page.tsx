import type { Metadata } from "next";
import TopUtilityBar from "@/components/landing/new/TopUtilityBar";
import Navbar from "@/components/landing/new/Navbar";
import Hero from "@/components/landing/new/Hero";
import TrustStrip from "@/components/landing/new/TrustStrip";
import TabbedShowcase from "@/components/landing/new/TabbedShowcase";
import FeatureGrid from "@/components/landing/new/FeatureGrid";
import SplitSections from "@/components/landing/new/SplitSections";
import StatsBand from "@/components/landing/new/StatsBand";
import HowItWorks from "@/components/landing/new/HowItWorks";
import Testimonials from "@/components/landing/new/Testimonials";
import PricingSection from "@/components/landing/new/PricingSection";
import FaqSection from "@/components/landing/new/FaqSection";
import FinalCta from "@/components/landing/new/FinalCta";
import MegaFooter from "@/components/landing/new/MegaFooter";

export const metadata: Metadata = {
  title: "Viscas — The AI Productivity Workspace for Email & Calendar",
  description:
    "Viscas brings Gmail, Google Calendar, and contextual AI into one calm dashboard. Let AI summarize threads, draft replies, and schedule meetings securely.",
  keywords: [
    "AI email",
    "calendar scheduler",
    "Gmail copilot",
    "executive summary",
    "productivity workspace",
    "inbox zero",
  ],
  openGraph: {
    title: "Viscas — The AI Productivity Workspace for Email & Calendar",
    description:
      "Transform your inbox and calendar into a calm, intelligent command center. Connect Gmail and Google Calendar with bank-grade security.",
    url: "https://viscas.com",
    siteName: "Viscas",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viscas — The AI Productivity Workspace for Email & Calendar",
    description:
      "Let AI summarize threads, draft replies in your voice, and schedule meetings while you focus on high-impact work.",
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#4A5568] selection:bg-[#EBF4FE] selection:text-[#0070E0]">
      {/* 1. Top Utility Bar (Personal / Business / Help) */}
      <TopUtilityBar />

      {/* 2. Sticky Navbar with Logo, Dropdown Links, Login and Pill Sign Up */}
      <Navbar />

      {/* Main Sections Hierarchy */}
      <main className="flex-1">
        {/* 3. Hero Section with Big Headline, Pill CTAs, and Floating Mockup */}
        <Hero />

        {/* 4. Trust Strip with Security Badges and Partner Logos */}
        <TrustStrip />

        {/* 5. 'Everything You Need' Tabbed Section with Live Visual Swapping */}
        <TabbedShowcase />

        {/* 6. Feature Cards Grid (3 Columns with Icons and Links) */}
        <FeatureGrid />

        {/* 7. Big Split Sections Alternating Image Left/Right (Fast, Secure, Simple) */}
        <SplitSections />

        {/* 8. Stats Band on Dark Navy Background */}
        <StatsBand />

        {/* 9. How It Works (3 Numbered Steps) */}
        <HowItWorks />

        {/* 10. Testimonials Carousel */}
        <Testimonials />

        {/* Pricing Tier Section */}
        <PricingSection />

        {/* 11. FAQ Accordion */}
        <FaqSection />

        {/* 12. Final CTA Banner on Vibrant Blue Gradient */}
        <FinalCta />
      </main>

      {/* 13. Mega Footer with Multiple Link Columns and Region Selector */}
      <MegaFooter />
    </div>
  );
}