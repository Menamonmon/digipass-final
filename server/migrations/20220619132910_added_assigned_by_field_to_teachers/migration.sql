/*
  Warnings:

  - Added the required column `assignedById` to the `StudentsOnClassrooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentsOnClassrooms" ADD COLUMN     "assignedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentsOnClassrooms" ADD CONSTRAINT "StudentsOnClassrooms_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
