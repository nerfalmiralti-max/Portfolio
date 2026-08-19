import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  const lastModified = new Date();

  return [
    { url: `${base}/`, priority: 1, changeFrequency: "monthly" as const },
    { url: `${base}/work`, priority: 0.9, changeFrequency: "monthly" as const },
    ...projects.map((project) => ({
      url: `${base}${project.caseStudyUrl}`,
      priority: 0.8,
      changeFrequency: "yearly" as const,
    })),
    { url: `${base}/about`, priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${base}/contact`, priority: 0.6, changeFrequency: "yearly" as const },
  ].map((entry) => ({ ...entry, lastModified }));
}
