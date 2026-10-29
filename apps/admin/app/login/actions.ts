"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/auth";

export async function authenticateAdmin(formData: FormData) {
  try {
    await signIn("credentials", formData, {
      redirectTo: process.env.NODE_ENV === "production" ? "/admin/" : "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(
        process.env.NODE_ENV === "production"
          ? "/admin/login?error=invalid"
          : "/login?error=invalid",
      );
    }

    throw error;
  }
}
