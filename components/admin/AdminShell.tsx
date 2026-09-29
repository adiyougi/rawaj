"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { adminNav } from "@/lib/admin-config";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready,setReady] = useState(false);
  const [menu,setMenu] = useState(false);
  const [email,setEmail] = useState("");
  const [role,setRole] = useState("");

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/admin/login");
        return;
      }

      setEmail(session.user.email || "");
      const { data: profile } = await supabase
        .from("admin_users")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!profile) {
        router.replace("/admin/setup");
        return;
      }

      const currentRole=profile.role || "admin";
      const isQuotes=pathname==="/admin/quotes" || pathname.startsWith("/admin/quotes/");
      const isUsers=pathname==="/admin/users" || pathname.startsWith("/admin/users/");
      const isMessages=pathname==="/admin/messages" || pathname.startsWith("/admin/messages/");

      if(currentRole==="sales" && !isQuotes){
        router.replace("/admin/quotes");
        return;
      }
      if(currentRole==="editor" && (isQuotes || isUsers || isMessages)){
        router.replace("/admin");
        return;
      }
      if(currentRole!=="owner" && isUsers){
        router.replace("/admin");
        return;
      }

      setRole(currentRole);
      setReady(true);
    })();
  }, [router,pathname]);

  async function logout() {
    await getSupabaseBrowser().auth.signOut();
    router.replace("/admin/login");
  }

  if (!ready) {
    return <div className="admin-loading"><span>RAWAJ CMS</span><b>جارٍ التحقق من صلاحية الإدارة…</b></div>;
  }

  return (
    <div className="admin-app">
      <aside className={menu ? "admin-sidebar open" : "admin-sidebar"}>
        <div className="admin-brand">
          <img src="/rawaj-logo.webp" alt="رواج" />
          <div><strong>رواج</strong><small>Control Center</small></div>
        </div>

        <nav>
          {adminNav.filter(([,href])=>{
            if(role==="sales") return href==="/admin/quotes";
            if(role==="editor") return href!=="/admin/users" && href!=="/admin/quotes" && href!=="/admin/messages";
            return href!=="/admin/users" || role==="owner";
          }).map(([label,href]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""} onClick={() => setMenu(false)}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <small>{email}</small><small>{role==="owner"?"المالك":role==="admin"?"مدير":role==="editor"?"محرر":"مبيعات"}</small>
          <button onClick={logout}>تسجيل الخروج</button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu-btn" onClick={() => setMenu(!menu)}>☰</button>
          <div><span>لوحة تحكم رواج</span><small>{role==="sales"?"متابعة طلبات عروض السعر":"إدارة المحتوى والكتالوج"}</small></div>
          <Link href="/" target="_blank">فتح الموقع ↗</Link>
        </header>
        {children}
      </div>
      {menu && <button className="admin-backdrop" onClick={() => setMenu(false)} aria-label="إغلاق القائمة" />}
    </div>
  );
}
