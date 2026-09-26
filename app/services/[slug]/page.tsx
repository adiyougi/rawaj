import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { services } from "@/lib/content";

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  const specs = [
    "المقاس أو الأبعاد",
    "الكمية المطلوبة",
    "الخامة أو نوع الورق",
    "الألوان والطباعة",
    "التشطيب والإضافات",
    "هل لديك تصميم جاهز؟"
  ];

  return (
    <main>
      <SiteHeader />
      <section className="product-hero" style={{backgroundImage:"linear-gradient(90deg,rgba(7,7,9,.22),rgba(7,7,9,.9)),url("+service.image+")"}}>
        <div className="shell product-hero-copy"><span className="eyebrow">{service.category}</span><h1>{service.title}</h1><p>{service.desc} صفحة الخدمة مصممة لتتحول لاحقًا إلى Product Configurator كامل بالمواصفات الخاصة بهذه الخدمة.</p><div><Link className="btn btn-primary" href={"/quote?service="+service.id}>اطلب عرض سعر</Link><Link className="btn btn-ghost" href="/services">العودة للكتالوج</Link></div></div>
      </section>
      <section className="section shell product-layout">
        <div><span className="eyebrow">المواصفات</span><h2>حدّد ما تعرفه، واترك الباقي لنا.</h2><p>لا نُجبر العميل على معرفة المصطلحات الفنية. يكفي أن يحدد ما يعرفه، ثم يستكمل فريق رواج التفاصيل معه.</p></div>
        <div className="spec-list">{specs.map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><small>اختياري — يختلف حسب نوع الخدمة.</small></div>)}</div>
      </section>
      <section className="section shell product-cta"><span className="eyebrow">جاهز للبدء؟</span><h2>أضف هذه الخدمة إلى طلبك، أو ابدأ بعرض سعر مخصص.</h2><Link className="btn btn-primary" href={"/quote?service="+service.id}>ابدأ الطلب</Link></section>
      <SiteFooter />
    </main>
  );
}
