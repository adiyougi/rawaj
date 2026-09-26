"use client";

import { useCart } from "@/components/CartProvider";

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, clear, sendToWhatsApp } = useCart();

  if (!open) return null;

  return (
    <div className="drawer-backdrop" onClick={() => setOpen(false)}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <button className="drawer-close" onClick={() => setOpen(false)} aria-label="إغلاق">×</button>
        <span className="eyebrow">سلة الطلبات</span>
        <h2>اجمع خدماتك في طلب واحد.</h2>
        <p className="drawer-intro">لا يوجد دفع إلكتروني هنا. نرتب اختيارك ثم نرسله إلى فريق رواج عبر واتساب لاستكمال المواصفات والتسعير.</p>

        {!items.length ? (
          <div className="empty-state">
            <strong>السلة فارغة</strong>
            <p>استكشف الخدمات وأضف ما يناسب مشروعك.</p>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <div className="cart-row" key={item.key}>
                  <div>
                    <strong>{item.title}</strong>
                    {item.specs && <small>{item.specs}</small>}
                  </div>
                  <span>× {item.qty}</span>
                  <button onClick={() => removeItem(item.key)}>حذف</button>
                </div>
              ))}
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
