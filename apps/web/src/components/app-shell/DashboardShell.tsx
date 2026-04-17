import type { ReactNode } from "react";

type DashboardShellProps = Readonly<{
  sidebarHeader: ReactNode;
  sidebarNav: ReactNode;
  sidebarFooter?: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
  rootClassName?: string;
  mainClassName?: string;
  contentClassName?: string;
  floatingAction?: ReactNode;
}>;

export function DashboardShell({
  sidebarHeader,
  sidebarNav,
  sidebarFooter,
  topbar,
  children,
  rootClassName,
  mainClassName,
  contentClassName,
  floatingAction,
}: DashboardShellProps) {
  return (
    <div className={`min-h-screen bg-background text-on-surface ${rootClassName ?? ""}`}>
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col space-y-2 bg-slate-50 px-4 py-6">
        {sidebarHeader}
        <nav className="flex-1 space-y-1">{sidebarNav}</nav>
        {sidebarFooter ? <div className="mt-auto">{sidebarFooter}</div> : null}
      </aside>

      <main className={`ml-64 min-h-screen ${mainClassName ?? ""}`}>
        <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between bg-white/80 px-8 shadow-sm backdrop-blur-xl">
          {topbar}
        </header>
        <div className={contentClassName ?? "px-8 pb-12 pt-24"}>{children}</div>
      </main>

      {floatingAction}
    </div>
  );
}
