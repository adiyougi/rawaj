"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({
  id,
  title,
  compact = false
}: {
  id: string;
  title: string;
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [specs, setSpecs] = useState("");

  return (
    <>
      <div className={compact ? "service-actions compact" : "product-actions"}>
        <button className="btn btn-primary" onClick={() => addItem({ id, title })}>أضف إلى الطلب</button>
        <button className={compact ? "secondary" : "btn outline-button"} onClick={() => setOpen(true)}>حدد المواصفات</button>
      </div>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="spec-modal" onClick={(event) => event.stopPropagation()}>
            <button className="drawer-close" onClick={() => setOpen(false)} aria-label="إغلاق">×</button>
            <span className="eyebrow">مواصفات اختيارية</span>
            <h2>{title}</h2>
            <p>اكتب ما تعرفه فقط: المقاس، الكمية، الخامة، التشطيب، الموعد أو أي تفاصيل أخرى. يستطيع فريق رواج استكمال الباقي معك.</p>
            <textarea
              value={specs}
              onChange={(event) => setSpecs(event.target.value)}
              placeholder="مثال: 1000 حبة، وجهين، سلفنة مطفية، أحتاج التصميم أيضًا..."
            />
            <button
              className="btn btn-primary full"
              onClick={() => {
                addItem({ id, title, specs: specs.trim() || undefined });
                setSpecs("");
                setOpen(false);
              }}
            >
              حفظ وإضافة للطلب
            </button>
          </div>
        </div>
      )}
    </>
  );
}
