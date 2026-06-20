/*
  Warnings:

  - You are about to drop the column `aiReview` on the `Resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "aiReview",
ADD COLUMN     "atsIssueCount" INTEGER,
ADD COLUMN     "atsIssues" JSONB,
ADD COLUMN     "atsScore" INTEGER,
ADD COLUMN     "feedback" JSONB,
ADD COLUMN     "items" JSONB,
ADD COLUMN     "jobFitScore" INTEGER,
ADD COLUMN     "jobFitSummary" TEXT,
ADD COLUMN     "matchingStrengths" JSONB,
ADD COLUMN     "missingKeywords" JSONB;
