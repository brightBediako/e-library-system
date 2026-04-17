"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

type MobileBottomNavItem = Readonly<{
  label: string;
  icon: string;
  href: string;
}>;

type MobileBottomNavProps = Readonly<{
  items: readonly MobileBottomNavItem[];
  className?: string;
}>;

export function MobileBottomNav({ items, className }: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed bottom-0 left-0 z-50 flex w-full justify-around bg-surface-container-lowest/95 px-2 py-3 shadow-[0_-12px_36px_-24px_rgba(17,28,45,0.18)] backdrop-blur-xl md:hidden ${className ?? ""}`}
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        const stateClass = isActive ? "font-semibold text-primary" : "text-on-surface-variant";

        return (
          <Link key={item.label} href={item.href} className={`flex flex-col items-center gap-1 ${stateClass}`}>
            <MaterialIcon icon={item.icon} filled={isActive} />
            <span className="text-[10px] uppercase tracking-tighter">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
