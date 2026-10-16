"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "../../../../web/app/generated/prisma/client";

/* ============================================================
   VALIDATION
============================================================ */

const contentBlockSchema = z.object({
  type: z.enum(["heading", "paragraph"]),
  text: z.string().max(5000),
});

const articleSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Le titre est obligatoire.")
      .max(180, "Le titre ne peut pas dépasser 180 caractères."),

    slug: z
      .string()
      .trim()
      .min(1, "Le slug est obligatoire.")
      .max(200, "Le slug ne peut pas dépasser 200 caractères.")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Le slug doit contenir des lettres minuscules, des chiffres et des tirets.",
      ),

    excerpt: z
      .string()
      .trim()
      .max(600, "L'extrait ne peut pas dépasser 600 caractères."),

    content: z.array(contentBlockSchema).max(
      100,
      "Un article ne peut pas dépasser 100 blocs.",
    ),

    coverImage: z.string().trim().nullable().optional(),

    readTime: z.string().trim().max(40).optional(),

    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),

    featured: z.boolean().optional(),

    categoryId: z.string().trim().nullable().optional(),

    publishedAt: z.string().nullable().optional(),
  })
  .refine(
    (article) =>
      article.status !== "PUBLISHED" ||
      article.content.some((block) => block.text.trim().length > 0),
    {
      message:
        "Ajoute au moins un bloc de contenu avant de publier l'article.",
      path: ["content"],
    },
  )
  .refine(
    (article) =>
      !article.publishedAt ||
      !Number.isNaN(new Date(article.publishedAt).getTime()),
    {
      message: "La date de publication est invalide.",
      path: ["publishedAt"],
    },
  );

/* ============================================================
   UTILITAIRES
============================================================ */

function serializeArticle<
  T extends {
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  },
>(article: T) {
  return {
    ...article,
    publishedAt: article.publishedAt?.toISOString() ?? null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}

function getErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const code = (error as { code?: unknown }).code;

    if (code === "P2002") {
      return "Un article possède déjà ce slug. Choisis-en un autre.";
    }

    if (code === "P2003") {
      return "La catégorie sélectionnée est invalide.";
    }

    if (code === "P2025") {
      return "Article introuvable.";
    }
  }

  return fallback;
}

function parseArticleInput(input: unknown) {
  const result = articleSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false as const,
      error:
        result.error.issues[0]?.message ??
        "Les données de l'article sont invalides.",
    };
  }

  return {
    success: true as const,
    data: result.data,
  };
}

function prepareContent(
  content: z.infer<typeof contentBlockSchema>[],
) {
  return content
    .map((block) => ({
      type: block.type,
      text: block.text.trim(),
    }))
    .filter((block) => block.text.length > 0);
}

function resolvePublishedAt(
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED",
  publishedAt: string | null | undefined,
  existingPublishedAt: Date | null = null,
) {
  if (status === "PUBLISHED") {
    return publishedAt
      ? new Date(publishedAt)
      : existingPublishedAt ?? new Date();
  }

  if (status === "ARCHIVED") {
    return (
      existingPublishedAt ??
      (publishedAt ? new Date(publishedAt) : null)
    );
  }

  return null;
}

/* ============================================================
   REVALIDATION DES PAGES
============================================================ */

/**
 * Actualise la liste des articles et les pages correspondant
 * aux slugs concernés dans l'application Next.js courante.
 */
function revalidateArticlePages(
  ...slugs: Array<string | null | undefined>
) {
  revalidatePath("/articles");

  const uniqueSlugs = new Set<string>();

  for (const slug of slugs) {
    if (slug?.trim()) {
      uniqueSlugs.add(slug.trim());
    }
  }

  for (const slug of uniqueSlugs) {
    revalidatePath(`/articles/${slug}`);
  }
}

/* ============================================================
   LISTE DES ARTICLES
============================================================ */

export async function getAdminArticles() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        readTime: true,
        status: true,
        featured: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return {
      success: true as const,
      articles: articles.map((article) =>
        serializeArticle(article),
      ),
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement des articles administrateur :",
      error,
    );

    return {
      success: false as const,
      error: "Impossible de charger les articles.",
      articles: [],
    };
  }
}

/* ============================================================
   CATÉGORIES
============================================================ */

export async function getArticleReferenceData() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return {
      success: true as const,
      categories,
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement des catégories d'articles :",
      error,
    );

    return {
      success: false as const,
      error: "Impossible de charger les catégories.",
      categories: [],
    };
  }
}

/* ============================================================
   RÉCUPÉRATION D'UN ARTICLE
============================================================ */

export async function getArticleById(articleId: string) {
  if (!articleId?.trim()) {
    return {
      success: false as const,
      error: "Identifiant d'article invalide.",
    };
  }

  try {
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        readTime: true,
        status: true,
        featured: true,
        publishedAt: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!article) {
      return {
        success: false as const,
        error: "Article introuvable.",
      };
    }

    return {
      success: true as const,
      article: serializeArticle(article),
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement de l'article :",
      error,
    );

    return {
      success: false as const,
      error: "Impossible de charger cet article.",
    };
  }
}

/* ============================================================
   CRÉATION D'UN ARTICLE
============================================================ */

export async function createArticle(input: unknown) {
  const parsed = parseArticleInput(input);

  if (!parsed.success) {
    return parsed;
  }

  const data = parsed.data;
  const content = prepareContent(data.content);

  try {
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: content as Prisma.InputJsonValue,
        coverImage: data.coverImage?.trim() || null,
        readTime: data.readTime?.trim() || "5 min read",
        status: data.status,
        featured: data.featured ?? false,
        categoryId: data.categoryId?.trim() || null,
        publishedAt: resolvePublishedAt(
          data.status,
          data.publishedAt,
        ),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        readTime: true,
        status: true,
        featured: true,
        publishedAt: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidateArticlePages(article.slug);

    return {
      success: true as const,
      article: serializeArticle(article),
    };
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'article :",
      error,
    );

    return {
      success: false as const,
      error: getErrorMessage(
        error,
        "Impossible de créer l'article.",
      ),
    };
  }
}

/* ============================================================
   MISE À JOUR D'UN ARTICLE
============================================================ */

export async function updateArticle(
  articleId: string,
  input: unknown,
) {
  if (!articleId?.trim()) {
    return {
      success: false as const,
      error: "Identifiant d'article invalide.",
    };
  }

  const parsed = parseArticleInput(input);

  if (!parsed.success) {
    return parsed;
  }

  const data = parsed.data;
  const content = prepareContent(data.content);

  try {
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        id: true,
        slug: true,
        publishedAt: true,
      },
    });

    if (!existingArticle) {
      return {
        success: false as const,
        error: "Article introuvable.",
      };
    }

    const article = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: content as Prisma.InputJsonValue,
        coverImage: data.coverImage?.trim() || null,
        readTime: data.readTime?.trim() || "5 min read",
        status: data.status,
        featured: data.featured ?? false,
        categoryId: data.categoryId?.trim() || null,
        publishedAt: resolvePublishedAt(
          data.status,
          data.publishedAt,
          existingArticle.publishedAt,
        ),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        readTime: true,
        status: true,
        featured: true,
        publishedAt: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidateArticlePages(
      existingArticle.slug,
      article.slug,
    );

    return {
      success: true as const,
      article: serializeArticle(article),
    };
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'article :",
      error,
    );

    return {
      success: false as const,
      error: getErrorMessage(
        error,
        "Impossible de mettre à jour l'article.",
      ),
    };
  }
}

/* ============================================================
   ARCHIVAGE D'UN ARTICLE
============================================================ */

export async function archiveArticle(articleId: string) {
  if (!articleId?.trim()) {
    return {
      success: false as const,
      error: "Identifiant d'article invalide.",
    };
  }

  try {
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
      },
    });

    if (!existingArticle) {
      return {
        success: false as const,
        error: "Article introuvable.",
      };
    }

    if (existingArticle.status === "ARCHIVED") {
      return {
        success: false as const,
        error: "Cet article est déjà archivé.",
      };
    }

    const article = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        status: "ARCHIVED",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
      },
    });

    revalidateArticlePages(existingArticle.slug);

    return {
      success: true as const,
      article,
    };
  } catch (error) {
    console.error(
      "Erreur lors de l'archivage de l'article :",
      error,
    );

    return {
      success: false as const,
      error: getErrorMessage(
        error,
        "Impossible d'archiver cet article.",
      ),
    };
  }
}

/* ============================================================
   SUPPRESSION D'UN ARTICLE
============================================================ */

export async function deleteArticle(articleId: string) {
  if (!articleId?.trim()) {
    return {
      success: false as const,
      error: "Identifiant d'article invalide.",
    };
  }

  try {
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });

    if (!existingArticle) {
      return {
        success: false as const,
        error: "Article introuvable.",
      };
    }

    await prisma.article.delete({
      where: {
        id: articleId,
      },
    });

    revalidateArticlePages(existingArticle.slug);

    return {
      success: true as const,
      article: existingArticle,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'article :",
      error,
    );

    return {
      success: false as const,
      error: getErrorMessage(
        error,
        "Impossible de supprimer cet article.",
      ),
    };
  }
}