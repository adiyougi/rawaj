"use client";

import {useEffect,useMemo,useState} from "react";
import {getSupabaseBrowser} from "@/lib/supabase-browser";

type MediaItem={name:string;path:string;id?:string;created_at?:string;metadata?:Record<string,any>};

const allowed=["image/jpeg","image/png","image/webp","image/avif","image/gif","video/mp4","video/webm","application/pdf"];

export default function MediaLibrary(){
 const [items,setItems]=useState<MediaItem[]>([]),[uploading,setUploading]=useState(false),[loading,setLoading]=useState(true),[message,setMessage]=useState(""),[query,setQuery]=useState("");

 useEffect(()=>{void load();},[]);

 async function scan(prefix="",depth=0):Promise<MediaItem[]>{
  const storage=getSupabaseBrowser().storage.from("rawaj-media");
  const {data,error}=await storage.list(prefix,{limit:1000,sortBy:{column:"created_at",order:"desc"}});
  if(error)throw error;
  const output:MediaItem[]=[];
  for(const item of data||[]){
   const path=prefix?prefix+"/"+item.name:item.name;
   const isFile=Boolean(item.id)||Boolean(item.metadata?.mimetype)||Boolean(item.metadata?.size);
   if(isFile)output.push({...item,path});
   else if(depth<5)output.push(...await scan(path,depth+1));
  }
  return output;
 }

 async function load(){
  setLoading(true);setMessage("");
  try{
   const all=await scan();
   all.sort((a,b)=>String(b.created_at||"").localeCompare(String(a.created_at||"")));
   setItems(all.slice(0,1000));
  }catch(error:any){setMessage(error?.message||"تعذر تحميل مكتبة الوسائط.");}
  finally{setLoading(false);}
 }

 async function upload(files:FileList|null){
  const list=Array.from(files||[]).slice(0,30);if(!list.length)return;
  for(const file of list){if(!allowed.includes(file.type)){setMessage("أحد الملفات بنوع غير مدعوم: "+file.name);return;}if(file.size>25*1024*1024){setMessage("أحد الملفات أكبر من 25MB: "+file.name);return;}}
  setUploading(true);setMessage("");
  try{
   const supabase=getSupabaseBrowser();
   for(const file of list){
    const clean=file.name.replace(/[^a-zA-Z0-9._-]+/g,"-");
    const path="library/"+Date.now()+"-"+Math.random().toString(36).slice(2,7)+"-"+clean;
    const {error}=await supabase.storage.from("rawaj-media").upload(path,file,{upsert:false});
    if(error)throw error;
   }
   setMessage("تم رفع "+list.length+" ملف. أصبحت متاحة في المكتبة.");
   await load();
  }catch(error:any){setMessage(error?.message||"تعذر رفع الملفات.");}
  finally{setUploading(false);}
 }

 function publicUrl(path:string){return getSupabaseBrowser().storage.from("rawaj-media").getPublicUrl(path).data.publicUrl;}

 async function remove(item:MediaItem){
  if(!window.confirm("حذف «"+item.name+"» من التخزين؟ إذا كان مستخدمًا في خدمة أو مشروع فقد تتوقف الصورة عن الظهور."))return;
  const {error}=await getSupabaseBrowser().storage.from("rawaj-media").remove([item.path]);
  if(error)setMessage(error.message);else{setMessage("تم حذف الملف.");await load();}
 }

 async function copy(path:string){await navigator.clipboard.writeText(publicUrl(path));setMessage("تم نسخ رابط الملف.");}

 const visible=useMemo(()=>{const q=query.trim().toLowerCase();return !q?items:items.filter(item=>(item.name+" "+item.path).toLowerCase().includes(q));},[items,query]);

 return <section className="admin-page">
  <div className="admin-page-head"><div><span className="admin-kicker">MEDIA LIBRARY</span><h1>مكتبة الوسائط</h1><p>كل الصور والفيديو وPDF من الجذر ومجلدات الخدمات والباقات والأعمال في مكان واحد.</p></div><label className="admin-primary file-button">{uploading?"جارٍ الرفع…":"+ رفع ملفات"}<input type="file" multiple accept="image/*,video/mp4,video/webm,application/pdf" disabled={uploading} onChange={e=>{void upload(e.target.files);e.target.value="";}}/></label></div>
  {message&&<div className="admin-message">{message}</div>}
  <div className="media-toolbar"><div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث باسم الملف أو المجلد…"/>{query&&<button onClick={()=>setQuery("")}>×</button>}</div><span>{visible.length} ملف</span><button className="admin-secondary" onClick={()=>void load()}>تحديث</button></div>
  {loading?<div className="admin-empty">جارٍ فحص مجلدات الوسائط…</div>:<div className="media-admin-grid">
   {visible.map(item=>{const url=publicUrl(item.path);const isImage=/\.(jpg|jpeg|png|webp|avif|gif)(\?.*)?$/i.test(item.path);const isVideo=/\.(mp4|webm)(\?.*)?$/i.test(item.path);const folder=item.path.includes("/")?item.path.split("/").slice(0,-1).join("/"):"الجذر";return <article key={item.path} className="media-admin-card">
    <a className="media-preview-link" href={url} target="_blank" rel="noreferrer">{isImage?<img src={url} alt={item.name} loading="lazy"/>:isVideo?<video src={url} muted preload="metadata"/>:<div className="media-file-icon">PDF</div>}</a>
    <div><strong title={item.name}>{item.name}</strong><small>{folder}</small><small>{item.metadata?.size?Math.round(item.metadata.size/1024)+" KB":""}</small></div>
    <div className="admin-row-actions"><button onClick={()=>void copy(item.path)}>نسخ الرابط</button><a href={url} target="_blank" rel="noreferrer">فتح</a><button className="danger" onClick={()=>void remove(item)}>حذف</button></div>
   </article>})}
   {!visible.length&&<div className="admin-empty">لا توجد ملفات مطابقة.</div>}
  </div>}
 </section>;
}
