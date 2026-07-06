type LogoProps = {
  showText?: boolean;
};

export default function Logo({ showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo/logo.svg"
        alt="Viscas"
        className="h-10 w-10"
      />

      {showText && (
        <span
          className="text-2xl font-bold"
          style={{
            fontFamily: "var(--font-heading)",
          }}
        >
          Viscas
        </span>
      )}
    </div>
  );
}