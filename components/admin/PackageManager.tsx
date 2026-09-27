"use client";

import {ChangeEvent,useEffect,useMemo,useState} from "react";
import {getSupabaseBrowser} from "@/lib/supabase-browser";

type Row=Record<string,any>;
type PackageItem={service_id:string;quantity:number;note:string};
type PackageForm={
  name:string;eyebrow:string;description:string;hero_url:string;
  starts_at:string;ends_at:string;featured:boolean;is_published:boolean;items:PackageItem[];
};

const emptyForm:PackageForm={name:"",eyebrow:"",description:"",hero_url:"",starts_at:"",ends_at:"",featured:false,is_published:false,items:[]};
const asLocal=(value:string|null|undefined)=>value?new Date(value).toISOString().slice(0,16):"";
const toIso=(value:string)=>value?new Date(value).toISOString():null;

export default function PackageManager(){
 const [rows,setRows]=useState<Row[]>([]),[services,setServices]=useState<Row[]>([]);
 const [editing,setEditing]=useState<Row|null>(null),[form,setForm]=useState<PackageForm>(emptyForm);
 const [open,setOpen]=useState(false),[loading,setLoading]=useState(true),[saving,setSaving]=useState(false),[uploading,setUploading]=useState(false),[message,setMessage]=useState(""),[serviceToAdd,setServiceToAdd]=useState("");

 async function load(){
  setLoading(true);
  const supabase=getSupabaseBrowser();
  const [packagesRes,servicesRes]=await Promise.all([
   supabase.from("packages").select("*,package_services(service_id,quantity,note)").order("sort_order",{ascending:true}),
   supabase.from("services").select("id,name,slug,is_published,verification_status,department_id").in("verification_status",["verified","approved"]).order("name",{ascending:true})
  ]);
  if(packagesRes.error)setMessage(packagesRes.error.message);
  setRows(packagesRes.data||[]);setServices(servicesRes.data||[]);setLoading(false);
 }
 useEffect(()=>{void load();},[]);

 function openNew(){setEditing(null);setForm({...emptyForm,items:[]});setServiceToAdd("");setMessage("");setOpen(true);}
 function openEdit(row:Row){
  const items=Array.isArray(row.package_services)?row.package_services.map((item:any)=>({service_id:String(item.service_id),quantity:Math.max(1,Number(item.quantity)||1),note:String(item.note||"")})):[];
  setEditing(row);setForm({
   name:row.name||"",eyebrow:row.eyebrow||"",description:row.description||"",hero_url:row.hero_url||"",
   starts_at:asLocal(row.starts_at),ends_at:asLocal(row.ends_at),featured:Boolean(row.featured),is_published:Boolean(row.is_published),items
  });setServiceToAdd("");setMessage("");setOpen(true);
 }

 function addService(){
  if(!serviceToAdd||form.items.some(item=>item.service_id===serviceToAdd))return;
  setForm(current=>({...current,items:[...current.items,{service_id:serviceToAdd,quantity:1,note:""}]}));
  setServiceToAdd("");
 }
 function updateItem(index:number,patch:Partial<PackageItem>){setForm(current=>({...current,items:current.items.map((item,i)=>i===index?{...item,...patch}:item)}));}
 function removeItem(index:number){setForm(current=>({...current,items:current.items.filter((_,i)=>i!==index)}));}

 async function uploadHero(event:ChangeEvent<HTMLInputElement>){
  const file=event.target.files?.[0];if(!file)return;
  setUploading(true);setMessage("");
  try{
   const clean=file.name.replace(/[^a-zA-Z0-9._-]+/g,"-");
   const path="packages/"+Date.now()+"-"+clean;
   const supabase=getSupabaseBrowser();
   const {error}=await supabase.storage.from("rawaj-media").upload(path,file,{upsert:false});
   if(error)throw error;
   const url=supabase.storage.from("rawaj-media").getPublicUrl(path).data.publicUrl;
   setForm(current=>({...current,hero_url:url}));
  }catch(error:any){setMessage(error?.message||"تعذر رفع الصورة.");}
  finally{setUploading(false);event.target.value="";}
 }

 const selected=useMemo(()=>form.items.map(item=>({...item,service:services.find(s=>s.id===item.service_id)})),[form.items,services]);
 const availableServices=useMemo(()=>services.filter(service=>!form.items.some(item=>item.service_id===service.id)),[services,form.items]);

 async function save(){
  if(!form.name.trim()){setMessage("اكتب اسم الباقة أولًا.");return;}
  if(form.starts_at&&form.ends_at&&new Date(form.starts_at)>=new Date(form.ends_at)){setMessage("نهاية العرض يجب أن تكون بعد بدايته.");return;}
  if(form.is_published){
   if(!form.hero_url){setMessage("الباقة المنشورة تحتاج صورة رئيسية.");return;}
   if(!form.items.length){setMessage("أضف خدمة واحدة على الأقل قبل نشر الباقة.");return;}
   const invalid=selected.filter(item=>!item.service||!item.service.is_published||item.service.verification_status!=="approved");
   if(invalid.length){setMessage("لا يمكن نشر الباقة: كل خدماتها يجب أن تكون معتمدة ومنشورة.");return;}
  }

  setSaving(true);setMessage("");
  try{
   const supabase=getSupabaseBrowser();
   const maxOrder=rows.reduce((max,row)=>Math.max(max,Number(row.sort_order)||0),0);
   const basePayload={
    name:form.name.trim(),eyebrow:form.eyebrow.trim()||null,description:form.description.trim()||null,
    hero_url:form.hero_url||null,original_price:null,offer_price:null,price_label:null,
    starts_at:toIso(form.starts_at),ends_at:toIso(form.ends_at),featured:form.featured,
    sort_order:editing?editing.sort_order:maxOrder+1,is_published:false,updated_at:new Date().toISOString()
   };

   let packageId=editing?.id as string|undefined;
   if(editing){
    const {error}=await supabase.from("packages").update(basePayload).eq("id",editing.id);if(error)throw error;
   }else{
    const slug="package-"+Date.now().toString(36);
    const {data,error}=await supabase.from("packages").insert({...basePayload,slug}).select("id").single();if(error)throw error;packageId=data.id;
   }
   if(!packageId)throw new Error("تعذر تحديد الباقة.");

   const {error:deleteError}=await supabase.from("package_services").delete().eq("package_id",packageId);if(deleteError)throw deleteError;
   if(form.items.length){
    const {error:itemsError}=await supabase.from("package_services").insert(form.items.map(item=>({
     package_id:packageId,service_id:item.service_id,quantity:Math.max(1,Number(item.quantity)||1),note:item.note.trim()||null
    })));if(itemsError)throw itemsError;
   }

   if(form.is_published){
    const {error:publishError}=await supabase.from("packages").update({is_published:true,updated_at:new Date().toISOString()}).eq("id",packageId);if(publishError)throw publishError;
   }

   setOpen(false);await load();setMessage(editing?"تم تحديث الباقة ومحتواها.":"تم إنشاء الباقة.");
  }catch(error:any){setMessage(error?.message||"تعذر حفظ الباقة.");}
  finally{setSaving(false);}
 }

 async function remove(row:Row){
  if(!window.confirm("حذف باقة «"+row.name+"» وكل روابط خدماتها؟"))return;
  const {error}=await getSupabaseBrowser().from("packages").delete().eq("id",row.id);
  if(error)setMessage(error.message);else{setMessage("تم حذف الباقة.");await load();}
 }

 return <section className="admin-page package-manager-page">
  <div className="admin-page-head"><div><span className="admin-kicker">BUNDLES</span><h1>الباقات والعروض</h1><p>كوّن الباقة من خدمات الكتالوج نفسها، وحدد الكمية والملاحظة لكل خدمة من شاشة واحدة.</p></div><button className="admin-primary" onClick={openNew}>+ باقة جديدة</button></div>
  {message&&<div className="admin-message">{message}</div>}
  {loading?<div className="admin-empty">جارٍ تحميل الباقات…</div>:<div className="package-admin-grid">{rows.map(row=><article className="package-admin-card" key={row.id}>
   <div className="package-admin-media" style={{backgroundImage:row.hero_url?"url("+row.hero_url+")":"none"}}>{!row.hero_url&&<span>لا توجد صورة</span>}<b className={row.is_published?"on":"off"}>{row.is_published?"منشورة":"مسودة"}</b></div>
   <div className="package-admin-copy"><small>{row.eyebrow||"باقة رواج"}</small><h2>{row.name}</h2><p>{row.description||"لا يوجد وصف بعد."}</p><div className="package-admin-meta"><span>{Array.isArray(row.package_services)?row.package_services.length:0} خدمات</span>{row.featured&&<span>مميزة</span>}{row.ends_at&&<span>حتى {new Date(row.ends_at).toLocaleDateString("ar")}</span>}</div><div className="package-admin-actions"><button onClick={()=>openEdit(row)}>تعديل الباقة</button><button className="danger" onClick={()=>void remove(row)}>حذف</button></div></div>
  </article>)}</div>}

  {open&&<div className="admin-modal">
   <button className="admin-modal-backdrop" onClick={()=>setOpen(false)} aria-label="إغلاق"/>
   <div className="admin-modal-card package-admin-modal">
    <div className="admin-modal-head"><div><span>{editing?"تعديل الباقة":"باقة جديدة"}</span><h2>{form.name||"إنشاء باقة"}</h2></div><button onClick={()=>setOpen(false)}>×</button></div>
    <div className="admin-form-grid">
     <label><span>اسم الباقة</span><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
     <label><span>العنوان التسويقي</span><input value={form.eyebrow} onChange={e=>setForm({...form,eyebrow:e.target.value})} placeholder="مثال: انطلاقة العلامة"/></label>
     <label className="wide"><span>الوصف</span><textarea rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
     <label><span>بداية العرض</span><input type="datetime-local" value={form.starts_at} onChange={e=>setForm({...form,starts_at:e.target.value})}/></label>
     <label><span>نهاية العرض</span><input type="datetime-local" value={form.ends_at} onChange={e=>setForm({...form,ends_at:e.target.value})}/></label>
     <label className="wide"><span>الصورة الرئيسية</span><div className="package-image-control">{form.hero_url&&<img src={form.hero_url} alt=""/>}<input value={form.hero_url} onChange={e=>setForm({...form,hero_url:e.target.value})} placeholder="رابط الصورة"/><label className="admin-secondary file-button">{uploading?"جارٍ الرفع…":"رفع صورة"}<input type="file" accept="image/*" disabled={uploading} onChange={uploadHero}/></label></div></label>
    </div>

    <section className="package-builder">
     <div className="package-builder-head"><div><span className="admin-kicker">الخدمات داخل الباقة</span><h3>{form.items.length?"تم اختيار "+form.items.length+" خدمات":"أضف خدمات من Master Catalog"}</h3></div><div><select value={serviceToAdd} onChange={e=>setServiceToAdd(e.target.value)}><option value="">اختر خدمة…</option>{availableServices.map(service=><option key={service.id} value={service.id}>{service.name}{service.is_published&&service.verification_status==="approved"?" · منشورة":" · مسودة"}</option>)}</select><button className="admin-secondary" onClick={addService} disabled={!serviceToAdd}>إضافة</button></div></div>
     <div className="package-builder-items">{selected.map((item,index)=><article key={item.service_id}><div><strong>{item.service?.name||"خدمة غير موجودة"}</strong><small>{item.service?.is_published&&item.service?.verification_status==="approved"?"جاهزة للباقة المنشورة":"مسودة — تصلح فقط لباقة غير منشورة"}</small></div><label><span>الكمية</span><input type="number" min={1} value={item.quantity} onChange={e=>updateItem(index,{quantity:Math.max(1,Number(e.target.value)||1)})}/></label><label className="package-item-note"><span>ملاحظة</span><input value={item.note} onChange={e=>updateItem(index,{note:e.target.value})} placeholder="مثال: 500 نسخة"/></label><button onClick={()=>removeItem(index)} aria-label="إزالة الخدمة">×</button></article>)}</div>
    </section>

    <div className="package-publish-options"><label><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/><span>باقة مميزة</span></label><label><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form,is_published:e.target.checked})}/><span>منشورة للعملاء</span></label><small>لا يمكن نشر الباقة إلا إذا كانت الصورة موجودة وكل الخدمات المختارة معتمدة ومنشورة.</small></div>
    <div className="admin-modal-actions"><button className="admin-secondary" onClick={()=>setOpen(false)}>إلغاء</button><button className="admin-primary" disabled={saving} onClick={()=>void save()}>{saving?"جارٍ الحفظ…":"حفظ الباقة"}</button></div>
   </div>
  </div>}
 </section>;
}
