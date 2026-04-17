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
      className={`fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-slate-100 bg-white px-4 py-3 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] md:hidden ${className ?? ""}`}
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        const stateClass = isActive ? "font-bold text-blue-900" : "text-slate-400";

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
