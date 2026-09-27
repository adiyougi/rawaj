import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceCard from "@/components/ServiceCard";
import { getDepartmentDetail } from "@/lib/cms";
import type { Metadata } from "next";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const data=await getDepartmentDetail(slug);if(!data)return {title:"القسم غير موجود"};const description=("description" in data.department?data.department.description:data.department.text)||"";return {title:data.department.title,description,alternates:{canonical:"/departments/"+slug},openGraph:{title:data.department.title,description,images:data.department.image?[data.department.image]:[]}};}

export default async function DepartmentPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const data=await getDepartmentDetail(slug);
  if(!data) notFound();
  const {department,services}=data;

  return (
    <main className="app-storefront">
      <SiteHeader/>
      <section className="department-hero" style={{backgroundImage:"linear-gradient(90deg,rgba(10,10,12,.82),rgba(10,10,12,.12)),url("+department.image+")"}}>
        <div className="shell">
          <span className="eyebrow">أقسام رواج</span>
          <h1>{department.title}</h1>
          <p>{"description" in department ? department.description : department.text}</p>
          <div className="hero-actions"><Link className="btn btn-light" href="/services">استكشف الخدمات</Link><Link className="btn btn-ghost" href="/departments">جميع الأقسام</Link></div>
        </div>
      </section>
      <section className="section shell">
        <div className="store-section-head">
          <div><small>خدمات القسم</small><h2>اختر ما يناسب مشروعك</h2></div>
          <Link href="/services">الكتالوج الكامل</Link>
        </div>
        {services.length ? <div className="store-product-grid">{services.map(item=><ServiceCard key={item.id} item={item}/>)}</div> :
        <div className="catalog-empty"><h3>نعمل على إدراج كتالوج هذا القسم.</h3><p>يمكنك حاليًا إرسال طلب مخصص.</p><Link className="btn btn-primary" href="/quote">اطلب خدمة مخصصة</Link></div>}
      </section>
      <SiteFooter/>
    </main>
  );
}
