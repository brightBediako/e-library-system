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
    <div className={`min-h-screen bg-background bg-academic text-on-surface ${rootClassName ?? ""}`}>
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col space-y-2 border-r border-slate-200/70 bg-white/85 px-4 py-6 shadow-[0_12px_36px_-18px_rgba(15,23,42,0.28)] backdrop-blur-xl">
        {sidebarHeader}
        <nav className="flex-1 space-y-1">{sidebarNav}</nav>
        {sidebarFooter ? <div className="mt-auto">{sidebarFooter}</div> : null}
      </aside>

      <main className={`ml-64 min-h-screen ${mainClassName ?? ""}`}>
        <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/80 px-8 shadow-sm backdrop-blur-xl">
          {topbar}
        </header>
        <div className={contentClassName ?? "px-8 pb-12 pt-24"}>{children}</div>
      </main>

      {floatingAction}
    </div>
  );
}
