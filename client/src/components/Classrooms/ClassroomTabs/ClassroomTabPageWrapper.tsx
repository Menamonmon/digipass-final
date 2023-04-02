import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ClassroomTab, ClassroomTabViewer } from "./ClassroomTabViewer";

interface ClassroomTabPageWrapperProps {
  tabName: ClassroomTab;
}

export const ClassroomTabPageWrapper: React.FC<
  ClassroomTabPageWrapperProps
> = ({ tabName }) => {
  const router = useRouter();
  const { classroomId } = router.query;
  return (
    <div>
      {classroomId ? (
        <ClassroomTabViewer
          classroomId={classroomId as string}
          currentActiveTab={tabName}
        />
      ) : (
        <div>Classroom not found</div>
      )}
    </div>
  );
};
