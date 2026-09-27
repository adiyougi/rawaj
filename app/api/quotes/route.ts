import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


type Item={title?:unknown;quantity?:unknown;specifications?:unknown;service_slug?:unknown;package_slug?:unknown};
type QuoteItem={title:string;quantity:number;specifications:Record<string,unknown>;service_slug?:string;package_slug?:string};
const SUPABASE_URL=process.env.NEXT_PUBLIC_SUPABASE_URL;
const PUBLIC_KEY=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function clean(value:unknown,max:number){return typeof value==="string"?value.trim().slice(0,max):"";}
const buckets=new Map<string,{count:number;reset:number}>();
function limited(key:string){const now=Date.now(),old=buckets.get(key);if(!old||old.reset<now){buckets.set(key,{count:1,reset:now+60000});return false;}old.count++;return old.count>8;}

export async function POST(request:Request){
 const forwarded=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
 if(limited(forwarded)) return NextResponse.json({error:"طلبات كثيرة خلال وقت قصير. حاول بعد دقيقة."},{status:429});
 if(!SUPABASE_URL||!PUBLIC_KEY) return NextResponse.json({error:"خدمة الطلبات غير مهيأة على الخادم"},{status:503});
 try{
  const body=await request.json();
  const name=clean(body.customer_name,120),company=clean(body.company_name,160),phone=clean(body.phone,40),whatsapp=clean(body.whatsapp,40),email=clean(body.email,180),city=clean(body.city,120),deadline=clean(body.deadline,20),notes=clean(body.notes,3000);
  const rawItems:Item[]=Array.isArray(body.items)?body.items.slice(0,30):[];
  if(!rawItems.length) return NextResponse.json({error:"اختر خدمة أو أضف خدمة إلى السلة"},{status:400});
  const items:QuoteItem[]=rawItems.reduce<QuoteItem[]>((result,item)=>{
   const title=clean(item.title,180);
   const specifications:Record<string,unknown>=typeof item.specifications==="object"&&item.specifications&&!Array.isArray(item.specifications)?item.specifications as Record<string,unknown>:{};
   const serviceSlug=clean(item.service_slug,180),packageSlug=clean(item.package_slug,180);
   if(!title||JSON.stringify(specifications).length>6000) return result;
   result.push({title,quantity:Math.min(9999,Math.max(1,Number(item.quantity)||1)),specifications,...(serviceSlug?{service_slug:serviceSlug}:{}),...(packageSlug?{package_slug:packageSlug}:{})});
   return result;
  },[]);
  if(name.length<2||phone.length<5) return NextResponse.json({error:"أدخل الاسم ورقم التواصل بشكل صحيح"},{status:400});
  const safeDeadline=/^\d{4}-\d{2}-\d{2}$/.test(deadline)?deadline:null;
  const supabase=createClient(SUPABASE_URL,PUBLIC_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:id,error}=await supabase.rpc("create_quote_request",{
    p_customer_name:name,
    p_phone:phone,
    p_company_name:company||null,
    p_whatsapp:whatsapp||null,
    p_email:email||null,
    p_city:city||null,
    p_deadline:safeDeadline,
    p_notes:notes||null,
    p_items:items
  });
  if(error||!id) throw new Error(error?.message||"quote_request_failed");
  return NextResponse.json({id},{status:201});
 }catch{return NextResponse.json({error:"تعذر حفظ الطلب حاليًا"},{status:500});}
}
