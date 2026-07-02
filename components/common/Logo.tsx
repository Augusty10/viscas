export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo/logo.svg"
        alt="Viscas"
        className="h-10 w-10"
      />

      <span
        className="font-bold text-2xl"
        style={{
          fontFamily: "var(--font-heading)",
        }}
      >
        Viscas
      </span>
    </div>
  );
}