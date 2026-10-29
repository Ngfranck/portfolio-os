"use server";

import { requireAdmin } from "@/lib/admin-auth";

import { prisma } from "@/lib/prisma";

export async function getAdminProjects() {
  await requireAdmin();
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        year: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      success: true as const,
      projects: projects.map((project) => ({
        id: project.id,
        name: project.title,
        slug: project.slug,
        status: project.status,
        year: project.year
          ? String(project.year)
          : "",
        updatedAt:
          project.updatedAt.toISOString(),
        category:
          project.category?.name ??
          "Sans catégorie",
      })),
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement des projets :",
      error,
    );

    return {
      success: false as const,
      projects: [],
      error:
        "Impossible de charger les projets.",
    };
  }
}

export async function archiveProject(
  projectId: string,
) {
  await requireAdmin();
  if (!projectId) {
    return {
      success: false as const,
      error:
        "Identifiant de projet invalide.",
    };
  }

  try {
    const existingProject =
      await prisma.project.findUnique({
        where: {
          id: projectId,
        },
        select: {
          id: true,
          status: true,
        },
      });

    if (!existingProject) {
      return {
        success: false as const,
        error: "Projet introuvable.",
      };
    }

    if (
      existingProject.status ===
      "ARCHIVED"
    ) {
      return {
        success: false as const,
        error:
          "Ce projet est déjà archivé.",
      };
    }

    const project =
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          status: "ARCHIVED",
        },
        select: {
          id: true,
          title: true,
          status: true,
        },
      });

    return {
      success: true as const,
      project,
    };
  } catch (error) {
    console.error(
      "Erreur lors de l'archivage du projet :",
      error,
    );

    if (error instanceof Error) {
      return {
        success: false as const,
        error: error.message,
      };
    }

    return {
      success: false as const,
      error:
        "Impossible d'archiver le projet.",
    };
  }
}

export async function deleteProject(
  projectId: string,
) {
  await requireAdmin();
  if (!projectId) {
    return {
      success: false as const,
      error:
        "Identifiant de projet invalide.",
    };
  }

  try {
    const existingProject =
      await prisma.project.findUnique({
        where: {
          id: projectId,
        },
        select: {
          id: true,
          title: true,
        },
      });

    if (!existingProject) {
      return {
        success: false as const,
        error: "Projet introuvable.",
      };
    }

    await prisma.$transaction([
      prisma.projectOverview.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectRole.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectService.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectSkill.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectApproach.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectResult.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectImage.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.project.delete({
        where: {
          id: projectId,
        },
      }),
    ]);

    return {
      success: true as const,
      project: {
        id: existingProject.id,
        title: existingProject.title,
      },
    };
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du projet :",
      error,
    );

    if (error instanceof Error) {
      return {
        success: false as const,
        error: error.message,
      };
    }

    return {
      success: false as const,
      error:
        "Impossible de supprimer le projet.",
    };
  }
}