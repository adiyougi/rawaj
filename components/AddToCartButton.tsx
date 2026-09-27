"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({id,title,compact=false}:{id:string;title:string;compact?:boolean}) {
  const {addItem}=useCart();
  const [open,setOpen]=useState(false);
  const [specs,setSpecs]=useState("");

  if(compact){
    return <button className="quick-add" onClick={()=>addItem({id,title})} aria-label={"أضف "+title+" إلى الطلب"}>+</button>;
  }

  return (
    <>
      <div className="product-actions">
        <button className="btn btn-primary" onClick={()=>addItem({id,title})}>أضف إلى الطلب</button>
        <button className="btn btn-soft" onClick={()=>setOpen(true)}>حدد المواصفات</button>
      </div>

      {open && (
        <div className="modal-backdrop" role="presentation" onClick={()=>setOpen(false)}>
          <div className="spec-modal" role="dialog" aria-modal="true" aria-label={"مواصفات "+title} onClick={e=>e.stopPropagation()}>
            <div className="spec-modal-head"><div><small>مواصفات اختيارية</small><h2>{title}</h2></div><button onClick={()=>setOpen(false)} aria-label="إغلاق نافذة المواصفات">×</button></div>
            <p>اكتب فقط ما تعرفه الآن، ويمكن استكمال بقية التفاصيل مع فريق رواج.</p>
            <textarea value={specs} onChange={e=>setSpecs(e.target.value)} placeholder="المقاس، الكمية، الخامة، التشطيب، الموعد..."/>
            <button className="btn btn-primary full" onClick={()=>{addItem({id,title,specs:specs.trim()||undefined});setSpecs("");setOpen(false);}}>حفظ وإضافة للطلب</button>
          </div>
        </div>
      )}
    </>
  );
}
