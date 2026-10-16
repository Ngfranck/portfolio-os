import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../web/app/generated/prisma/client";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(
    process.cwd(),
    "../web/.env.local",
  ),
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const connectionString =
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL est introuvable. Vérifiez apps/web/.env.local.",
    );
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  return new PrismaClient({
    adapter,
  });
}

export const prisma =
  globalForPrisma.prisma ??
  createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}