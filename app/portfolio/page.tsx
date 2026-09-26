import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES, portfolio } from "@/lib/content";

export default function PortfolioPage() {
  return (
    <main>
      <SiteHeader />
      <InnerHero eyebrow="معرض الأعمال" title="مشاريع صنعت أثرًا على الأرض." text="معرض مصنف للصور والفيديوهات والمشاريع المنفذة، وسيكون لاحقًا مرتبطًا ببيانات كل مشروع وتاريخه وتصنيفه." image={IMAGES.neon} action={{label:"ابدأ مشروعًا مشابهًا",href:"/quote"}} />
      <section className="section shell">
        <div className="filter-pills">{["الكل","واجهات","لوحات","طباعة","تصميم","ليزر"].map((x)=><button key={x}>{x}</button>)}</div>
        <div className="portfolio-grid">
          {portfolio.concat(portfolio).map((item,i)=><article className={i % 5 === 0 ? "portfolio-card wide" : "portfolio-card"} key={i} style={{ backgroundImage:"linear-gradient(180deg,transparent,rgba(7,7,9,.88)),url("+item.image+")" }}><span>{item.category}</span><h3>{item.title}</h3></article>)}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
