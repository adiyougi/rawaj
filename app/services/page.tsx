import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES, services } from "@/lib/content";

export default function ServicesPage() {
  const cats = Array.from(new Set(services.map((s) => s.category)));
  return (
    <main>
      <SiteHeader />
      <InnerHero eyebrow="متجر الخدمات" title="خدمات تُعرض كمنتجات، لا كقائمة مملة." text="استكشف الكتالوج، افتح صفحة كل خدمة، ثم اجمع ما تحتاجه في طلب واحد." image={IMAGES.design} action={{label:"اطلب عرض سعر",href:"/quote"}} />
      <section className="section shell">
        <div className="catalog-toolbar"><div>{["الكل", ...cats].map((c)=><button key={c}>{c}</button>)}</div><input placeholder="ابحث عن خدمة..." /></div>
        <div className="service-grid">
          {services.map((item) => (
            <Link className="service-card" href={"/services/" + item.id} key={item.id}>
              <div className="service-media" style={{ backgroundImage: "url(" + item.image + ")" }}><span>{item.badge}</span></div>
              <div className="service-body"><small>{item.category}</small><h3>{item.title}</h3><p>{item.desc}</p><span className="catalog-link">عرض التفاصيل ←</span></div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
