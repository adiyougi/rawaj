"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceCard from "@/components/ServiceCard";
import { CONTACT } from "@/lib/content";

type Slide={kicker:string;title:string;text:string;image:string;href:string;cta:string;secondaryHref?:string;secondaryCta?:string};
type Department={slug:string;title:string;text:string;image:string};
type Service={id:string;title:string;category:string;desc:string;image:string;badge:string};
type Package={id:string;title:string;eyebrow:string;text:string;image:string;items:string[]};
type Feature={index:string;title:string;text:string};
type Work={slug:string;title:string;category:string;image:string;date:string;summary:string;services:string[]};
type Post={slug:string;title:string;tag:string;image:string;excerpt:string;date:string;readTime:string;body:string[]};

export default function HomeExperience({slides,ticker,departments,services,packages,features,portfolio,posts}:{
  slides:Slide[];ticker:string[];departments:Department[];services:Service[];packages:Package[];features:Feature[];portfolio:Work[];posts:Post[];
}) {
  const router=useRouter();
  const [slide,setSlide]=useState(0);
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("الكل");

  useEffect(()=>{
    if(slides.length<2) return;
    const t=setInterval(()=>setSlide(v=>(v+1)%slides.length),5500);
    return()=>clearInterval(t);
  },[slides.length]);

  const categories=["الكل",...Array.from(new Set(services.map(s=>s.category)))].slice(0,7);
  const visibleServices=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return services.filter(s=>{
      const byCat=category==="الكل" || s.category===category;
      const byQuery=!q || (s.title+" "+s.desc+" "+s.category).toLowerCase().includes(q);
      return byCat && byQuery;
    }).slice(0,8);
  },[services,query,category]);

  function submitSearch(e:FormEvent){
    e.preventDefault();
    if(query.trim()) router.push("/services?q="+encodeURIComponent(query.trim()));
    else router.push("/services");
  }

  return (
    <main className="app-storefront">
      <SiteHeader/>

      <div className="home-shell">
        <section className="app-hero-card">
          {slides.map((item,index)=>(
            <article key={item.title} className={index===slide ? "app-hero-slide active":"app-hero-slide"} style={{backgroundImage:"linear-gradient(90deg,rgba(11,11,13,.76),rgba(11,11,13,.12)),url("+item.image+")"}}>
              <div className="app-hero-copy">
                <span>{item.kicker}</span>
                <h1>{item.title}</h1>
                <p>{item.text}</p>
                <div>
                  <Link className="app-hero-primary" href={item.href}>{item.cta}</Link>
                  <Link className="app-hero-secondary" href={item.secondaryHref || "/services"}>{item.secondaryCta || "استكشف الخدمات"}</Link>
                </div>
              </div>
            </article>
          ))}
          <div className="app-hero-dots">
            {slides.map((_,i)=><button key={i} onClick={()=>setSlide(i)} className={i===slide ? "active":""} aria-label={"الشريحة "+(i+1)}/>)}
          </div>
        </section>

        <section className="store-search-block">
          <form className="store-search" onSubmit={submitSearch}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث عن خدمة أو منتج..." aria-label="البحث عن خدمة"/>
            {query && <button type="button" onClick={()=>setQuery("")}>×</button>}
          </form>

          <div className="category-chips" aria-label="تصنيفات الخدمات">
            {categories.map(cat=><button key={cat} onClick={()=>setCategory(cat)} className={category===cat ? "active":""}>{cat}</button>)}
          </div>
        </section>

        <section className="store-section">
          <div className="store-section-head">
            <div><small>متجر الخدمات</small><h2>{query || category!=="الكل" ? "نتائج تناسب اختيارك":"الأكثر طلبًا"}</h2></div>
            <Link href="/services">عرض الكل</Link>
          </div>
          <div className="store-product-grid">
            {visibleServices.map(item=><ServiceCard key={item.id} item={item}/>)}
          </div>
        </section>

        <section className="store-section">
          <div className="store-section-head">
            <div><small>أقسام رواج</small><h2>اختر المجال</h2></div>
            <Link href="/departments">كل الأقسام</Link>
          </div>
          <div className="department-strip">
            {departments.map((item,index)=>(
              <Link href={"/departments/"+item.slug} key={item.slug} className="department-mini-card">
                <div style={{backgroundImage:"linear-gradient(180deg,transparent,rgba(0,0,0,.65)),url("+item.image+")"}}><span>0{index+1}</span></div>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="store-section">
          <div className="store-section-head">
            <div><small>باقات مخصصة</small><h2>أكثر من خدمة في عرض واحد</h2></div>
            <Link href="/packages">كل الباقات</Link>
          </div>
          <div className="offer-strip">
            {packages.map(item=>(
              <Link href={"/quote?package="+item.id} key={item.id} className="offer-card" style={{backgroundImage:"linear-gradient(90deg,rgba(10,10,12,.86),rgba(10,10,12,.12)),url("+item.image+")"}}>
                <div><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.text}</p><span>خصص الباقة ←</span></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="store-section">
          <div className="store-section-head">
            <div><small>أعمالنا</small><h2>أعمال مختارة</h2></div>
            <Link href="/portfolio">المعرض الكامل</Link>
          </div>
          <div className="work-strip">
            {portfolio.slice(0,6).map(item=>(
              <Link href={"/portfolio/"+item.slug} key={item.slug} className="work-mini-card">
                <div style={{backgroundImage:"url("+item.image+")"}}/>
                <small>{item.category}</small>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="store-section about-app-card">
          <div className="about-app-copy">
            <small>رواج منذ 2008</small>
            <h2>من الفكرة إلى التنفيذ في مكان واحد.</h2>
            <p>تصميم، طباعة، إعلان، واجهات، ليزر وأكريليك ضمن تجربة طلب موحدة وواضحة.</p>
            <Link href="/about">اعرف رواج أكثر</Link>
          </div>
          <div className="feature-mini-grid">
            {features.slice(0,4).map(feature=><div key={feature.index}><span>{feature.index}</span><strong>{feature.title}</strong><p>{feature.text}</p></div>)}
          </div>
        </section>

        <section className="store-section">
          <div className="store-section-head">
            <div><small>محتوى مفيد</small><h2>من مدونة رواج</h2></div>
            <Link href="/blog">كل المقالات</Link>
          </div>
          <div className="article-strip">
            {posts.slice(0,3).map(post=>(
              <Link href={"/blog/"+post.slug} className="article-mini-card" key={post.slug}>
                <div style={{backgroundImage:"url("+post.image+")"}}/>
                <small>{post.tag}</small><strong>{post.title}</strong><span>{post.readTime}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-contact-card">
          <div><small>جاهز تبدأ؟</small><h2>أرسل تفاصيل مشروعك لرواج.</h2><p>{CONTACT.address}</p></div>
          <div>
            <a href={"https://wa.me/"+CONTACT.whatsapp} target="_blank" rel="noreferrer">واتساب</a>
            <Link href="/quote">عرض سعر</Link>
          </div>
        </section>
      </div>

      <div className="ticker-lite" aria-hidden="true"><div>{[...ticker,...ticker].map((t,i)=><span key={i}>{t}<b>•</b></span>)}</div></div>
      <SiteFooter/>
    </main>
  );
}
