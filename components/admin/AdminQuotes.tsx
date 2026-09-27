"use client";
import { useEffect,useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

type Quote={id:string;customer_name:string|null;phone:string|null;email:string|null;notes:string|null;source:string;status:string;created_at:string};
export default function AdminQuotes(){
 const [rows,setRows]=useState<Quote[]>([]),[loading,setLoading]=useState(true);
 async function load(){setLoading(true);const {data}=await getSupabaseBrowser().from("quote_requests").select("id,customer_name,phone,email,notes,source,status,created_at").order("created_at",{ascending:false});setRows(data||[]);setLoading(false);}
 useEffect(()=>{load();},[]);
 async function setStatus(id:string,status:string){await getSupabaseBrowser().from("quote_requests").update({status}).eq("id",id);setRows(rows.map(r=>r.id===id?{...r,status}:r));}
 return <AdminShell><section className="admin-page"><div className="admin-page-head"><div><span className="admin-kicker">RFQ</span><h1>طلبات عروض السعر</h1><p>متابعة الطلبات الواردة وحالتها من مكان واحد.</p></div></div>
 {loading?<p>جاري تحميل الطلبات…</p>:!rows.length?<div className="admin-empty">لا توجد طلبات حتى الآن.</div>:<div className="admin-list">{rows.map(r=><article key={r.id} className="admin-list-row"><div><strong>{r.customer_name||"عميل بدون اسم"}</strong><small>{new Date(r.created_at).toLocaleString("ar")}</small><p>{r.phone||r.email||"لا توجد وسيلة تواصل"}{r.notes?" — "+r.notes:""}</p></div><select value={r.status} onChange={e=>setStatus(r.id,e.target.value)}><option value="new">جديد</option><option value="contacted">تم التواصل</option><option value="quoted">تم إرسال العرض</option><option value="won">مقبول</option><option value="closed">مغلق</option></select></article>)}</div>}
 </section></AdminShell>;
}