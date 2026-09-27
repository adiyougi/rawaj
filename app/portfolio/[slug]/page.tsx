import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPortfolio } from "@/lib/cms";
import type { Metadata } from "next";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const project=(await getPortfolio()).find(x=>x.slug===slug);return project?{title:project.title,description:project.summary,alternates:{canonical:"/portfolio/"+slug},openGraph:{title:project.title,description:project.summary,images:project.image?[project.image]:[]}}:{title:"العمل غير موجود"};}

export default async function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = await getPortfolio();
  const project = portfolio.find((item) => item.slug === slug);
  if (!project) notFound();

  const related = portfolio.filter((item) => item.slug !== project.slug).slice(0, 3);
  const videoIsFile=/\.(mp4|webm)(\?.*)?$/i.test(project.videoUrl);

  return (
    <main>
      <SiteHeader />
      <section className="case-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(5,5,7,.08),rgba(5,5,7,.84)),url(" + project.image + ")" }}>
        <div className="shell case-hero-copy">
          <span className="eyebrow">{project.category}</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="case-meta">{project.date&&<span>{project.date}</span>}{project.clientName&&<span>{project.clientName}</span>}<span>{project.category}</span></div>
        </div>
      </section>

      <section className="section shell case-study">
        <div>
          <span className="eyebrow">عن العمل</span>
          <h2>{project.description?"تفاصيل المشروع.":"عمل من معرض رواج."}</h2>
          {project.description&&<div className="case-description">{project.description.split(/\n+/).filter(Boolean).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>}
          {!project.description&&project.summary&&<p>{project.summary}</p>}
        </div>
        <div className="case-services">
          <span>الخدمات المرتبطة</span>
          {project.services.length?project.services.map((service) => <strong key={service}>{service}</strong>):<small>لم تُحدد الخدمات المرتبطة بهذا العمل بعد.</small>}
          <Link className="btn btn-primary" href="/quote">ابدأ مشروعًا مشابهًا</Link>
        </div>
      </section>

      {!!project.gallery.length&&<section className="section case-gallery-section">
        <div className="shell">
          <div className="section-heading"><span className="eyebrow">صور المشروع</span><h2>تفاصيل من التنفيذ.</h2></div>
          <div className="case-gallery">{project.gallery.map((image,index)=><figure key={image+"-"+index}><img src={image} alt={project.title+" — صورة "+(index+1)} loading="lazy"/></figure>)}</div>
        </div>
      </section>}

      {project.videoUrl&&<section className="section shell case-video-section">
        <div><span className="eyebrow">فيديو المشروع</span><h2>شاهد العمل.</h2></div>
        {videoIsFile?<video controls preload="metadata" src={project.videoUrl}/>:<a className="btn btn-primary" href={project.videoUrl} target="_blank" rel="noreferrer">فتح فيديو المشروع ↗</a>}
      </section>}

      {!!related.length&&<section className="section related-services">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><span className="eyebrow">أعمال أخرى</span><h2>استكشف المزيد.</h2></div>
            <Link className="text-link" href="/portfolio">معرض الأعمال ←</Link>
          </div>
          <div className="portfolio-grid">
            {related.map((item) => (
              <Link
                className="portfolio-card"
                href={"/portfolio/" + item.slug}
                key={item.slug}
                style={{ backgroundImage: "linear-gradient(180deg,transparent,rgba(7,7,9,.88)),url(" + item.image + ")" }}
              >
                <span>{item.category}</span><h3>{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>}
      <SiteFooter />
    </main>
  );
}
