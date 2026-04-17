export type GuestCatalogItem = Readonly<{
  title: string;
  author: string;
  tag: string;
  tagClass: string;
  callout: string;
  cover: string;
  digital?: boolean;
}>;

export type GuestTopTab = Readonly<{ label: string; href: string }>;

const catalogItems: readonly GuestCatalogItem[] = [
  {
    title: "Principles of Modern Curating",
    author: "Dr. Elena Thorne",
    tag: "Available",
    tagClass: "bg-primary-fixed text-on-primary-fixed",
    callout: "Call # 708.13",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmxgw9z1ImEfd8C30u4udfteqe_LkCxEDlVV1pvU-dPzTL8ugelZBP1YCUmj8i15wzSI2hwzmYq_uFW3wEky930bJjKcf9ImZcX8Ky52V67CpyexA0mvhaivY3-8cdQCeViw5erd84Rhw8ouAhoXPOOpIIupFppvibOwQPPXYWTzsUF_dpGMB65xVsNnaArk1RsLDQETo3Q4eobrh_513rvRcxk6k3W_vFZFN-U8-t1MgNfP8sdcYQTb7j9UsM4dDe4hUDRXIhzrs",
  },
  {
    title: "Global Information Law",
    author: "Marcus Sterling",
    tag: "In Reading Room",
    tagClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    callout: "Call # 341.01",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnzjSApU7eW9iFVpZHcCqusDYjKCwNljhPFEG0YyJJ-17MTFTtVb-pBgwfMFfu_9r2vCRfmW0YBpgC3QWA7VN333mm6-tdHrzVrcM0-hVpMzhQYX_InJehsn-HyjPah37605ctPGOpw4Hhd-tIL8kmc6ttEdJ29eIRLqnV4hNFruyCbMo0zjTDkd8CV8AeKjdkZShLvxoHpnmMMvJV_k3521qBL4Ausjtu3rpj36qnAB5ONWwy7U_5LstRFPPyP3O3nUmhUtNEPG4",
  },
  {
    title: "Neural Networks & Knowledge",
    author: "Tech Institute Review",
    tag: "Digital",
    tagClass: "bg-secondary-container text-on-secondary-container",
    callout: "ISSN: 1044-23X",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCj3GW1Ep4x6g4OgwQRlOLxSB4cVDjDla3ggLpGTGv8QvglR-zkJPBsA5RG5dgedvkzn4I2MKYWY6EoDt3_v2rQi1TqHe2RFoSBEAcsGPrXUdvPXswreHDHnEXwT37UTpJ-dShFmoaJ02Ktgm_P92TJ8eJqFswWtJK9DbCWLSS3tXr45XJ9sdyXCUYAnkn1P1H1kb8AO8N33G2IRwY0NEHOxFexstb0kaD7S9_DRD1tktMa16IRgHC_Kp64XXPhtu4J5r7MuDpKU8A",
    digital: true,
  },
  {
    title: "The Ethics of Archiving",
    author: "Sarah J. Miller",
    tag: "Available",
    tagClass: "bg-primary-fixed text-on-primary-fixed",
    callout: "Call # 025.17",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCn4t0ErnUVLgcndXZa7mZSDB_gKgTnm1BmDFc6g4Zktg3-rOiOMlEduuFfg_sikGM3ro0BQw4TCRSVWs7vSH8G6w2Y6RcNZnlon1F0ot3bRV9vHNmjxiYzZxt_h1wrtNdNdzHZG0wUEVOnnKiJuytfPenJhKSNGiBpGumXg3_JdbaSdy-5cJ6LCu1d9kAnUbilDXYExwd2ubwUvW-OsGwLiQMLaWMOa0WhUFRXd3CcvBdZE47hNC_FvR83s_w989LRjzlgVYVFzfY",
  },
];

const topTabs: readonly GuestTopTab[] = [
  { label: "Catalog", href: "/guest" },
  { label: "Resources", href: "/search" },
  { label: "About", href: "/guest" },
];

export function selectGuestLandingData() {
  return {
    catalogItems,
    topTabs,
    hero: {
      hallImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Kbsxi6sxoyV1W_DygBrpT8O6SUWRGzmFfZUKdx-nvQNXtFVo4jzYoAtve5yWxl3ckpWKLC4FCZmycCgCOQ8sJfbQ2oDg5P6KVIz7WkFPVrYofHU2JFBnSwOyAEh205_LriXH1eUc_a4gDectnrD8kFPruFNTXdrIS1t94lOsSG-iSJc0L92xiZHjMw8og3SH-Zw9BuDDIEmvKdYQxmaXJyq2s7XI3YS86usU5-l2jtUA2fz-_q0MYDIWwkFADzyxCgQadH2AqU4",
    },
  };
}
