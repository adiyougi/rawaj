import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import ServiceConfigurator from "@/components/ServiceConfigurator";
import { getServices } from "@/lib/cms";
import { serviceSpecifications } from "@/lib/service-specs";

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((item) => item.id === slug);
  if (!service) notFound();

  const specs = serviceSpecifications[service.id] || [];
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
          <p>{service.desc} افتح المواصفات بالأسفل وحدد ما تعرفه فقط، أو أضف الخدمة مباشرة وتابع التفاصيل مع فريق رواج.</p>
          <div className="product-hero-actions">
            <AddToCartButton id={service.id} title={service.title} />
            <Link className="btn btn-ghost" href={"/quote?service=" + service.id}>اطلب عرض سعر مباشرة</Link>
          </div>
        </div>
      </section>

      <section className="section shell product-intro">
        <div>
          <span className="eyebrow">صفحة خدمة حقيقية</span>
          <h2>مواصفات واضحة دون تعقيد.</h2>
        </div>
        <p>كل خدمة في رواج تُعامل كمنتج مستقل: وصف، خيارات، مواصفات، خدمات مرتبطة، ثم تُجمع في سلة طلب واحدة بدل إرسال رسائل مبعثرة.</p>
      </section>

      {!!specs.length && (
        <section className="section configurator-section">
          <div className="shell">
            <ServiceConfigurator id={service.id} title={service.title} specs={specs} />
          </div>
        </section>
      )}

      {!!related.length && (
        <section className="section related-services">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><span className="eyebrow">قد تحتاج أيضًا</span><h2>خدمات من نفس المسار.</h2></div>
              <Link className="text-link" href="/services">العودة إلى الكتالوج ←</Link>
            </div>
            <div className="service-grid">
              {related.map((item) => (
                <article className="service-card" key={item.id}>
                  <Link href={"/services/" + item.id} className="service-media" style={{ backgroundImage: "url(" + item.image + ")" }}><span>{item.badge}</span></Link>
                  <div className="service-body">
                    <small>{item.category}</small>
                    <Link href={"/services/" + item.id}><h3>{item.title}</h3></Link>
                    <p>{item.desc}</p>
                    <AddToCartButton id={item.id} title={item.title} compact />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section shell product-cta">
        <span className="eyebrow">مشروعك التالي</span>
        <h2>أضف أكثر من خدمة، ثم أرسل طلبًا واحدًا مرتبًا إلى رواج.</h2>
        <Link className="btn btn-primary" href="/services">أكمل اختيار الخدمات</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
