import Link from "next/link";
import { DashboardShell } from "@/components/app-shell/DashboardShell";
import { SidebarNavLink } from "@/components/app-shell/SidebarNavLink";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { selectStudentDashboardData } from "@/lib/mock/studentDashboard";

export const dynamic = "force-dynamic";

export default function Page() {
  const { navItems, resourceCards, alerts, activeLoans, profile, welcome } = selectStudentDashboardData();

  return (
    <DashboardShell
      rootClassName="antialiased"
      mainClassName="bg-background"
      contentClassName="relative mx-auto max-w-[1400px] px-4 pb-12 pt-20 sm:px-6 md:px-8 lg:px-10"
      sidebarHeader={
        <div className="mb-8 px-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary">The Scholarly Curator</p>
          <p className="mt-1 text-xs text-on-surface-variant">NMTC Management</p>
        </div>
      }
      sidebarNav={
        <>
          {navItems.map((item) => (
            <SidebarNavLink key={item.label} label={item.label} icon={item.icon} href={item.href ?? "/student"} />
          ))}
        </>
      }
      sidebarFooter={
        <div className="space-y-1 pt-6">
          <SidebarNavLink label="Support" icon="contact_support" href="/student" />
          <SidebarNavLink label="Sign Out" icon="logout" href="/logout" danger />
        </div>
      }
      topbar={
        <>
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tighter text-primary">NMTC Library</span>
            <div className="hidden w-96 items-center rounded-full bg-surface-container-low px-4 py-2 md:flex">
              <MaterialIcon icon="search" className="text-sm text-outline" />
              <input className="ml-2 w-full border-none bg-transparent text-sm text-on-surface-variant focus:ring-0" placeholder="Search digital catalog..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="relative rounded-full p-2 text-on-surface-variant hover:bg-surface-container-low" type="button">
                <MaterialIcon icon="notifications" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error shadow-[0_0_0_2px_rgba(255,255,255,1)]" />
              </button>
              <button className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-low" type="button"><MaterialIcon icon="settings" /></button>
              <button className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-low" type="button"><MaterialIcon icon="help" /></button>
            </div>
            <div className="mx-1 hidden h-8 w-px bg-surface-container-high sm:block" aria-hidden />
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-bold text-primary">{profile.name}</p>
                <p className="text-[10px] text-on-surface-variant">{profile.program}</p>
              </div>
              <img alt="Student profile" className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/10" src={profile.avatarUrl} />
            </div>
          </div>
        </>
      }
      floatingAction={
        <button className="group fixed bottom-5 right-4 z-50 flex items-center gap-3 rounded-full bg-gradient-to-br from-primary to-primary-container px-5 py-3.5 text-white shadow-[0_20px_48px_-24px_rgba(0,32,69,0.45)] transition-all hover:scale-[1.02] active:scale-95 sm:bottom-8 sm:right-8 sm:px-6 sm:py-4" type="button">
          <MaterialIcon icon="search" />
          <span className="text-sm font-bold">Find a Resource</span>
        </button>
      }
    >
      <div className="mx-auto max-w-7xl space-y-8">
          <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-container p-8 text-white shadow-xl lg:col-span-2">
              <h1 className="mb-2 text-3xl font-bold tracking-tight">{welcome.title}</h1>
              <p className="mb-6 max-w-md text-on-primary-container">{welcome.subtitle}</p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 rounded-xl bg-surface-container-lowest px-6 py-2.5 text-sm font-bold text-primary hover:opacity-90" type="button">
                  <MaterialIcon icon="history" className="text-sm" /> Reading History
                </button>
                <button className="rounded-xl bg-white/15 px-6 py-2.5 text-sm font-bold text-white hover:bg-white/25" type="button">Extend Loans</button>
              </div>
              <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="space-y-6 rounded-3xl bg-surface-container-lowest p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-bold text-primary">
                <MaterialIcon icon="pending_actions" className="text-primary" /> Active Loans
              </h3>
              {activeLoans.map((loan) => (
                <div key={loan.title} className="group flex cursor-pointer items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-on-surface">{loan.title}</p>
                    <p className={`text-[10px] font-medium ${loan.warn ? "text-error" : "text-on-surface-variant"}`}>{loan.due}</p>
                  </div>
                  <MaterialIcon icon="chevron_right" className="text-outline transition-colors group-hover:text-primary" />
                </div>
              ))}
              <Link className="block w-full rounded-xl bg-surface-container-low py-3 text-center text-xs font-bold text-primary hover:bg-surface-container-high" href="/student">View All Borrowings</Link>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-primary">Curated for Year 3</h2>
                <p className="text-sm text-on-surface-variant">Semester 1 • Clinical Rotations Track</p>
              </div>
              <div className="flex gap-2 rounded-xl bg-surface-container-low p-1">
                <button className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm">All Resources</button>
                <button className="rounded-lg px-4 py-2 text-xs font-medium text-on-surface-variant hover:text-primary">E-Books</button>
                <button className="rounded-lg px-4 py-2 text-xs font-medium text-on-surface-variant hover:text-primary">Past Papers</button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {resourceCards.map((r) => (
                <div key={r.title} className="group rounded-3xl bg-surface-container-lowest p-4 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-surface-container-low">
                    <img alt={r.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={r.image} />
                    <div className="absolute right-3 top-3">
                      <span className="rounded-full bg-primary/90 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">{r.type}</span>
                    </div>
                  </div>
                  <h4 className="line-clamp-1 text-sm font-bold text-on-surface">{r.title}</h4>
                  <p className="mb-4 text-[10px] text-on-surface-variant">{r.sub}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg bg-primary py-2 text-[10px] font-bold text-white hover:opacity-90" type="button">Read</button>
                    <button className="rounded-lg bg-surface-container-low p-2 text-primary" type="button"><MaterialIcon icon="download" className="text-sm" /></button>
                  </div>
                </div>
              ))}
              <div className="flex flex-col rounded-3xl bg-surface-container-lowest p-6 shadow-sm transition-all hover:bg-surface-container-low">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-fixed">
                  <MaterialIcon icon="school" className="text-on-secondary-fixed" />
                </div>
                <h4 className="mb-2 text-base font-bold text-on-surface">Lecture Notes: Surgical Care</h4>
                <p className="mb-6 text-xs leading-relaxed text-on-surface-variant">Comprehensive module covering pre and post-operative nursing care protocols for Year 3.</p>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
                    <MaterialIcon icon="calendar_today" className="text-xs" /> Added 2 hours ago
                  </div>
                  <button className="w-full rounded-lg bg-surface-container-low py-2 text-[10px] font-bold text-primary hover:bg-surface-container-high" type="button">Access Materials</button>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 rounded-3xl bg-surface-container-low p-8 lg:col-span-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold tracking-tight text-primary">Alerts</h3>
                <span className="rounded-full bg-error px-2 py-0.5 text-[10px] font-bold text-white">3 New</span>
              </div>
              <div className="space-y-4">
                {alerts.map((a) => (
                  <div key={a.title} className={`flex gap-4 rounded-2xl bg-surface-container-lowest p-4 shadow-sm ${a.muted ? "opacity-60" : ""}`}>
                    <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.color}`} />
                    <div>
                      <p className="text-xs font-bold text-on-surface">{a.title}</p>
                      <p className="mt-1 text-[10px] leading-normal text-on-surface-variant">{a.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-8">
              <div className="flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-8 shadow-sm">
                <div>
                  <span className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">Reading Goal</span>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tighter text-primary">12</span>
                    <span className="text-sm text-on-surface-variant">/ 20 books</span>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-low">
                    <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-primary to-primary-container" />
                  </div>
                  <p className="mt-2 text-[10px] text-on-surface-variant">60% of your Semester 1 goal completed</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all hover:bg-surface-container-lowest">
                <span className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">Favorite Subject</span>
                <p className="mt-4 text-xl font-bold text-primary">Clinical Medicine</p>
                <p className="mt-1 text-xs text-on-surface-variant">Based on 8 downloads</p>
                <div className="mt-6 flex items-end gap-1">
                  {[8, 12, 24, 16, 10].map((h, i) => (
                    <div key={`${h}-${i}`} className={`w-full rounded-t-md ${i === 2 ? "bg-primary" : "bg-surface-container-low"}`} style={{ height: `${h * 4}px` }} />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-3xl bg-surface-container-highest p-8 sm:col-span-2">
                <div className="flex items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <MaterialIcon icon="auto_stories" className="text-3xl text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Resume Reading</h4>
                    <p className="text-sm text-on-surface-variant">Pharmacology Principles • Chapter 4: Dosage Forms</p>
                  </div>
                </div>
                <button className="rounded-full bg-primary p-4 text-white shadow-lg transition-transform hover:scale-110 active:scale-95" type="button">
                  <MaterialIcon icon="play_arrow" />
                </button>
              </div>
            </div>
          </section>
      </div>
    </DashboardShell>
  );
}