import { prisma } from "../../lib/prisma";

export async function getPublishedGalleryItems(take?: number) {
  return prisma.galleryItem.findMany({
    where: {
      published: true,
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        updatedAt: "desc",
      },
    ],
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      imageUrl: true,
      imageAlt: true,
      linkUrl: true,
      layout: true,
    },
    ...(take ? { take } : {}),
  });
}
