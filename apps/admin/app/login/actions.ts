"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/auth";

export async function authenticateAdmin(formData: FormData) {
  try {
    await signIn("credentials", formData, {
      // Next.js ajoute le basePath (`/admin`) aux redirections de l'application.
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=invalid");
    }

    throw error;
  }
}
