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
    "text-on-surface-variant hover:bg-surface-container-low active:scale-[0.99]";

  if (danger) {
    stateClassName = "text-error hover:bg-error-container/40";
  } else if (isActive) {
    stateClassName =
      "bg-primary-fixed/35 font-semibold text-primary shadow-[0_8px_24px_-18px_rgba(0,32,69,0.2)]";
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:translate-x-0.5 ${stateClassName} ${className ?? ""}`}
    >
      <MaterialIcon icon={icon} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
