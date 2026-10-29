"use server";

import { requireAdmin } from "@/lib/admin-auth";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const nullableText = (maxLength: number) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === ""
        ? null
        : value,
    z.string().trim().max(maxLength).nullable()
  );

const nullableEmail = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === ""
      ? null
      : value,
  z.string().trim().email("Adresse e-mail invalide.").max(254).nullable()
);

const nullableUrl = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === ""
      ? null
      : value,
  z
    .string()
    .trim()
    .max(2048)
    .url("Veuillez saisir une URL valide.")
    .refine(
      (value) => /^https?:\/\//i.test(value),
      "Seules les URL HTTP et HTTPS sont acceptées."
    )
    .nullable()
);

const siteSettingsSchema = z.object({
  siteName: z
    .string()
    .trim()
    .min(1, "Le nom du site est obligatoire.")
    .max(80, "Le nom ne doit pas dépasser 80 caractères."),
  siteTagline: nullableText(160),
  siteDescription: nullableText(500),
  ownerName: nullableText(100),
  contactEmail: nullableEmail,
  contactPhone: nullableText(40),
  whatsappUrl: nullableUrl,
  location: nullableText(120),
  isAvailableForProjects: z.boolean(),
  linkedinUrl: nullableUrl,
  behanceUrl: nullableUrl,
  dribbbleUrl: nullableUrl,
  githubUrl: nullableUrl,
  instagramUrl: nullableUrl,
  seoTitle: nullableText(70),
  seoDescription: nullableText(180),
  ogImageUrl: nullableUrl,
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;

const settingsSelect = {
  siteName: true,
  siteTagline: true,
  siteDescription: true,
  ownerName: true,
  contactEmail: true,
  contactPhone: true,
  whatsappUrl: true,
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

export async function getSiteSettings() {
  await requireAdmin();
  return prisma.siteSettings.upsert({
    where: { id: "main" },
    create: { id: "main" },
    update: {},
    select: settingsSelect,
  });
}

export async function updateSiteSettings(
  input: SiteSettingsInput
): Promise<{ success: boolean; message: string }> {
  await requireAdmin();
  const parsed = siteSettingsSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Données invalides.",
    };
  }

  try {
    await prisma.siteSettings.upsert({
      where: { id: "main" },
      create: {
        id: "main",
        ...parsed.data,
      },
      update: parsed.data,
    });

    revalidatePath("/settings");
    revalidatePath("/");

    return {
      success: true,
      message: "Les paramètres ont été enregistrés avec succès.",
    };
  } catch (error: unknown) {
    console.error(
      "Erreur lors de la sauvegarde des paramètres :",
      error
    );

    const details =
      error instanceof Error
        ? error.message
        : String(error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Erreur serveur : ${details}`
          : "Impossible d'enregistrer les paramètres. Réessayez.",
    };
  }
}