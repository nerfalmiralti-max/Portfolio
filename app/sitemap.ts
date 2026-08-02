import type { MetadataRoute } from "next";
import { projects } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/projects", "/about", "/journey", "/contact", "/privacy", ...projects.map((project) => `/projects/${project.slug}`)];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "monthly" as const : "yearly" as const, priority: route === "" ? 1 : route.startsWith("/projects/") ? 0.8 : 0.7 }));
}
