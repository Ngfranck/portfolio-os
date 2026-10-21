
"use server";

import { z } from "zod";
import { prisma } from "../../../lib/prisma";

const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Your name must be at least 2 characters long.")
    .max(100, "Your name is too long."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Your email address is too long.")
    .transform((value) => value.toLowerCase()),

  subject: z
    .string()
    .trim()
    .min(3, "The subject must be at least 3 characters long.")
    .max(150, "The subject is too long."),

  message: z
    .string()
    .trim()
    .min(10, "Your message must be at least 10 characters long.")
    .max(5000, "Your message is too long."),
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
        "Please check the information you entered.",
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
        "Your message has been sent. Thank you for getting in touch.",
    };
  } catch (error) {
    console.error(
      "[Contact] Impossible d'enregistrer le message.",
      error
    );

    return {
      success: false,
      error:
        "We could not send your message. Please try again or contact me directly by email.",
    };
  }
}
