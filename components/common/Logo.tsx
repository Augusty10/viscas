type LogoProps = {
  showText?: boolean;
  className?: string;
};

export default function Logo({ showText = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 font-bold text-white ${className}`}>
      <img
        src="/logo/logo.jpg"
        alt="Viscas Logo"
        className="h-[34px] w-[34px] rounded-[10px] object-cover shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      />
      {showText && (
        <span className="font-heading text-[19px] font-bold tracking-tight">
          Viscas
        </span>
      )}
    </div>
  );
}