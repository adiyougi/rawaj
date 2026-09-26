"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CONTACT, departments, IMAGES, packages, portfolio, posts, services } from "@/lib/content";

type CartItem = { id: string; title: string; qty: number; specs?: string };

const slides = [
  { kicker: "رواج منذ 2008", title: "نحوّل الفكرة إلى حضور لا يُنسى.", text: "تصميم، طباعة، إعلان وديكور — بخبرة تنفيذية تبدأ من الفكرة ولا تنتهي إلا عندما يكتمل المشهد.", image: IMAGES.storefront, href: "/about", cta: "اكتشف رواج" },
  { kicker: "متجر خدمات متكامل", title: "كل ما تحتاجه علامتك. في مكان واحد.", text: "اختر الخدمة، حدد المواصفات إن رغبت، واجمع أكثر من خدمة في طلب واحد.", image: IMAGES.design, href: "/services", cta: "استكشف الخدمات" },
  { kicker: "أعمال تتحدث", title: "ما نصنعه لا يحتاج إلى شرح طويل.", text: "واجهات، لوحات، مطبوعات، هوية وأعمال خاصة — شاهد نماذج مختارة من عالم رواج.", image: IMAGES.neon, href: "/portfolio", cta: "شاهد الأعمال" }
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [specItem, setSpecItem] = useState<(typeof services)[number] | null>(null);
  const [specs, setSpecs] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("rawaj-cart");
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rawaj-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, []);

  const count = useMemo(() => cart.reduce((n, item) => n + item.qty, 0), [cart]);

  function addService(item: (typeof services)[number], withSpecs = "") {
    setCart((current) => {
      const found = current.find((x) => x.id === item.id);
      if (found) return current.map((x) => x.id === item.id ? { ...x, qty: x.qty + 1, specs: withSpecs || x.specs } : x);
      return [...current, { id: item.id, title: item.title, qty: 1, specs: withSpecs }];
    });
    setSpecItem(null);
    setSpecs("");
    setCartOpen(true);
  }

  function sendWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map((item, i) => (i + 1) + ". " + item.title + " × " + item.qty + (item.specs ? " — " + item.specs : ""));
    const message = "مرحبًا رواج، أود طلب عرض سعر للخدمات التالية:\n\n" + lines.join("\n") + "\n\nأرجو التواصل معي لاستكمال التفاصيل.";
    window.open("https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(message), "_blank");
  }

  return (
    <main>
      <SiteHeader cartCount={count} onCart={() => setCartOpen(true)} />

      <section className="hero" aria-label="السلايدر الرئيسي">
        {slides.map((item, index) => (
          <article key={item.title} className={index === slide ? "hero-slide active" : "hero-slide"} style={{ backgroundImage: "linear-gradient(90deg, rgba(7,7,9,.18), rgba(7,7,9,.80)), url(" + item.image + ")" }}>
            <div className="hero-noise"></div>
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
          <div className="slide-dots">{slides.map((_, i) => <button key={i} className={i === slide ? "active" : ""} onClick={() => setSlide(i)} aria-label={"الشريحة " + (i + 1)}></button>)}</div>
          <span className="slide-counter">0{slide + 1} / 0{slides.length}</span>
        </div>
        <div className="hero-edge-copy">RAWAJ / PRINT / ADVERTISING / DECORATION</div>
      </section>

      <div className="marquee" aria-label="شريط الخدمات">
        <div className="marquee-track">
          {["تصميم فني", "صناعة محتوى", "طباعة ورقية", "طباعة رقمية", "لوحات ضوئية", "واجهات", "حروف بارزة", "ليزر وأكريليك", "باقات مخصصة", "تنفيذ متكامل"].concat(["تصميم فني", "صناعة محتوى", "طباعة ورقية", "طباعة رقمية", "لوحات ضوئية"]).map((x, i) => <span key={i}>{x}<b>◆</b></span>)}
        </div>
      </div>

      <section className="about-section section shell">
        <div className="section-heading">
          <span className="eyebrow">من نحن</span>
          <h2>خبرة تتقاطع فيها الفكرة مع الصناعة.</h2>
        </div>
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-card-image" style={{ backgroundImage: "url(" + IMAGES.print + ")" }}></div>
            <div className="year-badge"><strong>2008</strong><span>منذ</span></div>
          </div>
          <div className="about-copy">
            <p className="lead">رواج للطباعة والإعلان والديكور مؤسسة تجمع التصميم والإنتاج والتنفيذ في مسار واحد، لتمنح العميل نتيجة متماسكة لا مجموعة خدمات منفصلة.</p>
            <div className="vision-grid">
              <div><span>01</span><h3>الهدف</h3><p>تحويل احتياج العميل إلى منتج بصري وتنفيذي واضح القيمة.</p></div>
              <div><span>02</span><h3>الرؤية</h3><p>أن تكون رواج نقطة مرجعية للحلول الإبداعية والتنفيذية المتكاملة.</p></div>
              <div><span>03</span><h3>الرسالة</h3><p>جودة دقيقة، تنفيذ احترافي، والتزام بمواعيد الإنجاز.</p></div>
            </div>
            <div className="inline-actions"><Link className="text-link" href="/about">اقرأ قصة رواج ←</Link><span className="text-link muted">تحميل الدليل التعريفي — قريبًا</span></div>
          </div>
        </div>
      </section>

      <section id="departments" className="departments section">
        <div className="shell section-heading split-heading">
          <div><span className="eyebrow">أقسام المؤسسة</span><h2>من الفكرة إلى آخر تفصيلة.</h2></div>
          <p>مسارات متخصصة تتكامل لتغطي احتياج العلامة من التصميم إلى الإنتاج والتركيب.</p>
        </div>
        <div className="department-rail">
          {departments.map((item, index) => (
            <article className="department-card" key={item.title} style={{ backgroundImage: "linear-gradient(180deg, transparent 20%, rgba(7,7,9,.94) 94%), url(" + item.image + ")" }}>
              <span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p><Link href="/services">استكشف الخدمات ↗</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="services-section section shell">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">متجر الخدمات</span><h2>اختر الخدمة كما تختار منتجًا.</h2></div>
          <div><p>بطاقات واضحة، تفاصيل كاملة، مواصفات اختيارية، ثم أرسل سلة طلباتك مباشرة إلى رواج.</p><Link className="text-link" href="/services">كل الخدمات ←</Link></div>
        </div>
        <div className="service-grid">
          {services.map((item) => (
            <article className="service-card" key={item.id}>
              <div className="service-media" style={{ backgroundImage: "url(" + item.image + ")" }}><span>{item.badge}</span></div>
              <div className="service-body"><small>{item.category}</small><h3>{item.title}</h3><p>{item.desc}</p>
                <div className="service-actions"><button onClick={() => addService(item)}>أضف للطلب</button><button className="secondary" onClick={() => setSpecItem(item)}>حدد المواصفات</button></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="packages" className="packages-section section">
        <div className="shell section-heading split-heading"><div><span className="eyebrow">باقات مخصصة</span><h2>صفقة واحدة. أثر أكبر.</h2></div><p>نجمع أكثر من خدمة في باقة واحدة قابلة للتخصيص لتناسب الهدف والميزانية.</p></div>
        <div className="package-rail shell">
          {packages.map((item, index) => (
            <article className="package-card" key={item.title} style={{ backgroundImage: "linear-gradient(90deg, rgba(8,8,10,.96), rgba(8,8,10,.25)), url(" + item.image + ")" }}>
              <span className="package-index">0{index + 1}</span><div><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.text}</p><Link className="btn btn-light" href="/quote">خصص الباقة</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="features section shell">
        <div className="section-heading"><span className="eyebrow">لماذا رواج</span><h2>قيمة تُرى في النتيجة.</h2></div>
        <div className="feature-grid">
          {[["01","حل متكامل","تصميم وإنتاج وتنفيذ ضمن تجربة واحدة."],["02","خبرة عملية","سنوات طويلة في السوق ومشاريع متنوعة."],["03","مرونة عالية","حلول قابلة للتخصيص بدل القوالب الجاهزة."],["04","جودة تنفيذ","تفاصيل إنتاج وتشطيب ترفع قيمة العمل."],["05","التزام","وضوح في المراحل ومواعيد الإنجاز."],["06","تنوع تقني","طباعة، لوحات، واجهات، ليزر وأكثر."]].map((f) => <div className="feature-card" key={f[0]}><span>{f[0]}</span><h3>{f[1]}</h3><p>{f[2]}</p></div>)}
        </div>
      </section>

      <section className="portfolio-section section">
        <div className="shell section-heading split-heading"><div><span className="eyebrow">أعمال نفخر بإنجازها</span><h2>حين يصبح التنفيذ جزءًا من الهوية.</h2></div><Link className="text-link" href="/portfolio">شاهد جميع الأعمال ←</Link></div>
        <div className="portfolio-grid shell">
          {portfolio.map((item, i) => <Link href="/portfolio" className={i === 0 || i === 5 ? "portfolio-card wide" : "portfolio-card"} key={item.title} style={{ backgroundImage: "linear-gradient(180deg, transparent, rgba(7,7,9,.86)), url(" + item.image + ")" }}><span>{item.category}</span><h3>{item.title}</h3></Link>)}
        </div>
      </section>

      <section className="clients section shell">
        <div className="section-heading"><span className="eyebrow">عملاء نعتز بهم</span><h2>الثقة هي أفضل إعلان.</h2></div>
        <div className="logo-loop"><div className="logo-loop-track">{["بنك الكريمي الإسلامي","بنك الأمل","الجامعة اليمنية","النادي الترفيهي","مؤسسات صحية","جامعات ومراكز","شركات تجارية","علامات محلية"].concat(["بنك الكريمي الإسلامي","بنك الأمل","الجامعة اليمنية","النادي الترفيهي"]).map((x,i)=><span key={i}>{x}</span>)}</div></div>
        <div className="testimonial-grid">
          <blockquote><span>“</span><p>نبحث عن الشريك الذي يفهم الفكرة قبل أن يبدأ التنفيذ، وهذه هي القيمة التي نريد أن تمثلها تجربة رواج الرقمية.</p><footer>شهادة عميل — نموذج قابل للاستبدال</footer></blockquote>
          <blockquote><span>“</span><p>التجربة الجيدة ليست صورة جميلة فقط؛ إنها وضوح في الخيارات وسهولة في بدء الصفقة.</p><footer>شهادة عميل — نموذج قابل للاستبدال</footer></blockquote>
        </div>
      </section>

      <section className="journal section shell">
        <div className="section-heading split-heading"><div><span className="eyebrow">من مدونة رواج</span><h2>محتوى يساعدك على اتخاذ قرار أفضل.</h2></div><Link className="text-link" href="/blog">كل المقالات ←</Link></div>
        <div className="post-grid">{posts.map((post)=><Link className="post-card" href="/blog" key={post.title}><div style={{backgroundImage:"url("+post.image+")"}}></div><small>{post.tag}</small><h3>{post.title}</h3><span>اقرأ المقال ←</span></Link>)}</div>
      </section>

      <section className="contact-teaser section">
        <div className="shell contact-panel">
          <div><span className="eyebrow">اتصل بنا</span><h2>لديك مشروع؟ ابدأ المحادثة.</h2><p>{CONTACT.address}</p></div>
          <div className="contact-buttons"><a className="btn btn-primary" href={"https://wa.me/" + CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><Link className="btn btn-ghost" href="/contact">كل وسائل التواصل</Link></div>
          <div className="contact-meta"><a href={"tel:"+CONTACT.mobile.replace(/\s/g,"")}>{CONTACT.mobile}</a><a href={"tel:"+CONTACT.landline.replace(/\s/g,"")}>{CONTACT.landline}</a><a href={"mailto:"+CONTACT.email}>{CONTACT.email}</a></div>
        </div>
      </section>

      <SiteFooter />

      <button className="floating-cart" onClick={() => setCartOpen(true)}><span>سلة الطلبات</span><b>{count}</b></button>
      <a className="floating-whatsapp" href={"https://wa.me/" + CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="واتساب">WA</a>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e)=>e.stopPropagation()}><button className="drawer-close" onClick={()=>setCartOpen(false)}>×</button><span className="eyebrow">سلة الطلبات</span><h2>جهّز طلبك ثم أرسله لواتساب.</h2>
        {!cart.length ? <p className="empty">السلة فارغة حتى الآن.</p> : <div className="cart-list">{cart.map((item)=><div className="cart-row" key={item.id}><div><strong>{item.title}</strong>{item.specs && <small>{item.specs}</small>}</div><span>× {item.qty}</span><button onClick={()=>setCart(cart.filter((x)=>x.id!==item.id))}>حذف</button></div>)}</div>}
        <button className="btn btn-primary full" disabled={!cart.length} onClick={sendWhatsApp}>إرسال الطلب عبر واتساب</button>
      </aside></div>}

      {specItem && <div className="modal-backdrop" onClick={()=>setSpecItem(null)}><div className="spec-modal" onClick={(e)=>e.stopPropagation()}><button className="drawer-close" onClick={()=>setSpecItem(null)}>×</button><span className="eyebrow">مواصفات اختيارية</span><h2>{specItem.title}</h2><p>اكتب المقاس، الكمية، الخامة أو التشطيب المطلوب. سنحوّلها لاحقًا إلى نموذج مواصفات ذكي خاص بكل خدمة.</p><textarea value={specs} onChange={(e)=>setSpecs(e.target.value)} placeholder="مثال: 1000 حبة، وجهين، سلفنة مطفية..."></textarea><button className="btn btn-primary full" onClick={()=>addService(specItem,specs)}>حفظ وإضافة للطلب</button></div></div>}
    </main>
  );
}
