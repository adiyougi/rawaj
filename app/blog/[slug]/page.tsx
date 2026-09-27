import Link from "next/link";
import {notFound} from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {getPosts} from "@/lib/cms";
import type {Metadata} from "next";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const post=(await getPosts()).find(x=>x.slug===slug);
  return post?{title:post.seoTitle,description:post.seoDescription,alternates:{canonical:"/blog/"+slug},openGraph:{title:post.seoTitle,description:post.seoDescription,images:post.image?[post.image]:[]}}:{title:"المقال غير موجود"};
}

export default async function BlogPostPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const posts=await getPosts();
  const post=posts.find(item=>item.slug===slug);
  if(!post)notFound();
  const related=posts.filter(item=>item.slug!==post.slug).sort((a,b)=>Number(b.tag===post.tag)-Number(a.tag===post.tag)).slice(0,2);

  return <main>
    <SiteHeader/>
    <article className="article-page">
      <header className="article-hero" style={{backgroundImage:"linear-gradient(180deg,rgba(5,5,7,.18),rgba(5,5,7,.9)),url("+post.image+")"}}>
        <div className="shell">
          <span className="eyebrow">{post.tag}</span><h1>{post.title}</h1>
          <div className="article-meta">{post.date&&<span>{post.date}</span>}<span>{post.readTime}</span><span>{post.authorName}</span></div>
        </div>
      </header>
      <div className="shell article-layout">
        <div className="article-body">
          <p className="article-lead">{post.excerpt}</p>
          {post.body.map((paragraph,index)=><p key={index}>{paragraph}</p>)}
          <div className="article-cta"><span className="eyebrow">هل لديك مشروع مشابه؟</span><h2>حوّل المعرفة إلى قرار وتنفيذ.</h2><Link className="btn btn-primary" href="/quote">اطلب عرض سعر</Link></div>
        </div>
        <aside className="article-aside">
          <span>التصنيف</span><strong>{post.tag}</strong>
          <span>الكاتب</span><strong>{post.authorName}</strong>
          <span>مدة القراءة</span><strong>{post.readTime}</strong>
          {post.tags.length>0&&<><span>وسوم</span><div className="article-tags">{post.tags.map(tag=><b key={tag}>{tag}</b>)}</div></>}
          <Link href="/blog">العودة إلى المدونة ←</Link>
        </aside>
      </div>
    </article>
    {!!related.length&&<section className="section shell">
      <div className="section-heading"><span className="eyebrow">اقرأ أيضًا</span><h2>مقالات مرتبطة.</h2></div>
      <div className="post-grid">{related.map(item=><Link className="post-card" href={"/blog/"+item.slug} key={item.slug}>
        <div style={{backgroundImage:"url("+item.image+")"}}/><small>{item.tag}</small><h3>{item.title}</h3><span>اقرأ المقال ←</span>
      </Link>)}</div>
    </section>}
    <SiteFooter/>
  </main>;
}
