import type { ServiceSpec } from "@/lib/service-specs";
import { serviceSpecifications } from "@/lib/service-specs";

export type ServiceTemplate = {
  key:string;
  label:string;
  description:string;
  family:string;
  subcategory:string;
  verification:"verified"|"legacy";
  suggestedBadge?:string;
  specs:ServiceSpec[];
};

const verifiedPaper:[string,string,string,string,string,string?][]=[
  ["cards","كروت شخصية","بطاقات أعمال مطبوعة بخيارات خامات وقص وتشطيبات خاصة.","الطباعة الورقية","القرطاسية التجارية","الأكثر طلبًا"],
  ["letterheads","أوراق رسمية","ورق مراسلات غير مطلي مناسب للكتابة والطابعات المكتبية.","الطباعة الورقية","القرطاسية التجارية"],
  ["envelopes","مظاريف مطبوعة","مظاريف مراسلات ودعوات بأحجام قياسية ونوافذ وخيارات بيانات متغيرة.","الطباعة الورقية","القرطاسية التجارية"],
  ["invoices","نماذج وفواتير NCR","نماذج كربونلس متعددة الأجزاء للفواتير والسندات وأوامر العمل.","الطباعة الورقية","النماذج والسجلات","الأكثر طلبًا"],
  ["flyers","فلايرات ونشرات","مطبوعات تسويقية مسطحة بوجه واحد أو وجهين.","الطباعة الورقية","المواد التسويقية"],
  ["brochures","بروشورات ومطويات","مطويات تسويقية بخيارات طي حقيقية مرتبطة بالخامة والاستخدام.","الطباعة الورقية","المواد التسويقية"],
  ["catalogs","كتالوجات ومنشورات","منشورات متعددة الصفحات مع اختيار التجليد والخامات المناسبة.","الطباعة الورقية","الكتب والمنشورات"],
  ["booklet-saddle","كتيبات Saddle Stitch","كتيبات مطوية ومدبسة في الكعب للصفحات المنخفضة والمتوسطة.","الطباعة الورقية","الكتب والمنشورات"],
  ["book-perfect","كتب Perfect Bound","كتب وكتيبات بغراء وكعب مربع قابل للطباعة.","الطباعة الورقية","الكتب والمنشورات"],
  ["book-wire-o","كتب Wire-O","منشورات بتجليد سلك مزدوج مناسبة للفتح شبه المسطح.","الطباعة الورقية","الكتب والمنشورات"],
  ["book-spiral","كتب Spiral","دفاتر وكتيبات بتجليد حلزوني مناسب للاستخدام المتكرر.","الطباعة الورقية","الكتب والمنشورات"]
];

const legacy:[string,string,string,string,string,string?][]=[
  ["banner","بنر إعلاني","طباعة بنر داخلي وخارجي.","الطباعة الرقمية","الطباعة كبيرة الحجم"],
  ["flex","فلكس ولوحات مضيئة","خامات فلكس للإعلانات واللوحات.","الطباعة الرقمية","الطباعة كبيرة الحجم"],
  ["stickers","استيكر وفينيل","ملصقات، فينيل وقص كونتور.","الطباعة الرقمية","الملصقات والفينيل"],
  ["lightbox","لوحات ضوئية","لوحات LED مضيئة.","اللوحات","اللوحات المضيئة"],
  ["letters","حروف بارزة","حروف أكريليك وستيل مضيئة وغير مضيئة.","اللوحات","الحروف البارزة"],
  ["facade","واجهات وديكور","واجهات أليكوبوند وحلول متكاملة.","الواجهات","واجهات المحلات"],
  ["identity","هوية بصرية","شعار وهوية مؤسسية متكاملة.","التصميم والمحتوى","الهوية البصرية"],
  ["social-content","تصميم ومحتوى سوشيال","تصاميم وحملات محتوى للمنصات.","التصميم والمحتوى","المحتوى الرقمي"],
  ["laser","قص وحفر ليزر","أكريليك وخشب وMDF.","الليزر والأكريليك","القص والحفر"],
  ["awards","دروع وهدايا","دروع تكريم وهدايا أكريليك مخصصة.","الليزر والأكريليك","الدروع والهدايا"]
];

const build=(defs:[string,string,string,string,string,string?][],verification:"verified"|"legacy"):ServiceTemplate[] =>
  defs.map(([key,label,description,family,subcategory,badge])=>({
    key,label,description,family,subcategory,verification,suggestedBadge:badge,
    specs:serviceSpecifications[key] || []
  }));

export const serviceTemplates:ServiceTemplate[]=[
  ...build(verifiedPaper,"verified"),
  ...build(legacy,"legacy")
];

export const emptySpec:ServiceSpec={key:"",label:"",type:"select",options:[],group:"مواصفات أخرى"};
