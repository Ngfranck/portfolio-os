"use server";

import { signOut } from "@/auth";

export async function logoutAdmin() {
  await signOut({
    redirectTo:
      process.env.NODE_ENV === "production" ? "/admin/login" : "/login",
  });
}
