import {NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";

const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secret=process.env.SUPABASE_SERVICE_ROLE_KEY;

async function owner(request:Request){
 if(!url||!publicKey||!secret) return null;
 const token=request.headers.get("authorization")?.replace(/^Bearer\s+/i,"");
 if(!token) return null;
 const publicClient=createClient(url,publicKey,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:{user}}=await publicClient.auth.getUser(token);
 if(!user) return null;
 const admin=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:profile}=await admin.from("admin_users").select("role").eq("user_id",user.id).maybeSingle();
 return profile?.role==="owner"?admin:null;
}

export async function GET(request:Request){
 const admin=await owner(request);if(!admin)return NextResponse.json({error:"غير مصرح"},{status:403});
 const [{data:{users},error},{data:profiles,error:profileError}]=await Promise.all([admin.auth.admin.listUsers({page:1,perPage:200}),admin.from("admin_users").select("user_id,role,created_at")]);
 if(error||profileError)return NextResponse.json({error:"تعذر تحميل المستخدمين"},{status:500});
 const map=new Map((profiles||[]).map(p=>[p.user_id,p]));
 return NextResponse.json({users:users.filter(u=>map.has(u.id)).map(u=>({id:u.id,email:u.email||"",lastSignIn:u.last_sign_in_at||null,createdAt:u.created_at,role:map.get(u.id)?.role||"editor"}))});
}

export async function POST(request:Request){
 const admin=await owner(request);if(!admin)return NextResponse.json({error:"غير مصرح"},{status:403});
 const body=await request.json().catch(()=>({}));const email=String(body.email||"").trim().toLowerCase();const role=["admin","editor"].includes(body.role)?body.role:"editor";
 if(!/^\S+@\S+\.\S+$/.test(email))return NextResponse.json({error:"البريد غير صالح"},{status:400});
 const {data,error}=await admin.auth.admin.inviteUserByEmail(email);
 if(error||!data.user)return NextResponse.json({error:error?.message||"تعذر إرسال الدعوة"},{status:400});
 const {error:profileError}=await admin.from("admin_users").upsert({user_id:data.user.id,role},{onConflict:"user_id"});
 if(profileError)return NextResponse.json({error:"تم إنشاء المستخدم وتعذر تعيين الصلاحية"},{status:500});
 return NextResponse.json({ok:true});
}

export async function PATCH(request:Request){
 const admin=await owner(request);if(!admin)return NextResponse.json({error:"غير مصرح"},{status:403});
 const body=await request.json().catch(()=>({}));const id=String(body.id||"");const role=["admin","editor"].includes(body.role)?body.role:"";
 if(!id||!role)return NextResponse.json({error:"بيانات غير صالحة"},{status:400});
 const {error}=await admin.from("admin_users").update({role}).eq("user_id",id).neq("role","owner");
 return error?NextResponse.json({error:"تعذر تحديث الصلاحية"},{status:500}):NextResponse.json({ok:true});
}

export async function DELETE(request:Request){
 const admin=await owner(request);if(!admin)return NextResponse.json({error:"غير مصرح"},{status:403});
 const id=new URL(request.url).searchParams.get("id")||"";
 if(!id)return NextResponse.json({error:"معرف مفقود"},{status:400});
 const {error}=await admin.from("admin_users").delete().eq("user_id",id).neq("role","owner");
 return error?NextResponse.json({error:"تعذر سحب الصلاحية"},{status:500}):NextResponse.json({ok:true});
}