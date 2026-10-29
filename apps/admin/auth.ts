import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { scryptSync, timingSafeEqual } from "node:crypto";

function verifyPassword(password: string, encodedHash: string): boolean {
  const [algorithm, salt, expectedHash] = encodedHash.split("$");

  if (
    algorithm !== "scrypt" ||
    !/^[a-f0-9]{32}$/i.test(salt ?? "") ||
    !/^[a-f0-9]{128}$/i.test(expectedHash ?? "")
  ) {
    console.error("ADMIN_PASSWORD_HASH is missing or malformed.");
    return false;
  }

  const actualHash = scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expectedHash, "hex");
  return timingSafeEqual(actualHash, expectedBuffer);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath:
    process.env.NODE_ENV === "production"
      ? "/admin/api/auth"
      : "/api/auth",
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL?.trim();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;
        const email =
          typeof credentials.email === "string"
            ? credentials.email.trim()
            : "";
        const password =
          typeof credentials.password === "string"
            ? credentials.password
            : "";

        if (!adminEmail || !passwordHash) {
          console.error(
            "Admin login is unavailable: set ADMIN_EMAIL and ADMIN_PASSWORD_HASH.",
          );
          return null;
        }

        if (
          !email ||
          email.length > 254 ||
          !password ||
          password.length > 1024 ||
          !verifyPassword(password, passwordHash)
        ) {
          return null;
        }

        if (email.toLowerCase() !== adminEmail.toLowerCase()) {
          return null;
        }

        return {
          id: "portfolio-admin",
          email: adminEmail,
          name: "Portfolio Administrator",
        };
      },
    }),
  ],
});
