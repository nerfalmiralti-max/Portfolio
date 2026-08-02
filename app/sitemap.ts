import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/work", "/about", "/process", "/journey", "/contact", "/privacy", ...projects.map((project) => project.caseStudyUrl)];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "monthly" as const : "yearly" as const, priority: route === "" ? 1 : route.startsWith("/work/") ? 0.8 : 0.7 }));
}
