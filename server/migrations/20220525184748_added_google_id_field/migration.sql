/*
  Warnings:

  - You are about to drop the column `firstName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `googleId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `googleId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "googleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "googleId" TEXT NOT NULL;
