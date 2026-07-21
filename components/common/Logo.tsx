type LogoProps = {
  showText?: boolean;
  className?: string;
};

export default function Logo({ showText = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 font-bold text-white ${className}`}>
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-gradient-to-br from-sky-500 to-forest-600 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20C4 10 12 4 20 4C20 12 14 20 4 20Z"
            fill="white"
            fillOpacity="0.9"
          />
        </svg>
      </span>
      {showText && (
        <span className="font-heading text-[19px] font-bold tracking-tight">
          Viscas
        </span>
      )}
    </div>
  );
}