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
