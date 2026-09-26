"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteHeader({ cartCount = 0, onCart }: { cartCount?: number; onCart?: () => void }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const nav = [
    ["الرئيسية", "/"],
    ["عن رواج", "/about"],
    ["الخدمات", "/services"],
    ["أعمالنا", "/portfolio"],
    ["الباقات", "/#packages"],
    ["المدونة", "/blog"],
    ["تواصل", "/contact"]
  ];

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="رواج">
        <span className="brand-symbol">ر</span>
        <span className="brand-copy"><strong>رواج</strong><small>للطباعة والإعلان والديكور</small></span>
      </Link>

      <nav className="desktop-nav">
        {nav.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
      </nav>

      <div className="header-actions">
        <button className="icon-button" onClick={() => setDark(!dark)} aria-label="تبديل المظهر">{dark ? "☀" : "◐"}</button>
        <button className="cart-button" onClick={onCart} aria-label="سلة الطلبات">الطلبات <b>{cartCount}</b></button>
        <Link className="btn btn-primary header-cta" href="/quote">اطلب عرض سعر</Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="القائمة"><i></i><i></i><i></i></button>
      </div>

      {open && (
        <div className="mobile-menu">
          <button className="close-menu" onClick={() => setOpen(false)}>×</button>
          {nav.map(([label, href]) => <Link onClick={() => setOpen(false)} key={label} href={href}>{label}</Link>)}
          <Link className="btn btn-primary" href="/quote">ابدأ مشروعك</Link>
        </div>
      )}
    </header>
  );
}
