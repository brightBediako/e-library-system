import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

type NavItem = {
  label: string;
  icon: string;
  active?: boolean;
  href?: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", active: true },
  { label: "User Management", icon: "group" },
  { label: "Library Config", icon: "settings" },
  { label: "Content Oversight", icon: "inventory_2" },
  { label: "Reports", icon: "analytics" },
];

const footerNavItems: NavItem[] = [
  { label: "Support", icon: "contact_support" },
  { label: "Sign Out", icon: "logout", href: "/" },
];

type UserStat = {
  label: string;
  value: string;
  delta?: string;
  urgent?: boolean;
};

const userStats: UserStat[] = [
  { label: "Librarians", value: "8", delta: "+1 this month" },
  { label: "Staff", value: "24" },
  { label: "Pending Students", value: "112", urgent: true },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const visitHeights = [40, 65, 85, 100, 70, 55, 60] as const;

const borrowingRules = [
  { label: "Max Loan Period", value: "14 days" },
  { label: "Renewal Limit", value: "2 times" },
] as const;

const fineRates = [
  { label: "Daily Overdue Rate", value: "GHS 1.00/day" },
  { label: "Lost Item Fee", value: "Cost + 20%" },
] as const;

const departments = [
  "Nursing",
  "Midwifery",
  "Public Health",
  "Obstetrics",
  "Pediatrics",
  "Anatomy",
] as const;

const oversightItems = [
  {
    name: "Advanced Pharmacology PQs 2023",
    size: "12.4 MB",
    type: "Past Questions",
    typeClassName: "bg-primary-fixed text-on-primary-fixed",
    contributor: "Dr. Samuel Appiah",
    date: "Oct 24, 2023",
    icon: "description",
    iconBoxClassName: "bg-tertiary-fixed text-on-tertiary-fixed",
    stripe: "bg-surface-container-lowest",
  },
  {
    name: "Maternal Health Nursing Notes",
    size: "45.1 MB",
    type: "Lecture Notes",
    typeClassName: "bg-tertiary-fixed text-on-tertiary-fixed",
    contributor: "Prof. Elena Mensah",
    date: "Oct 23, 2023",
    icon: "menu_book",
    iconBoxClassName: "bg-secondary-container text-on-secondary-container",
    stripe: "bg-surface-container-low/30",
  },
  {
    name: "Surgical Procedures Seminar Video",
    size: "1.2 GB",
    type: "Video Resource",
    typeClassName: "bg-surface-container-highest text-on-surface",
    contributor: "ICT Department",
    date: "Oct 22, 2023",
    icon: "videocam",
    iconBoxClassName: "bg-error-container text-on-error-container",
    stripe: "bg-surface-container-lowest",
  },
] as const;

function SidebarLink({
  label,
  icon,
  active = false,
  href = "#",
}: {
  label: string;
  icon: string;
  active?: boolean;
  href?: string;
}) {
  const base =
    "flex items-center rounded-lg px-4 py-3 transition-transform duration-200 hover:translate-x-1";
  const classes = active
    ? "bg-white text-blue-900 shadow-sm font-bold dark:bg-blue-900/20 dark:text-blue-300"
    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900";

  return (
    <Link href={href} className={`${base} ${classes}`}>
      <MaterialIcon icon={icon} className="mr-3" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col space-y-2 border-r-0 bg-slate-50 px-4 py-6 dark:bg-slate-950">
        <div className="mb-8 px-4">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container text-white">
            <MaterialIcon icon="account_balance" filled />
          </div>
          <h1 className="text-sm font-black uppercase tracking-widest text-blue-900 dark:text-blue-100">
            The Scholarly Curator
          </h1>
          <p className="text-[10px] font-medium text-slate-500">NMTC Management</p>
        </div>

        <nav className="flex flex-1 flex-col space-y-1">
          {navItems.map((item) => (
            <SidebarLink key={item.label} {...item} />
          ))}
        </nav>

        <div className="mt-auto space-y-1 border-t border-slate-200 pt-6 dark:border-slate-800">
          {footerNavItems.map((item) => (
            <SidebarLink key={item.label} {...item} />
          ))}
        </div>
      </aside>

      <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between bg-white/80 px-8 shadow-sm backdrop-blur-xl dark:bg-slate-900/80">
        <div className="flex flex-1 items-center">
          <div className="relative w-full max-w-md">
            <MaterialIcon
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
            />
            <input
              className="w-full rounded-xl border-none bg-surface-container-highest py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
              placeholder="Search resources, students, or records..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="rounded-lg bg-gradient-to-br from-primary to-primary-container px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform active:scale-95">
            Quick Action
          </button>
          <div className="flex items-center space-x-2 text-slate-500">
            <MaterialIcon icon="notifications" className="cursor-pointer rounded-full p-2 hover:bg-slate-50" />
            <MaterialIcon icon="settings" className="cursor-pointer rounded-full p-2 hover:bg-slate-50" />
            <MaterialIcon icon="help" className="cursor-pointer rounded-full p-2 hover:bg-slate-50" />
          </div>
          <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-primary-fixed">
            <img
              alt="User profile avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBye4wz8_4g1LiF1cgHC_ogA3CcYhxZ18uuRpD3Yh-HhPzlh473bsN0Y7PG0m6WFBGoAwZLIlzZB353_l-BD_m0M1QQ6tKhtYzElpAER_NVh-PcOWpoFwU--_y62VX1aEU3S5ATE9BWRQZDpuWM-BefEoifh0VhjkPXbt64etklH8lNzggf2UkLnflJ9645Mol0AkZ7vNsBKvGQApDgWzRjheOMGsXYmXh4r6PyHvoJHYKUtv_1SSub9WF6fx3OOHMOufPSwT2_u-I"
            />
          </div>
        </div>
      </header>

      <main className="ml-64 px-8 pb-12 pt-24">
        <header className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary">Admin Dashboard</h2>
          <p className="mt-1 text-on-surface-variant">
            Institutional oversight for NMTC Library Services.
          </p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <section className="col-span-12 rounded-3xl bg-surface-container-low p-8 lg:col-span-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary">User Management</h3>
                <p className="text-sm text-on-surface-variant">
                  Active personnel and pending verification
                </p>
              </div>
              <button className="text-sm font-bold text-primary hover:underline">View All Users</button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {userStats.map((stat) =>
                stat.urgent ? (
                  <div
                    key={stat.label}
                    className="flex flex-col justify-between rounded-[1.5rem] bg-gradient-to-br from-primary to-primary-container p-6 text-white shadow-lg"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-on-primary-container">
                      {stat.label}
                    </span>
                    <div className="mt-2 flex items-baseline space-x-2">
                      <span className="text-5xl font-black tracking-tighter">{stat.value}</span>
                      <MaterialIcon icon="priority_high" className="text-sm animate-pulse" filled />
                    </div>
                  </div>
                ) : (
                  <div
                    key={stat.label}
                    className="flex flex-col justify-between rounded-[1.5rem] bg-surface-container-lowest p-6 shadow-sm"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
                      {stat.label}
                    </span>
                    <div className="mt-2 flex items-baseline space-x-2">
                      <span className="text-5xl font-black tracking-tighter text-primary">
                        {stat.value}
                      </span>
                      {stat.delta ? (
                        <span className="text-xs font-bold text-green-600">{stat.delta}</span>
                      ) : null}
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          <aside className="col-span-12 rounded-3xl bg-surface-container-lowest p-8 shadow-sm lg:col-span-4">
            <h3 className="mb-6 text-xl font-bold text-primary">Library Visits</h3>
            <div className="mb-4 flex h-48 items-end justify-between space-x-2">
              {visitHeights.map((height, idx) => (
                <div
                  key={idx}
                  className={`w-full rounded-t-lg transition-all ${
                    height === 100 ? "bg-gradient-to-br from-primary to-primary-container" : "bg-surface-container-high hover:bg-primary-fixed"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between px-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              {weekDays.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="mt-8 rounded-xl bg-surface-container-low p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Weekly Total</span>
                <span className="text-lg font-bold text-primary">1,284</span>
              </div>
              <p className="mt-1 text-[10px] font-bold text-green-600">↑ 12% FROM LAST WEEK</p>
            </div>
          </aside>

          <section className="col-span-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-6 flex items-center space-x-3">
                <MaterialIcon icon="policy" className="text-3xl text-primary" />
                <h3 className="text-lg font-bold text-primary">Borrowing Rules</h3>
              </div>
              <div className="space-y-4">
                {borrowingRules.map((r) => (
                  <div key={r.label} className="flex items-center justify-between border-b border-surface-container py-3">
                    <span className="text-sm text-on-surface-variant">{r.label}</span>
                    <span className="text-sm font-bold text-primary">{r.value}</span>
                  </div>
                ))}
                <button className="mt-4 w-full rounded-xl bg-secondary-container py-3 text-sm font-bold text-on-secondary-container transition-opacity hover:opacity-90">
                  Adjust Rules
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-6 flex items-center space-x-3">
                <MaterialIcon icon="payments" className="text-3xl text-primary" />
                <h3 className="text-lg font-bold text-primary">Fine Rates</h3>
              </div>
              <div className="space-y-4">
                {fineRates.map((r) => (
                  <div key={r.label} className="flex items-center justify-between border-b border-surface-container py-3">
                    <span className="text-sm text-on-surface-variant">{r.label}</span>
                    <span className="text-sm font-bold text-primary">{r.value}</span>
                  </div>
                ))}
                <button className="mt-4 w-full rounded-xl bg-surface-container-highest py-3 text-sm font-bold text-on-surface transition-opacity hover:opacity-90">
                  Update Pricing
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-surface-container-low p-8">
              <h3 className="mb-6 text-lg font-bold text-primary">Departments</h3>
              <div className="flex flex-wrap gap-2">
                {departments.map((dep) => (
                  <span
                    key={dep}
                    className="rounded-full bg-surface-container-lowest px-4 py-2 text-xs font-bold text-primary shadow-sm"
                  >
                    {dep}
                  </span>
                ))}
                <button className="rounded-full border-2 border-dashed border-outline-variant px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container-lowest">
                  + Add New
                </button>
              </div>
            </div>
          </section>

          <section className="col-span-12 overflow-hidden rounded-3xl bg-surface-container-lowest shadow-sm">
            <div className="flex items-center justify-between bg-surface-container-high/30 p-8">
              <div>
                <h3 className="text-xl font-bold text-primary">Content Oversight Queue</h3>
                <p className="text-sm text-on-surface-variant">
                  Resources awaiting academic verification
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="rounded-full bg-error-container px-3 py-1 text-xs font-bold uppercase tracking-widest text-error">
                  12 Critical
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-surface-container-high">
                  <tr className="text-left">
                    {["Resource Name", "Type", "Contributor", "Date Added"].map((h) => (
                      <th
                        key={h}
                        className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary"
                      >
                        {h}
                      </th>
                    ))}
                    <th className="px-8 py-4 text-right text-xs font-bold uppercase tracking-widest text-primary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {oversightItems.map((item) => (
                    <tr
                      key={item.name}
                      className={`${item.stripe} transition-colors hover:bg-surface-container-low`}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded ${item.iconBoxClassName}`}>
                            <MaterialIcon icon={item.icon} />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{item.name}</p>
                            <p className="text-[10px] text-on-surface-variant">File size: {item.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${item.typeClassName}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-medium">{item.contributor}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm text-on-surface-variant">{item.date}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="mr-4 text-sm font-bold text-primary hover:underline">Review</button>
                        <button className="text-sm font-bold text-error hover:underline">Flag</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <button className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container text-white shadow-2xl transition-all hover:scale-110 active:scale-95">
        <MaterialIcon icon="add" />
      </button>
    </div>
  );
}