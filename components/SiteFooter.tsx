import Link from "next/link";
import { CONTACT } from "@/lib/content";

export default function SiteFooter(){
  return (
    <footer className="site-footer app-footer">
      <div className="app-footer-shell">
        <div className="app-footer-brand">
          <img src="/rawaj-logo.webp" alt="رواج"/>
          <div><strong>رواج</strong><span>للطباعة والإعلان والديكور</span></div>
        </div>
        <p>حلول تصميم وطباعة وإعلان متكاملة، من الفكرة حتى التنفيذ.</p>
        <div className="app-footer-links">
          <Link href="/services">الخدمات</Link><Link href="/packages">الباقات</Link><Link href="/portfolio">الأعمال</Link><Link href="/about">عن رواج</Link><Link href="/faq">الأسئلة الشائعة</Link>
        </div>
        <div className="app-footer-contact">
          <a href={"tel:"+CONTACT.mobile.replace(/\s/g,"")}>{CONTACT.mobile}</a>
          <a href={"mailto:"+CONTACT.email}>{CONTACT.email}</a>
          <span>{CONTACT.address}</span>
        </div>
        <div className="app-footer-bottom"><span>© رواج</span><a href={"https://wa.me/"+CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
      </div>
    </footer>
  );
}
