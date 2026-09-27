import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AdminCollection from "@/components/admin/AdminCollection";
import ServiceManager from "@/components/admin/ServiceManager";
import PackageManager from "@/components/admin/PackageManager";
import PortfolioManager from "@/components/admin/PortfolioManager";
import SettingsManager from "@/components/admin/SettingsManager";
import UserManager from "@/components/admin/UserManager";
import { adminSections } from "@/lib/admin-config";

export default async function AdminSectionPage({params}:{params:Promise<{section:string}>}) {
  const {section}=await params;

  if(section==="users") return <AdminShell><UserManager/></AdminShell>;

  if(section==="settings") return <AdminShell><SettingsManager/></AdminShell>;

  if(section==="services"){
    return <AdminShell><ServiceManager/></AdminShell>;
  }

  if(section==="packages"){
    return <AdminShell><PackageManager/></AdminShell>;
  }

  if(section==="portfolio"){
    return <AdminShell><PortfolioManager/></AdminShell>;
  }

  const config=adminSections[section];
  if(!config) notFound();

  return <AdminShell><AdminCollection config={config}/></AdminShell>;
}
