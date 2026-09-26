import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES } from "@/lib/content";
import { getPosts } from "@/lib/cms";

export default async function BlogPage() {
  const posts = await getPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main>
      <SiteHeader />
      <InnerHero
        eyebrow="مدونة رواج"
        title="محتوى يبيع بالمعرفة."
        text="أدلة عملية ومقالات تساعد العميل على اختيار الخامة والتشطيب والحل المناسب قبل أن يبدأ الطلب."
        image={IMAGES.design}
      />

      <section className="section shell">
        <div className="filter-pills">{["الأحدث","الطباعة","التصميم","اللوحات","الواجهات","التسويق"].map((item)=><button key={item}>{item}</button>)}</div>

        {featured && (
          <Link className="featured-post" href={"/blog/" + featured.slug}>
            <div className="featured-post-media" style={{backgroundImage:"url("+featured.image+")"}} />
            <div className="featured-post-copy">
              <span className="eyebrow">مقال مميز</span>
              <small>{featured.tag} • {featured.readTime}</small>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <strong>اقرأ المقال ←</strong>
            </div>
          </Link>
        )}

        <div className="post-grid blog-grid">
          {rest.map((post)=>(
            <Link className="post-card" href={"/blog/" + post.slug} key={post.slug}>
              <div style={{backgroundImage:"url("+post.image+")"}} />
              <small>{post.tag} • {post.readTime}</small>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span>اقرأ المقال ←</span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
