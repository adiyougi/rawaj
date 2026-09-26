"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ServiceCard, { ServiceCardData } from "@/components/ServiceCard";

export type CatalogService=ServiceCardData;

export default function ServiceCatalog({services,initialQuery=""}:{services:CatalogService[];initialQuery?:string}){
  const categories=["الكل",...Array.from(new Set(services.map(s=>s.category)))];
  const [category,setCategory]=useState("الكل");
  const [query,setQuery]=useState(initialQuery);

  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return services.filter(s=>(category==="الكل"||s.category===category) && (!q || (s.title+" "+s.desc+" "+s.category).toLowerCase().includes(q)));
  },[services,category,query]);

  return (
    <div className="catalog-app">
      <div className="catalog-search-card">
        <div className="catalog-search-input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث عن خدمة..." />
          {query && <button onClick={()=>setQuery("")}>×</button>}
        </div>
        <div className="category-chips">
          {categories.map(cat=><button key={cat} className={category===cat ? "active":""} onClick={()=>setCategory(cat)}>{cat}</button>)}
        </div>
      </div>

      <div className="catalog-result-head">
        <div><strong>{filtered.length}</strong><span>خدمة متاحة</span></div>
        {(query || category!=="الكل") && <button onClick={()=>{setQuery("");setCategory("الكل");}}>مسح التصفية</button>}
      </div>

      <div className="store-product-grid catalog-grid">
        {filtered.map(item=><ServiceCard key={item.id} item={item}/>)}
      </div>

      {!filtered.length && <div className="catalog-empty"><h3>لم نجد نتيجة مطابقة.</h3><p>جرّب كلمة أخرى أو أرسل طلبًا مخصصًا.</p><Link className="btn btn-primary" href="/quote">اطلب خدمة مخصصة</Link></div>}
    </div>
  );
}
