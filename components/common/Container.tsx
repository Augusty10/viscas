import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export default function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  const maxWidthClass =
    size === "narrow"
      ? "max-w-4xl"
      : size === "wide"
      ? "max-w-7xl"
      : "max-w-7xl";

  return (
    <div
      className={`mx-auto w-full ${maxWidthClass} px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
