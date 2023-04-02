/*
  Warnings:

  - You are about to alter the column `title` on the `Classroom` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `description` on the `Classroom` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `address` on the `IPAddress` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `reason` on the `Pass` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `email` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `firstName` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `lastName` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `studentId` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6)`.
  - You are about to alter the column `pictureUrl` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `email` on the `Teacher` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(75)`.
  - You are about to alter the column `pictureUrl` on the `Teacher` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `firstName` on the `Teacher` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `lastName` on the `Teacher` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Made the column `ownerId` on table `IPAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `IPAddress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `IPAddress` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "IPAddress" DROP CONSTRAINT "IPAddress_ownerId_fkey";

-- AlterTable
ALTER TABLE "Classroom" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "IPAddress" ALTER COLUMN "ownerId" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "address" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Pass" ALTER COLUMN "reason" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "email" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "studentId" SET DATA TYPE VARCHAR(6),
ALTER COLUMN "pictureUrl" SET DATA TYPE VARCHAR(150);

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "email" SET DATA TYPE VARCHAR(75),
ALTER COLUMN "pictureUrl" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(50);

-- AddForeignKey
ALTER TABLE "IPAddress" ADD CONSTRAINT "IPAddress_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
