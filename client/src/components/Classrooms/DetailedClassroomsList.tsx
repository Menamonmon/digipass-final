import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { TeacherClassroomsQuery } from "../../graphql/queries/TeacherClassroomsQuery";
import { TeacherClassroomsQuery as TeacherClassroomsQueryType } from "../../graphql/queries/__generated__/TeacherClassroomsQuery.graphql";
import useAuth from "../../hooks/useAuth";
import { DetailedClassroom } from "./DetailedClassroom";

export const DetailedClassroomsList: React.FC<{}> = () => {
  const { authStatus } = useAuth();
  const isTeacher =
    authStatus === "new_teacher" || authStatus === "old_teacher";

  const [classroomsFetchId, setClassroomsFetchId] = useState<string>(uuidv4());
  const refetchClassrooms = () => {
    setClassroomsFetchId(uuidv4());
  };
  const { teacherClassrooms } = useLazyLoadQuery<TeacherClassroomsQueryType>(
    TeacherClassroomsQuery,
    {},
    { fetchKey: classroomsFetchId, fetchPolicy: "store-and-network" }
  );

  return (
    <div>
      {isTeacher ? (
        !teacherClassrooms || teacherClassrooms.length === 0 ? (
          <div>
            You do not have any classrooms at the moment. Create one by clicking
            on the plus sign at the bottom right corner of this page.
          </div>
        ) : (
          <div className="px-10 my-5">
            <h1 className="my-5">Your Classrooms</h1>
            <div className="flex flex-wrap gap-5">
              {teacherClassrooms?.map((classroom, idx) => (
                <DetailedClassroom
                  {...classroom}
                  refresh={refetchClassrooms}
                  key={idx}
                />
              ))}
            </div>
          </div>
        )
      ) : (
        <div>You're not a students can't view a detailed classrooms list</div>
      )}
    </div>
  );
};
