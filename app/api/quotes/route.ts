import { NextResponse } from "next/server";

type Item={title?:unknown;quantity?:unknown;specifications?:unknown};
const SUPABASE_URL=process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVER_KEY=process.env.SUPABASE_SERVICE_ROLE_KEY;

function clean(value:unknown,max:number){return typeof value==="string"?value.trim().slice(0,max):"";}
const buckets=new Map<string,{count:number;reset:number}>();
function limited(key:string){const now=Date.now(),old=buckets.get(key);if(!old||old.reset<now){buckets.set(key,{count:1,reset:now+60000});return false;}old.count++;return old.count>8;}

export async function POST(request:Request){
 const forwarded=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
 if(limited(forwarded)) return NextResponse.json({error:"طلبات كثيرة خلال وقت قصير. حاول بعد دقيقة."},{status:429});
 if(!SUPABASE_URL||!SERVER_KEY) return NextResponse.json({error:"خدمة الطلبات غير مهيأة على الخادم"},{status:503});
 try{
  const body=await request.json();
  const name=clean(body.customer_name,120),phone=clean(body.phone,40),notes=clean(body.notes,3000);
  const rawItems:Item[]=Array.isArray(body.items)?body.items.slice(0,30):[];
  if(!rawItems.length) return NextResponse.json({error:"اختر خدمة أو أضف خدمة إلى السلة"},{status:400});
  const items:{title:string;quantity:number;specifications:object}[]=rawItems.map((x:Item)=>{const specifications=typeof x.specifications==="object"&&x.specifications?x.specifications:{};if(JSON.stringify(specifications).length>6000) return null;return {title:clean(x.title,180),quantity:Math.min(9999,Math.max(1,Number(x.quantity)||1)),specifications};}).filter((x:{title:string;quantity:number;specifications:object}|null):x is {title:string;quantity:number;specifications:object}=>Boolean(x?.title));
  if(name.length<2||phone.length<5) return NextResponse.json({error:"أدخل الاسم ورقم التواصل بشكل صحيح"},{status:400});
  const headers={apikey:SERVER_KEY,Authorization:"Bearer "+SERVER_KEY,"Content-Type":"application/json",Prefer:"return=representation"};
  const created=await fetch(SUPABASE_URL+"/rest/v1/quote_requests",{method:"POST",headers,body:JSON.stringify({customer_name:name,phone,notes:notes||null,source:"website",status:"new"}),cache:"no-store"});
  if(!created.ok) throw new Error("quote_request_failed");
  const rows=await created.json();const id=rows?.[0]?.id;if(!id) throw new Error("quote_id_missing");
  if(items.length){const saved=await fetch(SUPABASE_URL+"/rest/v1/quote_request_items",{method:"POST",headers,body:JSON.stringify(items.map((x)=>({...x,quote_request_id:id}))),cache:"no-store"});if(!saved.ok) throw new Error("quote_items_failed");}
  return NextResponse.json({id},{status:201});
 }catch{return NextResponse.json({error:"تعذر حفظ الطلب حاليًا"},{status:500});}
}
