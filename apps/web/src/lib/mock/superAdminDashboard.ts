export type SuperAdminNavItem = Readonly<{ label: string; icon: string; href: string }>;

export type SuperAdminStat = Readonly<{
  label: string;
  value: string;
  icon: string;
  detail?: string;
  progress?: number;
  meta?: string;
  metaClassName?: string;
  positive?: boolean;
}>;

export type SuperAdminInstitution = Readonly<{
  name: string;
  id: string;
  status: string;
  students: string;
  storage: string;
  storagePercent: number;
}>;

export type SuperAdminConfigToggle = Readonly<{ title: string; description: string }>;

const navItems: readonly SuperAdminNavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/super-admin" },
  { label: "System Health", icon: "health_and_safety", href: "/super-admin" },
  { label: "Institutions", icon: "account_balance", href: "/super-admin" },
  { label: "Feature Toggles", icon: "toggle_on", href: "/super-admin" },
  { label: "Logs", icon: "description", href: "/super-admin" },
  { label: "Settings", icon: "settings", href: "/super-admin" },
];

const footerNavItems: readonly SuperAdminNavItem[] = [
  { label: "Support", icon: "contact_support", href: "/super-admin" },
  { label: "Sign Out", icon: "logout", href: "/logout" },
];

const stats: readonly SuperAdminStat[] = [
  { label: "Total Institutions", value: "1", icon: "account_balance", meta: "Active", metaClassName: "bg-primary-container text-primary-fixed-dim" },
  { label: "Storage Usage", value: "45%", icon: "cloud", detail: "4.5TB of 10TB total", progress: 45 },
  { label: "Bandwidth", value: "Steady", icon: "speed", detail: "Network health nominal", positive: true },
  { label: "Active Users", value: "1.2k", icon: "group", detail: "+12% from last hour" },
];

const institutions: readonly SuperAdminInstitution[] = [
  { name: "NMTC Main Campus", id: "INST-001-ALPHA", status: "Active", students: "5,000", storage: "4.5TB", storagePercent: 75 },
];

const configToggles: readonly SuperAdminConfigToggle[] = [
  { title: "Global Search", description: "Cross-institution indexing" },
  { title: "PDF Annotations", description: "Real-time collaboration" },
];

const sessionImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBACDxGQ_0JY_7jeEYmgn-HuPUP1OtHCMcOiN2ZJuoEBPggLtgoNk4rX_cJV9Bk3Pb4tcifSOlDPsmOBE69j5i8LVAImmcRWd9mhbuhE8JrPbb7_mv5p1vDTnYUOspYGmhmKrvAGxhg9L_xG9ebWHotVtTE1IKpJ9gV1Fn_rMx0OybCP2T7tr42feUj0RrMu53PPC5loNVpB23ZRp9M2vMeCbuOA4y3R8ZH-pgrohUB0iNk474QiVUQvNEDpiQKnUMWxv_vmbxoEa4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDPJWw8iOxvRP-lyXn13B84-DRdxvl8HcYvPrf1sX8h5YlGX7VTTtXQjROgi72LHnUBNNbAjZcePyjPSF-H4gPXcF213jXLbwBs5QboYeA8473ryQAWOEwly2hQKAndR0fM09ZzqVdzuJRbpRTYSJlDOSY2oMfE6IJxQwnccDEFMpjQdsuHcyMWKaXI43_PnvMqLIBR0E4b2WLZwICceyTrhbfXOWOm_zm9PZZZmG_Ul7coraw5OlPOcaKGQ3ZsHdhL0St5gDMctGo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDdSBbi5JaZoF-HJKt98DOtTcthIQwo4OlbSJnu9yoMCbkB1mpcgX_4kZPhqLDmcxhexaTK8BpH0nOgY0dgW5KmjSwAxxt92QmcOBsrBpde77ItUePDrqanoZaNueb-1d4Ctn9eKnEgH_8ApxH0sse0xX0sa5l_mYNPO33X4x4-zEwPcsTmvdoWNr-AVD8_Rk8Yv9V-w_ku2ihmPvD-ddWQvDmf0r6QO3ZA4v0gjEkUUfSXPAkxoF9WrpHXEd7Ys8Nv-Pg-3o0W0Kc",
] as const;

export function selectSuperAdminDashboardData() {
  return {
    navItems,
    footerNavItems,
    stats,
    institutions,
    configToggles,
    sessionImages,
    topbar: {
      title: "NMTC Library",
      subtitle: "Super Admin",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAaFvrbMNAa8GOky1Xb-ZXAnvx7KrR6rfiK42RYfXr4eNjo9R4toa1o7nI-9x3jnpRxb1kWESLvv5_PgvGOLkTJ32FclZaOYlR08_BBS_6olliGmcAo0cZugVJ0BVg4NVrKev757PunFrbFaD7sh_euatrxn3KW1F3m-lzOy4lsGNBGsc9Bo4pvsIvL2w6OQRsyEPTwtNbblxHtlgm0JVZbdMO01Lh8AS_rHq7CJ1Fo-0bSwRAeMmMJcO6fV1N3HQrgOo4os-MDT0s",
    },
    media: {
      securityBannerImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCS3v09xOyeLJIRfQ455wqMBqlycjLYtin1wOnA6G7-5MPThKh4KkMO2BWgXUivJUoEwAfVrJrU6XhVYrK_zSMST3IYZI9-hYfQfk0_G0gzUa6AJIYaRSOpRXGPkxiZID08jWpBKzNiDINyLuj9PE1LnAAFouDF8OlruNS2ChUWGKDb7d9X8_SWZSBDGD-WpekqOV9Gp72jNGpCDDMm4DqEOrhVEjgI3dLvPOmpX6DOJ4HpSWyr_rEmazZIKwFz2krFD2DDbaR0meA",
    },
  };
}
