import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import QuoteForm from "@/components/QuoteForm";
import { CONTACT } from "@/lib/content";
import { getPackages,getServices } from "@/lib/cms";
import type { Metadata } from "next";

export const metadata:Metadata={title:"طلب عرض سعر",description:"أرسل مواصفات مشروعك إلى رواج واحصل على عرض سعر مخصص دون تسعير آلي.",alternates:{canonical:"/quote"}};

export default async function QuotePage(){
 const [services,packages]=await Promise.all([getServices(),getPackages()]);
 return <main><SiteHeader/><section className="quote-page"><div className="shell quote-grid">
  <div className="quote-intro"><span className="eyebrow">طلب عرض سعر</span><h1>أخبرنا بما تريد. وسنرتب التفاصيل معك.</h1><p>أرسل ما تعرفه من المواصفات. يُحفظ الطلب داخل رواج أولًا، ثم يمكنك متابعة التفاصيل عبر واتساب.</p><div className="quote-contact"><span>واتساب</span><strong>{CONTACT.mobile}</strong><span>الأرضي</span><strong>{CONTACT.landline}</strong><span>العنوان</span><strong>{CONTACT.address}</strong></div></div>
  <QuoteForm services={services.map(x=>({id:x.id,title:x.title}))} packages={packages.map(x=>({id:x.id,title:x.title}))}/>
 </div></section><SiteFooter/></main>;
}