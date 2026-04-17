import Link from "next/link";
import { DashboardShell } from "@/components/app-shell/DashboardShell";
import { MobileBottomNav } from "@/components/app-shell/MobileBottomNav";
import { SidebarNavLink } from "@/components/app-shell/SidebarNavLink";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { selectLecturerDashboardData } from "@/lib/mock/lecturerDashboard";

export const dynamic = "force-dynamic";

export default function Page() {
  const { navItems, bottomItems, engagement, mappings, suggestions, mobileNavItems, topbar, hero } = selectLecturerDashboardData();

  return (
    <div className="bg-background text-on-surface antialiased">
      <DashboardShell
        contentClassName="relative mx-auto max-w-[1400px] space-y-10 px-4 pb-24 pt-20 sm:px-6 md:px-8 md:pb-12 md:pt-24 lg:px-10"
        sidebarHeader={
          <div className="mb-10 px-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-container text-white shadow-lg">
                <MaterialIcon icon="auto_stories" filled />
              </div>
              <div>
                <h1 className="text-xs font-black uppercase leading-none tracking-widest text-primary">The Scholarly Curator</h1>
                <p className="text-[10px] font-medium uppercase tracking-tighter text-on-surface-variant">NMTC Management</p>
              </div>
            </div>
          </div>
        }
        sidebarNav={
          <>
            {navItems.map((item) => (
              <SidebarNavLink
                key={item.label}
                label={item.label}
                icon={item.icon}
                href={item.href ?? "/lecturer"}
              />
            ))}
          </>
        }
        sidebarFooter={
          <div className="space-y-1 pt-6">
            {bottomItems.map((item) => (
              <SidebarNavLink
                key={item.label}
                label={item.label}
                icon={item.icon}
                href={item.href ?? "/lecturer"}
                danger={item.danger}
              />
            ))}
          </div>
        }
        topbar={
          <>
            <div className="flex w-96 items-center rounded-full bg-surface-container-low px-4 py-1.5">
              <MaterialIcon icon="search" className="mr-2 text-sm text-on-surface-variant/75" />
              <input
                className="w-full border-none bg-transparent text-sm placeholder:text-on-surface-variant focus:ring-0"
                placeholder={topbar.searchPlaceholder}
                type="text"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-on-surface-variant">
                {["notifications", "settings", "help"].map((icon) => (
                  <button key={icon} className="transition-colors hover:text-primary" type="button">
                    <MaterialIcon icon={icon} />
                  </button>
                ))}
              </div>
              <button className="rounded-lg bg-gradient-to-br from-primary to-primary-container px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform active:scale-95" type="button">
                Quick Action
              </button>
              <div className="flex items-center gap-3 pl-6">
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{topbar.profileName}</p>
                  <p className="text-[10px] font-medium text-on-surface-variant">{topbar.profileRole}</p>
                </div>
                <img
                  alt="Lecturer profile avatar"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-surface-container-highest"
                  src={topbar.avatarUrl}
                />
              </div>
            </div>
          </>
        }
        floatingAction={
          <button className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container text-white shadow-[0_20px_48px_-24px_rgba(0,32,69,0.45)] transition-transform hover:scale-105 active:scale-95 md:bottom-8 md:right-8 md:h-16 md:w-16" type="button">
            <MaterialIcon icon="add" className="text-3xl" />
          </button>
        }
      >
        <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="relative flex h-56 flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary to-primary-container p-8 text-white shadow-xl md:col-span-2">
              <div className="relative z-10">
                <h2 className="text-lg font-medium opacity-80">{hero.title}</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight">{hero.subtitle}</p>
              </div>
              <div className="relative z-10 flex items-center gap-4">
                <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md">{hero.delta}</span>
              </div>
              <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="flex h-56 flex-col justify-between rounded-[1.5rem] bg-surface-container-lowest p-6">
              <div className="flex items-start justify-between">
                <span className="rounded-xl bg-secondary-container p-3 text-on-secondary-container"><MaterialIcon icon="description" /></span>
                <span className="rounded-full bg-primary-container px-2 py-1 text-xs font-bold uppercase text-primary-fixed-dim">Live</span>
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface-variant">Active Resources</p>
                <p className="text-4xl font-bold tracking-tighter text-primary">42</p>
              </div>
            </div>
            <div className="flex h-56 flex-col justify-between rounded-[1.5rem] bg-surface-container-lowest p-6">
              <span className="w-fit rounded-xl bg-tertiary-fixed p-3 text-on-tertiary-fixed"><MaterialIcon icon="download" /></span>
              <div>
                <p className="text-sm font-medium text-on-surface-variant">Total Downloads</p>
                <p className="text-4xl font-bold tracking-tighter text-primary">1,128</p>
              </div>
            </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="mb-2 px-2">
                <h3 className="text-2xl font-bold tracking-tight text-primary">Upload Center</h3>
                <p className="text-sm text-on-surface-variant">Distribute new materials to your courses.</p>
              </div>
              <div className="rounded-[1.5rem] bg-surface-container-low p-1">
                <div className="group cursor-pointer rounded-[1.25rem] bg-surface-container-lowest p-12 text-center transition-all hover:bg-surface-container-low">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container text-white shadow-lg transition-transform group-hover:scale-110">
                    <MaterialIcon icon="cloud_upload" className="text-3xl" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-primary">Drag and drop course materials</h4>
                  <p className="mx-auto max-w-sm text-sm text-on-surface-variant">Upload Past Questions, Lecture Notes, or Reference Material (PDF, DOCX, PPTX up to 50MB)</p>
                  <div className="mt-8 flex justify-center gap-4">
                    <button className="rounded-lg bg-secondary-container px-6 py-2.5 text-sm font-bold text-on-secondary-container shadow-sm transition-opacity hover:opacity-90" type="button">Select Files</button>
                    <button className="rounded-lg px-6 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-surface-container" type="button">Browse Cloud</button>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-surface-container-lowest p-8">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-primary">Engagement Metrics</h3>
                  <Link className="flex items-center gap-1 text-sm font-bold text-primary hover:underline" href="/lecturer">
                    Full Report <MaterialIcon icon="arrow_forward" className="text-sm" />
                  </Link>
                </div>
                <div className="space-y-6">
                  {engagement.map((item) => (
                    <div key={item.title} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex justify-between">
                          <span className="text-sm font-bold text-primary">{item.title}</span>
                          <span className="text-sm font-bold text-primary">{item.views}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-surface-container">
                          <div className="h-full rounded-full bg-gradient-to-br from-primary to-primary-container" style={{ width: item.width }} />
                        </div>
                      </div>
                      <MaterialIcon icon={item.trend} className="text-on-surface-variant" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-10">
              <div className="rounded-[1.5rem] bg-surface-container-low p-6">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-primary">
                  <MaterialIcon icon="map" className="text-primary" />
                  Course Mapping
                </h3>
                <div className="space-y-3">
                  {mappings.map((item) => (
                    <div key={item.title} className={`rounded-xl bg-surface-container-lowest p-4 shadow-sm ${item.border}`}>
                      <p className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">{item.meta}</p>
                      <h4 className="mt-1 font-bold text-primary">{item.title}</h4>
                      <div className="mt-3 flex gap-2">
                        <span className="rounded bg-surface-container px-2 py-0.5 text-[10px] font-medium text-on-surface-variant">{item.resources}</span>
                        <span className="rounded bg-surface-container px-2 py-0.5 text-[10px] font-medium text-on-surface-variant">{item.students}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full rounded-xl bg-primary-fixed py-3 text-sm font-bold text-primary transition-colors hover:bg-primary-container/40" type="button">
                  Add New Mapping
                </button>
              </div>
              <div>
                <h3 className="mb-6 text-lg font-bold text-primary">Suggested for Students</h3>
                <div className="space-y-4">
                  {suggestions.map((book) => (
                    <div key={book.title} className="group flex cursor-pointer items-center gap-4">
                      <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-md shadow-md">
                        <img alt={book.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" src={book.image} />
                      </div>
                      <div>
                        <h4 className="line-clamp-2 text-sm font-bold text-primary">{book.title}</h4>
                        <p className="mt-1 text-xs text-on-surface-variant">{book.author}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase text-primary">{book.tag}</span>
                          <span className="h-1 w-1 rounded-full bg-outline-variant/80" />
                          <span className="text-[10px] text-on-surface-variant">{book.edition}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full rounded-xl bg-gradient-to-br from-primary to-primary-container py-3 text-sm font-bold text-white shadow-lg transition-transform active:scale-95" type="button">
                  Suggest a Book
                </button>
              </div>
            </aside>
          </div>
        </section>
      </DashboardShell>

      <MobileBottomNav items={mobileNavItems} />
    </div>
  );
}