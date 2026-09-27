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
      {key:"business-stationery",label:"القرطاسية التجارية",templates:["cards","letterheads","envelopes","presentation-folders","notepads"],status:"verified"},
      {key:"business-forms",label:"النماذج والسجلات",templates:["invoices"],status:"verified"},
      {key:"marketing-collateral",label:"المواد التسويقية",templates:["flyers","brochures","menus","postcards","door-hangers"],status:"verified"},
      {key:"product-branding",label:"هوية وتغليف المنتج",templates:["hang-tags"],status:"verified"},
      {key:"events",label:"المناسبات والتذاكر",templates:["tickets","greeting-invitations"],status:"verified"},
      {key:"calendars",label:"التقاويم",templates:["wall-calendars","desk-calendars"],status:"verified"},
      {key:"publications",label:"الكتب والمنشورات",templates:["catalogs","booklet-saddle","book-perfect","book-wire-o","book-spiral","notebooks"],status:"verified"}
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
      {key:"corrugated",label:"التغليف المموج",templates:["corrugated-box"],status:"verified"},
      {key:"paper-bags",label:"الأكياس الورقية",templates:["paper-shopping-bag"],status:"verified"},
      {key:"foodservice",label:"تغليف Foodservice",templates:["paper-cup"],status:"verified"},
      {key:"industrial-sacks",label:"الأكياس الصناعية",templates:["industrial-paper-sack"],status:"verified"},
      {key:"flexible-packaging",label:"التغليف المرن",templates:["premade-flexible-pouch","flexible-rollstock"],status:"verified"}
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
      {key:"vehicles",label:"المركبات والأساطيل",templates:["vehicle-wrap"],status:"verified"},
      {key:"rigid",label:"الطباعة على الخامات الصلبة",templates:["rigid-uv-print","pvc-foam-board","acm-printed-panel","coroplast-sign","foam-board-display"],status:"verified"}
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
      {key:"reflective-safety",label:"اللوحات العاكسة والسلامة",templates:["reflective-sign","traffic-regulatory-sign","traffic-warning-sign","traffic-guide-sign","parking-reflective-sign","work-zone-reflective-sign","street-name-reflective-sign","facility-safety-reflective-sign"],status:"verified"},
      {key:"facades",label:"واجهات ACP",templates:["facade"],status:"verified"}
    ]
  },
  {
    key:"exhibitions-displays",
    label:"المعارض وأنظمة العرض",
    description:"ستاندات محمولة، باك وول، SEG، Lightboxes قماشية، طاولات، خيام، أعلام وبوثات Modular.",
    subcategories:[
      {key:"banner-stands",label:"Banner Stands",templates:["retractable-banner-stand"],status:"verified"},
      {key:"fabric-displays",label:"Fabric Displays",templates:["tension-fabric-banner"],status:"verified"},
      {key:"backwalls",label:"Backwalls",templates:["pop-up-backwall"],status:"verified"},
      {key:"seg",label:"SEG Systems",templates:["seg-fabric-frame","seg-lightbox"],status:"verified"},
      {key:"tables-counters",label:"Tables & Counters",templates:["table-cover","trade-show-counter"],status:"verified"},
      {key:"outdoor",label:"Outdoor Displays",templates:["event-tent","event-flag"],status:"verified"},
      {key:"hanging",label:"Hanging Displays",templates:["hanging-display"],status:"verified"},
      {key:"modular",label:"Modular Exhibits",templates:["modular-exhibit"],status:"verified"}
    ]
  },
  {
    key:"promotional-specialty",
    label:"الطباعة النسيجية والدعائية والمتخصصة",
    description:"طباعة ملابس، تطريز، سوبليميشن، UV، نقل حراري، ليزر وتخصيص منتجات.",
    subcategories:[
      {key:"sublimation",label:"Sublimation",templates:["textile-sublimation","sublimation-hard-goods"],status:"verified"},
      {key:"dtf-dtg",label:"DTF وDTG",templates:["dtf-apparel","dtg-apparel"],status:"verified"},
      {key:"screen-printing",label:"Screen Printing",templates:["screen-print-apparel"],status:"verified"},
      {key:"embroidery",label:"Embroidery",templates:["embroidery"],status:"verified"},
      {key:"heat-transfer",label:"Heat Transfer",templates:["heat-transfer-vinyl"],status:"verified"},
      {key:"uv-object",label:"UV وتخصيص المنتجات",templates:["uv-direct-object","uv-dtf"],status:"verified"},
      {key:"laser",label:"الليزر",templates:["laser-cutting","laser-engraving"],status:"verified"},
      {key:"awards",label:"الدروع والهدايا",templates:["awards"],status:"verified"}
    ]
  }
];
