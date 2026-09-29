"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminField, AdminSection } from "@/lib/admin-config";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

type Row = Record<string, any>;

function autoSlug(value:string){const normalized=value.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return normalized || "item";}

function fieldInitial(field: AdminField) {
  if (field.type === "boolean") return true;
  if (field.type === "json") return "[]";
  return "";
}

export default function AdminCollection({ config }: { config: AdminSection }) {
  const [rows,setRows] = useState<Row[]>([]);
  const [relations,setRelations] = useState<Record<string,Row[]>>({});
  const [form,setForm] = useState<Row>({});
  const [editing,setEditing] = useState<Row | null>(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [showForm,setShowForm] = useState(false);
  const [message,setMessage] = useState("");
  const [uploadingField,setUploadingField] = useState("");

  const primaryKey = config.primaryKey || ["id"];

  useEffect(() => {
    load();
    loadRelations();
  }, [config.table]);

  async function load() {
    setLoading(true);
    const supabase = getSupabaseBrowser();
    let query = supabase.from(config.table).select("*");
    if (config.orderField) query = query.order(config.orderField,{ascending:config.orderField === "sort_order"});
    const {data,error} = await query;
    if (error) setMessage(error.message);
    setRows(data || []);
    setLoading(false);
  }

  async function loadRelations() {
    const supabase = getSupabaseBrowser();
    const result: Record<string,Row[]> = {};
    for (const field of config.fields.filter(f => f.relation)) {
      const rel = field.relation!;
      const {data} = await supabase.from(rel.table).select(rel.value + "," + rel.label).order(rel.label);
      result[field.name] = data || [];
    }
    setRelations(result);
  }

  function openNew() {
    const initial: Row = {};
    config.fields.forEach(field => initial[field.name] = fieldInitial(field));
    setEditing(null);
    setForm(initial);
    setMessage("");
    setShowForm(true);
  }

  function openEdit(row: Row) {
    const next: Row = {};
    config.fields.forEach(field => {
      const value = row[field.name];
      if (field.type === "json") next[field.name] = JSON.stringify(value ?? [],null,2);
      else if (field.type === "csv") next[field.name] = Array.isArray(value) ? value.join(", ") : "";
      else if (field.type === "lines") next[field.name] = Array.isArray(value) ? value.join("\n") : "";
      else if (field.type === "datetime" && value) next[field.name] = String(value).slice(0,16);
      else next[field.name] = value ?? "";
    });
    setEditing(row);
    setForm(next);
    setMessage("");
    setShowForm(true);
  }

  function normalize(field: AdminField,value: any) {
    if (field.type === "boolean") return Boolean(value);
    if (field.type === "number") return value === "" ? null : Number(value);
    if (field.type === "json") {
      if (!value || !String(value).trim()) return [];
      return JSON.parse(value);
    }
    if (field.type === "csv") return String(value || "").split(",").map(v=>v.trim()).filter(Boolean);
    if (field.type === "lines") return String(value || "").split(/\n+/).map(v=>v.trim()).filter(Boolean);
    if (field.relation && value === "") return null;
    if ((field.type === "date" || field.type === "datetime") && value === "") return null;
    return value === "" ? null : value;
  }

  async function uploadField(field: AdminField,file:File|null) {
    if(!file)return; if(file.size>25*1024*1024){setMessage("الملف أكبر من 25MB.");return;}
    setUploadingField(field.name);setMessage("");
    try{const supabase=getSupabaseBrowser();const clean=file.name.replace(/[^a-zA-Z0-9._-]+/g,"-");const path="cms/"+config.slug+"/"+Date.now()+"-"+clean;const {error}=await supabase.storage.from("rawaj-media").upload(path,file,{upsert:false});if(error)throw error;const url=supabase.storage.from("rawaj-media").getPublicUrl(path).data.publicUrl;setForm(v=>({...v,[field.name]:url}));setMessage("تم رفع الملف وربطه بالحقل.");}catch(error:any){setMessage(error?.message||"تعذر رفع الملف.");}finally{setUploadingField("");}
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const payload: Row = {};
      for (const field of config.fields) payload[field.name] = normalize(field,form[field.name]);
      if(!editing && ["departments","service_categories","packages","portfolio_items","blog_posts"].includes(config.table) && !payload.slug){const source=payload.name || payload.title; if(source) payload.slug=autoSlug(String(source))+"-"+Date.now().toString(36).slice(-4);}

      const supabase = getSupabaseBrowser();
      let result;
      if (editing) {
        let query = supabase.from(config.table).update(payload);
        primaryKey.forEach(key => { query = query.eq(key,editing[key]); });
        result = await query;
      } else {
        result = await supabase.from(config.table).insert(payload);
      }

      if (result.error) throw result.error;
      setShowForm(false);
      await load();
      setMessage("تم الحفظ بنجاح.");
    } catch (error:any) {
      setMessage(error?.message || "تعذر حفظ البيانات.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: Row) {
    if (!window.confirm("حذف هذا العنصر نهائيًا؟")) return;
    const supabase = getSupabaseBrowser();
    let query = supabase.from(config.table).delete();
    primaryKey.forEach(key => { query = query.eq(key,row[key]); });
    const {error} = await query;
    if (error) setMessage(error.message);
    else {
      setMessage("تم الحذف.");
      await load();
    }
  }

  const fieldMap = useMemo(() => Object.fromEntries(config.fields.map(f=>[f.name,f])),[config.fields]);

  return (
    <section className="admin-page">
      <div className="admin-page-head">
        <div>
          <span className="admin-kicker">RAWAJ CMS</span>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>
        <button className="admin-primary" onClick={openNew}>+ إضافة عنصر</button>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <div className="admin-data-card">
        {loading ? <div className="admin-empty">جارٍ تحميل البيانات…</div> : rows.length === 0 ? (
          <div className="admin-empty">لا توجد عناصر بعد.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {config.list.map(key => <th key={key}>{fieldMap[key]?.label || key}</th>)}
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row,index) => (
                  <tr key={row.id || primaryKey.map(k=>row[k]).join("-") || index}>
                    {config.list.map(key => (
                      <td key={key}>
                        {typeof row[key] === "boolean"
                          ? <span className={row[key] ? "status on" : "status off"}>{row[key] ? "نعم" : "لا"}</span>
                          : typeof row[key] === "object"
                            ? JSON.stringify(row[key]).slice(0,70)
                            : String(row[key] ?? "—").slice(0,90)}
                      </td>
                    ))}
                    <td>
                      <div className="admin-row-actions">
                        <button onClick={() => openEdit(row)}>تعديل</button>
                        <button className="danger" onClick={() => remove(row)}>حذف</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="admin-modal">
          <button className="admin-modal-backdrop" onClick={() => setShowForm(false)} aria-label="إغلاق" />
          <div className="admin-modal-card">
            <div className="admin-modal-head">
              <div><span>{editing ? "تعديل" : "إضافة"}</span><h2>{config.title}</h2></div>
              <button onClick={() => setShowForm(false)}>×</button>
            </div>

            <div className="admin-form-grid">
              {config.fields.map(field => (
                <label key={field.name} className={field.type === "textarea" || field.type === "json" || field.type === "lines" ? "wide" : ""}>
                  <span>{field.label}{field.required ? " *" : ""}</span>
                  {field.type === "boolean" ? (
                    <input type="checkbox" checked={Boolean(form[field.name])} onChange={e => setForm({...form,[field.name]:e.target.checked})} />
                  ) : field.relation ? (
                    <select value={form[field.name] ?? ""} onChange={e=>setForm({...form,[field.name]:e.target.value})}>
                      <option value="">— بدون —</option>
                      {(relations[field.name] || []).map(option => (
                        <option key={option[field.relation!.value]} value={option[field.relation!.value]}>{option[field.relation!.label]}</option>
                      ))}
                    </select>
                  ) : field.type === "textarea" || field.type === "json" || field.type === "lines" ? (
                    <textarea rows={field.type === "json" || field.type === "lines" ? 8 : 5} value={form[field.name] ?? ""} onChange={e=>setForm({...form,[field.name]:e.target.value})} placeholder={field.placeholder} />
                  ) : field.media ? (
                    <div className="admin-media-field"><input value={form[field.name] ?? ""} onChange={e=>setForm({...form,[field.name]:e.target.value})} placeholder="رابط الوسائط أو ارفع ملفًا"/><label className="admin-secondary file-button">{uploadingField===field.name?"جارٍ الرفع…":"رفع ملف"}<input type="file" accept={field.media==="image"?"image/*":"image/*,application/pdf,video/mp4,video/webm"} disabled={uploadingField===field.name} onChange={e=>{void uploadField(field,e.target.files?.[0]||null);e.target.value="";}}/></label>{form[field.name]&&<a href={form[field.name]} target="_blank" rel="noreferrer">معاينة ↗</a>}</div>
                  ) : field.options ? (
                    <select value={form[field.name] ?? ""} onChange={e=>setForm({...form,[field.name]:e.target.value})}><option value="">— اختر —</option>{field.options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select>
                  ) : field.name === "media_type" ? (
                    <select value={form[field.name] ?? "image"} onChange={e=>setForm({...form,[field.name]:e.target.value})}>
                      <option value="image">صورة</option><option value="video">فيديو</option>
                    </select>
                  ) : (
                    <input
                      type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "datetime" ? "datetime-local" : "text"}
                      value={form[field.name] ?? ""} onChange={e=>setForm({...form,[field.name]:e.target.value})} placeholder={field.placeholder}
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="admin-modal-actions">
              <button className="admin-secondary" onClick={() => setShowForm(false)}>إلغاء</button>
              <button className="admin-primary" disabled={saving} onClick={save}>{saving ? "جارٍ الحفظ…" : "حفظ التغييرات"}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
