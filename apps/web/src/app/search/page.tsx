import { DashboardShell } from "@/components/app-shell/DashboardShell";
import { SidebarNavLink } from "@/components/app-shell/SidebarNavLink";
import { TopBarNavTabs } from "@/components/app-shell/TopBarNavTabs";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { selectSearchDashboardData } from "@/lib/mock/searchDashboard";

export const dynamic = "force-dynamic";

export default function Page() {
  const { navItems, topTabs, categories, trendingAuthors, secondaryResults, topbar } = selectSearchDashboardData();

  return (
    <DashboardShell
      rootClassName="text-on-background antialiased"
      mainClassName="min-h-screen"
      contentClassName="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-8 pb-12 pt-24"
      sidebarHeader={
        <div className="mb-10 px-2 pt-16">
          <h2 className="mb-1 text-xs font-black uppercase tracking-widest text-blue-900">The Scholarly Curator</h2>
          <p className="text-[10px] text-slate-500">NMTC Management</p>
        </div>
      }
      sidebarNav={
        <>
          {navItems.map((item) => (
            <SidebarNavLink
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href ?? "/search"}
              className="py-2.5"
            />
          ))}
        </>
      }
      sidebarFooter={
        <div className="space-y-1 pt-6">
          <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-primary to-primary-container py-2.5 text-sm font-medium text-white shadow-md" type="button">
            <MaterialIcon icon="add" className="text-sm" /> New Entry
          </button>
          <SidebarNavLink label="Support" icon="contact_support" href="/search" className="py-2 text-sm" />
          <SidebarNavLink label="Sign Out" icon="logout" href="/logout" danger className="py-2 text-sm" />
        </div>
      }
      topbar={
        <>
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tighter text-blue-900">NMTC Library</span>
            <div className="group hidden w-96 items-center rounded-lg bg-slate-100 px-3 py-1.5 focus-within:ring-2 ring-primary/20 md:flex">
              <MaterialIcon icon="search" className="mr-2 text-slate-400" />
              <input
                className="w-full border-none bg-transparent text-sm text-on-surface-variant focus:ring-0"
                defaultValue="Digital Archival Theory"
                placeholder="Search across catalog..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <TopBarNavTabs tabs={topTabs} className="mr-6 hidden space-x-6 lg:flex" />
            <div className="flex items-center space-x-2">
              <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50" type="button">
                <MaterialIcon icon="notifications" />
              </button>
              <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50" type="button">
                <MaterialIcon icon="settings" />
              </button>
              <button className="ml-2 rounded-lg bg-primary-container px-4 py-1.5 text-sm font-medium text-on-primary-container" type="button">
                Quick Action
              </button>
              <div className="ml-2 h-8 w-8 overflow-hidden rounded-full bg-slate-200">
                <img
                  alt="User profile avatar"
                  className="h-full w-full object-cover"
                  src={topbar.avatarUrl}
                />
              </div>
            </div>
          </div>
        </>
      }
      floatingAction={
        <button className="group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container text-white shadow-2xl transition-transform hover:scale-110 active:scale-95" type="button">
          <MaterialIcon icon="add" className="text-3xl" />
          <span className="absolute right-16 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-bold opacity-0 transition-opacity group-hover:opacity-100">
            Request Document
          </span>
        </button>
      }
    >
      <section className="col-span-12 space-y-6 lg:col-span-4 xl:col-span-3">
            <div className="rounded-2xl bg-surface-container-low p-6">
              <h3 className="mb-6 text-lg font-bold text-primary">Search Parameters</h3>
              <div className="mb-8 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Category</p>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <label
                      key={c.label}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors ${
                        c.checked ? "bg-surface-container-lowest" : "hover:bg-surface-container-lowest"
                      }`}
                    >
                      <input checked={c.checked} className="rounded text-primary focus:ring-primary" readOnly type="checkbox" />
                      <span className="text-sm font-medium">{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Publication Year</p>
                  <span className="text-xs font-mono font-bold text-primary">2018 — 2024</span>
                </div>
                <div className="relative h-1.5 w-full rounded-full bg-slate-200">
                  <div className="absolute left-1/4 right-0 h-full rounded-full bg-primary" />
                  <div className="absolute left-1/4 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_2px_rgba(255,255,255,1)]" />
                  <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_2px_rgba(255,255,255,1)]" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Academic Level</p>
                <select className="w-full rounded-lg border-none bg-surface-container-lowest text-sm focus:ring-2 focus:ring-primary/20">
                  <option>All Levels</option>
                  <option>Undergraduate</option>
                  <option>Post-Graduate</option>
                  <option>Professional</option>
                </select>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)]">
              <div className="relative z-10">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary-fixed-dim">Trending Authors</h4>
                <div className="space-y-4">
                  {trendingAuthors.map((a) => (
                    <div key={a.name} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container font-bold text-on-primary-container">
                        {a.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{a.name}</p>
                        <p className="text-[10px] text-primary-fixed-dim">{a.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <MaterialIcon icon="school" className="text-9xl" />
              </div>
            </div>
          </section>

      <section className="col-span-12 space-y-8 lg:col-span-8 xl:col-span-9">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-primary">Search Results</h1>
                <p className="mt-1 text-on-surface-variant">Showing 142 items for &quot;Digital Archival Theory&quot;</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-white p-2 text-slate-400 transition-colors hover:text-primary" type="button">
                  <MaterialIcon icon="grid_view" />
                </button>
                <button className="rounded-lg bg-white p-2 text-primary shadow-sm" type="button">
                  <MaterialIcon icon="list" />
                </button>
              </div>
            </div>

            <div className="flex h-[700px] flex-col overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)] md:flex-row">
              <div className="flex flex-1 flex-col bg-surface-container-low">
                <div className="z-10 flex h-14 items-center justify-between bg-white px-4">
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-2 hover:bg-slate-50" type="button"><MaterialIcon icon="menu" className="text-slate-600" /></button>
                    <div className="mx-2 h-6 w-px bg-slate-200" />
                    <button className="rounded-lg p-2 hover:bg-slate-50" type="button"><MaterialIcon icon="zoom_out" className="text-slate-600" /></button>
                    <span className="px-2 text-sm font-medium text-slate-700">100%</span>
                    <button className="rounded-lg p-2 hover:bg-slate-50" type="button"><MaterialIcon icon="zoom_in" className="text-slate-600" /></button>
                  </div>
                  <div className="flex items-center rounded-lg bg-slate-100 px-3 py-1.5">
                    <button className="text-sm text-slate-600" type="button"><MaterialIcon icon="chevron_left" className="text-sm" /></button>
                    <span className="mx-3 text-xs font-bold text-slate-800">PAGE 12 / 248</span>
                    <button className="text-sm text-slate-600" type="button"><MaterialIcon icon="chevron_right" className="text-sm" /></button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-2 hover:bg-slate-50" type="button"><MaterialIcon icon="bookmark" filled className="text-slate-600" /></button>
                    <button className="rounded-lg p-2 hover:bg-slate-50" type="button"><MaterialIcon icon="print" className="text-slate-600" /></button>
                    <button className="rounded-lg p-2 hover:bg-slate-50" type="button"><MaterialIcon icon="download" className="text-slate-600" /></button>
                  </div>
                </div>
                <div className="flex flex-1 justify-center overflow-y-auto bg-surface-container-highest p-8">
                  <div className="min-h-[1000px] w-full max-w-2xl space-y-8 bg-white p-16 shadow-xl">
                    <div className="rounded-xl bg-surface-container-low p-6">
                      <h2 className="font-serif text-3xl leading-tight text-slate-900">Towards a Unified Digital Preservation Framework</h2>
                      <p className="mt-4 text-sm tracking-wide text-slate-500">THE SCHOLARLY CURATOR | VOLUME 24, ISSUE 2</p>
                    </div>
                    <div className="space-y-6">
                      <p className="leading-relaxed text-slate-700 first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold">
                        Digital curation is the management and preservation of digital data over its entire lifecycle. In the contemporary academic landscape, the sheer volume of data produced requires a more nuanced approach than simple storage. We must consider the meta-data, the provenance, and the long-term accessibility of formats...
                      </p>
                      <p className="leading-relaxed text-slate-700">
                        The evolution of archival theory has transitioned from physical containment to distributed accessibility. This paper explores the theoretical underpinnings of digital governance...
                      </p>
                      <div className="rounded-lg bg-primary-container/30 p-6 italic text-slate-600">
                        &quot;Knowledge is not static; it is a flowing river that requires constant dredging and mapping to remain navigable.&quot;
                      </div>
                      <p className="leading-relaxed text-slate-700">
                        Furthermore, the integration of AI-driven cataloging systems has redefined how researchers interact with deep archives. By leveraging semantic search patterns...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex h-full w-full flex-col overflow-y-auto bg-white p-6 md:w-80">
                <div className="mb-8 flex items-center justify-between">
                  <h4 className="font-bold text-primary">Metadata &amp; Info</h4>
                  <span className="rounded-full bg-primary-fixed px-2 py-1 text-[10px] font-bold text-on-primary-fixed">PEER REVIEWED</span>
                </div>
                <div className="mb-8 space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Publication Title</p>
                    <p className="text-sm font-semibold text-slate-800">The Modern Archive: Volume II</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Authors</p>
                    <p className="text-sm font-semibold text-slate-800">Dr. Eleanor Rigby, M. Phil</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Year</p>
                      <p className="text-sm font-semibold text-slate-800">2023</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pages</p>
                      <p className="text-sm font-semibold text-slate-800">248</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ISBN / DOI</p>
                    <p className="font-mono text-xs text-slate-600">10.1038/s41586-023-00000-x</p>
                  </div>
                </div>
                <div className="mt-auto rounded-xl bg-surface-container-low p-6">
                  <h5 className="mb-4 text-xs font-bold text-primary">Quick Citation (APA)</h5>
                  <div className="group relative mb-4 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                    Rigby, E. (2023). Towards a Unified Digital Preservation Framework. The Modern Archive, 24(2), 112-248.{" "}
                    <button className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100" type="button">
                      <MaterialIcon icon="content_copy" className="text-sm" />
                    </button>
                  </div>
                  <button className="w-full rounded-lg bg-secondary-container py-2.5 text-sm font-bold text-on-secondary-container transition-opacity hover:opacity-90" type="button">
                    Add to My Library
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {secondaryResults.map((r) => (
                <div key={r.title} className="flex gap-6 rounded-2xl bg-surface-container-lowest p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 shadow-sm">
                    <img alt={r.title} className="h-full w-full object-cover" src={r.img} />
                  </div>
                  <div className="flex-1">
                    <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${r.tagClass}`}>
                      {r.tag}
                    </span>
                    <h3 className="font-bold leading-snug text-primary">{r.title}</h3>
                    <p className="mt-1 text-xs text-on-surface-variant">{r.meta}</p>
                    <div className="mt-4 flex items-center gap-4">
                      <button className="flex items-center gap-1 text-xs font-bold text-primary" type="button">
                        <MaterialIcon icon="visibility" className="text-sm" /> VIEW
                      </button>
                      <button className="flex items-center gap-1 text-xs font-bold text-slate-400" type="button">
                        <MaterialIcon icon="bookmark_add" className="text-sm" /> SAVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </section>
    </DashboardShell>
  );
}