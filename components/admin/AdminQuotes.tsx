"use client";
import {useEffect,useMemo,useState} from "react";
import AdminShell from "@/components/admin/AdminShell";
import {getSupabaseBrowser} from "@/lib/supabase-browser";

type SpecValue=string|number|boolean|null;
type Item={id:string;title:string;quantity:number;specifications:Record<string,SpecValue>};
type TeamMember={id:string;email:string;role:string};
type QuoteEvent={id:string;event_type:string;from_status:string|null;to_status:string|null;message:string|null;created_by:string|null;created_at:string};
type Quote={id:string;customer_name:string|null;company_name:string|null;phone:string|null;whatsapp:string|null;email:string|null;city:string|null;deadline:string|null;assigned_to:string|null;notes:string|null;source:string;status:string;created_at:string;updated_at:string;quote_request_items?:Item[]};

const STATUS:Record<string,string>={new:"جديد",reviewing:"قيد المراجعة",need_more_info:"نحتاج معلومات",pricing:"قيد التسعير",sent:"تم إرسال العرض",negotiation:"تفاوض",won:"تم الاتفاق",lost:"لم يتم الاتفاق",archived:"مؤرشف"};
const EVENT_LABELS:Record<string,string>={created:"إنشاء الطلب",status_changed:"تغيير الحالة",assigned:"إسناد",note:"ملاحظة داخلية"};
const SPEC_LABELS:Record<string,string>={size:"المقاس",width:"العرض",height:"الارتفاع",material:"الخامة",paper:"الورق",qty:"الكمية",sides:"الأوجه",finish:"التشطيب",lamination:"السلفنة",binding:"التجليد",fold:"الطي",cut:"القص",lighting:"الإضاءة",installation:"التركيب",install:"التركيب",location:"الموقع",pages:"عدد الصفحات",copies:"النسخ",numbering:"الترقيم",operation:"العملية",thickness:"السماكة",personalization:"التخصيص",usage:"الاستخدام",use:"الاستخدام",design:"التصميم",signage:"اللوحة أو الحروف",scope:"النطاق",status:"حالة العلامة",deadline:"الموعد",platforms:"المنصات",copy:"المحتوى",period:"الفترة",business:"النشاط",item:"المنتج",product:"المنتج",books:"عدد الدفاتر",type:"النوع"};
function specEntries(specifications:Record<string,SpecValue>|null|undefined){return Object.entries(specifications||{}).filter(([,value])=>value!==null&&value!==""&&value!==false&&value!==undefined&&typeof value!=="object");}
function waNumber(value:string|null|undefined){const digits=String(value||"").replace(/\D/g,"");if(!digits)return "";return digits.startsWith("0")?"967"+digits.slice(1):digits;}
function waMessage(row:Quote){return encodeURIComponent("مرحبًا "+(row.customer_name||"")+"، معك فريق رواج للطباعة والإعلان بخصوص طلب عرض السعر رقم "+row.id.slice(0,8)+".");}

export default function AdminQuotes(){
 const [rows,setRows]=useState<Quote[]>([]),[team,setTeam]=useState<TeamMember[]>([]),[events,setEvents]=useState<QuoteEvent[]>([]);
 const [loading,setLoading]=useState(true),[eventsLoading,setEventsLoading]=useState(false),[saving,setSaving]=useState<string|null>(null),[error,setError]=useState("");
 const [query,setQuery]=useState(""),[filter,setFilter]=useState("all"),[active,setActive]=useState<Quote|null>(null),[note,setNote]=useState("");

 async function authFetch(path:string){const {data:{session}}=await getSupabaseBrowser().auth.getSession();if(!session)throw new Error("انتهت الجلسة");return fetch(path,{headers:{Authorization:"Bearer "+session.access_token}});}

 async function load(){
  setLoading(true);setError("");
  const supabase=getSupabaseBrowser();
  const [quotesRes,teamRes]=await Promise.all([
   supabase.from("quote_requests").select("id,customer_name,company_name,phone,whatsapp,email,city,deadline,assigned_to,notes,source,status,created_at,updated_at,quote_request_items(id,title,quantity,specifications)").order("created_at",{ascending:false}),
   authFetch("/api/admin/quote-team").then(async r=>r.ok?(await r.json()).users||[]:[]).catch(()=>[])
  ]);
  if(quotesRes.error)setError("تعذر تحميل الطلبات. حاول مرة أخرى.");
  const next=(quotesRes.data||[]) as Quote[];
  setRows(next);setTeam(teamRes as TeamMember[]);setLoading(false);
  if(active){const refreshed=next.find(row=>row.id===active.id);if(refreshed)setActive(refreshed);}
 }

 useEffect(()=>{void load();},[]);

 async function actorId(){const {data:{session}}=await getSupabaseBrowser().auth.getSession();return session?.user.id||null;}

 async function loadEvents(id:string){
  setEventsLoading(true);
  const {data,error:eventError}=await getSupabaseBrowser().from("quote_events").select("id,event_type,from_status,to_status,message,created_by,created_at").eq("quote_request_id",id).order("created_at",{ascending:false});
  if(eventError)setError("تعذر تحميل سجل الطلب.");
  setEvents((data||[]) as QuoteEvent[]);setEventsLoading(false);
 }

 async function openDetails(row:Quote){setActive(row);setNote("");setEvents([]);await loadEvents(row.id);}

 async function setStatus(id:string,status:string){
  const previous=rows.find(row=>row.id===id)?.status;if(!previous||previous===status)return;
  setSaving(id);setError("");const supabase=getSupabaseBrowser(),actor=await actorId();
  const {error:updateError}=await supabase.from("quote_requests").update({status,updated_at:new Date().toISOString()}).eq("id",id);
  if(updateError){setError("تعذر تحديث حالة الطلب.");setSaving(null);return;}
  await supabase.from("quote_events").insert({quote_request_id:id,event_type:"status_changed",from_status:previous,to_status:status,message:"الحالة: "+(STATUS[previous]||previous)+" ← "+(STATUS[status]||status),created_by:actor});
  await load();if(active?.id===id)await loadEvents(id);setSaving(null);
 }

 async function assign(id:string,userId:string){
  setSaving(id);setError("");const supabase=getSupabaseBrowser(),actor=await actorId(),value=userId||null;
  const {error:updateError}=await supabase.from("quote_requests").update({assigned_to:value,updated_at:new Date().toISOString()}).eq("id",id);
  if(updateError){setError("تعذر تعيين المسؤول.");setSaving(null);return;}
  const member=team.find(x=>x.id===userId);
  await supabase.from("quote_events").insert({quote_request_id:id,event_type:"assigned",message:value?"تم إسناد الطلب إلى "+(member?.email||"عضو الفريق"):"تم إلغاء إسناد الطلب",created_by:actor});
  await load();if(active?.id===id)await loadEvents(id);setSaving(null);
 }

 async function addNote(){
  if(!active||!note.trim())return;
  const value=note.trim().slice(0,3000);setSaving(active.id);setError("");
  const actor=await actorId();
  const {error:noteError}=await getSupabaseBrowser().from("quote_events").insert({quote_request_id:active.id,event_type:"note",message:value,is_internal:true,created_by:actor});
  if(noteError){setError("تعذر حفظ الملاحظة الداخلية.");setSaving(null);return;}
  setNote("");await getSupabaseBrowser().from("quote_requests").update({updated_at:new Date().toISOString()}).eq("id",active.id);
  await loadEvents(active.id);await load();setSaving(null);
 }

 const visible=useMemo(()=>{const term=query.trim().toLowerCase();return rows.filter(row=>(filter==="all"||row.status===filter)&&(!term||[row.customer_name,row.company_name,row.phone,row.whatsapp,row.email,row.city,row.notes,...(row.quote_request_items||[]).map(item=>item.title)].some(value=>value?.toLowerCase().includes(term))));},[rows,query,filter]);
 const counts=useMemo(()=>Object.keys(STATUS).reduce<Record<string,number>>((result,key)=>{result[key]=rows.filter(row=>row.status===key).length;return result;},{all:rows.length}),[rows]);
 const activeAssignee=active?team.find(member=>member.id===active.assigned_to):null;
 const whatsapp=active?waNumber(active.whatsapp||active.phone):"";

 return <AdminShell><section className="admin-page">
  <div className="admin-page-head"><div><span className="admin-kicker">RFQ SALES PIPELINE</span><h1>طلبات عروض السعر</h1><p>العميل والخدمات والمواصفات والمسؤول وحالة المتابعة في شاشة واحدة.</p></div><button className="admin-primary" onClick={()=>void load()}>تحديث</button></div>
  <div className="quote-admin-controls"><input aria-label="البحث في طلبات عروض السعر" value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث بالعميل، المؤسسة، الجوال أو الخدمة…" /><select aria-label="تصفية الطلبات حسب الحالة" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">كل الحالات ({counts.all||0})</option>{Object.entries(STATUS).map(([value,label])=><option key={value} value={value}>{label} ({counts[value]||0})</option>)}</select></div>
  {error&&<div className="admin-message" role="alert">{error}</div>}
  {loading?<p>جاري تحميل الطلبات…</p>:!visible.length?<div className="admin-empty"><strong>لا توجد طلبات مطابقة</strong><span>غيّر البحث أو مرشح الحالة لعرض نتائج أخرى.</span></div>:<div className="admin-list quote-admin-list">{visible.map(row=><article key={row.id} className="admin-list-row quote-admin-card">
   <div className="quote-admin-main"><div className="quote-admin-customer"><div className="quote-customer-title"><strong>{row.customer_name||"عميل بدون اسم"}</strong>{row.company_name&&<span>{row.company_name}</span>}</div><small>{new Date(row.created_at).toLocaleString("ar")} · رقم الطلب {row.id.slice(0,8)}</small><div className="quote-contact-grid">{row.phone&&<span>جوال: <b>{row.phone}</b></span>}{row.email&&<span>بريد: <b>{row.email}</b></span>}{row.city&&<span>المدينة: <b>{row.city}</b></span>}{row.deadline&&<span>الموعد: <b>{row.deadline}</b></span>}</div>{row.notes&&<p>{row.notes}</p>}</div>
   <div className="quote-admin-items">{row.quote_request_items?.map(item=><div key={item.id} className="admin-quote-item"><b>{item.title} × {item.quantity}</b>{specEntries(item.specifications).length>0&&<dl>{specEntries(item.specifications).map(([key,value])=><div key={key}><dt>{SPEC_LABELS[key]||key}</dt><dd>{String(value)}</dd></div>)}</dl>}</div>)}</div></div>
   <div className="quote-admin-side"><label className="quote-status"><span>حالة المتابعة</span><select disabled={saving===row.id} value={row.status} onChange={e=>void setStatus(row.id,e.target.value)}>{Object.entries(STATUS).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label><label className="quote-status"><span>المسؤول</span><select disabled={saving===row.id} value={row.assigned_to||""} onChange={e=>void assign(row.id,e.target.value)}><option value="">غير مسند</option>{team.map(member=><option key={member.id} value={member.id}>{member.email} — {member.role==="sales"?"مبيعات":member.role==="owner"?"مالك":"مدير"}</option>)}</select></label><button className="admin-secondary quote-details-button" onClick={()=>void openDetails(row)}>فتح التفاصيل والسجل</button></div>
  </article>)}</div>}

  {active&&<div className="admin-modal quote-detail-modal">
   <button className="admin-modal-backdrop" onClick={()=>setActive(null)} aria-label="إغلاق تفاصيل الطلب"/>
   <div className="admin-modal-card quote-detail-card">
    <div className="admin-modal-head"><div><span>RFQ · {active.id.slice(0,8)}</span><h2>{active.customer_name||"طلب عرض سعر"}</h2></div><button onClick={()=>setActive(null)}>×</button></div>
    <div className="quote-detail-grid">
     <div className="quote-detail-primary">
      <section className="quote-detail-section"><div className="quote-detail-section-head"><div><span className="admin-kicker">العميل</span><h3>{active.company_name||active.customer_name||"عميل"}</h3></div><span className={"quote-pipeline-status status-"+active.status}>{STATUS[active.status]||active.status}</span></div>
       <div className="quote-detail-contact">
        {active.phone&&<a href={"tel:"+active.phone}>اتصال · {active.phone}</a>}
        {whatsapp&&<a href={"https://wa.me/"+whatsapp+"?text="+waMessage(active)} target="_blank" rel="noreferrer">واتساب</a>}
        {active.email&&<a href={"mailto:"+active.email+"?subject="+encodeURIComponent("عرض سعر رواج · "+active.id.slice(0,8))}>بريد إلكتروني</a>}
       </div>
       <dl className="quote-detail-meta">
        {active.city&&<div><dt>المدينة</dt><dd>{active.city}</dd></div>}
        {active.deadline&&<div><dt>الموعد المطلوب</dt><dd>{active.deadline}</dd></div>}
        <div><dt>المسؤول</dt><dd>{activeAssignee?.email||"غير مسند"}</dd></div>
        <div><dt>المصدر</dt><dd>{active.source==="website"?"المنصة":active.source}</dd></div>
        <div><dt>تاريخ الطلب</dt><dd>{new Date(active.created_at).toLocaleString("ar")}</dd></div>
        <div><dt>آخر نشاط</dt><dd>{new Date(active.updated_at).toLocaleString("ar")}</dd></div>
       </dl>
       {active.notes&&<div className="quote-customer-note"><strong>ملاحظة العميل</strong><p>{active.notes}</p></div>}
      </section>

      <section className="quote-detail-section"><span className="admin-kicker">نطاق الطلب</span><h3>الخدمات والمواصفات</h3><div className="quote-detail-items">{active.quote_request_items?.map(item=><article key={item.id}><div><strong>{item.title}</strong><span>الكمية: {item.quantity}</span></div>{specEntries(item.specifications).length>0&&<dl>{specEntries(item.specifications).map(([key,value])=><div key={key}><dt>{SPEC_LABELS[key]||key}</dt><dd>{String(value)}</dd></div>)}</dl>}</article>)}</div></section>
     </div>

     <aside className="quote-detail-sidebar">
      <section className="quote-detail-section quote-note-composer"><span className="admin-kicker">ملاحظة داخلية</span><h3>سجل متابعة جديد</h3><textarea value={note} onChange={e=>setNote(e.target.value)} maxLength={3000} placeholder="اكتب ما تم مع العميل، متطلبات التسعير، أو الخطوة التالية…"/><div><small>{note.length}/3000</small><button className="admin-primary" disabled={!note.trim()||saving===active.id} onClick={()=>void addNote()}>{saving===active.id?"جارٍ الحفظ…":"حفظ في السجل"}</button></div></section>
      <section className="quote-detail-section"><span className="admin-kicker">TIMELINE</span><h3>سجل النشاط</h3>{eventsLoading?<div className="quote-event-empty">جارٍ تحميل السجل…</div>:events.length?<div className="quote-timeline">{events.map(event=>{const member=team.find(x=>x.id===event.created_by);return <div className="quote-timeline-event" key={event.id}><i/><div><div><strong>{EVENT_LABELS[event.event_type]||event.event_type}</strong><time>{new Date(event.created_at).toLocaleString("ar")}</time></div><p>{event.message||"تم تحديث الطلب."}</p>{member&&<small>{member.email}</small>}</div></div>})}</div>:<div className="quote-event-empty">لا توجد أحداث إضافية بعد.</div>}</section>
     </aside>
    </div>
   </div>
  </div>}
 </section></AdminShell>;
}
