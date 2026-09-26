"use client";

import { CONTACT } from "@/lib/content";
import { useCart } from "@/components/CartProvider";

export default function FloatingActions() {
  const { count, setOpen } = useCart();
  return (
    <>
      <button className="floating-cart" onClick={() => setOpen(true)} aria-label="فتح سلة الطلبات">
        <span>سلة الطلبات</span><b>{count}</b>
      </button>
      <a className="floating-whatsapp" href={"https://wa.me/" + CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="التواصل عبر واتساب">WA</a>
    </>
  );
}
