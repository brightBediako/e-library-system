export type StudentNavItem = Readonly<{
  label: string;
  icon: string;
  href: string;
}>;

export type StudentResourceCard = Readonly<{
  title: string;
  sub: string;
  type: string;
  image: string;
}>;

export type StudentAlertItem = Readonly<{
  title: string;
  body: string;
  color: string;
  muted?: boolean;
}>;

export type StudentLoanItem = Readonly<{
  title: string;
  due: string;
  warn?: boolean;
}>;

const navItems: readonly StudentNavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/student" },
  { label: "Digital Library", icon: "menu_book", href: "/search" },
  { label: "My Borrowing", icon: "swap_horiz", href: "/student" },
  { label: "Course Resources", icon: "inventory_2", href: "/student" },
  { label: "Saved Items", icon: "bookmark", href: "/student" },
];

const resourceCards: readonly StudentResourceCard[] = [
  {
    title: "Pathophysiology Foundations",
    sub: "Dr. Robert Chen • 2023",
    type: "E-BOOK",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdCLCKXlWsaM02KD7w8Zi-as3V-CxzGKLvr8J4KbtmCCTSPI12uFlAIaY3wF6apikIZHwoHH6sTaJIv16Z42Kezvbmt9KdFBg3Jy3c2GSrMfCTeIPAPd9-RA7Ja1Y1X74RGxp_BgbbjyFD8NVvsc1H8jO8flvdxdJm_D8Jpz6mQBAbf69q6r3wyinaycRHgPBhHPwJC4ZW8XrMFbsywj3HWKhEQ2EluWt7UtAZvpFyAFvam891ZxillCXTpf2ktvTt64mXfma6Og0",
  },
  {
    title: "Advanced Anatomy Atlas",
    sub: "University Press • Vol 12",
    type: "PDF",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq6N2OyxPuNoWGtZhKCqtoTLIMUXxJk7hZVONQOcWIMXFO3thkLwShc2-xBQNidiyImhYAmw4nK33syPlgOUbrtOv5rZ2mja_F5JcUPVFmWgZegPimEZ1Yqt8Im_orGgIZCJaIsDTrhaoC0TqCU1tF9cJW2hKw8e9INCUHFmrfwa5VK8gtnLyUrmsVbBdXSgUrAOHVrF-2gN2u7yZFipGcTHDoTzzy7ikJYbtHtdx_PvX_wrkoMt1oNiTV_XydMKRYGfRSVcuAmRY",
  },
];

const alerts: readonly StudentAlertItem[] = [
  {
    title: "Book Overdue",
    body: '"Modern Pediatrics" was due yesterday. Please return or renew to avoid daily fines.',
    color: "bg-error",
  },
  {
    title: "New Course Upload",
    body: 'Prof. Amara uploaded "Clinical Ethics Case Studies" to your dashboard.',
    color: "bg-primary",
  },
  {
    title: "System Update",
    body: "Digital Library will be under maintenance on Sunday from 02:00 AM.",
    color: "bg-outline-variant",
    muted: true,
  },
];

const activeLoans: readonly StudentLoanItem[] = [
  { title: "Essentials of Pharmacology", due: "Due in 2 days", warn: true },
  { title: "Clinical Nursing Skills", due: "Due in 12 days" },
];

export function selectStudentDashboardData() {
  return {
    navItems,
    resourceCards,
    alerts,
    activeLoans,
    profile: {
      name: "Alex Sterling",
      program: "Nursing - Year 3",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDXJgidGvkEZx4eXc5HR4v4nPw_ROU2bnGXonZE7-6ixhNg6t3btOQKxdGNiE765L_LJ4x1g2JdoRcR1Qv6OxYNdTlhn4xfY2BB-ifUEU7c9kD_DX6KI8pm4QlzKeqUR2CczS7Z7tR1PSi32-Jo1EDp8LW21iiGp6g7z7t2sYuudnAzAa-cIF02FQmt8c42uu_5WezZu3ylZq7_cVOCCqqhDU_rOeKUqfgLf_UNOpEYSU0_tph3BZ7Rr_mNUC7HniQ9G9oBNk3G2kU",
    },
    welcome: {
      title: "Welcome back, Alex.",
      subtitle: "You have 2 books due this week and 4 new resource uploads in Clinical Practice III.",
    },
  };
}
