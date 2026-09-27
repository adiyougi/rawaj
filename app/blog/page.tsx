import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES } from "@/lib/content";
import { getPosts } from "@/lib/cms";
import type { Metadata } from "next";

export const metadata:Metadata={title:"مدونة رواج",description:"أدلة عملية عن الطباعة والخامات والتشطيبات واللوحات والهوية والإنتاج.",alternates:{canonical:"/blog"}};

export default async function BlogPage({searchParams}:{searchParams:Promise<{category?:string}>}) {
  const posts=await getPosts();
  const {category=""}=await searchParams;
  const categories=Array.from(new Set(posts.map(post=>post.tag).filter(Boolean)));
  const selected=categories.includes(category)?category:"";
  const visible=selected?posts.filter(post=>post.tag===selected):posts;
  const featured=visible.find(post=>post.featured)||visible[0];
  const rest=visible.filter(post=>post.slug!==featured?.slug);

  return <main>
    <SiteHeader/>
    <InnerHero eyebrow="مدونة رواج" title="محتوى يبيع بالمعرفة." text="أدلة ومقالات منشورة من رواج تساعد على فهم الخامات والتشطيبات والإنتاج قبل الطلب." image={IMAGES.design}/>
    <section className="section shell">
      <div className="filter-pills blog-filters" aria-label="تصفية المقالات">
        <Link className={!selected?"active":""} href="/blog">الأحدث</Link>
        {categories.map(item=><Link className={selected===item?"active":""} href={"/blog?category="+encodeURIComponent(item)} key={item}>{item}</Link>)}
      </div>
      {featured&&<Link className="featured-post" href={"/blog/"+featured.slug}>
        <div className="featured-post-media" style={{backgroundImage:"url("+featured.image+")"}}/>
        <div className="featured-post-copy">
          <span className="eyebrow">{featured.featured?"مقال مميز":"أحدث مقال"}</span>
          <small>{featured.tag} • {featured.readTime}</small>
          <h2>{featured.title}</h2><p>{featured.excerpt}</p><strong>اقرأ المقال ←</strong>
        </div>
      </Link>}
      <div className="post-grid blog-grid">{rest.map(post=><Link className="post-card" href={"/blog/"+post.slug} key={post.slug}>
        <div style={{backgroundImage:"url("+post.image+")"}}/><small>{post.tag} • {post.readTime}</small><h3>{post.title}</h3><p>{post.excerpt}</p><span>اقرأ المقال ←</span>
      </Link>)}</div>
      {!visible.length&&<div className="portfolio-empty"><strong>لا توجد مقالات منشورة في هذا التصنيف.</strong><Link href="/blog">عرض كل المقالات</Link></div>}
    </section>
    <SiteFooter/>
  </main>;
}
