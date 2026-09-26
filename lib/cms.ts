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
      next: { revalidate: 60 }
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
    hero_url: string | null;
    badge: string | null;
    service_categories: { name: string } | null;
  }>(
    "services?select=slug,name,short_description,hero_url,badge,service_categories(name)&is_published=eq.true&order=sort_order.asc"
  );

  if (!rows?.length) return fallbackServices;

  return rows.map((row) => ({
    id: row.slug,
    title: row.name,
    category: row.service_categories?.name || "خدمات رواج",
    desc: row.short_description || "",
    image: row.hero_url || fallbackServices[0].image,
    badge: row.badge || "رواج"
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
