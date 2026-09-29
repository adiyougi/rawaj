import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


type Item={title?:unknown;quantity?:unknown;specifications?:unknown;service_slug?:unknown;package_slug?:unknown};
type QuoteItem={title:string;quantity:number;specifications:Record<string,unknown>;service_slug?:string;package_slug?:string};
const SUPABASE_URL=process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY=process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAX_FILE_SIZE=4*1024*1024;
const MAX_TOTAL_SIZE=4*1024*1024;
const ALLOWED_MIME=new Set(["image/jpeg","image/png","image/webp","application/pdf","application/postscript","image/vnd.adobe.photoshop","application/zip","application/x-zip-compressed"]);
const ALLOWED_EXTENSIONS_BY_MIME:Record<string,Set<string>>={
 "image/jpeg":new Set(["jpg","jpeg"]),
 "image/png":new Set(["png"]),
 "image/webp":new Set(["webp"]),
 "application/pdf":new Set(["pdf"]),
 "application/postscript":new Set(["ai","eps","ps"]),
 "image/vnd.adobe.photoshop":new Set(["psd"]),
 "application/zip":new Set(["zip"]),
 "application/x-zip-compressed":new Set(["zip"])
};
function fileExtension(name:string){const normalized=name.normalize("NFKC").toLowerCase();const dot=normalized.lastIndexOf(".");return dot>0&&dot<normalized.length-1?normalized.slice(dot+1):"";}
function safeFileName(name:string){return name.normalize("NFKC").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,120)||"file";}

function clean(value:unknown,max:number){return typeof value==="string"?value.trim().slice(0,max):"";}
const buckets=new Map<string,{count:number;reset:number}>();
function limited(key:string){const now=Date.now(),old=buckets.get(key);if(!old||old.reset<now){buckets.set(key,{count:1,reset:now+60000});return false;}old.count++;return old.count>8;}

export async function POST(request:Request){
 const forwarded=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
 if(limited(forwarded)) return NextResponse.json({error:"طلبات كثيرة خلال وقت قصير. حاول بعد دقيقة."},{status:429});
 if(!SUPABASE_URL||!SERVICE_KEY) return NextResponse.json({error:"خدمة الطلبات غير مهيأة على الخادم"},{status:503});
 try{
  const contentType=request.headers.get("content-type")||"";
  let body:any;
  let files:File[]=[];
  if(contentType.includes("multipart/form-data")){
    const form=await request.formData();
    const payload=String(form.get("payload")||"");
    body=JSON.parse(payload);
    files=form.getAll("attachments").filter((value):value is File=>value instanceof File&&value.size>0);
  }else{
    body=await request.json();
  }
  if(files.length>5) return NextResponse.json({error:"يمكن إرفاق 5 ملفات كحد أقصى."},{status:400});
  const totalSize=files.reduce((sum,file)=>sum+file.size,0);
  if(totalSize>MAX_TOTAL_SIZE) return NextResponse.json({error:"إجمالي المرفقات يجب ألا يتجاوز 4MB."},{status:400});
  for(const file of files){
    if(file.size>MAX_FILE_SIZE) return NextResponse.json({error:"حجم كل ملف يجب ألا يتجاوز 4MB."},{status:400});
    if(!ALLOWED_MIME.has(file.type)) return NextResponse.json({error:"نوع ملف غير مدعوم: "+file.name},{status:400});
    const extension=fileExtension(file.name);
    if(!extension||!ALLOWED_EXTENSIONS_BY_MIME[file.type]?.has(extension)) return NextResponse.json({error:"امتداد الملف لا يطابق نوعه: "+file.name},{status:400});
    if(file.name.length>180) return NextResponse.json({error:"اسم أحد الملفات طويل جدًا."},{status:400});
  }
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
  const supabase=createClient(SUPABASE_URL,SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:created,error}=await supabase.rpc("create_quote_request_v2",{
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
  const id=created&&typeof created==="object" ? String((created as {id?:unknown}).id||"") : "";
  const requestNumber=created&&typeof created==="object" ? String((created as {request_number?:unknown}).request_number||"") : "";
  if(error||!id||!requestNumber) throw new Error(error?.message||"quote_request_failed");
  let uploaded=0;
  let attachmentWarning="";
  if(files.length){
    if(!SERVICE_KEY){
      attachmentWarning="تم حفظ الطلب، لكن خدمة المرفقات غير مهيأة على الخادم.";
    }else{
      const admin=createClient(SUPABASE_URL,SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
      for(const file of files){
        const path=id+"/"+crypto.randomUUID()+"-"+safeFileName(file.name);
        const bytes=new Uint8Array(await file.arrayBuffer());
        const {error:uploadError}=await admin.storage.from("rawaj-quotes").upload(path,bytes,{contentType:file.type,upsert:false});
        if(uploadError){attachmentWarning="تم حفظ الطلب لكن تعذر رفع بعض المرفقات.";continue;}
        const {error:metaError}=await admin.from("quote_attachments").insert({
          quote_request_id:id,
          file_name:file.name.slice(0,180),
          storage_path:path,
          mime_type:file.type,
          file_size:file.size
        });
        if(metaError){
          await admin.storage.from("rawaj-quotes").remove([path]);
          attachmentWarning="تم حفظ الطلب لكن تعذر تسجيل بعض المرفقات.";
          continue;
        }
        uploaded++;
      }
      if(uploaded){
        await admin.from("quote_events").insert({
          quote_request_id:id,
          event_type:"attachment",
          message:"تم إرفاق "+uploaded+" ملف مع الطلب.",
          is_internal:true
        });
      }
    }
  }
  return NextResponse.json({id,request_number:requestNumber,attachments_uploaded:uploaded,attachment_warning:attachmentWarning||null},{status:201});
 }catch{return NextResponse.json({error:"تعذر حفظ الطلب حاليًا"},{status:500});}
}
