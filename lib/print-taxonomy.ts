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
    description:"ملصقات حساسة للضغط، ليبل منتجات، علب ورقية وتغليف مموج.",
    subcategories:[
      {key:"stickers",label:"الاستيكرات",templates:["stickers"],status:"verified"},
      {key:"product-labels",label:"ليبل المنتجات",templates:["roll-labels","sheet-labels"],status:"verified"},
      {key:"folding-cartons",label:"العلب الورقية",templates:["folding-carton"],status:"verified"},
      {key:"corrugated",label:"التغليف المموج",templates:["corrugated-box"],status:"verified"}
    ]
  },
  {
    key:"large-format",
    label:"الطباعة كبيرة الحجم",
    description:"بنرات، Backlit، فينيل، نوافذ، جدران، أرضيات ومركبات.",
    subcategories:[
      {key:"banners",label:"البنرات",templates:["banner","mesh-banner"],status:"verified"},
      {key:"backlit",label:"Backlit والوجوه المضيئة",templates:["flex"],status:"verified"},
      {key:"vinyl",label:"الفينيل والجرافيك",templates:["vinyl-graphics"],status:"verified"},
      {key:"windows",label:"جرافيك النوافذ",templates:["window-graphics"],status:"verified"},
      {key:"walls",label:"جرافيك الجدران",templates:["wall-graphics"],status:"verified"},
      {key:"floors",label:"جرافيك الأرضيات",templates:["floor-graphics"],status:"verified"},
      {key:"vehicles",label:"المركبات والأساطيل",templates:["vehicle-wrap"],status:"verified"}
    ]
  },
  {
    key:"signage",
    label:"اللوحات والإشارات والواجهات",
    description:"لوحات مضيئة وغير مضيئة، حروف، أكريليك وواجهات ACP.",
    subcategories:[
      {key:"lightboxes",label:"اللوحات المضيئة",templates:["lightbox"],status:"verified"},
      {key:"channel-letters",label:"الحروف المضيئة",templates:["letters"],status:"verified"},
      {key:"dimensional",label:"الحروف البارزة",templates:["dimensional-letters"],status:"verified"},
      {key:"rigid-signs",label:"اللوحات الصلبة",templates:["acrylic-sign"],status:"verified"},
      {key:"facades",label:"واجهات ACP",templates:["facade"],status:"verified"}
    ]
  },
  {
    key:"promotional-specialty",
    label:"الطباعة الدعائية والمتخصصة",
    description:"هدايا، ملابس، طباعة حرارية، سكرين، UV وتطبيقات متخصصة.",
    subcategories:[{key:"research",label:"قيد البحث والتوثيق",templates:[],status:"research"}]
  }
];
