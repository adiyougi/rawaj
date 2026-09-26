import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import { services } from "@/lib/content";

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);
  if (!service) notFound();

  const specs = [
    "المقاس أو الأبعاد",
    "الكمية المطلوبة",
    "الخامة أو نوع الورق",
    "الألوان والطباعة",
    "التشطيب والإضافات",
    "موعد التسليم المتوقع",
    "هل لديك تصميم جاهز؟"
  ];

  const related = services.filter((item) => item.id !== service.id && item.category === service.category).slice(0, 3);

  return (
    <main>
      <SiteHeader />

      <section
        className="product-hero"
        style={{ backgroundImage: "linear-gradient(90deg,rgba(7,7,9,.20),rgba(7,7,9,.88)),url(" + service.image + ")" }}
      >
        <div className="shell product-hero-copy">
          <span className="eyebrow">{service.category}</span>
          <h1>{service.title}</h1>
          <p>{service.desc} حدّد ما تعرفه من المواصفات وأضف الخدمة إلى سلة طلبك؛ ويمكن لفريق رواج استكمال التفاصيل الفنية معك.</p>
          <div className="product-hero-actions">
            <AddToCartButton id={service.id} title={service.title} />
            <Link className="btn btn-ghost" href="/quote">اطلب عرض سعر مباشرة</Link>
          </div>
        </div>
      </section>

      <section className="section shell product-layout">
        <div className="product-copy">
          <span className="eyebrow">المواصفات</span>
          <h2>لا تحتاج لأن تكون خبيرًا في الطباعة.</h2>
          <p>صفحة كل خدمة مصممة لتكون مثل صفحة منتج: تفاصيل واضحة، خيارات منظمة، ثم طلب واحد يجمع كل ما يحتاجه مشروعك.</p>
        </div>
        <div className="spec-list">
          {specs.map((item, index) => (
            <div key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <small>اختياري — تختلف الخيارات المتاحة بحسب نوع الخدمة.</small>
            </div>
          ))}
        </div>
      </section>

      {!!related.length && (
        <section className="section related-services">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><span className="eyebrow">قد تحتاج أيضًا</span><h2>خدمات مرتبطة.</h2></div>
              <Link className="text-link" href="/services">العودة إلى الكتالوج ←</Link>
            </div>
            <div className="service-grid">
              {related.map((item) => (
                <article className="service-card" key={item.id}>
                  <Link href={"/services/" + item.id} className="service-media" style={{ backgroundImage: "url(" + item.image + ")" }}><span>{item.badge}</span></Link>
                  <div className="service-body"><small>{item.category}</small><h3>{item.title}</h3><p>{item.desc}</p><AddToCartButton id={item.id} title={item.title} compact /></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section shell product-cta">
        <span className="eyebrow">مشروعك التالي</span>
        <h2>أضف أكثر من خدمة، ثم أرسل طلبًا واحدًا مرتبًا إلى رواج.</h2>
        <AddToCartButton id={service.id} title={service.title} />
      </section>

      <SiteFooter />
    </main>
  );
}
