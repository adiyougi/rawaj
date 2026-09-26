import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES } from "@/lib/content";
import { getDepartments } from "@/lib/cms";

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <main>
      <SiteHeader />
      <InnerHero
        eyebrow="أقسام رواج"
        title="تخصصات مختلفة. تجربة واحدة."
        text="استكشف أقسام المؤسسة كما تعمل فعليًا: كل قسم يملك خدماته وتقنياته، ويمكن دمج خدمات أكثر من قسم داخل مشروع واحد."
        image={IMAGES.storefront}
        action={{label:"استكشف الخدمات",href:"/services"}}
      />

      <section className="section shell department-index-grid">
        {departments.map((department,index)=>(
          <Link
            href={"/departments/" + department.slug}
            className="department-index-card"
            key={department.slug}
            style={{backgroundImage:"linear-gradient(180deg,rgba(5,5,7,.08),rgba(5,5,7,.9)),url("+department.image+")"}}
          >
            <span>0{index+1}</span>
            <div>
              <h2>{department.title}</h2>
              <p>{department.text}</p>
              <strong>دخول القسم ↗</strong>
            </div>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
