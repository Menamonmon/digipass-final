import { NextPage } from "next";
import React from "react";
import { ClassroomTabPageWrapper } from "../../../../components/Classrooms/ClassroomTabs";

interface ClassroomPassesPageProps {}

const ClassroomPassesPage: NextPage<ClassroomPassesPageProps> = () => {
  return <ClassroomTabPageWrapper tabName="passes" />;
};

export default ClassroomPassesPage;
