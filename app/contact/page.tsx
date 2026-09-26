import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { CONTACT, IMAGES } from "@/lib/content";

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <InnerHero eyebrow="تواصل مع رواج" title="ابدأ الصفقة من أول رسالة." text="اختر الوسيلة الأنسب لك، أو أرسل لنا طلبًا عبر واتساب مباشرة." image={IMAGES.storefront} />
      <section className="section shell contact-page-grid">
        <div className="contact-info-card"><span>الجوال والواتساب</span><a href={"https://wa.me/"+CONTACT.whatsapp} target="_blank">{CONTACT.mobile}</a><small>رسائل واتساب واستفسارات المشاريع</small></div>
        <div className="contact-info-card"><span>الهاتف الأرضي</span><a href={"tel:"+CONTACT.landline.replace(/\s/g,"")}>{CONTACT.landline}</a><small>الاتصال المباشر بالمؤسسة</small></div>
        <div className="contact-info-card"><span>البريد الإلكتروني</span><a href={"mailto:"+CONTACT.email}>{CONTACT.email}</a><small>العروض والملفات والمراسلات</small></div>
        <div className="contact-info-card wide"><span>العنوان</span><strong>{CONTACT.address}</strong><small>صنعاء — الجمهورية اليمنية</small></div>
      </section>
      <SiteFooter />
    </main>
  );
}
