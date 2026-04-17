import type { ReactNode } from "react";
import { DecorativeBackdrop } from "@/components/ui/DecorativeBackdrop";

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

const defaultContentClass = "relative px-4 pb-12 pt-20 sm:px-6 md:px-8 md:pt-24 lg:px-10";

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
    <div className={`relative min-h-screen bg-background text-on-surface ${rootClassName ?? ""}`}>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col space-y-2 bg-surface-container-lowest/92 px-4 py-7 shadow-[0_16px_48px_-28px_rgba(17,28,45,0.22)] backdrop-blur-xl md:flex">
        {sidebarHeader}
        <nav className="flex flex-1 flex-col space-y-1 overflow-y-auto overscroll-contain pb-4">{sidebarNav}</nav>
        {sidebarFooter ? <div className="mt-auto shrink-0 border-0 pt-2">{sidebarFooter}</div> : null}
      </aside>

      <main className={`relative min-h-screen md:ml-64 ${mainClassName ?? ""}`}>
        <DecorativeBackdrop />
        <header className="fixed left-0 right-0 top-0 z-30 flex min-h-16 items-center justify-between gap-3 bg-surface-container-lowest/90 px-4 py-3 shadow-[0_12px_32px_-28px_rgba(17,28,45,0.18)] backdrop-blur-xl sm:px-6 md:left-64 md:px-8">
          {topbar}
        </header>
        <div className={contentClassName ?? defaultContentClass}>{children}</div>
      </main>

      {floatingAction}
    </div>
  );
}
