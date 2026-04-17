export type LibrarianNavItem = Readonly<{
  label: string;
  icon: string;
  href: string;
}>;

export type LibrarianCatalogRow = Readonly<{
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
}>;

export type LibrarianQuickAction = Readonly<{
  label: string;
  icon: string;
  variant: "primary" | "danger";
}>;

export type LibrarianOverdueAlert = Readonly<{
  name: string;
  overdue: string;
  img: string;
}>;

export type LibrarianStudentQuery = Readonly<{
  id: string;
  when: string;
  title: string;
  from: string;
}>;

const navItems: readonly LibrarianNavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/librarian" },
  { label: "Catalog", icon: "menu_book", href: "/search" },
  { label: "Circulation", icon: "swap_horiz", href: "/librarian" },
  { label: "Members", icon: "group", href: "/librarian" },
  { label: "Resources", icon: "inventory_2", href: "/search" },
  { label: "Reports", icon: "analytics", href: "/librarian" },
];

const footerNavItems: readonly LibrarianNavItem[] = [
  { label: "Support", icon: "contact_support", href: "/librarian" },
  { label: "Sign Out", icon: "logout", href: "/logout" },
];

const catalogRows: readonly LibrarianCatalogRow[] = [
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

const quickActions: readonly LibrarianQuickAction[] = [
  { label: "Issue Book", icon: "outbound", variant: "primary" },
  { label: "Return", icon: "keyboard_return", variant: "primary" },
  { label: "Renew", icon: "refresh", variant: "primary" },
  { label: "Fine", icon: "payments", variant: "danger" },
];

const overdueAlerts: readonly LibrarianOverdueAlert[] = [
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
];

const studentQueries: readonly LibrarianStudentQuery[] = [
  { id: "#8492", when: "10m ago", title: "Access to digital archives... ", from: "Julianna M." },
  { id: "#8490", when: "2h ago", title: "E-book login issue on mobile", from: "Robert K." },
];

export function selectLibrarianDashboardData() {
  return {
    navItems,
    footerNavItems,
    catalogRows,
    quickActions,
    overdueAlerts,
    studentQueries,
    topbar: {
      searchPlaceholder: "Search by title, author, or ISBN...",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBXDBSqPFA-UHk9w_E77eN7Che3uUlYh2_KACoBFWZoye2095vTjhJtCN0iFZcjPkFsJK9ImK6GemE-G7rLnVZCeqM87PVgBKVCSgc7kND9jDsS6Q3fE3aYrFFSRmNsXPFQLmynvuX1pKfD-76yFJay0FWJUh_tjY3ryZDKDvrv0wZzM5Dx-ymJ34euEQ9oE3-guEpxvV5cY5tMMvpOidvEplMIz2fjQ344xINQun3tdlCRVOfcmWeb6zlP45O-1URyIoW_mFSo0ck",
    },
  };
}
