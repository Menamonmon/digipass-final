/*
  Warnings:

  - A unique constraint covering the columns `[classCode]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.
  - Made the column `startTime` on table `Classroom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `Classroom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacherId` on table `Classroom` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_teacherId_fkey";

-- AlterTable
ALTER TABLE "Classroom" ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "endTime" SET NOT NULL,
ALTER COLUMN "teacherId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_classCode_key" ON "Classroom"("classCode");

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
