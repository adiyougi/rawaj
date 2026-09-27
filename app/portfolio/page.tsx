import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES } from "@/lib/content";
import { getPortfolio } from "@/lib/cms";
import type { Metadata } from "next";

export const metadata:Metadata={title:"معرض أعمال رواج",description:"نماذج من أعمال رواج في الطباعة والإعلان واللوحات والواجهات والتجهيز.",alternates:{canonical:"/portfolio"}};

export default async function PortfolioPage() {
  const portfolio = await getPortfolio();

  return (
    <main>
      <SiteHeader />
      <InnerHero
        eyebrow="معرض الأعمال"
        title="مشاريع صنعت أثرًا على الأرض."
        text="معرض مصنف للأعمال والمشاريع. كل بطاقة تقود إلى Case Study مستقل يمكن أن يجمع الصور والفيديو والتفاصيل ومراحل التنفيذ."
        image={IMAGES.neon}
        action={{label:"ابدأ مشروعًا مشابهًا",href:"/quote"}}
      />

      <section className="section shell">
        <div className="filter-pills">{["الكل","واجهات","لوحات","طباعة","تصميم","ليزر"].map((item)=><button key={item}>{item}</button>)}</div>
        <div className="portfolio-grid">
          {portfolio.map((item,index)=>(
            <Link
              href={"/portfolio/" + item.slug}
              className={index === 0 || index === 5 ? "portfolio-card wide" : "portfolio-card"}
              key={item.slug}
              style={{ backgroundImage:"linear-gradient(180deg,transparent,rgba(7,7,9,.88)),url("+item.image+")" }}
            >
              <span>{item.category} • {item.date}</span>
              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
