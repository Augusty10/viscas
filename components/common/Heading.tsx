interface HeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function Heading({
  title,
  subtitle,
  align = "left",
}: HeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2
        className="text-5xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}