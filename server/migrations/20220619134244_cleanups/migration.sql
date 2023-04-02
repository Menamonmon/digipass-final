/*
  Warnings:

  - A unique constraint covering the columns `[id,teacherId]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,issuerId]` on the table `Pass` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Classroom_teacherId_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_id_teacherId_key" ON "Classroom"("id", "teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Pass_id_issuerId_key" ON "Pass"("id", "issuerId");
