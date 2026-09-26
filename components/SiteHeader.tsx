"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const saved = localStorage.getItem("rawaj-theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("rawaj-theme", dark ? "dark" : "light");
  }, [dark]);

  const nav = [
    ["الرئيسية", "/"],
    ["عن رواج", "/about"],
    ["الأقسام", "/#departments"],
    ["الخدمات", "/services"],
    ["أعمالنا", "/portfolio"],
    ["الباقات", "/packages"],
    ["المدونة", "/blog"],
    ["تواصل", "/contact"]
  ];

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="رواج">
        <span className="brand-symbol">
          <span className="brand-symbol-line">ر</span>
        </span>
        <span className="brand-copy">
          <strong>رواج</strong>
          <small>للطباعة والإعلان والديكور</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="القائمة الرئيسية">
        {nav.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
      </nav>

      <div className="header-actions">
        <button className="icon-button" onClick={() => setDark(!dark)} aria-label="تبديل المظهر">{dark ? "☀" : "◐"}</button>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="سلة الطلبات">الطلبات <b>{count}</b></button>
        <Link className="btn btn-primary header-cta" href="/quote">اطلب عرض سعر</Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="القائمة"><i></i><i></i><i></i></button>
      </div>

      {open && (
        <div className="mobile-menu">
          <button className="close-menu" onClick={() => setOpen(false)}>×</button>
          <div className="mobile-menu-mark">رواج</div>
          {nav.map(([label, href]) => <Link onClick={() => setOpen(false)} key={label} href={href}>{label}</Link>)}
          <Link onClick={() => setOpen(false)} className="btn btn-primary" href="/quote">ابدأ مشروعك</Link>
        </div>
      )}
    </header>
  );
}
