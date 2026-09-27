"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode,setMode] = useState<"login"|"signup">("login");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const [busy,setBusy] = useState(false);

  async function submit(event:FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const supabase = getSupabaseBrowser();

    if (mode === "login") {
      const {error} = await supabase.auth.signInWithPassword({email,password});
      if (error) setMessage(error.message);
      else router.replace("/admin");
    } else {
      const {data,error} = await supabase.auth.signUp({email,password});
      if (error) setMessage(error.message);
      else if (data.session) router.replace("/admin/setup");
      else setMessage("تم إنشاء الحساب. افتح رسالة التحقق في بريدك ثم عد وسجّل الدخول.");
    }

    setBusy(false);
  }

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-brand">
        <img src="/rawaj-logo.webp" alt="رواج" />
        <span>RAWAJ CONTROL CENTER</span>
        <h1>المحتوى تحت سيطرتك.</h1>
        <p>لوحة مستقلة لإدارة الموقع التسويقي دون لمس الكود أو GitHub.</p>
      </section>

      <section className="admin-auth-card">
        <span className="admin-kicker">{mode === "login" ? "تسجيل الدخول" : "إنشاء حساب الإدارة"}</span>
        <h2>{mode === "login" ? "مرحبًا بعودتك." : "التهيئة الأولى."}</h2>
        <p>{mode === "login" ? "أدخل بيانات حساب الإدارة." : "أنشئ حسابًا ثم فعّله من البريد قبل المطالبة بصلاحية المدير."}</p>

        <form onSubmit={submit}>
          <label><span>البريد الإلكتروني</span><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} /></label>
          <label><span>كلمة المرور</span><input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} /></label>
          {message && <div className="admin-auth-message">{message}</div>}
          <button className="admin-primary" disabled={busy}>{busy ? "لحظة…" : mode === "login" ? "دخول لوحة التحكم" : "إنشاء الحساب"}</button>
        </form>

        <button className="admin-auth-switch" onClick={()=>setMode(mode === "login" ? "signup" : "login")}>
          {mode === "login" ? "أول مرة؟ أنشئ حساب الإدارة" : "لدي حساب بالفعل"}
        </button>
      </section>
    </main>
  );
}
