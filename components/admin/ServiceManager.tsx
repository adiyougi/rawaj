"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { serviceTemplates } from "@/lib/service-templates";
import type { ServiceSpec } from "@/lib/service-specs";

type Row=Record<string,any>;
type FaqItem={question:string;answer:string};

type ServiceForm={
  name:string;
  department_id:string;
  category_id:string;
  short_description:string;
  description:string;
  hero_url:string;
  gallery:string[];
  badge:string;
  specs:ServiceSpec[];
  highlights:string[];
  faq:FaqItem[];
  featured:boolean;
  is_published:boolean;
  seo_title:string;
  seo_description:string;
  templateKey:string;
};

const emptyForm:ServiceForm={
  name:"",department_id:"",category_id:"",short_description:"",description:"",
  hero_url:"",gallery:[],badge:"",
  specs:[],highlights:[],faq:[],featured:false,is_published:true,seo_title:"",seo_description:"",templateKey:""
};

function internalSlug(name:string){
  const map:Record<string,string>={
    "ا":"a","أ":"a","إ":"a","آ":"a","ب":"b","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh",
    "د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"d","ط":"t","ظ":"z",
    "ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","ة":"h",
    "و":"w","ؤ":"w","ي":"y","ى":"a","ئ":"y","ء":""
  };
  const latin=Array.from(name.trim().toLowerCase()).map(ch=>map[ch] ?? ch).join("");
  const cleaned=latin.replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-+/g,"-");
  return (cleaned || "service")+"-"+Date.now().toString(36).slice(-5);
}

function cloneSpecs(specs:ServiceSpec[]){
  return specs.map(spec=>({...spec,options:spec.options ? [...spec.options]:[]}));
}

export default function ServiceManager(){
  const [rows,setRows]=useState<Row[]>([]);
  const [departments,setDepartments]=useState<Row[]>([]);
  const [categories,setCategories]=useState<Row[]>([]);
  const [editing,setEditing]=useState<Row|null>(null);
  const [form,setForm]=useState<ServiceForm>(emptyForm);
  const [open,setOpen]=useState(false);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [uploading,setUploading]=useState(false);
  const [message,setMessage]=useState("");
  const [search,setSearch]=useState("");

  useEffect(()=>{ void loadAll(); },[]);

  async function loadAll(){
    setLoading(true);
    const supabase=getSupabaseBrowser();
    const [servicesRes,depsRes,catsRes]=await Promise.all([
      supabase.from("services").select("*").order("sort_order",{ascending:true}),
      supabase.from("departments").select("id,name,slug").order("sort_order",{ascending:true}),
      supabase.from("service_categories").select("id,name,department_id,parent_id").order("sort_order",{ascending:true})
    ]);
    if(servicesRes.error) setMessage(servicesRes.error.message);
    setRows(servicesRes.data || []);
    setDepartments(depsRes.data || []);
    setCategories(catsRes.data || []);
    setLoading(false);
  }

  function openNew(){
    setEditing(null);
    setForm({...emptyForm,gallery:[],specs:[],highlights:[],faq:[]});
    setMessage("");
    setOpen(true);
  }

  function openEdit(row:Row){
    const gallery=Array.isArray(row.gallery) ? row.gallery.filter((x:any)=>typeof x==="string"):[];
    const specs=Array.isArray(row.specifications) ? row.specifications:[];
    const highlights=Array.isArray(row.highlights) ? row.highlights.map(String):[];
    const faq=Array.isArray(row.faq) ? row.faq.map((x:any)=>({
      question:String(x?.question || x?.q || ""),
      answer:String(x?.answer || x?.a || "")
    })):[];
    setEditing(row);
    setForm({
      name:row.name || "",
      department_id:row.department_id || "",
      category_id:row.category_id || "",
      short_description:row.short_description || "",
      description:row.description || "",
      hero_url:row.hero_url || "",
      gallery,
      badge:row.badge || "",
      specs:cloneSpecs(specs),
      highlights,
      faq,
      featured:Boolean(row.featured),
      is_published:Boolean(row.is_published),
      seo_title:row.seo_title || "",
      seo_description:row.seo_description || "",
      templateKey:""
    });
    setMessage("");
    setOpen(true);
  }

  function applyTemplate(key:string){
    const template=serviceTemplates.find(t=>t.key===key);
    if(!template) return;
    setForm(current=>({
      ...current,
      templateKey:key,
      short_description:current.short_description || template.description,
      badge:current.badge || template.suggestedBadge || "",
      specs:cloneSpecs(template.specs)
    }));
  }

  async function uploadFile(file:File,folder="services"){
    const clean=file.name.replace(/[^a-zA-Z0-9._-]+/g,"-");
    const path=folder+"/"+Date.now()+"-"+clean;
    const supabase=getSupabaseBrowser();
    const {error}=await supabase.storage.from("rawaj-media").upload(path,file,{upsert:false});
    if(error) throw error;
    return supabase.storage.from("rawaj-media").getPublicUrl(path).data.publicUrl as string;
  }

  async function uploadHero(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0];
    if(!file) return;
    setUploading(true);setMessage("");
    try{
      const url=await uploadFile(file,"services");
      setForm(current=>({...current,hero_url:url}));
    }catch(error:any){setMessage(error?.message || "تعذر رفع الصورة.");}
    finally{setUploading(false);event.target.value="";}
  }

  async function uploadGallery(event:ChangeEvent<HTMLInputElement>){
    const files=Array.from(event.target.files || []);
    if(!files.length) return;
    setUploading(true);setMessage("");
    try{
      const urls:string[]=[];
      for(const file of files) urls.push(await uploadFile(file,"services/gallery"));
      setForm(current=>({...current,gallery:[...current.gallery,...urls]}));
    }catch(error:any){setMessage(error?.message || "تعذر رفع الصور.");}
    finally{setUploading(false);event.target.value="";}
  }

  const filteredCategories=useMemo(
    ()=>categories.filter(cat=>!form.department_id || cat.department_id===form.department_id),
    [categories,form.department_id]
  );

  const visibleRows=useMemo(()=>{
    const q=search.trim().toLowerCase();
    if(!q) return rows;
    return rows.filter(row=>(String(row.name)+" "+String(row.short_description || "")).toLowerCase().includes(q));
  },[rows,search]);

  function addSpec(){
    setForm(current=>({...current,specs:[...current.specs,{key:"spec-"+Date.now(),label:"",type:"select",options:[]}]}));
  }

  function updateSpec(index:number,patch:Partial<ServiceSpec>){
    setForm(current=>({...current,specs:current.specs.map((s,i)=>i===index?{...s,...patch}:s)}));
  }

  function removeSpec(index:number){
    setForm(current=>({...current,specs:current.specs.filter((_,i)=>i!==index)}));
  }

  function addFaq(){
    setForm(current=>({...current,faq:[...current.faq,{question:"",answer:""}]}));
  }

  async function save(){
    if(!form.name.trim()){
      setMessage("اكتب اسم الخدمة أولًا.");
      return;
    }
    if(!form.department_id){
      setMessage("اختر القسم الذي تتبع له الخدمة.");
      return;
    }
    if(!form.hero_url){
      setMessage("ارفع صورة رئيسية للخدمة قبل الحفظ.");
      return;
    }

    setSaving(true);setMessage("");
    try{
      const supabase=getSupabaseBrowser();
      const maxOrder=rows.reduce((max,row)=>Math.max(max,Number(row.sort_order)||0),0);
      const cleanSpecs=form.specs
        .filter(spec=>spec.label.trim())
        .map((spec,index)=>({
          key:spec.key || "spec-"+index,
          label:spec.label.trim(),
          type:spec.type,
          placeholder:spec.placeholder?.trim() || undefined,
          unit:spec.unit?.trim() || undefined,
          options:spec.type==="select" ? (spec.options || []).map(x=>x.trim()).filter(Boolean):undefined
        }));

      const payload={
        name:form.name.trim(),
        department_id:form.department_id || null,
        category_id:form.category_id || null,
        short_description:form.short_description.trim() || null,
        description:form.description.trim() || null,
        hero_url:form.hero_url,
        gallery:form.gallery,
        badge:form.badge || null,
        starting_price:null,
        price_label:null,
        specifications:cleanSpecs,
        highlights:form.highlights.map(x=>x.trim()).filter(Boolean),
        faq:form.faq.filter(item=>item.question.trim() && item.answer.trim()),
        featured:form.featured,
        is_published:form.is_published,
        sort_order:editing ? editing.sort_order:maxOrder+1,
        seo_title:form.seo_title.trim() || form.name.trim(),
        seo_description:form.seo_description.trim() || form.short_description.trim() || null,
        ...(editing ? {}:{slug:internalSlug(form.name)})
      };

      const result=editing
        ? await supabase.from("services").update(payload).eq("id",editing.id)
        : await supabase.from("services").insert(payload);

      if(result.error) throw result.error;
      setOpen(false);
      await loadAll();
      setMessage(editing ? "تم تحديث الخدمة وظهرت التغييرات في المتجر.":"تمت إضافة الخدمة إلى كتالوج رواج.");
    }catch(error:any){
      setMessage(error?.message || "تعذر حفظ الخدمة.");
    }finally{setSaving(false);}
  }

  async function remove(row:Row){
    if(!window.confirm("حذف خدمة «"+row.name+"» نهائيًا من الكتالوج؟")) return;
    const {error}=await getSupabaseBrowser().from("services").delete().eq("id",row.id);
    if(error) setMessage(error.message);
    else {setMessage("تم حذف الخدمة.");await loadAll();}
  }

  return (
    <section className="admin-page service-admin-page">
      <div className="admin-page-head">
        <div>
          <span className="admin-kicker">SERVICE STORE</span>
          <h1>كتالوج الخدمات</h1>
          <p>أضف الخدمة كما ستظهر للعميل: صورة، وصف، مواصفات، تشطيبات وخيارات طلب. جميع الخدمات تعمل بنظام طلب عرض سعر.</p>
        </div>
        <button className="admin-primary" onClick={openNew}>+ إضافة خدمة</button>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <div className="service-admin-toolbar">
        <div className="service-admin-search">
          <span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث في خدمات رواج..."/>
        </div>
        <div><strong>{rows.length}</strong><span> خدمة</span></div>
      </div>

      {loading ? <div className="admin-empty">جارٍ تحميل الخدمات…</div>:
      <div className="service-admin-grid">
        {visibleRows.map(row=>{
          const dep=departments.find(d=>d.id===row.department_id);
          return (
            <article className="service-admin-card" key={row.id}>
              <div className="service-admin-image" style={{backgroundImage:"url("+row.hero_url+")"}}>
                <span className={row.is_published ? "published":"draft"}>{row.is_published ? "منشورة":"مسودة"}</span>
              </div>
              <div className="service-admin-copy">
                <small>{dep?.name || "بدون قسم"}</small>
                <h3>{row.name}</h3>
                <p>{row.short_description || "لا يوجد وصف مختصر بعد."}</p>
                <div>
                  <button onClick={()=>openEdit(row)}>تعديل</button>
                  <button className="danger" onClick={()=>remove(row)}>حذف</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>}

      {open && (
        <div className="admin-modal service-editor-modal">
          <button className="admin-modal-backdrop" onClick={()=>setOpen(false)} aria-label="إغلاق"/>
          <div className="service-editor">
            <header className="service-editor-head">
              <div><span>{editing ? "تعديل خدمة":"خدمة جديدة"}</span><h2>{editing ? form.name || "تعديل الخدمة":"إضافة خدمة إلى متجر رواج"}</h2></div>
              <button onClick={()=>setOpen(false)}>×</button>
            </header>

            <div className="service-editor-body">
              <section className="editor-section">
                <div className="editor-section-title"><span>01</span><div><h3>ابدأ من قالب جاهز</h3><p>اختر نوع الخدمة وسنجهز مواصفاتها المعتادة تلقائيًا. يمكنك تعديلها بعد ذلك.</p></div></div>
                <div className="service-template-grid">
                  {serviceTemplates.map(template=>(
                    <button key={template.key} className={form.templateKey===template.key ? "active":""} onClick={()=>applyTemplate(template.key)}>
                      <strong>{template.label}</strong><small>{template.description}</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className="editor-section">
                <div className="editor-section-title"><span>02</span><div><h3>بيانات الخدمة</h3><p>هذه هي المعلومات التي يقرأها العميل في بطاقة الخدمة وصفحتها.</p></div></div>
                <div className="service-form-grid">
                  <label className="wide"><span>اسم الخدمة *</span><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="مثال: طباعة كروت شخصية فاخرة"/></label>
                  <label><span>القسم *</span><select value={form.department_id} onChange={e=>setForm({...form,department_id:e.target.value,category_id:""})}><option value="">اختر القسم</option>{departments.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
                  <label><span>التصنيف</span><select value={form.category_id} onChange={e=>setForm({...form,category_id:e.target.value})}><option value="">اختر التصنيف</option>{filteredCategories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
                  <label className="wide"><span>وصف قصير</span><textarea rows={3} value={form.short_description} onChange={e=>setForm({...form,short_description:e.target.value})} placeholder="جملة أو جملتان تظهران في بطاقة الخدمة."/></label>
                  <label className="wide"><span>وصف تفصيلي</span><textarea rows={5} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="اشرح للعميل الاستخدامات، المزايا وما الذي تقدمه رواج في هذه الخدمة."/></label>
                </div>
              </section>

              <section className="editor-section">
                <div className="editor-section-title"><span>03</span><div><h3>صور الخدمة</h3><p>ارفع الصور مباشرة. لا حاجة لنسخ أي روابط.</p></div></div>
                <div className="service-media-editor">
                  <div className="service-cover-box">
                    {form.hero_url ? <img src={form.hero_url} alt="صورة الخدمة"/>:<div><strong>الصورة الرئيسية</strong><span>يفضل صورة أفقية واضحة وعالية الجودة</span></div>}
                    <label className="media-upload-button">{uploading ? "جارٍ الرفع…":form.hero_url ? "تغيير الصورة":"رفع الصورة"}<input type="file" accept="image/*" onChange={uploadHero} disabled={uploading}/></label>
                  </div>
                  <div className="gallery-editor">
                    <div className="gallery-editor-head"><strong>معرض صور إضافي</strong><label>+ إضافة صور<input type="file" accept="image/*" multiple onChange={uploadGallery} disabled={uploading}/></label></div>
                    <div className="gallery-thumbs">
                      {form.gallery.map((url,index)=><div key={url}><img src={url} alt=""/><button onClick={()=>setForm(current=>({...current,gallery:current.gallery.filter((_,i)=>i!==index)}))}>×</button></div>)}
                      {!form.gallery.length && <p>اختياري — أضف صور تفاصيل أو زوايا أخرى للعمل.</p>}
                    </div>
                  </div>
                </div>
              </section>

              <section className="editor-section">
                <div className="editor-section-title"><span>04</span><div><h3>طريقة التسعير والعرض</h3><p>اختر ما يراه العميل في المتجر.</p></div></div>
                <div className="price-mode">
                  <button className={form.price_mode==="quote"?"active":""} onClick={()=>setForm({...form,price_mode:"quote",starting_price:""})}><strong>عرض سعر</strong><small>السعر يعتمد على المواصفات والكمية</small></button>
                  <button className={form.price_mode==="starting"?"active":""} onClick={()=>setForm({...form,price_mode:"starting"})}><strong>يبدأ من سعر</strong><small>اعرض سعرًا ابتدائيًا مع إمكانية التخصيص</small></button>
                </div>
                <div className="service-form-grid">
                  {form.price_mode==="starting" && <>
                    <label><span>السعر الابتدائي</span><input type="number" min="0" value={form.starting_price} onChange={e=>setForm({...form,starting_price:e.target.value})} placeholder="مثال: 8000"/></label>
                    <label><span>وصف السعر</span><input value={form.price_label} onChange={e=>setForm({...form,price_label:e.target.value})} placeholder="مثال: يبدأ من / لكل 500 حبة"/></label>
                  </>}
                  <label><span>شارة البطاقة</span><select value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})}><option value="">بدون شارة</option><option>الأكثر طلبًا</option><option>جديد</option><option>مميز</option><option>عرض خاص</option><option>هوية مؤسسية</option><option>تنفيذ متكامل</option></select></label>
                  <div className="service-switches">
                    <label><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/><span><strong>خدمة مميزة</strong><small>تظهر في أقسام مختارة بالرئيسية</small></span></label>
                    <label><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form,is_published:e.target.checked})}/><span><strong>منشورة في المتجر</strong><small>أغلقها لحفظ الخدمة كمسودة</small></span></label>
                  </div>
                </div>
              </section>

              <section className="editor-section">
                <div className="editor-section-title"><span>05</span><div><h3>مواصفات يختارها العميل</h3><p>هذه الحقول ستظهر مباشرة في صفحة الخدمة. لا توجد صيغة برمجية أو JSON.</p></div></div>
                <div className="spec-editor-list">
                  {form.specs.map((spec,index)=>(
                    <article className="spec-editor-card" key={index}>
                      <div className="spec-card-head"><strong>مواصفة {index+1}</strong><button onClick={()=>removeSpec(index)}>حذف</button></div>
                      <div className="service-form-grid compact">
                        <label><span>اسم المواصفة</span><input value={spec.label} onChange={e=>updateSpec(index,{label:e.target.value,key:spec.key || "spec-"+index})} placeholder="مثال: نوع الورق"/></label>
                        <label><span>طريقة الاختيار</span><select value={spec.type} onChange={e=>updateSpec(index,{type:e.target.value as ServiceSpec["type"]})}><option value="select">قائمة خيارات</option><option value="number">رقم / كمية</option><option value="text">نص حر</option></select></label>
                        {spec.type==="select" && <label className="wide"><span>الخيارات — كل خيار في سطر</span><textarea rows={4} value={(spec.options || []).join("\n")} onChange={e=>updateSpec(index,{options:e.target.value.split("\n")})} placeholder={"كوشيه\nبريستول\nورق فاخر\nأحتاج اقتراح رواج"}/></label>}
                        {spec.type!=="select" && <label><span>مثال داخل الحقل</span><input value={spec.placeholder || ""} onChange={e=>updateSpec(index,{placeholder:e.target.value})} placeholder="مثال: 500"/></label>}
                        {spec.type==="number" && <label><span>الوحدة</span><input value={spec.unit || ""} onChange={e=>updateSpec(index,{unit:e.target.value})} placeholder="حبة / متر / نسخة"/></label>}
                      </div>
                    </article>
                  ))}
                  <button className="add-spec-button" onClick={addSpec}>+ إضافة مواصفة</button>
                </div>
              </section>

              <section className="editor-section">
                <div className="editor-section-title"><span>06</span><div><h3>نقاط القوة والأسئلة</h3><p>اختياري، لكنه يساعد العميل على اتخاذ القرار.</p></div></div>
                <div className="service-form-grid">
                  <label className="wide"><span>مميزات الخدمة — ميزة في كل سطر</span><textarea rows={5} value={form.highlights.join("\n")} onChange={e=>setForm({...form,highlights:e.target.value.split("\n")})} placeholder={"طباعة دقيقة\nخيارات تشطيب متعددة\nإمكانية تنفيذ التصميم لدى رواج"}/></label>
                </div>
                <div className="faq-editor-list">
                  {form.faq.map((item,index)=><article key={index}><input value={item.question} onChange={e=>setForm(current=>({...current,faq:current.faq.map((f,i)=>i===index?{...f,question:e.target.value}:f)}))} placeholder="السؤال"/><textarea rows={3} value={item.answer} onChange={e=>setForm(current=>({...current,faq:current.faq.map((f,i)=>i===index?{...f,answer:e.target.value}:f)}))} placeholder="الإجابة"/><button onClick={()=>setForm(current=>({...current,faq:current.faq.filter((_,i)=>i!==index)}))}>حذف</button></article>)}
                  <button className="add-spec-button" onClick={addFaq}>+ إضافة سؤال شائع</button>
                </div>
              </section>

              <details className="advanced-editor">
                <summary>إعدادات متقدمة لمحركات البحث</summary>
                <p>هذه الحقول اختيارية. إذا تركتها فارغة سيستخدم النظام اسم الخدمة ووصفها تلقائيًا. الرابط الداخلي والترتيب يتم إنشاؤهما تلقائيًا ولا يحتاج المدير للتعامل معهما.</p>
                <div className="service-form-grid">
                  <label><span>عنوان صفحة Google</span><input value={form.seo_title} onChange={e=>setForm({...form,seo_title:e.target.value})}/></label>
                  <label><span>وصف نتائج البحث</span><input value={form.seo_description} onChange={e=>setForm({...form,seo_description:e.target.value})}/></label>
                </div>
              </details>
            </div>

            <footer className="service-editor-footer">
              <button className="admin-secondary" onClick={()=>setOpen(false)}>إلغاء</button>
              <button className="admin-primary" disabled={saving || uploading} onClick={save}>{saving ? "جارٍ الحفظ…":editing ? "حفظ التغييرات":"إضافة الخدمة للمتجر"}</button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
}
