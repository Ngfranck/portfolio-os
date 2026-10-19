
"use server";

import { z } from "zod";
import { prisma } from "../../../lib/prisma";

const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom est trop long."),

  email: z
    .string()
    .trim()
    .email("Veuillez saisir une adresse email valide.")
    .max(254, "L'adresse email est trop longue.")
    .transform((value) => value.toLowerCase()),

  subject: z
    .string()
    .trim()
    .min(3, "Le sujet doit contenir au moins 3 caractères.")
    .max(150, "Le sujet est trop long."),

  message: z
    .string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères.")
    .max(5000, "Le message est trop long."),
});

export type ContactMessageInput = z.input<
  typeof contactMessageSchema
>;

export type ContactMessageResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    };

export async function createContactMessage(
  input: ContactMessageInput
): Promise<ContactMessageResult> {
  const validation = contactMessageSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      error:
        validation.error.issues[0]?.message ??
        "Veuillez vérifier les informations saisies.",
    };
  }

  const data = validation.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    return {
      success: true,
      message:
        "Votre message a bien été envoyé. Merci pour votre prise de contact !",
    };
  } catch (error) {
    console.error(
      "[Contact] Impossible d'enregistrer le message.",
      error
    );

    return {
      success: false,
      error:
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou me contacter directement par email.",
    };
  }
}
