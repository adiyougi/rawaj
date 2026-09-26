import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import ServiceCatalog from "@/components/ServiceCatalog";
import { IMAGES } from "@/lib/content";
import { getServices } from "@/lib/cms";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <SiteHeader />
      <InnerHero
        eyebrow="كتالوج رواج"
        title="اختر الخدمة كما تختار منتجًا."
        text="كتالوج قابل للتوسع: لكل خدمة صفحة مستقلة ومواصفات وخيارات، ويمكن جمع أكثر من خدمة في طلب واحد."
        image={IMAGES.design}
        action={{ label: "اطلب عرض سعر", href: "/quote" }}
      />
      <section className="section shell">
        <ServiceCatalog services={services} />
      </section>
      <SiteFooter />
    </main>
  );
}
