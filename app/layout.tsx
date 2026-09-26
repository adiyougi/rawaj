import type { Metadata } from "next";
import "./globals.css";
import "./inner.css";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import FloatingActions from "@/components/FloatingActions";

export const metadata: Metadata = {
  title: {
    default: "رواج للطباعة والإعلان والديكور",
    template: "%s | رواج"
  },
  description: "تصميم، طباعة، إعلان، واجهات وديكور — من الفكرة حتى التنفيذ.",
  metadataBase: new URL("https://rawaj.example"),
  openGraph: {
    title: "رواج للطباعة والإعلان والديكور",
    description: "من الفكرة حتى التنفيذ — حلول تصميم وطباعة وإعلان متكاملة.",
    locale: "ar_YE",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
          <FloatingActions />
        </CartProvider>
      </body>
    </html>
  );
}
