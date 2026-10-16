
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

/**
 * ============================================================
 * TYPES
 * ============================================================
 */

export type CategoryInput = {
  name: string;
  slug: string;
  description?: string | null;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    projects: number;
    articles: number;
  };
};

export type CategoryEditorData = Omit<AdminCategory, "_count">;

/**
 * ============================================================
 * VALIDATION
 * ============================================================
 */

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom de la catégorie est obligatoire.")
    .max(
      120,
      "Le nom ne doit pas dépasser 120 caractères.",
    ),

  slug: z
    .string()
    .trim()
    .min(1, "Le slug est obligatoire.")
    .max(
      180,
      "Le slug ne doit pas dépasser 180 caractères.",
    )
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Le slug doit contenir uniquement des lettres minuscules, des chiffres et des tirets.",
    ),

  description: z
    .string()
    .trim()
    .max(
      5000,
      "La description ne doit pas dépasser 5 000 caractères.",
    )
    .nullable()
    .optional(),
});

/**
 * ============================================================
 * UTILITAIRES
 * ============================================================
 */

function parseCategoryInput(
  input: unknown,
):
  | { success: true; data: CategoryInput }
  | { success: false; error: string } {
  const parsed = categorySchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ??
        "Les données de la catégorie sont invalides.",
    };
  }

  return {
    success: true,
    data: {
      ...parsed.data,
      description: parsed.data.description || null,
    },
  };
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const code = (error as { code?: unknown }).code;

    if (code === "P2002") {
      return "Ce slug est déjà utilisé par une autre catégorie.";
    }

    if (code === "P2025") {
      return "Cette catégorie est introuvable ou a déjà été supprimée.";
    }
  }

  return "Une erreur est survenue. Veuillez réessayer.";
}

function revalidateCategoryPages() {
  revalidatePath("/categories");
  revalidatePath("/projects");
  revalidatePath("/articles");
  revalidatePath("/");
}

/**
 * ============================================================
 * LISTE DES CATÉGORIES
 * ============================================================
 */

export async function getAdminCategories(): Promise<
  | {
      success: true;
      categories: AdminCategory[];
    }
  | {
      success: false;
      error: string;
      categories: [];
    }
> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: [
        { name: "asc" },
        { updatedAt: "desc" },
      ],
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            projects: true,
            articles: true,
          },
        },
      },
    });

    return {
      success: true,
      categories,
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement des catégories :",
      error,
    );

    return {
      success: false,
      error:
        "Impossible de charger les catégories. Veuillez réessayer.",
      categories: [],
    };
  }
}

/**
 * ============================================================
 * RÉCUPÉRER UNE CATÉGORIE
 * ============================================================
 */

export async function getCategoryById(
  categoryId: string,
): Promise<
  | {
      success: true;
      category: CategoryEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!categoryId.trim()) {
    return {
      success: false,
      error: "Identifiant de la catégorie introuvable.",
    };
  }

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Cette catégorie est introuvable.",
      };
    }

    return {
      success: true,
      category,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la catégorie :",
      error,
    );

    return {
      success: false,
      error: "Impossible de récupérer cette catégorie.",
    };
  }
}

/**
 * ============================================================
 * CRÉER UNE CATÉGORIE
 * ============================================================
 */

export async function createCategory(
  input: CategoryInput,
): Promise<
  | {
      success: true;
      category: CategoryEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  const parsed = parseCategoryInput(input);

  if (!parsed.success) {
    return parsed;
  }

  try {
    const category = await prisma.category.create({
      data: parsed.data,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidateCategoryPages();

    return {
      success: true,
      category,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la création de la catégorie :",
      error,
    );

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * ============================================================
 * MODIFIER UNE CATÉGORIE
 * ============================================================
 */

export async function updateCategory(
  categoryId: string,
  input: CategoryInput,
): Promise<
  | {
      success: true;
      category: CategoryEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!categoryId.trim()) {
    return {
      success: false,
      error: "Identifiant de la catégorie introuvable.",
    };
  }

  const parsed = parseCategoryInput(input);

  if (!parsed.success) {
    return parsed;
  }

  try {
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidateCategoryPages();

    return {
      success: true,
      category,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la modification de la catégorie :",
      error,
    );

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * ============================================================
 * SUPPRIMER UNE CATÉGORIE
 * ============================================================
 */

export async function deleteCategory(
  categoryId: string,
): Promise<
  | {
      success: true;
      categoryId: string;
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!categoryId.trim()) {
    return {
      success: false,
      error: "Identifiant de la catégorie introuvable.",
    };
  }

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            projects: true,
            articles: true,
          },
        },
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Cette catégorie est introuvable.",
      };
    }

    const projectCount = category._count.projects;
    const articleCount = category._count.articles;

    if (projectCount > 0 || articleCount > 0) {
      const usages: string[] = [];

      if (projectCount > 0) {
        usages.push(
          `${projectCount} projet${projectCount > 1 ? "s" : ""}`,
        );
      }

      if (articleCount > 0) {
        usages.push(
          `${articleCount} article${articleCount > 1 ? "s" : ""}`,
        );
      }

      return {
        success: false,
        error:
          `Impossible de supprimer « ${category.name} » : ` +
          `cette catégorie est encore utilisée par ${usages.join(" et ")}. ` +
          "Retire d'abord ces associations.",
      };
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    revalidateCategoryPages();

    return {
      success: true,
      categoryId,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la catégorie :",
      error,
    );

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}