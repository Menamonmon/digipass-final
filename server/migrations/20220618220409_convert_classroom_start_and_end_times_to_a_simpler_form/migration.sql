/*
  Warnings:

  - You are about to drop the column `endTime` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Classroom` table. All the data in the column will be lost.
  - Added the required column `endHour` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endMinute` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startHour` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMinute` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "endHour" INTEGER NOT NULL,
ADD COLUMN     "endMinute" INTEGER NOT NULL,
ADD COLUMN     "startHour" INTEGER NOT NULL,
ADD COLUMN     "startMinute" INTEGER NOT NULL;
