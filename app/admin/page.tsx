"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

const cards = [
  ["الخدمات","services","/admin/services"],
  ["الباقات","packages","/admin/packages"],
  ["الأعمال","portfolio_items","/admin/portfolio"],
  ["المقالات","blog_posts","/admin/blog"],
  ["العملاء","clients","/admin/clients"],
  ["الطلبات","quote_requests","/admin/quotes"]
] as const;

export default function AdminDashboard() {
  const [counts,setCounts] = useState<Record<string,number>>({});
  const [catalog,setCatalog] = useState({verified:0,approved:0,legacy:0});

  useEffect(()=>{
    (async()=>{
      const supabase = getSupabaseBrowser();
      const result:Record<string,number> = {};
      for (const [,table] of cards) {
        const {count} = await supabase.from(table).select("*",{count:"exact",head:true});
        result[table] = count || 0;
      }
      setCounts(result);
      const [{count:verified},{count:approved},{count:legacy}] = await Promise.all([
        supabase.from("services").select("*",{count:"exact",head:true}).eq("verification_status","verified").eq("is_published",false),
        supabase.from("services").select("*",{count:"exact",head:true}).eq("verification_status","approved").eq("is_published",true),
        supabase.from("services").select("*",{count:"exact",head:true}).eq("verification_status","legacy")
      ]);
      setCatalog({verified:verified||0,approved:approved||0,legacy:legacy||0});
    })();
  },[]);

  return (
    <AdminShell>
      <section className="admin-page">
        <div className="admin-page-head">
          <div>
            <span className="admin-kicker">CONTROL CENTER</span>
            <h1>لوحة تحكم رواج</h1>
            <p>المحتوى التسويقي، الكتالوج، الأعمال، المدونة والوسائط من مكان واحد.</p>
          </div>
        </div>

        <div className="admin-stats">
          {cards.map(([label,table,href]) => (
            <a href={href} key={table}>
              <span>{label}</span>
              <strong>{counts[table] ?? "—"}</strong>
              <small>إدارة القسم ←</small>
            </a>
          ))}
        </div>

        <div className="admin-dashboard-grid"><article><span className="admin-kicker">MASTER CATALOG</span><h2>حالة اعتماد الكتالوج</h2><p>موثقة وتنتظر الاعتماد: <strong>{catalog.verified}</strong> · منشورة ومعتمدة: <strong>{catalog.approved}</strong> · قديمة للمراجعة: <strong>{catalog.legacy}</strong></p><a className="admin-primary" href="/admin/services">مراجعة الخدمات</a></article>
          <article>
            <span className="admin-kicker">محتوى الرئيسية</span>
            <h2>كل موديول أصبح قابلًا للإدارة.</h2>
            <p>السلايدر، الشريط المتحرك، الأقسام، الخدمات المميزة، الباقات، الأعمال والمميزات مرتبطة مباشرة بقاعدة البيانات.</p>
            <div className="admin-quick-links">
              <a href="/admin/hero">السلايدر</a><a href="/admin/ticker">الشريط</a><a href="/admin/features">المميزات</a>
            </div>
          </article>
          <article className="dark">
            <span className="admin-kicker">MEDIA</span>
            <h2>مكتبة وسائط مستقلة.</h2>
            <p>ارفع الصور والفيديو وPDF ثم استخدم روابطها مباشرة داخل الخدمات والسلايدر والأعمال.</p>
            <a className="admin-primary" href="/admin/media">فتح مكتبة الوسائط</a>
          </article>
        </div>
      </section>
    </AdminShell>
  );
}
