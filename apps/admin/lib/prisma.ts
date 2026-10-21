import "server-only";

import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import { PrismaClient } from "../../web/app/generated/prisma/client";
import { fileURLToPath } from "node:url";

const adminDirectory = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(adminDirectory, "../../../.env"),
});

dotenv.config({
  path: path.resolve(adminDirectory, "../../web/.env.local"),
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL est introuvable. Vérifiez la configuration de l'environnement.",
    );
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  return new PrismaClient({
    adapter,
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
