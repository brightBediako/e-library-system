"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

type SidebarNavLinkProps = Readonly<{
  label: string;
  icon: string;
  href: string;
  danger?: boolean;
  className?: string;
}>;

export function SidebarNavLink({
  label,
  icon,
  href,
  danger = false,
  className,
}: SidebarNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  let stateClassName =
    "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900";

  if (danger) {
    stateClassName = "text-error hover:bg-error/10";
  } else if (isActive) {
    stateClassName = "bg-white dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 shadow-sm font-bold";
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-transform duration-200 hover:translate-x-1 ${stateClassName} ${className ?? ""}`}
    >
      <MaterialIcon icon={icon} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
