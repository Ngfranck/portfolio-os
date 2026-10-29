
"use server";

import { requireAdmin } from "@/lib/admin-auth";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

/**
 * ============================================================
 * TYPES
 * ============================================================
 */

export type TestimonialInput = {
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  avatar?: string | null;
  rating?: number | null;
  featured?: boolean;
  sortOrder?: number;
};

export type AdminTestimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  avatar: string | null;
  rating: number | null;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TestimonialEditorData = AdminTestimonial;

/**
 * ============================================================
 * VALIDATION
 * ============================================================
 */

const testimonialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom du client est obligatoire.")
    .max(
      120,
      "Le nom ne doit pas dépasser 120 caractères.",
    ),

  role: z
    .string()
    .trim()
    .max(
      120,
      "Le rôle ne doit pas dépasser 120 caractères.",
    )
    .nullable()
    .optional(),

  company: z
    .string()
    .trim()
    .max(
      120,
      "Le nom de l'entreprise ne doit pas dépasser 120 caractères.",
    )
    .nullable()
    .optional(),

  content: z
    .string()
    .trim()
    .min(1, "Le contenu du témoignage est obligatoire.")
    .max(
      5000,
      "Le témoignage ne doit pas dépasser 5 000 caractères.",
    ),

  avatar: z
    .string()
    .trim()
    .max(
      2000,
      "L'adresse de l'avatar ne doit pas dépasser 2 000 caractères.",
    )
    .nullable()
    .optional(),

  rating: z
    .number()
    .int("La note doit être un nombre entier.")
    .min(1, "La note minimale est de 1.")
    .max(5, "La note maximale est de 5.")
    .nullable()
    .optional(),

  featured: z.boolean().default(false),

  sortOrder: z
    .number()
    .int("L'ordre doit être un nombre entier.")
    .min(0, "L'ordre ne peut pas être négatif.")
    .default(0),
});

/**
 * ============================================================
 * UTILITAIRES
 * ============================================================
 */

function parseTestimonialInput(
  input: unknown,
):
  | { success: true; data: TestimonialInput }
  | { success: false; error: string } {
  const parsed = testimonialSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ??
        "Les données du témoignage sont invalides.",
    };
  }

  return {
    success: true,
    data: {
      ...parsed.data,
      role: parsed.data.role || null,
      company: parsed.data.company || null,
      avatar: parsed.data.avatar || null,
      rating: parsed.data.rating ?? null,
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

    if (code === "P2025") {
      return "Ce témoignage est introuvable ou a déjà été supprimé.";
    }
  }

  return "Une erreur est survenue. Veuillez réessayer.";
}

function revalidateTestimonialPages() {
  revalidatePath("/testimonials");
  revalidatePath("/");
}

/**
 * ============================================================
 * LISTE DES TÉMOIGNAGES
 * ============================================================
 */

export async function getAdminTestimonials(): Promise<
  | {
      success: true;
      testimonials: AdminTestimonial[];
    }
  | {
      success: false;
      error: string;
      testimonials: [];
    }
> {
  await requireAdmin();
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [
        { featured: "desc" },
        { sortOrder: "asc" },
        { updatedAt: "desc" },
      ],
      select: {
        id: true,
        name: true,
        role: true,
        company: true,
        content: true,
        avatar: true,
        rating: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      testimonials,
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement des témoignages :",
      error,
    );

    return {
      success: false,
      error:
        "Impossible de charger les témoignages. Veuillez réessayer.",
      testimonials: [],
    };
  }
}

/**
 * ============================================================
 * RÉCUPÉRER UN TÉMOIGNAGE
 * ============================================================
 */

export async function getTestimonialById(
  testimonialId: string,
): Promise<
  | {
      success: true;
      testimonial: TestimonialEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  await requireAdmin();
  if (!testimonialId.trim()) {
    return {
      success: false,
      error: "Identifiant du témoignage introuvable.",
    };
  }

  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id: testimonialId,
      },
      select: {
        id: true,
        name: true,
        role: true,
        company: true,
        content: true,
        avatar: true,
        rating: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!testimonial) {
      return {
        success: false,
        error: "Ce témoignage est introuvable.",
      };
    }

    return {
      success: true,
      testimonial,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du témoignage :",
      error,
    );

    return {
      success: false,
      error:
        "Impossible de récupérer ce témoignage.",
    };
  }
}

/**
 * ============================================================
 * CRÉER UN TÉMOIGNAGE
 * ============================================================
 */

export async function createTestimonial(
  input: TestimonialInput,
): Promise<
  | {
      success: true;
      testimonial: TestimonialEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  await requireAdmin();
  const parsed = parseTestimonialInput(input);

  if (!parsed.success) {
    return parsed;
  }

  try {
    const testimonial = await prisma.testimonial.create({
      data: parsed.data,
      select: {
        id: true,
        name: true,
        role: true,
        company: true,
        content: true,
        avatar: true,
        rating: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidateTestimonialPages();

    return {
      success: true,
      testimonial,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la création du témoignage :",
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
 * MODIFIER UN TÉMOIGNAGE
 * ============================================================
 */

export async function updateTestimonial(
  testimonialId: string,
  input: TestimonialInput,
): Promise<
  | {
      success: true;
      testimonial: TestimonialEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  await requireAdmin();
  if (!testimonialId.trim()) {
    return {
      success: false,
      error: "Identifiant du témoignage introuvable.",
    };
  }

  const parsed = parseTestimonialInput(input);

  if (!parsed.success) {
    return parsed;
  }

  try {
    const testimonial = await prisma.testimonial.update({
      where: {
        id: testimonialId,
      },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        role: true,
        company: true,
        content: true,
        avatar: true,
        rating: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidateTestimonialPages();

    return {
      success: true,
      testimonial,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la modification du témoignage :",
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
 * SUPPRIMER UN TÉMOIGNAGE
 * ============================================================
 */

export async function deleteTestimonial(
  testimonialId: string,
): Promise<
  | {
      success: true;
      testimonialId: string;
    }
  | {
      success: false;
      error: string;
    }
> {
  await requireAdmin();
  if (!testimonialId.trim()) {
    return {
      success: false,
      error: "Identifiant du témoignage introuvable.",
    };
  }

  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id: testimonialId,
      },
      select: {
        id: true,
      },
    });

    if (!testimonial) {
      return {
        success: false,
        error: "Ce témoignage est introuvable.",
      };
    }

    await prisma.testimonial.delete({
      where: {
        id: testimonialId,
      },
    });

    revalidateTestimonialPages();

    return {
      success: true,
      testimonialId,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du témoignage :",
      error,
    );

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}