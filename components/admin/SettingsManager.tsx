"use client";
import {useEffect,useState} from "react";
import {getSupabaseBrowser} from "@/lib/supabase-browser";

type Brand={name:string;tagline:string;phone:string;landline:string;whatsapp:string;email:string;address:string;since:string|number};
type About={headline:string;vision:string;mission:string;goal:string};
const emptyBrand:Brand={name:"",tagline:"",phone:"",landline:"",whatsapp:"",email:"",address:"",since:""};
const emptyAbout:About={headline:"",vision:"",mission:"",goal:""};

export default function SettingsManager(){
 const [brand,setBrand]=useState<Brand>(emptyBrand),[about,setAbout]=useState<About>(emptyAbout),[message,setMessage]=useState(""),[saving,setSaving]=useState(false);
 useEffect(()=>{(async()=>{const {data,error}=await getSupabaseBrowser().from("site_settings").select("key,value").in("key",["brand","about"]);if(error){setMessage("تعذر تحميل الإعدادات.");return;}for(const row of data||[]){if(row.key==="brand")setBrand({...emptyBrand,...row.value});if(row.key==="about")setAbout({...emptyAbout,...row.value});}})()},[]);
 async function save(){setSaving(true);setMessage("");const db=getSupabaseBrowser();const rows=[{key:"brand",value:{...brand,since:Number(brand.since)||2008}},{key:"about",value:about}];for(const row of rows){const {error}=await db.from("site_settings").upsert(row,{onConflict:"key"});if(error){setMessage("تعذر حفظ الإعدادات.");setSaving(false);return;}}setMessage("تم حفظ إعدادات الموقع.");setSaving(false);}
 const field=(label:string,key:keyof Brand)=><label><span>{label}</span><input value={String(brand[key]??"")} onChange={e=>setBrand({...brand,[key]:e.target.value})}/></label>;
 const aboutField=(label:string,key:keyof About)=><label className="wide"><span>{label}</span><textarea rows={3} value={about[key]} onChange={e=>setAbout({...about,[key]:e.target.value})}/></label>;
 return <section className="admin-page"><div className="admin-page-head"><div><span className="admin-kicker">الموقع</span><h1>الهوية والتواصل</h1><p>تعديل البيانات التي يحتاجها الزائر دون حقول تقنية.</p></div><button className="admin-primary" disabled={saving} onClick={save}>{saving?"جارٍ الحفظ…":"حفظ"}</button></div>{message&&<div className="admin-message">{message}</div>}<div className="admin-data-card"><div className="admin-form-grid">{field("اسم المؤسسة","name")}{field("الوصف المختصر","tagline")}{field("الجوال","phone")}{field("الهاتف الأرضي","landline")}{field("واتساب","whatsapp")}{field("البريد الإلكتروني","email")}{field("العنوان","address")}{field("سنة التأسيس","since")}{aboutField("عنوان صفحة من نحن","headline")}{aboutField("الرؤية","vision")}{aboutField("الرسالة","mission")}{aboutField("الهدف","goal")}</div></div></section>;
}