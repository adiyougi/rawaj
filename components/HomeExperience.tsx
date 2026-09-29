"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {CONTACT} from "@/lib/content";

type Slide={kicker:string;title:string;text:string;image:string;href:string;cta:string;secondaryHref?:string;secondaryCta?:string};
type Department={slug:string;title:string;text:string;image:string};
type Service={id:string;title:string;category:string;desc:string;image:string;badge:string};
type Package={id:string;title:string;eyebrow:string;text:string;image:string;items:string[]};
type Feature={index:string;title:string;text:string};
type Work={slug:string;title:string;category:string;image:string;date:string;summary:string;services:string[]};
type Post={slug:string;title:string;tag:string;image:string;excerpt:string;date:string;readTime:string;body:string[]};

export default function HomeExperience({slides,ticker,departments,services,packages,features,portfolio,posts}:{slides:Slide[];ticker:string[];departments:Department[];services:Service[];packages:Package[];features:Feature[];portfolio:Work[];posts:Post[]}) {
 const [slide,setSlide]=useState(0);
 useEffect(()=>{if(slides.length<2)return;const t=setInterval(()=>setSlide(v=>(v+1)%slides.length),6500);return()=>clearInterval(t)},[slides.length]);
 return <main className="commerce-home">
  <SiteHeader/>
  <section className="hero" aria-label="السلايدر الرئيسي">
   {slides.map((item,index)=><article key={item.title} className={index===slide?"hero-slide active":"hero-slide"} style={{backgroundImage:"linear-gradient(90deg,rgba(7,7,9,.18),rgba(7,7,9,.82)),url("+item.image+")"}}>
    <div className="hero-noise"/><div className="hero-content shell"><span className="eyebrow">{item.kicker}</span><h1>{item.title}</h1><p>{item.text}</p><div className="hero-actions"><Link className="btn btn-primary" href={item.href}>{item.cta}<span>↗</span></Link><Link className="btn btn-ghost" href={item.secondaryHref||"/quote"}>{item.secondaryCta||"اطلب عرض سعر"}</Link></div></div>
   </article>)}
   <div className="hero-controls shell"><div className="slide-dots">{slides.map((_,i)=><button key={i} className={i===slide?"active":""} onClick={()=>setSlide(i)} aria-label={"الشريحة "+(i+1)}/>)}</div><span className="slide-counter">0{slide+1} / 0{slides.length}</span></div>
   <div className="hero-edge-copy">RAWAJ / PRINT / ADVERTISING / DECORATION</div>
  </section>

  <section className="commerce-search shell"><Link href="/services" className="commerce-search-box"><span>⌕</span><strong>ما الذي تريد تنفيذه اليوم؟</strong><small>ابحث في خدمات رواج ←</small></Link></section><div className="marquee"><div className="marquee-track">{[...ticker,...ticker].map((t,i)=><span key={i}>{t}<b>◆</b></span>)}</div></div>

  <section className="about-section section shell commerce-story"><div className="home-manifesto"><span>RAWAJ / SINCE 2008</span><strong>الفكرة لا تكفي.<br/><em>يجب أن تُرى.</em></strong></div><div className="section-heading"><span className="eyebrow">من نحن</span><h2>رواج تصنع حضور علامتك في العالم الحقيقي.</h2></div><div className="about-grid">
   <div className="about-visual"><div className="about-card-image" style={{backgroundImage:"url("+(slides[0]?.image||"/images/service-placeholder.svg")+")"}}/><div className="year-badge"><strong>2008</strong><span>منذ</span></div></div>
   <div className="about-copy"><p className="lead">من الفكرة الأولى إلى القطعة المطبوعة، الواجهة، المساحة والهوية المرئية: رواج تجمع التصميم والإنتاج والتنفيذ في منظومة واحدة حتى تخرج علامتك بصورة متماسكة.</p><div className="vision-grid"><div><span>01</span><h3>الهدف</h3><p>تحويل الفكرة إلى حل بصري قابل للتنفيذ، بمواصفات واضحة من البداية.</p></div><div><span>02</span><h3>الرؤية</h3><p>أن تصبح رواج الوجهة التي تجمع احتياجات العلامة التجارية والمكان في تجربة واحدة.</p></div><div><span>03</span><h3>المنهج</h3><p>نفهم المشروع، نبني المواصفات، ننسّق الإنتاج، ثم نتابع التنفيذ حتى النتيجة.</p></div></div><Link className="text-link" href="/about">تعرف على رواج ←</Link></div>
  </div></section>

  <section className="departments section"><div className="shell section-heading split-heading"><div><span className="eyebrow">أقسام رواج</span><h2>كل ما تحتاجه علامتك. تحت سقف إبداعي واحد.</h2></div><p>طباعة، إعلان، ديكور وحلول بصرية مترابطة؛ اختر ما يحتاجه مشروعك واجمعه في طلب واحد.</p></div><div className="department-rail">{departments.map((item,index)=><article className="department-card" key={item.slug} style={{backgroundImage:"linear-gradient(180deg,transparent 20%,rgba(7,7,9,.94) 94%),url("+item.image+")"}}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.text}</p><Link href={"/departments/"+item.slug}>استكشف القسم ↗</Link></div></article>)}</div></section>

  <section className="services-section section shell"><div className="section-heading split-heading"><div><span className="eyebrow">كتالوج الخدمات</span><h2>اختر ما تريد صنعه. واترك لنا تفاصيل التنفيذ.</h2></div><div><p>كتالوج صُمم ليحوّل البحث الطويل إلى قرار واضح: خدمة، خيارات، مواصفات، ثم طلب واحد.</p><Link className="text-link" href="/services">الكتالوج الكامل ←</Link></div></div><div className="home-service-stage">{services.slice(0,6).map((item,index)=><Link className="home-service-story" key={item.id} href={"/services/"+item.id}><span className="home-service-no">0{index+1}</span><div className="home-service-image" style={{backgroundImage:"url("+item.image+")"}}/><div className="home-service-copy"><small>{item.category}</small><h3>{item.title}</h3><p>{item.desc}</p><b>اكتشف الخدمة ↗</b></div></Link>)}</div></section>

  <section className="packages-section section"><div className="shell section-heading split-heading"><div><span className="eyebrow">باقات رواج</span><h2>مشروع كامل. مسار واحد.</h2></div><div><p>اختر نقطة البداية، ثم خصّص الباقة لتناسب مشروعك بدل شراء خدمات متفرقة.</p><Link className="text-link" href="/packages">جميع الباقات ←</Link></div></div><div className="package-rail shell">{packages.map((item,index)=><article className="package-card" key={item.id} style={{backgroundImage:"linear-gradient(90deg,rgba(8,8,10,.96),rgba(8,8,10,.24)),url("+item.image+")"}}><span className="package-index">0{index+1}</span><div><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.text}</p><Link className="btn btn-light" href={"/quote?package="+item.id}>خصص الباقة</Link></div></article>)}</div></section>

  <section className="features section shell"><div className="section-heading"><span className="eyebrow">منظومة العمل</span><h2>من «أريد» إلى «تم». دون فوضى.</h2></div><div className="feature-grid">{features.slice(0,6).map(f=><div className="feature-card" key={f.index}><span>{f.index}</span><h3>{f.title}</h3><p>{f.text}</p></div>)}</div></section>

  <section className="portfolio-section section"><div className="shell section-heading split-heading"><div><span className="eyebrow">أعمال رواج</span><h2>النتيجة هي التي تتحدث.</h2></div><Link className="text-link" href="/portfolio">شاهد جميع الأعمال ←</Link></div><div className="portfolio-grid shell">{portfolio.slice(0,6).map((item,index)=><Link href={"/portfolio/"+item.slug} className={index===0||index===5?"portfolio-card wide":"portfolio-card"} key={item.slug} style={{backgroundImage:"linear-gradient(180deg,transparent,rgba(7,7,9,.86)),url("+item.image+")"}}><span>{item.category}</span><h3>{item.title}</h3></Link>)}</div></section>

  {posts.length>0&&<section className="journal section shell"><div className="section-heading split-heading"><div><span className="eyebrow">معرفة وخبرة</span><h2>معرفة تساعدك على اتخاذ قرار أفضل.</h2></div><Link className="text-link" href="/blog">كل المقالات ←</Link></div><div className="post-grid">{posts.slice(0,3).map(post=><Link className="post-card" href={"/blog/"+post.slug} key={post.slug}><div style={{backgroundImage:"url("+post.image+")"}}/><small>{post.tag}</small><h3>{post.title}</h3><span>اقرأ المقال ←</span></Link>)}</div></section>}

  <section className="contact-teaser section"><div className="shell contact-panel"><div><span className="eyebrow">ابدأ مشروعك</span><h2>لديك فكرة؟ حوّلها إلى مشروع.</h2><p>{CONTACT.address}</p></div><div className="contact-buttons"><Link className="btn btn-primary" href="/quote">اطلب عرض سعر</Link><Link className="btn btn-ghost" href="/contact">تواصل معنا</Link></div><div className="contact-meta"><a href={"tel:"+CONTACT.mobile.replace(/\s/g,"")}>{CONTACT.mobile}</a><a href={"mailto:"+CONTACT.email}>{CONTACT.email}</a></div></div></section>
  <SiteFooter/>
 </main>
}