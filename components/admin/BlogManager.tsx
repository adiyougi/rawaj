"use client";
import {ChangeEvent,useEffect,useMemo,useState} from "react";
import {getSupabaseBrowser} from "@/lib/supabase-browser";

type Row=Record<string,any>;
type BlogForm={title:string;excerpt:string;content:string;category:string;tags:string;cover_url:string;author_name:string;published_at:string;reading_minutes:string;featured:boolean;is_published:boolean;seo_title:string;seo_description:string};
const emptyForm:BlogForm={title:"",excerpt:"",content:"",category:"",tags:"",cover_url:"",author_name:"",published_at:"",reading_minutes:"",featured:false,is_published:false,seo_title:"",seo_description:""};
const asLocal=(value:string|null|undefined)=>value?new Date(value).toISOString().slice(0,16):"";

export default function BlogManager(){
 const [rows,setRows]=useState<Row[]>([]),[editing,setEditing]=useState<Row|null>(null),[form,setForm]=useState<BlogForm>(emptyForm);
 const [open,setOpen]=useState(false),[loading,setLoading]=useState(true),[saving,setSaving]=useState(false),[uploading,setUploading]=useState(false),[message,setMessage]=useState("");

 async function load(){setLoading(true);const {data,error}=await getSupabaseBrowser().from("blog_posts").select("*").order("published_at",{ascending:false,nullsFirst:false});if(error)setMessage(error.message);setRows(data||[]);setLoading(false);}
 useEffect(()=>{void load();},[]);
 function openNew(){setEditing(null);setForm({...emptyForm});setMessage("");setOpen(true);}
 function openEdit(row:Row){setEditing(row);setForm({title:row.title||"",excerpt:row.excerpt||"",content:Array.isArray(row.content)?row.content.join("\n\n"):"",category:row.category||"",tags:Array.isArray(row.tags)?row.tags.join(", "):"",cover_url:row.cover_url||"",author_name:row.author_name||"",published_at:asLocal(row.published_at),reading_minutes:row.reading_minutes?String(row.reading_minutes):"",featured:Boolean(row.featured),is_published:Boolean(row.is_published),seo_title:row.seo_title||"",seo_description:row.seo_description||""});setMessage("");setOpen(true);}

 async function uploadCover(event:ChangeEvent<HTMLInputElement>){
  const file=event.target.files?.[0];if(!file)return;setUploading(true);setMessage("");
  try{
   if(!["image/jpeg","image/png","image/webp","image/avif"].includes(file.type))throw new Error("استخدم JPG أو PNG أو WebP أو AVIF.");
   if(file.size>25*1024*1024)throw new Error("الصورة أكبر من 25MB.");
   const clean=file.name.replace(/[^a-zA-Z0-9._-]+/g,"-"),path="blog/"+Date.now()+"-"+clean,supabase=getSupabaseBrowser();
   const {error}=await supabase.storage.from("rawaj-media").upload(path,file,{upsert:false});if(error)throw error;
   setForm(current=>({...current,cover_url:supabase.storage.from("rawaj-media").getPublicUrl(path).data.publicUrl}));
  }catch(error:any){setMessage(error?.message||"تعذر رفع الغلاف.");}
  finally{setUploading(false);event.target.value="";}
 }

 const categories=useMemo(()=>Array.from(new Set(rows.map(row=>String(row.category||"").trim()).filter(Boolean))),[rows]);
 const paragraphs=()=>form.content.split(/\n\s*\n+/).map(x=>x.trim()).filter(Boolean);
 const estimateMinutes=()=>Math.max(1,Math.ceil(form.content.trim().split(/\s+/).filter(Boolean).length/200));

 async function save(){
  if(!form.title.trim()){setMessage("اكتب عنوان المقال.");return;}
  const body=paragraphs();
  if(form.is_published&&(!form.excerpt.trim()||!body.length||!form.cover_url)){setMessage("المقال المنشور يحتاج مقتطفًا ومحتوى وصورة غلاف.");return;}
  setSaving(true);setMessage("");
  try{
   const supabase=getSupabaseBrowser();
   if(form.featured){let q=supabase.from("blog_posts").update({featured:false});if(editing)q=q.neq("id",editing.id);const {error}=await q;if(error)throw error;}
   const publishedAt=form.published_at?new Date(form.published_at).toISOString():form.is_published?new Date().toISOString():null;
   const payload={title:form.title.trim(),excerpt:form.excerpt.trim()||null,content:body,category:form.category.trim()||null,tags:form.tags.split(",").map(x=>x.trim()).filter(Boolean),cover_url:form.cover_url||null,author_name:form.author_name.trim()||null,published_at:publishedAt,reading_minutes:form.reading_minutes?Math.max(1,Number(form.reading_minutes)||1):estimateMinutes(),featured:form.featured,is_published:form.is_published,seo_title:form.seo_title.trim()||form.title.trim(),seo_description:form.seo_description.trim()||form.excerpt.trim()||null,updated_at:new Date().toISOString()};
   const result=editing?await supabase.from("blog_posts").update(payload).eq("id",editing.id):await supabase.from("blog_posts").insert({...payload,slug:"article-"+Date.now().toString(36)});
   if(result.error)throw result.error;setOpen(false);await load();setMessage(editing?"تم تحديث المقال.":"تم إنشاء المقال.");
  }catch(error:any){setMessage(error?.message||"تعذر حفظ المقال.");}finally{setSaving(false);}
 }
 async function remove(row:Row){if(!window.confirm("حذف مقال «"+row.title+"»؟"))return;const {error}=await getSupabaseBrowser().from("blog_posts").delete().eq("id",row.id);if(error)setMessage(error.message);else{setMessage("تم حذف المقال.");await load();}}

 return <section className="admin-page blog-manager-page">
  <div className="admin-page-head"><div><span className="admin-kicker">EDITORIAL CMS</span><h1>المدونة</h1><p>اكتب المقال، ارفع الغلاف، اضبط SEO والنشر من شاشة واحدة.</p></div><button className="admin-primary" onClick={openNew}>+ مقال جديد</button></div>
  {message&&<div className="admin-message">{message}</div>}
  {loading?<div className="admin-empty">جارٍ تحميل المقالات…</div>:<div className="blog-admin-grid">{rows.map(row=><article className="blog-admin-card" key={row.id}>
   <div className="blog-admin-media" style={{backgroundImage:row.cover_url?"linear-gradient(180deg,transparent,rgba(0,0,0,.62)),url("+row.cover_url+")":"none"}}><span>{row.category||"مدونة رواج"}</span><b className={row.is_published?"on":"off"}>{row.is_published?"منشور":"مسودة"}</b></div>
   <div><small>{row.published_at?new Date(row.published_at).toLocaleDateString("ar"):"غير مجدول"} {row.featured?"· مميز":""}</small><h2>{row.title}</h2><p>{row.excerpt||"لا يوجد مقتطف."}</p><div className="portfolio-admin-actions"><button onClick={()=>openEdit(row)}>تعديل</button><button className="danger" onClick={()=>void remove(row)}>حذف</button></div></div>
  </article>)}</div>}

  {open&&<div className="admin-modal"><button className="admin-modal-backdrop" onClick={()=>setOpen(false)} aria-label="إغلاق"/><div className="admin-modal-card blog-admin-modal">
   <div className="admin-modal-head"><div><span>{editing?"تعديل مقال":"مقال جديد"}</span><h2>{form.title||"مدونة رواج"}</h2></div><button onClick={()=>setOpen(false)}>×</button></div>
   <div className="admin-form-grid">
    <label className="wide"><span>عنوان المقال</span><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label>
    <label><span>التصنيف</span><input list="blog-category-list" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/><datalist id="blog-category-list">{categories.map(x=><option value={x} key={x}/>)}</datalist></label>
    <label><span>الكاتب</span><input value={form.author_name} onChange={e=>setForm({...form,author_name:e.target.value})}/></label>
    <label className="wide"><span>المقتطف</span><textarea rows={3} value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})}/></label>
    <label className="wide"><span>المحتوى — افصل الفقرات بسطر فارغ</span><textarea rows={14} value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/></label>
    <label><span>الوسوم — بفواصل</span><input value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})}/></label>
    <label><span>دقائق القراءة <small>اتركها فارغة للحساب التقديري</small></span><input type="number" min={1} value={form.reading_minutes} onChange={e=>setForm({...form,reading_minutes:e.target.value})}/></label>
    <label><span>تاريخ النشر</span><input type="datetime-local" value={form.published_at} onChange={e=>setForm({...form,published_at:e.target.value})}/></label>
   </div>
   <section className="blog-cover-editor">{form.cover_url?<img src={form.cover_url} alt="غلاف المقال"/>:<div>لا توجد صورة غلاف</div>}<div><span className="admin-kicker">COVER</span><h3>غلاف المقال</h3><input value={form.cover_url} onChange={e=>setForm({...form,cover_url:e.target.value})} placeholder="رابط الصورة"/><label className="admin-secondary file-button">{uploading?"جارٍ الرفع…":"رفع غلاف"}<input type="file" accept="image/*" disabled={uploading} onChange={uploadCover}/></label></div></section>
   <section className="blog-seo-editor"><div><span className="admin-kicker">SEO</span><h3>الظهور في البحث</h3></div><label><span>عنوان SEO</span><input value={form.seo_title} onChange={e=>setForm({...form,seo_title:e.target.value})} placeholder={form.title||"عنوان المقال"}/></label><label><span>وصف SEO</span><textarea rows={3} value={form.seo_description} onChange={e=>setForm({...form,seo_description:e.target.value})} placeholder={form.excerpt||"مقتطف المقال"}/></label></section>
   <div className="package-publish-options"><label><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/><span>المقال المميز</span></label><label><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form,is_published:e.target.checked})}/><span>منشور</span></label><small>عند اختيار «مميز» يصبح هذا المقال هو المميز الرئيسي بدل أي مقال سابق.</small></div>
   <div className="admin-modal-actions"><button className="admin-secondary" onClick={()=>setOpen(false)}>إلغاء</button><button className="admin-primary" disabled={saving} onClick={()=>void save()}>{saving?"جارٍ الحفظ…":"حفظ المقال"}</button></div>
  </div></div>}
 </section>;
}
