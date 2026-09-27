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

  "presentation-folders": [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["9 × 12 بوصة", "6 × 9 بوصة", "5.25 × 10.5 بوصة", "9 × 14.5 بوصة Legal", "مقاس مخصص"], group: "المقاس" },
    { key: "stock", label: "الخامة", type: "select", options: ["14PT C2S", "16PT C2S", "Uncoated / Natural", "Pearl Metallic", "خامة فاخرة حسب العينة"], group: "الخامة" },
    { key: "printing", label: "الطباعة", type: "select", options: ["الخارج فقط", "الخارج + الداخل", "الخارج ملون والداخل لون واحد", "يحدد حسب التصميم"], group: "الطباعة" },
    { key: "pockets", label: "الجيوب", type: "select", options: ["جيب يمين", "جيب يسار", "جيبان", "Pocket style مخصص"], group: "البنية" },
    { key: "card_slit", label: "فتحة كرت شخصي", type: "select", options: ["بدون", "يمين أفقي", "يمين رأسي", "يسار أفقي", "يسار رأسي", "على الجيبين"], group: "التجهيز" },
    { key: "finish", label: "التشطيب السطحي", type: "select", options: ["بدون", "UV", "Spot UV", "Silk Lamination", "Velvet / Soft-touch Lamination", "حسب المورد والخامة"], group: "التشطيب" },
    quoteQty("فولدر")
  ],

  menus: [
    { key: "format", label: "شكل المنيو", type: "select", options: ["Flat / بدون طي", "Half Fold", "Tri-fold", "Z-Fold", "Accordion", "مقاس/بنية مخصصة"], group: "البنية" },
    { key: "size", label: "المقاس", type: "select", options: ["A5", "A4", "A3", "Letter", "11 × 17 بوصة", "مقاس مخصص"], group: "المقاس" },
    { key: "stock", label: "الخامة", type: "select", options: ["70lb Uncoated", "80lb Paper", "100lb Paper", "10PT Cardstock", "14PT Uncoated Cardstock", "14PT Cardstock", "16PT Cardstock", "Synthetic / Waterproof — خدمة منفصلة عند الحاجة"], group: "الخامة" },
    { key: "printing", label: "أوجه الطباعة", type: "select", options: ["وجه واحد", "وجهين"], group: "الطباعة" },
    { key: "coating", label: "الحماية", type: "select", options: ["بدون", "Gloss", "Matte", "Lamination حسب الاستخدام", "يحدد وفق قابلية التنظيف المطلوبة"], group: "التشطيب" },
    { key: "scoring", label: "التخديد", type: "select", options: ["لا يحتاج", "يحتاج Scoring قبل الطي", "تحدده رواج حسب سماكة الخامة"], group: "التجهيز" },
    { key: "drilling", label: "تخريم", type: "select", options: ["بدون", "فتحة واحدة", "3 فتحات", "موقع خاص"], group: "التجهيز" },
    quoteQty("نسخة")
  ],

  tickets: [
    { key: "size", label: "المقاس", type: "select", options: ["2 × 5.5 بوصة", "2.75 × 5.5 بوصة", "2.75 × 8.5 بوصة", "3.5 × 8.5 بوصة", "مقاس مخصص"], group: "المقاس" },
    { key: "stock", label: "الخامة", type: "select", options: ["10PT Cardstock", "14PT Uncoated Cardstock", "خامة مخصصة"], group: "الخامة" },
    { key: "printing", label: "الطباعة", type: "select", options: ["وجه ملون وظهر فارغ", "وجهين Full Color"], group: "الطباعة" },
    { key: "coating", label: "الطلاء", type: "select", options: ["بدون / Uncoated للكتابة", "Gloss", "Matte", "High Gloss UV"], group: "التشطيب" },
    { key: "perforation", label: "خطوط الفصل Perforation", type: "select", options: ["بدون", "خط واحد", "خطان", "3 خطوط", "موضع مخصص"], group: "التجهيز" },
    { key: "numbering", label: "ترقيم متسلسل", type: "select", options: ["بدون", "أسود", "لون آخر حسب الإمكانية"], group: "الترقيم" },
    { key: "number_start", label: "رقم البداية", type: "text", placeholder: "مثال: 000100", group: "الترقيم" },
    { key: "number_location", label: "موضع الترقيم", type: "select", options: ["أعلى يمين", "أعلى يسار", "أسفل يمين", "أسفل يسار", "على طرف التذكرة", "موضع محدد في التصميم"], group: "الترقيم" },
    quoteQty("تذكرة")
  ],

  postcards: [
    { key: "size", label: "المقاس", type: "select", options: ["4 × 6 بوصة", "5 × 7 بوصة", "4 × 9 بوصة", "5.5 × 8.5 بوصة", "6 × 9 بوصة", "6 × 11 بوصة", "مقاس مخصص"], group: "المقاس" },
    { key: "stock", label: "الخامة", type: "select", options: ["14PT C2S", "16PT C2S", "100LB Gloss Cover", "Uncoated / Writable", "Ultra-thick / specialty stock"], group: "الخامة" },
    { key: "printing", label: "أوجه الطباعة", type: "select", options: ["وجه واحد", "وجهين", "وجه ملون + ظهر للكتابة/العنوان"], group: "الطباعة" },
    { key: "coating", label: "التشطيب", type: "select", options: ["بدون", "Matte", "Aqueous", "Satin Aqueous", "UV Front Only", "UV on printed side", "Spot UV حسب المنتج"], group: "التشطيب" },
    { key: "score", label: "Scoring / طي", type: "select", options: ["بدون", "Score in half", "One score", "Two scores"], group: "التجهيز" },
    { key: "tearoff", label: "جزء Tear-off", type: "select", options: ["بدون", "Perforated coupon / card section", "يحدد حسب التصميم"], group: "التجهيز" },
    quoteQty("بطاقة")
  ],

  "hang-tags": [
    { key: "size", label: "المقاس", type: "select", options: ["1.5 × 3.5 بوصة", "2 × 3.5 بوصة", "2 × 4 بوصة", "2 × 5 بوصة", "3 × 3 بوصة", "4 × 6 بوصة", "مقاس مخصص"], group: "المقاس" },
    { key: "shape", label: "الشكل", type: "select", options: ["Rectangle", "Square", "Rounded corners", "Custom die-cut"], group: "القص" },
    { key: "stock", label: "الخامة", type: "select", options: ["14PT C2S", "14PT Uncoated", "16PT C2S", "18PT C1S", "خامة فاخرة مخصصة"], group: "الخامة" },
    { key: "printing", label: "أوجه الطباعة", type: "select", options: ["وجه واحد", "وجهين"], group: "الطباعة" },
    { key: "coating", label: "التشطيب", type: "select", options: ["بدون", "Aqueous", "Matte", "UV", "Spot UV", "Silk / Laminated specialty"], group: "التشطيب" },
    { key: "hole", label: "فتحة التعليق", type: "select", options: ["بدون", "Drill hole 1/8 بوصة", "Bottleneck / die-cut تعليق", "موضع مخصص"], group: "التجهيز" },
    quoteQty("Tag")
  ],

  "door-hangers": [
    { key: "size", label: "المقاس", type: "select", options: ["3.5 × 8.5 بوصة", "3.5 × 11 بوصة", "4 × 7 بوصة", "4.25 × 11 بوصة", "4.25 × 14 بوصة"], group: "المقاس" },
    { key: "stock", label: "الخامة", type: "select", options: ["14PT C2S", "14PT Uncoated", "16PT C2S", "100LB Gloss Cover", "100LB Gloss Book", "Synthetic waterproof"], group: "الخامة" },
    { key: "printing", label: "أوجه الطباعة", type: "select", options: ["وجه واحد", "وجهين"], group: "الطباعة" },
    { key: "coating", label: "التشطيب", type: "select", options: ["بدون", "Aqueous", "Satin Aqueous", "UV Front Only", "UV on printed side"], group: "التشطيب" },
    { key: "diecut", label: "فتحة الباب / Die-cut", type: "select", options: ["Standard", "Arch", "Starburst", "Custom"], group: "القص" },
    { key: "tearoff", label: "جزء Tear-off", type: "select", options: ["بدون", "Perforated tear-off", "موضع مخصص"], group: "التجهيز" },
    quoteQty("قطعة")
  ],

  "greeting-invitations": [
    { key: "product", label: "نوع البطاقة", type: "select", options: ["دعوة", "Greeting Card", "Save the Date", "بطاقة شكر", "بطاقة مناسبة/تهنئة", "بطاقة مؤسسية"], group: "المنتج" },
    { key: "size", label: "المقاس", type: "select", options: ["A6 / قريب منه", "A5 مطوي", "5 × 7 بوصة", "5.5 × 8.5 بوصة مطوي", "6 × 9 بوصة مطوي", "مقاس مخصص"], group: "المقاس" },
    { key: "stock", label: "الخامة", type: "select", options: ["14PT C2S", "14PT Uncoated", "Natural", "16PT C2S", "Kraft", "Linen", "Pearl Metallic", "خامة فاخرة حسب العينة"], group: "الخامة" },
    { key: "printing", label: "مناطق الطباعة", type: "select", options: ["الخارج فقط", "الخارج + الداخل", "وجهين بدون طي"], group: "الطباعة" },
    { key: "finish", label: "التشطيب", type: "select", options: ["بدون", "Matte", "Aqueous", "Spot UV", "Velvet / Soft-touch", "Raised Foil", "Foil specialty حسب المورد"], group: "التشطيب" },
    { key: "foil", label: "لون الفويل — إن اختير", type: "select", options: ["غير مطبق", "Gold", "Silver", "Holographic", "لون/نظام خاص"], group: "التشطيب" },
    { key: "score", label: "الطي", type: "select", options: ["بدون طي", "Score + Fold in half"], group: "التجهيز" },
    { key: "envelope", label: "المظروف", type: "select", options: ["بدون", "مظروف أبيض", "Natural/Kraft", "Pearl/Specialty", "مطبوعة ومخصصة — خدمة مظاريف"], group: "الملحقات" },
    quoteQty("بطاقة")
  ],

  "wall-calendars": [
    { key: "size", label: "المقاس المغلق", type: "select", options: ["11 × 8.5 بوصة", "8.5 × 5.5 بوصة", "12 × 9 بوصة", "12 × 12 بوصة", "6 × 6 بوصة", "مقاس مخصص"], group: "المقاس" },
    { key: "months", label: "عدد الشهور/المحتوى", type: "select", options: ["12 شهر", "13 شهر", "18 شهر", "محتوى مخصص"], group: "المحتوى" },
    { key: "binding", label: "التجليد", type: "select", options: ["Saddle Stitch", "Spiral", "Wire-O"], group: "التجليد" },
    { key: "paper", label: "ورق الصفحات", type: "select", options: ["Gloss", "Matte", "Uncoated", "يحدد حسب الاستخدام"], group: "الخامة" },
    { key: "cover", label: "الغلاف", type: "select", options: ["Self cover", "غلاف أثقل", "بدون غلاف مستقل"], group: "الخامة" },
    quoteQty("تقويم")
  ],

  "desk-calendars": [
    { key: "size", label: "المقاس", type: "select", options: ["10 × 4.5 بوصة", "8.5 × 5.5 بوصة", "مقاس مخصص"], group: "المقاس" },
    { key: "months", label: "عدد الشهور/الأوراق", type: "select", options: ["12 شهر", "13 شهر", "محتوى مخصص"], group: "المحتوى" },
    { key: "binding", label: "التجليد", type: "select", options: ["Wire-O", "Spiral", "Saddle Stitch", "Perfect Bound — حسب التصميم"], group: "التجليد" },
    { key: "paper", label: "خامة الصفحات", type: "select", options: ["Gloss", "Matte", "Uncoated", "خامة خاصة"], group: "الخامة" },
    { key: "stand", label: "قاعدة/حامل", type: "select", options: ["قاعدة كرتونية مدمجة", "قاعدة/ستاند خاص", "يحدد مع رواج"], group: "البنية" },
    quoteQty("تقويم")
  ],

  notepads: [
    { key: "size", label: "مقاس الورقة", type: "select", options: ["4.25 × 5.5 بوصة", "4 × 6 بوصة", "5.5 × 8.5 بوصة", "8.5 × 11 بوصة", "A5", "A4", "مقاس مخصص"], group: "المقاس" },
    { key: "sheets", label: "عدد الأوراق في الباد", type: "select", options: ["25", "50", "100", "عدد مخصص"], group: "المحتوى" },
    { key: "paper", label: "نوع الورق", type: "select", options: ["Uncoated مناسب للكتابة", "Gloss paper", "ورق خاص للكتابة"], group: "الخامة" },
    { key: "printing", label: "الطباعة", type: "select", options: ["وجه واحد", "وجهين"], group: "الطباعة" },
    { key: "glue", label: "جهة اللصق", type: "select", options: ["أعلى", "يسار", "يمين", "أسفل"], group: "التجميع" },
    { key: "backing", label: "ظهر الباد", type: "select", options: ["Cardboard backing", "بدون ظهر", "ظهر مخصص"], group: "التجميع" },
    { key: "drill", label: "تخريم", type: "select", options: ["بدون", "فتحة واحدة", "3 فتحات"], group: "التجهيز" },
    { key: "pads", label: "عدد البادات", type: "number", placeholder: "مثال: 100", unit: "باد", group: "الكمية" }
  ],

  notebooks: [
    { key: "size", label: "مقاس الدفتر", type: "select", options: ["A6", "A5", "A4", "5.5 × 8.5 بوصة", "8.5 × 11 بوصة", "مقاس مخصص"], group: "المقاس" },
    { key: "inside_pattern", label: "نمط الصفحات", type: "select", options: ["Blank", "Ruled / مسطر", "Graph / مربعات", "Custom printed pages"], group: "المحتوى" },
    { key: "sheets", label: "عدد الأوراق", type: "select", options: ["25", "50", "100", "عدد مخصص"], group: "المحتوى" },
    { key: "inside_paper", label: "ورق الداخل", type: "select", options: ["Uncoated مناسب للكتابة", "ورق مخصص حسب الاستخدام"], group: "الخامة" },
    { key: "cover", label: "الغلاف", type: "select", options: ["14PT Cardstock", "18PT Cardstock", "غلاف مطبوع + Lamination", "غلاف مخصص"], group: "الخامة" },
    { key: "binding", label: "التجليد", type: "select", options: ["Wire-O", "Spiral", "تجليد آخر حسب التصميم"], group: "التجليد" },
    { key: "wire_color", label: "لون السلك", type: "select", options: ["أسود", "أبيض", "لون آخر حسب المورد"], group: "التجليد" },
    quoteQty("دفتر")
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


  "roll-labels": [
    { key: "application_surface", label: "سطح التطبيق", type: "select", options: ["زجاج", "PET", "HDPE / LDPE", "PP", "كرتون / كرتون مموج", "معدن", "سطح آخر"], group: "الاستخدام", helpText: "نوع السطح يؤثر مباشرة في اختيار اللاصق وقوة التثبيت." },
    { key: "conditions", label: "ظروف الاستخدام", type: "select", options: ["داخلي وجاف", "رطوبة / تكاثف", "تبريد", "تجميد", "زيوت أو مواد كيميائية", "استخدام خارجي", "عبوة قابلة للعصر"], group: "الاستخدام" },
    { key: "size", label: "مقاس الليبل", type: "text", placeholder: "العرض × الارتفاع بالملم", group: "المقاس" },
    { key: "shape", label: "الشكل", type: "select", options: ["مستطيل", "مربع", "دائري", "بيضاوي", "قص مخصص"], group: "القص" },
    { key: "face_material", label: "مادة الوجه", type: "select", options: ["ورق أبيض مطفي", "ورق أبيض لامع", "ورق محبب / فاخر", "ورق معدني", "BOPP أبيض", "BOPP شفاف", "BOPP فضي / كروم", "MDO قابل للعصر", "فيلم هولوغرافي", "أحتاج توصية رواج"], group: "الخامة" },
    { key: "adhesive", label: "نوع اللاصق", type: "select", options: ["دائم", "قابل للإزالة", "للتبريد / درجات منخفضة", "للتجميد", "Wash-off للعبوات القابلة لإعادة الاستخدام", "لاصق متخصص — يحدد بعد معرفة السطح"], group: "اللاصق", helpText: "الاختيار النهائي يعتمد على السطح ودرجة حرارة التطبيق والخدمة والرطوبة." },
    { key: "white_ink", label: "طباعة أبيض تحتي", type: "select", options: ["غير مطلوبة", "مطلوبة على الخامة الشفافة / المعدنية", "يحدد بعد مراجعة التصميم"], group: "الطباعة" },
    { key: "finish", label: "الحماية السطحية", type: "select", options: ["بدون", "ورنيش مطفي", "ورنيش لامع", "لامينيشن مطفي", "لامينيشن لامع", "قابل للطباعة Thermal Transfer"], group: "التشطيب" },
    { key: "liner", label: "بطانة الرول Liner", type: "select", options: ["ورق", "PET للتطبيق الآلي السريع", "يحدد مع مورد رواج"], group: "التجهيز" },
    { key: "unwind", label: "اتجاه فك الرول", type: "select", options: ["غير مهم", "من أعلى", "من أسفل", "من اليمين", "من اليسار", "يحدد حسب ماكينة التطبيق"], group: "التجهيز" },
    quoteQty("ليبل")
  ],

  "sheet-labels": [
    { key: "application_surface", label: "سطح التطبيق", type: "select", options: ["ورق / كرتون", "زجاج", "PET", "HDPE / LDPE", "PP", "معدن", "سطح آخر"], group: "الاستخدام" },
    { key: "size", label: "مقاس الليبل", type: "text", placeholder: "العرض × الارتفاع بالملم", group: "المقاس" },
    { key: "shape", label: "الشكل", type: "select", options: ["مستطيل", "مربع", "دائري", "بيضاوي", "قص مخصص"], group: "القص" },
    { key: "face_material", label: "مادة الوجه", type: "select", options: ["ورق مطفي", "ورق لامع", "ورق معاد التدوير", "ورق محبب", "BOPP أبيض", "BOPP شفاف", "فيلم متين مقاوم للماء", "خامة خاصة"], group: "الخامة" },
    { key: "adhesive", label: "اللاصق", type: "select", options: ["دائم", "قابل للإزالة", "متخصص للرطوبة/البرودة", "أحتاج توصية رواج"], group: "اللاصق" },
    { key: "finish", label: "التشطيب", type: "select", options: ["بدون", "ورنيش مطفي", "ورنيش لامع", "لامينيشن مطفي", "لامينيشن لامع"], group: "التشطيب" },
    quoteQty("ليبل")
  ],

  "folding-carton": [
    { key: "length", label: "الطول الداخلي", type: "number", placeholder: "مثال: 120", unit: "مم", group: "المقاس" },
    { key: "width", label: "العرض الداخلي", type: "number", placeholder: "مثال: 60", unit: "مم", group: "المقاس" },
    { key: "depth", label: "العمق الداخلي", type: "number", placeholder: "مثال: 35", unit: "مم", group: "المقاس" },
    { key: "style", label: "بنية العلبة", type: "select", options: ["Straight Tuck End", "Reverse Tuck End", "Tuck End Auto Bottom", "Snap Lock Bottom", "Sleeve", "Pillow Box", "Tray / Lid", "بنية مخصصة"], group: "البنية" },
    { key: "board", label: "نوع الكرتون", type: "select", options: ["SBS / SBB أبيض مصمت", "FBB كرتون علب متعدد الطبقات", "Kraft / Uncoated", "خامة خاصة حسب المنتج"], group: "الخامة", helpText: "يحدد النوع والسماكة وفق وزن المنتج، الطباعة، الطي والتشطيبات المطلوبة." },
    { key: "print_process", label: "تقنية الطباعة", type: "select", options: ["Offset", "Digital", "UV", "تحدد وفق الكمية والخامة"], group: "الطباعة" },
    { key: "print_sides", label: "مناطق الطباعة", type: "select", options: ["الخارج فقط", "الخارج + الداخل", "مواضع محددة"], group: "الطباعة" },
    { key: "surface_finish", label: "التشطيب السطحي", type: "select", options: ["بدون", "Varnish", "Aqueous Coating", "UV Coating", "Spot UV", "Lamination", "Soft Touch"], group: "التشطيب" },
    { key: "special_finish", label: "تشطيب بنيوي/فاخر", type: "select", options: ["بدون", "Hot Foil", "Cold Foil", "Emboss", "Deboss", "Window Patching", "أكثر من تشطيب — يراجع مع رواج"], group: "التشطيب" },
    { key: "insert", label: "إدخالات داخلية", type: "select", options: ["بدون", "Paperboard Insert", "Corrugated Insert", "Divider", "Molded Pulp / Insert متخصص"], group: "الملحقات" },
    quoteQty("علبة")
  ],

  "corrugated-box": [
    { key: "length", label: "الطول الداخلي", type: "number", placeholder: "مثال: 400", unit: "مم", group: "المقاس" },
    { key: "width", label: "العرض الداخلي", type: "number", placeholder: "مثال: 300", unit: "مم", group: "المقاس" },
    { key: "height", label: "الارتفاع الداخلي", type: "number", placeholder: "مثال: 250", unit: "مم", group: "المقاس" },
    { key: "style", label: "نمط الصندوق", type: "select", options: ["RSC / FEFCO 0201", "Slotted Box — نمط آخر", "Die-cut Box", "Tray / Folder", "Telescopic Box", "FEFCO code محدد", "يحتاج تصميم هندسي"], group: "البنية", helpText: "FEFCO هو نظام دولي لترميز تصاميم التغليف المموج." },
    { key: "wall", label: "تركيب اللوح", type: "select", options: ["Single Wall", "Double Wall", "Triple Wall", "يحدد هندسيًا حسب الحمولة"], group: "الخامة" },
    { key: "flute", label: "نوع الفلوت", type: "select", options: ["A", "B", "C", "E", "F / G / N Microflute", "تركيبة فلوت مزدوجة", "يحدد بعد معرفة الحمل والاستخدام"], group: "الخامة" },
    { key: "liner", label: "نوع اللينر", type: "select", options: ["Kraftliner", "Testliner", "White top / Printable liner حسب المورد", "يحدد وفق الطباعة والقوة المطلوبة"], group: "الخامة" },
    { key: "print", label: "الطباعة", type: "select", options: ["بدون طباعة", "Flexographic", "Digital direct print", "تحدد حسب الجودة والكمية"], group: "الطباعة" },
    { key: "joint", label: "وصلة المصنع", type: "select", options: ["Glued", "Stitched", "Taped", "حسب FEFCO style"], group: "التجميع" },
    { key: "features", label: "خصائص إضافية", type: "select", options: ["بدون", "مقبض/فتحات Die-cut", "Perforation", "Tear tape", "Display feature", "بنية مخصصة"], group: "التجهيز" },
    { key: "product_weight", label: "وزن المنتج داخل الكرتون", type: "number", placeholder: "الوزن التقريبي", unit: "كجم", group: "الاستخدام" },
    { key: "use", label: "الاستخدام", type: "select", options: ["شحن ونقل", "تخزين", "تجارة إلكترونية", "عرض Retail", "منتج ثقيل / صناعي", "استخدام آخر"], group: "الاستخدام" },
    quoteQty("كرتون")
  ],

  banner: [
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 3", unit: "م", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 1", unit: "م", group: "المقاس" },
    { key: "environment", label: "مكان الاستخدام", type: "select", options: ["داخلي", "خارجي قصير المدة", "خارجي طويل المدة", "واجهة/سور", "فعالية أو معرض"], group: "الاستخدام" },
    { key: "banner_type", label: "نوع خامة البنر", type: "select", options: ["PVC Banner Frontlit", "Blockout Banner للطباعة على وجهين/حجب الضوء", "أحتاج توصية رواج"], group: "الخامة" },
    { key: "sides", label: "أوجه الطباعة", type: "select", options: ["وجه واحد", "وجهان — بخامة مناسبة"], group: "الطباعة" },
    { key: "edge_finish", label: "تجهيز الحواف", type: "select", options: ["قص فقط", "لحام/ثني الحواف", "حواف مقواة حسب طريقة التعليق"], group: "التشطيب" },
    { key: "mounting", label: "طريقة التعليق", type: "select", options: ["بدون تجهيز", "عيون معدنية Grommets", "Pole Pockets / جيوب أعمدة", "حبال/ملحقات حسب الموقع", "يحدد بعد معاينة الموقع"], group: "التركيب" },
    { key: "install", label: "التركيب", type: "select", options: ["طباعة فقط", "طباعة + تركيب"], group: "التركيب" },
    quoteQty("قطعة")
  ],
  flex: [
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 4", unit: "م", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 1.2", unit: "م", group: "المقاس" },
    { key: "application", label: "الاستخدام", type: "select", options: ["وجه Lightbox مضيء", "واجهة مضيئة كبيرة", "استبدال وجه لوحة قائمة", "مشروع جديد كامل"], group: "الاستخدام" },
    { key: "face_material", label: "نوع الوجه المضيء", type: "select", options: ["Backlit Flexible Face / فلكس مضيء", "أحتاج توصية رواج حسب حجم اللوحة"], group: "الخامة" },
    { key: "box_status", label: "حالة صندوق الإضاءة", type: "select", options: ["موجود — طباعة وتجهيز الوجه فقط", "موجود ويحتاج صيانة/تعديل", "غير موجود — تنفيذ كامل"], group: "البنية" },
    { key: "lighting", label: "الإضاءة", type: "select", options: ["LED ضمن تنفيذ رواج", "الإضاءة موجودة", "يحتاج تقييم فني"], group: "الإضاءة" },
    { key: "sides", label: "عدد الأوجه", type: "select", options: ["وجه واحد", "وجهين"], group: "البنية" },
    { key: "install", label: "التركيب", type: "select", options: ["توريد الوجه فقط", "توريد + تركيب", "تنفيذ كامل للصندوق والوجه والإضاءة"], group: "التركيب" },
    { key: "location", label: "موقع التركيب", type: "text", placeholder: "المدينة / المنطقة / وصف الارتفاع والوصول", group: "التركيب" }
  ],

  "mesh-banner": [
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 10", unit: "م", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 6", unit: "م", group: "المقاس" },
    { key: "application", label: "الاستخدام", type: "select", options: ["سقالة/مبنى", "سور خارجي", "فعالية", "منطقة معرضة للرياح", "استخدام آخر"], group: "الاستخدام" },
    { key: "material", label: "الخامة", type: "select", options: ["Mesh Banner مثقب", "أحتاج توصية رواج حسب الموقع والرياح"], group: "الخامة" },
    { key: "edge_finish", label: "تجهيز الحواف", type: "select", options: ["حواف مقواة", "لحام/ثني الحواف", "يحدد وفق نظام التثبيت"], group: "التشطيب" },
    { key: "mounting", label: "التثبيت", type: "select", options: ["عيون معدنية", "نظام شد", "تركيب موقعي كامل", "يحدد بعد المعاينة"], group: "التركيب" },
    { key: "location", label: "موقع التركيب والارتفاع", type: "text", placeholder: "وصف الموقع وارتفاع التركيب التقريبي", group: "التركيب" },
    quoteQty("قطعة")
  ],

  "vinyl-graphics": [
    { key: "surface", label: "سطح التطبيق", type: "select", options: ["زجاج", "معدن مطلي", "ACP / ألواح واجهات", "PVC صلب", "أكريليك", "سطح أملس آخر", "غير متأكد"], group: "الاستخدام" },
    { key: "environment", label: "مكان الاستخدام", type: "select", options: ["داخلي", "خارجي قصير المدة", "خارجي متوسط/طويل المدة"], group: "الاستخدام" },
    { key: "size", label: "المقاس/المساحة", type: "text", placeholder: "العرض × الارتفاع أو المساحة التقريبية", group: "المقاس" },
    { key: "film", label: "فئة الفيلم", type: "select", options: ["PVC أبيض", "PVC شفاف", "Removable قابل للإزالة", "Polymeric طويل المدة", "Cast للأسطح المعقدة", "أحتاج توصية رواج"], group: "الخامة", helpText: "اختيار الفيلم يعتمد على عمر الاستخدام وشكل السطح وظروفه." },
    { key: "adhesive", label: "اللاصق", type: "select", options: ["دائم", "قابل للإزالة", "يحدد حسب السطح والاستخدام"], group: "اللاصق" },
    { key: "laminate", label: "الحماية", type: "select", options: ["بدون", "Gloss Overlaminate", "Matte Overlaminate", "Optically Clear عند الحاجة", "يحدد حسب العمر والاستخدام"], group: "التشطيب" },
    { key: "cut", label: "القص", type: "select", options: ["قص مستطيل", "Contour Cut", "Plotter Cut بدون طباعة", "تقسيم بانلات كبيرة"], group: "القص" },
    { key: "install", label: "التركيب", type: "select", options: ["توريد فقط", "توريد + تركيب"], group: "التركيب" },
    quoteQty("قطعة/مشروع")
  ],

  "window-graphics": [
    { key: "window_type", label: "نوع التطبيق", type: "select", options: ["فينيل مطبوع كامل", "Perforated One-Way Vision", "شفاف بطباعة White Ink", "Frosted / Etched-look للخصوصية", "قص فينيل بدون طباعة"], group: "الاستخدام" },
    { key: "mount_side", label: "جهة التطبيق", type: "select", options: ["خارج الزجاج", "داخل الزجاج", "يحدد حسب الخامة والموقع"], group: "التركيب" },
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 1.5", unit: "م", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 2.2", unit: "م", group: "المقاس" },
    { key: "perforation", label: "نسبة الرؤية — للـOne-Way Vision", type: "select", options: ["غير مطبق", "50/50", "65/35", "يحدد حسب الخصوصية والإضاءة"], group: "الخامة" },
    { key: "adhesion", label: "مدة الاستخدام", type: "select", options: ["حملة مؤقتة / قابل للإزالة", "متوسط المدة", "تركيب طويل المدة"], group: "اللاصق" },
    { key: "laminate", label: "الحماية", type: "select", options: ["بدون", "Optically Clear compatible overlaminate", "حماية أخرى حسب الفيلم"], group: "التشطيب", helpText: "الـperforated window film قد يحتاج لامينيت شفاف بصريًا متوافقًا حسب النظام والتعرض." },
    { key: "install", label: "التركيب", type: "select", options: ["توريد فقط", "توريد + تركيب"], group: "التركيب" },
    { key: "location", label: "الموقع", type: "text", placeholder: "نوع المبنى/المحل والمدينة والارتفاع إن وجد", group: "التركيب" }
  ],

  "wall-graphics": [
    { key: "wall_surface", label: "سطح الجدار", type: "select", options: ["دهان أملس", "دهان خشن/محبب", "جبس/دراي وول مطلي", "زجاج/لوح أملس", "سطح آخر"], group: "الاستخدام" },
    { key: "paint_age", label: "حالة الدهان", type: "select", options: ["جاف ومستقر", "حديث — يحتاج انتظار/تقييم", "قديم أو متقشر", "غير متأكد"], group: "الاستخدام" },
    { key: "width", label: "عرض المنطقة", type: "number", placeholder: "مثال: 5", unit: "م", group: "المقاس" },
    { key: "height", label: "ارتفاع المنطقة", type: "number", placeholder: "مثال: 2.8", unit: "م", group: "المقاس" },
    { key: "duration", label: "مدة الاستخدام", type: "select", options: ["فعالية مؤقتة", "متوسط المدة", "ديكور طويل المدة"], group: "الاستخدام" },
    { key: "film", label: "نوع المادة", type: "select", options: ["Wall Vinyl مخصص", "Removable Wall Film", "Textured Wall Film", "Wallpaper / Wallcovering", "أحتاج معاينة وتوصية"], group: "الخامة" },
    { key: "finish", label: "المظهر", type: "select", options: ["مطفي", "لامع", "Textured", "يحدد حسب المادة"], group: "التشطيب" },
    { key: "install", label: "التركيب", type: "select", options: ["توريد فقط", "توريد + تركيب ومعاينة السطح"], group: "التركيب" }
  ],

  "floor-graphics": [
    { key: "surface", label: "نوع الأرضية", type: "select", options: ["سيراميك/بورسلان أملس", "رخام/جرانيت أملس", "Vinyl flooring", "خرسانة ملساء", "أرضية أخرى"], group: "الاستخدام" },
    { key: "location", label: "مكان الاستخدام", type: "select", options: ["داخلي Retail", "معرض/فعالية", "ممر توجيهي", "سلامة وتحذير", "خارجي — يحتاج نظام مخصص"], group: "الاستخدام" },
    { key: "duration", label: "المدة", type: "select", options: ["قصيرة", "متوسطة", "يحدد حسب نظام المادة"], group: "الاستخدام" },
    { key: "size", label: "المقاس", type: "text", placeholder: "العرض × الارتفاع أو شكل القص", group: "المقاس" },
    { key: "system", label: "نظام الجرافيك", type: "select", options: ["Direct-print anti-slip film", "Printed film + approved anti-slip overlaminate", "يحدد بعد معرفة الأرضية والمدة"], group: "الخامة", helpText: "مقاومة الانزلاق متطلب وظيفي أساسي في جرافيك الأرضيات." },
    { key: "cut", label: "القص", type: "select", options: ["مستطيل", "دائري", "Contour Cut", "مجموعة مسارات/علامات"], group: "القص" },
    { key: "install", label: "التركيب", type: "select", options: ["توريد فقط", "توريد + تركيب"], group: "التركيب" },
    quoteQty("قطعة/مجموعة")
  ],

  "vehicle-wrap": [
    { key: "vehicle", label: "نوع المركبة", type: "select", options: ["سيارة سيدان", "SUV", "بيك أب", "فان", "حافلة", "شاحنة", "أسطول مركبات", "نوع آخر"], group: "الاستخدام" },
    { key: "coverage", label: "نطاق التغطية", type: "select", options: ["شعارات وكتابات فقط", "Partial Wrap", "Full Wrap", "Fleet Graphics", "يحدد بعد معاينة المركبة"], group: "الاستخدام" },
    { key: "surface_shape", label: "تعقيد السطح", type: "select", options: ["ألواح مسطحة/منحنيات بسيطة", "منحنيات مركبة", "تجاويف وقنوات عميقة", "غير متأكد"], group: "الاستخدام" },
    { key: "film", label: "فئة فيلم الراب", type: "select", options: ["Cast vehicle wrap film", "Polymeric film للأسطح الأبسط", "Reflective / specialty film", "أحتاج توصية رواج"], group: "الخامة" },
    { key: "laminate", label: "Overlaminate", type: "select", options: ["Gloss", "Matte", "Luster / Satin", "Optically Clear", "يحدد مع نظام الفيلم"], group: "التشطيب", helpText: "يجب اختيار الفيلم والـoverlaminate كنظام متوافق حسب الاستخدام والأسطح." },
    { key: "windows", label: "زجاج المركبة", type: "select", options: ["لا يشمل الزجاج", "Perforated window graphics حيث يسمح التطبيق", "يحدد بعد المعاينة والاشتراطات المحلية"], group: "النوافذ" },
    { key: "artwork", label: "التصميم", type: "select", options: ["ملف جاهز", "أحتاج تصميم الراب من رواج", "تكييف هوية موجودة على المركبة"], group: "التصميم" },
    { key: "installation", label: "التنفيذ", type: "select", options: ["طباعة فقط", "طباعة + تركيب احترافي"], group: "التركيب" },
    { key: "vehicles_qty", label: "عدد المركبات", type: "number", placeholder: "مثال: 1", unit: "مركبة", group: "الكمية" }
  ],
  stickers: [
    { key: "application", label: "نوع الاستخدام", type: "select", options: ["ملصق دعائي", "ملصق منتج", "زجاج/نافذة", "تغليف", "استخدام خارجي", "استخدام آخر"], group: "الاستخدام" },
    { key: "surface", label: "سطح التطبيق", type: "select", options: ["ورق/كرتون", "زجاج", "معدن", "PET", "HDPE/LDPE", "PP", "سطح آخر"], group: "الاستخدام" },
    { key: "size", label: "المقاس", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    { key: "material", label: "الخامة", type: "select", options: ["ورق مطفي", "ورق لامع", "BOPP / PP أبيض", "BOPP / PP شفاف", "فينيل أبيض", "فينيل شفاف", "معدني / فضي", "أحتاج توصية رواج"], group: "الخامة" },
    { key: "adhesive", label: "اللاصق", type: "select", options: ["دائم", "قابل للإزالة", "متخصص للبرودة/الرطوبة", "يحدد بعد معرفة السطح"], group: "اللاصق" },
    { key: "cut", label: "القص", type: "select", options: ["مستقيم", "Die-cut / كونتور", "Kiss-cut على شيت", "قص مخصص"], group: "القص" },
    { key: "finish", label: "الحماية", type: "select", options: ["بدون", "ورنيش", "لامينيشن مطفي", "لامينيشن لامع"], group: "التشطيب" },
    quoteQty("ملصق")
  ],
  lightbox: [
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 2", unit: "م", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 0.8", unit: "م", group: "المقاس" },
    { key: "sides", label: "عدد الأوجه", type: "select", options: ["وجه واحد", "وجهين"], group: "البنية" },
    { key: "face", label: "نوع الوجه", type: "select", options: ["Acrylic / أكريليك", "Flexible backlit face", "Textile face للاستخدام الداخلي", "يحدد حسب الحجم والتصميم"], group: "الخامة" },
    { key: "lighting", label: "نظام الإضاءة", type: "select", options: ["LED داخلي", "Edge-lit حسب التصميم", "تحديث إضاءة صندوق قائم", "يحدد هندسيًا"], group: "الإضاءة" },
    { key: "location_type", label: "مكان الاستخدام", type: "select", options: ["داخلي", "خارجي"], group: "الاستخدام" },
    { key: "existing", label: "حالة اللوحة", type: "select", options: ["مشروع جديد", "تغيير وجه فقط", "تحديث الإضاءة", "صيانة وإعادة تأهيل"], group: "البنية" },
    { key: "install", label: "الخدمة", type: "select", options: ["تصنيع فقط", "تصنيع + تركيب", "معاينة ثم عرض سعر"], group: "التركيب" },
    { key: "location", label: "موقع التركيب والارتفاع", type: "text", placeholder: "المدينة / المنطقة / الارتفاع التقريبي", group: "التركيب" }
  ],
  letters: [
    { key: "letter_type", label: "نوع الحروف", type: "select", options: ["Face-lit Channel Letters", "Halo-lit / Reverse Channel", "Face + Halo", "Block Acrylic illuminated", "يحدد حسب التصميم"], group: "البنية" },
    { key: "face_material", label: "وجه الحرف", type: "select", options: ["Acrylic sign-grade", "معدن/وجه غير شفاف حسب التصميم", "خامة خاصة"], group: "الخامة" },
    { key: "return_material", label: "جوانب/جسم الحرف", type: "select", options: ["ألمنيوم", "ستانلس ستيل", "مادة أخرى حسب التصميم"], group: "الخامة" },
    { key: "height", label: "ارتفاع الحرف التقريبي", type: "number", placeholder: "مثال: 40", unit: "سم", group: "المقاس" },
    { key: "depth", label: "عمق الحرف", type: "select", options: ["يحدد هندسيًا حسب الحجم والإضاءة", "لدي عمق محدد — أذكره في الملاحظات"], group: "المقاس" },
    { key: "lighting", label: "الإضاءة", type: "select", options: ["LED أبيض", "LED لون محدد", "RGB / RGBW", "بدون إضاءة"], group: "الإضاءة" },
    { key: "mounting", label: "طريقة التثبيت", type: "select", options: ["على RaceWay", "تثبيت مباشر على الواجهة", "على خلفية/لوح حامل", "يحدد بعد المعاينة"], group: "التركيب" },
    { key: "location_type", label: "الاستخدام", type: "select", options: ["داخلي", "خارجي"], group: "الاستخدام" },
    { key: "install", label: "الخدمة", type: "select", options: ["تصنيع فقط", "تصنيع + تركيب", "تنفيذ كامل مع التمديدات المطلوبة"], group: "التركيب" },
    { key: "location", label: "الموقع والارتفاع", type: "text", placeholder: "وصف موقع التركيب", group: "التركيب" }
  ],

  "dimensional-letters": [
    { key: "material", label: "الخامة", type: "select", options: ["Acrylic", "Stainless Steel", "Aluminum", "PVC / Foam PVC", "Wood / MDF داخلي", "مزيج خامات", "أحتاج اقتراح رواج"], group: "الخامة" },
    { key: "height", label: "ارتفاع الحروف", type: "number", placeholder: "مثال: 25", unit: "سم", group: "المقاس" },
    { key: "thickness", label: "السماكة/البروز", type: "text", placeholder: "إن كانت محددة، أو اتركها لتوصية رواج", group: "المقاس" },
    { key: "finish", label: "المظهر", type: "select", options: ["لون مصمت", "Metallic / Brushed", "Mirror", "Painted", "Natural material finish", "حسب العينة"], group: "التشطيب" },
    { key: "backing", label: "الخلفية", type: "select", options: ["بدون خلفية", "لوح حامل", "ACP background", "Acrylic background", "حسب التصميم"], group: "البنية" },
    { key: "install", label: "التركيب", type: "select", options: ["تصنيع فقط", "تصنيع + تركيب"], group: "التركيب" },
    { key: "location", label: "مكان الاستخدام", type: "select", options: ["داخلي", "خارجي"], group: "الاستخدام" }
  ],

  "acrylic-sign": [
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 60", unit: "سم", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 40", unit: "سم", group: "المقاس" },
    { key: "acrylic_type", label: "نوع الأكريليك", type: "select", options: ["Clear", "White / Opal", "Colored", "LED sign-grade", "Light-guiding edge-lit", "يحدد حسب التطبيق"], group: "الخامة" },
    { key: "fabrication", label: "التصنيع", type: "select", options: ["Flat panel", "Cut / Routed shape", "Formed / Thermoformed", "Layered acrylic", "Edge-lit panel"], group: "البنية" },
    { key: "graphics", label: "الجرافيك", type: "select", options: ["UV print", "Vinyl graphics", "Back-painted", "Engraved / etched look", "مزيج تقنيات"], group: "الطباعة" },
    { key: "lighting", label: "الإضاءة", type: "select", options: ["بدون", "Backlit", "Edge-lit", "LED ضمن التركيب"], group: "الإضاءة" },
    { key: "mounting", label: "التثبيت", type: "select", options: ["Standoffs", "Direct mount", "Frame", "Suspended", "يحدد بعد التصميم"], group: "التركيب" },
    { key: "location", label: "مكان الاستخدام", type: "select", options: ["داخلي", "خارجي"], group: "الاستخدام" },
    quoteQty("لوحة")
  ],
  facade: [
    { key: "width", label: "عرض الواجهة التقريبي", type: "number", placeholder: "مثال: 8", unit: "م", group: "المقاس" },
    { key: "height", label: "ارتفاع الواجهة التقريبي", type: "number", placeholder: "مثال: 4", unit: "م", group: "المقاس" },
    { key: "scope", label: "نطاق المشروع", type: "select", options: ["كسوة ACP فقط", "ACP + حروف/لوحة", "واجهة تجارية متكاملة", "إعادة تأهيل واجهة قائمة"], group: "البنية" },
    { key: "panel_system", label: "نظام الكسوة", type: "select", options: ["ألواح ACP / Aluminum Composite Panels", "ألواح مطوية Routed & Folded Trays", "مزيج خامات", "يحدد بعد التصميم والمعاينة"], group: "الخامة", helpText: "التفاصيل الإنشائية والسماكات والتثبيت تُحدد هندسيًا بعد معاينة الموقع." },
    { key: "finish", label: "مظهر السطح", type: "select", options: ["Solid color", "Metallic", "Anodized look", "Natural / textured look", "لون/عينة مخصصة"], group: "التشطيب" },
    { key: "design", label: "التصميم", type: "select", options: ["لدي مخططات نهائية", "أحتاج تصميم واجهة من رواج", "أحتاج تصور 3D + مخططات تنفيذ"], group: "التصميم" },
    { key: "signage", label: "الهوية على الواجهة", type: "select", options: ["بدون", "Channel Letters", "حروف غير مضيئة", "Lightbox", "مزيج لوحات وحروف"], group: "اللوحات" },
    { key: "existing_surface", label: "حالة الواجهة الحالية", type: "select", options: ["مبنى جديد", "واجهة قائمة تحتاج تغطية", "تحتاج إزالة/معالجة قبل التنفيذ", "غير متأكد"], group: "الاستخدام" },
    { key: "access", label: "الوصول لموقع العمل", type: "select", options: ["أرضي/سهل", "ارتفاع متوسط", "ارتفاع كبير أو يحتاج معدات رفع", "يحدد بالمعاينة"], group: "التركيب" },
    { key: "location", label: "موقع المشروع", type: "text", placeholder: "المدينة / المنطقة / وصف الموقع", group: "التركيب" }
  ],
  "textile-sublimation": [
    { key: "product", label: "نوع المنتج", type: "select", options: ["قماش رول", "راية / علم", "Sportswear / Jersey", "تيشيرت بوليستر", "Soft Signage", "قطعة مخيطة جاهزة", "منتج نسيجي آخر"], group: "المنتج" },
    { key: "fabric", label: "تركيب القماش", type: "select", options: ["100% Polyester", "خليط عالي البوليستر", "Polyester pretreated للطباعة المباشرة", "غير معروف — أحتاج تقييم رواج"], group: "الخامة", helpText: "السوبليميشن التقليدي يثبت الصبغة داخل ألياف البوليستر، لذلك نسبة البوليستر وتجهيز القماش عاملان أساسيان." },
    { key: "base_color", label: "لون الخامة", type: "select", options: ["أبيض", "فاتح", "ملون — يحتاج مراجعة التصميم", "داكن — غالبًا نحتاج تقنية بديلة"], group: "الخامة" },
    { key: "process", label: "مسار التنفيذ", type: "select", options: ["Transfer Sublimation", "Direct Sublimation على قماش مهيأ", "تحدده رواج حسب المنتج"], group: "الطباعة" },
    { key: "print_area", label: "مساحة/مقاس الطباعة", type: "text", placeholder: "مثال: كامل القماش أو 30 × 40 سم", group: "المقاس" },
    { key: "artwork", label: "حالة التصميم", type: "select", options: ["ملف جاهز للطباعة", "لدي تصميم يحتاج تجهيز", "أحتاج التصميم من رواج"], group: "التصميم" },
    { key: "finishing", label: "التجهيز النهائي", type: "select", options: ["طباعة فقط", "قص", "قص + خياطة", "منتج جاهز كامل", "حسب نوع المشروع"], group: "التجهيز" },
    quoteQty("قطعة/متر")
  ],

  "sublimation-hard-goods": [
    { key: "product", label: "المنتج", type: "select", options: ["Mug / كوب", "Tumbler / Drinkware", "لوح ألمنيوم مطلي", "لوح صور", "Coaster", "Phone Case", "قطعة سيراميك مطلية", "منتج Sublimation blank آخر"], group: "المنتج" },
    { key: "blank", label: "حالة المنتج الخام", type: "select", options: ["سأوفر Blank مخصص للسوبليميشن", "أحتاج رواج توفر المنتج", "غير متأكد من وجود Poly-coating"], group: "الخامة", helpText: "السوبليميشن التقليدي يحتاج سطحًا بوليمريًا/Poly-coated أو مادة مصممة أصلًا للسوبليميشن." },
    { key: "shape", label: "شكل السطح", type: "select", options: ["مسطح", "أسطواني", "مخروطي/متدرج", "شكل خاص"], group: "البنية" },
    { key: "print_scope", label: "نطاق الطباعة", type: "select", options: ["وجه واحد", "وجهين", "Wrap حول المنتج", "موضع مخصص"], group: "الطباعة" },
    { key: "size", label: "مساحة الطباعة", type: "text", placeholder: "الأبعاد التقريبية أو اسم المقاس القياسي", group: "المقاس" },
    { key: "personalization", label: "بيانات متغيرة", type: "select", options: ["لا", "أسماء", "أرقام", "أسماء + أرقام", "بيانات أخرى من ملف"], group: "التخصيص" },
    { key: "artwork", label: "التصميم", type: "select", options: ["جاهز", "يحتاج تهيئة", "أحتاج تصميم رواج"], group: "التصميم" },
    quoteQty("قطعة")
  ],

  "dtf-apparel": [
    { key: "garment", label: "نوع القطعة", type: "select", options: ["T-shirt", "Polo", "Hoodie / Sweatshirt", "Uniform", "Sportswear", "Tote Bag", "Cap / منتج يحتاج تقييم", "قطعة نسيجية أخرى"], group: "الملابس" },
    { key: "fabric", label: "الخامة", type: "select", options: ["Cotton", "Polyester", "Cotton/Poly Blend", "Synthetic blend", "خامة أخرى — تحتاج اختبار"], group: "الخامة", helpText: "DTF يعمل على نطاق واسع من الأقمشة، لكن توافق الفيلم/المسحوق والقماش يجب تقييمه قبل الإنتاج النهائي." },
    { key: "garment_color", label: "لون القطعة", type: "select", options: ["فاتح", "داكن", "ألوان متعددة"], group: "الخامة" },
    { key: "placement", label: "موضع الطباعة", type: "select", options: ["صدر أمامي", "ظهر", "يسار الصدر", "كم", "أكثر من موضع", "موضع مخصص"], group: "الموضع" },
    { key: "print_size", label: "مقاس الطباعة", type: "text", placeholder: "مثال: 28 × 35 سم", group: "المقاس" },
    { key: "garment_supply", label: "توفير الملابس", type: "select", options: ["رواج توفر الملابس", "العميل يوفر الملابس", "أحتاج عرضًا للخيارين"], group: "التجهيز" },
    { key: "personalization", label: "تخصيص أسماء/أرقام", type: "select", options: ["غير مطلوب", "أسماء", "أرقام", "أسماء + أرقام", "بيانات متغيرة أخرى"], group: "التخصيص" },
    { key: "artwork", label: "الملف", type: "select", options: ["PNG/Artwork جاهز بخلفية شفافة", "ملف يحتاج تجهيز", "أحتاج تصميم رواج"], group: "التصميم" },
    quoteQty("قطعة")
  ],

  "dtg-apparel": [
    { key: "garment", label: "نوع القطعة", type: "select", options: ["T-shirt", "Sweatshirt", "Hoodie", "Tote/قطعة قطنية", "قطعة أخرى تحتاج تقييم"], group: "الملابس" },
    { key: "fabric", label: "الخامة", type: "select", options: ["100% Cotton", "Cotton-rich blend", "Cotton/Poly blend", "Linen/Rayon — حسب الجهاز", "خامة أخرى — تحتاج اختبار"], group: "الخامة", helpText: "DTG يكون عادة أفضل على القطن والخامات الغنية بالقطن؛ الخلطات والخامات الأخرى تعتمد على نظام الطباعة والحبر." },
    { key: "garment_color", label: "لون القطعة", type: "select", options: ["أبيض/فاتح", "داكن — يحتاج White Ink/pretreatment", "ألوان متعددة"], group: "الخامة" },
    { key: "placement", label: "موضع الطباعة", type: "select", options: ["أمام", "خلف", "يسار الصدر", "موضع مخصص"], group: "الموضع" },
    { key: "print_size", label: "مقاس الطباعة", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    { key: "garment_supply", label: "توفير الملابس", type: "select", options: ["رواج توفر الملابس", "العميل يوفر الملابس", "أحتاج عرضًا للخيارين"], group: "التجهيز" },
    { key: "artwork", label: "التصميم", type: "select", options: ["جاهز", "يحتاج تجهيز", "أحتاج تصميم رواج"], group: "التصميم" },
    quoteQty("قطعة")
  ],

  "screen-print-apparel": [
    { key: "garment", label: "نوع القطعة", type: "select", options: ["T-shirt", "Polo", "Hoodie", "Uniform", "Sportswear", "Tote Bag", "Fabric panel", "قطعة أخرى"], group: "الملابس" },
    { key: "fabric", label: "الخامة", type: "select", options: ["Cotton", "Polyester", "Cotton/Poly Blend", "Nylon", "Stretch/Performance fabric", "خامة أخرى"], group: "الخامة", helpText: "نوع الخامة يؤثر على نظام الحبر ومقاومة Dye Migration، خصوصًا في البوليستر والملابس الرياضية." },
    { key: "garment_color", label: "لون القطعة", type: "select", options: ["فاتح", "داكن", "ألوان متعددة"], group: "الخامة" },
    { key: "colors", label: "عدد ألوان التصميم", type: "select", options: ["لون واحد", "لونان", "3-4 ألوان", "5-8 ألوان", "Process/تفاصيل معقدة — تحتاج مراجعة"], group: "الألوان" },
    { key: "ink_system", label: "نظام الحبر المطلوب", type: "select", options: ["تحدده رواج حسب الخامة والاستخدام", "Plastisol", "Water-based / Soft Hand", "High-solids water-based", "Low-bleed للبوليستر", "Special Effect"], group: "الطباعة" },
    { key: "effect", label: "تأثير خاص — إن وجد", type: "select", options: ["بدون", "Metallic", "Reflective", "Glow in the dark", "Glitter/Shimmer", "Suede/Texture", "تأثير خاص آخر"], group: "التشطيب" },
    { key: "placement", label: "موضع الطباعة", type: "select", options: ["أمام", "خلف", "يسار الصدر", "كم", "أكثر من موضع"], group: "الموضع" },
    { key: "print_size", label: "مقاس الطباعة", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    { key: "garment_supply", label: "توفير الملابس", type: "select", options: ["رواج توفر الملابس", "العميل يوفر الملابس", "الخياران"], group: "التجهيز" },
    quoteQty("قطعة")
  ],

  embroidery: [
    { key: "item", label: "القطعة", type: "select", options: ["Polo / Shirt", "Jacket", "Cap", "Uniform", "Towel", "Bag", "Patch", "Performance wear", "قطعة أخرى"], group: "الملابس" },
    { key: "fabric", label: "نوع القماش", type: "select", options: ["Woven ثابت", "Knit / Jersey", "Stretch / Performance", "Fleece", "Towel / Napped fabric", "Cap structure", "Denim/Canvas", "غير معروف"], group: "الخامة", helpText: "نوع القماش يغيّر إعدادات digitizing والـunderlay والـbacking؛ هذه التفاصيل يحددها الفني ولا يطلب من العميل ضبطها." },
    { key: "placement", label: "موضع التطريز", type: "select", options: ["يسار الصدر", "يمين الصدر", "منتصف الصدر", "ظهر", "كم", "مقدمة الكاب", "جانب/خلف الكاب", "موضع مخصص"], group: "الموضع" },
    { key: "size", label: "حجم التطريز", type: "text", placeholder: "مثال: 8 سم عرض", group: "المقاس" },
    { key: "thread_colors", label: "عدد ألوان الخيط", type: "select", options: ["لون واحد", "2-3 ألوان", "4-6 ألوان", "أكثر", "مطابقة ألوان الهوية حسب المتاح"], group: "الخيوط" },
    { key: "design_status", label: "ملف التطريز", type: "select", options: ["لدي ملف ماكينة جاهز", "لدي شعار Vector/PDF فقط", "لدي صورة تحتاج Digitizing", "أحتاج تصميم الشعار"], group: "التصميم" },
    { key: "garment_supply", label: "توفير القطع", type: "select", options: ["رواج توفرها", "العميل يوفرها", "أحتاج عرضًا للخيارين"], group: "التجهيز" },
    { key: "personalization", label: "أسماء فردية", type: "select", options: ["لا", "نعم — أسماء متغيرة", "أسماء + أرقام/مسميات"], group: "التخصيص" },
    quoteQty("قطعة")
  ],

  "heat-transfer-vinyl": [
    { key: "garment", label: "نوع القطعة", type: "select", options: ["T-shirt", "Polo", "Hoodie", "Sportswear", "Uniform", "Bag", "Leather item", "قطعة أخرى"], group: "الملابس" },
    { key: "fabric", label: "الخامة", type: "select", options: ["Cotton", "Poly/Cotton blend", "100% Polyester", "Leather — حسب مادة HTV", "خامة أخرى تحتاج اختبار"], group: "الخامة", helpText: "درجة الحرارة والضغط وملاءمة HTV تختلف باختلاف المادة، لذلك يتم اختيار الفيلم بعد معرفة القماش." },
    { key: "finish", label: "نوع HTV / المظهر", type: "select", options: ["Standard", "Metallic", "Sparkle/Glitter", "Flock / مخملي", "Glow", "Specialty — يحدد حسب الطلب"], group: "الخامة" },
    { key: "colors", label: "ألوان التصميم", type: "select", options: ["لون واحد", "لونان", "عدة ألوان/طبقات", "أحتاج تقنية أخرى للألوان الكاملة"], group: "الألوان" },
    { key: "placement", label: "موضع النقل", type: "select", options: ["أمام", "خلف", "يسار الصدر", "كم", "أكثر من موضع"], group: "الموضع" },
    { key: "size", label: "مقاس التصميم", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    quoteQty("قطعة")
  ],

  "uv-direct-object": [
    { key: "object", label: "نوع المنتج", type: "select", options: ["هدية دعائية", "Phone case", "Bottle / Drinkware", "Pen/Pencil", "Award", "Acrylic block", "Panel/Plate", "Industrial part", "Leather good", "منتج آخر"], group: "المنتج" },
    { key: "material", label: "مادة السطح", type: "select", options: ["Plastic", "Acrylic", "Metal / Brushed Metal", "Wood", "Paper/Cardboard", "Ceramic", "Glass", "Leather / Synthetic Leather", "مادة أخرى"], group: "الخامة", helpText: "قابلية الالتصاق والـprimer تختلف حسب مادة السطح؛ رواج تختبر التوافق قبل الإنتاج الكمي." },
    { key: "shape", label: "شكل المنتج", type: "select", options: ["مسطح", "قطعة سميكة/3D", "أسطواني", "مخروطي/منحني", "غير منتظم"], group: "البنية" },
    { key: "dimensions", label: "أبعاد المنتج", type: "text", placeholder: "الطول × العرض × الارتفاع", group: "المقاس" },
    { key: "surface_color", label: "لون/شفافية السطح", type: "select", options: ["أبيض/فاتح", "داكن", "شفاف", "معدني/عاكس", "ألوان متعددة"], group: "الخامة" },
    { key: "white", label: "أبيض تحتي", type: "select", options: ["غير مطلوب", "مطلوب على الشفاف/الداكن", "تحدده رواج بعد التصميم"], group: "الطباعة" },
    { key: "effect", label: "تأثير UV خاص", type: "select", options: ["بدون", "Gloss spot", "Texture / Raised effect", "Primer عند الحاجة للالتصاق", "مزيج تأثيرات"], group: "التشطيب" },
    { key: "personalization", label: "تخصيص متغير", type: "select", options: ["لا", "أسماء", "أرقام", "QR/Serial", "بيانات متغيرة من ملف"], group: "التخصيص" },
    quoteQty("قطعة")
  ],

  "uv-dtf": [
    { key: "object", label: "المنتج المستهدف", type: "select", options: ["Bottle / Tumbler", "Mug", "Phone case", "Gift item", "Container", "Leather good", "منتج ذو شكل غير منتظم", "منتج آخر"], group: "المنتج" },
    { key: "surface", label: "مادة السطح", type: "select", options: ["Glass", "Plastic", "Acrylic", "Metal", "Ceramic", "Leather / Synthetic Leather", "سطح آخر"], group: "الخامة" },
    { key: "shape", label: "شكل السطح", type: "select", options: ["مسطح", "منحني", "أسطواني", "زوايا/حواف ممتدة", "غير منتظم"], group: "البنية", helpText: "UV DTF مفيد خصوصًا للأجسام التي يصعب أو يستحيل وضعها تحت طابعة UV مباشرة." },
    { key: "size", label: "مقاس النقل", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    { key: "surface_condition", label: "حالة السطح", type: "select", options: ["أملس ونظيف", "محبب/خشن", "مطلي", "غير معروف — يحتاج اختبار"], group: "الاستخدام" },
    { key: "personalization", label: "تخصيص متغير", type: "select", options: ["لا", "أسماء", "أرقام", "بيانات أخرى"], group: "التخصيص" },
    quoteQty("قطعة")
  ],

  "laser-cutting": [
    { key: "material", label: "الخامة", type: "select", options: ["Acrylic / PMMA", "MDF", "Plywood / Wood", "Paper / Cardboard", "Leather", "Textile", "Laserable plastic", "Metal — يحتاج تحديد نوع الليزر والسماكة", "خامة أخرى"], group: "الخامة" },
    { key: "thickness", label: "السماكة", type: "text", placeholder: "مثال: 3 مم", group: "الخامة" },
    { key: "sheet_size", label: "مقاس الخام/القطعة", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    { key: "operation", label: "العملية", type: "select", options: ["قص فقط", "قص + حفر/نقش", "قص + ترقيم/علامات", "مشروع تجميع متعدد القطع"], group: "المعالجة" },
    { key: "edge_quality", label: "متطلب الحافة", type: "select", options: ["قياسي", "حافة أكريليك عالية الوضوح حسب الخامة", "سيتم صنفرة/دهان لاحقًا", "متطلب خاص"], group: "التشطيب" },
    { key: "file", label: "ملف القص", type: "select", options: ["Vector جاهز", "PDF/AI يحتاج مراجعة", "صورة/رسم يحتاج تحويل", "أحتاج تصميم رواج"], group: "التصميم" },
    quoteQty("قطعة")
  ],

  "laser-engraving": [
    { key: "item", label: "المنتج", type: "select", options: ["لوحة/Tag", "هدية", "Award", "Nameplate", "Part/Component", "قطعة مخصصة"], group: "المنتج" },
    { key: "material", label: "الخامة", type: "select", options: ["Anodized Aluminum", "Coated/Painted Metal", "Stainless Steel — Fiber/Marking", "Acrylic / PMMA", "Wood / Veneer / MDF", "Glass", "Leather", "Laserable plastic", "خامة أخرى"], group: "الخامة", helpText: "تقنية الليزر تختلف حسب الخامة؛ بعض المعادن تحتاج Fiber Laser أو marking system بدل CO₂." },
    { key: "operation", label: "نوع التنفيذ", type: "select", options: ["Engraving / حفر", "Marking / وسم", "Etching effect", "حفر + قص", "يحدد بعد فحص الخامة"], group: "المعالجة" },
    { key: "area", label: "مساحة الحفر", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    { key: "personalization", label: "بيانات متغيرة", type: "select", options: ["لا", "أسماء", "أرقام تسلسلية", "QR/Barcode", "أسماء + أرقام", "بيانات من ملف"], group: "التخصيص" },
    { key: "file", label: "الملف", type: "select", options: ["Vector جاهز", "PDF/Logo يحتاج مراجعة", "أحتاج تصميم/تجهيز رواج"], group: "التصميم" },
    quoteQty("قطعة")
  ],

  "rigid-uv-print": [
    { key: "substrate", label: "الخامة الصلبة", type: "select", options: ["Acrylic", "Aluminum Composite / ACM", "PVC Foam Board", "Corrugated Plastic", "Corrugated Cardboard", "Pasteboard / Display Board", "PET / Synthetic Sheet", "خامة أخرى تحتاج اختبار"], group: "الخامة" },
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 100", unit: "سم", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 70", unit: "سم", group: "المقاس" },
    { key: "thickness", label: "السماكة", type: "text", placeholder: "إن كانت معروفة", group: "الخامة" },
    { key: "application", label: "الاستخدام", type: "select", options: ["لوحة داخلية", "لوحة خارجية", "POP / POS", "معرض أو كشك", "ديكور داخلي", "قطعة تصنيع مخصصة"], group: "الاستخدام" },
    { key: "print", label: "الطباعة", type: "select", options: ["Direct UV Color", "Color + White Ink", "White + Color + Effects حسب الجهاز", "تحدده رواج حسب الخامة"], group: "الطباعة" },
    { key: "fabrication", label: "التصنيع بعد الطباعة", type: "select", options: ["قص مستقيم", "Contour / Digital Cut", "CNC Routing", "Drilling", "بدون تصنيع إضافي", "مزيج عمليات"], group: "المعالجة" },
    { key: "mounting", label: "التجهيز/التركيب", type: "select", options: ["توريد اللوح فقط", "Standoffs", "تعليق", "Frame", "تثبيت موقعي", "يحدد حسب المشروع"], group: "التركيب" },
    quoteQty("لوحة")
  ],

  "pvc-foam-board": [
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 100", unit: "سم", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 70", unit: "سم", group: "المقاس" },
    { key: "thickness", label: "السماكة", type: "select", options: ["1 مم", "2 مم", "3 مم", "6 مم", "10 مم", "12.7 مم", "سماكة أخرى حسب المورد"], group: "الخامة", helpText: "السماكات المتاحة تختلف حسب المورد؛ الاستخدام الخارجي أو البنيوي يحتاج مراجعة السماكة والتثبيت." },
    { key: "color", label: "لون اللوح", type: "select", options: ["أبيض", "أسود", "لون جاهز حسب المورد", "طباعة تغطي السطح"], group: "الخامة" },
    { key: "application", label: "الاستخدام", type: "select", options: ["Interior Sign", "Exterior Sign", "POP/POS Display", "Exhibit/Kiosk", "Window Display", "Dimensional element"], group: "الاستخدام" },
    { key: "graphics", label: "الجرافيك", type: "select", options: ["Direct Digital/UV Print", "Vinyl Applied", "Screen Print", "Paint + Graphics", "بدون طباعة — تصنيع فقط"], group: "الطباعة" },
    { key: "fabrication", label: "التصنيع", type: "select", options: ["قص مستقيم", "Knife Cut للسماكات المناسبة", "CNC Route", "Die-cut للسماكات المناسبة", "Heat Form / تشكيل", "مزيج عمليات"], group: "المعالجة" },
    { key: "install", label: "التركيب", type: "select", options: ["توريد فقط", "توريد + تركيب", "جزء من مشروع عرض/ديكور"], group: "التركيب" },
    quoteQty("لوحة")
  ],

  "acm-printed-panel": [
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 120", unit: "سم", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 240", unit: "سم", group: "المقاس" },
    { key: "thickness", label: "سماكة اللوح", type: "select", options: ["2 مم", "3 مم", "4 مم", "سماكة/نظام آخر"], group: "الخامة" },
    { key: "surface", label: "سطح اللوح", type: "select", options: ["أبيض للطباعة", "أسود", "Metallic / Brushed specialty", "لون جاهز", "يحدد حسب المورد"], group: "الخامة" },
    { key: "application", label: "الاستخدام", type: "select", options: ["Signage داخلي", "Signage خارجي", "POP / Display", "Exhibit/Kiosk", "لوحة ديكور", "جزء مُشكّل ثلاثي الأبعاد"], group: "الاستخدام" },
    { key: "graphics", label: "طريقة الجرافيك", type: "select", options: ["Direct Digital/UV Print", "Screen Print", "Applied Vinyl", "Painted + Graphics"], group: "الطباعة" },
    { key: "fabrication", label: "التصنيع", type: "select", options: ["قص فقط", "CNC Routing", "Route & Return / ثني", "Curved/Formed", "Drilling", "مزيج عمليات"], group: "المعالجة" },
    { key: "install", label: "التنفيذ", type: "select", options: ["توريد لوحة", "توريد + تجهيز تثبيت", "تركيب كامل"], group: "التركيب" },
    quoteQty("لوحة")
  ],

  "coroplast-sign": [
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 60", unit: "سم", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 40", unit: "سم", group: "المقاس" },
    { key: "thickness", label: "السماكة", type: "text", placeholder: "إن كانت محددة أو اتركها لرواج", group: "الخامة" },
    { key: "application", label: "الاستخدام", type: "select", options: ["Yard / Site Sign", "Real Estate", "Construction", "POP / Retail", "Trade Show", "Directional", "Promotion"], group: "الاستخدام" },
    { key: "printing", label: "الطباعة", type: "select", options: ["وجه واحد", "وجهين", "Direct Digital", "Screen Print — للكميات المناسبة"], group: "الطباعة" },
    { key: "shape", label: "القص", type: "select", options: ["مستطيل", "Die-cut Shape", "Custom Contour", "Routing / Fabrication"], group: "القص" },
    { key: "hardware", label: "ملحقات العرض", type: "select", options: ["بدون", "Stake / حامل أرضي", "تعليق", "Frame", "يحدد حسب الموقع"], group: "الملحقات" },
    quoteQty("لوحة")
  ],

  "foam-board-display": [
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 70", unit: "سم", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 100", unit: "سم", group: "المقاس" },
    { key: "thickness", label: "السماكة", type: "select", options: ["3/16 بوصة", "3/8 بوصة", "1/2 بوصة", "3/4 بوصة", "1 بوصة", "1.5 بوصة", "2 بوصة", "3 بوصة", "حسب الخامة المتاحة"], group: "الخامة" },
    { key: "application", label: "الاستخدام", type: "select", options: ["Interior Sign", "POP/POS", "Exhibit/Kiosk", "Window Display", "Mounted Print", "Dimensional Display"], group: "الاستخدام" },
    { key: "graphics", label: "الجرافيك", type: "select", options: ["Direct Digital Print", "Mounted Print", "Screen Print", "Painted/Graphic combination"], group: "الطباعة" },
    { key: "fabrication", label: "التصنيع", type: "select", options: ["قص", "Routing", "Shape Cut", "Layered dimensional build"], group: "المعالجة" },
    { key: "mounting", label: "العرض/التثبيت", type: "select", options: ["بدون", "Wall Mount", "Easel/Stand", "Hanging", "ضمن كشك/معرض"], group: "التركيب" },
    quoteQty("لوحة")
  ],

  "retractable-banner-stand": [
    { key: "hardware", label: "الهاردوير", type: "select", options: ["جهاز جديد + جرافيك", "استبدال جرافيك لجهاز موجود", "أحتاج اختيار نظام كامل"], group: "أنظمة العرض" },
    { key: "class", label: "فئة الجهاز", type: "select", options: ["Economy", "Mid-range", "Premium", "Interchangeable cassette", "يحدد حسب تكرار الاستخدام"], group: "أنظمة العرض" },
    { key: "width", label: "عرض الجرافيك", type: "text", placeholder: "أدخل المقاس إن كان الجهاز موجودًا", group: "المقاس" },
    { key: "height", label: "ارتفاع الجرافيك", type: "text", placeholder: "أدخل المقاس أو اتركه لاختيار النظام", group: "المقاس" },
    { key: "graphic_material", label: "خامة الجرافيك", type: "select", options: ["Vinyl", "Fabric", "Polyester", "PVC-free media", "تحدد حسب نظام الجهاز"], group: "الخامة" },
    { key: "usage", label: "الاستخدام", type: "select", options: ["معرض", "مؤتمر", "متجر", "مكتب/لوبي", "تنقل متكرر لفريق المبيعات"], group: "الاستخدام" },
    { key: "carry", label: "حقيبة نقل", type: "select", options: ["مطلوبة", "غير مطلوبة", "ضمن الجهاز حسب المورد"], group: "الملحقات" },
    quoteQty("ستاند")
  ],

  "tension-fabric-banner": [
    { key: "system", label: "نظام القماش", type: "select", options: ["Pillowcase Tension Fabric", "SEG / Push-fit Fabric", "Fabric Banner Stand", "يحدد حسب شكل العرض"], group: "أنظمة العرض" },
    { key: "width", label: "العرض", type: "text", placeholder: "مثال: 90 سم", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "text", placeholder: "مثال: 220 سم", group: "المقاس" },
    { key: "sides", label: "عدد الأوجه", type: "select", options: ["وجه واحد", "وجهين"], group: "البنية" },
    { key: "graphic", label: "نوع الجرافيك", type: "select", options: ["Stretch Dye-sublimated Fabric", "SEG Fabric", "يحدد حسب الإطار"], group: "الخامة" },
    { key: "hardware", label: "الإطار", type: "select", options: ["إطار جديد", "استبدال الجرافيك فقط", "أحتاج نظام كامل"], group: "أنظمة العرض" },
    { key: "usage", label: "الاستخدام", type: "select", options: ["Retail", "Corporate", "Event", "Trade Show"], group: "الاستخدام" },
    quoteQty("نظام")
  ],

  "pop-up-backwall": [
    { key: "width", label: "العرض التقريبي", type: "text", placeholder: "مثال: 3 متر", group: "المقاس" },
    { key: "shape", label: "شكل الباك وول", type: "select", options: ["Straight", "Curved", "Extra Tall", "Custom"], group: "البنية" },
    { key: "graphic_system", label: "نظام الجرافيك", type: "select", options: ["Tension Fabric", "Push-fit Fabric", "Panel Graphics", "Backlit Fabric", "يحدد حسب النظام"], group: "أنظمة العرض" },
    { key: "hardware", label: "الهاردوير", type: "select", options: ["جديد", "استبدال الجرافيك لجهاز موجود", "نظام كامل مع حقيبة نقل"], group: "أنظمة العرض" },
    { key: "accessories", label: "ملحقات", type: "select", options: ["بدون", "إضاءة", "Monitor Mount", "Counter", "رف بروشورات", "مزيج ملحقات"], group: "الملحقات" },
    quoteQty("نظام")
  ],

  "seg-fabric-frame": [
    { key: "mounting", label: "نوع الإطار", type: "select", options: ["Wall-mounted", "Freestanding", "Hanging", "Modular frame"], group: "أنظمة العرض" },
    { key: "width", label: "العرض", type: "text", placeholder: "المقاس المطلوب", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "text", placeholder: "المقاس المطلوب", group: "المقاس" },
    { key: "sides", label: "الأوجه", type: "select", options: ["وجه واحد", "وجهين"], group: "البنية" },
    { key: "graphic", label: "الجرافيك", type: "select", options: ["SEG Dye-sublimated Fabric", "استبدال جرافيك فقط", "إطار + جرافيك"], group: "الخامة" },
    { key: "lighting", label: "الإضاءة", type: "select", options: ["بدون إضاءة", "أحتاج Lightbox — استخدم نموذج SEG Lightbox"], group: "الإضاءة" },
    quoteQty("إطار")
  ],

  "seg-lightbox": [
    { key: "mounting", label: "نوع التركيب", type: "select", options: ["Freestanding", "Wall-mounted", "Hanging", "Modular Exhibit"], group: "أنظمة العرض" },
    { key: "width", label: "العرض", type: "text", placeholder: "المقاس المطلوب", group: "المقاس" },
    { key: "height", label: "الارتفاع", type: "text", placeholder: "المقاس المطلوب", group: "المقاس" },
    { key: "sides", label: "الأوجه", type: "select", options: ["وجه واحد", "وجهين"], group: "البنية" },
    { key: "graphic", label: "الجرافيك", type: "select", options: ["Backlit SEG Fabric", "استبدال الجرافيك فقط", "إطار + LED + جرافيك"], group: "الخامة" },
    { key: "usage", label: "الاستخدام", type: "select", options: ["Retail", "Showroom/Lobby", "Trade Show", "Pop-up Retail", "Gallery/Event"], group: "الاستخدام" },
    quoteQty("Lightbox")
  ],

  "table-cover": [
    { key: "table", label: "مقاس الطاولة", type: "select", options: ["4 ft", "6 ft", "8 ft", "Tall 4 ft Demo Table", "Round Table", "مقاس مخصص"], group: "المقاس" },
    { key: "style", label: "ستايل الغطاء", type: "select", options: ["Draped / Table Throw", "Fitted", "Stretch", "Convertible", "Outdoor fitted"], group: "البنية" },
    { key: "coverage", label: "التغطية", type: "select", options: ["4 جوانب", "3 جوانب مع فتح الخلف", "حسب نوع الغطاء"], group: "البنية" },
    { key: "fabric", label: "الخامة", type: "select", options: ["Washable Polyester Dye-sublimation", "Power Stretch Polyester", "Outdoor Canvas / Spill-resistant", "تحدد حسب النظام"], group: "الخامة" },
    { key: "carry", label: "حقيبة حمل", type: "select", options: ["بدون", "مطلوبة", "حسب المنتج"], group: "الملحقات" },
    quoteQty("غطاء")
  ],

  "trade-show-counter": [
    { key: "counter_type", label: "نوع الكاونتر", type: "select", options: ["Collapsible Fabric Counter", "SEG Counter", "Backlit Counter", "Reception Counter", "Custom Exhibit Counter"], group: "أنظمة العرض" },
    { key: "hardware", label: "الهاردوير", type: "select", options: ["جديد كامل", "استبدال الجرافيك فقط", "لدي هيكل يحتاج قياس"], group: "أنظمة العرض" },
    { key: "graphic", label: "الجرافيك", type: "select", options: ["Tension Fabric", "SEG Fabric", "Printed Panel", "Backlit Fabric"], group: "الخامة" },
    { key: "storage", label: "تخزين داخلي", type: "select", options: ["غير مطلوب", "رف داخلي", "مساحة تخزين مغلقة", "حسب النظام"], group: "الملحقات" },
    { key: "use", label: "الاستخدام", type: "select", options: ["Trade Show", "Event", "Reception", "Retail / Promotion"], group: "الاستخدام" },
    quoteQty("كاونتر")
  ],

  "event-tent": [
    { key: "size", label: "مقاس الخيمة", type: "text", placeholder: "مثال: 3 × 3 م", group: "المقاس" },
    { key: "hardware", label: "الهيكل", type: "select", options: ["هيكل جديد + طباعة", "استبدال Canopy فقط", "لدي هيكل يحتاج مطابقة"], group: "أنظمة العرض" },
    { key: "print_scope", label: "نطاق الطباعة", type: "select", options: ["السقف فقط", "السقف + Valances", "Full printed canopy", "Canopy + Walls"], group: "الطباعة" },
    { key: "walls", label: "الجدران", type: "select", options: ["بدون", "Half Wall", "Full Wall", "عدة جدران", "جدران مطبوعة كاملة"], group: "الملحقات" },
    { key: "use", label: "الاستخدام", type: "select", options: ["فعالية خارجية", "مهرجان", "رياضة", "ترويج ميداني", "سوق/بازار"], group: "الاستخدام" },
    { key: "anchoring", label: "التثبيت", type: "select", options: ["أرض ترابية", "سطح صلب", "يحدد حسب الموقع والرياح"], group: "التركيب" },
    quoteQty("خيمة")
  ],

  "event-flag": [
    { key: "shape", label: "شكل العلم", type: "select", options: ["Feather", "Straight", "Teardrop", "Edge", "Rectangle / Banner Flag"], group: "البنية" },
    { key: "size", label: "الحجم", type: "select", options: ["Small", "Medium", "Large", "Extra Large", "مقاس مخصص"], group: "المقاس" },
    { key: "sides", label: "الطباعة", type: "select", options: ["وجه واحد", "وجهين"], group: "الطباعة" },
    { key: "hardware", label: "العمود والهاردوير", type: "select", options: ["طقم كامل", "استبدال العلم فقط", "لدي عمود يحتاج مطابقة"], group: "أنظمة العرض" },
    { key: "base", label: "قاعدة التثبيت", type: "select", options: ["Ground Stake", "قاعدة لسطح صلب", "قاعدة موزونة/مائية", "يحدد حسب الموقع"], group: "التركيب" },
    { key: "use", label: "الاستخدام", type: "select", options: ["Outdoor Event", "Sports", "Festival", "Storefront", "Indoor Event"], group: "الاستخدام" },
    quoteQty("علم")
  ],

  "hanging-display": [
    { key: "shape", label: "الشكل", type: "select", options: ["Circle/Ring", "Square", "Rectangle", "Triangle", "Custom Fabric Structure"], group: "البنية" },
    { key: "dimensions", label: "الأبعاد", type: "text", placeholder: "العرض × الارتفاع أو القطر", group: "المقاس" },
    { key: "graphic", label: "نوع الجرافيك", type: "select", options: ["Pillowcase Tension Fabric", "SEG Fabric", "Hanging Banner", "Custom sewn fabric"], group: "الخامة" },
    { key: "hardware", label: "الهاردوير", type: "select", options: ["نظام كامل", "استبدال جرافيك", "تصنيع مخصص"], group: "أنظمة العرض" },
    { key: "rigging", label: "التعليق/Rigging", type: "select", options: ["الهاردوير فقط", "مع تجهيز نقاط التعليق", "يحتاج تنسيق مع موقع المعرض"], group: "التركيب" },
    { key: "venue", label: "مكان الاستخدام", type: "text", placeholder: "المعرض/القاعة وارتفاع التعليق إن كان معروفًا", group: "الاستخدام" },
    quoteQty("نظام")
  ],

  "modular-exhibit": [
    { key: "footprint", label: "مساحة البوث", type: "text", placeholder: "مثال: 3 × 3 م أو 6 × 3 م", group: "المقاس" },
    { key: "system", label: "نوع النظام", type: "select", options: ["Portable Modular", "Aluminum Extrusion + SEG", "Tension Fabric Structure", "Custom Modular Exhibit", "Rental/Reusable System"], group: "أنظمة العرض" },
    { key: "walls", label: "الجدران والجرافيك", type: "select", options: ["Backwall واحد", "Corner / L-shape", "عدة جدران", "Backlit SEG", "مزيج جرافيك"], group: "البنية" },
    { key: "counter", label: "كاونتر استقبال", type: "select", options: ["بدون", "Counter", "Backlit Counter", "Storage Counter"], group: "الملحقات" },
    { key: "av", label: "شاشات/AV", type: "select", options: ["بدون", "Monitor Mount", "عدة شاشات", "احتياج AV مخصص"], group: "الملحقات" },
    { key: "lighting", label: "الإضاءة", type: "select", options: ["إضاءة القاعة فقط", "Spotlights", "Integrated LED", "Backlit Graphics"], group: "الإضاءة" },
    { key: "storage", label: "التخزين", type: "select", options: ["غير مطلوب", "خزانة/مخزن صغير", "غرفة تخزين", "حسب التصميم"], group: "الملحقات" },
    { key: "service", label: "الخدمة المطلوبة", type: "select", options: ["توريد النظام والجرافيك", "تصميم + توريد", "تصميم + توريد + تركيب", "إدارة كاملة للبوث"], group: "التركيب" },
    { key: "venue", label: "المعرض والموقع", type: "text", placeholder: "اسم المعرض/القاعة/المدينة إن عُرف", group: "الاستخدام" }
  ],


  "reflective-sign": [
    { key: "purpose", label: "استخدام اللوحة", type: "select", options: ["إرشاد واتجاهات", "تحذير وسلامة", "مرور/طريق", "مواقف", "موقع عمل مؤقت", "لوحة معلومات عاكسة", "استخدام آخر يحتاج مراجعة"], group: "الاستخدام", required: true },
    { key: "authority", label: "الجهة أو المواصفة الحاكمة", type: "text", placeholder: "مثال: جهة طرق/بلدية/مواصفة مشروع — إن كانت معروفة", group: "الامتثال", helpText: "اختيار الخامة النهائي يخضع لمتطلبات الجهة والمواصفة المحلية، وليس لاسم تجاري فقط." },
    { key: "reflective_class", label: "فئة الانعكاس المطلوبة", type: "select", options: ["غير محددة — تحددها رواج بعد مراجعة المتطلبات", "RA1 / ASTM Type I عند سماح المواصفة", "RA2 / High Intensity Prismatic عند سماح المواصفة", "ASTM Type IX/XI أو فئة عالية الأداء حسب المواصفة", "فئة أخرى منصوص عليها في مستند المشروع"], group: "الامتثال", helpText: "الفئات ليست درجات تجميلية قابلة للاستبدال بحرية. يجب مطابقة متطلبات الجهة الحاكمة ونظام الخامة المعتمد." },
    { key: "standard_ref", label: "مرجع المواصفة/الكود", type: "text", placeholder: "رقم المواصفة أو بند العقد إن وجد", group: "الامتثال" },
    { key: "width", label: "العرض", type: "number", placeholder: "مثال: 60", unit: "سم", group: "المقاس", required: true },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "مثال: 90", unit: "سم", group: "المقاس", required: true },
    { key: "shape", label: "شكل اللوحة", type: "select", options: ["مستطيل/مربع", "دائري", "مثلث", "شكل قياسي حسب الجهة", "قص مخصص حسب المخطط"], group: "التصنيع" },
    { key: "substrate", label: "سطح اللوحة", type: "select", options: ["ألمنيوم/صاج حسب المواصفة", "لوحة معدنية قائمة تحتاج إعادة تجهيز", "الخامة محددة في مستند المشروع", "تحددها رواج بعد مراجعة الاستخدام"], group: "الخامة", helpText: "بعض الأفلام العاكسة مصممة لأسطح معدنية محددة؛ توافق السطح واللاصق يراجع كنظام واحد." },
    { key: "imaging", label: "تنفيذ الألوان والرموز", type: "select", options: ["تحددها رواج كنظام معتمد للخامة", "Screen print متوافق مع نظام الفيلم", "Digital print متوافق ومعتمد للخامة", "Cut/overlay film متوافق", "قص رموز/حروف من فيلم عاكس"], group: "الطباعة", helpText: "لا تُفترض صلاحية أي حبر أو طابعة للفيلم العاكس؛ طريقة التصوير تُراجع وفق نظام الشركة المصنعة والمواصفة." },
    { key: "mounting", label: "طريقة التركيب", type: "select", options: ["على عمود", "على جدار/واجهة", "على هيكل قائم", "لوحة مؤقتة/موقع عمل", "توريد فقط بدون تركيب", "تحتاج معاينة موقع"], group: "التركيب" },
    { key: "site", label: "بيانات الموقع", type: "text", placeholder: "الموقع، الارتفاع، عدد الأعمدة أو أي متطلبات تركيب معروفة", group: "التركيب" },
    quoteQty("لوحة")
  ],

  "traffic-regulatory-sign": [
    { key: "authority", label: "الجهة أو المواصفة الحاكمة", type: "text", placeholder: "الجهة/المشروع/المواصفة إن كانت معروفة", group: "الامتثال", required: true },
    { key: "purpose", label: "الغرض", type: "text", placeholder: "تنظيم/منع/إلزام", group: "الاستخدام", required: true },
    { key: "reflective_class", label: "فئة الانعكاس", type: "select", options: ["تحدد من المواصفة — لا اختيار افتراضي", "ASTM Type I / RA1 عند سماح المواصفة", "ASTM Type III/IV أو RA2 عند سماح المواصفة", "ASTM Type IX/XI أو RA3 عند اشتراطها", "فئة أخرى منصوص عليها بالمشروع"], group: "الامتثال", helpText: "فئة الانعكاس يحددها الكود أو الجهة الحاكمة. لا تستبدل الفئات ببعضها تلقائيًا." },
    { key: "standard_ref", label: "رقم المواصفة أو بند العقد", type: "text", placeholder: "إن وجد", group: "الامتثال" },
    { key: "dimensions", label: "المقاس/الكود", type: "text", placeholder: "المقاس أو رمز اللوحة القياسي", group: "المقاس", required: true },
    { key: "substrate", label: "سطح اللوحة", type: "select", options: ["معدن حسب المواصفة", "سطح قائم يحتاج إعادة تجهيز", "محدد بمستند المشروع", "تحدده رواج بعد المراجعة"], group: "الخامة" },
    { key: "imaging", label: "نظام تنفيذ الجرافيك", type: "select", options: ["نظام متوافق مع الفيلم تحدده رواج", "Digital print ضمن نظام مصنع معتمد", "Screen print ضمن نظام مصنع معتمد", "Cut/overlay film متوافق", "Electronic cut حسب النظام"], group: "الطباعة", helpText: "الطابعة والحبر والفيلم والـoverlay تُعامل كنظام متوافق؛ لا تُفترض صلاحية أي توليفة." },
    { key: "mounting", label: "التركيب", type: "select", options: ["عمود/أعمدة", "جدار/واجهة", "هيكل قائم", "توريد فقط", "تحتاج معاينة موقع"], group: "التركيب" },
    { key: "site", label: "بيانات الموقع", type: "text", placeholder: "الموقع والارتفاع وظروف التركيب إن عُرفت", group: "التركيب" },
    quoteQty("لوحة")
  ],

  "traffic-warning-sign": [
    { key: "authority", label: "الجهة أو المواصفة الحاكمة", type: "text", placeholder: "الجهة/المشروع/المواصفة إن كانت معروفة", group: "الامتثال", required: true },
    { key: "purpose", label: "الغرض", type: "text", placeholder: "تحذير من خطر أو تغير بالطريق", group: "الاستخدام", required: true },
    { key: "reflective_class", label: "فئة الانعكاس", type: "select", options: ["تحدد من المواصفة — لا اختيار افتراضي", "ASTM Type I / RA1 عند سماح المواصفة", "ASTM Type III/IV أو RA2 عند سماح المواصفة", "ASTM Type IX/XI أو RA3 عند اشتراطها", "فئة أخرى منصوص عليها بالمشروع"], group: "الامتثال", helpText: "فئة الانعكاس يحددها الكود أو الجهة الحاكمة. لا تستبدل الفئات ببعضها تلقائيًا." },
    { key: "standard_ref", label: "رقم المواصفة أو بند العقد", type: "text", placeholder: "إن وجد", group: "الامتثال" },
    { key: "dimensions", label: "المقاس/الكود", type: "text", placeholder: "المقاس أو رمز اللوحة القياسي", group: "المقاس", required: true },
    { key: "substrate", label: "سطح اللوحة", type: "select", options: ["معدن حسب المواصفة", "سطح قائم يحتاج إعادة تجهيز", "محدد بمستند المشروع", "تحدده رواج بعد المراجعة"], group: "الخامة" },
    { key: "imaging", label: "نظام تنفيذ الجرافيك", type: "select", options: ["نظام متوافق مع الفيلم تحدده رواج", "Digital print ضمن نظام مصنع معتمد", "Screen print ضمن نظام مصنع معتمد", "Cut/overlay film متوافق", "Electronic cut حسب النظام"], group: "الطباعة", helpText: "الطابعة والحبر والفيلم والـoverlay تُعامل كنظام متوافق؛ لا تُفترض صلاحية أي توليفة." },
    { key: "mounting", label: "التركيب", type: "select", options: ["عمود/أعمدة", "جدار/واجهة", "هيكل قائم", "توريد فقط", "تحتاج معاينة موقع"], group: "التركيب" },
    { key: "site", label: "بيانات الموقع", type: "text", placeholder: "الموقع والارتفاع وظروف التركيب إن عُرفت", group: "التركيب" },
    quoteQty("لوحة")
  ],

  "traffic-guide-sign": [
    { key: "authority", label: "الجهة أو المواصفة الحاكمة", type: "text", placeholder: "الجهة/المشروع/المواصفة إن كانت معروفة", group: "الامتثال", required: true },
    { key: "purpose", label: "الغرض", type: "text", placeholder: "وجهات ومسارات ومعلومات طريق", group: "الاستخدام", required: true },
    { key: "reflective_class", label: "فئة الانعكاس", type: "select", options: ["تحدد من المواصفة — لا اختيار افتراضي", "ASTM Type I / RA1 عند سماح المواصفة", "ASTM Type III/IV أو RA2 عند سماح المواصفة", "ASTM Type IX/XI أو RA3 عند اشتراطها", "فئة أخرى منصوص عليها بالمشروع"], group: "الامتثال", helpText: "فئة الانعكاس يحددها الكود أو الجهة الحاكمة. لا تستبدل الفئات ببعضها تلقائيًا." },
    { key: "standard_ref", label: "رقم المواصفة أو بند العقد", type: "text", placeholder: "إن وجد", group: "الامتثال" },
    { key: "dimensions", label: "المقاس/الكود", type: "text", placeholder: "المقاس أو رمز اللوحة القياسي", group: "المقاس", required: true },
    { key: "substrate", label: "سطح اللوحة", type: "select", options: ["معدن حسب المواصفة", "سطح قائم يحتاج إعادة تجهيز", "محدد بمستند المشروع", "تحدده رواج بعد المراجعة"], group: "الخامة" },
    { key: "imaging", label: "نظام تنفيذ الجرافيك", type: "select", options: ["نظام متوافق مع الفيلم تحدده رواج", "Digital print ضمن نظام مصنع معتمد", "Screen print ضمن نظام مصنع معتمد", "Cut/overlay film متوافق", "Electronic cut حسب النظام"], group: "الطباعة", helpText: "الطابعة والحبر والفيلم والـoverlay تُعامل كنظام متوافق؛ لا تُفترض صلاحية أي توليفة." },
    { key: "mounting", label: "التركيب", type: "select", options: ["عمود/أعمدة", "جدار/واجهة", "هيكل قائم", "توريد فقط", "تحتاج معاينة موقع"], group: "التركيب" },
    { key: "site", label: "بيانات الموقع", type: "text", placeholder: "الموقع والارتفاع وظروف التركيب إن عُرفت", group: "التركيب" },
    quoteQty("لوحة")
  ],

  "parking-reflective-sign": [
    { key: "authority", label: "الجهة أو المواصفة الحاكمة", type: "text", placeholder: "الجهة/المشروع/المواصفة إن كانت معروفة", group: "الامتثال", required: true },
    { key: "purpose", label: "الغرض", type: "text", placeholder: "تنظيم وإرشاد المواقف", group: "الاستخدام", required: true },
    { key: "reflective_class", label: "فئة الانعكاس", type: "select", options: ["تحدد من المواصفة — لا اختيار افتراضي", "ASTM Type I / RA1 عند سماح المواصفة", "ASTM Type III/IV أو RA2 عند سماح المواصفة", "ASTM Type IX/XI أو RA3 عند اشتراطها", "فئة أخرى منصوص عليها بالمشروع"], group: "الامتثال", helpText: "فئة الانعكاس يحددها الكود أو الجهة الحاكمة. لا تستبدل الفئات ببعضها تلقائيًا." },
    { key: "standard_ref", label: "رقم المواصفة أو بند العقد", type: "text", placeholder: "إن وجد", group: "الامتثال" },
    { key: "dimensions", label: "المقاس/الكود", type: "text", placeholder: "المقاس أو رمز اللوحة القياسي", group: "المقاس", required: true },
    { key: "substrate", label: "سطح اللوحة", type: "select", options: ["معدن حسب المواصفة", "سطح قائم يحتاج إعادة تجهيز", "محدد بمستند المشروع", "تحدده رواج بعد المراجعة"], group: "الخامة" },
    { key: "imaging", label: "نظام تنفيذ الجرافيك", type: "select", options: ["نظام متوافق مع الفيلم تحدده رواج", "Digital print ضمن نظام مصنع معتمد", "Screen print ضمن نظام مصنع معتمد", "Cut/overlay film متوافق", "Electronic cut حسب النظام"], group: "الطباعة", helpText: "الطابعة والحبر والفيلم والـoverlay تُعامل كنظام متوافق؛ لا تُفترض صلاحية أي توليفة." },
    { key: "mounting", label: "التركيب", type: "select", options: ["عمود/أعمدة", "جدار/واجهة", "هيكل قائم", "توريد فقط", "تحتاج معاينة موقع"], group: "التركيب" },
    { key: "site", label: "بيانات الموقع", type: "text", placeholder: "الموقع والارتفاع وظروف التركيب إن عُرفت", group: "التركيب" },
    quoteQty("لوحة")
  ],

  "work-zone-reflective-sign": [
    { key: "authority", label: "الجهة أو المواصفة الحاكمة", type: "text", placeholder: "الجهة/المشروع/المواصفة إن كانت معروفة", group: "الامتثال", required: true },
    { key: "purpose", label: "الغرض", type: "text", placeholder: "تحذير وتوجيه مؤقت لمناطق العمل", group: "الاستخدام", required: true },
    { key: "reflective_class", label: "فئة الانعكاس", type: "select", options: ["تحدد من المواصفة — لا اختيار افتراضي", "ASTM Type I / RA1 عند سماح المواصفة", "ASTM Type III/IV أو RA2 عند سماح المواصفة", "ASTM Type IX/XI أو RA3 عند اشتراطها", "فئة أخرى منصوص عليها بالمشروع"], group: "الامتثال", helpText: "فئة الانعكاس يحددها الكود أو الجهة الحاكمة. لا تستبدل الفئات ببعضها تلقائيًا." },
    { key: "standard_ref", label: "رقم المواصفة أو بند العقد", type: "text", placeholder: "إن وجد", group: "الامتثال" },
    { key: "dimensions", label: "المقاس/الكود", type: "text", placeholder: "المقاس أو رمز اللوحة القياسي", group: "المقاس", required: true },
    { key: "substrate", label: "سطح اللوحة", type: "select", options: ["معدن حسب المواصفة", "سطح قائم يحتاج إعادة تجهيز", "محدد بمستند المشروع", "تحدده رواج بعد المراجعة"], group: "الخامة" },
    { key: "imaging", label: "نظام تنفيذ الجرافيك", type: "select", options: ["نظام متوافق مع الفيلم تحدده رواج", "Digital print ضمن نظام مصنع معتمد", "Screen print ضمن نظام مصنع معتمد", "Cut/overlay film متوافق", "Electronic cut حسب النظام"], group: "الطباعة", helpText: "الطابعة والحبر والفيلم والـoverlay تُعامل كنظام متوافق؛ لا تُفترض صلاحية أي توليفة." },
    { key: "mounting", label: "التركيب", type: "select", options: ["عمود/أعمدة", "جدار/واجهة", "هيكل قائم", "توريد فقط", "تحتاج معاينة موقع"], group: "التركيب" },
    { key: "site", label: "بيانات الموقع", type: "text", placeholder: "الموقع والارتفاع وظروف التركيب إن عُرفت", group: "التركيب" },
    quoteQty("لوحة")
  ],

  "street-name-reflective-sign": [
    { key: "authority", label: "الجهة أو المواصفة الحاكمة", type: "text", placeholder: "الجهة/المشروع/المواصفة إن كانت معروفة", group: "الامتثال", required: true },
    { key: "purpose", label: "الغرض", type: "text", placeholder: "تعريف الشوارع والمواقع", group: "الاستخدام", required: true },
    { key: "reflective_class", label: "فئة الانعكاس", type: "select", options: ["تحدد من المواصفة — لا اختيار افتراضي", "ASTM Type I / RA1 عند سماح المواصفة", "ASTM Type III/IV أو RA2 عند سماح المواصفة", "ASTM Type IX/XI أو RA3 عند اشتراطها", "فئة أخرى منصوص عليها بالمشروع"], group: "الامتثال", helpText: "فئة الانعكاس يحددها الكود أو الجهة الحاكمة. لا تستبدل الفئات ببعضها تلقائيًا." },
    { key: "standard_ref", label: "رقم المواصفة أو بند العقد", type: "text", placeholder: "إن وجد", group: "الامتثال" },
    { key: "dimensions", label: "المقاس/الكود", type: "text", placeholder: "المقاس أو رمز اللوحة القياسي", group: "المقاس", required: true },
    { key: "substrate", label: "سطح اللوحة", type: "select", options: ["معدن حسب المواصفة", "سطح قائم يحتاج إعادة تجهيز", "محدد بمستند المشروع", "تحدده رواج بعد المراجعة"], group: "الخامة" },
    { key: "imaging", label: "نظام تنفيذ الجرافيك", type: "select", options: ["نظام متوافق مع الفيلم تحدده رواج", "Digital print ضمن نظام مصنع معتمد", "Screen print ضمن نظام مصنع معتمد", "Cut/overlay film متوافق", "Electronic cut حسب النظام"], group: "الطباعة", helpText: "الطابعة والحبر والفيلم والـoverlay تُعامل كنظام متوافق؛ لا تُفترض صلاحية أي توليفة." },
    { key: "mounting", label: "التركيب", type: "select", options: ["عمود/أعمدة", "جدار/واجهة", "هيكل قائم", "توريد فقط", "تحتاج معاينة موقع"], group: "التركيب" },
    { key: "site", label: "بيانات الموقع", type: "text", placeholder: "الموقع والارتفاع وظروف التركيب إن عُرفت", group: "التركيب" },
    quoteQty("لوحة")
  ],

  "facility-safety-reflective-sign": [
    { key: "authority", label: "الجهة أو المواصفة الحاكمة", type: "text", placeholder: "الجهة/المشروع/المواصفة إن كانت معروفة", group: "الامتثال", required: true },
    { key: "purpose", label: "الغرض", type: "text", placeholder: "سلامة وتحذير وإرشاد داخل المواقع والمنشآت", group: "الاستخدام", required: true },
    { key: "reflective_class", label: "فئة الانعكاس", type: "select", options: ["تحدد من المواصفة — لا اختيار افتراضي", "ASTM Type I / RA1 عند سماح المواصفة", "ASTM Type III/IV أو RA2 عند سماح المواصفة", "ASTM Type IX/XI أو RA3 عند اشتراطها", "فئة أخرى منصوص عليها بالمشروع"], group: "الامتثال", helpText: "فئة الانعكاس يحددها الكود أو الجهة الحاكمة. لا تستبدل الفئات ببعضها تلقائيًا." },
    { key: "standard_ref", label: "رقم المواصفة أو بند العقد", type: "text", placeholder: "إن وجد", group: "الامتثال" },
    { key: "dimensions", label: "المقاس/الكود", type: "text", placeholder: "المقاس أو رمز اللوحة القياسي", group: "المقاس", required: true },
    { key: "substrate", label: "سطح اللوحة", type: "select", options: ["معدن حسب المواصفة", "سطح قائم يحتاج إعادة تجهيز", "محدد بمستند المشروع", "تحدده رواج بعد المراجعة"], group: "الخامة" },
    { key: "imaging", label: "نظام تنفيذ الجرافيك", type: "select", options: ["نظام متوافق مع الفيلم تحدده رواج", "Digital print ضمن نظام مصنع معتمد", "Screen print ضمن نظام مصنع معتمد", "Cut/overlay film متوافق", "Electronic cut حسب النظام"], group: "الطباعة", helpText: "الطابعة والحبر والفيلم والـoverlay تُعامل كنظام متوافق؛ لا تُفترض صلاحية أي توليفة." },
    { key: "mounting", label: "التركيب", type: "select", options: ["عمود/أعمدة", "جدار/واجهة", "هيكل قائم", "توريد فقط", "تحتاج معاينة موقع"], group: "التركيب" },
    { key: "site", label: "بيانات الموقع", type: "text", placeholder: "الموقع والارتفاع وظروف التركيب إن عُرفت", group: "التركيب" },
    quoteQty("لوحة")
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
    { key: "service", label: "نوع الخدمة", type: "select", options: ["قص ليزر", "حفر/نقش ليزر", "قص + حفر", "وسم Metal/Fiber", "أحتاج تحديد التقنية"], group: "المعالجة" },
    { key: "material", label: "الخامة", type: "select", options: ["Acrylic / PMMA", "MDF/Wood", "Plywood", "Paper/Cardboard", "Leather", "Anodized Aluminum", "Coated Metal", "Stainless Steel — حسب التقنية", "Laserable plastic", "خامة أخرى"], group: "الخامة" },
    { key: "thickness", label: "السماكة", type: "text", placeholder: "إن كانت معروفة", group: "الخامة" },
    { key: "size", label: "المقاس", type: "text", placeholder: "العرض × الارتفاع", group: "المقاس" },
    { key: "file", label: "الملف", type: "select", options: ["Vector جاهز", "ملف يحتاج تجهيز", "أحتاج التصميم من رواج"], group: "التصميم" },
    quoteQty("قطعة")
  ],
  awards: [
    { key: "type", label: "نوع المنتج", type: "select", options: ["درع تكريم", "Plaque", "Trophy component", "هدية مكتبية", "Acrylic award", "Wood/Metal award", "قطعة مخصصة"], group: "المنتج" },
    { key: "material", label: "الخامات", type: "select", options: ["Acrylic", "Wood/MDF", "Metal", "Acrylic + Wood", "Acrylic + Metal", "مزيج خامات", "يحدد حسب التصميم"], group: "الخامة" },
    { key: "decoration", label: "طريقة التخصيص", type: "select", options: ["Laser Engraving", "UV Direct Print", "Vinyl/Printed insert", "Metal plate + engraving", "مزيج تقنيات"], group: "الطباعة" },
    { key: "size", label: "المقاس التقريبي", type: "text", placeholder: "إن كان محددًا", group: "المقاس" },
    { key: "personalization", label: "الأسماء والبيانات", type: "select", options: ["نفس التصميم للجميع", "أسماء متغيرة", "أسماء + مسميات", "أسماء + أرقام/تواريخ", "بيانات من ملف"], group: "التخصيص" },
    { key: "packaging", label: "تغليف كل قطعة", type: "select", options: ["بدون", "علبة/تغليف فردي", "تغليف فاخر", "يحدد حسب المنتج"], group: "التجهيز" },
    quoteQty("قطعة")
  ]};
