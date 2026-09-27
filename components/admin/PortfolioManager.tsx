"use client";

import {ChangeEvent,useEffect,useMemo,useState} from "react";
import {getSupabaseBrowser} from "@/lib/supabase-browser";

type Row=Record<string,any>;
type PortfolioForm={
 title:string;category:string;summary:string;description:string;cover_url:string;gallery:string[];
 video_url:string;project_date:string;client_name:string;services:string;featured:boolean;is_published:boolean;
};
const emptyForm:PortfolioForm={title:"",category:"",summary:"",description:"",cover_url:"",gallery:[],video_url:"",project_date:"",client_name:"",services:"",featured:false,is_published:false};

export default function PortfolioManager(){
 const [rows,setRows]=useState<Row[]>([]),[editing,setEditing]=useState<Row|null>(null),[form,setForm]=useState<PortfolioForm>(emptyForm);
 const [open,setOpen]=useState(false),[loading,setLoading]=useState(true),[saving,setSaving]=useState(false),[uploading,setUploading]=useState(false),[message,setMessage]=useState("");

 async function load(){
  setLoading(true);
  const {data,error}=await getSupabaseBrowser().from("portfolio_items").select("*").order("sort_order",{ascending:true});
  if(error)setMessage(error.message);setRows(data||[]);setLoading(false);
 }
 useEffect(()=>{void load();},[]);

 function openNew(){setEditing(null);setForm({...emptyForm,gallery:[]});setMessage("");setOpen(true);}
 function openEdit(row:Row){
  setEditing(row);setForm({
   title:row.title||"",category:row.category||"",summary:row.summary||"",description:row.description||"",cover_url:row.cover_url||"",
   gallery:Array.isArray(row.gallery)?row.gallery.filter((x:any)=>typeof x==="string"):[],video_url:row.video_url||"",
   project_date:row.project_date||"",client_name:row.client_name||"",services:Array.isArray(row.services)?row.services.join("\n"):"",
   featured:Boolean(row.featured),is_published:Boolean(row.is_published)
  });setMessage("");setOpen(true);
 }

 async function uploadFile(file:File,folder:string){
  const allowed=["image/jpeg","image/png","image/webp","image/avif","image/gif"];
  if(!allowed.includes(file.type))throw new Error("استخدم صورة JPG أو PNG أو WebP أو AVIF أو GIF.");
  if(file.size>25*1024*1024)throw new Error("حجم الصورة أكبر من 25MB.");
  const clean=file.name.replace(/[^a-zA-Z0-9._-]+/g,"-");
  const path=folder+"/"+Date.now()+"-"+clean;
  const supabase=getSupabaseBrowser();
  const {error}=await supabase.storage.from("rawaj-media").upload(path,file,{upsert:false});
  if(error)throw error;
  return supabase.storage.from("rawaj-media").getPublicUrl(path).data.publicUrl as string;
 }

 async function uploadCover(event:ChangeEvent<HTMLInputElement>){
  const file=event.target.files?.[0];if(!file)return;setUploading(true);setMessage("");
  try{const url=await uploadFile(file,"portfolio/covers");setForm(current=>({...current,cover_url:url}));}
  catch(error:any){setMessage(error?.message||"تعذر رفع الغلاف.");}
  finally{setUploading(false);event.target.value="";}
 }
 async function uploadGallery(event:ChangeEvent<HTMLInputElement>){
  const files=Array.from(event.target.files||[]).slice(0,20);if(!files.length)return;setUploading(true);setMessage("");
  try{const urls:string[]=[];for(const file of files)urls.push(await uploadFile(file,"portfolio/gallery"));setForm(current=>({...current,gallery:[...current.gallery,...urls].slice(0,30)}));}
  catch(error:any){setMessage(error?.message||"تعذر رفع صور المعرض.");}
  finally{setUploading(false);event.target.value="";}
 }

 const categories=useMemo(()=>Array.from(new Set(rows.map(row=>String(row.category||"").trim()).filter(Boolean))),[rows]);

 async function save(){
  if(!form.title.trim()){setMessage("اكتب عنوان المشروع.");return;}
  if(form.is_published&&!form.cover_url){setMessage("المشروع المنشور يحتاج صورة غلاف.");return;}
  if(form.is_published&&!form.summary.trim()){setMessage("المشروع المنشور يحتاج ملخصًا واضحًا.");return;}
  setSaving(true);setMessage("");
  try{
   const maxOrder=rows.reduce((max,row)=>Math.max(max,Number(row.sort_order)||0),0);
   const payload={
    title:form.title.trim(),category:form.category.trim()||null,summary:form.summary.trim()||null,description:form.description.trim()||null,
    cover_url:form.cover_url||null,gallery:form.gallery,video_url:form.video_url.trim()||null,project_date:form.project_date||null,
    client_name:form.client_name.trim()||null,services:form.services.split(/\n+/).map(x=>x.trim()).filter(Boolean),
    featured:form.featured,is_published:form.is_published,sort_order:editing?editing.sort_order:maxOrder+1
   };
   const supabase=getSupabaseBrowser();
   const result=editing
    ? await supabase.from("portfolio_items").update(payload).eq("id",editing.id)
    : await supabase.from("portfolio_items").insert({...payload,slug:"project-"+Date.now().toString(36)});
   if(result.error)throw result.error;
   setOpen(false);await load();setMessage(editing?"تم تحديث المشروع.":"تمت إضافة المشروع كعمل جديد.");
  }catch(error:any){setMessage(error?.message||"تعذر حفظ المشروع.");}
  finally{setSaving(false);}
 }

 async function remove(row:Row){
  if(!window.confirm("حذف مشروع «"+row.title+"» من معرض الأعمال؟"))return;
  const {error}=await getSupabaseBrowser().from("portfolio_items").delete().eq("id",row.id);
  if(error)setMessage(error.message);else{setMessage("تم حذف المشروع.");await load();}
 }

 return <section className="admin-page portfolio-manager-page">
  <div className="admin-page-head"><div><span className="admin-kicker">PORTFOLIO CMS</span><h1>معرض الأعمال</h1><p>أدخل المشروع مرة واحدة: الغلاف، الصور، الوصف، الفيديو والخدمات؛ وتستخدمه الواجهة العامة مباشرة.</p></div><button className="admin-primary" onClick={openNew}>+ مشروع جديد</button></div>
  {message&&<div className="admin-message">{message}</div>}
  {loading?<div className="admin-empty">جارٍ تحميل المشاريع…</div>:<div className="portfolio-admin-grid">{rows.map(row=><article className="portfolio-admin-card" key={row.id}>
   <div className="portfolio-admin-media" style={{backgroundImage:row.cover_url?"linear-gradient(180deg,transparent,rgba(0,0,0,.58)),url("+row.cover_url+")":"none"}}><span>{row.category||"عمل رواج"}</span><b className={row.is_published?"on":"off"}>{row.is_published?"منشور":"مسودة"}</b></div>
   <div className="portfolio-admin-copy"><small>{row.project_date||"بدون تاريخ"}</small><h2>{row.title}</h2><p>{row.summary||"لا يوجد ملخص بعد."}</p><div className="portfolio-admin-meta"><span>{Array.isArray(row.gallery)?row.gallery.length:0} صور</span>{row.client_name&&<span>{row.client_name}</span>}{row.featured&&<span>مميز</span>}</div><div className="portfolio-admin-actions"><button onClick={()=>openEdit(row)}>تعديل المشروع</button><button className="danger" onClick={()=>void remove(row)}>حذف</button></div></div>
  </article>)}</div>}

  {open&&<div className="admin-modal">
   <button className="admin-modal-backdrop" onClick={()=>setOpen(false)} aria-label="إغلاق"/>
   <div className="admin-modal-card portfolio-admin-modal">
    <div className="admin-modal-head"><div><span>{editing?"تعديل مشروع":"مشروع جديد"}</span><h2>{form.title||"معرض أعمال رواج"}</h2></div><button onClick={()=>setOpen(false)}>×</button></div>
    <div className="admin-form-grid">
     <label><span>عنوان المشروع</span><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label>
     <label><span>التصنيف</span><input list="portfolio-category-list" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="مثال: واجهات"/><datalist id="portfolio-category-list">{categories.map(category=><option value={category} key={category}/>)}</datalist></label>
     <label><span>اسم العميل <small>اختياري</small></span><input value={form.client_name} onChange={e=>setForm({...form,client_name:e.target.value})}/></label>
     <label><span>تاريخ المشروع <small>اختياري</small></span><input type="date" value={form.project_date} onChange={e=>setForm({...form,project_date:e.target.value})}/></label>
     <label className="wide"><span>الملخص</span><textarea rows={3} value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})} placeholder="ملخص قصير يظهر في الصفحة والـSEO."/></label>
     <label className="wide"><span>الوصف الكامل</span><textarea rows={7} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="وصف المشروع، نطاق التنفيذ، الخامات أو مراحل العمل الموثقة."/></label>
     <label className="wide"><span>الخدمات المستخدمة — خدمة في كل سطر</span><textarea rows={4} value={form.services} onChange={e=>setForm({...form,services:e.target.value})} placeholder={"واجهات ACP\nChannel Letters\nطباعة رقمية"}/></label>
     <label className="wide"><span>رابط الفيديو <small>اختياري — MP4/WebM أو رابط خارجي</small></span><input value={form.video_url} onChange={e=>setForm({...form,video_url:e.target.value})}/></label>
    </div>

    <section className="portfolio-media-editor">
     <div className="portfolio-cover-editor"><div><span className="admin-kicker">غلاف المشروع</span><h3>الصورة الرئيسية</h3></div>{form.cover_url?<img src={form.cover_url} alt="معاينة الغلاف"/>:<div className="portfolio-image-placeholder">لا يوجد غلاف</div>}<div><input value={form.cover_url} onChange={e=>setForm({...form,cover_url:e.target.value})} placeholder="أو ألصق رابط صورة"/><label className="admin-secondary file-button">{uploading?"جارٍ الرفع…":"رفع غلاف"}<input type="file" accept="image/*" disabled={uploading} onChange={uploadCover}/></label></div></div>
     <div className="portfolio-gallery-editor"><div className="portfolio-gallery-head"><div><span className="admin-kicker">GALLERY</span><h3>صور المشروع ({form.gallery.length})</h3></div><label className="admin-secondary file-button">{uploading?"جارٍ الرفع…":"+ رفع صور"}<input type="file" accept="image/*" multiple disabled={uploading} onChange={uploadGallery}/></label></div><div className="portfolio-gallery-admin-grid">{form.gallery.map((url,index)=><figure key={url+"-"+index}><img src={url} alt=""/><button onClick={()=>setForm({...form,gallery:form.gallery.filter((_,i)=>i!==index)})} aria-label="إزالة الصورة">×</button></figure>)}{!form.gallery.length&&<div className="portfolio-gallery-empty">لا توجد صور إضافية بعد.</div>}</div></div>
    </section>

    <div className="package-publish-options"><label><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/><span>عمل مميز</span></label><label><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form,is_published:e.target.checked})}/><span>منشور في المعرض</span></label><small>النشر يحتاج عنوانًا وملخصًا وصورة غلاف. الصور الإضافية والفيديو اختيارية.</small></div>
    <div className="admin-modal-actions"><button className="admin-secondary" onClick={()=>setOpen(false)}>إلغاء</button><button className="admin-primary" disabled={saving} onClick={()=>void save()}>{saving?"جارٍ الحفظ…":"حفظ المشروع"}</button></div>
   </div>
  </div>}
 </section>;
}
