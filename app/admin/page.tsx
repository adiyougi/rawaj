"use client";

import Link from "next/link";
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
type RecentQuote={id:string;request_number:string;customer_name:string|null;phone:string|null;status:string;created_at:string};
const quoteStatus:Record<string,string>={new:"جديد",reviewing:"قيد المراجعة",need_more_info:"نحتاج معلومات",pricing:"قيد التسعير",quote_ready:"العرض جاهز",sent:"تم إرسال العرض",negotiation:"تفاوض",won:"تم الاتفاق",lost:"لم يتم الاتفاق",cancelled:"ملغي",archived:"مؤرشف"};

export default function AdminDashboard() {
  const [counts,setCounts] = useState<Record<string,number>>({});
  const [role,setRole] = useState("");
  const [catalog,setCatalog] = useState({verified:0,approved:0,legacy:0});
  const [recentQuotes,setRecentQuotes] = useState<RecentQuote[]>([]);
  const [newQuotes,setNewQuotes] = useState(0);
  const [loadError,setLoadError] = useState("");

  useEffect(()=>{
    (async()=>{
      const supabase = getSupabaseBrowser();
      const {data:{session}}=await supabase.auth.getSession();
      const {data:profile}=session ? await supabase.from("admin_users").select("role").eq("user_id",session.user.id).maybeSingle() : {data:null};
      const currentRole=profile?.role || "editor";
      setRole(currentRole);
      const canQuotes=currentRole==="owner" || currentRole==="admin";
      const visibleCards=cards.filter(([,table])=>table!=="quote_requests" || canQuotes);
      const result:Record<string,number> = {};
      const countResults=await Promise.all(visibleCards.map(async ([,table])=>{const response=await supabase.from(table).select("*",{count:"exact",head:true});return {table,count:response.count,error:response.error};}));
      if(countResults.some(item=>item.error)) setLoadError("تعذر تحميل بعض مؤشرات لوحة التحكم.");
      countResults.forEach(item=>{result[item.table]=item.count||0;});
      setCounts(result);
      const [{count:verified},{count:approved},{count:legacy}] = await Promise.all([
        supabase.from("services").select("*",{count:"exact",head:true}).eq("verification_status","verified").eq("is_published",false),
        supabase.from("services").select("*",{count:"exact",head:true}).eq("verification_status","approved").eq("is_published",true),
        supabase.from("services").select("*",{count:"exact",head:true}).eq("verification_status","legacy")
      ]);
      setCatalog({verified:verified||0,approved:approved||0,legacy:legacy||0});
      if(canQuotes){
        const [{count:newCount},{data:recent,error:recentError}]=await Promise.all([
          supabase.from("quote_requests").select("*",{count:"exact",head:true}).eq("status","new"),
          supabase.from("quote_requests").select("id,request_number,customer_name,phone,status,created_at").order("created_at",{ascending:false}).limit(5)
        ]);
        setNewQuotes(newCount||0);
        if(recentError)setLoadError("تعذر تحميل أحدث طلبات عروض السعر.");else setRecentQuotes((recent||[]) as RecentQuote[]);
      }
    })();
  },[]);

  return (
    <AdminShell>
      <section className="admin-page">
        <div className="admin-page-head">
          <div>
            <span className="admin-kicker">CONTROL CENTER</span>
            <h1>لوحة تحكم رواج</h1>
            <p>المحتوى التسويقي، الكتالوج، الأعمال، المدونة والطلبات من مكان واحد.</p>
          </div>
        </div>
        {loadError&&<div className="admin-message" role="alert">{loadError}</div>}

        <div className="admin-stats">
          {cards.filter(([,table])=>table!=="quote_requests" || role==="owner" || role==="admin").map(([label,table,href]) => (
            <Link href={href} key={table}>
              <span>{label}</span>
              <strong>{counts[table] ?? "—"}</strong>
              <small>إدارة القسم ←</small>
            </Link>
          ))}
        </div>

        <div className="admin-dashboard-grid">
          {(role==="owner"||role==="admin")&&(<article className={newQuotes?"dashboard-inbox attention":"dashboard-inbox"}>
            <span className="admin-kicker">RFQ INBOX</span>
            <h2>{newQuotes?newQuotes+" طلب جديد يحتاج متابعة":"لا توجد طلبات جديدة معلقة"}</h2>
            <p>آخر طلبات عروض السعر الواردة من الموقع، مرتبة من الأحدث.</p>
            <div className="dashboard-recent-quotes">{recentQuotes.length?recentQuotes.map(row=><Link href="/admin/quotes" key={row.id}><span><strong>{row.customer_name||"عميل بدون اسم"}</strong><small>{row.request_number} · {row.phone||"بدون رقم تواصل"} · {new Date(row.created_at).toLocaleDateString("ar")}</small></span><em>{quoteStatus[row.status]||row.status}</em></Link>):<small>لا توجد طلبات مسجلة حتى الآن.</small>}</div>
            <Link className="admin-primary" href="/admin/quotes">فتح صندوق الطلبات</Link>
          </article>)}
          <article><span className="admin-kicker">MASTER CATALOG</span><h2>حالة اعتماد الكتالوج</h2><p>موثقة وتنتظر الاعتماد: <strong>{catalog.verified}</strong> · منشورة ومعتمدة: <strong>{catalog.approved}</strong> · قديمة للمراجعة: <strong>{catalog.legacy}</strong></p><Link className="admin-primary" href="/admin/services">مراجعة الخدمات</Link></article>
          <article>
            <span className="admin-kicker">محتوى الرئيسية</span>
            <h2>كل موديول أصبح قابلًا للإدارة.</h2>
            <p>السلايدر، الشريط المتحرك، الأقسام، الخدمات المميزة، الباقات، الأعمال والمميزات مرتبطة مباشرة بقاعدة البيانات.</p>
            <div className="admin-quick-links">
              <Link href="/admin/hero">السلايدر</Link><Link href="/admin/ticker">الشريط</Link><Link href="/admin/features">المميزات</Link>
            </div>
          </article>
          <article className="dark">
            <span className="admin-kicker">MEDIA</span>
            <h2>مكتبة وسائط مستقلة.</h2>
            <p>ارفع الصور والفيديو وPDF ثم استخدم روابطها مباشرة داخل الخدمات والسلايدر والأعمال.</p>
            <Link className="admin-primary" href="/admin/media">فتح مكتبة الوسائط</Link>
          </article>
        </div>
      </section>
    </AdminShell>
  );
}