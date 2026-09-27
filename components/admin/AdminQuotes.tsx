"use client";
import {useEffect,useMemo,useState} from "react";
import AdminShell from "@/components/admin/AdminShell";
import {getSupabaseBrowser} from "@/lib/supabase-browser";

type SpecValue=string|number|boolean|null;
type Item={id:string;title:string;quantity:number;specifications:Record<string,SpecValue>};
type TeamMember={id:string;email:string;role:string};
type Quote={id:string;customer_name:string|null;company_name:string|null;phone:string|null;whatsapp:string|null;email:string|null;city:string|null;deadline:string|null;assigned_to:string|null;notes:string|null;source:string;status:string;created_at:string;updated_at:string;quote_request_items?:Item[]};

const STATUS:Record<string,string>={new:"جديد",reviewing:"قيد المراجعة",need_more_info:"نحتاج معلومات",pricing:"قيد التسعير",sent:"تم إرسال العرض",negotiation:"تفاوض",won:"تم الاتفاق",lost:"لم يتم الاتفاق",archived:"مؤرشف"};
const SPEC_LABELS:Record<string,string>={size:"المقاس",width:"العرض",height:"الارتفاع",material:"الخامة",paper:"الورق",qty:"الكمية",sides:"الأوجه",finish:"التشطيب",lamination:"السلفنة",binding:"التجليد",fold:"الطي",cut:"القص",lighting:"الإضاءة",installation:"التركيب",install:"التركيب",location:"الموقع",pages:"عدد الصفحات",copies:"النسخ",numbering:"الترقيم",operation:"العملية",thickness:"السماكة",personalization:"التخصيص",usage:"الاستخدام",use:"الاستخدام",design:"التصميم",signage:"اللوحة أو الحروف",scope:"النطاق",status:"حالة العلامة",deadline:"الموعد",platforms:"المنصات",copy:"المحتوى",period:"الفترة",business:"النشاط",item:"المنتج",product:"المنتج",books:"عدد الدفاتر",type:"النوع"};
function specEntries(specifications:Record<string,SpecValue>|null|undefined){return Object.entries(specifications||{}).filter(([,value])=>value!==null&&value!==""&&value!==false&&value!==undefined&&typeof value!=="object");}

export default function AdminQuotes(){
 const [rows,setRows]=useState<Quote[]>([]),[team,setTeam]=useState<TeamMember[]>([]),[loading,setLoading]=useState(true),[saving,setSaving]=useState<string|null>(null),[error,setError]=useState(""),[query,setQuery]=useState(""),[filter,setFilter]=useState("all");

 async function authFetch(path:string){const {data:{session}}=await getSupabaseBrowser().auth.getSession();if(!session)throw new Error("انتهت الجلسة");return fetch(path,{headers:{Authorization:"Bearer "+session.access_token}});}

 async function load(){
  setLoading(true);setError("");
  const supabase=getSupabaseBrowser();
  const [quotesRes,teamRes]=await Promise.all([
   supabase.from("quote_requests").select("id,customer_name,company_name,phone,whatsapp,email,city,deadline,assigned_to,notes,source,status,created_at,updated_at,quote_request_items(id,title,quantity,specifications)").order("created_at",{ascending:false}),
   authFetch("/api/admin/quote-team").then(async r=>r.ok?(await r.json()).users||[]:[]).catch(()=>[])
  ]);
  if(quotesRes.error)setError("تعذر تحميل الطلبات. حاول مرة أخرى.");
  setRows((quotesRes.data||[]) as Quote[]);setTeam(teamRes as TeamMember[]);setLoading(false);
 }
 useEffect(()=>{void load();},[]);

 async function actorId(){const {data:{session}}=await getSupabaseBrowser().auth.getSession();return session?.user.id||null;}

 async function setStatus(id:string,status:string){
  const previous=rows.find(row=>row.id===id)?.status;if(!previous||previous===status)return;
  setSaving(id);setError("");const supabase=getSupabaseBrowser(),actor=await actorId();
  const {error:updateError}=await supabase.from("quote_requests").update({status,updated_at:new Date().toISOString()}).eq("id",id);
  if(updateError){setError("تعذر تحديث حالة الطلب.");setSaving(null);return;}
  await supabase.from("quote_events").insert({quote_request_id:id,event_type:"status_changed",from_status:previous,to_status:status,message:"الحالة: "+(STATUS[previous]||previous)+" ← "+(STATUS[status]||status),created_by:actor});
  await load();setSaving(null);
 }

 async function assign(id:string,userId:string){
  setSaving(id);setError("");const supabase=getSupabaseBrowser(),actor=await actorId(),value=userId||null;
  const {error:updateError}=await supabase.from("quote_requests").update({assigned_to:value,updated_at:new Date().toISOString()}).eq("id",id);
  if(updateError){setError("تعذر تعيين المسؤول.");setSaving(null);return;}
  const member=team.find(x=>x.id===userId);
  await supabase.from("quote_events").insert({quote_request_id:id,event_type:"assigned",message:value?"تم إسناد الطلب إلى "+(member?.email||"عضو الفريق"):"تم إلغاء إسناد الطلب",created_by:actor});
  await load();setSaving(null);
 }

 const visible=useMemo(()=>{const term=query.trim().toLowerCase();return rows.filter(row=>(filter==="all"||row.status===filter)&&(!term||[row.customer_name,row.company_name,row.phone,row.whatsapp,row.email,row.city,row.notes,...(row.quote_request_items||[]).map(item=>item.title)].some(value=>value?.toLowerCase().includes(term))));},[rows,query,filter]);
 const counts=useMemo(()=>Object.keys(STATUS).reduce<Record<string,number>>((result,key)=>{result[key]=rows.filter(row=>row.status===key).length;return result;},{all:rows.length}),[rows]);

 return <AdminShell><section className="admin-page">
  <div className="admin-page-head"><div><span className="admin-kicker">RFQ SALES PIPELINE</span><h1>طلبات عروض السعر</h1><p>العميل والخدمات والمواصفات والمسؤول وحالة المتابعة في شاشة واحدة.</p></div><button className="admin-primary" onClick={()=>void load()}>تحديث</button></div>
  <div className="quote-admin-controls"><input aria-label="البحث في طلبات عروض السعر" value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث بالعميل، المؤسسة، الجوال أو الخدمة…" /><select aria-label="تصفية الطلبات حسب الحالة" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">كل الحالات ({counts.all||0})</option>{Object.entries(STATUS).map(([value,label])=><option key={value} value={value}>{label} ({counts[value]||0})</option>)}</select></div>
  {error&&<div className="admin-message" role="alert">{error}</div>}
  {loading?<p>جاري تحميل الطلبات…</p>:!visible.length?<div className="admin-empty"><strong>لا توجد طلبات مطابقة</strong><span>غيّر البحث أو مرشح الحالة لعرض نتائج أخرى.</span></div>:<div className="admin-list quote-admin-list">{visible.map(row=><article key={row.id} className="admin-list-row quote-admin-card">
   <div className="quote-admin-main"><div className="quote-admin-customer"><div className="quote-customer-title"><strong>{row.customer_name||"عميل بدون اسم"}</strong>{row.company_name&&<span>{row.company_name}</span>}</div><small>{new Date(row.created_at).toLocaleString("ar")} · رقم الطلب {row.id.slice(0,8)}</small><div className="quote-contact-grid">{row.phone&&<span>جوال: <b>{row.phone}</b></span>}{row.email&&<span>بريد: <b>{row.email}</b></span>}{row.city&&<span>المدينة: <b>{row.city}</b></span>}{row.deadline&&<span>الموعد: <b>{row.deadline}</b></span>}</div>{row.notes&&<p>{row.notes}</p>}</div>
   <div className="quote-admin-items">{row.quote_request_items?.map(item=><div key={item.id} className="admin-quote-item"><b>{item.title} × {item.quantity}</b>{specEntries(item.specifications).length>0&&<dl>{specEntries(item.specifications).map(([key,value])=><div key={key}><dt>{SPEC_LABELS[key]||key}</dt><dd>{String(value)}</dd></div>)}</dl>}</div>)}</div></div>
   <div className="quote-admin-side"><label className="quote-status"><span>حالة المتابعة</span><select disabled={saving===row.id} value={row.status} onChange={e=>void setStatus(row.id,e.target.value)}>{Object.entries(STATUS).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label><label className="quote-status"><span>المسؤول</span><select disabled={saving===row.id} value={row.assigned_to||""} onChange={e=>void assign(row.id,e.target.value)}><option value="">غير مسند</option>{team.map(member=><option key={member.id} value={member.id}>{member.email} — {member.role==="sales"?"مبيعات":member.role==="owner"?"مالك":"مدير"}</option>)}</select></label></div>
  </article>)}</div>}
 </section></AdminShell>;
}
