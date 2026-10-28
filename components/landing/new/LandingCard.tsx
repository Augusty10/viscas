import React from "react";

export interface LandingCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted" | "elevated" | "bordered" | "navy";
  hoverEffect?: boolean;
}

export default function LandingCard({
  children,
  className = "",
  variant = "default",
  hoverEffect = true,
}: LandingCardProps) {
  const variantStyles = {
    default: "bg-white border border-[#E5E9F0] shadow-[0_4px_16px_-2px_rgba(11,31,75,0.05)]",
    muted: "bg-[#F8FAFD] border border-[#E2E8F0] shadow-xs",
    elevated: "bg-white border border-[#E2E8F0] shadow-[0_12px_32px_-6px_rgba(11,31,75,0.08),0_4px_12px_rgba(11,31,75,0.03)]",
    bordered: "bg-white border-2 border-[#E2E8F0]",
    navy: "bg-[#0B1F4B] text-white border border-white/10 shadow-[0_12px_32px_-6px_rgba(7,21,51,0.5)]",
  }[variant];

  const hoverStyles = hoverEffect
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-6px_rgba(11,31,75,0.1)] hover:border-[#CBD5E1]"
    : "";

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 ${variantStyles} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
