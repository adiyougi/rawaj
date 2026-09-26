import Link from "next/link";
import { CONTACT } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-cta shell">
        <div>
          <span className="eyebrow">فكرة تستحق أن تُرى</span>
          <h2>مشروعك القادم يبدأ من هنا.</h2>
          <p>دعنا نحول الفكرة إلى شيء يمكن لعميلك أن يراه ويتذكره.</p>
        </div>
        <div className="footer-cta-actions">
          <Link href="/quote" className="btn btn-light">اطلب عرض سعر</Link>
          <a href={"https://wa.me/" + CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost">واتساب</a>
        </div>
      </div>
      <div className="footer-grid shell">
        <div className="footer-brand">
          <img className="footer-logo" src="/rawaj-logo.webp" alt="شعار رواج" />
          <h3>رواج للطباعة والإعلان والديكور</h3>
          <p>من التصميم إلى التنفيذ، نصنع حضورًا بصريًا يليق بعلامتك ويخدم هدف مشروعك.</p>
        </div>
        <div>
          <h4>استكشف</h4>
          <Link href="/about">عن رواج</Link>
          <Link href="/services">كتالوج الخدمات</Link>
          <Link href="/packages">الباقات والعروض</Link>
          <Link href="/portfolio">أعمالنا</Link>
          <Link href="/blog">المدونة</Link>
          <Link href="/faq">الأسئلة الشائعة</Link>
        </div>
        <div>
          <h4>أقسام رواج</h4>
          <a href="/#departments">التصميم وصناعة المحتوى</a>
          <a href="/#departments">الطباعة الورقية</a>
          <a href="/#departments">الطباعة الرقمية</a>
          <a href="/#departments">اللوحات والواجهات</a>
          <a href="/#departments">الليزر والأكريليك</a>
        </div>
        <div>
          <h4>تواصل</h4>
          <a href={"tel:" + CONTACT.mobile.replace(/\s/g,"")}>{CONTACT.mobile}</a>
          <a href={"tel:" + CONTACT.landline.replace(/\s/g,"")}>{CONTACT.landline}</a>
          <a href={"mailto:" + CONTACT.email}>{CONTACT.email}</a>
          <span>{CONTACT.address}</span>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© رواج — جميع الحقوق محفوظة.</span>
        <div>
          <Link href="/faq">الأسئلة الشائعة</Link>
          <Link href="/contact">تواصل معنا</Link>
          <a href={"https://wa.me/" + CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
