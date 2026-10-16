import { prisma } from "../../lib/prisma";

const projectInclude = {
  category: true,

  overview: true,

  roles: {
    orderBy: {
      sortOrder: "asc" as const,
    },
  },

  services: {
    orderBy: {
      sortOrder: "asc" as const,
    },
    include: {
      service: true,
    },
  },

  approach: {
    orderBy: {
      sortOrder: "asc" as const,
    },
  },

  results: {
    orderBy: {
      sortOrder: "asc" as const,
    },
  },

  images: {
    orderBy: {
      sortOrder: "asc" as const,
    },
  },

  skills: {
    include: {
      skill: true,
    },
  },
} as const;

/**
 * Récupère tous les projets.
 *
 * Utilisé principalement par le dashboard admin.
 */
export async function getAllProjects() {
  return prisma.project.findMany({
    include: projectInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Récupère uniquement les projets publiés.
 *
 * Utilisé par le portfolio public.
 */
export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: projectInclude,
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}

/**
 * Récupère uniquement les projets mis en avant.
 */
export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: {
      status: "PUBLISHED",
      featured: true,
    },
    include: projectInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Récupère un projet publié à partir de son slug.
 *
 * Utilisé pour les pages :
 * /projects/[slug]
 */
export async function getPublishedProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: projectInclude,
  });
}

/**
 * Récupère un projet par son ID.
 *
 * Principalement utilisé par le dashboard admin.
 */
export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: {
      id,
    },
    include: projectInclude,
  });
}

/**
 * Récupère un projet par son slug,
 * indépendamment de son statut.
 *
 * Utile pour l'administration et la prévisualisation.
 */
export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: {
      slug,
    },
    include: projectInclude,
  });
}

/**
 * Compte le nombre total de projets.
 */
export async function getProjectsCount() {
  return prisma.project.count();
}

/**
 * Compte le nombre de projets publiés.
 */
export async function getPublishedProjectsCount() {
  return prisma.project.count({
    where: {
      status: "PUBLISHED",
    },
  });
}

/**
 * Compte le nombre de projets en brouillon.
 */
export async function getDraftProjectsCount() {
  return prisma.project.count({
    where: {
      status: "DRAFT",
    },
  });
}

/**
 * Compte le nombre de projets archivés.
 */
export async function getArchivedProjectsCount() {
  return prisma.project.count({
    where: {
      status: "ARCHIVED",
    },
  });
}