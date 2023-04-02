-- CreateIndex
CREATE INDEX "Classroom_id_teacherId_archived_idx" ON "Classroom"("id", "teacherId", "archived");

-- CreateIndex
CREATE INDEX "Classroom_id_teacherId_idx" ON "Classroom"("id", "teacherId");

-- CreateIndex
CREATE INDEX "Classroom_archived_teacherId_idx" ON "Classroom"("archived", "teacherId");

-- CreateIndex
CREATE INDEX "Classroom_id_classCode_idx" ON "Classroom"("id", "classCode");

-- CreateIndex
CREATE INDEX "Classroom_classCode_idx" ON "Classroom"("classCode");

-- CreateIndex
CREATE INDEX "Pass_issuerId_idx" ON "Pass"("issuerId");

-- CreateIndex
CREATE INDEX "Pass_studentId_idx" ON "Pass"("studentId");

-- CreateIndex
CREATE INDEX "Pass_id_issuerId_idx" ON "Pass"("id", "issuerId");

-- CreateIndex
CREATE INDEX "Pass_id_studentId_idx" ON "Pass"("id", "studentId");

-- CreateIndex
CREATE INDEX "Pass_classroomId_issuerId_idx" ON "Pass"("classroomId", "issuerId");

-- CreateIndex
CREATE INDEX "Pass_studentId_classroomId_createdAt_idx" ON "Pass"("studentId", "classroomId", "createdAt");

-- CreateIndex
CREATE INDEX "Student_id_idx" ON "Student"("id");

-- CreateIndex
CREATE INDEX "Student_email_idx" ON "Student"("email");

-- CreateIndex
CREATE INDEX "StudentsOnClassrooms_classroomId_studentId_assignedById_idx" ON "StudentsOnClassrooms"("classroomId", "studentId", "assignedById");
