"use client";
import { useEffect,useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
type Item={id:string;title:string;quantity:number;specifications:any};
type Quote={id:string;customer_name:string|null;phone:string|null;email:string|null;notes:string|null;source:string;status:string;created_at:string;quote_request_items?:Item[]};
export default function AdminQuotes(){
 const [rows,setRows]=useState<Quote[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
 async function load(){setLoading(true);setError("");const {data,error}=await getSupabaseBrowser().from("quote_requests").select("id,customer_name,phone,email,notes,source,status,created_at,quote_request_items(id,title,quantity,specifications)").order("created_at",{ascending:false});if(error)setError(error.message);setRows(data||[]);setLoading(false);}
 useEffect(()=>{load();},[]);
 async function setStatus(id:string,status:string){const {error}=await getSupabaseBrowser().from("quote_requests").update({status}).eq("id",id);if(error){setError(error.message);return;}setRows(v=>v.map(r=>r.id===id?{...r,status}:r));}
 return <AdminShell><section className="admin-page"><div className="admin-page-head"><div><span className="admin-kicker">RFQ</span><h1>طلبات عروض السعر</h1><p>العميل، الخدمات، المواصفات وحالة المتابعة في سجل واحد.</p></div><button className="admin-primary" onClick={load}>تحديث</button></div>
 {error&&<div className="admin-message">{error}</div>}
 {loading?<p>جاري تحميل الطلبات…</p>:!rows.length?<div className="admin-empty">لا توجد طلبات حتى الآن.</div>:<div className="admin-list">{rows.map(r=><article key={r.id} className="admin-list-row"><div><strong>{r.customer_name||"عميل بدون اسم"}</strong><small>{new Date(r.created_at).toLocaleString("ar")} · {r.id.slice(0,8)}</small><p>{r.phone||r.email||"لا توجد وسيلة تواصل"}{r.notes?" — "+r.notes:""}</p>{r.quote_request_items?.map(i=><div key={i.id} className="admin-quote-item"><b>{i.title} × {i.quantity}</b>{i.specifications?.summary&&<small>{i.specifications.summary}</small>}</div>)}</div><select value={r.status} onChange={e=>setStatus(r.id,e.target.value)}><option value="new">جديد</option><option value="contacted">تم التواصل</option><option value="quoted">تم إرسال العرض</option><option value="won">مقبول</option><option value="closed">مغلق</option></select></article>)}</div>}
 </section></AdminShell>;
}