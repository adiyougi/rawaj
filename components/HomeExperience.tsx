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

  <section className="store-catalog section shell">
   <div className="section-heading split-heading"><div><span className="eyebrow">متجر رواج للخدمات</span><h2>كل خدمات رواج. في مكان واحد.</h2></div><div><p>تصفح الخدمات كما تتصفح متجرًا رقميًا: اختر الخدمة، افتح تفاصيلها ومواصفاتها، ثم أضفها إلى طلبك.</p><Link className="text-link" href="/services">فتح الكتالوج الكامل ←</Link></div></div>
   <div className="store-category-links">{departments.map(d=><Link key={d.slug} href={"/departments/"+d.slug}>{d.title}</Link>)}</div>
   <div className="store-service-grid">{services.map(item=><Link className="store-service-card" key={item.id} href={"/services/"+item.id}><div className="store-service-media" style={{backgroundImage:"url("+item.image+")"}}>{item.badge&&<span>{item.badge}</span>}</div><div className="store-service-info"><small>{item.category}</small><h3>{item.title}</h3><p>{item.desc}</p><div><b>عرض الخدمة</b><i>←</i></div></div></Link>)}</div>
  </section>

  <section className="store-bundles section"><div className="shell"><div className="section-heading split-heading"><div><span className="eyebrow">باقات جاهزة للبدء</span><h2>اجمع احتياجات مشروعك في طلب واحد.</h2></div><Link className="text-link" href="/packages">كل الباقات ←</Link></div><div className="store-bundle-grid">{packages.map(item=><article className="store-bundle" key={item.id} style={{backgroundImage:"linear-gradient(180deg,rgba(5,5,7,.06),rgba(5,5,7,.88)),url("+item.image+")"}}><div><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.text}</p><Link href={"/quote?package="+item.id}>خصص الباقة ←</Link></div></article>)}</div></div></section>

  <section className="store-proof section shell"><div className="section-heading split-heading"><div><span className="eyebrow">أعمال مختارة</span><h2>شاهد مستوى التنفيذ.</h2></div><Link className="text-link" href="/portfolio">كل الأعمال ←</Link></div><div className="portfolio-grid">{portfolio.slice(0,6).map((item,index)=><Link href={"/portfolio/"+item.slug} className={index===0||index===5?"portfolio-card wide":"portfolio-card"} key={item.slug} style={{backgroundImage:"linear-gradient(180deg,transparent,rgba(7,7,9,.86)),url("+item.image+")"}}><span>{item.category}</span><h3>{item.title}</h3></Link>)}</div></section>

  <section className="store-why section shell"><div className="section-heading"><span className="eyebrow">كيف تعمل رواج</span><h2>اختيار واضح. مواصفات واضحة. طلب واحد.</h2></div><div className="feature-grid">{features.slice(0,4).map(f=><div className="feature-card" key={f.index}><span>{f.index}</span><h3>{f.title}</h3><p>{f.text}</p></div>)}</div></section>

  <section className="contact-teaser section"><div className="shell contact-panel"><div><span className="eyebrow">طلب مخصص</span><h2>لم تجد ما تبحث عنه؟ صف مشروعك مباشرة.</h2><p>{CONTACT.address}</p></div><div className="contact-buttons"><Link className="btn btn-primary" href="/quote">ابدأ طلبك</Link><Link className="btn btn-ghost" href="/contact">تواصل معنا</Link></div></div></section>
  <SiteFooter/>
 </main>
}