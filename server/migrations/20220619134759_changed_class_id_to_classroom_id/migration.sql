/*
  Warnings:

  - You are about to drop the column `classId` on the `Pass` table. All the data in the column will be lost.
  - The primary key for the `StudentsOnClassrooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classId` on the `StudentsOnClassrooms` table. All the data in the column will be lost.
  - Added the required column `classroomId` to the `Pass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classroomId` to the `StudentsOnClassrooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pass" DROP CONSTRAINT "Pass_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentsOnClassrooms" DROP CONSTRAINT "StudentsOnClassrooms_classId_fkey";

-- AlterTable
ALTER TABLE "Pass" DROP COLUMN "classId",
ADD COLUMN     "classroomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentsOnClassrooms" DROP CONSTRAINT "StudentsOnClassrooms_pkey",
DROP COLUMN "classId",
ADD COLUMN     "classroomId" TEXT NOT NULL,
ADD CONSTRAINT "StudentsOnClassrooms_pkey" PRIMARY KEY ("classroomId", "studentId");

-- AddForeignKey
ALTER TABLE "Pass" ADD CONSTRAINT "Pass_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnClassrooms" ADD CONSTRAINT "StudentsOnClassrooms_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
