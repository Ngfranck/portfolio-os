CREATE TYPE "GalleryLayout" AS ENUM ('PORTRAIT', 'SQUARE', 'LANDSCAPE');

CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "imageUrl" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "linkUrl" TEXT,
    "layout" "GalleryLayout" NOT NULL DEFAULT 'PORTRAIT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "GalleryItem_slug_key" ON "GalleryItem"("slug");
CREATE INDEX "GalleryItem_published_sortOrder_idx" ON "GalleryItem"("published", "sortOrder");
