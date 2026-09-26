import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import ServiceCatalog from "@/components/ServiceCatalog";
import { IMAGES } from "@/lib/content";

export default function ServicesPage() {
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
        <ServiceCatalog />
      </section>
      <SiteFooter />
    </main>
  );
}
