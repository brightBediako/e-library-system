import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NMTC Library Management System",
  description: "Digital and physical library operations platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body>{children}</body>
    </html>
  );
}

