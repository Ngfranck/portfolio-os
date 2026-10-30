"use server";

import { signOut } from "@/auth";

export async function logoutAdmin() {
  await signOut({
    // Next.js préfixe automatiquement le basePath (`/admin` en production).
    redirectTo: "/login",
  });
}
