import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { IMAGES } from "@/lib/content";

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <InnerHero eyebrow="عن رواج" title="خبرة تصنع حضورًا بصريًا متكاملًا." text="منذ 2008، تعمل رواج في الطباعة والإعلان والديكور والحروف البارزة والليزر، وتجمع اليوم التصميم والمحتوى والطباعة الورقية ضمن تجربة واحدة." image={IMAGES.storefront} action={{label:"استكشف خدماتنا",href:"/services"}} />
      <section className="section shell inner-copy-grid">
        <div><span className="eyebrow">قصتنا</span><h2>لسنا مجرد جهة تنفيذ.</h2></div>
        <div><p>ننظر إلى كل مشروع باعتباره نقطة التقاء بين الفكرة والخامة والمكان والعميل النهائي. لهذا تُبنى تجربة رواج على فهم الهدف أولًا، ثم اختيار الحل، ثم التنفيذ بأفضل صورة ممكنة.</p><p>هذه الصفحة ستتوسع لاحقًا لتعرض المدير العام، الرؤية والرسالة، الخط الزمني، الدليل التعريفي، وقدرات كل قسم بالتفصيل.</p></div>
      </section>
      <section className="section shell metric-grid">
        <div><strong>2008</strong><span>بداية الرحلة</span></div>
        <div><strong>6+</strong><span>مسارات تخصصية</span></div>
        <div><strong>360°</strong><span>من الفكرة إلى التنفيذ</span></div>
      </section>
      <SiteFooter />
    </main>
  );
}
