/*
  Warnings:

  - Added the required column `studentId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "studentId" VARCHAR(6) NOT NULL;
