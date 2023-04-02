/*
  Warnings:

  - You are about to drop the `_ClassroomToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassroomToTeacher" DROP CONSTRAINT "_ClassroomToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassroomToTeacher" DROP CONSTRAINT "_ClassroomToTeacher_B_fkey";

-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "teacherId" INTEGER;

-- DropTable
DROP TABLE "_ClassroomToTeacher";

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
