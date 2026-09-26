"use client";

import { FormEvent, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CONTACT, services } from "@/lib/content";

export default function QuotePage() {
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [service,setService]=useState("");
  const [details,setDetails]=useState("");

  function submit(e:FormEvent){
    e.preventDefault();
    const selected=services.find((x)=>x.id===service)?.title || service || "غير محددة";
    const message="طلب عرض سعر جديد من منصة رواج\n\nالاسم: "+name+"\nرقم التواصل: "+phone+"\nالخدمة: "+selected+"\nالتفاصيل: "+(details||"لا توجد تفاصيل إضافية");
    window.open("https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(message),"_blank");
  }

  return (
    <main>
      <SiteHeader />
      <section className="quote-page">
        <div className="shell quote-grid">
          <div className="quote-intro"><span className="eyebrow">طلب عرض سعر</span><h1>أخبرنا بما تريد. وسنحوّله إلى عرض واضح.</h1><p>لا تحتاج إلى معرفة جميع المواصفات الفنية. ابدأ بما تعرفه، وسيتولى فريق رواج استكمال التفاصيل معك عبر واتساب.</p><div className="quote-contact"><span>واتساب</span><strong>{CONTACT.mobile}</strong><span>العنوان</span><strong>{CONTACT.address}</strong></div></div>
          <form className="quote-form" onSubmit={submit}>
            <label>الاسم<input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="اسمك أو اسم المؤسسة" /></label>
            <label>رقم التواصل<input required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="رقم الجوال" inputMode="tel" /></label>
            <label>الخدمة<select value={service} onChange={(e)=>setService(e.target.value)}><option value="">اختر خدمة</option>{services.map((x)=><option value={x.id} key={x.id}>{x.title}</option>)}</select></label>
            <label>تفاصيل الطلب<textarea value={details} onChange={(e)=>setDetails(e.target.value)} placeholder="المقاسات، الكمية، الخامة، الموعد أو أي تفاصيل تعرفها..."></textarea></label>
            <button className="btn btn-primary full" type="submit">إرسال عبر واتساب</button>
            <small>سيتم فتح واتساب برسالة مرتبة تحتوي بيانات طلبك.</small>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
