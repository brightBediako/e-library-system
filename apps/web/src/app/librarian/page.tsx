import Link from "next/link";
import { DashboardShell } from "@/components/app-shell/DashboardShell";
import { SidebarNavLink } from "@/components/app-shell/SidebarNavLink";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { selectLibrarianDashboardData } from "@/lib/mock/librarianDashboard";

const kpis = [
  {
    type: "hero" as const,
    title: "Total Active Loans",
    value: "1,284",
    delta: "+12.5%",
    detail: "than last month",
    icon: "menu_book",
  },
  {
    type: "card" as const,
    icon: "history",
    iconClassName: "text-tertiary bg-tertiary-fixed",
    title: "Overdue Items",
    value: "42",
    alert: "Requires immediate attention",
    alertIcon: "warning",
    alertClassName: "text-error",
  },
  {
    type: "card" as const,
    icon: "support_agent",
    iconClassName: "text-primary bg-primary-fixed",
    title: "Open Tickets",
    value: "08",
    sub: "3 pending resolution",
  },
] as const;

export const dynamic = "force-dynamic";

export default function Page() {
  const { navItems, footerNavItems, catalogRows, quickActions, overdueAlerts, studentQueries, topbar } = selectLibrarianDashboardData();

  return (
    <DashboardShell
      rootClassName="antialiased"
      mainClassName="flex-1 bg-background"
      contentClassName="relative mx-auto mt-14 max-w-[1400px] space-y-8 px-4 pb-12 pt-4 sm:mt-16 sm:px-6 md:px-8 lg:px-10"
      sidebarHeader={
        <div className="mb-8 px-2">
          <div className="mb-1 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container text-white shadow-lg">
              <MaterialIcon icon="menu_book" className="text-2xl" />
            </div>
            <h1 className="text-sm font-black uppercase tracking-widest text-primary">
              The Scholarly Curator
            </h1>
          </div>
          <p className="px-1 text-xs font-medium uppercase tracking-tighter text-on-surface-variant">
            NMTC Management
          </p>
        </div>
      }
      sidebarNav={
        <>
          {navItems.map((item) => (
            <SidebarNavLink key={item.label} label={item.label} icon={item.icon} href={item.href ?? "/librarian"} />
          ))}
        </>
      }
      sidebarFooter={
        <div className="space-y-1 pt-4">
          <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container px-4 py-3 font-bold text-on-primary shadow-md transition-transform active:scale-95">
            <MaterialIcon icon="add" className="text-sm" />
            New Entry
          </button>
          {footerNavItems.map((item) => (
            <SidebarNavLink
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href ?? "/librarian"}
              danger={item.label === "Sign Out"}
            />
          ))}
        </div>
      }
      topbar={
        <>
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-full max-w-md">
              <MaterialIcon
                icon="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-xl"
              />
              <input
                className="w-full rounded-xl border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm placeholder:text-on-surface-variant/65 focus:ring-2 focus:ring-primary/20"
                placeholder={topbar.searchPlaceholder}
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {(["notifications", "settings", "help"] as const).map((icon) => (
                <button
                  key={icon}
                  className="cursor-pointer rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low active:opacity-80"
                  type="button"
                >
                  <MaterialIcon icon={icon} />
                </button>
              ))}
            </div>
            <div className="mx-2 hidden h-8 w-px bg-surface-container-high sm:block" aria-hidden />
            <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-95">
              Quick Action
            </button>
            <div className="ml-2 h-8 w-8 overflow-hidden rounded-full bg-surface-container-high">
              <img
                alt="User profile avatar"
                className="h-full w-full object-cover"
                src={topbar.avatarUrl}
              />
            </div>
          </div>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-container p-8 text-white shadow-xl md:col-span-2">
          <div className="relative z-10">
            <h2 className="mb-1 text-lg font-medium opacity-80">Total Active Loans</h2>
            <div className="mb-4 text-5xl font-black tracking-tighter">1,284</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="rounded-full bg-white/20 px-2 py-1 font-bold">+12.5%</span>
              <span className="opacity-70">than last month</span>
            </div>
          </div>
          <div className="absolute bottom-[-20px] right-[-20px] opacity-10">
            <MaterialIcon icon="menu_book" className="text-[160px]" />
          </div>
        </div>

        <div className="space-y-2 rounded-3xl bg-surface-container-lowest p-6 shadow-sm">
          <MaterialIcon icon="history" className="rounded-2xl bg-tertiary-fixed p-3 text-tertiary" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
            Overdue Items
          </h3>
          <div className="text-3xl font-black text-primary">42</div>
          <p className="flex items-center gap-1 text-xs font-medium text-error">
            <MaterialIcon icon="warning" className="text-xs" /> Requires immediate attention
          </p>
        </div>

        <div className="space-y-2 rounded-3xl bg-surface-container-lowest p-6 shadow-sm">
          <MaterialIcon
            icon="support_agent"
            className="rounded-2xl bg-primary-fixed p-3 text-primary"
          />
          <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
            Open Tickets
          </h3>
          <div className="text-3xl font-black text-primary">08</div>
          <p className="text-xs font-medium text-on-surface-variant">3 pending resolution</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight text-primary">Catalog Management</h2>
                <div className="flex gap-2">
                  {[
                    { label: "Filter", icon: "filter_list" },
                    { label: "Sort", icon: "sort" },
                  ].map((b) => (
                    <button
                      key={b.label}
                      className="flex items-center gap-2 rounded-xl bg-surface-container-high px-4 py-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                      type="button"
                    >
                      <MaterialIcon icon={b.icon} className="text-sm" /> {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl bg-surface-container-lowest shadow-sm">
                <div className="overflow-x-auto">
                  <table className="app-data-table">
                    <thead className="bg-surface-container-high text-[10px] font-black uppercase tracking-widest text-primary">
                      <tr>
                        <th className="px-6 py-4">Title &amp; Author</th>
                        <th className="px-6 py-4">Shelf</th>
                        <th className="px-6 py-4">Copies</th>
                        <th className="px-6 py-4">Availability</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {catalogRows.map((row) => (
                        <tr
                          key={row.title}
                          className={`${row.stripe ? "bg-surface-container-low/30" : ""} group transition-colors hover:bg-surface-container-low`}
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="h-14 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container-low shadow-sm">
                                <img alt="Book cover" className="h-full w-full object-cover" src={row.coverUrl} />
                              </div>
                              <div>
                                <p className="font-bold leading-tight text-on-surface">{row.title}</p>
                                <p className="text-xs text-on-surface-variant">{row.author}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 font-medium text-on-surface">{row.shelf}</td>
                          <td className="px-6 py-5">
                            <div className="text-xs font-bold text-on-surface-variant">{row.copiesText}</div>
                            <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-surface-container-low">
                              <div
                                className={`h-full ${row.copiesColor === "error" ? "bg-error opacity-30" : "bg-primary"}`}
                                style={{ width: `${row.copiesPercent}%` }}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${row.availabilityClassName}`}>
                              {row.availabilityLabel}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button className="rounded-lg p-2 transition-colors hover:bg-white" type="button">
                              <MaterialIcon icon="more_vert" className="text-on-surface-variant/70" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section className="rounded-3xl bg-surface-container-lowest p-8 shadow-sm">
                <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-primary">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((a) => (
                    <button
                      key={a.label}
                      className={`group flex flex-col items-center justify-center gap-2 rounded-2xl p-4 transition-all ${
                        a.variant === "danger"
                          ? "bg-surface-container-low text-error hover:bg-error-container"
                          : "bg-surface-container-low text-primary hover:bg-primary-fixed"
                      }`}
                      type="button"
                    >
                      <MaterialIcon
                        icon={a.icon}
                        className="text-2xl transition-transform group-hover:scale-110"
                      />
                      <span className="text-xs font-bold uppercase tracking-tighter">{a.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-surface-container-lowest p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                    Overdue Alert
                  </h3>
                  <Link className="text-[10px] font-bold uppercase text-primary hover:underline" href="/librarian">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {overdueAlerts.map((o) => (
                    <div key={o.name} className="flex items-center gap-3 rounded-2xl bg-error-container/20 p-3">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                        <img alt="Student" className="h-full w-full object-cover" src={o.img} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{o.name}</p>
                        <p className="text-[10px] font-medium uppercase text-error">{o.overdue}</p>
                      </div>
                      <button className="rounded-xl bg-error p-2 text-white shadow-sm transition-transform active:scale-95" type="button">
                        <MaterialIcon icon="mail" className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-surface-container-lowest p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                    Student Queries
                  </h3>
                  <span className="rounded-md bg-tertiary-fixed px-2 py-0.5 text-[10px] font-black text-on-tertiary-fixed">
                    3 NEW
                  </span>
                </div>
                <div className="space-y-3">
                  {studentQueries.map((q) => (
                    <div
                      key={q.id}
                      className="group cursor-pointer rounded-2xl bg-surface-container-low p-4 transition-colors hover:bg-surface-container"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                          {q.id}
                        </span>
                        <span className="text-[10px] font-medium text-on-surface-variant/70">{q.when}</span>
                      </div>
                      <p className="line-clamp-1 text-xs font-bold text-on-surface transition-colors group-hover:text-primary">
                        {q.title}
                      </p>
                      <p className="mt-1 text-[10px] text-on-surface-variant">From: {q.from}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
      </div>
    </DashboardShell>
  );
}