"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminSetupPage() {
  const router = useRouter();
  const [secret,setSecret] = useState("");
  const [message,setMessage] = useState("");
  const [busy,setBusy] = useState(false);

  useEffect(()=>{
    (async()=>{
      const {data:{session}} = await getSupabaseBrowser().auth.getSession();
      if (!session) router.replace("/admin/login");
    })();
  },[router]);

  async function claim(event:FormEvent) {
    event.preventDefault();
    setBusy(true);
    const {data,error} = await getSupabaseBrowser().rpc("claim_first_admin",{claim_secret:secret});
    if (error) setMessage(error.message);
    else if (!data) setMessage("رمز التهيئة غير صحيح أو تم تعيين مدير سابقًا.");
    else router.replace("/admin");
    setBusy(false);
  }

  return (
    <main className="admin-setup-page">
      <div className="admin-setup-card">
        <span className="admin-kicker">SECURE BOOTSTRAP</span>
        <h1>تعيين أول مدير.</h1>
        <p>هذه الخطوة تُنفذ مرة واحدة فقط. بعد نجاحها لا يمكن استخدام رمز التهيئة مرة أخرى.</p>
        <form onSubmit={claim}>
          <label><span>رمز التهيئة</span><input value={secret} onChange={e=>setSecret(e.target.value)} required /></label>
          {message && <div className="admin-auth-message">{message}</div>}
          <button className="admin-primary" disabled={busy}>{busy ? "جارٍ التحقق…" : "تفعيل صلاحية المدير"}</button>
        </form>
      </div>
    </main>
  );
}
