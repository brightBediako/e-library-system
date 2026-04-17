export type AdminNavItem = Readonly<{
  label: string;
  icon: string;
  href: string;
}>;

export type AdminUserStat = Readonly<{
  label: string;
  value: string;
  delta?: string;
  urgent?: boolean;
}>;

export type AdminRule = Readonly<{ label: string; value: string }>;

export type AdminOversightItem = Readonly<{
  name: string;
  size: string;
  type: string;
  typeClassName: string;
  contributor: string;
  date: string;
  icon: string;
  iconBoxClassName: string;
  stripe: string;
}>;

const navItems: readonly AdminNavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/admin" },
  { label: "User Management", icon: "group", href: "/admin" },
  { label: "Library Config", icon: "settings", href: "/admin" },
  { label: "Content Oversight", icon: "inventory_2", href: "/admin" },
  { label: "Reports", icon: "analytics", href: "/admin" },
];

const footerNavItems: readonly AdminNavItem[] = [
  { label: "Support", icon: "contact_support", href: "/admin" },
  { label: "Sign Out", icon: "logout", href: "/logout" },
];

const userStats: readonly AdminUserStat[] = [
  { label: "Librarians", value: "8", delta: "+1 this month" },
  { label: "Staff", value: "24" },
  { label: "Pending Students", value: "112", urgent: true },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const visitHeights = [40, 65, 85, 100, 70, 55, 60] as const;

const borrowingRules: readonly AdminRule[] = [
  { label: "Max Loan Period", value: "14 days" },
  { label: "Renewal Limit", value: "2 times" },
];

const fineRates: readonly AdminRule[] = [
  { label: "Daily Overdue Rate", value: "GHS 1.00/day" },
  { label: "Lost Item Fee", value: "Cost + 20%" },
];

const departments = ["Nursing", "Midwifery", "Public Health", "Obstetrics", "Pediatrics", "Anatomy"] as const;

const oversightItems: readonly AdminOversightItem[] = [
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
];

export function selectAdminDashboardData() {
  return {
    navItems,
    footerNavItems,
    userStats,
    weekDays,
    visitHeights,
    borrowingRules,
    fineRates,
    departments,
    oversightItems,
    header: {
      title: "Admin Dashboard",
      subtitle: "Institutional oversight for NMTC Library Services.",
    },
    topbar: {
      searchPlaceholder: "Search resources, students, or records...",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBye4wz8_4g1LiF1cgHC_ogA3CcYhxZ18uuRpD3Yh-HhPzlh473bsN0Y7PG0m6WFBGoAwZLIlzZB353_l-BD_m0M1QQ6tKhtYzElpAER_NVh-PcOWpoFwU--_y62VX1aEU3S5ATE9BWRQZDpuWM-BefEoifh0VhjkPXbt64etklH8lNzggf2UkLnflJ9645Mol0AkZ7vNsBKvGQApDgWzRjheOMGsXYmXh4r6PyHvoJHYKUtv_1SSub9WF6fx3OOHMOufPSwT2_u-I",
    },
  };
}
