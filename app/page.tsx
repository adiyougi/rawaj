"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import { CONTACT, departments, IMAGES, packages, portfolio, posts, services } from "@/lib/content";

const slides = [
  {
    kicker: "رواج منذ 2008",
    title: "نحوّل الفكرة إلى حضور لا يُنسى.",
    text: "تصميم، طباعة، إعلان وديكور — بخبرة تنفيذية تبدأ من الفكرة ولا تنتهي إلا عندما يكتمل المشهد.",
    image: IMAGES.storefront,
    href: "/about",
    cta: "اكتشف رواج"
  },
  {
    kicker: "كتالوج خدمات متكامل",
    title: "كل ما تحتاجه علامتك. في مكان واحد.",
    text: "اختر الخدمة كمنتج، افتح تفاصيلها، حدّد المواصفات إن رغبت، واجمع أكثر من خدمة في طلب واحد.",
    image: IMAGES.design,
    href: "/services",
    cta: "استكشف الخدمات"
  },
  {
    kicker: "أعمال تتحدث",
    title: "ما نصنعه يُرى قبل أن يُشرح.",
    text: "واجهات، لوحات، مطبوعات، هوية وأعمال خاصة — شاهد نماذج مختارة من عالم رواج.",
    image: IMAGES.neon,
    href: "/portfolio",
    cta: "شاهد الأعمال"
  },
  {
    kicker: "باقات تسويقية",
    title: "أكثر من خدمة. صفقة واحدة.",
    text: "باقات قابلة للتخصيص تجمع التصميم والطباعة والتنفيذ في عرض واحد أكثر وضوحًا وقيمة.",
    image: IMAGES.cards,
    href: "/packages",
    cta: "استكشف الباقات"
  }
];

export default function Home() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide((current) => (current + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <SiteHeader />

      <section className="hero" aria-label="السلايدر الرئيسي">
        {slides.map((item, index) => (
          <article
            key={item.title}
            className={index === slide ? "hero-slide active" : "hero-slide"}
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(7,7,9,.18), rgba(7,7,9,.82)), url(" + item.image + ")"
            }}
          >
            <div className="hero-noise" />
            <div className="hero-content shell">
              <span className="eyebrow">{item.kicker}</span>
              <h1>{item.title}</h1>
              <p>{item.text}</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href={item.href}>{item.cta}<span>↗</span></Link>
                <Link className="btn btn-ghost" href="/quote">اطلب عرض سعر</Link>
              </div>
            </div>
          </article>
        ))}

        <div className="hero-controls shell">
          <div className="slide-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={index === slide ? "active" : ""}
                onClick={() => setSlide(index)}
                aria-label={"الشريحة " + (index + 1)}
              />
            ))}
          </div>
          <span className="slide-counter">0{slide + 1} / 0{slides.length}</span>
        </div>

        <div className="hero-edge-copy">RAWAJ / PRINT / ADVERTISING / DECORATION</div>
      </section>

      <div className="marquee" aria-label="شريط رواج">
        <div className="marquee-track">
          {[
            "تصميم فني",
            "صناعة محتوى",
            "طباعة ورقية",
            "طباعة رقمية",
            "لوحات ضوئية",
            "واجهات",
            "حروف بارزة",
            "ليزر وأكريليك",
            "باقات مخصصة",
            "تنفيذ متكامل",
            "تصميم فني",
            "صناعة محتوى",
            "طباعة ورقية",
            "طباعة رقمية"
          ].map((item, index) => <span key={index}>{item}<b>◆</b></span>)}
        </div>
      </div>

      <section className="about-section section shell">
        <div className="section-heading">
          <span className="eyebrow">من نحن</span>
          <h2>خبرة تتقاطع فيها الفكرة مع الصناعة.</h2>
        </div>

        <div className="about-grid">
          <div className="about-visual">
            <div className="about-card-image" style={{ backgroundImage: "url(" + IMAGES.print + ")" }} />
            <div className="year-badge"><strong>2008</strong><span>منذ</span></div>
          </div>

          <div className="about-copy">
            <p className="lead">رواج للطباعة والإعلان والديكور تجمع التصميم والإنتاج والتنفيذ في مسار واحد، لتمنح العميل نتيجة متماسكة لا مجموعة خدمات منفصلة.</p>
            <div className="vision-grid">
              <div><span>01</span><h3>الهدف</h3><p>تحويل احتياج العميل إلى منتج بصري وتنفيذي واضح القيمة.</p></div>
              <div><span>02</span><h3>الرؤية</h3><p>أن تكون رواج نقطة مرجعية للحلول الإبداعية والتنفيذية المتكاملة.</p></div>
              <div><span>03</span><h3>الرسالة</h3><p>جودة دقيقة، تنفيذ احترافي، والتزام بمواعيد الإنجاز.</p></div>
            </div>
            <div className="inline-actions">
              <Link className="text-link" href="/about">تعرف على رواج ←</Link>
              <Link className="text-link muted" href="/about">الدليل التعريفي الشامل ←</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="departments" className="departments section">
        <div className="shell section-heading split-heading">
          <div><span className="eyebrow">أقسام رواج</span><h2>خبرات متخصصة تعمل كمنظومة واحدة.</h2></div>
          <p>قسم واضح لكل مجال، لكن العميل يستطيع جمع أكثر من مجال في مشروع أو طلب واحد.</p>
        </div>

        <div className="department-rail">
          {departments.map((item, index) => (
            <article
              className="department-card"
              key={item.title}
              style={{
                backgroundImage:
                  "linear-gradient(180deg, transparent 20%, rgba(7,7,9,.94) 94%), url(" + item.image + ")"
              }}
            >
              <span>0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href="/services">استكشف خدمات القسم ↗</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="services-section section shell">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">متجر الخدمات</span><h2>اختر الخدمة كما تختار منتجًا.</h2></div>
          <div>
            <p>كل بطاقة خدمة تقود إلى صفحة تفصيلية، ويمكن جمع عدة خدمات في سلة طلب واحدة وإرسالها إلى رواج عبر واتساب.</p>
            <Link className="text-link" href="/services">الكتالوج الكامل ←</Link>
          </div>
        </div>

        <div className="service-grid">
          {services.slice(0, 8).map((item) => (
            <article className="service-card" key={item.id}>
              <Link
                href={"/services/" + item.id}
                className="service-media"
                style={{ backgroundImage: "url(" + item.image + ")" }}
              >
                <span>{item.badge}</span>
              </Link>
              <div className="service-body">
                <small>{item.category}</small>
                <Link href={"/services/" + item.id}><h3>{item.title}</h3></Link>
                <p>{item.desc}</p>
                <AddToCartButton id={item.id} title={item.title} compact />
                <Link className="catalog-link" href={"/services/" + item.id}>التفاصيل والمواصفات ←</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="packages" className="packages-section section">
        <div className="shell section-heading split-heading">
          <div><span className="eyebrow">باقات مخصصة</span><h2>صفقة واحدة. أثر أكبر.</h2></div>
          <div><p>نربط أكثر من خدمة في باقة واحدة قابلة للتخصيص، لتصبح العرض التسويقي نفسه جزءًا من تجربة الموقع.</p><Link className="text-link" href="/packages">جميع الباقات ←</Link></div>
        </div>

        <div className="package-rail shell">
          {packages.map((item, index) => (
            <article
              className="package-card"
              key={item.title}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(8,8,10,.96), rgba(8,8,10,.24)), url(" + item.image + ")"
              }}
            >
              <span className="package-index">0{index + 1}</span>
              <div>
                <small>{item.eyebrow}</small>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link className="btn btn-light" href="/packages">استكشف الباقة</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="features section shell">
        <div className="section-heading"><span className="eyebrow">لماذا رواج</span><h2>قيمة تُرى في النتيجة.</h2></div>
        <div className="feature-grid">
          {[
            ["01", "حل متكامل", "تصميم وإنتاج وتنفيذ ضمن تجربة واحدة."],
            ["02", "خبرة عملية", "خبرة ممتدة منذ 2008 ومشاريع في قطاعات متنوعة."],
            ["03", "مرونة عالية", "حلول قابلة للتخصيص بدل القوالب الجاهزة."],
            ["04", "جودة تنفيذ", "تفاصيل إنتاج وتشطيب ترفع قيمة العمل."],
            ["05", "التزام", "وضوح في المراحل ومواعيد الإنجاز."],
            ["06", "تنوع تقني", "طباعة، لوحات، واجهات، ليزر وأكثر."]
          ].map((feature) => (
            <div className="feature-card" key={feature[0]}>
              <span>{feature[0]}</span><h3>{feature[1]}</h3><p>{feature[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-section section">
        <div className="shell section-heading split-heading">
          <div><span className="eyebrow">أعمال نفخر بإنجازها</span><h2>حين يصبح التنفيذ جزءًا من الهوية.</h2></div>
          <Link className="text-link" href="/portfolio">شاهد جميع الأعمال ←</Link>
        </div>

        <div className="portfolio-grid shell">
          {portfolio.map((item, index) => (
            <Link
              href="/portfolio"
              className={index === 0 || index === 5 ? "portfolio-card wide" : "portfolio-card"}
              key={item.title}
              style={{
                backgroundImage:
                  "linear-gradient(180deg, transparent, rgba(7,7,9,.86)), url(" + item.image + ")"
              }}
            >
              <span>{item.category}</span><h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="clients section shell">
        <div className="section-heading"><span className="eyebrow">عملاء نعتز بهم</span><h2>الثقة هي أفضل إعلان.</h2></div>

        <div className="logo-loop">
          <div className="logo-loop-track">
            {[
              "بنك الكريمي الإسلامي",
              "بنك الأمل",
              "الجامعة اليمنية",
              "النادي الترفيهي",
              "مؤسسات صحية",
              "جامعات ومراكز",
              "شركات تجارية",
              "علامات محلية",
              "بنك الكريمي الإسلامي",
              "بنك الأمل",
              "الجامعة اليمنية"
            ].map((client, index) => <span key={index}>{client}</span>)}
          </div>
        </div>

        <div className="testimonial-grid">
          <blockquote><span>“</span><p>قريبًا سنعرض هنا شهادات حقيقية موثقة من عملاء رواج بدل أي نصوص دعائية مصطنعة.</p><footer>شهادات العملاء</footer></blockquote>
          <blockquote><span>“</span><p>سنربط كل شهادة بالعميل أو المشروع عند توفر المادة المعتمدة، لتكون الثقة مبنية على أعمال حقيقية.</p><footer>قسم قابل للتحديث</footer></blockquote>
        </div>
      </section>

      <section className="journal section shell">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">من مدونة رواج</span><h2>محتوى يساعد العميل على اتخاذ قرار أفضل.</h2></div>
          <Link className="text-link" href="/blog">كل المقالات ←</Link>
        </div>

        <div className="post-grid">
          {posts.map((post) => (
            <Link className="post-card" href="/blog" key={post.title}>
              <div style={{ backgroundImage: "url(" + post.image + ")" }} />
              <small>{post.tag}</small>
              <h3>{post.title}</h3>
              <span>اقرأ المقال ←</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-teaser section">
        <div className="shell contact-panel">
          <div>
            <span className="eyebrow">اتصل بنا</span>
            <h2>لديك مشروع؟ ابدأ المحادثة.</h2>
            <p>{CONTACT.address}</p>
          </div>
          <div className="contact-buttons">
            <a className="btn btn-primary" href={"https://wa.me/" + CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <Link className="btn btn-ghost" href="/contact">كل وسائل التواصل</Link>
          </div>
          <div className="contact-meta">
            <a href={"tel:" + CONTACT.mobile.replace(/\s/g, "")}>{CONTACT.mobile}</a>
            <a href={"tel:" + CONTACT.landline.replace(/\s/g, "")}>{CONTACT.landline}</a>
            <a href={"mailto:" + CONTACT.email}>{CONTACT.email}</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
