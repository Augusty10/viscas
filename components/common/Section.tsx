interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({
  children,
  className = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`min-h-[calc(100vh-72px)] flex flex-col justify-center py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}