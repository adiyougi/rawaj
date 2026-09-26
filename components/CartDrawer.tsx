"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartDrawer(){
  const {items,open,setOpen,removeItem,clear,sendToWhatsApp}=useCart();
  if(!open) return null;

  return (
    <div className="drawer-backdrop" onClick={()=>setOpen(false)}>
      <aside className="cart-drawer" onClick={e=>e.stopPropagation()}>
        <div className="cart-drawer-head">
          <div><small>سلة الطلبات</small><h2>طلباتك</h2></div>
          <button onClick={()=>setOpen(false)}>×</button>
        </div>

        {!items.length ? (
          <div className="cart-empty">
            <span>◎</span><h3>السلة فارغة</h3><p>أضف الخدمات التي تحتاجها وسنجمعها في طلب واحد.</p>
            <Link href="/services" onClick={()=>setOpen(false)} className="btn btn-primary">استكشف الخدمات</Link>
          </div>
        ):(
          <>
            <div className="cart-list">
              {items.map(item=>(
                <div className="cart-row" key={item.key}>
                  <div><strong>{item.title}</strong>{item.specs && <small>{item.specs}</small>}<span>الكمية: {item.qty}</span></div>
                  <button onClick={()=>removeItem(item.key)}>حذف</button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>الخدمات المختارة</span><strong>{items.length}</strong></div>
              <p>سيتم إرسال الطلب إلى واتساب لاستكمال السعر والمواصفات النهائية.</p>
            </div>
            <div className="cart-drawer-actions">
              <button className="btn btn-primary full" onClick={sendToWhatsApp}>إرسال الطلب عبر واتساب</button>
              <button className="clear-cart" onClick={clear}>تفريغ السلة</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
