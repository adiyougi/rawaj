import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AdminCollection from "@/components/admin/AdminCollection";
import { adminSections } from "@/lib/admin-config";

export default async function AdminSectionPage({params}:{params:Promise<{section:string}>}) {
  const {section} = await params;
  const config = adminSections[section];
  if (!config) notFound();

  return <AdminShell><AdminCollection config={config} /></AdminShell>;
}
