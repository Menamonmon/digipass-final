/*
  Warnings:

  - You are about to drop the column `accepted` on the `Pass` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pass" DROP COLUMN "accepted",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;
