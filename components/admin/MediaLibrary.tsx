"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

type MediaItem = { name:string; id?:string; created_at?:string; metadata?:Record<string,any> };

export default function MediaLibrary() {
  const [items,setItems] = useState<MediaItem[]>([]);
  const [uploading,setUploading] = useState(false);
  const [message,setMessage] = useState("");

  useEffect(()=>{ load(); },[]);

  async function load() {
    const {data,error} = await getSupabaseBrowser().storage.from("rawaj-media").list("",{limit:100,sortBy:{column:"created_at",order:"desc"}});
    if (error) setMessage(error.message);
    setItems((data || []) as MediaItem[]);
  }

  async function upload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setMessage("");
    const clean = file.name.replace(/[^a-zA-Z0-9._-]+/g,"-");
    const path = Date.now() + "-" + clean;
    const supabase = getSupabaseBrowser();
    const {error} = await supabase.storage.from("rawaj-media").upload(path,file,{upsert:false});
    if (error) setMessage(error.message);
    else {
      setMessage("تم رفع الملف. يمكنك نسخ الرابط واستخدامه في أي موديول.");
      await load();
    }
    setUploading(false);
  }

  function publicUrl(name:string) {
    return getSupabaseBrowser().storage.from("rawaj-media").getPublicUrl(name).data.publicUrl;
  }

  async function remove(name:string) {
    if (!window.confirm("حذف الملف من المكتبة؟")) return;
    const {error} = await getSupabaseBrowser().storage.from("rawaj-media").remove([name]);
    if (error) setMessage(error.message);
    else await load();
  }

  async function copy(name:string) {
    await navigator.clipboard.writeText(publicUrl(name));
    setMessage("تم نسخ رابط الملف.");
  }

  return (
    <section className="admin-page">
      <div className="admin-page-head">
        <div>
          <span className="admin-kicker">MEDIA LIBRARY</span>
          <h1>مكتبة الوسائط</h1>
          <p>صور، فيديوهات وPDF تستخدمها في السلايدر والخدمات والأعمال والمدونة.</p>
        </div>
        <label className="admin-primary file-button">{uploading ? "جارٍ الرفع…" : "+ رفع ملف"}
          <input type="file" accept="image/*,video/mp4,video/webm,application/pdf" disabled={uploading} onChange={e=>upload(e.target.files?.[0] || null)} />
        </label>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <div className="media-admin-grid">
        {items.map(item => {
          const url = publicUrl(item.name);
          const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(item.name);
          return (
            <article key={item.name} className="media-admin-card">
              {isImage ? <img src={url} alt="" /> : <div className="media-file-icon">FILE</div>}
              <div><strong>{item.name}</strong><small>{item.metadata?.size ? Math.round(item.metadata.size/1024) + " KB" : ""}</small></div>
              <div className="admin-row-actions"><button onClick={()=>copy(item.name)}>نسخ الرابط</button><button className="danger" onClick={()=>remove(item.name)}>حذف</button></div>
            </article>
          );
        })}
        {!items.length && <div className="admin-empty">المكتبة فارغة حاليًا.</div>}
      </div>
    </section>
  );
}
