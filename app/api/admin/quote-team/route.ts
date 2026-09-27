import {NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";

const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const service=process.env.SUPABASE_SERVICE_ROLE_KEY;

async function context(request:Request){
  if(!url||!anon||!service) return null;
  const token=request.headers.get("authorization")?.replace(/^Bearer\s+/i,"");
  if(!token) return null;
  const userClient=createClient(url,anon,{global:{headers:{Authorization:"Bearer "+token}},auth:{persistSession:false}});
  const {data:{user}}=await userClient.auth.getUser(token);
  if(!user) return null;
  const admin=createClient(url,service,{auth:{persistSession:false}});
  const {data:profile}=await admin.from("admin_users").select("role").eq("user_id",user.id).maybeSingle();
  if(!profile||!["owner","admin","sales"].includes(profile.role)) return null;
  return {admin};
}

export async function GET(request:Request){
  const ctx=await context(request);
  if(!ctx) return NextResponse.json({error:"غير مصرح"},{status:403});
  const {data:profiles,error}=await ctx.admin.from("admin_users").select("user_id,role").in("role",["owner","admin","sales"]);
  if(error) return NextResponse.json({error:"تعذر تحميل فريق المبيعات"},{status:500});
  const {data:authData,error:authError}=await ctx.admin.auth.admin.listUsers({page:1,perPage:1000});
  if(authError) return NextResponse.json({error:"تعذر تحميل المستخدمين"},{status:500});
  const emails=new Map(authData.users.map(user=>[user.id,user.email||""]));
  const users=(profiles||[]).map(profile=>({id:profile.user_id,email:emails.get(profile.user_id)||"مستخدم",role:profile.role}));
  return NextResponse.json({users});
}
