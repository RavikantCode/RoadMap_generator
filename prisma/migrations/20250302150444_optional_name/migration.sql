-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERIENCED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'BEGINNER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER_ACADEMICS_DETAILS" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "marks_10th_percentage" DOUBLE PRECISION NOT NULL,
    "marks_12th_percentage" DOUBLE PRECISION NOT NULL,
    "college_cgpa" DOUBLE PRECISION,
    "degree" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "USER_ACADEMICS_DETAILS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER_CERTIFICATION" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "certificate_name" TEXT NOT NULL,
    "platform" TEXT,
    "issued_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USER_CERTIFICATION_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER_INTEREST" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "interest" TEXT,

    CONSTRAINT "USER_INTEREST_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadMaps" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "career_path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoadMaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadMap_steps" (
    "id" TEXT NOT NULL,
    "roadmap_id" TEXT NOT NULL,
    "step_order" INTEGER NOT NULL,
    "step_title" TEXT NOT NULL,
    "step_description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoadMap_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YouTubeVideo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "YouTubeVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "salary_range" TEXT NOT NULL,
    "posted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USER_ACADEMICS_DETAILS_user_id_key" ON "USER_ACADEMICS_DETAILS"("user_id");

-- CreateIndex
CREATE INDEX "USER_ACADEMICS_DETAILS_user_id_idx" ON "USER_ACADEMICS_DETAILS"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "USER_CERTIFICATION_user_id_key" ON "USER_CERTIFICATION"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "USER_INTEREST_user_id_key" ON "USER_INTEREST"("user_id");

-- CreateIndex
CREATE INDEX "RoadMaps_user_id_idx" ON "RoadMaps"("user_id");

-- CreateIndex
CREATE INDEX "RoadMap_steps_roadmap_id_idx" ON "RoadMap_steps"("roadmap_id");

-- CreateIndex
CREATE INDEX "Resource_stepId_idx" ON "Resource"("stepId");

-- CreateIndex
CREATE INDEX "Link_resourceId_idx" ON "Link"("resourceId");

-- AddForeignKey
ALTER TABLE "USER_ACADEMICS_DETAILS" ADD CONSTRAINT "USER_ACADEMICS_DETAILS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USER_CERTIFICATION" ADD CONSTRAINT "USER_CERTIFICATION_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "USER_INTEREST" ADD CONSTRAINT "USER_INTEREST_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadMaps" ADD CONSTRAINT "RoadMaps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadMap_steps" ADD CONSTRAINT "RoadMap_steps_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "RoadMaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "RoadMap_steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeVideo" ADD CONSTRAINT "YouTubeVideo_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
