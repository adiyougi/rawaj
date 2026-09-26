import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import ServiceConfigurator from "@/components/ServiceConfigurator";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/cms";
import { serviceSpecifications } from "@/lib/service-specs";

export default async function ServiceDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const services=await getServices();
  const service=services.find(item=>item.id===slug);
  if(!service) notFound();
  const specs=serviceSpecifications[service.id] || [];
  const related=services.filter(item=>item.id!==service.id && item.category===service.category).slice(0,4);

  return (
    <main className="app-storefront">
      <SiteHeader/>
      <div className="product-page-shell">
        <div className="product-breadcrumb"><Link href="/services">الخدمات</Link><span>/</span><span>{service.category}</span></div>

        <section className="product-app-layout">
          <div className="product-app-media" style={{backgroundImage:"url("+service.image+")"}}>
            {service.badge && <span>{service.badge}</span>}
          </div>
          <div className="product-app-info">
            <small>{service.category}</small>
            <h1>{service.title}</h1>
            <p>{service.desc}</p>
            <div className="product-info-meta"><div><span>طريقة الطلب</span><strong>عرض سعر</strong></div><div><span>المواصفات</span><strong>اختيارية</strong></div></div>
            <AddToCartButton id={service.id} title={service.title}/>
            <Link className="text-action" href={"/quote?service="+service.id}>أو اطلب عرض سعر مباشرة ←</Link>
          </div>
        </section>

        {!!specs.length && <section className="product-config-section"><ServiceConfigurator id={service.id} title={service.title} specs={specs}/></section>}

        {!!related.length && <section className="store-section related-app-section">
          <div className="store-section-head"><div><small>قد تحتاج أيضًا</small><h2>خدمات مشابهة</h2></div><Link href="/services">عرض الكل</Link></div>
          <div className="store-product-grid">{related.map(item=><ServiceCard key={item.id} item={item}/>)}</div>
        </section>}
      </div>
      <SiteFooter/>
    </main>
  );
}
