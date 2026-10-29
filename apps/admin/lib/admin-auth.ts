import "server-only";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (
    !session?.user?.email ||
    !configuredEmail ||
    session.user.email.toLowerCase() !== configuredEmail
  ) {
    redirect(process.env.NODE_ENV === "production" ? "/admin/login" : "/login");
  }
}
