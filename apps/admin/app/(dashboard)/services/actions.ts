"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

/**
 * ============================================================
 * TYPES
 * ============================================================
 */

export type ServiceInput = {
  title: string;
  slug: string;
  shortDescription: string;
  description?: string | null;
  icon?: string | null;
  featured?: boolean;
  sortOrder?: number;
};

export type AdminService = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string | null;
  icon: string | null;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    projects: number;
  };
};

export type ServiceEditorData = Omit<AdminService, "_count">;

export type ServiceProjectOption = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  updatedAt: Date;
};

/**
 * ============================================================
 * VALIDATION
 * ============================================================
 */

const serviceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Le titre est obligatoire.")
    .max(160, "Le titre ne doit pas dépasser 160 caractères."),

  slug: z
    .string()
    .trim()
    .min(1, "Le slug est obligatoire.")
    .max(180, "Le slug ne doit pas dépasser 180 caractères.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Le slug doit contenir uniquement des lettres minuscules, des chiffres et des tirets.",
    ),

  shortDescription: z
    .string()
    .trim()
    .min(1, "La description courte est obligatoire.")
    .max(
      300,
      "La description courte ne doit pas dépasser 300 caractères.",
    ),

  description: z
    .string()
    .trim()
    .max(
      5000,
      "La description détaillée ne doit pas dépasser 5 000 caractères.",
    )
    .nullable()
    .optional(),

  icon: z
    .string()
    .trim()
    .max(
      100,
      "Le nom de l'icône ne doit pas dépasser 100 caractères.",
    )
    .nullable()
    .optional(),

  featured: z.boolean().default(false),

  sortOrder: z
    .number()
    .int("L'ordre doit être un nombre entier.")
    .min(0, "L'ordre ne peut pas être négatif.")
    .default(0),
});

const projectIdsSchema = z
  .array(z.string().trim().min(1, "Identifiant de projet invalide."))
  .refine(
    (ids) => new Set(ids).size === ids.length,
    "La sélection contient des projets en double.",
  );

/**
 * ============================================================
 * UTILITAIRES
 * ============================================================
 */

function parseServiceInput(
  input: unknown,
):
  | { success: true; data: ServiceInput }
  | { success: false; error: string } {
  const parsed = serviceSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ??
        "Les données du service sont invalides.",
    };
  }

  return {
    success: true,
    data: {
      ...parsed.data,
      description: parsed.data.description || null,
      icon: parsed.data.icon || null,
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
      return "Ce slug est déjà utilisé par un autre service.";
    }

    if (code === "P2025") {
      return "Ce service est introuvable ou a déjà été supprimé.";
    }
  }

  return "Une erreur est survenue. Veuillez réessayer.";
}

function revalidateServicePages(serviceId?: string) {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/projects");

  if (serviceId) {
    revalidatePath(`/services/${serviceId}`);
  }
}

/**
 * ============================================================
 * LISTE DES SERVICES
 * ============================================================
 */

export async function getAdminServices(): Promise<
  | {
      success: true;
      services: AdminService[];
    }
  | {
      success: false;
      error: string;
      services: [];
    }
> {
  try {
    const services = await prisma.service.findMany({
      orderBy: [
        { sortOrder: "asc" },
        { updatedAt: "desc" },
      ],
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        description: true,
        icon: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    return {
      success: true,
      services,
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement des services :",
      error,
    );

    return {
      success: false,
      error:
        "Impossible de charger les services. Veuillez réessayer.",
      services: [],
    };
  }
}

/**
 * ============================================================
 * RÉCUPÉRER UN SERVICE
 * ============================================================
 */

export async function getServiceById(
  serviceId: string,
): Promise<
  | {
      success: true;
      service: ServiceEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!serviceId.trim()) {
    return {
      success: false,
      error: "Identifiant du service introuvable.",
    };
  }

  try {
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        description: true,
        icon: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!service) {
      return {
        success: false,
        error: "Ce service est introuvable.",
      };
    }

    return {
      success: true,
      service,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du service :",
      error,
    );

    return {
      success: false,
      error: "Impossible de récupérer ce service.",
    };
  }
}

/**
 * ============================================================
 * CRÉER UN SERVICE
 * ============================================================
 */

export async function createService(
  input: ServiceInput,
): Promise<
  | {
      success: true;
      service: ServiceEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  const parsed = parseServiceInput(input);

  if (!parsed.success) {
    return parsed;
  }

  try {
    const service = await prisma.service.create({
      data: parsed.data,
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        description: true,
        icon: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidateServicePages();

    return {
      success: true,
      service,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la création du service :",
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
 * MODIFIER UN SERVICE
 * ============================================================
 */

export async function updateService(
  serviceId: string,
  input: ServiceInput,
): Promise<
  | {
      success: true;
      service: ServiceEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!serviceId.trim()) {
    return {
      success: false,
      error: "Identifiant du service introuvable.",
    };
  }

  const parsed = parseServiceInput(input);

  if (!parsed.success) {
    return parsed;
  }

  try {
    const existingService = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
      select: {
        id: true,
      },
    });

    if (!existingService) {
      return {
        success: false,
        error: "Ce service est introuvable.",
      };
    }

    const service = await prisma.service.update({
      where: {
        id: serviceId,
      },
      data: parsed.data,
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        description: true,
        icon: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidateServicePages(serviceId);

    return {
      success: true,
      service,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la modification du service :",
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
 * SUPPRIMER UN SERVICE
 * ============================================================
 */

export async function deleteService(
  serviceId: string,
): Promise<
  | {
      success: true;
      serviceId: string;
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!serviceId.trim()) {
    return {
      success: false,
      error: "Identifiant du service introuvable.",
    };
  }

  try {
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    if (!service) {
      return {
        success: false,
        error: "Ce service est introuvable.",
      };
    }

    if (service._count.projects > 0) {
      return {
        success: false,
        error:
          `Impossible de supprimer « ${service.title} » : ` +
          `ce service est encore associé à ${service._count.projects} ` +
          `projet${service._count.projects > 1 ? "s" : ""}. ` +
          "Retirez-le d'abord de ces projets.",
      };
    }

    await prisma.service.delete({
      where: {
        id: serviceId,
      },
    });

    revalidateServicePages(serviceId);

    return {
      success: true,
      serviceId,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du service :",
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
 * DONNÉES DES PROJETS D'UN SERVICE
 * ============================================================
 */

export async function getServiceProjectData(
  serviceId: string,
): Promise<
  | {
      success: true;
      projects: ServiceProjectOption[];
      selectedProjectIds: string[];
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!serviceId.trim()) {
    return {
      success: false,
      error: "Identifiant du service introuvable.",
    };
  }

  try {
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
      select: {
        id: true,
      },
    });

    if (!service) {
      return {
        success: false,
        error: "Ce service est introuvable.",
      };
    }

    const [projects, associations] = await Promise.all([
      prisma.project.findMany({
        orderBy: [
          { updatedAt: "desc" },
          { title: "asc" },
        ],
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          coverImage: true,
          status: true,
          updatedAt: true,
        },
      }),

      prisma.projectService.findMany({
        where: {
          serviceId,
        },
        orderBy: [
          { sortOrder: "asc" },
          { createdAt: "asc" },
        ],
        select: {
          projectId: true,
        },
      }),
    ]);

    return {
      success: true,
      projects,
      selectedProjectIds: associations.map(
        (association) => association.projectId,
      ),
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement des projets du service :",
      error,
    );

    return {
      success: false,
      error:
        "Impossible de récupérer les projets associés à ce service.",
    };
  }
}

/**
 * ============================================================
 * METTRE À JOUR LES ASSOCIATIONS D'UN SERVICE
 * ============================================================
 */

export async function updateServiceProjects(
  serviceId: string,
  projectIds: string[],
): Promise<
  | {
      success: true;
      selectedProjectIds: string[];
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!serviceId.trim()) {
    return {
      success: false,
      error: "Identifiant du service introuvable.",
    };
  }

  const parsedIds = projectIdsSchema.safeParse(projectIds);

  if (!parsedIds.success) {
    return {
      success: false,
      error:
        parsedIds.error.issues[0]?.message ??
        "La sélection des projets est invalide.",
    };
  }

  const selectedProjectIds = parsedIds.data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const service = await tx.service.findUnique({
        where: {
          id: serviceId,
        },
        select: {
          id: true,
        },
      });

      if (!service) {
        return {
          success: false as const,
          error: "Ce service est introuvable.",
        };
      }

      if (selectedProjectIds.length > 0) {
        const existingProjectCount = await tx.project.count({
          where: {
            id: {
              in: selectedProjectIds,
            },
          },
        });

        if (existingProjectCount !== selectedProjectIds.length) {
          return {
            success: false as const,
            error:
              "Un ou plusieurs projets sélectionnés sont introuvables. Recharge la page et réessaie.",
          };
        }
      }

      await tx.projectService.deleteMany({
        where: {
          serviceId,
        },
      });

      if (selectedProjectIds.length > 0) {
        await tx.projectService.createMany({
          data: selectedProjectIds.map((projectId, index) => ({
            serviceId,
            projectId,
            sortOrder: index,
          })),
        });
      }

      return {
        success: true as const,
      };
    });

    if (!result.success) {
      return result;
    }

    revalidateServicePages(serviceId);

    return {
      success: true,
      selectedProjectIds,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des associations :",
      error,
    );

    return {
      success: false,
      error:
        "Impossible d'enregistrer les associations. Vérifie les projets et réessaie.",
    };
  }
}