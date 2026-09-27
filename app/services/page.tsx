import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceCatalog from "@/components/ServiceCatalog";
import { getServices } from "@/lib/cms";
import type { Metadata } from "next";

export const metadata:Metadata={title:"كتالوج الخدمات",description:"استكشف خدمات رواج للطباعة والإعلان واللوحات والتغليف والمعارض والتخصيص، وحدد المواصفات لطلب عرض سعر.",alternates:{canonical:"/services"}};

export default async function ServicesPage({searchParams}:{searchParams:Promise<{q?:string}>}){
  const [services,params]=await Promise.all([getServices(),searchParams]);
  return (
    <main className="app-storefront">
      <SiteHeader/>
      <div className="page-app-shell">
        <header className="catalog-page-head">
          <span>كتالوج رواج</span>
          <h1>كل الخدمات في مكان واحد.</h1>
          <p>ابحث، صفِّ النتائج، افتح تفاصيل الخدمة وحدد المواصفات التي تحتاجها.</p>
        </header>
        <ServiceCatalog services={services} initialQuery={params.q || ""}/>
      </div>
      <SiteFooter/>
    </main>
  );
}
