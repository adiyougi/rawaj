import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import AddToCartButton from "@/components/AddToCartButton";
import { IMAGES, services } from "@/lib/content";

export default function ServicesPage() {
  const cats = Array.from(new Set(services.map((service) => service.category)));

  return (
    <main>
      <SiteHeader />
      <InnerHero
        eyebrow="كتالوج رواج"
        title="اختر الخدمة كما تختار منتجًا."
        text="كتالوج قابل للتوسع: لكل خدمة صفحة مستقلة، مواصفات، خيارات، أعمال مرتبطة وإمكانية إضافتها إلى طلب موحّد."
        image={IMAGES.design}
        action={{ label: "اطلب عرض سعر", href: "/quote" }}
      />

      <section className="section shell">
        <div className="catalog-toolbar">
          <div>{["الكل", ...cats].map((category) => <button key={category}>{category}</button>)}</div>
          <input placeholder="ابحث عن خدمة..." aria-label="البحث في الخدمات" />
        </div>

        <div className="service-grid">
          {services.map((item) => (
            <article className="service-card" key={item.id}>
              <Link href={"/services/" + item.id} className="service-media" style={{ backgroundImage: "url(" + item.image + ")" }}>
                <span>{item.badge}</span>
              </Link>
              <div className="service-body">
                <small>{item.category}</small>
                <Link href={"/services/" + item.id}><h3>{item.title}</h3></Link>
                <p>{item.desc}</p>
                <AddToCartButton id={item.id} title={item.title} compact />
                <Link className="catalog-link" href={"/services/" + item.id}>التفاصيل والمواصفات ←</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
