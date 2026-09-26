import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="not-found shell">
        <span className="not-found-code">404</span>
        <span className="eyebrow">هذه الصفحة غير موجودة</span>
        <h1>ربما تغيّر المسار، لكن مشروعك ما زال أمامك.</h1>
        <p>عد إلى الرئيسية، استكشف الخدمات، أو ابدأ طلب عرض سعر مباشرة.</p>
        <div>
          <Link className="btn btn-primary" href="/">الرئيسية</Link>
          <Link className="btn outline-dark" href="/services">الخدمات</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
