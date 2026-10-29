"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;
const allowedImageTypes = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const titleSchema = z.string().trim().min(1).max(120);

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

function getTitle(formData: FormData) {
  return titleSchema.safeParse(formData.get("title"));
}

function getImageFile(formData: FormData): File | null {
  const image = formData.get("image");
  return image instanceof File && image.size > 0 ? image : null;
}

function getImageUrl(formData: FormData) {
  const imageUrl = formData.get("imageUrl");
  return typeof imageUrl === "string" ? imageUrl.trim() : "";
}

function isSafeMediaUrl(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return !value.includes("\\");
  }

  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

async function isValidImageFile(file: File) {
  if (
    file.size > MAX_IMAGE_SIZE_BYTES ||
    !allowedImageTypes.has(file.type)
  ) {
    return false;
  }

  const signature = Buffer.from(
    await file.slice(0, 12).arrayBuffer(),
  );

  switch (file.type) {
    case "image/jpeg":
      return signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff;
    case "image/png":
      return signature.subarray(0, 8).equals(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      );
    case "image/webp":
      return (
        signature.toString("ascii", 0, 4) === "RIFF" &&
        signature.toString("ascii", 8, 12) === "WEBP"
      );
    case "image/gif": {
      const header = signature.toString("ascii", 0, 6);
      return header === "GIF87a" || header === "GIF89a";
    }
    case "image/avif": {
      const brand = signature.toString("ascii", 8, 12);
      return (
        signature.toString("ascii", 4, 8) === "ftyp" &&
        (brand === "avif" || brand === "avis")
      );
    }
    default:
      return false;
  }
}

function refreshPublicGallery() {
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/sitemap.xml");
}

function createSlug(title: string) {
  const base =
    title
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "visual-work";

  return `${base}-${randomUUID().slice(0, 8)}`;
}

export async function createGalleryItem(formData: FormData) {
  await requireAdmin();

  const title = getTitle(formData);
  const image = getImageFile(formData);
  const imageUrl = getImageUrl(formData);
  if (!title.success || (!image && !imageUrl)) {
    redirect("/gallery/new?error=invalid");
  }
  if (!image && imageUrl && !isSafeMediaUrl(imageUrl)) {
    redirect("/gallery/new?error=url");
  }

  let imageData: Uint8Array<ArrayBuffer> | null = null;
  if (image) {
    if (image.size > MAX_IMAGE_SIZE_BYTES) {
      redirect("/gallery/new?error=size");
    }
    if (!(await isValidImageFile(image))) {
      redirect("/gallery/new?error=type");
    }

    imageData = new Uint8Array(await image.arrayBuffer());
  }

  const itemId = randomUUID();
  const finalImageUrl = imageData
    ? `/api/gallery/${itemId}/image`
    : imageUrl;
  if (!finalImageUrl) {
    redirect("/gallery/new?error=invalid");
  }

  const lastItem = await prisma.galleryItem.findFirst({
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  try {
    await prisma.galleryItem.create({
      data: {
        id: itemId,
        title: title.data,
        slug: createSlug(title.data),
        imageUrl: finalImageUrl,
        imageAlt: title.data,
        imageData,
        imageType: imageData ? image?.type : null,
        layout: "PORTRAIT",
        sortOrder: (lastItem?.sortOrder ?? -1) + 1,
        published: true,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      redirect("/gallery/new?error=duplicate");
    }

    throw error;
  }

  refreshPublicGallery();
  redirect("/gallery?success=created");
}

export async function updateGalleryItem(
  itemId: string,
  formData: FormData,
) {
  await requireAdmin();

  const title = getTitle(formData);
  if (!title.success) {
    redirect(`/gallery/${encodeURIComponent(itemId)}?error=invalid`);
  }

  const currentItem = await prisma.galleryItem.findUnique({
    where: { id: itemId },
    select: { imageUrl: true },
  });
  if (!currentItem) {
    redirect("/gallery?error=not-found");
  }

  const image = getImageFile(formData);
  const providedImageUrl = getImageUrl(formData);
  if (!image && providedImageUrl && !isSafeMediaUrl(providedImageUrl)) {
    redirect(`/gallery/${encodeURIComponent(itemId)}?error=url`);
  }
  let imageUrl = providedImageUrl || currentItem.imageUrl;
  let imageData: Uint8Array<ArrayBuffer> | null | undefined;
  let imageType: string | null | undefined;
  if (image) {
    if (image.size > MAX_IMAGE_SIZE_BYTES) {
      redirect(`/gallery/${encodeURIComponent(itemId)}?error=size`);
    }
    if (!(await isValidImageFile(image))) {
      redirect(`/gallery/${encodeURIComponent(itemId)}?error=type`);
    }

    imageUrl = `/api/gallery/${encodeURIComponent(itemId)}/image`;
    imageData = new Uint8Array(await image.arrayBuffer());
    imageType = image.type;
  } else if (providedImageUrl) {
    imageData = null;
    imageType = null;
  }

  await prisma.galleryItem.update({
    where: { id: itemId },
    data: {
      title: title.data,
      imageUrl,
      imageAlt: title.data,
      ...(imageData !== undefined ? { imageData, imageType } : {}),
      published: true,
    },
  });

  refreshPublicGallery();
  redirect("/gallery?success=updated");
}

export async function deleteGalleryItem(itemId: string) {
  await requireAdmin();
  await prisma.galleryItem.delete({
    where: { id: itemId },
  });

  refreshPublicGallery();
  redirect("/gallery?success=deleted");
}
