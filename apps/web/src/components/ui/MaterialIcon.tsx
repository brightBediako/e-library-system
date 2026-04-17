"use client";

type MaterialIconProps = Readonly<{
  icon: string;
  className?: string;
  filled?: boolean;
}>;

export function MaterialIcon({ icon, className, filled = false }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined inline-flex shrink-0 select-none items-center justify-center leading-none ${className ?? ""}`}
      style={
        filled
          ? { fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }
          : { fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }
      }
    >
      {icon}
    </span>
  );
}
