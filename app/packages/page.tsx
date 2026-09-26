import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES, packages } from "@/lib/content";

export default function PackagesPage() {
  return (
    <main>
      <SiteHeader />
      <InnerHero eyebrow="الباقات والعروض" title="أكثر من خدمة. صفقة واحدة أذكى." text="باقات تجمع خدمات متكاملة يمكن تخصيصها حسب نوع المشروع والميزانية، بدل شراء كل خدمة بمعزل عن الأخرى." image={IMAGES.cards} action={{label:"اطلب باقة مخصصة",href:"/quote"}} />
      <section className="section shell">
        <div className="package-page-grid">
          {packages.map((item,index)=>(
            <article key={item.title} className="package-page-card" style={{backgroundImage:"linear-gradient(180deg,rgba(8,8,10,.08),rgba(8,8,10,.9)),url("+item.image+")"}}>
              <span>0{index+1}</span>
              <div><small>{item.eyebrow}</small><h2>{item.title}</h2><p>{item.text}</p><Link href="/quote" className="btn btn-light">خصص هذه الباقة</Link></div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
