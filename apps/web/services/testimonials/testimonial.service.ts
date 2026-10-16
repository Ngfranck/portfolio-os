import { prisma } from "../../lib/prisma";

const publicTestimonialSelect = {
  id: true,
  name: true,
  role: true,
  company: true,
  content: true,
  avatar: true,
  rating: true,
  featured: true,
  sortOrder: true,
} as const;

/**
 * Récupère les témoignages mis en avant
 * pour leur affichage sur la page d'accueil.
 */
export async function getFeaturedTestimonials() {
  return prisma.testimonial.findMany({
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
    select: publicTestimonialSelect,
  });
}