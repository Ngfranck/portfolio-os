"use server";

import { prisma } from "@/lib/prisma";

export type AnalyticsOverview = {
  projects: number;
  articles: number;
  services: number;
  testimonials: number;
  messages: number;
};

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  const [
    projects,
    articles,
    services,
    testimonials,
    messages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.article.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.contactMessage.count(),
  ]);

  return {
    projects,
    articles,
    services,
    testimonials,
    messages,
  };
}