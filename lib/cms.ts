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

  if (rows === null) return fallbackDepartments;
  if (!rows.length) return [];
  return rows.map((row) => ({
    slug: row.slug,
    title: row.name,
    text: row.summary || "",
    image: row.image_url || fallbackDepartments[0].image
  }));
}

export async function resolveServiceSlug(slug:string) {
  const rows=await readTable<{services:{slug:string}|null}>(
    "service_slug_aliases?select=services(slug)&alias=eq."+encodeURIComponent(slug)+"&limit=1"
  );
  return rows?.[0]?.services?.slug || slug;
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
    specifications: any[];
    highlights: any[];
    faq: any[];
    featured: boolean;
    service_categories: { name: string } | null;
  }>(
    "services?select=slug,name,short_description,description,hero_url,gallery,badge,specifications,highlights,faq,featured,service_categories(name)&is_published=eq.true&verification_status=eq.approved&order=sort_order.asc"
  );

  if (rows === null) return fallbackServices;
  if (!rows.length) return [];

  return rows.map((row) => ({
    id: row.slug,
    title: row.name,
    category: row.service_categories?.name || "خدمات رواج",
    desc: row.short_description || "",
    image: row.hero_url || fallbackServices[0].image,
    badge: row.badge || "رواج",
    description: row.description || "",
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
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

  if (rows === null) return fallbackPackages;
  if (!rows.length) return [];

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
  const fallback=fallbackPortfolio.map((item)=>({
    ...item,
    description:item.summary || "",
    gallery:[] as string[],
    videoUrl:"",
    clientName:""
  }));

  const rows = await readTable<{
    slug: string;
    title: string;
    category: string | null;
    summary: string | null;
    description: string | null;
    cover_url: string | null;
    gallery: string[];
    video_url: string | null;
    project_date: string | null;
    client_name: string | null;
    services: string[];
  }>(
    "portfolio_items?select=slug,title,category,summary,description,cover_url,gallery,video_url,project_date,client_name,services&is_published=eq.true&order=sort_order.asc"
  );

  if (rows === null) return fallback;
  if (!rows.length) return [];

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    category: row.category || "أعمال رواج",
    image: row.cover_url || fallback[0].image,
    date: row.project_date?.slice(0, 4) || "",
    summary: row.summary || "",
    description: row.description || row.summary || "",
    gallery: Array.isArray(row.gallery) ? row.gallery.filter(Boolean) : [],
    videoUrl: row.video_url || "",
    clientName: row.client_name || "",
    services: Array.isArray(row.services) ? row.services : []
  }));
}

export async function getPosts() {
  const fallback=fallbackPosts.map((item,index)=>({
    ...item,featured:index===0,authorName:"رواج",tags:[] as string[],
    seoTitle:item.title,seoDescription:item.excerpt
  }));
  const rows = await readTable<{
    slug:string;title:string;excerpt:string|null;content:string[];category:string|null;tags:string[];
    cover_url:string|null;author_name:string|null;published_at:string|null;reading_minutes:number|null;
    featured:boolean;seo_title:string|null;seo_description:string|null;
  }>("blog_posts?select=slug,title,excerpt,content,category,tags,cover_url,author_name,published_at,reading_minutes,featured,seo_title,seo_description&is_published=eq.true&order=published_at.desc");

  if (rows === null) return fallback;
  if (!rows.length) return [];

  return rows.map((row)=>({
    slug:row.slug,title:row.title,tag:row.category||"مدونة رواج",image:row.cover_url||fallback[0].image,
    excerpt:row.excerpt||"",date:row.published_at?.slice(0,10)||"",
    readTime:row.reading_minutes?`${row.reading_minutes} دقائق`:"قراءة سريعة",
    body:Array.isArray(row.content)?row.content:[],featured:Boolean(row.featured),
    authorName:row.author_name||"رواج",tags:Array.isArray(row.tags)?row.tags:[],
    seoTitle:row.seo_title||row.title,seoDescription:row.seo_description||row.excerpt||""
  })).sort((a,b)=>Number(b.featured)-Number(a.featured)||b.date.localeCompare(a.date));
}

export async function getMarketingContent() {
  const [departments, services, packages, portfolio, posts] = await Promise.all([
    getDepartments(),
    getServices(),
    getPackages(),
    getPortfolio(),
    getPosts(), getHomepageModules(), getClients(), getTestimonials(), getHomepageAds(), getFaqs(), getHomeSettings()
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

  if (rows === null) {
    return [
      { kicker: "رواج منذ 2008", title: "نحوّل الفكرة إلى حضور لا يُنسى.", text: "تصميم، طباعة، إعلان وديكور — من الفكرة حتى اكتمال المشهد.", image: fallbackPortfolio[0].image, href: "/about", cta: "اكتشف رواج" },
      { kicker: "كتالوج خدمات متكامل", title: "كل ما تحتاجه علامتك. في مكان واحد.", text: "اختر الخدمة كمنتج، حدّد المواصفات، واجمع أكثر من خدمة في طلب واحد.", image: fallbackPosts[1].image, href: "/services", cta: "استكشف الخدمات" },
      { kicker: "أعمال تتحدث", title: "ما نصنعه يُرى قبل أن يُشرح.", text: "واجهات، لوحات، مطبوعات، هوية وأعمال خاصة.", image: fallbackPortfolio[1].image, href: "/portfolio", cta: "شاهد الأعمال" },
      { kicker: "باقات تسويقية", title: "أكثر من خدمة. صفقة واحدة.", text: "باقات قابلة للتخصيص تجمع التصميم والطباعة والتنفيذ في عرض واحد.", image: fallbackPackages[0].image, href: "/packages", cta: "استكشف الباقات" }
    ];
  }
  if (!rows.length) return [];

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
  if (rows === null) return ["تصميم فني","صناعة محتوى","طباعة ورقية","طباعة رقمية","لوحات ضوئية","واجهات","حروف بارزة","ليزر وأكريليك","باقات مخصصة","تنفيذ متكامل"];
  return rows.map((row)=>row.text);
}

export async function getFeatures() {
  const rows = await readTable<{ title: string; description: string | null }>(
    "features?select=title,description&is_published=eq.true&order=sort_order.asc"
  );
  if (rows === null) return [
        { index:"01", title:"حل متكامل", text:"تصميم وإنتاج وتنفيذ ضمن تجربة واحدة." },
        { index:"02", title:"خبرة عملية", text:"خبرة ممتدة منذ 2008 ومشاريع في قطاعات متنوعة." },
        { index:"03", title:"مرونة عالية", text:"حلول قابلة للتخصيص بدل القوالب الجاهزة." },
        { index:"04", title:"جودة تنفيذ", text:"تفاصيل إنتاج وتشطيب ترفع قيمة العمل." },
        { index:"05", title:"التزام", text:"وضوح في المراحل ومواعيد الإنجاز." },
        { index:"06", title:"تنوع تقني", text:"طباعة، لوحات، واجهات، ليزر وأكثر." }
      ];
  return rows.map((row,index)=>({index:String(index+1).padStart(2,"0"),title:row.title,text:row.description||""}));
}

export async function getHomepageContent() {
  const [slides, ticker, departments, services, packages, features, portfolio, posts, modules, clients, testimonials, ads, faqs, homeSettings] = await Promise.all([
    getHeroSlides(),
    getTickerItems(),
    getDepartments(),
    getServices(),
    getPackages(),
    getFeatures(),
    getPortfolio(),
    getPosts(),
    getHomepageModules(),
    getClients(),
    getTestimonials(),
    getHomepageAds(),
    getFaqs(),
    getHomeSettings()
  ]);

  return { slides, ticker, departments, services, packages, features, portfolio, posts, modules, clients, testimonials, ads, faqs, homeSettings };
}

export async function getHomepageModules(){const rows=await readTable<any>("homepage_modules?select=slug,label,enabled,sort_order,layout_variant,title,subtitle,settings&enabled=eq.true&order=sort_order.asc");return rows||[]}
export async function getClients(){const rows=await readTable<any>("clients?select=id,name,logo_url,website_url&is_published=eq.true&order=sort_order.asc");return rows||[]}
export async function getTestimonials(){const rows=await readTable<any>("testimonials?select=id,person_name,person_title,rating,quote,avatar_url&is_published=eq.true&submission_status=eq.approved&order=sort_order.asc");return rows||[]}
export async function getHomepageAds(){const rows=await readTable<any>("homepage_ads?select=id,title,subtitle,media_url,href&is_published=eq.true&order=sort_order.asc");return rows||[]}
export async function getHomeSettings(){const rows=await readTable<any>("site_settings?select=key,value&key=in.(brand,homepage_about,homepage_footer)");return Object.fromEntries((rows||[]).map((x:any)=>[x.key,x.value]))}
export async function getFaqs(){const rows=await readTable<any>("faqs?select=id,question,answer,category&is_published=eq.true&order=sort_order.asc");return rows||[]}

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
    "&is_published=eq.true&verification_status=eq.approved&order=sort_order.asc"
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
