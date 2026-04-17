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
          ? "rounded-lg bg-primary-fixed/40 px-3 py-1.5 font-semibold text-primary"
          : "rounded-lg px-3 py-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary";

        return (
          <Link key={tab.label} href={tab.href} className={activeClass}>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
