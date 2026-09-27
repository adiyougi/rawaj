import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES } from "@/lib/content";
import { getPackages } from "@/lib/cms";
import type { Metadata } from "next";

export const metadata:Metadata={title:"الباقات",description:"باقات رواج تجمع خدمات الطباعة والإعلان والتجهيز في طلب عرض سعر واحد قابل للتخصيص.",alternates:{canonical:"/packages"}};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <main>
      <SiteHeader />
      <InnerHero
        eyebrow="الباقات والعروض"
        title="أكثر من خدمة. طلب واحد أذكى."
        text="الباقة ليست منتجًا منفصلًا عن الكتالوج؛ إنها تجميع ذكي لعدة خدمات في طلب واحد قابل للتخصيص."
        image={IMAGES.cards}
        action={{label:"اطلب باقة مخصصة",href:"/quote"}}
      />

      <section className="section shell">
        <div className="package-page-grid">
          {packages.map((item,index)=>(
            <article key={item.id} className="package-page-card" style={{backgroundImage:"url("+item.image+")"}}>
              <span>0{index+1}</span>
              <div>
                <small>{item.eyebrow}</small>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <ul className="package-items">{item.items.map((service)=><li key={service}>{service}</li>)}</ul>
                <Link href={"/quote?package="+item.id} className="btn btn-light">خصص هذه الباقة</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
