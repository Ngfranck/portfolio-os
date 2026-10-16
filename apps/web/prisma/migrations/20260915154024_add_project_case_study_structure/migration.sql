/*
  Warnings:

  - You are about to drop the column `role` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "ProjectOverview" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectOverview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRole" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectService" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectApproach" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectApproach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectResult" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectOverview_projectId_key" ON "ProjectOverview"("projectId");

-- CreateIndex
CREATE INDEX "ProjectRole_projectId_idx" ON "ProjectRole"("projectId");

-- CreateIndex
CREATE INDEX "ProjectRole_projectId_sortOrder_idx" ON "ProjectRole"("projectId", "sortOrder");

-- CreateIndex
CREATE INDEX "ProjectService_projectId_idx" ON "ProjectService"("projectId");

-- CreateIndex
CREATE INDEX "ProjectService_serviceId_idx" ON "ProjectService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectService_projectId_serviceId_key" ON "ProjectService"("projectId", "serviceId");

-- CreateIndex
CREATE INDEX "ProjectApproach_projectId_idx" ON "ProjectApproach"("projectId");

-- CreateIndex
CREATE INDEX "ProjectApproach_projectId_sortOrder_idx" ON "ProjectApproach"("projectId", "sortOrder");

-- CreateIndex
CREATE INDEX "ProjectResult_projectId_idx" ON "ProjectResult"("projectId");

-- CreateIndex
CREATE INDEX "ProjectResult_projectId_sortOrder_idx" ON "ProjectResult"("projectId", "sortOrder");

-- CreateIndex
CREATE INDEX "ArticleTag_tagId_idx" ON "ArticleTag"("tagId");

-- CreateIndex
CREATE INDEX "ProjectSkill_skillId_idx" ON "ProjectSkill"("skillId");

-- AddForeignKey
ALTER TABLE "ProjectOverview" ADD CONSTRAINT "ProjectOverview_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRole" ADD CONSTRAINT "ProjectRole_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectService" ADD CONSTRAINT "ProjectService_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectService" ADD CONSTRAINT "ProjectService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectApproach" ADD CONSTRAINT "ProjectApproach_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectResult" ADD CONSTRAINT "ProjectResult_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
