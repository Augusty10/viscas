import React from "react";

export interface LandingSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: "white" | "light" | "subtle" | "navy" | "dark-navy" | "gradient";
  size?: "default" | "narrow" | "wide";
  badge?: string;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: "center" | "left";
}

export default function LandingSection({
  id,
  children,
  className = "",
  containerClassName = "",
  background = "white",
  size = "default",
  badge,
  title,
  subtitle,
  align = "center",
}: LandingSectionProps) {
  const bgStyles = {
    white: "bg-white text-[#4A5568]",
    light: "bg-[#F5F7FA] text-[#4A5568] border-y border-[#EAEFF5]",
    subtle: "bg-[#F8FAFD] text-[#4A5568]",
    navy: "bg-[#0B1F4B] text-white/90",
    "dark-navy": "bg-[#071533] text-white/90",
    gradient: "bg-gradient-to-b from-[#F5F7FA] to-white text-[#4A5568]",
  }[background];

  const maxWidthClass = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-8xl",
  }[size];

  const hasHeader = Boolean(badge || title || subtitle);

  const titleColorClass =
    background === "navy" || background === "dark-navy"
      ? "text-white"
      : "text-[#0B1F4B]";

  const subtitleColorClass =
    background === "navy" || background === "dark-navy"
      ? "text-slate-300"
      : "text-[#4A5568]";

  const badgeBgClass =
    background === "navy" || background === "dark-navy"
      ? "bg-white/10 text-sky-300 border-white/15"
      : "bg-[#EBF4FE] text-[#0070E0] border-[#BAD8FB]/60";

  return (
    <section
      id={id}
      className={`relative py-16 sm:py-20 lg:py-24 overflow-hidden ${bgStyles} ${className}`}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClass} ${containerClassName}`}>
        {hasHeader && (
          <div
            className={`flex flex-col mb-12 sm:mb-16 ${
              align === "center"
                ? "items-center text-center mx-auto max-w-3xl"
                : "items-start text-left max-w-2xl"
            }`}
          >
            {badge && (
              <span
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5 border ${badgeBgClass}`}
              >
                {badge}
              </span>
            )}
            {title && (
              <h2
                className={`font-heading text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight leading-[1.18] ${titleColorClass}`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`mt-4 text-base sm:text-lg leading-relaxed font-normal ${subtitleColorClass}`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
