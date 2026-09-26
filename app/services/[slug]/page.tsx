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
  const dynamicSpecs=("specifications" in service && Array.isArray(service.specifications) && service.specifications.length)
    ? service.specifications
    : (serviceSpecifications[service.id] || []);
  const related=services.filter(item=>item.id!==service.id && item.category===service.category).slice(0,4);
  const description=("description" in service && typeof service.description==="string") ? service.description : "";
  const gallery=("gallery" in service && Array.isArray(service.gallery)) ? service.gallery.filter((item):item is string=>typeof item==="string" && item.length>0) : [];
  const highlights=("highlights" in service && Array.isArray(service.highlights)) ? service.highlights.filter((item):item is string=>typeof item==="string" && item.length>0) : [];
  const faq=("faq" in service && Array.isArray(service.faq))
    ? service.faq
        .map((item:any)=>({question:String(item?.question || item?.q || ""),answer:String(item?.answer || item?.a || "")}))
        .filter(item=>item.question && item.answer)
    : [];

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

        {(description || highlights.length>0) && <section className="product-rich-section">
          <article className="product-story-card">
            <small>عن الخدمة</small>
            <h2>{service.title}</h2>
            {description ? <p>{description}</p> : <p>{service.desc}</p>}
          </article>

          {!!highlights.length && <aside className="product-highlights-card">
            <small>نقاط مهمة</small>
            <h3>ما الذي يشمله الطلب؟</h3>
            <div className="product-highlights-list">
              {highlights.map((item,index)=><div key={item+index}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></div>)}
            </div>
          </aside>}
        </section>}

        {!!gallery.length && <section className="product-gallery-section">
          <div className="store-section-head"><div><small>التفاصيل البصرية</small><h2>صور الخدمة</h2></div><span>{gallery.length} صورة</span></div>
          <div className="product-gallery-strip">
            {gallery.map((image,index)=><figure key={image+index} style={{backgroundImage:"url("+image+")"}}><span>{String(index+1).padStart(2,"0")}</span></figure>)}
          </div>
        </section>}

        {!!dynamicSpecs.length && <section className="product-config-section"><ServiceConfigurator id={service.id} title={service.title} specs={dynamicSpecs}/></section>}

        {!!faq.length && <section className="product-faq-section">
          <div className="store-section-head"><div><small>قبل إرسال الطلب</small><h2>أسئلة شائعة</h2></div></div>
          <div className="product-faq-list">
            {faq.map((item,index)=><details key={item.question+index}><summary><span>{String(index+1).padStart(2,"0")}</span><strong>{item.question}</strong><b>+</b></summary><p>{item.answer}</p></details>)}
          </div>
        </section>}

        {!!related.length && <section className="store-section related-app-section">
          <div className="store-section-head"><div><small>قد تحتاج أيضًا</small><h2>خدمات مشابهة</h2></div><Link href="/services">عرض الكل</Link></div>
          <div className="store-product-grid">{related.map(item=><ServiceCard key={item.id} item={item}/>)}</div>
        </section>}
      </div>
      <SiteFooter/>
    </main>
  );
}
