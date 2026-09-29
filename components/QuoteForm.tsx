"use client";

import Link from "next/link";
import { ChangeEvent,FormEvent,useEffect,useState } from "react";
import { useCart } from "@/components/CartProvider";
import { CONTACT } from "@/lib/content";


type Option={id:string;title:string};
export default function QuoteForm({services,packages}:{services:Option[];packages:Option[]}){
 const {items,clear}=useCart();
 const [name,setName]=useState(""),[company,setCompany]=useState(""),[phone,setPhone]=useState(""),[email,setEmail]=useState(""),[city,setCity]=useState(""),[deadline,setDeadline]=useState(""),[service,setService]=useState(""),[packageId,setPackageId]=useState(""),[details,setDetails]=useState(""),[files,setFiles]=useState<File[]>([]),[sending,setSending]=useState(false),[message,setMessage]=useState(""),[receipt,setReceipt]=useState<{id:string;requestNumber:string;uploaded:number;warning:string;whatsappUrl:string}|null>(null);
 useEffect(()=>{const p=new URLSearchParams(location.search);setService(p.get("service")||"");setPackageId(p.get("package")||"");},[]);
 function chooseFiles(e:ChangeEvent<HTMLInputElement>){
  const next=Array.from(e.target.files||[]);
  if(next.length>5){setMessage("يمكن إرفاق 5 ملفات كحد أقصى.");e.target.value="";return;}
  const total=next.reduce((sum,file)=>sum+file.size,0);
  if(next.some(file=>file.size>4*1024*1024)){setMessage("حجم كل ملف يجب ألا يتجاوز 4MB.");e.target.value="";return;}
  if(total>4*1024*1024){setMessage("إجمالي المرفقات يجب ألا يتجاوز 4MB.");e.target.value="";return;}
  setMessage("");setFiles(next);
 }
 async function submit(e:FormEvent){e.preventDefault();setMessage("");
  if(!items.length&&!service&&!packageId&&!details.trim()){setMessage("اختر خدمة أو باقة، أو اكتب تفاصيل الطلب قبل الإرسال.");return;}
  setSending(true);
  try{
   const chosenService=service?services.find(x=>x.id===service):null;
   const chosenPackage=packageId?packages.find(x=>x.id===packageId):null;
   const payload=items.length
    ? items.map(x=>({title:x.title,quantity:x.qty,specifications:x.specs?{summary:x.specs}:{},service_slug:x.id}))
    : chosenService
      ? [{title:chosenService.title,quantity:1,specifications:{},service_slug:chosenService.id}]
      : chosenPackage
        ? [{title:chosenPackage.title,quantity:1,specifications:{},package_slug:chosenPackage.id}]
        : [];
   const formData=new FormData();
   formData.append("payload",JSON.stringify({customer_name:name.trim(),company_name:company.trim()||null,phone:phone.trim(),whatsapp:phone.trim(),email:email.trim()||null,city:city.trim()||null,deadline:deadline||null,notes:details.trim()||null,items:payload}));
   files.forEach(file=>formData.append("attachments",file));
   const response=await fetch("/api/quotes",{method:"POST",body:formData});
   const result=await response.json();
   if(!response.ok) throw new Error(result?.error||"تعذر حفظ الطلب");
   if(!result?.id||!result?.request_number) throw new Error("تعذر تأكيد رقم الطلب");
   const req={id:String(result.id),requestNumber:String(result.request_number)};
   const lines=payload.map((x,i)=>`${i+1}. ${x.title} × ${x.quantity}`).join("\n");
   const wa="طلب عرض سعر جديد من منصة رواج\nرقم الطلب: "+req.requestNumber+"\nالاسم: "+name+"\nرقم التواصل: "+phone+(lines?"\n\n"+lines:"")+(details?"\n\nالتفاصيل: "+details:"");
   clear();setReceipt({id:req.id,requestNumber:req.requestNumber,uploaded:Number(result.attachments_uploaded)||0,warning:String(result.attachment_warning||""),whatsappUrl:"https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(wa)});
  }catch(err:any){setMessage(err?.message||"تعذر حفظ الطلب. حاول مرة أخرى.");}finally{setSending(false);}
 }
 if(receipt){
  return <section className="quote-form quote-receipt" aria-live="polite">
   <div className="quote-receipt-mark">✓</div>
   <span className="eyebrow">تم استلام طلبك</span>
   <h2>طلبك محفوظ لدى رواج.</h2>
   <p>سيظهر الآن لفريق المبيعات مع الخدمات والمواصفات التي أرسلتها. احتفظ بالرقم المرجعي عند التواصل معنا.</p>
   <div className="quote-reference"><span>رقم الطلب</span><strong>{receipt.requestNumber}</strong><small>مرجع داخلي: {receipt.id.slice(0,8).toUpperCase()}</small>{receipt.uploaded>0&&<small>تم رفع {receipt.uploaded} ملف.</small>}{receipt.warning&&<small>{receipt.warning}</small>}</div>
   <div className="quote-receipt-actions">
    <a className="btn btn-primary" href={receipt.whatsappUrl} target="_blank" rel="noreferrer">متابعة عبر واتساب</a>
    <Link className="btn quote-receipt-secondary" href="/services">العودة إلى الخدمات</Link>
   </div>
   <button className="quote-new-request" type="button" onClick={()=>{setReceipt(null);setName("");setCompany("");setPhone("");setEmail("");setCity("");setDeadline("");setService("");setPackageId("");setDetails("");setFiles([]);setMessage("");}}>إرسال طلب آخر</button>
  </section>;
 }
 return <form className="quote-form" onSubmit={submit}>
  <label>الاسم<input required maxLength={120} value={name} onChange={e=>setName(e.target.value)} placeholder="اسم الشخص المسؤول"/></label>
  <label>المؤسسة <small>اختياري</small><input maxLength={160} value={company} onChange={e=>setCompany(e.target.value)} placeholder="اسم الشركة أو المنشأة"/></label>
  <label>رقم الجوال / واتساب<input required maxLength={40} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="مثال: 77xxxxxxx" inputMode="tel"/></label>
  <label>البريد <small>اختياري</small><input type="email" maxLength={180} value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@company.com"/></label>
  <label>المدينة <small>اختياري</small><input maxLength={120} value={city} onChange={e=>setCity(e.target.value)} placeholder="مثال: صنعاء"/></label>
  <label>موعد مطلوب <small>اختياري</small><input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)}/></label>
  {!items.length&&<><label>الخدمة<select value={service} onChange={e=>{setService(e.target.value);if(e.target.value)setPackageId("");}}><option value="">اختر خدمة</option>{services.map(x=><option value={x.id} key={x.id}>{x.title}</option>)}</select></label>
  <label>أو الباقة<select value={packageId} onChange={e=>{setPackageId(e.target.value);if(e.target.value)setService("");}}><option value="">اختر باقة</option>{packages.map(x=><option value={x.id} key={x.id}>{x.title}</option>)}</select></label></>}
  {!!items.length&&<div className="quote-cart-preview"><strong>الخدمات المختارة ({items.length})</strong>{items.map(x=><p key={x.key}>{x.title} × {x.qty}{x.specs?<small>{x.specs}</small>:null}</p>)}</div>}
  <label>تفاصيل الطلب<textarea maxLength={3000} value={details} onChange={e=>setDetails(e.target.value)} placeholder="المقاسات، الكمية، الخامة، الموعد، أو أي تفاصيل تعرفها..."/></label>
  <label className="quote-file-field">ملفات أو صور مرجعية <small>اختياري — حتى 5 ملفات / 4MB إجمالًا</small><input type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf,application/postscript,image/vnd.adobe.photoshop,application/zip,.ai,.eps,.psd,.zip" onChange={chooseFiles}/>{files.length>0&&<span className="quote-file-list">{files.map(file=><small key={file.name+file.size}>{file.name} · {(file.size/1024/1024).toFixed(1)}MB</small>)}</span>}<small>للملفات الكبيرة اكتب رابط Drive/WeTransfer في التفاصيل أو أكمل الإرسال عبر واتساب بعد حفظ الطلب.</small></label>
  <button className="btn btn-primary full" disabled={sending} type="submit">{sending?"جارٍ حفظ الطلب…":"إرسال طلب عرض السعر"}</button>
  {message&&<div className="quote-submit-message" role="status">{message}</div>}<small>يُحفظ الطلب أولًا في رواج ثم يفتح واتساب لمتابعة التفاصيل. لا يوجد دفع أو تسعير تلقائي.</small>
 </form>;
}