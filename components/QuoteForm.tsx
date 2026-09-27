"use client";

import { FormEvent,useEffect,useState } from "react";
import { useCart } from "@/components/CartProvider";
import { CONTACT } from "@/lib/content";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

type Option={id:string;title:string};
export default function QuoteForm({services,packages}:{services:Option[];packages:Option[]}){
 const {items,clear}=useCart();
 const [name,setName]=useState(""),[phone,setPhone]=useState(""),[service,setService]=useState(""),[packageId,setPackageId]=useState(""),[details,setDetails]=useState(""),[sending,setSending]=useState(false),[message,setMessage]=useState("");
 useEffect(()=>{const p=new URLSearchParams(location.search);setService(p.get("service")||"");setPackageId(p.get("package")||"");},[]);
 async function submit(e:FormEvent){e.preventDefault();setSending(true);setMessage("");
  try{
   const supabase=getSupabaseBrowser();
   const {data:req,error}=await supabase.from("quote_requests").insert({customer_name:name.trim(),phone:phone.trim(),notes:details.trim()||null,source:"website",status:"new"}).select("id").single();
   if(error) throw error;
   const chosen=service?services.find(x=>x.id===service):packageId?packages.find(x=>x.id===packageId):null;
   const payload=items.length?items.map(x=>({quote_request_id:req.id,title:x.title,quantity:x.qty,specifications:x.specs?{summary:x.specs}:{}})):chosen?[{quote_request_id:req.id,title:chosen.title,quantity:1,specifications:{}}]:[];
   if(payload.length){const {error:itemError}=await supabase.from("quote_request_items").insert(payload);if(itemError) throw itemError;}
   const lines=payload.map((x,i)=>`${i+1}. ${x.title} × ${x.quantity}`).join("\n");
   const wa="طلب عرض سعر جديد من منصة رواج\nرقم الطلب: "+req.id+"\nالاسم: "+name+"\nرقم التواصل: "+phone+(lines?"\n\n"+lines:"")+(details?"\n\nالتفاصيل: "+details:"");
   clear();setMessage("تم حفظ طلبك بنجاح. رقم الطلب: "+req.id);window.open("https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(wa),"_blank","noopener,noreferrer");
  }catch(err:any){setMessage(err?.message||"تعذر حفظ الطلب. حاول مرة أخرى.");}finally{setSending(false);}
 }
 return <form className="quote-form" onSubmit={submit}>
  <label>الاسم<input required maxLength={120} value={name} onChange={e=>setName(e.target.value)} placeholder="اسمك أو اسم المؤسسة"/></label>
  <label>رقم التواصل<input required maxLength={40} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="رقم الجوال" inputMode="tel"/></label>
  {!items.length&&<><label>الخدمة<select value={service} onChange={e=>{setService(e.target.value);if(e.target.value)setPackageId("");}}><option value="">اختر خدمة</option>{services.map(x=><option value={x.id} key={x.id}>{x.title}</option>)}</select></label>
  <label>أو الباقة<select value={packageId} onChange={e=>{setPackageId(e.target.value);if(e.target.value)setService("");}}><option value="">اختر باقة</option>{packages.map(x=><option value={x.id} key={x.id}>{x.title}</option>)}</select></label></>}
  {!!items.length&&<div className="quote-cart-preview"><strong>الخدمات المختارة ({items.length})</strong>{items.map(x=><p key={x.key}>{x.title} × {x.qty}{x.specs?<small>{x.specs}</small>:null}</p>)}</div>}
  <label>تفاصيل الطلب<textarea maxLength={3000} value={details} onChange={e=>setDetails(e.target.value)} placeholder="المقاسات، الكمية، الخامة، الموعد، أو أي تفاصيل تعرفها..."/></label>
  <button className="btn btn-primary full" disabled={sending} type="submit">{sending?"جارٍ حفظ الطلب…":"إرسال طلب عرض السعر"}</button>
  {message&&<div className="quote-submit-message" role="status">{message}</div>}<small>يُحفظ الطلب أولًا في رواج ثم يفتح واتساب لمتابعة التفاصيل. لا يوجد دفع أو تسعير تلقائي.</small>
 </form>;
}