import type { Metadata } from "next";
import "./globals.css";
import "./inner.css";

export const metadata: Metadata = {
  title: "رواج للطباعة والإعلان والديكور",
  description: "تصميم، طباعة، إعلان، واجهات وديكور — من الفكرة حتى التنفيذ.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
