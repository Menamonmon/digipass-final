/*
  Warnings:

  - A unique constraint covering the columns `[id,studentId]` on the table `Pass` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pass_id_studentId_key" ON "Pass"("id", "studentId");
