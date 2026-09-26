import Link from "next/link";
import { CONTACT } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-cta shell">
        <div><span className="eyebrow">فكرة تستحق أن تُرى</span><h2>مشروعك القادم يبدأ من هنا.</h2></div>
        <Link href="/quote" className="btn btn-light">اطلب عرض سعر</Link>
      </div>
      <div className="footer-grid shell">
        <div className="footer-brand">
          <div className="footer-mark">رواج</div>
          <h3>رواج للطباعة والإعلان والديكور</h3>
          <p>من التصميم إلى التنفيذ، نصنع حضورًا بصريًا يليق بعلامتك.</p>
        </div>
        <div><h4>استكشف</h4><Link href="/about">عن رواج</Link><Link href="/services">الخدمات</Link><Link href="/portfolio">الأعمال</Link><Link href="/blog">المدونة</Link></div>
        <div><h4>الخدمات</h4><a href="/#departments">التصميم والمحتوى</a><a href="/#departments">الطباعة الورقية</a><a href="/#departments">اللوحات والواجهات</a><a href="/#departments">الليزر والأكريليك</a></div>
        <div><h4>تواصل</h4><a href={"tel:" + CONTACT.mobile.replace(/\s/g,"")}>{CONTACT.mobile}</a><a href={"tel:" + CONTACT.landline.replace(/\s/g,"")}>{CONTACT.landline}</a><a href={"mailto:" + CONTACT.email}>{CONTACT.email}</a><span>{CONTACT.address}</span></div>
      </div>
      <div className="footer-bottom shell"><span>© رواج — جميع الحقوق محفوظة.</span><div><a href={CONTACT.facebook} target="_blank" rel="noreferrer">Facebook</a><a href={"https://wa.me/" + CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div></div>
    </footer>
  );
}
