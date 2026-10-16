import { prisma } from "../../lib/prisma";

const siteSettingsSelect = {
  siteName: true,
  siteTagline: true,
  siteDescription: true,
  ownerName: true,
  contactEmail: true,
  contactPhone: true,
  location: true,
  isAvailableForProjects: true,
  linkedinUrl: true,
  behanceUrl: true,
  dribbbleUrl: true,
  githubUrl: true,
  instagramUrl: true,
  seoTitle: true,
  seoDescription: true,
  ogImageUrl: true,
} as const;

/**
 * Récupère les paramètres publics du portfolio.
 *
 * Utilisé par la partie publique de portfolio-os.
 */
export async function getSiteSettings() {
  return prisma.siteSettings.upsert({
    where: {
      id: "main",
    },
    create: {
      id: "main",
    },
    update: {},
    select: siteSettingsSelect,
  });
}