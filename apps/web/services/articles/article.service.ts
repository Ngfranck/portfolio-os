
import { prisma } from "../../lib/prisma";

const articleInclude = {
  category: true,
  tags: {
    include: {
      tag: true,
    },
  },
} as const;

export async function getAllArticles() {
  return prisma.article.findMany({
    include: articleInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPublishedArticles() {
  return prisma.article.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: articleInclude,
    orderBy: [
      {
        featured: "desc",
      },
      {
        publishedAt: "desc",
      },
    ],
  });
}

export async function getFeaturedArticles() {
  return prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      featured: true,
    },
    include: articleInclude,
    orderBy: {
      publishedAt: "desc",
    },
  });
}

/**
 * Diagnostic temporaire : recherche d'un article publié par son slug.
 */
export async function getPublishedArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: articleInclude,
  });
}

export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: {
      id,
    },
    include: articleInclude,
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: {
      slug,
    },
    include: articleInclude,
  });
}

export async function getArticlesCount() {
  return prisma.article.count();
}

export async function getPublishedArticlesCount() {
  return prisma.article.count({
    where: {
      status: "PUBLISHED",
    },
  });
}

export async function getDraftArticlesCount() {
  return prisma.article.count({
    where: {
      status: "DRAFT",
    },
  });
}

export async function getArchivedArticlesCount() {
  return prisma.article.count({
    where: {
      status: "ARCHIVED",
    },
  });
}