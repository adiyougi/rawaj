export const CONTACT = {
  mobile: "+967 772 110 131",
  landline: "01 202439",
  whatsapp: "967772110131",
  email: "rawaj2008@gmail.com",
  address: "صنعاء - الدائري - جولة الجامعة الجديدة - بداية شارع العدل",
  facebook: "https://www.facebook.com/rawaj.advs"
};

export const IMAGES = {
  print: "https://images.unsplash.com/photo-1744126175546-d7c5366e94f9?auto=format&fit=crop&q=86&w=1800",
  storefront: "https://images.unsplash.com/photo-1769265114898-083ad50197f4?auto=format&fit=crop&q=86&w=1800",
  neon: "https://images.unsplash.com/photo-1521684415672-2306f06332a4?auto=format&fit=crop&q=86&w=1800",
  design: "https://images.unsplash.com/photo-1716471330463-f475b00f0506?auto=format&fit=crop&q=86&w=1800",
  cards: "https://images.unsplash.com/photo-1777652918753-d66882b15391?auto=format&fit=crop&q=86&w=1800",
  laser: "https://images.unsplash.com/photo-1738162837619-5d0b158abcec?auto=format&fit=crop&q=86&w=1800"
};

export const departments = [
  { title: "التصميم الفني وصناعة المحتوى", text: "هوية بصرية، حملات، محتوى وتصميمات تتكلم بلغة علامتك.", image: IMAGES.design },
  { title: "الطباعة الورقية", text: "مطبوعات تجارية ومؤسسية بتشطيبات متعددة وجودة إنتاج دقيقة.", image: IMAGES.cards },
  { title: "الطباعة الرقمية والإعلانية", text: "حلول طباعة للمساحات الكبيرة والمواد الدعائية بمختلف الخامات.", image: IMAGES.print },
  { title: "اللوحات والحروف الإعلانية", text: "لوحات مضيئة وحروف بارزة وحلول حضور بصري داخلي وخارجي.", image: IMAGES.neon },
  { title: "الواجهات والديكور الإعلاني", text: "واجهات متكاملة تربط الهوية بالمكان وتحوّل الموقع إلى نقطة جذب.", image: IMAGES.storefront },
  { title: "الليزر والأكريليك", text: "قص وحفر وتنفيذ أعمال خاصة على الأكريليك والخشب ومواد متنوعة.", image: IMAGES.laser }
];

export const services = [
  { id: "cards", title: "طباعة كروت شخصية", category: "الطباعة الورقية", desc: "بطاقات أعمال بخيارات ورق وتشطيب متنوعة.", image: IMAGES.cards, badge: "الأكثر طلبًا" },
  { id: "invoices", title: "طباعة فواتير وسندات", category: "الطباعة الورقية", desc: "دفاتر وفواتير وسندات مرتبة لهوية مؤسسية متكاملة.", image: IMAGES.print, badge: "مؤسسي" },
  { id: "brochures", title: "طباعة بروشورات وفلايرات", category: "الطباعة الورقية", desc: "مطبوعات تسويقية بمقاسات وخامات وتشطيبات متعددة.", image: IMAGES.design, badge: "تسويق" },
  { id: "banner", title: "طباعة بنر إعلاني", category: "الطباعة الرقمية", desc: "طباعة إعلانية للمساحات الكبيرة بجاهزية للتركيب.", image: IMAGES.print, badge: "مساحات كبيرة" },
  { id: "lightbox", title: "لوحات ضوئية", category: "اللوحات", desc: "لوحات أمامية وجانبية بإضاءة وتجهيز كامل.", image: IMAGES.neon, badge: "تنفيذ كامل" },
  { id: "letters", title: "حروف بارزة", category: "اللوحات", desc: "حروف أكريليك أو ستيل بخيارات إضاءة متعددة.", image: IMAGES.storefront, badge: "واجهة" },
  { id: "identity", title: "تصميم هوية بصرية", category: "التصميم", desc: "نظام بصري متكامل يرفع حضور العلامة ويثبت شخصيتها.", image: IMAGES.design, badge: "إبداع" },
  { id: "laser", title: "قص وحفر ليزر", category: "الليزر", desc: "قص وحفر دقيق للأكريليك والخشب والأعمال الخاصة.", image: IMAGES.laser, badge: "تفصيل" }
];

export const packages = [
  { title: "باقة إطلاق علامة", eyebrow: "هوية + مطبوعات", text: "بداية متماسكة لعلامة جديدة: هوية بصرية، كروت، ورق رسمي ومواد إطلاق.", image: IMAGES.design },
  { title: "باقة افتتاح موقع", eyebrow: "واجهة + لوحة + مطبوعات", text: "حزمة تسويقية لمحل أو فرع جديد تجمع الحضور الخارجي مع مواد البيع.", image: IMAGES.storefront },
  { title: "باقة حضور مؤسسي", eyebrow: "تصميم + طباعة", text: "مزيج مرن للشركات والمؤسسات يمكن تخصيصه بحسب احتياج الفريق.", image: IMAGES.cards }
];

export const portfolio = [
  { title: "واجهات وهوية مكانية", category: "واجهات", image: IMAGES.storefront },
  { title: "لوحات ضوئية وحروف", category: "لوحات", image: IMAGES.neon },
  { title: "مطبوعات مؤسسية", category: "طباعة", image: IMAGES.cards },
  { title: "هوية وتصميم", category: "تصميم", image: IMAGES.design },
  { title: "تشغيل وطباعة", category: "إنتاج", image: IMAGES.print },
  { title: "قص وتنفيذ خاص", category: "ليزر", image: IMAGES.laser }
];

export const posts = [
  { title: "كيف تختار الخامة المناسبة للوحة مشروعك؟", tag: "دليل عملي", image: IMAGES.storefront },
  { title: "متى تحتاج هوية بصرية كاملة وليس مجرد شعار؟", tag: "تصميم وهوية", image: IMAGES.design },
  { title: "دليل مبسط لتشطيبات المطبوعات الورقية", tag: "طباعة", image: IMAGES.cards }
];
