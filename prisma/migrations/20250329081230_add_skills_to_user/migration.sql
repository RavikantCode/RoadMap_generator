/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Link_resourceId_idx";

-- DropIndex
DROP INDEX "Resource_stepId_idx";

-- DropIndex
DROP INDEX "RoadMap_steps_roadmap_id_idx";

-- DropIndex
DROP INDEX "RoadMaps_user_id_idx";

-- DropIndex
DROP INDEX "USER_ACADEMICS_DETAILS_user_id_idx";

-- DropIndex
DROP INDEX "USER_CERTIFICATION_user_id_key";

-- DropIndex
DROP INDEX "USER_INTEREST_user_id_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "technical" TEXT[],
    "soft" TEXT[],

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skills_user_id_key" ON "Skills"("user_id");

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
