import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import { getDepartmentDetail } from "@/lib/cms";

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getDepartmentDetail(slug);
  if (!data) notFound();

  const { department, services } = data;

  return (
    <main>
      <SiteHeader />
      <section className="department-hero" style={{backgroundImage:"linear-gradient(180deg,rgba(5,5,7,.08),rgba(5,5,7,.9)),url("+department.image+")"}}>
        <div className="shell">
          <span className="eyebrow">أقسام رواج</span>
          <h1>{department.title}</h1>
          <p>{"description" in department ? department.description : department.text}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/quote">اطلب عرض سعر</Link>
            <Link className="btn btn-ghost" href="/departments">جميع الأقسام</Link>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">خدمات القسم</span><h2>اختر الخدمة التي تناسب مشروعك.</h2></div>
          <p>يمكنك إضافة أكثر من خدمة من هذا القسم أو من أقسام أخرى إلى سلة طلب واحدة.</p>
        </div>

        {services.length ? (
          <div className="service-grid">
            {services.map((item)=>(
              <article className="service-card" key={item.id}>
                <Link href={"/services/"+item.id} className="service-media" style={{backgroundImage:"url("+item.image+")"}}><span>{item.badge}</span></Link>
                <div className="service-body">
                  <small>{item.category}</small>
                  <Link href={"/services/"+item.id}><h3>{item.title}</h3></Link>
                  <p>{item.desc}</p>
                  <AddToCartButton id={item.id} title={item.title} compact />
                  <Link className="catalog-link" href={"/services/"+item.id}>التفاصيل والمواصفات ←</Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <strong>نعمل على إدراج كتالوج هذا القسم.</strong>
            <p>يمكنك حاليًا إرسال طلب مخصص وسيستكمل فريق رواج معك التفاصيل.</p>
            <Link className="btn btn-primary" href="/quote">اطلب خدمة مخصصة</Link>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
