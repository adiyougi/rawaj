"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { serviceTemplates } from "@/lib/service-templates";
import { serviceContent } from "@/lib/service-content";
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
  verification_status:"legacy"|"research"|"verified"|"approved";
  fulfillment_mode:"flexible"|"in_house"|"local_partner"|"international";
};

const emptyForm:ServiceForm={
  name:"",department_id:"",category_id:"",short_description:"",description:"",
  hero_url:"",gallery:[],badge:"",specs:[],highlights:[],faq:[],
  featured:false,is_published:false,seo_title:"",seo_description:"",templateKey:"",
  verification_status:"research",fulfillment_mode:"flexible"
};

const specGroups=["المقاس","المنتج","العلامة","النشاط","النطاق","المخرجات","الجدول","الملفات","الملابس","الاستخدام","الخامة","اللاصق","الحاجز","الإغلاق","خط التعبئة","الطباعة","الألوان","الخيوط","NCR","المحتوى","البنية","الموضع","الطي","التجليد","القص","المعالجة","التشطيب","التجميع","الترقيم","التجهيز","الكمية","التركيب","الإضاءة","النوافذ","التصميم","اللوحات","الملحقات","الامتثال","أنظمة العرض","التخصيص","مواصفات أخرى"];

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
  const [syncingCatalog,setSyncingCatalog]=useState(false);
  const [uploading,setUploading]=useState(false);
  const [message,setMessage]=useState("");
  const [search,setSearch]=useState("");
  const [statusFilter,setStatusFilter]=useState("all");
  const [departmentFilter,setDepartmentFilter]=useState("all");
  const [catalogFilter,setCatalogFilter]=useState("all");
  const [templateFamily,setTemplateFamily]=useState("الكل");

  useEffect(()=>{ void loadAll(); },[]);

  async function loadAll(){
    setLoading(true);
    const supabase=getSupabaseBrowser();
    const [servicesRes,depsRes,catsRes]=await Promise.all([
      supabase.from("services").select("*").order("sort_order",{ascending:true}),
      supabase.from("departments").select("id,name,slug").order("sort_order",{ascending:true}),
      supabase.from("service_categories").select("id,name,slug,department_id,parent_id").order("sort_order",{ascending:true})
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
    setTemplateFamily("الكل");
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
      templateKey:row.template_key || "",
      verification_status:row.verification_status || row.review_status || "legacy",
      fulfillment_mode:row.fulfillment_mode || "flexible"
    });
    setMessage("");
    setOpen(true);
  }

  function applyTemplate(key:string){
    const template=serviceTemplates.find(t=>t.key===key);
    if(!template) return;

    const existing=rows.find(row=>row.template_key===key);
    if(existing && (!editing || existing.id!==editing.id)){
      openEdit(existing);
      setMessage("هذا القالب موجود بالفعل في الكتالوج؛ فتحت الخدمة الحالية بدل إنشاء نسخة مكررة.");
      return;
    }

    const department=departments.find(item=>item.slug===template.departmentSlug);
    const category=categories.find(item=>item.slug===template.categorySlug);
    const rich=serviceContent[key];

    setForm(current=>({
      ...current,
      templateKey:key,
      name:current.name || template.label,
      department_id:department?.id || current.department_id,
      category_id:category?.id || current.category_id,
      short_description:current.short_description || template.description,
      description:current.description || rich?.description || "",
      badge:current.badge || template.suggestedBadge || "",
      verification_status:template.verification==="verified" ? "verified" : "legacy",
      specs:cloneSpecs(template.specs),
      highlights:current.highlights.length ? current.highlights : (rich?.highlights ? [...rich.highlights] : []),
      faq:current.faq.length ? current.faq : (rich?.faq ? rich.faq.map(item=>({...item})) : [])
    }));
  }

  async function syncMissingTemplates(){
    if(syncingCatalog) return;
    const verifiedTemplates=serviceTemplates.filter(template=>template.verification==="verified");
    const existingKeys=new Set(rows.map(row=>String(row.template_key || "")).filter(Boolean));
    const existingSlugs=new Set(rows.map(row=>String(row.slug || "")).filter(Boolean));
    const missing=verifiedTemplates.filter(template=>!existingKeys.has(template.key));

    if(!missing.length){
      setMessage("Master Catalog متزامن بالكامل؛ لا توجد قوالب موثقة ناقصة.");
      return;
    }

    setSyncingCatalog(true);
    setMessage("");
    try{
      const now=new Date().toISOString();
      const maxOrder=rows.reduce((max,row)=>Math.max(max,Number(row.sort_order)||0),0);
      const unresolved:string[]=[];
      const payloads:Record<string,any>[]=[];

      for(const template of missing){
        const department=departments.find(item=>item.slug===template.departmentSlug);
        const category=categories.find(item=>item.slug===template.categorySlug);
        const rich=serviceContent[template.key];
        const slug="master-"+template.key;

        if(!department || !category || !rich || !template.specs.length || !template.provenanceDoc || existingSlugs.has(slug)){
          unresolved.push(template.label);
          continue;
        }

        const cleanSpecs=cloneSpecs(template.specs).map((spec,index)=>({
          key:spec.key || "spec-"+index,
          label:spec.label.trim(),
          type:spec.type,
          placeholder:spec.placeholder?.trim() || undefined,
          unit:spec.unit?.trim() || undefined,
          group:spec.group?.trim() || "مواصفات الطلب",
          helpText:spec.helpText?.trim() || undefined,
          required:Boolean(spec.required),
          options:spec.type==="select" ? (spec.options || []).map(x=>x.trim()).filter(Boolean):undefined
        }));

        payloads.push({
          slug,
          name:template.label,
          department_id:department.id,
          category_id:category.id,
          short_description:template.description,
          description:rich.description,
          hero_url:null,
          gallery:[],
          badge:template.suggestedBadge || null,
          starting_price:null,
          price_label:null,
          specifications:cleanSpecs,
          highlights:[...rich.highlights],
          faq:rich.faq.map(item=>({...item})),
          featured:false,
          sort_order:maxOrder+payloads.length+1,
          is_published:false,
          seo_title:template.label,
          seo_description:template.description,
          template_key:template.key,
          review_status:"verified",
          verification_status:"verified",
          fulfillment_mode:"flexible",
          source_refs:[template.provenanceDoc],
          internal_notes:"تم إنشاء المسودة تلقائيًا من Rawaj Master Catalog. راجع الصورة والنطاق التجاري قبل الاعتماد والنشر.",
          verification_notes:"موثّق في "+template.provenanceDoc,
          verified_at:now,
          approved_at:null
        });
      }

      if(payloads.length){
        const {error}=await getSupabaseBrowser().from("services").insert(payloads);
        if(error) throw error;
      }

      await loadAll();
      const parts=[
        payloads.length ? "أضيفت "+payloads.length+" خدمة كمسودات موثقة." : "",
        unresolved.length ? "تحتاج مراجعة ربط: "+unresolved.join("، ")+".":""
      ].filter(Boolean);
      setMessage(parts.join(" "));
    }catch(error:any){
      setMessage(error?.message || "تعذرت مزامنة Master Catalog.");
    }finally{
      setSyncingCatalog(false);
    }
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
    return rows.filter(row=>{
      const matchesQuery=!q || (String(row.name)+" "+String(row.short_description || "")).toLowerCase().includes(q);
      const matchesStatus=statusFilter==="all"
        || (statusFilter==="published" && row.is_published)
        || (statusFilter!=="published" && !row.is_published && (row.verification_status || "legacy")===statusFilter);
      const matchesDepartment=departmentFilter==="all" || row.department_id===departmentFilter;
      const matchesCatalog=catalogFilter==="all"
        || (catalogFilter==="master" && Boolean(row.template_key))
        || (catalogFilter==="legacy" && !row.template_key);
      return matchesQuery && matchesStatus && matchesDepartment && matchesCatalog;
    });
  },[rows,search,statusFilter,departmentFilter,catalogFilter]);

  const catalogStats=useMemo(()=>({
    all:rows.length,
    master:rows.filter(row=>Boolean(row.template_key)).length,
    verified:rows.filter(row=>!row.is_published && row.verification_status==="verified").length,
    approved:rows.filter(row=>!row.is_published && row.verification_status==="approved").length,
    published:rows.filter(row=>row.is_published).length,
    legacy:rows.filter(row=>!row.template_key).length
  }),[rows]);

  const missingTemplateCount=useMemo(()=>{
    const existing=new Set(rows.map(row=>String(row.template_key||"")).filter(Boolean));
    return serviceTemplates.filter(template=>template.verification==="verified"&&!existing.has(template.key)).length;
  },[rows]);

  const templateFamilies=useMemo(()=>["الكل",...Array.from(new Set(serviceTemplates.map(t=>t.family)))],[]);
  const visibleTemplates=useMemo(
    ()=>serviceTemplates.filter(t=>templateFamily==="الكل" || t.family===templateFamily),
    [templateFamily]
  );

  function addSpec(){
    setForm(current=>({...current,specs:[...current.specs,{key:"spec-"+Date.now(),label:"",type:"select",options:[],group:"مواصفات أخرى"}]}));
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
    if(form.is_published && form.verification_status!=="approved"){
      setMessage("الخدمة لا تُنشر قبل اعتمادها. غيّر «حالة المراجعة» إلى «معتمدة للنشر» أولًا.");
      return;
    }
    if(form.is_published && !form.templateKey){
      setMessage("الخدمة المنشورة يجب أن تكون مرتبطة بقالب Master Catalog موثّق.");
      return;
    }
    const publishTemplate=serviceTemplates.find(item=>item.key===form.templateKey);
    if(form.is_published && (!publishTemplate || publishTemplate.verification!=="verified" || !publishTemplate.provenanceDoc)){
      setMessage("لا يمكن النشر: القالب الفني يحتاج حالة موثقة ومصدرًا بحثيًا مسجلًا.");
      return;
    }
    if(form.is_published && form.specs.length===0){
      setMessage("الخدمة المنشورة تحتاج نموذج مواصفات طلب عرض سعر.");
      return;
    }
    if(form.is_published && !form.hero_url){
      setMessage("الخدمة المنشورة تحتاج صورة رئيسية. يمكنك حفظها كمسودة بدون صورة.");
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
          group:spec.group?.trim() || "مواصفات الطلب",
          helpText:spec.helpText?.trim() || undefined,
          required:Boolean(spec.required),
          options:spec.type==="select" ? (spec.options || []).map(x=>x.trim()).filter(Boolean):undefined
        }));

      const activeTemplate=serviceTemplates.find(item=>item.key===form.templateKey);
      const payload={
        name:form.name.trim(),
        department_id:form.department_id || null,
        category_id:form.category_id || null,
        short_description:form.short_description.trim() || null,
        description:form.description.trim() || null,
        hero_url:form.hero_url || null,
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
        template_key:form.templateKey || null,
        verification_status:form.verification_status,
        review_status:form.verification_status,
        fulfillment_mode:form.fulfillment_mode,
        source_refs:activeTemplate?.provenanceDoc ? [activeTemplate.provenanceDoc] : (editing?.source_refs || []),
        verification_notes:activeTemplate?.provenanceDoc ? "موثّق في "+activeTemplate.provenanceDoc : (editing?.verification_notes || null),
        verified_at:["verified","approved"].includes(form.verification_status) ? (editing?.verified_at || new Date().toISOString()) : null,
        approved_at:form.verification_status==="approved" ? (editing?.approved_at || new Date().toISOString()) : null,
        ...(editing ? {}:{slug:internalSlug(form.name)})
      };

      const result=editing
        ? await supabase.from("services").update(payload).eq("id",editing.id)
        : await supabase.from("services").insert(payload);

      if(result.error) throw result.error;
      setOpen(false);
      await loadAll();
      setMessage(editing ? "تم تحديث الخدمة.":"تم حفظ الخدمة في كتالوج رواج.");
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
          <span className="admin-kicker">RAWAJ MASTER CATALOG</span>
          <h1>كتالوج الخدمات</h1>
          <p>كل خدمة تُدار كنموذج طلب عرض سعر مستقل بخاماتها ومواصفاتها وتشطيباتها الصحيحة.</p>
        </div>
        <div className="catalog-head-actions">
          <button className="admin-secondary catalog-sync-button" onClick={()=>void syncMissingTemplates()} disabled={syncingCatalog||missingTemplateCount===0}>
            {syncingCatalog ? "جارٍ مزامنة الكتالوج…" : missingTemplateCount ? "↻ مزامنة "+missingTemplateCount+" قالبًا ناقصًا" : "✓ Master Catalog متزامن"}
          </button>
          <button className="admin-primary" onClick={openNew}>+ إضافة خدمة</button>
        </div>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <div className="catalog-admin-stats">
        <button className={catalogFilter==="all"&&statusFilter==="all"?"active":""} onClick={()=>{setCatalogFilter("all");setStatusFilter("all");}}><strong>{catalogStats.all}</strong><span>كل الخدمات</span></button>
        <button className={catalogFilter==="master"&&statusFilter==="all"?"active":""} onClick={()=>{setCatalogFilter("master");setStatusFilter("all");}}><strong>{catalogStats.master}</strong><span>Master Catalog</span></button>
        <button className={statusFilter==="verified"?"active":""} onClick={()=>{setCatalogFilter("master");setStatusFilter("verified");}}><strong>{catalogStats.verified}</strong><span>موثقة</span></button>
        <button className={statusFilter==="approved"?"active":""} onClick={()=>{setCatalogFilter("master");setStatusFilter("approved");}}><strong>{catalogStats.approved}</strong><span>معتمدة</span></button>
        <button className={statusFilter==="published"?"active":""} onClick={()=>{setCatalogFilter("all");setStatusFilter("published");}}><strong>{catalogStats.published}</strong><span>منشورة</span></button>
        <button className={catalogFilter==="legacy"?"active":""} onClick={()=>{setCatalogFilter("legacy");setStatusFilter("all");}}><strong>{catalogStats.legacy}</strong><span>Legacy</span></button>
      </div>

      <div className="service-admin-toolbar catalog-toolbar">
        <div className="service-admin-search">
          <span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث باسم الخدمة أو الوصف..."/>
        </div>
        <select value={departmentFilter} onChange={e=>setDepartmentFilter(e.target.value)}>
          <option value="all">كل الأقسام</option>
          {departments.map(dep=><option key={dep.id} value={dep.id}>{dep.name}</option>)}
        </select>
        <select value={catalogFilter} onChange={e=>setCatalogFilter(e.target.value)}>
          <option value="all">كل السجلات</option>
          <option value="master">Master Catalog</option>
          <option value="legacy">Legacy فقط</option>
        </select>
        <div className="catalog-result-count"><strong>{visibleRows.length}</strong><span> نتيجة</span></div>
      </div>

      {loading ? <div className="admin-empty">جارٍ تحميل الخدمات…</div>:
      <div className="service-admin-grid">
        {visibleRows.map(row=>{
          const dep=departments.find(d=>d.id===row.department_id);
          const cat=categories.find(c=>c.id===row.category_id);
          return (
            <article className="service-admin-card" key={row.id}>
              <div className="service-admin-image" style={{backgroundImage:row.hero_url ? "url("+row.hero_url+")":"none"}}>
                {!row.hero_url && <i className="no-service-image">بدون صورة</i>}
                <span className={row.is_published ? "published":"draft"}>{row.is_published ? "منشورة":row.verification_status==="approved" ? "معتمدة" : row.verification_status==="verified" ? "موثقة" : "مسودة"}</span>
              </div>
              <div className="service-admin-copy">
                <div className="service-admin-taxonomy"><small>{dep?.name || "بدون قسم"}</small>{cat?.name && <span>{cat.name}</span>}</div>
                <h3>{row.name}</h3>
                <p>{row.short_description || "لا يوجد وصف مختصر بعد."}</p>
                <div className="service-admin-meta">
                  {row.template_key && <span>Master</span>}
                  <span>{row.fulfillment_mode==="in_house"?"داخل رواج":row.fulfillment_mode==="local_partner"?"شريك محلي":row.fulfillment_mode==="international"?"تنفيذ دولي":"مرن"}</span>
                  <span>{Array.isArray(row.specifications)?row.specifications.length:0} مواصفة</span>
                </div>
                <div className="service-admin-actions">
                  <button onClick={()=>openEdit(row)}>تعديل</button>
                  <button className="danger" onClick={()=>remove(row)}>حذف</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>}
      {!loading && !visibleRows.length && <div className="admin-empty"><strong>لا توجد خدمات مطابقة.</strong><span>غيّر الفلاتر أو كلمة البحث.</span></div>}

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
                <div className="editor-section-title"><span>01</span><div><h3>ابدأ من قالب متخصص</h3><p>القوالب المعلّمة «موثّق» مبنية على مراجعة مصادر فنية وتجارية حقيقية.</p></div></div>
                <div className="template-family-filter">
                  {templateFamilies.map(f=><button className={templateFamily===f?"active":""} onClick={()=>setTemplateFamily(f)} key={f}>{f}</button>)}
                </div>
                <div className="service-template-grid">
                  {visibleTemplates.map(template=>(
                    <button key={template.key} className={form.templateKey===template.key ? "active":""} onClick={()=>applyTemplate(template.key)}>
                      <div className="template-card-meta"><span>{template.subcategory}</span><em className={template.verification}>{template.verification==="verified"?"موثّق":"قديم — يحتاج مراجعة"}</em></div>
                      <strong>{template.label}</strong><small>{template.description}</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className="editor-section">
                <div className="editor-section-title"><span>02</span><div><h3>بيانات الخدمة</h3><p>المعلومات التجارية التي يقرأها العميل في البطاقة وصفحة الخدمة.</p></div></div>
                <div className="service-form-grid">
                  <label className="wide"><span>اسم الخدمة *</span><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="مثال: طباعة نماذج وفواتير NCR"/></label>
                  <label><span>القسم *</span><select value={form.department_id} onChange={e=>setForm({...form,department_id:e.target.value,category_id:""})}><option value="">اختر القسم</option>{departments.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
                  <label><span>التصنيف</span><select value={form.category_id} onChange={e=>setForm({...form,category_id:e.target.value})}><option value="">اختر التصنيف</option>{filteredCategories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
                  <label className="wide"><span>وصف قصير</span><textarea rows={3} value={form.short_description} onChange={e=>setForm({...form,short_description:e.target.value})} placeholder="وصف موجز ودقيق يظهر في بطاقة الخدمة."/></label>
                  <label className="wide"><span>وصف تفصيلي</span><textarea rows={5} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="اشرح الاستخدامات وما الذي تنفذه رواج وما الذي يحتاج العميل لتحديده."/></label>
                </div>
              </section>

              <section className="editor-section">
                <div className="editor-section-title"><span>03</span><div><h3>صور الخدمة</h3><p>يمكن حفظ الخدمة كمسودة بدون صورة؛ النشر يتطلب صورة رئيسية.</p></div></div>
                <div className="service-media-editor">
                  <div className="service-cover-box">
                    {form.hero_url ? <img src={form.hero_url} alt="صورة الخدمة"/>:<div><strong>الصورة الرئيسية</strong><span>يفضل صورة أفقية واضحة وعالية الجودة</span></div>}
                    <label className="media-upload-button">{uploading ? "جارٍ الرفع…":form.hero_url ? "تغيير الصورة":"رفع الصورة"}<input type="file" accept="image/*" onChange={uploadHero} disabled={uploading}/></label>
                  </div>
                  <div className="gallery-editor">
                    <div className="gallery-editor-head"><strong>معرض صور إضافي</strong><label>+ إضافة صور<input type="file" accept="image/*" multiple onChange={uploadGallery} disabled={uploading}/></label></div>
                    <div className="gallery-thumbs">
                      {form.gallery.map((url,index)=><div key={url}><img src={url} alt=""/><button onClick={()=>setForm(current=>({...current,gallery:current.gallery.filter((_,i)=>i!==index)}))}>×</button></div>)}
                      {!form.gallery.length && <p>اختياري — صور تفاصيل، خامات، تشطيبات أو أمثلة تنفيذ.</p>}
                    </div>
                  </div>
                </div>
              </section>

              <section className="editor-section quote-only-section">
                <div className="editor-section-title"><span>04</span><div><h3>العرض في المتجر</h3><p>التسعير غير مستخدم حاليًا. كل خدمة في رواج تعمل بنظام «طلب عرض سعر».</p></div></div>
                <div className="service-form-grid">
                  <label><span>حالة المراجعة</span><select value={form.verification_status} onChange={e=>setForm({...form,verification_status:e.target.value as ServiceForm["verification_status"],is_published:e.target.value==="approved" ? form.is_published:false})}><option value="research">قيد البحث والمراجعة</option><option value="verified">موثقة فنيًا</option><option value="approved">معتمدة للنشر</option><option value="legacy">قديمة — تحتاج مراجعة</option></select></label>
                  <label><span>طريقة التنفيذ</span><select value={form.fulfillment_mode} onChange={e=>setForm({...form,fulfillment_mode:e.target.value as ServiceForm["fulfillment_mode"]})}><option value="flexible">رواج تختار أفضل مسار تنفيذ</option><option value="in_house">تنفيذ داخل رواج</option><option value="local_partner">تنفيذ عبر شريك محلي</option><option value="international">توريد / تنفيذ دولي</option></select></label>
                  <label><span>شارة البطاقة</span><select value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})}><option value="">بدون شارة</option><option>الأكثر طلبًا</option><option>جديد</option><option>مميز</option><option>تنفيذ متكامل</option><option>توريد خاص</option></select></label>
                  <div className="service-switches">
                    <label><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/><span><strong>خدمة مميزة</strong><small>تظهر في أقسام مختارة بالرئيسية</small></span></label>
                    <label><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form,is_published:e.target.checked})}/><span><strong>منشورة في المتجر</strong><small>اتركها مغلقة أثناء البحث والمراجعة</small></span></label>
                  </div>
                </div>
              </section>

              <section className="editor-section">
                <div className="editor-section-title"><span>05</span><div><h3>نموذج طلب عرض السعر</h3><p>كل مواصفة هنا ستظهر للعميل تحت مجموعتها الصحيحة، بدون JSON أو أكواد.</p></div></div>
                <div className="spec-editor-list">
                  {form.specs.map((spec,index)=>(
                    <article className="spec-editor-card" key={index}>
                      <div className="spec-card-head"><strong>{spec.group || "مواصفات أخرى"} · {spec.label || "مواصفة جديدة"}</strong><button onClick={()=>removeSpec(index)}>حذف</button></div>
                      <div className="service-form-grid compact">
                        <label><span>اسم المواصفة</span><input value={spec.label} onChange={e=>updateSpec(index,{label:e.target.value,key:spec.key || "spec-"+index})} placeholder="مثال: نوع الورق"/></label>
                        <label><span>المجموعة</span><select value={spec.group || "مواصفات أخرى"} onChange={e=>updateSpec(index,{group:e.target.value})}>{specGroups.map(group=><option key={group}>{group}</option>)}</select></label>
                        <label><span>طريقة الاختيار</span><select value={spec.type} onChange={e=>updateSpec(index,{type:e.target.value as ServiceSpec["type"]})}><option value="select">قائمة خيارات</option><option value="number">رقم / كمية</option><option value="text">نص حر</option></select></label>
                        <label><span>وحدة القياس</span><input value={spec.unit || ""} onChange={e=>updateSpec(index,{unit:e.target.value})} placeholder="نسخة / متر / قطعة"/></label>
                        {spec.type==="select" && <label className="wide"><span>الخيارات — كل خيار في سطر</span><textarea rows={4} value={(spec.options || []).join("\n")} onChange={e=>updateSpec(index,{options:e.target.value.split("\n")})}/></label>}
                        {spec.type!=="select" && <label className="wide"><span>مثال داخل الحقل</span><input value={spec.placeholder || ""} onChange={e=>updateSpec(index,{placeholder:e.target.value})} placeholder="مثال: 500"/></label>}
                        <label className="wide"><span>توضيح للعميل</span><input value={spec.helpText || ""} onChange={e=>updateSpec(index,{helpText:e.target.value})} placeholder="معلومة قصيرة تساعده على اختيار المواصفة الصحيحة."/></label>
                      </div>
                    </article>
                  ))}
                  <button className="add-spec-button" onClick={addSpec}>+ إضافة مواصفة</button>
                </div>
              </section>

              <section className="editor-section">
                <div className="editor-section-title"><span>06</span><div><h3>نقاط القوة والأسئلة</h3><p>محتوى يساعد العميل على فهم الخدمة قبل إرسال طلب العرض.</p></div></div>
                <div className="service-form-grid">
                  <label className="wide"><span>مميزات الخدمة — ميزة في كل سطر</span><textarea rows={5} value={form.highlights.join("\n")} onChange={e=>setForm({...form,highlights:e.target.value.split("\n")})}/></label>
                </div>
                <div className="faq-editor-list">
                  {form.faq.map((item,index)=><article key={index}><input value={item.question} onChange={e=>setForm(current=>({...current,faq:current.faq.map((f,i)=>i===index?{...f,question:e.target.value}:f)}))} placeholder="السؤال"/><textarea rows={3} value={item.answer} onChange={e=>setForm(current=>({...current,faq:current.faq.map((f,i)=>i===index?{...f,answer:e.target.value}:f)}))} placeholder="الإجابة"/><button onClick={()=>setForm(current=>({...current,faq:current.faq.filter((_,i)=>i!==index)}))}>حذف</button></article>)}
                  <button className="add-spec-button" onClick={addFaq}>+ إضافة سؤال شائع</button>
                </div>
              </section>

              <details className="advanced-editor">
                <summary>إعدادات متقدمة لمحركات البحث</summary>
                <p>اختيارية. الرابط الداخلي والترتيب ينشئهما النظام تلقائيًا ولا يحتاج مدير رواج إلى التعامل معهما.</p>
                <div className="service-form-grid">
                  <label><span>عنوان صفحة Google</span><input value={form.seo_title} onChange={e=>setForm({...form,seo_title:e.target.value})}/></label>
                  <label><span>وصف نتائج البحث</span><input value={form.seo_description} onChange={e=>setForm({...form,seo_description:e.target.value})}/></label>
                </div>
              </details>
            </div>

            <footer className="service-editor-footer">
              <button className="admin-secondary" onClick={()=>setOpen(false)}>إلغاء</button>
              <button className="admin-primary" disabled={saving || uploading} onClick={save}>{saving ? "جارٍ الحفظ…":editing ? "حفظ التغييرات":"حفظ الخدمة"}</button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
}
