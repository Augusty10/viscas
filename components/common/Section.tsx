interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`min-h-[calc(100vh-72px)] flex items-center ${className}`}>
      {children}
    </section>
  );
}