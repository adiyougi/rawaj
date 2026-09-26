"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";

function Icon({name}:{name:"home"|"grid"|"services"|"cart"|"contact"}) {
  const common={width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  if(name==="home") return <svg {...common}><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/></svg>;
  if(name==="grid") return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>;
  if(name==="services") return <svg {...common}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/><circle cx="18" cy="18" r="2"/></svg>;
  if(name==="cart") return <svg {...common}><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>;
  return <svg {...common}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.7 9.7 0 0 1-4-.9L3 21l1.6-4.4A8.2 8.2 0 1 1 21 11.5Z"/><path d="M8.5 9.5c.8 2 2 3.2 4 4"/><path d="M9 8.5h.01"/><path d="M14.5 14h.01"/></svg>;
}

export default function BottomNav() {
  const pathname=usePathname();
  const {count,setOpen}=useCart();
  if(pathname.startsWith("/admin")) return null;

  const links=[
    ["الرئيسية","/","home"],
    ["الأقسام","/departments","grid"],
    ["الخدمات","/services","services"],
    ["تواصل","/contact","contact"]
  ] as const;

  return (
    <nav className="bottom-nav" aria-label="التنقل السفلي">
      {links.slice(0,3).map(([label,href,icon])=>(
        <Link key={href} href={href} className={pathname===href || (href!=="/" && pathname.startsWith(href)) ? "active" : ""}>
          <Icon name={icon}/><span>{label}</span>
        </Link>
      ))}
      <button className={count ? "cart active" : "cart"} onClick={()=>setOpen(true)}>
        <span className="bottom-cart-icon"><Icon name="cart"/>{count>0 && <b>{count}</b>}</span><span>الطلبات</span>
      </button>
      <Link href="/contact" className={pathname.startsWith("/contact") ? "active" : ""}>
        <Icon name="contact"/><span>تواصل</span>
      </Link>
    </nav>
  );
}
