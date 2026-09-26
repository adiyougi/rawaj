import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { posts } from "@/lib/content";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <main>
      <SiteHeader />
      <article className="article-page">
        <header className="article-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(5,5,7,.18),rgba(5,5,7,.9)),url(" + post.image + ")" }}>
          <div className="shell">
            <span className="eyebrow">{post.tag}</span>
            <h1>{post.title}</h1>
            <div className="article-meta"><span>{post.date}</span><span>{post.readTime}</span><span>مدونة رواج</span></div>
          </div>
        </header>

        <div className="shell article-layout">
          <div className="article-body">
            <p className="article-lead">{post.excerpt}</p>
            {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="article-cta">
              <span className="eyebrow">هل لديك مشروع مشابه؟</span>
              <h2>حوّل المعرفة إلى قرار وتنفيذ.</h2>
              <Link className="btn btn-primary" href="/quote">اطلب عرض سعر</Link>
            </div>
          </div>
          <aside className="article-aside">
            <span>المقال</span>
            <strong>{post.tag}</strong>
            <span>مدة القراءة</span>
            <strong>{post.readTime}</strong>
            <Link href="/blog">العودة إلى المدونة ←</Link>
          </aside>
        </div>
      </article>

      {!!related.length && (
        <section className="section shell">
          <div className="section-heading"><span className="eyebrow">اقرأ أيضًا</span><h2>مقالات مرتبطة.</h2></div>
          <div className="post-grid">
            {related.map((item) => (
              <Link className="post-card" href={"/blog/" + item.slug} key={item.slug}>
                <div style={{ backgroundImage: "url(" + item.image + ")" }} />
                <small>{item.tag}</small><h3>{item.title}</h3><span>اقرأ المقال ←</span>
              </Link>
            ))}
          </div>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
