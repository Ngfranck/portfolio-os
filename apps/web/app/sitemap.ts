import type { MetadataRoute } from "next";

import { articles } from "../data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ton-domaine.com";

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...articleUrls,
  ];
}