import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InnerHero from "@/components/InnerHero";
import { departments, IMAGES } from "@/lib/content";

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <InnerHero
        eyebrow="عن رواج"
        title="خبرة تصنع حضورًا بصريًا متكاملًا."
        text="منذ 2008، تعمل رواج في الطباعة والإعلان والديكور والحروف البارزة والليزر، وتجمع اليوم التصميم والمحتوى والطباعة الورقية ضمن تجربة واحدة."
        image={IMAGES.storefront}
        action={{label:"استكشف خدماتنا",href:"/services"}}
      />

      <section className="section shell inner-copy-grid">
        <div>
          <span className="eyebrow">قصتنا</span>
          <h2>من الفكرة إلى التنفيذ، تحت سقف خبرة واحدة.</h2>
        </div>
        <div>
          <p>تأسست رواج لتخدم المشروع من لحظة الفكرة حتى ظهوره أمام الجمهور. لذلك لا تتعامل مع التصميم والطباعة واللوحات والواجهات كخدمات منفصلة، بل كأجزاء من حضور بصري واحد.</p>
          <p>هذا التكامل هو ما يجعل العميل قادرًا على بدء مشروع صغير أو حملة أو واجهة متكاملة من نقطة واحدة، مع مرونة في الخامات والتقنيات وطريقة التنفيذ.</p>
        </div>
      </section>

      <section className="section shell metric-grid">
        <div><strong>2008</strong><span>بداية الرحلة</span></div>
        <div><strong>6+</strong><span>مسارات تخصصية مترابطة</span></div>
        <div><strong>360°</strong><span>من الفكرة إلى التنفيذ</span></div>
      </section>

      <section className="section about-values">
        <div className="shell">
          <div className="section-heading"><span className="eyebrow">ما الذي يقود العمل</span><h2>هدف. رؤية. رسالة.</h2></div>
          <div className="about-value-grid">
            <article><span>01</span><h3>الهدف</h3><p>تحويل احتياج العميل إلى حل بصري وتنفيذي واضح القيمة ويمكن قياس أثره في السوق.</p></article>
            <article><span>02</span><h3>الرؤية</h3><p>بناء تجربة متكاملة تجعل رواج نقطة مرجعية للحلول الإبداعية والإنتاجية تحت جهة واحدة.</p></article>
            <article><span>03</span><h3>الرسالة</h3><p>جودة دقيقة، حلول مناسبة، تنفيذ احترافي، والتزام ينعكس على كل تفصيلة في العمل النهائي.</p></article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">أقسام رواج</span><h2>خبرات متخصصة. نتيجة واحدة متماسكة.</h2></div>
          <p>كل قسم لديه طبيعته وخاماته وأسلوب إنتاجه، لكنها تلتقي جميعًا عند مشروع العميل.</p>
        </div>
        <div className="about-departments">
          {departments.map((department,index)=>(
            <article key={department.slug}>
              <span>0{index+1}</span>
              <div><h3>{department.title}</h3><p>{department.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell about-final-cta">
        <span className="eyebrow">لنبدأ</span>
        <h2>إذا كانت لديك فكرة، فلدينا أكثر من طريق لتحويلها إلى واقع.</h2>
        <div><Link className="btn btn-primary" href="/quote">اطلب عرض سعر</Link><Link className="btn outline-dark" href="/portfolio">شاهد أعمالنا</Link></div>
      </section>

      <SiteFooter />
    </main>
  );
}
