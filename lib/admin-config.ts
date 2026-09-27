export type AdminFieldType = "text" | "textarea" | "number" | "boolean" | "json" | "csv" | "date" | "datetime" | "select";

export type AdminField = {
  name: string;
  label: string;
  type?: AdminFieldType;
  required?: boolean;
  placeholder?: string;
  relation?: { table: string; value: string; label: string };
};

export type AdminSection = {
  slug: string;
  title: string;
  description: string;
  table: string;
  primaryKey?: string[];
  orderField?: string;
  list: string[];
  fields: AdminField[];
};

export const adminSections: Record<string, AdminSection> = {
  hero: {
    slug:"hero", title:"السلايدر الرئيسي", description:"إدارة الشرائح السينمائية في واجهة المنصة.",
    table:"hero_slides", orderField:"sort_order", list:["title","kicker","is_published","sort_order"],
    fields:[
      {name:"title",label:"العنوان الرئيسي",required:true},{name:"kicker",label:"العنوان الصغير"},
      {name:"subtitle",label:"الوصف",type:"textarea"},{name:"media_url",label:"رابط الصورة/الفيديو"},
      {name:"media_type",label:"نوع الوسائط",type:"select"},{name:"cta_label",label:"نص الزر الرئيسي"},
      {name:"cta_href",label:"رابط الزر الرئيسي"},{name:"secondary_cta_label",label:"نص الزر الثانوي"},
      {name:"secondary_cta_href",label:"رابط الزر الثانوي"},{name:"sort_order",label:"الترتيب",type:"number"},
      {name:"is_published",label:"منشور",type:"boolean"}
    ]
  },
  ticker: {
    slug:"ticker", title:"الشريط المتحرك", description:"العناصر النصية المتحركة في الصفحة الرئيسية.",
    table:"ticker_items", orderField:"sort_order", list:["text","href","is_published","sort_order"],
    fields:[{name:"text",label:"النص",required:true},{name:"href",label:"الرابط"},{name:"sort_order",label:"الترتيب",type:"number"},{name:"is_published",label:"منشور",type:"boolean"}]
  },
  departments: {
    slug:"departments", title:"أقسام المؤسسة", description:"إدارة أقسام رواج وصفحاتها الرئيسية.",
    table:"departments", orderField:"sort_order", list:["name","is_published","sort_order"],
    fields:[
      {name:"name",label:"اسم القسم",required:true},
      {name:"summary",label:"ملخص",type:"textarea"},{name:"description",label:"الوصف الكامل",type:"textarea"},
      {name:"image_url",label:"صورة البطاقة"},{name:"hero_url",label:"صورة الهيرو"},
      {name:"sort_order",label:"الترتيب",type:"number"},{name:"is_published",label:"منشور",type:"boolean"}
    ]
  },
  categories: {
    slug:"categories", title:"تصنيفات الخدمات", description:"التصنيفات الرئيسية والفرعية للكتالوج.",
    table:"service_categories", orderField:"sort_order", list:["name","slug","is_published","sort_order"],
    fields:[
      {name:"name",label:"اسم التصنيف",required:true},
      {name:"department_id",label:"القسم",relation:{table:"departments",value:"id",label:"name"}},
      {name:"parent_id",label:"التصنيف الأب",relation:{table:"service_categories",value:"id",label:"name"}},
      {name:"description",label:"الوصف",type:"textarea"},{name:"image_url",label:"الصورة"},
      {name:"sort_order",label:"الترتيب",type:"number"},{name:"is_published",label:"منشور",type:"boolean"}
    ]
  },
  services: {
    slug:"services", title:"كتالوج الخدمات", description:"إدارة الخدمات عبر المحرر المتخصص والقوالب الفنية المراجعة.",
    table:"services", orderField:"sort_order", list:["name","badge","featured","is_published"],
    fields:[
      {name:"name",label:"اسم الخدمة",required:true},
      {name:"department_id",label:"القسم",relation:{table:"departments",value:"id",label:"name"}},
      {name:"category_id",label:"التصنيف",relation:{table:"service_categories",value:"id",label:"name"}},
      {name:"short_description",label:"وصف مختصر",type:"textarea"},{name:"description",label:"الوصف الكامل",type:"textarea"},
      {name:"hero_url",label:"الصورة الرئيسية"},{name:"badge",label:"شارة البطاقة"},
      {name:"featured",label:"مميزة",type:"boolean"},{name:"sort_order",label:"الترتيب",type:"number"},
      {name:"is_published",label:"منشورة",type:"boolean"},{name:"seo_title",label:"عنوان الظهور في البحث"},
      {name:"seo_description",label:"وصف الظهور في البحث",type:"textarea"}
    ]
  },
  packages: {
    slug:"packages", title:"الباقات والعروض", description:"إدارة الباقات التسويقية ومحتواها بنظام طلب عرض سعر.",
    table:"packages", orderField:"sort_order", list:["name","eyebrow","featured","is_published"],
    fields:[
      {name:"name",label:"اسم الباقة",required:true},
      {name:"eyebrow",label:"العنوان التسويقي"},{name:"description",label:"الوصف",type:"textarea"},
      {name:"hero_url",label:"الصورة الرئيسية"},
      {name:"starts_at",label:"بداية العرض",type:"datetime"},{name:"ends_at",label:"نهاية العرض",type:"datetime"},
      {name:"featured",label:"مميزة",type:"boolean"},{name:"sort_order",label:"الترتيب",type:"number"},
      {name:"is_published",label:"منشورة",type:"boolean"}
    ]
  },
  "package-services": {
    slug:"package-services", title:"محتوى الباقات", description:"ربط الخدمات داخل كل باقة.",
    table:"package_services", primaryKey:["package_id","service_id"], list:["package_id","service_id","quantity","note"],
    fields:[
      {name:"package_id",label:"الباقة",required:true,relation:{table:"packages",value:"id",label:"name"}},
      {name:"service_id",label:"الخدمة",required:true,relation:{table:"services",value:"id",label:"name"}},
      {name:"quantity",label:"الكمية",type:"number"},{name:"note",label:"ملاحظة",type:"textarea"}
    ]
  },
  portfolio: {
    slug:"portfolio", title:"معرض الأعمال", description:"إدارة المشاريع والصور والفيديو والتصنيفات.",
    table:"portfolio_items", orderField:"sort_order", list:["title","category","featured","is_published"],
    fields:[
      {name:"title",label:"عنوان المشروع",required:true},
      {name:"category",label:"التصنيف"},{name:"summary",label:"ملخص",type:"textarea"},
      {name:"description",label:"الوصف الكامل",type:"textarea"},{name:"cover_url",label:"صورة الغلاف"},
      {name:"gallery",label:"المعرض JSON",type:"json"},{name:"video_url",label:"رابط الفيديو"},
      {name:"project_date",label:"تاريخ المشروع",type:"date"},{name:"client_name",label:"اسم العميل"},
      {name:"services",label:"الخدمات JSON",type:"json"},{name:"featured",label:"مميز",type:"boolean"},
      {name:"sort_order",label:"الترتيب",type:"number"},{name:"is_published",label:"منشور",type:"boolean"}
    ]
  },
  features: {
    slug:"features", title:"مميزات رواج", description:"إدارة نقاط القوة التي تظهر في الرئيسية.",
    table:"features", orderField:"sort_order", list:["title","is_published","sort_order"],
    fields:[
      {name:"title",label:"العنوان",required:true},{name:"description",label:"الوصف",type:"textarea"},
      {name:"icon",label:"الأيقونة"},{name:"sort_order",label:"الترتيب",type:"number"},
      {name:"is_published",label:"منشورة",type:"boolean"}
    ]
  },
  clients: {
    slug:"clients", title:"العملاء", description:"إدارة شعارات العملاء وروابطهم.",
    table:"clients", orderField:"sort_order", list:["name","is_published","sort_order"],
    fields:[
      {name:"name",label:"اسم العميل",required:true},{name:"logo_url",label:"رابط الشعار"},
      {name:"website_url",label:"الموقع"},{name:"sort_order",label:"الترتيب",type:"number"},
      {name:"is_published",label:"منشور",type:"boolean"}
    ]
  },
  testimonials: {
    slug:"testimonials", title:"شهادات العملاء", description:"إدارة التقييمات والشهادات الحقيقية.",
    table:"testimonials", orderField:"sort_order", list:["person_name","rating","is_published","sort_order"],
    fields:[
      {name:"client_id",label:"العميل",relation:{table:"clients",value:"id",label:"name"}},
      {name:"person_name",label:"اسم الشخص"},{name:"person_title",label:"الصفة"},
      {name:"rating",label:"التقييم",type:"number"},{name:"quote",label:"الشهادة",type:"textarea",required:true},
      {name:"avatar_url",label:"الصورة"},{name:"sort_order",label:"الترتيب",type:"number"},
      {name:"is_published",label:"منشورة",type:"boolean"}
    ]
  },
  blog: {
    slug:"blog", title:"المدونة", description:"إدارة المقالات والتصنيفات وSEO.",
    table:"blog_posts", orderField:"published_at", list:["title","category","featured","is_published"],
    fields:[
      {name:"title",label:"عنوان المقال",required:true},
      {name:"excerpt",label:"المقتطف",type:"textarea"},{name:"content",label:"المحتوى JSON",type:"json"},
      {name:"category",label:"التصنيف"},{name:"tags",label:"الوسوم",type:"csv"},
      {name:"cover_url",label:"صورة الغلاف"},{name:"author_name",label:"الكاتب"},
      {name:"published_at",label:"تاريخ النشر",type:"datetime"},{name:"reading_minutes",label:"دقائق القراءة",type:"number"},
      {name:"featured",label:"مميز",type:"boolean"},{name:"is_published",label:"منشور",type:"boolean"},
      {name:"seo_title",label:"عنوان SEO"},{name:"seo_description",label:"وصف SEO",type:"textarea"}
    ]
  },
  settings: {
    slug:"settings", title:"إعدادات الهوية والتواصل", description:"إعدادات الموقع العامة. الحقول التقنية المتقدمة تُدار برمجيًا ولا تظهر للمحرر.",
    table:"site_settings", list:["key","updated_at"],
    fields:[{name:"key",label:"اسم الإعداد",required:true}]
  },
  quotes: {
    slug:"quotes", title:"طلبات عروض السعر", description:"الطلبات المحفوظة داخل النظام.",
    table:"quote_requests", orderField:"created_at", list:["customer_name","phone","status","created_at"],
    fields:[
      {name:"customer_name",label:"اسم العميل"},{name:"phone",label:"الهاتف"},
      {name:"email",label:"البريد"},{name:"notes",label:"الملاحظات",type:"textarea"},
      {name:"status",label:"الحالة"}
    ]
  }
};

export const adminNav = [
  ["الرئيسية","/admin"],["السلايدر","/admin/hero"],["الشريط المتحرك","/admin/ticker"],
  ["الأقسام","/admin/departments"],["التصنيفات","/admin/categories"],["الخدمات","/admin/services"],
  ["الباقات","/admin/packages"],["محتوى الباقات","/admin/package-services"],["الأعمال","/admin/portfolio"],
  ["المميزات","/admin/features"],["العملاء","/admin/clients"],["الشهادات","/admin/testimonials"],
  ["المدونة","/admin/blog"],["الوسائط","/admin/media"],["طلبات السعر","/admin/quotes"],["الإعدادات","/admin/settings"]
] as const;
