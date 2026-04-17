export type LecturerNavItem = Readonly<{
  label: string;
  icon: string;
  href: string;
  danger?: boolean;
}>;

export type LecturerEngagementItem = Readonly<{
  title: string;
  views: string;
  width: string;
  trend: string;
}>;

export type LecturerMappingItem = Readonly<{
  meta: string;
  title: string;
  resources: string;
  students: string;
  border: string;
}>;

export type LecturerSuggestionItem = Readonly<{
  title: string;
  author: string;
  tag: string;
  edition: string;
  image: string;
}>;

const navItems: readonly LecturerNavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/lecturer" },
  { label: "My Resources", icon: "folder_open", href: "/lecturer" },
  { label: "Course Mapping", icon: "map", href: "/lecturer" },
  { label: "Analytics", icon: "analytics", href: "/lecturer" },
  { label: "Recommendations", icon: "recommend", href: "/lecturer" },
];

const bottomItems: readonly LecturerNavItem[] = [
  { label: "Support", icon: "contact_support", href: "/lecturer" },
  { label: "Sign Out", icon: "logout", danger: true, href: "/logout" },
];

const engagement: readonly LecturerEngagementItem[] = [
  { title: "Anatomy & Physiology Notes - Sem 1", views: "450 views", width: "85%", trend: "trending_up" },
  { title: "Pharmacology Past Questions 2023", views: "312 views", width: "62%", trend: "trending_up" },
  { title: "Midwifery Clinical Guidelines", views: "188 views", width: "40%", trend: "trending_flat" },
];

const mappings: readonly LecturerMappingItem[] = [
  { meta: "Level 100 • Semester 1", title: "General Nursing Foundations", resources: "12 Resources", students: "32 Students", border: "border-primary" },
  { meta: "Level 200 • Semester 2", title: "Surgical Nursing II", resources: "8 Resources", students: "28 Students", border: "border-secondary-container" },
  { meta: "Level 300 • Semester 1", title: "Pediatric Healthcare", resources: "15 Resources", students: "45 Students", border: "border-tertiary-fixed" },
];

const suggestions: readonly LecturerSuggestionItem[] = [
  {
    title: "Principles of Anatomy & Physiology",
    author: "Gerard J. Tortora",
    tag: "Core Text",
    edition: "4th Edition",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFn37UCNlQjsgNB43vgw-vC15m7igeNkCxt-ETQJ567H8s4Kxz8vjZuVHbr-W0UOBHFJYyopQja1E2QfbZPySUPGsBukt1P1SMNeWKMEfeReo15ppoXikiQlD3pjzBOIXBVzyfu8filCJDkcpfbRBuYZI0XjzlrvXkH19SsXuhPDc4UDtTsbecbQAorY3ekfsyP4G3KpBqwZJFwMcouoguBg5ZLNU5PgQBa8OVlNWoN-F39ItyziirNWGlSSwQcUFdX8w77fhsx_A",
  },
  {
    title: "Clinical Nursing Skills and Techniques",
    author: "Anne Griffin Perry",
    tag: "Reference",
    edition: "10th Edition",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkGSd_C88ZPNbWrH6THsrqoh0FUJkOw6aOasvn_KDrtrBYfsBOv_N59FfZ1xbKqUtJlAvbtggtsHCLmuws2Wjgs1WDnLZcYbZZjuC8PVbLTqooI89U0R04gqig4KGbOv7P7LIb_pAnfUMAlgBdELKpIFUfvn-X-yUBRfJOx-btRmSCK_wDRa7ugRHlowjwF7G2mMnt5A6uQd5l4crvitI-R-EuP4C1PluR_hsdwsA2PoTjQP8qME3eu8hvizCNnKp6eO3sAhcrqGg",
  },
];

const mobileNavItems: readonly LecturerNavItem[] = [
  { label: "Home", icon: "dashboard", href: "/lecturer" },
  { label: "Resources", icon: "folder", href: "/search" },
  { label: "Stats", icon: "analytics", href: "/lecturer" },
  { label: "Profile", icon: "person", href: "/lecturer" },
];

export function selectLecturerDashboardData() {
  return {
    navItems,
    bottomItems,
    engagement,
    mappings,
    suggestions,
    mobileNavItems,
    topbar: {
      searchPlaceholder: "Search catalog, notes, or members...",
      profileName: "Dr. Araba Mensah",
      profileRole: "Senior Lecturer",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ8-PDoLcTtELPtY8KaBUrNggqrtcaahe2sETNXCOToMIj4mTwMj74DsJPbTStS-ZGDTRwj2zwP2a9ZRW1YaSHiwsDCqoKhZQFY35aF-0W8JdqMdAx9lbGAh21psGjD4N8GSpOV0QXIQUD2qt6fyM6LSGcAYA4ablVg6EM9osCwtBmOyVepuWMpvUS0N4HhgY2x2aFcX8YmeQrFqms3YniQJCeD34UACwsq6UifWiEjG509fx6wMUUmO3CBX5e0Qh2t6JLTI8nrew",
    },
    hero: {
      title: "Welcome back, Curator.",
      subtitle: "Your resources reached 2,480 students this week.",
      delta: "+12% from last month",
    },
  };
}
