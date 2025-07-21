/*
  Warnings:

  - You are about to drop the column `marriageId` on the `witnesses` table. All the data in the column will be lost.
  - Added the required column `marriageCertificateNo` to the `witnesses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "witnesses" DROP CONSTRAINT "witnesses_marriageId_fkey";

-- AlterTable
ALTER TABLE "witnesses" DROP COLUMN "marriageId",
ADD COLUMN     "marriageCertificateNo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "witnesses" ADD CONSTRAINT "witnesses_marriageCertificateNo_fkey" FOREIGN KEY ("marriageCertificateNo") REFERENCES "marriage_documention"("marriageCertificateNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
