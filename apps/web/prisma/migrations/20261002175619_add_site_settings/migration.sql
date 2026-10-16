-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "siteName" TEXT NOT NULL DEFAULT 'Gonar.ui',
    "siteTagline" TEXT,
    "siteDescription" TEXT,
    "ownerName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "location" TEXT,
    "isAvailableForProjects" BOOLEAN NOT NULL DEFAULT true,
    "linkedinUrl" TEXT,
    "behanceUrl" TEXT,
    "dribbbleUrl" TEXT,
    "githubUrl" TEXT,
    "instagramUrl" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "ogImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
