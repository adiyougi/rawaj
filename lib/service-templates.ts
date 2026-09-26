import type { ServiceSpec } from "@/lib/service-specs";
import { serviceSpecifications } from "@/lib/service-specs";

export type ServiceTemplate = {
  key:string;
  label:string;
  description:string;
  suggestedBadge?:string;
  specs:ServiceSpec[];
};

const defs:[string,string,string,string?][]=[
  ["cards","كروت شخصية","بطاقات أعمال وكروت تعريفية","الأكثر طلبًا"],
  ["invoices","فواتير وسندات","دفاتر فواتير، سندات قبض وصرف ونماذج NCR"],
  ["brochures","بروشورات وفلايرات","مطويات، فلايرات ونشرات دعائية"],
  ["letterheads","أوراق ومظاريف رسمية","مراسلات وهوية مكتبية"],
  ["catalogs","كتالوجات وملفات","كتالوجات تعريفية وملفات شركات"],
  ["banner","بنر إعلاني","طباعة بنر داخلي وخارجي"],
  ["flex","فلكس ولوحات مضيئة","خامات فلكس للإعلانات واللوحات"],
  ["stickers","استيكر وفينيل","ملصقات، فينيل وقص كونتور"],
  ["lightbox","لوحات ضوئية","لوحات LED مضيئة"],
  ["letters","حروف بارزة","حروف أكريليك وستيل مضيئة وغير مضيئة"],
  ["facade","واجهات وديكور","واجهات أليكوبوند وحلول متكاملة"],
  ["identity","هوية بصرية","شعار وهوية مؤسسية متكاملة"],
  ["social-content","تصميم ومحتوى سوشيال","تصاميم وحملات محتوى للمنصات"],
  ["laser","قص وحفر ليزر","أكريليك وخشب وMDF"],
  ["awards","دروع وهدايا","دروع تكريم وهدايا أكريليك مخصصة"]
];

export const serviceTemplates:ServiceTemplate[]=defs.map(([key,label,description,badge])=>({
  key,label,description,suggestedBadge:badge,specs:serviceSpecifications[key] || []
}));

export const emptySpec:ServiceSpec={key:"",label:"",type:"select",options:[]};
