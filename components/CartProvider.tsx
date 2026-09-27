"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CONTACT } from "@/lib/content";

export type CartItem = {
  key: string;
  id: string;
  title: string;
  qty: number;
  specs?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  addItem: (item: { id: string; title: string; specs?: string }) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  sendToWhatsApp: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rawaj-cart");
    if (saved) {
      try { const parsed=JSON.parse(saved); if(Array.isArray(parsed)) setItems(parsed.slice(0,30).filter((x:any)=>x&&typeof x.id==="string"&&typeof x.title==="string"&&Number.isFinite(x.qty)&&x.qty>0)); } catch { localStorage.removeItem("rawaj-cart"); }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("rawaj-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const count = useMemo(() => items.reduce((total, item) => total + item.qty, 0), [items]);

  function addItem(item: { id: string; title: string; specs?: string }) {
    setItems((current) => {
      const same = current.find((x) => x.id === item.id && (x.specs || "") === (item.specs || ""));
      if (same) {
        return current.map((x) => x.key === same.key ? { ...x, qty: x.qty + 1 } : x);
      }
      return [...current, { ...item, key: item.id + "-" + Date.now(), qty: 1 }];
    });
    setOpen(true);
  }

  function removeItem(key: string) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  function clear() {
    setItems([]);
  }

  function sendToWhatsApp() {
    if (!items.length) return;
    const lines = items.map((item, index) =>
      `${index + 1}. ${item.title} × ${item.qty}${item.specs ? "\n   المواصفات: " + item.specs : ""}`
    );
    const message =
      "مرحبًا رواج، أود طلب عرض سعر للخدمات التالية:\n\n" +
      lines.join("\n\n") +
      "\n\nأرجو التواصل معي لاستكمال التفاصيل.";
    window.open("https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  }

  return (
    <CartContext.Provider value={{ items, count, open, setOpen, addItem, removeItem, clear, sendToWhatsApp }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
