/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "pictureUrl" TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "passesUsed" SET DEFAULT 0,
ALTER COLUMN "googleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
