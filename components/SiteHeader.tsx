"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";

export default function SiteHeader() {
  const pathname=usePathname();
  const [open,setOpen]=useState(false);
  const [dark,setDark]=useState(false);
  const {count,setOpen:setCartOpen}=useCart();

  useEffect(()=>{
    const saved=localStorage.getItem("rawaj-theme");
    setDark(saved==="dark");
  },[]);

  useEffect(()=>{
    document.documentElement.dataset.theme=dark ? "dark":"light";
    localStorage.setItem("rawaj-theme",dark ? "dark":"light");
  },[dark]);

  const nav=[
    ["الرئيسية","/"],["الخدمات","/services"],["الأقسام","/departments"],["الباقات","/packages"],
    ["أعمالنا","/portfolio"],["عن رواج","/about"],["المدونة","/blog"],["تواصل","/contact"]
  ];

  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="رواج">
          <span className="brand-logo-wrap"><img className="brand-logo" src="/rawaj-logo.webp" alt="شعار رواج"/></span>
          <span className="brand-copy"><strong>رواج</strong><small>للطباعة والإعلان والديكور</small></span>
        </Link>

        <nav className="desktop-nav">
          {nav.map(([label,href])=><Link className={pathname===href ? "active":""} key={href} href={href}>{label}</Link>)}
        </nav>

        <div className="header-actions">
          <button className="header-icon-btn theme-toggle" onClick={()=>setDark(!dark)} aria-label="تبديل المظهر">
            <span>{dark ? "☀" : "◐"}</span>
          </button>
          <button className="header-cart-btn" onClick={()=>setCartOpen(true)}>
            <span>الطلبات</span>{count>0 && <b>{count}</b>}
          </button>
          <button className="menu-button" onClick={()=>setOpen(true)} aria-label="القائمة"><i/><i/><i/></button>
        </div>
      </header>

      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-head">
            <div className="brand"><span className="brand-logo-wrap"><img className="brand-logo" src="/rawaj-logo.webp" alt="رواج"/></span><span className="brand-copy"><strong>رواج</strong><small>القائمة الرئيسية</small></span></div>
            <button className="mobile-menu-close" onClick={()=>setOpen(false)}>×</button>
          </div>
          <nav>
            {nav.map(([label,href])=>(
              <Link onClick={()=>setOpen(false)} key={href} href={href}>
                <span>{label}</span><b>←</b>
              </Link>
            ))}
          </nav>
          <Link onClick={()=>setOpen(false)} className="mobile-menu-cta" href="/quote">اطلب عرض سعر</Link>
        </div>
      )}
    </>
  );
}
