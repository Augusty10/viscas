import React from "react";
import Link from "next/link";

export interface LandingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "outline-navy" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export default function LandingButton({
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  children,
  icon,
  iconPosition = "right",
  className = "",
  disabled,
  ...props
}: LandingButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070E0] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

  const sizeClasses = {
    sm: "text-xs px-4 py-2 gap-1.5 h-9",
    md: "text-sm px-5 py-2.5 gap-2 h-11",
    lg: "text-base px-7 py-3.5 gap-2.5 h-13",
  }[size];

  const variantClasses = {
    primary:
      "bg-[#0070E0] text-white hover:bg-[#0058B6] active:bg-[#004593] shadow-[0_2px_8px_rgba(0,112,224,0.25)] hover:shadow-[0_4px_16px_rgba(0,112,224,0.35)]",
    secondary:
      "bg-[#0B1F4B] text-white hover:bg-[#071533] active:bg-[#040C1E] shadow-[0_2px_8px_rgba(11,31,75,0.2)]",
    outline:
      "bg-transparent text-[#0070E0] border-2 border-[#0070E0] hover:bg-[#0070E0]/10 hover:border-[#0058B6]",
    "outline-navy":
      "bg-white text-[#0B1F4B] border border-[#CBD5E1] hover:border-[#0B1F4B] hover:bg-[#F8FAFD] shadow-xs",
    ghost:
      "bg-transparent text-[#0B1F4B] hover:bg-[#F1F5F9] active:bg-[#E2E8F0]",
    white:
      "bg-white text-[#0B1F4B] hover:bg-[#F8FAFC] shadow-[0_4px_14px_rgba(11,31,75,0.08)] hover:shadow-[0_6px_20px_rgba(11,31,75,0.12)] border border-slate-100",
  }[variant];

  const widthClass = fullWidth ? "w-full" : "w-auto";

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
