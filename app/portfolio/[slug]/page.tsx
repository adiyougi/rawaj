import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPortfolio } from "@/lib/cms";

export default async function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = await getPortfolio();
  const project = portfolio.find((item) => item.slug === slug);
  if (!project) notFound();

  const related = portfolio.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <main>
      <SiteHeader />
      <section className="case-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(5,5,7,.08),rgba(5,5,7,.84)),url(" + project.image + ")" }}>
        <div className="shell case-hero-copy">
          <span className="eyebrow">{project.category}</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="case-meta"><span>{project.date}</span><span>{project.category}</span></div>
        </div>
      </section>

      <section className="section shell case-study">
        <div>
          <span className="eyebrow">عن العمل</span>
          <h2>التفاصيل التي تصنع الفرق.</h2>
          <p>{project.summary}</p>
          <p>ستستوعب هذه الصفحة الصور والفيديو، قبل/بعد، وصف التنفيذ، الخامات، ومراحل العمل فور إدخال مواد المشروع الحقيقية في معرض رواج.</p>
        </div>
        <div className="case-services">
          <span>الخدمات المرتبطة</span>
          {project.services.map((service) => <strong key={service}>{service}</strong>)}
          <Link className="btn btn-primary" href="/quote">ابدأ مشروعًا مشابهًا</Link>
        </div>
      </section>

      <section className="section related-services">
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
      </section>
      <SiteFooter />
    </main>
  );
}
