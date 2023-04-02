/*
  Warnings:

  - Made the column `title` on table `Classroom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classCode` on table `Classroom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Classroom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `Pass` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classId` on table `Pass` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `Pass` required. This step will fail if there are existing NULL values in that column.
  - Made the column `issuerId` on table `Pass` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Pass` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastLogin` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passesUsed` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pictureUrl` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastLogin` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pictureUrl` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Pass" DROP CONSTRAINT "Pass_classId_fkey";

-- DropForeignKey
ALTER TABLE "Pass" DROP CONSTRAINT "Pass_issuerId_fkey";

-- DropForeignKey
ALTER TABLE "Pass" DROP CONSTRAINT "Pass_studentId_fkey";

-- AlterTable
ALTER TABLE "Classroom" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "classCode" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pass" ALTER COLUMN "studentId" SET NOT NULL,
ALTER COLUMN "classId" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "issuerId" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "lastLogin" SET NOT NULL,
ALTER COLUMN "studentId" SET NOT NULL,
ALTER COLUMN "passesUsed" SET NOT NULL,
ALTER COLUMN "pictureUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "lastLogin" SET NOT NULL,
ALTER COLUMN "pictureUrl" SET NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Pass" ADD CONSTRAINT "Pass_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pass" ADD CONSTRAINT "Pass_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pass" ADD CONSTRAINT "Pass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
