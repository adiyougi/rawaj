import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES, posts } from "@/lib/content";

export default function BlogPage() {
  return (
    <main>
      <SiteHeader />
      <InnerHero eyebrow="مدونة رواج" title="محتوى يبيع بالمعرفة." text="أدلة عملية ومقالات تساعد العميل على اختيار الخامة والتشطيب والحل المناسب قبل أن يبدأ الطلب." image={IMAGES.design} />
      <section className="section shell">
        <div className="filter-pills">{["الأحدث","الطباعة","التصميم","اللوحات","الواجهات","التسويق"].map((x)=><button key={x}>{x}</button>)}</div>
        <div className="post-grid">{posts.concat(posts).map((post,i)=><article className="post-card" key={i}><div style={{backgroundImage:"url("+post.image+")"}}></div><small>{post.tag}</small><h3>{post.title}</h3><span>اقرأ المقال ←</span></article>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
