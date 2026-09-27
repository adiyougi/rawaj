import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES } from "@/lib/content";
import { getPortfolio } from "@/lib/cms";
import type { Metadata } from "next";

export const metadata:Metadata={title:"معرض أعمال رواج",description:"نماذج من أعمال رواج في الطباعة والإعلان واللوحات والواجهات والتجهيز.",alternates:{canonical:"/portfolio"}};

export default async function PortfolioPage({searchParams}:{searchParams:Promise<{category?:string}>}) {
  const portfolio = await getPortfolio();
  const {category=""}=await searchParams;
  const categories=Array.from(new Set(portfolio.map(item=>item.category).filter(Boolean)));
  const selected=categories.includes(category)?category:"";
  const visible=selected?portfolio.filter(item=>item.category===selected):portfolio;

  return (
    <main>
      <SiteHeader />
      <InnerHero
        eyebrow="معرض الأعمال"
        title="مشاريع صنعت أثرًا على الأرض."
        text="أعمال رواج المنشورة كما هي في لوحة التحكم، مصنفة بحسب نوع المشروع والخدمة."
        image={IMAGES.neon}
        action={{label:"ابدأ مشروعًا مشابهًا",href:"/quote"}}
      />

      <section className="section shell">
        <div className="filter-pills portfolio-filters" aria-label="تصفية معرض الأعمال">
          <Link className={!selected?"active":""} href="/portfolio">الكل</Link>
          {categories.map(item=><Link className={selected===item?"active":""} href={"/portfolio?category="+encodeURIComponent(item)} key={item}>{item}</Link>)}
        </div>
        <div className="portfolio-grid">
          {visible.map((item,index)=>(
            <Link
              href={"/portfolio/" + item.slug}
              className={index === 0 || index === 5 ? "portfolio-card wide" : "portfolio-card"}
              key={item.slug}
              style={{ backgroundImage:"linear-gradient(180deg,transparent,rgba(7,7,9,.88)),url("+item.image+")" }}
            >
              <span>{item.category}{item.date ? " • "+item.date : ""}</span>
              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
        {!visible.length&&<div className="portfolio-empty"><strong>لا توجد أعمال منشورة في هذا التصنيف بعد.</strong><Link href="/portfolio">عرض كل الأعمال</Link></div>}
      </section>
      <SiteFooter />
    </main>
  );
}
