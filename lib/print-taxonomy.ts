export type PrintTaxonomySubcategory = {
  key:string;
  label:string;
  templates:string[];
  status:"verified"|"research";
};

export type PrintTaxonomyFamily = {
  key:string;
  label:string;
  description:string;
  subcategories:PrintTaxonomySubcategory[];
};

export const printTaxonomy:PrintTaxonomyFamily[]=[
  {
    key:"paper-printing",
    label:"الطباعة الورقية والتجارية",
    description:"مطبوعات الأعمال والتسويق والنماذج والمنشورات.",
    subcategories:[
      {key:"business-stationery",label:"القرطاسية التجارية",templates:["cards","letterheads","envelopes"],status:"verified"},
      {key:"business-forms",label:"النماذج والسجلات",templates:["invoices"],status:"verified"},
      {key:"marketing-collateral",label:"المواد التسويقية",templates:["flyers","brochures"],status:"verified"},
      {key:"publications",label:"الكتب والمنشورات",templates:["catalogs","booklet-saddle","book-perfect","book-wire-o","book-spiral"],status:"verified"}
    ]
  },
  {
    key:"labels-packaging",
    label:"الملصقات والتغليف",
    description:"ملصقات، ليبل، علب، أكياس وحلول تغليف مطبوعة.",
    subcategories:[{key:"research",label:"قيد البحث والتوثيق",templates:[],status:"research"}]
  },
  {
    key:"large-format",
    label:"الطباعة كبيرة الحجم",
    description:"بنر، فلكس، فينيل، رسومات نوافذ وجدران ومركبات.",
    subcategories:[{key:"research",label:"قيد البحث والتوثيق",templates:[],status:"research"}]
  },
  {
    key:"signage",
    label:"اللوحات والإشارات",
    description:"لوحات مضيئة وغير مضيئة، حروف، أنظمة توجيه وعرض.",
    subcategories:[{key:"research",label:"قيد البحث والتوثيق",templates:[],status:"research"}]
  },
  {
    key:"promotional-specialty",
    label:"الطباعة الدعائية والمتخصصة",
    description:"هدايا، ملابس، طباعة حرارية، سكرين، UV وتطبيقات متخصصة.",
    subcategories:[{key:"research",label:"قيد البحث والتوثيق",templates:[],status:"research"}]
  }
];
