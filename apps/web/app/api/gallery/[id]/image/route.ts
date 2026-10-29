import { NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const allowedImageTypes = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type GalleryImageRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: GalleryImageRouteProps,
) {
  const { id } = await params;
  const item = await prisma.galleryItem.findFirst({
    where: {
      id,
      published: true,
    },
    select: {
      imageData: true,
      imageType: true,
    },
  });

  if (
    !item?.imageData ||
    !item.imageType ||
    !allowedImageTypes.has(item.imageType)
  ) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(Buffer.from(item.imageData), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Length": String(item.imageData.byteLength),
      "Content-Type": item.imageType,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
