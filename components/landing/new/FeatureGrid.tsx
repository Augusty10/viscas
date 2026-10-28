import React from "react";
import Link from "next/link";
import { LANDING_CONTENT, FeatureCard } from "@/lib/landing-data";
import LandingSection from "./LandingSection";
import LandingCard from "./LandingCard";
import {
  Mail,
  Calendar,
  Sparkles,
  FileText,
  CreditCard,
  Search,
  ArrowRight,
} from "lucide-react";

export default function FeatureGrid() {
  const { badge, title, subtitle, cards } = LANDING_CONTENT.featureCards;

  const renderIcon = (type: FeatureCard["icon"]) => {
    const iconClass = "h-6 w-6 text-[#0070E0]";
    switch (type) {
      case "mail":
        return <Mail className={iconClass} />;
      case "calendar":
        return <Calendar className={iconClass} />;
      case "sparkles":
        return <Sparkles className={iconClass} />;
      case "fileText":
        return <FileText className={iconClass} />;
      case "creditCard":
        return <CreditCard className={iconClass} />;
      case "search":
        return <Search className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <LandingSection
      id="features"
      badge={badge}
      title={title}
      subtitle={subtitle}
      background="white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {cards.map((card: FeatureCard) => (
          <LandingCard
            key={card.id}
            variant="default"
            hoverEffect={true}
            className="flex flex-col justify-between group"
          >
            <div>
              {/* Top Row: Icon and Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EBF4FE] border border-[#BAD8FB]/50 group-hover:scale-105 transition-transform">
                  {renderIcon(card.icon)}
                </div>
                {card.tag && (
                  <span className="text-[11px] font-bold text-[#0070E0] bg-[#EBF4FE] px-2.5 py-1 rounded-full border border-[#BAD8FB]/60">
                    {card.tag}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-xl font-bold text-[#0B1F4B] mb-2.5 group-hover:text-[#0070E0] transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-[#4A5568] leading-relaxed mb-6 font-normal">
                {card.description}
              </p>
            </div>

            {/* Bottom: Learn more link */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                href={card.href}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0070E0] group-hover:text-[#0058B6] transition-colors"
              >
                <span>Learn more</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </LandingCard>
        ))}
      </div>
    </LandingSection>
  );
}
