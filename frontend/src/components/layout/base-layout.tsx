import { ReactNode } from "react";
import type { UserRole } from "@/store/auth-store";

interface BaseLayoutProps {
  pageTitle: string;
  pageDescription: string;
  role: UserRole;
  children: ReactNode;
}

const navItemsByRole: Record<UserRole, Array<{ icon: string; label: string }>> = {
  admin: [
    { icon: "dashboard", label: "Dashboard" },
    { icon: "group", label: "Member Directory" },
    { icon: "menu_book", label: "Library Catalog" },
    { icon: "shelves", label: "Digital Archive" },
    { icon: "settings_suggest", label: "System Settings" },
  ],
  librarian: [
    { icon: "dashboard", label: "Dashboard" },
    { icon: "menu_book", label: "Library Catalog" },
    { icon: "shelves", label: "Digital Archive" },
    { icon: "inventory_2", label: "Borrow Management" },
    { icon: "group", label: "Patrons" },
  ],
  student: [
    { icon: "dashboard", label: "Dashboard" },
    { icon: "menu_book", label: "My Library" },
    { icon: "shelves", label: "Digital Resources" },
    { icon: "bookmarks", label: "Borrowed Books" },
    { icon: "history", label: "Reading History" },
  ],
};

const roleMeta: Record<UserRole, { portalTitle: string; portalSubtitle: string }> = {
  admin: { portalTitle: "Admin Portal", portalSubtitle: "Superuser" },
  librarian: { portalTitle: "Librarian Portal", portalSubtitle: "Manager" },
  student: { portalTitle: "Student Portal", portalSubtitle: "Member" },
};

export function BaseLayout({ pageTitle, pageDescription, role, children }: BaseLayoutProps) {
  const navItems = navItemsByRole[role];

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <aside className="bg-surface-container-low fixed top-0 left-0 z-40 hidden h-screen w-64 flex-col p-4 md:flex">
        <div className="mb-8 px-2 py-4">
          <h1 className="font-headline text-primary text-xl font-extrabold tracking-tighter">
            The Archive
          </h1>
          <p className="text-on-surface-variant text-xs font-medium">Academic Library</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm tracking-tight transition-all ${
                index === 0
                  ? "bg-surface-container-lowest text-primary subtle-shadow font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-high font-medium"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-outline-variant/40 pt-4 space-y-1 border-t">
          <button
            className="text-on-surface-variant hover:bg-surface-container-high flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium"
            type="button"
          >
            <span className="material-symbols-outlined text-base">help</span>
            Support
          </button>
          <button
            className="text-on-surface-variant hover:bg-surface-container-high flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium"
            type="button"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="md:ml-64 min-h-screen">
        <header className="bg-surface-container-lowest/90 border-outline-variant/40 sticky top-0 z-30 flex h-20 items-center justify-between border-b px-4 backdrop-blur-xl md:px-8">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined text-outline absolute top-1/2 left-4 -translate-y-1/2 text-lg">
              search
            </span>
            <input
              className="bg-surface-container-low focus:bg-surface-bright focus:ring-primary w-full rounded-full border-none py-2.5 pr-4 pl-12 text-sm transition-all focus:ring-2"
              placeholder="Global system search..."
              type="text"
            />
          </div>

          <div className="ml-4 flex items-center gap-4 md:gap-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors" type="button">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors" type="button">
              <span className="material-symbols-outlined">history_edu</span>
            </button>
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

        <section className="mx-auto w-full max-w-7xl space-y-8 p-6 md:p-10">
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
  );
}
