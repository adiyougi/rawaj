"use client";

import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/content";
import { useCart } from "@/components/CartProvider";

export default function FloatingActions(){
  const pathname=usePathname();
  const {count,setOpen}=useCart();
  if(pathname.startsWith("/admin")) return null;
  return (
    <div className="desktop-floating-actions">
      <button className="floating-cart" onClick={()=>setOpen(true)}><span>الطلبات</span><b>{count}</b></button>
      <a className="floating-whatsapp" href={"https://wa.me/"+CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="واتساب">WA</a>
    </div>
  );
}
