
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

/**
 * ============================================================
 * TYPES
 * ============================================================
 */

const contactMessageStatusSchema = z.enum([
  "UNREAD",
  "READ",
  "REPLIED",
  "ARCHIVED",
]);

export type ContactMessageStatus = z.infer<
  typeof contactMessageStatusSchema
>;

export type AdminContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: ContactMessageStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ContactMessageEditorData = AdminContactMessage;

/**
 * ============================================================
 * UTILITAIRES
 * ============================================================
 */

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const code = (error as { code?: unknown }).code;

    if (code === "P2025") {
      return "Ce message est introuvable ou a déjà été supprimé.";
    }
  }

  return "Une erreur est survenue. Veuillez réessayer.";
}

function revalidateMessagePages() {
  revalidatePath("/messages");
}

/**
 * ============================================================
 * LISTE DES MESSAGES
 * ============================================================
 */

export async function getAdminMessages(): Promise<
  | {
      success: true;
      messages: AdminContactMessage[];
    }
  | {
      success: false;
      error: string;
      messages: [];
    }
> {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: [
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      messages,
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement des messages :",
      error,
    );

    return {
      success: false,
      error:
        "Impossible de charger les messages. Veuillez réessayer.",
      messages: [],
    };
  }
}

/**
 * ============================================================
 * RÉCUPÉRER UN MESSAGE
 * ============================================================
 */

export async function getContactMessageById(
  messageId: string,
): Promise<
  | {
      success: true;
      message: ContactMessageEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!messageId.trim()) {
    return {
      success: false,
      error: "Identifiant du message introuvable.",
    };
  }

  try {
    const message = await prisma.contactMessage.findUnique({
      where: {
        id: messageId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!message) {
      return {
        success: false,
        error: "Ce message est introuvable.",
      };
    }

    return {
      success: true,
      message,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du message :",
      error,
    );

    return {
      success: false,
      error: "Impossible de récupérer ce message.",
    };
  }
}

/**
 * ============================================================
 * MODIFIER LE STATUT D'UN MESSAGE
 * ============================================================
 */

export async function updateContactMessageStatus(
  messageId: string,
  status: ContactMessageStatus,
): Promise<
  | {
      success: true;
      message: ContactMessageEditorData;
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!messageId.trim()) {
    return {
      success: false,
      error: "Identifiant du message introuvable.",
    };
  }

  const parsedStatus = contactMessageStatusSchema.safeParse(status);

  if (!parsedStatus.success) {
    return {
      success: false,
      error: "Le statut sélectionné est invalide.",
    };
  }

  try {
    const message = await prisma.contactMessage.update({
      where: {
        id: messageId,
      },
      data: {
        status: parsedStatus.data,
      },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidateMessagePages();

    return {
      success: true,
      message,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la modification du statut du message :",
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
 * SUPPRIMER UN MESSAGE
 * ============================================================
 */

export async function deleteContactMessage(
  messageId: string,
): Promise<
  | {
      success: true;
      messageId: string;
    }
  | {
      success: false;
      error: string;
    }
> {
  if (!messageId.trim()) {
    return {
      success: false,
      error: "Identifiant du message introuvable.",
    };
  }

  try {
    await prisma.contactMessage.delete({
      where: {
        id: messageId,
      },
    });

    revalidateMessagePages();

    return {
      success: true,
      messageId,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du message :",
      error,
    );

    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}