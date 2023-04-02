import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { ClassroomTabPageWrapper } from "../../../../components/Classrooms/ClassroomTabs";
import { useSockets } from "../../../../hooks/useSockets";
import PassQueue from "../../../../components/Passes/PassQueue";

interface ViewClassroomPageProps {}

const ViewClassroomPage: NextPage<ViewClassroomPageProps> = () => {
  const [passIds, setPassIds] = useState<string[]>([]);
  const { initializeSocket, initiateTeacherSesssion } = useSockets(
    () => {},
    () => {},
    (passIds: string[]) => {
      console.log("CHANGE EVENT DETECTED");
      setPassIds(passIds);
    }
  );
  useEffect(() => {
    initializeSocket((newSocket) => {
      initiateTeacherSesssion();
    });
  }, []);
  return (
    <div>
      <ClassroomTabPageWrapper tabName="classroom-info" />
      <PassQueue passIds={passIds} />
    </div>
  );
};

export default ViewClassroomPage;
