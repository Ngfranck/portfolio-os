import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      database: "connected",
      message: "Prisma is connected to PostgreSQL.",
    });
  } catch (error) {
    console.error("Database connection error:", error);

    return NextResponse.json(
      {
        success: false,
        database: "disconnected",
        message: "Unable to connect to PostgreSQL.",
      },
      { status: 500 }
    );
  }
}