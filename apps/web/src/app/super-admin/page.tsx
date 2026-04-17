import type { ReactNode } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/app-shell/DashboardShell";
import { SidebarNavLink } from "@/components/app-shell/SidebarNavLink";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { selectSuperAdminDashboardData } from "@/lib/mock/superAdminDashboard";

function StatCard({
  label,
  value,
  icon,
  detail,
  progress,
  meta,
  metaClassName,
  positive = false,
}: Readonly<{
  label: string;
  value: string;
  icon: string;
  detail?: string;
  progress?: number;
  meta?: string;
  metaClassName?: string;
  positive?: boolean;
}>) {
  const detailClassName = positive ? "font-medium text-primary" : "text-slate-400";
  let detailContent: ReactNode = null;

  if (typeof progress === "number") {
    detailContent = (
      <>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-container-high">
          <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
        {detail ? <p className="mt-2 text-[10px] text-slate-400">{detail}</p> : null}
      </>
    );
  } else if (detail) {
    detailContent = (
      <p className={`mt-2 flex items-center gap-1 text-[10px] ${detailClassName}`}>
        {positive ? <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> : null}
        {detail}
      </p>
    );
  }

  return (
    <div className="rounded-xl bg-surface-container-lowest p-6 shadow-[0_4px_24px_rgba(25,28,30,0.04)]">
      <div className="mb-4 flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          {label}
        </span>
        <MaterialIcon icon={icon} className="text-primary opacity-40" />
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-4xl font-bold tracking-tight text-primary">{value}</h2>
        {meta ? (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${metaClassName}`}>
            {meta}
          </span>
        ) : null}
      </div>
      {detailContent}
    </div>
  );
}

function getLatencyBarClassName(index: number) {
  if (index === 5) return "bg-white";
  if (index === 2) return "bg-white/40";
  if (index === 6) return "bg-white/50";
  if (index === 4) return "bg-white/10";
  return "bg-white/20";
}

export const dynamic = "force-dynamic";

export default function Page() {
  const { navItems, footerNavItems, stats, institutions, configToggles, sessionImages, topbar, media } = selectSuperAdminDashboardData();

  return (
    <DashboardShell
      rootClassName="antialiased"
      sidebarHeader={
        <div className="mb-8 px-2">
          <h1 className="text-sm font-black uppercase tracking-widest text-blue-900">
            The Scholarly Curator
          </h1>
          <p className="text-[10px] font-medium text-slate-500">NMTC Management</p>
        </div>
      }
      sidebarNav={
        <>
          {navItems.map((item) => (
            <SidebarNavLink
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href ?? "/super-admin"}
            />
          ))}
        </>
      }
      sidebarFooter={
        <div className="space-y-1 pt-4">
          {footerNavItems.map((item) => (
            <SidebarNavLink
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href ?? "/super-admin"}
              danger={item.label === "Sign Out"}
            />
          ))}
        </div>
      }
      topbar={
        <>
          <div className="flex items-center gap-4">
            <span className="text-xl font-extrabold tracking-tighter text-primary">
              {topbar.title} <span className="font-light text-slate-400">| {topbar.subtitle}</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <MaterialIcon
                icon="notifications"
                className="cursor-pointer text-slate-500 transition-colors hover:text-blue-700"
              />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-error" />
            </div>
            <MaterialIcon
              icon="settings"
              className="cursor-pointer text-slate-500 transition-colors hover:text-blue-700"
            />
            <button className="rounded-lg bg-gradient-to-br from-primary to-primary-container px-5 py-2 text-sm font-semibold text-white shadow-md transition-all active:opacity-80">
              Quick Action
            </button>
            <div className="flex items-center gap-3 pl-4">
              <img
                alt="User profile avatar"
                className="h-8 w-8 rounded-full object-cover"
                src={topbar.avatarUrl}
              />
            </div>
          </div>
        </>
      }
      contentClassName="mx-auto max-w-[1400px] space-y-8 px-8 pb-12 pt-24"
    >
      <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-end justify-between px-2">
                <div>
                  <h3 className="text-xl font-bold text-primary">Institution Control</h3>
                  <p className="text-sm text-on-surface-variant">
                    Global overview of managed entities
                  </p>
                </div>
                <Link className="flex items-center gap-1 text-sm font-bold text-primary hover:underline" href="/search">
                  View All Catalog <MaterialIcon icon="arrow_forward" className="text-sm" />
                </Link>
              </div>

              <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_4px_24px_rgba(25,28,30,0.04)]">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-surface-container-high">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                        Institution Name
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-primary">
                        Students
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-primary">
                        Storage
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary" />
                    </tr>
                  </thead>
                  <tbody>
                    {institutions.map((institution) => (
                      <tr
                        key={institution.id}
                        className="group bg-surface-container-lowest transition-colors hover:bg-surface-container-low"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container font-bold text-white">
                              N
                            </div>
                            <div>
                              <div className="text-sm font-bold text-primary">{institution.name}</div>
                              <div className="text-[10px] text-slate-400">ID: {institution.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center rounded-full bg-primary-fixed px-2.5 py-0.5 text-xs font-bold uppercase tracking-tight text-on-primary-fixed">
                            {institution.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right font-medium text-on-surface">
                          {institution.students}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-primary">{institution.storage}</span>
                            <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${institution.storagePercent}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="text-slate-400 transition-colors hover:text-primary">
                            <MaterialIcon icon="more_vert" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-surface-container-low opacity-40">
                      <td className="h-16 px-6 py-5" colSpan={5} />
                    </tr>
                    <tr className="bg-surface-container-lowest opacity-20">
                      <td className="h-16 px-6 py-5" colSpan={5} />
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-gradient-to-br from-primary to-primary-container p-6 text-white">
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-widest opacity-70">
                    Core API Latency
                  </h4>
                  <div className="mb-4 flex h-12 items-end gap-1">
                    {[40, 60, 30, 80, 50, 20, 45].map((height, index) => (
                      <div
                        key={`${height}-${index}`}
                        className={`w-2 rounded-t ${getLatencyBarClassName(index)}`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">14ms</span>
                    <span className="rounded bg-white/10 px-2 py-1 text-[10px]">Real-time</span>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-container-lowest p-6 shadow-[0_4px_24px_rgba(25,28,30,0.04)]">
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Active Sessions
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {sessionImages.map((src) => (
                        <img
                          key={src}
                          className="h-10 w-10 rounded-full border-4 border-white object-cover"
                          src={src}
                          alt="Active session user"
                        />
                      ))}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-[10px] font-bold text-slate-500">
                        +42
                      </div>
                    </div>
                    <MaterialIcon icon="hub" className="text-3xl text-primary" />
                  </div>
                  <p className="mt-4 text-[10px] text-slate-400">Current concurrent connections</p>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="px-2">
                <h3 className="text-xl font-bold text-primary">System Config</h3>
                <p className="text-sm text-on-surface-variant">Global feature flags</p>
              </div>

              <div className="space-y-8 rounded-2xl bg-surface-container-lowest p-6 shadow-[0_4px_24px_rgba(25,28,30,0.04)]">
                {configToggles.map((toggle) => (
                  <div key={toggle.title} className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-primary">{toggle.title}</h5>
                      <p className="text-[11px] text-slate-400">{toggle.description}</p>
                    </div>
                    <div className="relative flex h-6 w-10 cursor-pointer items-center rounded-full bg-primary-container px-1">
                      <div className="h-4 w-4 translate-x-4 rounded-full bg-white" />
                    </div>
                  </div>
                ))}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h5 className="text-sm font-bold text-primary">Mobile Sync Interval</h5>
                    <span className="rounded bg-primary-fixed px-2 py-0.5 text-[10px] font-bold uppercase text-primary-container">
                      Optimized
                    </span>
                  </div>
                  <div className="flex cursor-pointer items-center justify-between rounded-lg border border-transparent bg-surface-container-highest px-4 py-3 transition-all hover:border-primary/20">
                    <span className="text-sm font-medium">5m (Aggressive)</span>
                    <MaterialIcon icon="expand_more" className="text-sm" />
                  </div>
                  <p className="mt-2 text-[10px] text-slate-400">
                    Recommended for high-concurrency periods
                  </p>
                </div>

                <div className="rounded-xl bg-surface-container-low p-4">
                  <h6 className="mb-2 text-[10px] font-bold uppercase text-on-surface-variant">
                    Resource Alert
                  </h6>
                  <div className="flex items-center gap-3">
                    <MaterialIcon icon="warning" className="text-error" filled />
                    <p className="text-xs leading-snug text-on-surface">
                      Database backup pending for 12 hours. Manual trigger advised.
                    </p>
                  </div>
                  <button className="mt-4 w-full rounded-lg bg-surface-container-lowest py-2 text-xs font-bold text-primary transition-colors hover:bg-surface-container-high">
                    Resolve Now
                  </button>
                </div>

                <div className="pt-4">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary-container py-3 text-sm font-bold text-on-secondary-container transition-all hover:opacity-90">
                    <MaterialIcon icon="save" className="text-sm" />
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="group relative h-48 overflow-hidden rounded-2xl">
                <img
                  alt="Luxury library interior"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={media.securityBannerImageUrl}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 to-transparent p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-white opacity-80">
                    System Security
                  </p>
                  <h4 className="text-lg font-bold leading-tight text-white">
                    Encrypted Knowledge Ecosystem
                  </h4>
                </div>
              </div>
            </aside>
      </div>
    </DashboardShell>
  );
}