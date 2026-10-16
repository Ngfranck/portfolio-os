import { prisma } from "../../lib/prisma";

const publicServiceSelect = {
  id: true,
  title: true,
  slug: true,
  shortDescription: true,
  description: true,
  icon: true,
  featured: true,
  sortOrder: true,
} as const;

/**
 * Récupère les services mis en avant pour la page d'accueil.
 *
 * L'ordre d'affichage est contrôlé depuis le Back Office
 * via les champs `featured` et `sortOrder`.
 */
export async function getFeaturedServices() {
  return prisma.service.findMany({
    where: {
      featured: true,
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        updatedAt: "desc",
      },
    ],
    select: publicServiceSelect,
  });
}