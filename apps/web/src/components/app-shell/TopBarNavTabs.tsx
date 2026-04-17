"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TopBarTab = Readonly<{
  label: string;
  href: string;
}>;

type TopBarNavTabsProps = Readonly<{
  tabs: readonly TopBarTab[];
  className?: string;
}>;

export function TopBarNavTabs({ tabs, className }: TopBarNavTabsProps) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        const activeClass = isActive
          ? "border-b-2 border-blue-900 font-semibold text-blue-900"
          : "text-slate-500 transition-colors hover:text-blue-700";

        return (
          <Link key={tab.label} href={tab.href} className={activeClass}>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
