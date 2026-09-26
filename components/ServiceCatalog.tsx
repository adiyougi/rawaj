"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";

export type CatalogService = {
  id: string;
  title: string;
  category: string;
  desc: string;
  image: string;
  badge: string;
};

export default function ServiceCatalog({ services }: { services: CatalogService[] }) {
  const categories = ["الكل", ...Array.from(new Set(services.map((service) => service.category)))];
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((service) => {
      const inCategory = category === "الكل" || service.category === category;
      const matches = !q || (service.title + " " + service.desc + " " + service.category).toLowerCase().includes(q);
      return inCategory && matches;
    });
  }, [category, query, services]);

  return (
    <>
      <div className="catalog-toolbar">
        <div>
          {categories.map((item) => (
            <button
              key={item}
              className={item === category ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <input
          placeholder="ابحث عن خدمة..."
          aria-label="البحث في الخدمات"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="catalog-status">
        <span>{filtered.length} خدمة</span>
        {(query || category !== "الكل") && <button onClick={() => { setQuery(""); setCategory("الكل"); }}>مسح الفلاتر</button>}
      </div>

      <div className="service-grid">
        {filtered.map((item) => (
          <article className="service-card" key={item.id}>
            <Link href={"/services/" + item.id} className="service-media" style={{ backgroundImage: "url(" + item.image + ")" }}>
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

      {!filtered.length && (
        <div className="catalog-empty">
          <strong>لم نجد خدمة مطابقة.</strong>
          <p>جرّب كلمة أخرى أو أرسل طلبًا مخصصًا إلى رواج.</p>
          <Link className="btn btn-primary" href="/quote">اطلب خدمة مخصصة</Link>
        </div>
      )}
    </>
  );
}
