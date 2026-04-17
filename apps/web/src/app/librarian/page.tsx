import Link from "next/link";
import { DashboardShell } from "@/components/app-shell/DashboardShell";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

type NavItem = {
  label: string;
  icon: string;
  active?: boolean;
  href?: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", active: true },
  { label: "Catalog", icon: "menu_book" },
  { label: "Circulation", icon: "swap_horiz" },
  { label: "Members", icon: "group" },
  { label: "Resources", icon: "inventory_2" },
  { label: "Reports", icon: "analytics" },
];

const footerNavItems: NavItem[] = [
  { label: "Support", icon: "contact_support" },
  { label: "Sign Out", icon: "logout", href: "/" },
];

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

type CatalogRow = {
  title: string;
  author: string;
  coverUrl: string;
  shelf: string;
  copiesText: string;
  copiesPercent: number;
  copiesColor: "primary" | "error";
  availabilityLabel: string;
  availabilityClassName: string;
  stripe?: boolean;
};

const catalogRows: CatalogRow[] = [
  {
    title: "Modern Nursing Practice",
    author: "Dr. Sarah Thompson",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAt0vkT7VuqJyOXbQHtB4Dedtm4j529_x98o3cx5B1mDCiR0C9aeQzGsZ_tIIFRKcWTEX9HFebO5LPuTazJ2jUGxVHq_aNoK3aC67_IAKqyoq2etNL8La2o9ZicCWTtM3mqRktzMSRRqcruc3AdUVdIDJP-PNmSHc-1d1tLVJWcGnn_H4UBpLzZYyXn02tI2Jcexe0e6KlvWLp2hCtHqFoCgi0vPv-9YNDGonwCRlso1z8FQ6XL7oBHSzeUPIzo3c3dL-84B6zvLVs",
    shelf: "A-2",
    copiesText: "5/10",
    copiesPercent: 50,
    copiesColor: "primary",
    availabilityLabel: "In Stock",
    availabilityClassName: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    title: "Emergency Medicine Vol. IV",
    author: "Oxford Press",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFlz1ZFfWvvEdpWoXxl_eeDgs4ZPnOBRsyb_mH0iAGOUVRcPKx-hx-tE35uUgjbkNcrSUGRbm-EmDdSXtoMQ5gnciWyy3k7uuNzML-TpkUHxB4YqPXPtbcc_TjtglSZJyERPYqMBUYfoVxkP3MeIi_eO-f-KmbqNR82e41LG8e3d--xIpkeKn7qUNaHC-cE7lOjG9XAyyTZ7YmlMM_8YEZ3oAH3MTMNykQegkj47gErFYF6dhg1qy0e2WNCjA2LR-tUPc1eUaYrSY",
    shelf: "B-5",
    copiesText: "0/12",
    copiesPercent: 100,
    copiesColor: "error",
    availabilityLabel: "Out of Stock",
    availabilityClassName: "bg-error-container text-on-error-container",
    stripe: true,
  },
  {
    title: "Advanced Anatomy",
    author: "L. G. Richards",
    coverUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiQTLBl4kfylAvwfP4bEZSlAiENeNMeUOAFEoLW56JetsrSTQA4FrK9xSABVt1pKeuxOZbVvsIpUFHR4kXI9IG9xeW0YGLEQ6z2BJZxkiEKdeBKrfiVwKKYPCAw13dv5BZM2wN6m2CHeSFgMg1kqv5Z0b-KIqhFRrBHXil4zlVdPZ1DVl4j1yOC6SgB5R7jhQHZM2r0pFof4RX_eAopCPSe8_xToGTgZgy6XQACJn9QYZGk4WCVEyqKL8Bn7EvtqmtgE2b8zAsiio",
    shelf: "C-1",
    copiesText: "8/8",
    copiesPercent: 100,
    copiesColor: "primary",
    availabilityLabel: "In Stock",
    availabilityClassName: "bg-primary-fixed text-on-primary-fixed",
  },
];

const quickActions = [
  { label: "Issue Book", icon: "outbound", variant: "primary" as const },
  { label: "Return", icon: "keyboard_return", variant: "primary" as const },
  { label: "Renew", icon: "refresh", variant: "primary" as const },
  { label: "Fine", icon: "payments", variant: "danger" as const },
] as const;

const overdueAlerts = [
  {
    name: "Aaliyah Chen",
    overdue: "3 Days Overdue",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIaI03s9YwZanW6N1Up9hsdyxVDyXkYFIUj99Ib1yqM_o-vDjcsT5BU6hUZ6DPckiDvcGcVnzfN1OI9wDDdR_tNjPSz0xAGXUH4UHsGD2RItbkDaVu_wynaZ1PlX0jwgq4RH0REaoSBBkkhjf1qI2Ar_I_U6gNGGA4K9Sjrae0dyC5t3nVWcH4FeTVL2BMQt9qefIPaw-RWw_jE8vfijFicMDTAN82eFlhxGwfFNsh_RzPL0BhhEQRFFxGAxGAmJWLRSPqFSk0_yM",
  },
  {
    name: "Marcus Vane",
    overdue: "1 Day Overdue",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHoRU531ijjoS_FpWygd6nr2_czcjl8o_HW08zObrMzd_pIpEp9mN_hyCW_kYzl8Dgi0Q5KvfeEk474e7svSwVrBmdav0ff1ZXWzQ72CO562ydo7ESKdKW5u0i92VUWfB-ffmoZ-76BIJipnPSSPo__1FnS_AkpSNyhLILGnTksP1hoezsVG4LtUh6PBLC3gnncQmKtFjznG_8psW-Loaao2BNUPq_ARZEcV2PRvmUvgFrNQOYItrkXHTMbE7jiTJkwQjmR6MxLYc",
  },
] as const;

const studentQueries = [
  { id: "#8492", when: "10m ago", title: "Access to digital archives... ", from: "Julianna M." },
  { id: "#8490", when: "2h ago", title: "E-book login issue on mobile", from: "Robert K." },
] as const;

function SidebarLink({
  label,
  icon,
  active = false,
  href = "#",
}: Readonly<{
  label: string;
  icon: string;
  active?: boolean;
  href?: string;
}>) {
  const activeClasses =
    "bg-white dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 shadow-sm font-bold";
  const inactiveClasses =
    "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900";

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-transform duration-200 hover:translate-x-1 ${
        active ? activeClasses : inactiveClasses
      }`}
    >
      <MaterialIcon icon={icon} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <DashboardShell
      rootClassName="antialiased"
      mainClassName="flex-1 bg-background"
      contentClassName="mt-16 space-y-8 p-8"
      sidebarHeader={
        <div className="mb-8 px-2">
          <div className="mb-1 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container text-white shadow-lg">
              <MaterialIcon icon="menu_book" className="text-2xl" />
            </div>
            <h1 className="text-sm font-black uppercase tracking-widest text-blue-900 dark:text-blue-100">
              The Scholarly Curator
            </h1>
          </div>
          <p className="px-1 text-xs font-medium uppercase tracking-tighter text-slate-500">
            NMTC Management
          </p>
        </div>
      }
      sidebarNav={
        <>
          {navItems.map((item) => (
            <SidebarLink key={item.label} {...item} />
          ))}
        </>
      }
      sidebarFooter={
        <div className="space-y-1 border-t border-slate-200/50 pt-4 dark:border-slate-800/50">
          <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container px-4 py-3 font-bold text-on-primary shadow-md transition-transform active:scale-95">
            <MaterialIcon icon="add" className="text-sm" />
            New Entry
          </button>
          {footerNavItems.map((item) => (
            <SidebarLink key={item.label} {...item} />
          ))}
        </div>
      }
      topbar={
        <>
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-full max-w-md">
              <MaterialIcon
                icon="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
              />
              <input
                className="w-full rounded-xl border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-primary/20"
                placeholder="Search by title, author, or ISBN..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {(["notifications", "settings", "help"] as const).map((icon) => (
                <button
                  key={icon}
                  className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 active:opacity-80 dark:hover:bg-slate-800"
                  type="button"
                >
                  <MaterialIcon icon={icon} />
                </button>
              ))}
            </div>
            <div className="mx-2 h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-95">
              Quick Action
            </button>
            <div className="ml-2 h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-slate-200">
              <img
                alt="User profile avatar"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXDBSqPFA-UHk9w_E77eN7Che3uUlYh2_KACoBFWZoye2095vTjhJtCN0iFZcjPkFsJK9ImK6GemE-G7rLnVZCeqM87PVgBKVCSgc7kND9jDsS6Q3fE3aYrFFSRmNsXPFQLmynvuX1pKfD-76yFJay0FWJUh_tjY3ryZDKDvrv0wZzM5Dx-ymJ34euEQ9oE3-guEpxvV5cY5tMMvpOidvEplMIz2fjQ344xINQun3tdlCRVOfcmWeb6zlP45O-1URyIoW_mFSo0ck"
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
                  <table className="w-full border-collapse text-left">
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
                              <div className="h-14 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 shadow-sm">
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
                            <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
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
                              <MaterialIcon icon="more_vert" className="text-slate-400" />
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
                  <button className="text-[10px] font-bold uppercase text-primary hover:underline" type="button">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {overdueAlerts.map((o) => (
                    <div
                      key={o.name}
                      className="flex items-center gap-3 rounded-2xl border-l-4 border-error bg-error-container/20 p-3"
                    >
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
                        <span className="text-[10px] font-medium text-slate-400">{q.when}</span>
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
      </div>
    </DashboardShell>
  );
}