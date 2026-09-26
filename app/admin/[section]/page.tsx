import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AdminCollection from "@/components/admin/AdminCollection";
import ServiceManager from "@/components/admin/ServiceManager";
import { adminSections } from "@/lib/admin-config";

export default async function AdminSectionPage({params}:{params:Promise<{section:string}>}) {
  const {section}=await params;

  if(section==="services"){
    return <AdminShell><ServiceManager/></AdminShell>;
  }

  const config=adminSections[section];
  if(!config) notFound();

  return <AdminShell><AdminCollection config={config}/></AdminShell>;
}
