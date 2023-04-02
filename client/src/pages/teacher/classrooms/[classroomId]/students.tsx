import { NextPage } from "next";
import React from "react";
import { ClassroomTabPageWrapper } from "../../../../components/Classrooms/ClassroomTabs";

interface ClassroomStudentsPageProps {}

const ClassroomStudentsPage: NextPage<ClassroomStudentsPageProps> = () => {
  return <ClassroomTabPageWrapper tabName="students" />;
};

export default ClassroomStudentsPage;
