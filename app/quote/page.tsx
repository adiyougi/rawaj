"use client";

import { FormEvent, useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CONTACT, packages, services } from "@/lib/content";
import { getServices, getPackages } from "@/lib/cms";

export default function QuotePage() {
  // Client-side fallback options remain available; live catalog integration is loaded below.
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [service,setService]=useState("");
  const [packageId,setPackageId]=useState("");
  const [details,setDetails]=useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const packageParam = params.get("package");
    if (serviceParam) setService(serviceParam);
    if (packageParam) setPackageId(packageParam);
  }, []);

  function submit(e:FormEvent){
    e.preventDefault();
    const selectedService=services.find((item)=>item.id===service)?.title || "";
    const selectedPackage=packages.find((item)=>item.id===packageId)?.title || "";
    const selected = selectedPackage || selectedService || "غير محددة";
    const type = selectedPackage ? "الباقة" : "الخدمة";
    const message =
      "طلب عرض سعر جديد من منصة رواج\n\n" +
      "الاسم: " + name + "\n" +
      "رقم التواصل: " + phone + "\n" +
      type + ": " + selected + "\n" +
      "التفاصيل: " + (details || "لا توجد تفاصيل إضافية") +
      "\n\nأرجو التواصل معي لاستكمال العرض.";
    window.open("https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
  }

  return (
    <main>
      <SiteHeader />
      <section className="quote-page">
        <div className="shell quote-grid">
          <div className="quote-intro">
            <span className="eyebrow">طلب عرض سعر</span>
            <h1>أخبرنا بما تريد. وسنرتب التفاصيل معك.</h1>
            <p>لا تحتاج إلى معرفة جميع المصطلحات أو المواصفات الفنية. ابدأ بما تعرفه، وسيستكمل فريق رواج معك ما يلزم عبر واتساب.</p>
            <div className="quote-contact">
              <span>واتساب</span><strong>{CONTACT.mobile}</strong>
              <span>الأرضي</span><strong>{CONTACT.landline}</strong>
              <span>العنوان</span><strong>{CONTACT.address}</strong>
            </div>
          </div>

          <form className="quote-form" onSubmit={submit}>
            <label>الاسم<input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="اسمك أو اسم المؤسسة" /></label>
            <label>رقم التواصل<input required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="رقم الجوال" inputMode="tel" /></label>

            <label>الخدمة
              <select value={service} onChange={(e)=>{setService(e.target.value); if(e.target.value) setPackageId("");}}>
                <option value="">اختر خدمة</option>
                {services.map((item)=><option value={item.id} key={item.id}>{item.title}</option>)}
              </select>
            </label>

            <label>أو الباقة
              <select value={packageId} onChange={(e)=>{setPackageId(e.target.value); if(e.target.value) setService("");}}>
                <option value="">اختر باقة</option>
                {packages.map((item)=><option value={item.id} key={item.id}>{item.title}</option>)}
              </select>
            </label>

            <label>تفاصيل الطلب<textarea value={details} onChange={(e)=>setDetails(e.target.value)} placeholder="المقاسات، الكمية، الخامة، الموعد، أو أي تفاصيل تعرفها..." /></label>
            <button className="btn btn-primary full" type="submit">إرسال عبر واتساب</button>
            <small>سيتم فتح واتساب برسالة مرتبة تحتوي بيانات طلبك. لا يتم إجراء دفع داخل الموقع في هذه المرحلة.</small>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
