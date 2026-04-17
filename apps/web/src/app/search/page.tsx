import { DashboardShell } from "@/components/app-shell/DashboardShell";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

type NavItem = { label: string; icon: string; active?: boolean };

const navItems: NavItem[] = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Catalog", icon: "menu_book", active: true },
  { label: "Circulation", icon: "swap_horiz" },
  { label: "Members", icon: "group" },
  { label: "Resources", icon: "inventory_2" },
  { label: "Reports", icon: "analytics" },
];

const categories = [
  { label: "Academic Books", checked: true },
  { label: "Research Journals", checked: false },
  { label: "Digital Archives", checked: true },
] as const;

const trendingAuthors = [
  { initials: "DR", name: "Dr. Eleanor Rigby", count: "12 Documents Found" },
  { initials: "ST", name: "Prof. Samuel Tarrow", count: "8 Documents Found" },
] as const;

const secondaryResults = [
  {
    tag: "Archival Theory",
    title: "The Architecture of Information",
    meta: "L. Hamilton • 2021",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxMdwHpxy_n7euzhUYnnYYBpe_tlM9zFylOTPmnLOy_nAH6EBfiTDXwkfQxWFanyFC0KrhB7ExpheRRfzSqNz8DdeXjs7w0pG167lkCTQQ9iZmwvrByXUTZlUeXYH9A-j4bI9UCPP3NgsspjiWvlSKQcHKLJ0pR9rEyxg8BjB68BT9WSLFhbifIgkD-ESg5gDVNVg_tQoegej0aevmP386jK-oEorSAbgHPbG3LDMZrkC69M1bvQQdNeSQaijqBnkSuNW210FjoR4",
    tagClass: "bg-tertiary-container text-tertiary-fixed-dim",
  },
  {
    tag: "Reference",
    title: "Global Metadata Standards 2024",
    meta: "International Board • 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAykK4ajI0ifA0DHsbJAm8g4D4lB9Yx6uIuC0U9DFfKkRQSpEzntyvIFIkVtEanfGpQKZ5zl7TV17vd4fDibq4u5le1b_ZVrZQiqBoe7-PzRRoqMaSLtPCCTEKWa8wh0aDhgSo4P7ghk1hdh0vaaLuTPADwVTnQm1T7BqoPeIk_GUi9v2yaKKzr-RrJteGYR2TmYQQU_rzJau5WEzpRcnNvlGiYgIurqENij1EK7VkXMpSG4NhB4B8RKfol8FS0fjxdyxFxjP7dqnU",
    tagClass: "bg-secondary-fixed text-on-secondary-fixed-variant",
  },
] as const;

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <DashboardShell
      rootClassName="text-on-background antialiased"
      mainClassName="min-h-screen"
      contentClassName="mx-auto grid max-w-[1600px] grid-cols-12 gap-8 p-8"
      sidebarHeader={
        <div className="mb-10 px-2 pt-16">
          <h2 className="mb-1 text-xs font-black uppercase tracking-widest text-blue-900">The Scholarly Curator</h2>
          <p className="text-[10px] text-slate-500">NMTC Management</p>
        </div>
      }
      sidebarNav={
        <>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center rounded-lg px-4 py-2.5 text-sm transition-transform duration-200 hover:translate-x-1 ${
                item.active
                  ? "bg-white text-blue-900 shadow-sm font-bold"
                  : "font-medium text-slate-600 hover:bg-slate-100"
              }`}
              type="button"
            >
              <MaterialIcon icon={item.icon} className="mr-3" /> {item.label}
            </button>
          ))}
        </>
      }
      sidebarFooter={
        <div className="space-y-1 border-t border-slate-200 pt-6">
          <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-primary to-primary-container py-2.5 text-sm font-medium text-white shadow-md" type="button">
            <MaterialIcon icon="add" className="text-sm" /> New Entry
          </button>
          <button className="flex items-center px-4 py-2 text-sm text-slate-500 transition-transform hover:translate-x-1" type="button">
            <MaterialIcon icon="contact_support" className="mr-3 text-sm" /> Support
          </button>
          <button className="flex items-center px-4 py-2 text-sm text-slate-500 transition-transform hover:translate-x-1" type="button">
            <MaterialIcon icon="logout" className="mr-3 text-sm" /> Sign Out
          </button>
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
            <div className="mr-6 hidden space-x-6 lg:flex">
              <button className="border-b-2 border-blue-900 font-semibold text-blue-900" type="button">Catalog</button>
              <button className="text-slate-500 hover:text-blue-700" type="button">Circulation</button>
              <button className="text-slate-500 hover:text-blue-700" type="button">Resources</button>
            </div>
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
              <div className="ml-2 h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-slate-200">
                <img
                  alt="User profile avatar"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALTWjQ5FdASITBHC07vg6t_C-6y3d3RJi9-b-uLQmlMEJaoVzQcoPgvRKwgNQbfgwslMBm46m0puLS3j9M9HP1OaObp7xVVVKwzz7ZU90Dr05xepQ-1t2QwpGGqgNclIOYKxH76pwKhFDsF42hSMHBqClGao8ZXfiE_sI3EIBsmTkHp60_X1zVnyRd1JXn2IgDfvoOYPObcXgeWHptcivZAYLbl5NXnFAzyRULRg23wuZJlG8ZgKUuRaWnYOH5N9TlOPQHRy0rz0Q"
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
                      <input
                        checked={c.checked}
                        className="rounded border-slate-200 text-primary focus:ring-primary"
                        readOnly
                        type="checkbox"
                      />
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
                  <div className="absolute left-1/4 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-primary bg-white" />
                  <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-primary bg-white" />
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
                <p className="mt-1 text-on-surface-variant">Showing 142 items for "Digital Archival Theory"</p>
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
              <div className="flex flex-1 flex-col border-r border-slate-100 bg-surface-container-low">
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
                    <div className="border-b-2 border-slate-100 pb-8">
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
                      <div className="rounded-lg border-l-4 border-primary bg-slate-50 p-6 italic text-slate-600">
                        "Knowledge is not static; it is a flowing river that requires constant dredging and mapping to remain navigable."
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
                <div className="mt-auto border-t border-slate-100 pt-6">
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