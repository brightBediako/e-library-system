export type SearchNavItem = Readonly<{ label: string; icon: string; href: string }>;
export type SearchTopTab = Readonly<{ label: string; href: string }>;
export type SearchCategory = Readonly<{ label: string; checked: boolean }>;
export type SearchAuthor = Readonly<{ initials: string; name: string; count: string }>;
export type SearchSecondaryResult = Readonly<{
  tag: string;
  title: string;
  meta: string;
  img: string;
  tagClass: string;
}>;

const navItems: readonly SearchNavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/librarian" },
  { label: "Catalog", icon: "menu_book", href: "/search" },
  { label: "Circulation", icon: "swap_horiz", href: "/librarian" },
  { label: "Members", icon: "group", href: "/librarian" },
  { label: "Resources", icon: "inventory_2", href: "/search" },
  { label: "Reports", icon: "analytics", href: "/librarian" },
];

const topTabs: readonly SearchTopTab[] = [
  { label: "Catalog", href: "/search" },
  { label: "Circulation", href: "/librarian" },
  { label: "Resources", href: "/search" },
];

const categories: readonly SearchCategory[] = [
  { label: "Academic Books", checked: true },
  { label: "Research Journals", checked: false },
  { label: "Digital Archives", checked: true },
];

const trendingAuthors: readonly SearchAuthor[] = [
  { initials: "DR", name: "Dr. Eleanor Rigby", count: "12 Documents Found" },
  { initials: "ST", name: "Prof. Samuel Tarrow", count: "8 Documents Found" },
];

const secondaryResults: readonly SearchSecondaryResult[] = [
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
];

export function selectSearchDashboardData() {
  return {
    navItems,
    topTabs,
    categories,
    trendingAuthors,
    secondaryResults,
    topbar: {
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuALTWjQ5FdASITBHC07vg6t_C-6y3d3RJi9-b-uLQmlMEJaoVzQcoPgvRKwgNQbfgwslMBm46m0puLS3j9M9HP1OaObp7xVVVKwzz7ZU90Dr05xepQ-1t2QwpGGqgNclIOYKxH76pwKhFDsF42hSMHBqClGao8ZXfiE_sI3EIBsmTkHp60_X1zVnyRd1JXn2IgDfvoOYPObcXgeWHptcivZAYLbl5NXnFAzyRULRg23wuZJlG8ZgKUuRaWnYOH5N9TlOPQHRy0rz0Q",
    },
  };
}
