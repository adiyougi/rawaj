export type ServiceSpec = {
  key: string;
  label: string;
  type: "select" | "text" | "number";
  placeholder?: string;
  options?: string[];
  unit?: string;
};

export const serviceSpecifications: Record<string, ServiceSpec[]> = {
  cards: [
    { key: "size", label: "المقاس", type: "select", options: ["9 × 5 سم", "8.5 × 5.5 سم", "مقاس مخصص"] },
    { key: "sides", label: "وجه الطباعة", type: "select", options: ["وجه واحد", "وجهين"] },
    { key: "paper", label: "نوع الورق", type: "select", options: ["كوشيه", "بريستول", "ورق فاخر", "أحتاج اقتراح رواج"] },
    { key: "qty", label: "الكمية", type: "number", placeholder: "مثال: 500", unit: "حبة" },
    { key: "lamination", label: "السلفنة", type: "select", options: ["بدون", "مطفي", "لامع"] },
    { key: "finish", label: "إضافات وتشطيب", type: "select", options: ["عادي", "زوايا دائرية", "فويل", "UV موضعي", "قص خاص"] }
  ],
  invoices: [
    { key: "size", label: "المقاس", type: "select", options: ["A4", "A5", "مقاس مخصص"] },
    { key: "copies", label: "عدد النسخ في المجموعة", type: "select", options: ["أصل + نسخة", "أصل + نسختين", "مخصص"] },
    { key: "books", label: "عدد الدفاتر", type: "number", placeholder: "مثال: 20", unit: "دفتر" },
    { key: "numbering", label: "ترقيم", type: "select", options: ["بدون ترقيم", "ترقيم متسلسل"] },
    { key: "binding", label: "التجليد", type: "select", options: ["لصق", "دبوس", "حسب الاستخدام"] }
  ],
  brochures: [
    { key: "size", label: "المقاس", type: "select", options: ["A4", "A5", "DL", "مقاس مخصص"] },
    { key: "fold", label: "الطي", type: "select", options: ["بدون طي", "طية واحدة", "طيتان", "أكورديون"] },
    { key: "paper", label: "الورق", type: "select", options: ["كوشيه خفيف", "كوشيه ثقيل", "ورق فاخر"] },
    { key: "qty", label: "الكمية", type: "number", placeholder: "مثال: 1000", unit: "حبة" },
    { key: "finish", label: "التشطيب", type: "select", options: ["بدون", "سلفنة مطفية", "سلفنة لامعة", "UV موضعي"] }
  ],
  letterheads: [
    { key: "item", label: "المنتج", type: "select", options: ["ورق رسمي", "ظرف", "ورق + ظرف"] },
    { key: "size", label: "المقاس", type: "select", options: ["A4", "A5", "ظرف DL", "مخصص"] },
    { key: "paper", label: "نوع الورق", type: "select", options: ["أوفست", "فاخر", "أحتاج اقتراح"] },
    { key: "qty", label: "الكمية", type: "number", placeholder: "مثال: 1000" }
  ],
  catalogs: [
    { key: "size", label: "المقاس النهائي", type: "select", options: ["A4", "A5", "مربع", "مخصص"] },
    { key: "pages", label: "عدد الصفحات", type: "number", placeholder: "مثال: 24", unit: "صفحة" },
    { key: "paper", label: "ورق الصفحات", type: "select", options: ["كوشيه", "مطفي", "فاخر"] },
    { key: "binding", label: "التجليد", type: "select", options: ["دبوس", "غراء حراري", "سلك", "مخصص"] },
    { key: "qty", label: "الكمية", type: "number", placeholder: "مثال: 200", unit: "نسخة" }
  ],
  banner: [
    { key: "width", label: "العرض", type: "number", placeholder: "بالمتر", unit: "م" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "بالمتر", unit: "م" },
    { key: "material", label: "الخامة", type: "select", options: ["بنر", "أحتاج اقتراح رواج"] },
    { key: "finish", label: "التجهيز", type: "select", options: ["بدون", "عيون معدنية", "لحام أطراف", "مخصص"] },
    { key: "qty", label: "الكمية", type: "number", placeholder: "مثال: 2" }
  ],
  flex: [
    { key: "width", label: "العرض", type: "number", placeholder: "بالمتر", unit: "م" },
    { key: "height", label: "الارتفاع", type: "number", placeholder: "بالمتر", unit: "م" },
    { key: "usage", label: "الاستخدام", type: "select", options: ["لوحة مضيئة", "واجهة", "إعلان خارجي", "غير ذلك"] },
    { key: "installation", label: "التركيب", type: "select", options: ["طباعة فقط", "طباعة + تركيب"] }
  ],
  stickers: [
    { key: "size", label: "المقاس", type: "text", placeholder: "مثال: 10 × 10 سم" },
    { key: "material", label: "الخامة", type: "select", options: ["استيكر أبيض", "شفاف", "فينيل", "أحتاج اقتراح"] },
    { key: "cut", label: "القص", type: "select", options: ["مستقيم", "كونتور", "قص خاص"] },
    { key: "lamination", label: "الحماية", type: "select", options: ["بدون", "سلفنة", "حسب الاستخدام"] },
    { key: "qty", label: "الكمية", type: "number", placeholder: "العدد أو المساحة" }
  ],
  lightbox: [
    { key: "size", label: "الأبعاد", type: "text", placeholder: "العرض × الارتفاع" },
    { key: "sides", label: "نوع اللوحة", type: "select", options: ["أمامية", "جانبية / وجهين"] },
    { key: "lighting", label: "الإضاءة", type: "select", options: ["LED", "حسب توصية رواج"] },
    { key: "install", label: "التركيب", type: "select", options: ["تنفيذ فقط", "تنفيذ + تركيب"] },
    { key: "location", label: "موقع التركيب", type: "text", placeholder: "اسم المنطقة أو وصف الموقع" }
  ],
  letters: [
    { key: "material", label: "الخامة", type: "select", options: ["أكريليك", "ستيل", "مزيج خامات", "أحتاج اقتراح"] },
    { key: "height", label: "ارتفاع الحروف التقريبي", type: "number", placeholder: "بالسنتيمتر", unit: "سم" },
    { key: "lighting", label: "الإضاءة", type: "select", options: ["بدون إضاءة", "إضاءة أمامية", "إضاءة خلفية", "مخصص"] },
    { key: "install", label: "التركيب", type: "select", options: ["تصنيع فقط", "تصنيع + تركيب"] }
  ],
  facade: [
    { key: "size", label: "أبعاد الواجهة", type: "text", placeholder: "العرض × الارتفاع التقريبي" },
    { key: "material", label: "الخامة المطلوبة", type: "select", options: ["أليكوبوند", "مزيج خامات", "أحتاج اقتراح رواج"] },
    { key: "design", label: "التصميم", type: "select", options: ["لدي تصميم", "أحتاج تصميم 3D من رواج"] },
    { key: "signage", label: "اللوحة أو الحروف", type: "select", options: ["ضمن المشروع", "غير مطلوبة", "يحدد لاحقًا"] },
    { key: "location", label: "موقع المشروع", type: "text", placeholder: "المدينة / المنطقة" }
  ],
  identity: [
    { key: "business", label: "نوع النشاط", type: "text", placeholder: "مثال: مطعم، شركة، متجر..." },
    { key: "scope", label: "النطاق", type: "select", options: ["شعار فقط", "هوية أساسية", "هوية متكاملة"] },
    { key: "status", label: "حالة العلامة", type: "select", options: ["مشروع جديد", "تطوير هوية قائمة", "إعادة تسمية"] },
    { key: "deadline", label: "موعد مستهدف", type: "text", placeholder: "إن وجد" }
  ],
  "social-content": [
    { key: "platforms", label: "المنصات", type: "text", placeholder: "إنستغرام، فيسبوك، تيك توك..." },
    { key: "qty", label: "عدد التصاميم", type: "number", placeholder: "مثال: 12", unit: "تصميم" },
    { key: "copy", label: "كتابة المحتوى", type: "select", options: ["تصميم فقط", "تصميم + كتابة محتوى"] },
    { key: "period", label: "الفترة", type: "select", options: ["حملة", "أسبوع", "شهر", "مخصص"] }
  ],
  laser: [
    { key: "material", label: "الخامة", type: "select", options: ["أكريليك", "MDF", "خشب", "خامة أخرى"] },
    { key: "thickness", label: "السماكة", type: "text", placeholder: "إن كانت معروفة" },
    { key: "size", label: "المقاس", type: "text", placeholder: "العرض × الارتفاع" },
    { key: "operation", label: "العملية", type: "select", options: ["قص", "حفر", "قص + حفر"] },
    { key: "qty", label: "الكمية", type: "number", placeholder: "العدد" }
  ],
  awards: [
    { key: "type", label: "النوع", type: "select", options: ["درع", "هدية أكريليك", "ستاند", "قطعة مخصصة"] },
    { key: "material", label: "الخامة", type: "select", options: ["أكريليك", "خشب", "مزيج خامات"] },
    { key: "size", label: "المقاس", type: "text", placeholder: "إن كان محددًا" },
    { key: "qty", label: "الكمية", type: "number", placeholder: "العدد" },
    { key: "personalization", label: "تخصيص أسماء/شعارات", type: "select", options: ["نعم", "لا", "يحدد لاحقًا"] }
  ]
};
