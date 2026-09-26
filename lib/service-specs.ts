export type ServiceSpec = {
  key: string;
  label: string;
  type: "select" | "text" | "number";
  placeholder?: string;
  options?: string[];
  unit?: string;
  group?: string;
  helpText?: string;
  required?: boolean;
};

const quoteQty = (unit = "نسخة"): ServiceSpec => ({
  key: "qty",
  label: "الكمية المطلوبة",
  type: "number",
  placeholder: "مثال: 1000",
  unit,
  group: "الكمية"
});

export const serviceSpecifications: Record<string, ServiceSpec[]> = {
  cards: [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["90 × 50 مم", "85 × 55 مم", "مربع", "مقاس مخصص"], group: "المقاس" },
    { key: "sides", label: "أوجه الطباعة", type: "select", options: ["وجه واحد", "وجهين"], group: "الطباعة" },
    { key: "stock", label: "الخامة", type: "select", options: ["كرتون مطلي C2S", "كرتون غير مطلي", "ورق/كرتون فاخر محبب أو طبيعي", "بلاستيك شفاف أو أبيض", "أحتاج عينة واقتراح رواج"], group: "الخامة", helpText: "الخامة النهائية تُثبت حسب العينة وتقنية الطباعة المتاحة." },
    { key: "shape", label: "الشكل والقص", type: "select", options: ["مستطيل", "مربع", "زوايا دائرية", "قص خاص حسب التصميم"], group: "القص" },
    { key: "lamination", label: "التغليف السطحي", type: "select", options: ["بدون", "مطفي", "لامع", "Silk / Velvet حسب المورد"], group: "التشطيب" },
    { key: "special_finish", label: "تشطيب خاص", type: "select", options: ["بدون", "فويل معدني", "Spot UV", "فويل + Spot UV حسب إمكانية المورد"], group: "التشطيب" },
    quoteQty("بطاقة")
  ],

  letterheads: [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["A4", "A5", "Letter", "Legal", "مقاس مخصص"], group: "المقاس" },
    { key: "paper", label: "نوع الورق", type: "select", options: ["ورق غير مطلي مناسب للكتابة والطابعات المكتبية", "ورق فاخر غير مطلي حسب العينة", "خامة خاصة حسب الطلب"], group: "الخامة", helpText: "الأوراق الرسمية تُفضّل غير مطلية حتى تقبل الكتابة والطباعة المكتبية." },
    { key: "sides", label: "أوجه الطباعة", type: "select", options: ["وجه أمامي فقط", "وجهين"], group: "الطباعة" },
    { key: "bundling", label: "تجهيز الرزم", type: "select", options: ["بدون تجهيز خاص", "تغليف رزم / شرنك حسب الكمية"], group: "التجهيز" },
    quoteQty("ورقة")
  ],

  envelopes: [
    { key: "size", label: "مقاس الظرف", type: "select", options: ["DL", "C6", "C5", "C4", "A7", "#10", "9 × 12 بوصة", "مقاس مخصص"], group: "المقاس", helpText: "سلسلة C مخصصة أساسًا لمواءمة مقاسات سلسلة A وفق المعايير الدولية." },
    { key: "stock", label: "خامة الظرف", type: "select", options: ["ورق أبيض غير مطلي", "Premium Opaque", "Linen غير مطلي", "ورق طبيعي / فاخر", "خامة خاصة حسب الطلب"], group: "الخامة" },
    { key: "window", label: "نافذة العنوان", type: "select", options: ["بدون نافذة", "نافذة قياسية", "موضع مخصص حسب النموذج"], group: "البنية" },
    { key: "opening", label: "جهة الفتح", type: "select", options: ["الضلع الطويل", "الضلع القصير", "حسب نوع الظرف"], group: "البنية" },
    { key: "printing", label: "الطباعة", type: "select", options: ["وجه خارجي", "وجهان", "طباعة داخلية/خارجية حسب المورد"], group: "الطباعة" },
    { key: "variable_data", label: "عناوين متغيرة", type: "select", options: ["غير مطلوبة", "عناوين/بيانات متغيرة"], group: "الطباعة" },
    quoteQty("ظرف")
  ],

  invoices: [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["A4", "A5", "A6", "Letter", "Legal", "مقاس مخصص"], group: "المقاس" },
    { key: "parts", label: "عدد أجزاء المجموعة", type: "select", options: ["جزآن", "3 أجزاء", "4 أجزاء", "أكثر حسب متطلبات العمل وتوفر الخامة"], group: "NCR", helpText: "النظام القياسي يتكون من CB في الأعلى وCF في الأسفل، ومع أكثر من ورقتين تستخدم CFB في الوسط." },
    { key: "set_colors", label: "تسلسل ألوان النسخ", type: "select", options: ["أبيض + أصفر", "أبيض + أصفر + وردي", "أبيض + أصفر + وردي + ذهبي", "تسلسل آخر حسب توفر ورق NCR"], group: "NCR" },
    { key: "ink", label: "طباعة النموذج", type: "select", options: ["أسود", "ألوان كاملة", "وجه أمامي وظهر فارغ", "طباعة على الوجهين حسب الحاجة"], group: "الطباعة" },
    { key: "format", label: "طريقة التجميع", type: "select", options: ["مجموعات منفصلة", "بلوك مع ظهر كرتوني", "دفتر بغطاء Wrap-around"], group: "التجميع" },
    { key: "sets_per_pad", label: "عدد المجموعات في البلوك/الدفتر", type: "select", options: ["25", "50", "100", "عدد مخصص"], group: "التجميع" },
    { key: "glued_edge", label: "جهة لصق المجموعة", type: "select", options: ["أعلى", "يسار", "يمين", "أسفل", "تحدد حسب التصميم"], group: "التجميع" },
    { key: "perforation", label: "تخريم الفصل", type: "select", options: ["بدون", "تخريم فصل داخل الدفتر", "يُحدد حسب نموذج الاستخدام"], group: "التجميع", helpText: "يستخدم لتسهيل نزع النسخ، وقد تُترك النسخة الأخيرة مثبتة في بعض دفاتر النماذج." },
    { key: "numbering", label: "الترقيم المتسلسل", type: "select", options: ["بدون", "ترقيم أسود", "ترقيم أحمر"], group: "الترقيم" },
    { key: "start_number", label: "رقم البداية", type: "text", placeholder: "مثال: 0001001", group: "الترقيم" },
    { key: "filing_holes", label: "تخريم للأرشفة", type: "select", options: ["بدون", "مطلوب — يحدد الموضع مع رواج"], group: "التجهيز" },
    { key: "pads_qty", label: "عدد البلوكات/الدفاتر", type: "number", placeholder: "مثال: 20", unit: "دفتر", group: "الكمية" }
  ],

  flyers: [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["A6", "A5", "A4", "DL", "Letter", "مقاس مخصص"], group: "المقاس" },
    { key: "paper", label: "نوع الخامة", type: "select", options: ["ورق مطلي Gloss", "ورق مطلي Matte", "ورق غير مطلي", "كرتون خفيف/ثقيل حسب الاستخدام"], group: "الخامة" },
    { key: "sides", label: "أوجه الطباعة", type: "select", options: ["وجه واحد", "وجهين"], group: "الطباعة" },
    { key: "coating", label: "الطلاء/الحماية", type: "select", options: ["بدون", "Matte", "Gloss", "High Gloss / UV حسب الخامة والمورد"], group: "التشطيب" },
    quoteQty("نسخة")
  ],

  brochures: [
    { key: "open_size", label: "المقاس قبل الطي", type: "select", options: ["A4", "A3", "Letter", "Legal", "11 × 17 بوصة", "مقاس مخصص"], group: "المقاس" },
    { key: "fold", label: "نوع الطي", type: "select", options: ["نصف طية Half Fold", "ثلاثي Tri-Fold", "Z-Fold", "Gate Fold", "Double Gate Fold", "Double Parallel", "Accordion", "Roll Fold", "Right-Angle Fold", "بدون طي"], group: "الطي" },
    { key: "paper", label: "نوع الخامة", type: "select", options: ["ورق مطلي Gloss", "ورق مطلي Matte", "ورق غير مطلي", "كرتون خفيف حسب التصميم"], group: "الخامة" },
    { key: "sides", label: "أوجه الطباعة", type: "select", options: ["وجه واحد", "وجهين"], group: "الطباعة" },
    { key: "coating", label: "الطلاء/الحماية", type: "select", options: ["بدون", "Matte", "Gloss", "High Gloss / UV", "Aqueous / Satin Aqueous حسب المورد"], group: "التشطيب" },
    { key: "score", label: "التخديد قبل الطي", type: "select", options: ["يُحدد تلقائيًا حسب الخامة", "مطلوب للخامات السميكة"], group: "الطي", helpText: "الخامات السميكة قد تحتاج تخديدًا قبل الطي لتقليل تشقق سطح الطباعة." },
    quoteQty("نسخة")
  ],

  catalogs: [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["A4", "A5", "مربع", "Letter", "مقاس مخصص"], group: "المقاس" },
    { key: "pages", label: "عدد الصفحات", type: "number", placeholder: "مثال: 48", unit: "صفحة", group: "المحتوى" },
    { key: "binding", label: "نوع التجليد", type: "select", options: ["Saddle Stitch — تدبيس في الكعب", "Perfect Bound — غراء وكعب مربع", "Spiral", "Wire-O"], group: "التجليد", helpText: "الاختيار يعتمد على عدد الصفحات وطريقة الاستخدام والحاجة إلى كعب مطبوع أو فتح مسطح." },
    { key: "inside_stock", label: "ورق الصفحات الداخلية", type: "select", options: ["مطلي Gloss", "مطلي Matte", "غير مطلي للكتابة", "خامة خاصة حسب العينة"], group: "الخامة" },
    { key: "cover_stock", label: "خامة الغلاف", type: "select", options: ["نفس خامة الداخل", "كرتون مطلي أثقل", "كرتون Matte أثقل", "خامة فاخرة حسب العينة"], group: "الخامة" },
    { key: "cover_finish", label: "تشطيب الغلاف", type: "select", options: ["بدون", "سلفنة مطفية", "سلفنة لامعة", "Soft Touch", "UV / Aqueous حسب الخامة والمورد"], group: "التشطيب" },
    quoteQty("نسخة")
  ],

  "booklet-saddle": [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["A4", "A5", "A6", "Letter", "مربع", "مقاس مخصص"], group: "المقاس" },
    { key: "pages", label: "عدد الصفحات", type: "number", placeholder: "مثال: 24", unit: "صفحة", group: "المحتوى", helpText: "التدبيس في الكعب يعتمد على ملازم مطوية، لذلك يُراجع عدد الصفحات مع رواج قبل الإنتاج." },
    { key: "inside_stock", label: "ورق الداخل", type: "select", options: ["Gloss", "Matte", "غير مطلي"], group: "الخامة" },
    { key: "cover", label: "الغلاف", type: "select", options: ["Self Cover — نفس ورق الداخل", "غلاف أثقل مستقل"], group: "الخامة" },
    { key: "cover_finish", label: "تشطيب الغلاف", type: "select", options: ["بدون", "سلفنة", "UV / Aqueous حسب الخامة"], group: "التشطيب" },
    quoteQty("نسخة")
  ],

  "book-perfect": [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["A4", "A5", "Letter", "مربع", "مقاس مخصص"], group: "المقاس" },
    { key: "pages", label: "عدد الصفحات", type: "number", placeholder: "مثال: 120", unit: "صفحة", group: "المحتوى" },
    { key: "inside_stock", label: "ورق الداخل", type: "select", options: ["Gloss", "Matte", "غير مطلي"], group: "الخامة" },
    { key: "cover_stock", label: "خامة الغلاف", type: "select", options: ["كرتون مطلي", "كرتون Matte", "خامة فاخرة حسب العينة"], group: "الخامة" },
    { key: "cover_finish", label: "تشطيب الغلاف", type: "select", options: ["بدون", "سلفنة مطفية", "سلفنة لامعة", "Soft Touch", "UV / Aqueous حسب المورد"], group: "التشطيب" },
    { key: "spine", label: "الكعب", type: "select", options: ["كعب مطبوع", "بدون نص على الكعب", "يحدد بعد حساب السماكة"], group: "التجليد" },
    quoteQty("نسخة")
  ],

  "book-wire-o": [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["A4", "A5", "Letter", "مقاس مخصص"], group: "المقاس" },
    { key: "pages", label: "عدد الصفحات", type: "number", placeholder: "مثال: 80", unit: "صفحة", group: "المحتوى" },
    { key: "inside_stock", label: "ورق الداخل", type: "select", options: ["مطلي", "غير مطلي", "خامة خاصة"], group: "الخامة" },
    { key: "cover", label: "نوع الغلاف", type: "select", options: ["غلاف ورقي/كرتوني", "غلاف شفاف + ظهر كرتوني", "حسب الاستخدام"], group: "الخامة" },
    { key: "orientation", label: "جهة التجليد", type: "select", options: ["الضلع الطويل", "الضلع القصير"], group: "التجليد" },
    quoteQty("نسخة")
  ],

  "book-spiral": [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["A4", "A5", "Letter", "مقاس مخصص"], group: "المقاس" },
    { key: "pages", label: "عدد الصفحات", type: "number", placeholder: "مثال: 100", unit: "صفحة", group: "المحتوى" },
    { key: "inside_stock", label: "ورق الداخل", type: "select", options: ["مطلي", "غير مطلي", "خامة خاصة"], group: "الخامة" },
    { key: "cover", label: "نوع الغلاف", type: "select", options: ["غلاف كرتوني", "غلاف شفاف + ظهر كرتوني", "حسب الاستخدام"], group: "الخامة" },
    { key: "orientation", label: "جهة التجليد", type: "select", options: ["الضلع الطويل", "الضلع القصير"], group: "التجليد" },
    quoteQty("نسخة")
  ],

  banner: [
    { key: "width", label: "العرض", type: "number", placeholder: "بالمتر", unit: "م", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "بالمتر", unit: "م", group: "المقاس" },
    { key: "material", label: "الخامة", type: "select", options: ["بنر", "أحتاج اقتراح رواج"], group: "الخامة" },
    { key: "finish", label: "التجهيز", type: "select", options: ["بدون", "عيون معدنية", "لحام أطراف", "مخصص"], group: "التشطيب" },
    quoteQty("قطعة")
  ],
  flex: [
    { key: "width", label: "العرض", type: "number", placeholder: "بالمتر", unit: "م", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "بالمتر", unit: "م", group: "المقاس" },
    { key: "usage", label: "الاستخدام", type: "select", options: ["لوحة مضيئة", "واجهة", "إعلان خارجي", "غير ذلك"], group: "الاستخدام" },
    { key: "installation", label: "التركيب", type: "select", options: ["طباعة فقط", "طباعة + تركيب"], group: "التركيب" }
  ],
  stickers: [
    { key: "size", label: "المقاس", type: "text", placeholder: "مثال: 10 × 10 سم", group: "المقاس" },
    { key: "material", label: "الخامة", type: "select", options: ["استيكر أبيض", "شفاف", "فينيل", "أحتاج اقتراح"], group: "الخامة" },
    { key: "cut", label: "القص", type: "select", options: ["مستقيم", "كونتور", "قص خاص"], group: "القص" },
    { key: "lamination", label: "الحماية", type: "select", options: ["بدون", "سلفنة", "حسب الاستخدام"], group: "التشطيب" },
    quoteQty("قطعة")
  ],
  lightbox: [
    { key: "size", label: "الأبعاد", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    { key: "sides", label: "نوع اللوحة", type: "select", options: ["أمامية", "جانبية / وجهين"], group: "البنية" },
    { key: "lighting", label: "الإضاءة", type: "select", options: ["LED", "حسب توصية رواج"], group: "الإضاءة" },
    { key: "install", label: "التركيب", type: "select", options: ["تنفيذ فقط", "تنفيذ + تركيب"], group: "التركيب" },
    { key: "location", label: "موقع التركيب", type: "text", placeholder: "اسم المنطقة أو وصف الموقع", group: "التركيب" }
  ],
  letters: [
    { key: "material", label: "الخامة", type: "select", options: ["أكريليك", "ستيل", "مزيج خامات", "أحتاج اقتراح"], group: "الخامة" },
    { key: "height", label: "ارتفاع الحروف التقريبي", type: "number", placeholder: "بالسنتيمتر", unit: "سم", group: "المقاس" },
    { key: "lighting", label: "الإضاءة", type: "select", options: ["بدون إضاءة", "إضاءة أمامية", "إضاءة خلفية", "مخصص"], group: "الإضاءة" },
    { key: "install", label: "التركيب", type: "select", options: ["تصنيع فقط", "تصنيع + تركيب"], group: "التركيب" }
  ],
  facade: [
    { key: "size", label: "أبعاد الواجهة", type: "text", placeholder: "العرض × الارتفاع التقريبي", group: "المقاس" },
    { key: "material", label: "الخامة المطلوبة", type: "select", options: ["أليكوبوند", "مزيج خامات", "أحتاج اقتراح رواج"], group: "الخامة" },
    { key: "design", label: "التصميم", type: "select", options: ["لدي تصميم", "أحتاج تصميم 3D من رواج"], group: "التصميم" },
    { key: "signage", label: "اللوحة أو الحروف", type: "select", options: ["ضمن المشروع", "غير مطلوبة", "يحدد لاحقًا"], group: "اللوحات" },
    { key: "location", label: "موقع المشروع", type: "text", placeholder: "المدينة / المنطقة", group: "التركيب" }
  ],
  identity: [
    { key: "business", label: "نوع النشاط", type: "text", placeholder: "مثال: مطعم، شركة، متجر...", group: "النشاط" },
    { key: "scope", label: "النطاق", type: "select", options: ["شعار فقط", "هوية أساسية", "هوية متكاملة"], group: "النطاق" },
    { key: "status", label: "حالة العلامة", type: "select", options: ["مشروع جديد", "تطوير هوية قائمة", "إعادة تسمية"], group: "النطاق" },
    { key: "deadline", label: "موعد مستهدف", type: "text", placeholder: "إن وجد", group: "الجدول" }
  ],
  "social-content": [
    { key: "platforms", label: "المنصات", type: "text", placeholder: "إنستغرام، فيسبوك، تيك توك...", group: "النطاق" },
    { key: "qty", label: "عدد التصاميم", type: "number", placeholder: "مثال: 12", unit: "تصميم", group: "الكمية" },
    { key: "copy", label: "كتابة المحتوى", type: "select", options: ["تصميم فقط", "تصميم + كتابة محتوى"], group: "النطاق" },
    { key: "period", label: "الفترة", type: "select", options: ["حملة", "أسبوع", "شهر", "مخصص"], group: "الجدول" }
  ],
  laser: [
    { key: "material", label: "الخامة", type: "select", options: ["أكريليك", "MDF", "خشب", "خامة أخرى"], group: "الخامة" },
    { key: "thickness", label: "السماكة", type: "text", placeholder: "إن كانت معروفة", group: "الخامة" },
    { key: "size", label: "المقاس", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    { key: "operation", label: "العملية", type: "select", options: ["قص", "حفر", "قص + حفر"], group: "التنفيذ" },
    quoteQty("قطعة")
  ],
  awards: [
    { key: "type", label: "النوع", type: "select", options: ["درع", "هدية أكريليك", "ستاند", "قطعة مخصصة"], group: "المنتج" },
    { key: "material", label: "الخامة", type: "select", options: ["أكريليك", "خشب", "مزيج خامات"], group: "الخامة" },
    { key: "size", label: "المقاس", type: "text", placeholder: "إن كان محددًا", group: "المقاس" },
    quoteQty("قطعة"),
    { key: "personalization", label: "تخصيص أسماء/شعارات", type: "select", options: ["نعم", "لا", "يحدد لاحقًا"], group: "التخصيص" }
  ]
};
