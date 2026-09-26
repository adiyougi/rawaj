import {
  departments as fallbackDepartments,
  packages as fallbackPackages,
  portfolio as fallbackPortfolio,
  posts as fallbackPosts,
  services as fallbackServices
} from "@/lib/content";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

async function readTable<T>(path: string): Promise<T[] | null> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      },
      cache: "no-store"
    });

    if (!response.ok) return null;
    return await response.json() as T[];
  } catch {
    return null;
  }
}

export async function getDepartments() {
  const rows = await readTable<{
    slug: string;
    name: string;
    summary: string | null;
    image_url: string | null;
  }>("departments?select=slug,name,summary,image_url&is_published=eq.true&order=sort_order.asc");

  if (!rows?.length) return fallbackDepartments;
  return rows.map((row) => ({
    slug: row.slug,
    title: row.name,
    text: row.summary || "",
    image: row.image_url || fallbackDepartments[0].image
  }));
}

export async function getServices() {
  const rows = await readTable<{
    slug: string;
    name: string;
    short_description: string | null;
    description: string | null;
    hero_url: string | null;
    gallery: string[];
    badge: string | null;
    starting_price: number | null;
    price_label: string | null;
    specifications: any[];
    highlights: any[];
    faq: any[];
    featured: boolean;
    service_categories: { name: string } | null;
  }>(
    "services?select=slug,name,short_description,description,hero_url,gallery,badge,starting_price,price_label,specifications,highlights,faq,featured,service_categories(name)&is_published=eq.true&order=sort_order.asc"
  );

  if (!rows?.length) return fallbackServices;

  return rows.map((row) => ({
    id: row.slug,
    title: row.name,
    category: row.service_categories?.name || "خدمات رواج",
    desc: row.short_description || "",
    image: row.hero_url || fallbackServices[0].image,
    badge: row.badge || "رواج",
    description: row.description || "",
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    startingPrice: row.starting_price,
    priceLabel: row.price_label || "",
    specifications: Array.isArray(row.specifications) ? row.specifications : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    faq: Array.isArray(row.faq) ? row.faq : [],
    featured: Boolean(row.featured)
  }));
}

export async function getPackages() {
  const rows = await readTable<{
    slug: string;
    name: string;
    eyebrow: string | null;
    description: string | null;
    hero_url: string | null;
    package_services: Array<{ note: string | null; services: { name: string } | null }>;
  }>(
    "packages?select=slug,name,eyebrow,description,hero_url,package_services(note,services(name))&is_published=eq.true&order=sort_order.asc"
  );

  if (!rows?.length) return fallbackPackages;

  return rows.map((row) => ({
    id: row.slug,
    title: row.name,
    eyebrow: row.eyebrow || "باقة مخصصة",
    text: row.description || "",
    image: row.hero_url || fallbackPackages[0].image,
    items: row.package_services?.map((item) => item.services?.name || item.note || "").filter(Boolean) || []
  }));
}

export async function getPortfolio() {
  const rows = await readTable<{
    slug: string;
    title: string;
    category: string | null;
    summary: string | null;
    cover_url: string | null;
    project_date: string | null;
    services: string[];
  }>(
    "portfolio_items?select=slug,title,category,summary,cover_url,project_date,services&is_published=eq.true&order=sort_order.asc"
  );

  if (!rows?.length) return fallbackPortfolio;

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    category: row.category || "أعمال رواج",
    image: row.cover_url || fallbackPortfolio[0].image,
    date: row.project_date?.slice(0, 4) || "",
    summary: row.summary || "",
    services: Array.isArray(row.services) ? row.services : []
  }));
}

export async function getPosts() {
  const rows = await readTable<{
    slug: string;
    title: string;
    excerpt: string | null;
    content: string[];
    category: string | null;
    cover_url: string | null;
    published_at: string | null;
    reading_minutes: number | null;
  }>(
    "blog_posts?select=slug,title,excerpt,content,category,cover_url,published_at,reading_minutes&is_published=eq.true&order=published_at.desc"
  );

  if (!rows?.length) return fallbackPosts;

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    tag: row.category || "مدونة رواج",
    image: row.cover_url || fallbackPosts[0].image,
    excerpt: row.excerpt || "",
    date: row.published_at?.slice(0, 10) || "",
    readTime: row.reading_minutes ? `${row.reading_minutes} دقائق` : "قراءة سريعة",
    body: Array.isArray(row.content) ? row.content : []
  }));
}

export async function getMarketingContent() {
  const [departments, services, packages, portfolio, posts] = await Promise.all([
    getDepartments(),
    getServices(),
    getPackages(),
    getPortfolio(),
    getPosts()
  ]);

  return { departments, services, packages, portfolio, posts };
}


export async function getHeroSlides() {
  const rows = await readTable<{
    title: string;
    kicker: string | null;
    subtitle: string | null;
    media_url: string | null;
    cta_label: string | null;
    cta_href: string | null;
    secondary_cta_label: string | null;
    secondary_cta_href: string | null;
  }>("hero_slides?select=title,kicker,subtitle,media_url,cta_label,cta_href,secondary_cta_label,secondary_cta_href&is_published=eq.true&order=sort_order.asc");

  if (!rows?.length) {
    return [
      { kicker: "رواج منذ 2008", title: "نحوّل الفكرة إلى حضور لا يُنسى.", text: "تصميم، طباعة، إعلان وديكور — من الفكرة حتى اكتمال المشهد.", image: fallbackPortfolio[0].image, href: "/about", cta: "اكتشف رواج" },
      { kicker: "كتالوج خدمات متكامل", title: "كل ما تحتاجه علامتك. في مكان واحد.", text: "اختر الخدمة كمنتج، حدّد المواصفات، واجمع أكثر من خدمة في طلب واحد.", image: fallbackPosts[1].image, href: "/services", cta: "استكشف الخدمات" },
      { kicker: "أعمال تتحدث", title: "ما نصنعه يُرى قبل أن يُشرح.", text: "واجهات، لوحات، مطبوعات، هوية وأعمال خاصة.", image: fallbackPortfolio[1].image, href: "/portfolio", cta: "شاهد الأعمال" },
      { kicker: "باقات تسويقية", title: "أكثر من خدمة. صفقة واحدة.", text: "باقات قابلة للتخصيص تجمع التصميم والطباعة والتنفيذ في عرض واحد.", image: fallbackPackages[0].image, href: "/packages", cta: "استكشف الباقات" }
    ];
  }

  return rows.map((row) => ({
    kicker: row.kicker || "رواج",
    title: row.title,
    text: row.subtitle || "",
    image: row.media_url || fallbackPortfolio[0].image,
    href: row.cta_href || "/quote",
    cta: row.cta_label || "اكتشف المزيد",
    secondaryHref: row.secondary_cta_href || "/quote",
    secondaryCta: row.secondary_cta_label || "اطلب عرض سعر"
  }));
}

export async function getTickerItems() {
  const rows = await readTable<{ text: string }>(
    "ticker_items?select=text&is_published=eq.true&order=sort_order.asc"
  );
  return rows?.length
    ? rows.map((row) => row.text)
    : ["تصميم فني","صناعة محتوى","طباعة ورقية","طباعة رقمية","لوحات ضوئية","واجهات","حروف بارزة","ليزر وأكريليك","باقات مخصصة","تنفيذ متكامل"];
}

export async function getFeatures() {
  const rows = await readTable<{ title: string; description: string | null }>(
    "features?select=title,description&is_published=eq.true&order=sort_order.asc"
  );
  return rows?.length
    ? rows.map((row, index) => ({
        index: String(index + 1).padStart(2, "0"),
        title: row.title,
        text: row.description || ""
      }))
    : [
        { index:"01", title:"حل متكامل", text:"تصميم وإنتاج وتنفيذ ضمن تجربة واحدة." },
        { index:"02", title:"خبرة عملية", text:"خبرة ممتدة منذ 2008 ومشاريع في قطاعات متنوعة." },
        { index:"03", title:"مرونة عالية", text:"حلول قابلة للتخصيص بدل القوالب الجاهزة." },
        { index:"04", title:"جودة تنفيذ", text:"تفاصيل إنتاج وتشطيب ترفع قيمة العمل." },
        { index:"05", title:"التزام", text:"وضوح في المراحل ومواعيد الإنجاز." },
        { index:"06", title:"تنوع تقني", text:"طباعة، لوحات، واجهات، ليزر وأكثر." }
      ];
}

export async function getHomepageContent() {
  const [slides, ticker, departments, services, packages, features, portfolio, posts] = await Promise.all([
    getHeroSlides(),
    getTickerItems(),
    getDepartments(),
    getServices(),
    getPackages(),
    getFeatures(),
    getPortfolio(),
    getPosts()
  ]);

  return { slides, ticker, departments, services, packages, features, portfolio, posts };
}


export async function getDepartmentDetail(slug: string) {
  const departmentRows = await readTable<{
    id: string;
    slug: string;
    name: string;
    summary: string | null;
    description: string | null;
    image_url: string | null;
    hero_url: string | null;
  }>(
    "departments?select=id,slug,name,summary,description,image_url,hero_url&slug=eq." + encodeURIComponent(slug) + "&is_published=eq.true&limit=1"
  );

  const fallbackDepartment = fallbackDepartments.find((item) => item.slug === slug);
  if (!departmentRows?.length) {
    if (!fallbackDepartment) return null;
    return {
      department: fallbackDepartment,
      services: fallbackServices.filter((service) => {
        const map: Record<string,string> = {
          "التصميم والمحتوى":"design-content",
          "الطباعة الورقية":"paper-printing",
          "الطباعة الرقمية":"digital-printing",
          "اللوحات والحروف":"signage",
          "الواجهات والديكور":"facades",
          "الليزر والأكريليك":"laser-acrylic"
        };
        return map[service.category] === slug;
      })
    };
  }

  const row = departmentRows[0];
  const serviceRows = await readTable<{
    slug: string;
    name: string;
    short_description: string | null;
    hero_url: string | null;
    badge: string | null;
    service_categories: { name: string } | null;
  }>(
    "services?select=slug,name,short_description,hero_url,badge,service_categories(name)&department_id=eq." +
    row.id +
    "&is_published=eq.true&order=sort_order.asc"
  );

  const services = serviceRows?.map((service) => ({
    id: service.slug,
    title: service.name,
    category: service.service_categories?.name || row.name,
    desc: service.short_description || "",
    image: service.hero_url || row.image_url || fallbackServices[0].image,
    badge: service.badge || "رواج"
  })) || [];

  return {
    department: {
      slug: row.slug,
      title: row.name,
      text: row.summary || "",
      description: row.description || row.summary || "",
      image: row.hero_url || row.image_url || fallbackDepartment?.image || fallbackServices[0].image
    },
    services
  };
}
