import type { MetadataRoute } from "next";
import { getDepartments, getPosts, getPortfolio, getServices } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://rawaj.netlify.app";
  const [departments, services, posts, portfolio] = await Promise.all([getDepartments(), getServices(), getPosts(), getPortfolio()]);

  const staticPages = ["", "/about", "/services", "/packages", "/portfolio", "/blog", "/faq", "/contact", "/quote"];
  return [
    ...staticPages.map((path) => ({ url: base + path, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .8 })),
    ...departments.map((item) => ({ url: base + "/departments/" + item.slug, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .8 })),
    ...services.map((item) => ({ url: base + "/services/" + item.id, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .8 })),
    ...portfolio.map((item) => ({ url: base + "/portfolio/" + item.slug, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .7 })),
    ...posts.map((item) => ({ url: base + "/blog/" + item.slug, lastModified: new Date(item.date || Date.now()), changeFrequency: "monthly" as const, priority: .7 }))
  ];
}
