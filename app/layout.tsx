import type { Metadata } from "next";
import "./globals.css";
import "./inner.css";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import FloatingActions from "@/components/FloatingActions";
import BottomNav from "@/components/BottomNav";

const siteUrl=process.env.NEXT_PUBLIC_SITE_URL;

export const metadata:Metadata={
  title:{default:"رواج للطباعة والإعلان والديكور",template:"%s | رواج"},
  description:"تصميم، طباعة، إعلان، واجهات وديكور — من الفكرة حتى التنفيذ.",
  metadataBase:siteUrl ? new URL(siteUrl):undefined,
  openGraph:{title:"رواج للطباعة والإعلان والديكور",description:"من الفكرة حتى التنفيذ — حلول تصميم وطباعة وإعلان متكاملة.",locale:"ar_YE",type:"website",siteName:"رواج"},
  robots:{index:true,follow:true},
  other:{"rawaj-review-build":"preview-5-2026-09-27"}
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <html lang="ar" dir="rtl" suppressHydrationWarning><body><CartProvider>{children}<CartDrawer/><FloatingActions/><BottomNav/></CartProvider></body></html>;
}
