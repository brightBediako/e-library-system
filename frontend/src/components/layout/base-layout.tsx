"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { RouteGuard } from "@/components/auth/route-guard";
import { isMockDataEnabled } from "@/config/mock-mode";
import type { UserRole } from "@/store/auth-store";
import { useAuthStore } from "@/store/auth-store";

interface BaseLayoutProps {
  pageTitle: string;
  pageDescription: string;
  role: UserRole;
  allowedRoles?: UserRole[];
  children: ReactNode;
}

const navItemsByRole: Record<UserRole, Array<{ icon: string; label: string; href: string }>> = {
  admin: [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "menu_book", label: "Library Catalog", href: "/books" },
    { icon: "shelves", label: "Digital Archive", href: "/resources" },
    { icon: "bookmarks", label: "Borrowed Books", href: "/borrowed" },
    { icon: "auto_stories", label: "Reader", href: "/reader" },
  ],
  librarian: [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "menu_book", label: "Library Catalog", href: "/books" },
    { icon: "shelves", label: "Digital Archive", href: "/resources" },
    { icon: "inventory_2", label: "Borrow Management", href: "/borrowed" },
    { icon: "auto_stories", label: "Reader", href: "/reader" },
  ],
  student: [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "menu_book", label: "My Library", href: "/books" },
    { icon: "shelves", label: "Digital Resources", href: "/resources" },
    { icon: "bookmarks", label: "Borrowed Books", href: "/borrowed" },
    { icon: "history", label: "Reading History", href: "/borrowed" },
  ],
};

const roleMeta: Record<UserRole, { portalTitle: string; portalSubtitle: string }> = {
  admin: { portalTitle: "Admin Portal", portalSubtitle: "Superuser" },
  librarian: { portalTitle: "Librarian Portal", portalSubtitle: "Manager" },
  student: { portalTitle: "Student Portal", portalSubtitle: "Member" },
};

export function BaseLayout({
  pageTitle,
  pageDescription,
  role,
  allowedRoles,
  children,
}: BaseLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navItems = navItemsByRole[role];

  const handleSignOut = () => {
    clearAuth();
    router.push("/");
  };

  return (
    <RouteGuard allowedRoles={allowedRoles}>
      <div className="bg-surface text-on-surface min-h-screen">
      <aside className="bg-surface-container-low fixed top-0 left-0 z-40 hidden h-screen w-64 flex-col p-4 md:flex">
        <div className="mb-8 px-2 py-4">
          <Link className="font-headline text-primary text-xl font-extrabold tracking-tighter" href="/dashboard">
            NMTC
          </Link>
          <p className="text-on-surface-variant text-xs font-medium">Academic Library</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
            <Link
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm tracking-tight transition-all ${
                isActive
                  ? "bg-surface-container-lowest text-primary subtle-shadow font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-high font-medium"
              }`}
              href={item.href}
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              {item.label}
            </Link>
          )})}
        </nav>

        <div className="border-outline-variant/40 pt-4 space-y-1 border-t">
          <Link
            className="text-on-surface-variant hover:bg-surface-container-high flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium"
            href="/resources"
          >
            <span className="material-symbols-outlined text-base">help</span>
            Support
          </Link>
          <button
            className="text-on-surface-variant hover:bg-surface-container-high flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium"
            type="button"
            onClick={handleSignOut}
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="md:ml-64 min-h-screen">
        <header className="bg-surface-container-lowest/90 border-outline-variant/40 sticky top-0 z-30 flex h-20 items-center justify-between border-b px-4 backdrop-blur-xl md:px-8">
          <div className="relative w-full min-w-0 max-w-md">
            <span className="material-symbols-outlined text-outline absolute top-1/2 left-4 -translate-y-1/2 text-lg">
              search
            </span>
            <input
              className="bg-surface-container-low focus:bg-surface-bright focus:ring-primary w-full rounded-full border-none py-2.5 pr-4 pl-12 text-sm transition-all focus:ring-2"
              placeholder="Global system search..."
              type="text"
            />
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-2 md:ml-4 md:gap-6">
            {isMockDataEnabled ? (
              <span className="bg-warning-container text-on-warning-container hidden rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase sm:inline-flex">
                Mock Mode
              </span>
            ) : null}
            <Link
              aria-label="Borrowed notifications"
              className="text-on-surface-variant hover:text-primary rounded-full p-1 transition-colors focus-visible:ring-primary/30 focus-visible:ring-2 focus-visible:outline-none"
              href="/borrowed"
            >
              <span className="material-symbols-outlined">notifications</span>
            </Link>
            <Link
              aria-label="Reading history"
              className="text-on-surface-variant hover:text-primary rounded-full p-1 transition-colors focus-visible:ring-primary/30 focus-visible:ring-2 focus-visible:outline-none"
              href="/reader"
            >
              <span className="material-symbols-outlined">history_edu</span>
            </Link>
            <div className="border-outline-variant/50 hidden items-center gap-3 border-l pl-4 sm:flex">
              <div className="text-right">
                <p className="text-primary text-sm font-bold">{roleMeta[role].portalTitle}</p>
                <p className="text-on-surface-variant text-[10px] font-medium tracking-widest uppercase">
                  {roleMeta[role].portalSubtitle}
                </p>
              </div>
              <span className="material-symbols-outlined text-primary text-3xl">account_circle</span>
            </div>
          </div>
        </header>

        <section className="mx-auto w-full max-w-7xl space-y-8 p-4 md:p-10">
          <div className="space-y-2">
            <h2 className="font-headline text-primary text-3xl font-extrabold tracking-tight md:text-4xl">
              {pageTitle}
            </h2>
            <p className="text-on-surface-variant max-w-2xl text-base leading-relaxed md:text-lg">
              {pageDescription}
            </p>
          </div>

          {children}
        </section>
      </main>
      </div>
    </RouteGuard>
  );
}
