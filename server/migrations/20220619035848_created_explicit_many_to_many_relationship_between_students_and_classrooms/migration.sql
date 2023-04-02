/*
  Warnings:

  - You are about to drop the `_ClassroomToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassroomToStudent" DROP CONSTRAINT "_ClassroomToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassroomToStudent" DROP CONSTRAINT "_ClassroomToStudent_B_fkey";

-- AlterTable
ALTER TABLE "Pass" ALTER COLUMN "reason" SET DEFAULT E'';

-- DropTable
DROP TABLE "_ClassroomToStudent";

-- CreateTable
CREATE TABLE "StudentsOnClassrooms" (
    "classId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentsOnClassrooms_pkey" PRIMARY KEY ("classId","studentId")
);

-- AddForeignKey
ALTER TABLE "StudentsOnClassrooms" ADD CONSTRAINT "StudentsOnClassrooms_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnClassrooms" ADD CONSTRAINT "StudentsOnClassrooms_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
