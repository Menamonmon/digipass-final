/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,id]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Classroom_teacherId_id_key" ON "Classroom"("teacherId", "id");
