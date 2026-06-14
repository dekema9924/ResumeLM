/*
  Warnings:

  - Added the required column `company` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "aiReview" TEXT,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "coverLetter" TEXT,
ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';
