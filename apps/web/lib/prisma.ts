import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import { PrismaClient } from "../app/generated/prisma/client";

dotenv.config({
  path: path.resolve(process.cwd(), "../../.env"),
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaClient: PrismaClient | undefined;

function getPrismaClient(): PrismaClient {
  if (prismaClient) {
    return prismaClient;
  }

  if (globalForPrisma.prisma) {
    prismaClient = globalForPrisma.prisma;
    return prismaClient;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined. Check the root .env file.");
  }

  const client = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  prismaClient = client;

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(target, property, receiver) {
    if (property === "then" || typeof property === "symbol") {
      return Reflect.get(target, property, receiver);
    }

    const client = getPrismaClient();
    const value = Reflect.get(client, property, client) as unknown;
    return typeof value === "function" ? value.bind(client) : value;
  },
});
